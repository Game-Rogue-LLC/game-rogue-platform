import * as config from "@/src/config/global";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";

import Colors from "@/src/components/Colors";
import CustomButton from "@/src/components/button/CustomButton";
import DateTimePicker from "@/src/components/datetime/DateTimePicker";
import { Edit } from "@mui/icons-material";
import { PlaidLink } from "react-plaid-link";
import RichTextInput from "@/src/components/input/RichTextInput";
import SelectInput from "@/src/components/input/SelectInput";
import axios from "axios";
import { useTournamentContext } from "@/src/context/TournamentContext";

// import DateRangePicker from "@/src/components/datetime/DateRangePicker";

const EventInput = ({ handle, inputs, disabled, errors }) => {
  const theme = useTheme();
  const { organizer } = useTournamentContext();
  const [isPlaidOpen, setIsPlaidOpen] = useState(false);
  const [linkToken, setLinkToken] = useState("");

  useEffect(() => {
    axios
      .post("/api/plaid/create_link_token")
      .then((res) => {
        if (res?.data?.link_token) setLinkToken(res.data.link_token);
      })
      .catch((err) => console.error(err));
  }, []);

  const onPlaidSuccess = () => {};
  const onPlaidExit = () => {};

  return (
    <>
      <Grid container spacing={2} rowSpacing={4}>
        <Grid item xs={12}>
          <Typography variant="h6">Event Logo</Typography>
          <Box display={"flex"} justifyContent={"center"} gap={4} alignItems={"center"} mt={2}>
            <Box display={"flex"} justifyContent={"center"} gap={2}>
              <Box display={"flex"} flexDirection={"column"} gap={2} alignItems={"baseline"}>
                <CustomButton variant="contained" component="label" disabled={disabled}>
                  UPLOAD DARK LOGO
                  <input
                    type="file"
                    accept="image/*"
                    name="upload-dark-logo"
                    id="upload-dark-logo"
                    hidden
                    onChange={(e) => handle.upload(e, "darkLogo")}
                  />
                </CustomButton>
                <CustomButton
                  variant="contained"
                  component="label"
                  disabled={disabled}
                  onClick={handle.removeDarkLogo}
                >
                  REMOVE DARK LOGO
                </CustomButton>
              </Box>
              <Box width={"200px"} height={"200px"} textAlign={"center"}>
                <img
                  src={inputs.darkLogo || config.DEFAULT_DARK_LOGO}
                  style={{
                    height: "200px",
                    maxWidth: "200px",
                    objectFit: "contain"
                  }}
                />
              </Box>
            </Box>
            <Box display={"flex"} justifyContent={"center"} gap={2}>
              <Box display={"flex"} flexDirection={"column"} gap={2} alignItems={"baseline"}>
                <CustomButton variant="contained" component="label" disabled={disabled}>
                  UPLOAD LIGHT LOGO
                  <input
                    type="file"
                    accept="image/*"
                    name="upload-light-logo"
                    id="upload-light-logo"
                    hidden
                    onChange={(e) => handle.upload(e, "lightLogo")}
                  />
                </CustomButton>
                <CustomButton
                  variant="contained"
                  component="label"
                  disabled={disabled}
                  onClick={handle.removeLightLogo}
                >
                  REMOVE LIGHT LOGO
                </CustomButton>
              </Box>
              <Box width={"200px"} height={"200px"} textAlign={"center"}>
                <img
                  src={inputs.lightLogo || config.DEFAULT_LIGHT_LOGO}
                  style={{
                    height: "200px",
                    maxWidth: "200px",
                    objectFit: "contain"
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Typography variant="h6">Event Graphic</Typography>
          <Box sx={{ textAlign: "left", position: "relative", mt: 3 }}>
            <IconButton
              sx={{ position: "absolute", right: 20, bottom: 20 }}
              component="label"
              disabled={disabled}
            >
              <Edit />
              <input
                type="file"
                accept="image/*"
                name="upload-banner"
                id="upload-banner"
                hidden
                onChange={(e) => handle.upload(e, "banner")}
              />
            </IconButton>
            <img
              src={inputs?.banner || config.DEFAULT_CONTENTBLOCK_IMAGE}
              style={{
                height: "300px",
                width: "100%",
                maxWidth: "100%",
                objectFit: "cover",
                border: "solid 1px rgba(255, 255, 255, 0.2)",
                borderRadius: "4px"
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            Organization
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <Select
            labelId="organizer-select-label"
            id="organizer-select"
            value={inputs?.oid}
            onChange={handle.inputs}
            variant="outlined"
            name="oid"
            disabled={disabled}
            sx={{ mt: 1 }}
            fullWidth
          >
            {Object.keys(organizer.organizers).map((key, i) => {
              const item = organizer.organizers[key];
              return (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>

        <Grid item xs={12}>
          <Box>
            <Typography variant="h6">
              Event Name
              <span style={{ color: theme.palette.primary.main }}> * </span>
            </Typography>
            <FormControl sx={{ mt: 1 }} fullWidth error={errors.name !== undefined}>
              <OutlinedInput
                id="event-name"
                name="name"
                aria-describedby="event-name-helper"
                value={inputs?.name}
                disabled={disabled}
                onChange={handle.inputs}
              />
              {errors.name !== undefined && (
                <FormHelperText id="event-name-helper" sx={{ mt: 2 }}>
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Tagline</Typography>
            <FormControl fullWidth sx={{ mt: 1 }}>
              {/* <TextField multiline id="event-description" name="description" aria-describedby="event-description-helper" value={inputs?.description} disabled={disabled}
              onChange={handle.inputs} /> */}
              <RichTextInput
                content={inputs?.description}
                handleContentChange={(newContent) => {
                  handle.inputs({
                    target: {
                      name: "description",
                      value: newContent
                    }
                  });
                }}
              />
            </FormControl>
          </Box>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Typography variant="h6">
            Event Format
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <SelectInput
            name="category"
            options={config.EVENT_CATEGORIES}
            value={inputs?.category}
            onChange={handle.inputs}
            disabled={disabled}
            sx={{ mt: 1 }}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Typography variant="h6">
            Course Type
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <Box sx={{ mt: 1 }}>
            {inputs?.category == 0 ? (
              <Select
                labelId="format-select-label"
                id="format-select"
                value={inputs?.format}
                name="format"
                onChange={handle.inputs}
                variant="outlined"
                disabled={disabled}
                fullWidth
              >
                <MenuItem key="single-elimination" value={0}>
                  Single Elimination
                </MenuItem>
                <MenuItem key="double-elimination" value={1}>
                  Double Elimination
                </MenuItem>
                <MenuItem key="ladder-elimination" value={2}>
                  Ladder Elimination
                </MenuItem>
                <MenuItem key="pyramid-elimination" value={3}>
                  Pyramid Elimination
                </MenuItem>
                <MenuItem key="2-division-split" value={4}>
                  2 Divisions Split
                </MenuItem>
                <MenuItem key="baku-system" value={10}>
                  Baku Tournament
                </MenuItem>
              </Select>
            ) : (
              <Select
                labelId="format-select"
                id="format-select-temp"
                value={inputs?.format}
                name="format"
                onChange={handle.inputs}
                variant="outlined"
                disabled={disabled}
                fullWidth
              >
                <MenuItem key="straight-round-robin" value={5}>
                  Straight Round Robin
                </MenuItem>
                <MenuItem key="round-robin-double-split" value={6}>
                  Round Robin Double Split
                </MenuItem>
                <MenuItem key="round-robin-triple-split" value={7}>
                  Round Robin Triple Split
                </MenuItem>
                <MenuItem key="round-robin-quadruple-split" value={8}>
                  Round Robin Quadruple Split
                </MenuItem>
                <MenuItem key="semi-round-robin" value={9}>
                  Semi Round Robin
                </MenuItem>
              </Select>
            )}
          </Box>
        </Grid>
        {inputs?.format === 4 && (
          <>
            <Grid item xs={12} lg={6}>
              <Typography variant="h6">Division 1 - Course Type</Typography>
              <Select
                labelId="division1-format-select-label"
                id="division1-format-select"
                value={inputs?.division1}
                name="division1"
                onChange={handle.inputs}
                variant="outlined"
                disabled={disabled}
                fullWidth
              >
                <MenuItem key="single-elimination" value={0}>
                  Single Elimination
                </MenuItem>
                <MenuItem key="double-elimination" value={1}>
                  Double Elimination
                </MenuItem>
                <MenuItem key="ladder-elimination" value={2}>
                  Ladder Elimination
                </MenuItem>
                <MenuItem key="pyramid-elimination" value={3}>
                  Pyramid Elimination
                </MenuItem>
                <MenuItem key="2-division-split" value={4}>
                  2 Divisions Split
                </MenuItem>
                <MenuItem key="baku-system" value={10}>
                  Baku Tournament
                </MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} lg={6}>
              <Typography variant="h6">Division 2 - Course Type</Typography>
              <Select
                labelId="division2-format-select-label"
                id="division2-format-select"
                value={inputs?.division2}
                name="division1"
                onChange={handle.inputs}
                variant="outlined"
                disabled={disabled}
                fullWidth
              >
                <MenuItem key="single-elimination" value={0}>
                  Single Elimination
                </MenuItem>
                <MenuItem key="double-elimination" value={1}>
                  Double Elimination
                </MenuItem>
                <MenuItem key="ladder-elimination" value={2}>
                  Ladder Elimination
                </MenuItem>
                <MenuItem key="pyramid-elimination" value={3}>
                  Pyramid Elimination
                </MenuItem>
                <MenuItem key="2-division-split" value={4}>
                  2 Divisions Split
                </MenuItem>
                <MenuItem key="baku-system" value={10}>
                  Baku Tournament
                </MenuItem>
              </Select>
            </Grid>
          </>
        )}

        <Grid item xs={12} lg={6}>
          <Typography variant="h6">Seed Type</Typography>
          <SelectInput
            name="seed"
            options={config.EVENT_SEED_TYPES}
            value={inputs?.seed}
            onChange={handle.inputs}
            disabled={disabled}
            sx={{ mt: 1 }}
          />
        </Grid>
        {inputs?.format === 4 ? (
          <>
            <Grid item xs={6} lg={3}>
              <Typography variant="h6">
                Division 1 - Team Limit
                <span style={{ color: theme.palette.primary.main }}> * </span>
              </Typography>
              <FormControl sx={{ mt: 1 }} fullWidth error={errors.participantsCount !== undefined}>
                <OutlinedInput
                  id="participants-count1"
                  name="participantsCount1"
                  aria-describedby="participants-count1-helper"
                  value={inputs?.participantsCount1}
                  disabled={disabled}
                  type="number"
                  onChange={handle.inputs}
                  inputProps={{ min: 2 }}
                />
                {errors.participantsCount !== undefined && (
                  <FormHelperText id="participants-count1-helper" sx={{ mt: 2 }}>
                    {errors.participantsCount}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6} lg={3}>
              <Typography variant="h6">
                Division 2 - Team Limit
                <span style={{ color: theme.palette.primary.main }}> * </span>
              </Typography>
              <FormControl sx={{ mt: 1 }} fullWidth error={errors.participantsCount !== undefined}>
                <OutlinedInput
                  id="participants-count2"
                  name="participantsCount2"
                  aria-describedby="participants-count2-helper"
                  value={inputs?.participantsCount2}
                  disabled={disabled}
                  type="number"
                  onChange={handle.inputs}
                  inputProps={{ min: 2 }}
                />
                {errors.participantsCount !== undefined && (
                  <FormHelperText id="participants-count2-helper" sx={{ mt: 2 }}>
                    {errors.participantsCount}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} lg={6}>
            <Typography variant="h6">
              Team Limit
              <span style={{ color: theme.palette.primary.main }}> * </span>
            </Typography>
            <FormControl sx={{ mt: 1 }} fullWidth error={errors.participantsCount !== undefined}>
              <OutlinedInput
                id="participants-count"
                name="participantsCount"
                aria-describedby="participants-count-helper"
                value={inputs?.participantsCount}
                disabled={disabled}
                type="number"
                onChange={handle.inputs}
                inputProps={{ min: 2 }}
              />
              {errors.participantsCount !== undefined && (
                <FormHelperText id="participants-count-helper" sx={{ mt: 2 }}>
                  {errors.participantsCount}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
        )}

        <Grid item xs={12} lg={6}>
          <Typography variant="h6">
            Start Date
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <DateTimePicker
            value={inputs?.startAt}
            setValue={(newDate) => handle.setDate("startAt", newDate)}
            sx={{ mt: 1, width: "100%" }}
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Typography variant="h6">
            End Date
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <DateTimePicker
            value={inputs?.endAt}
            setValue={(newDate) => handle.setDate("endAt", newDate)}
            sx={{ mt: 1, width: "100%" }}
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Typography variant="h6">
            Registration Opens
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <DateTimePicker
            value={inputs?.registerFrom}
            setValue={(newDate) => handle.setDate("registerFrom", newDate)}
            sx={{ mt: 1, width: "100%" }}
            disabled={disabled}
          />
        </Grid>

        <Grid item xs={12} lg={6}>
          <Typography variant="h6">
            Registration Ends
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <DateTimePicker
            value={inputs?.registerTo}
            setValue={(newDate) => handle.setDate("registerTo", newDate)}
            sx={{ mt: 1, width: "100%" }}
            disabled={disabled}
          />
        </Grid>
        {/* 
      <Grid item xs={12} lg={4}>
        <Typography variant="h6">CheckIn</Typography>
        <FormControl sx={{ mt: 1 }} fullWidth error={errors.checkin !== undefined}>
          <OutlinedInput id="check-in" name="checkin" aria-describedby="check-in-helper" value={inputs?.checkin} disabled={disabled}
            type="number" onChange={handle.inputs} />
          {errors.checkin !== undefined && <FormHelperText id="check-in-helper" sx={{ mt: 2 }}>{errors.checkin}</FormHelperText>}
        </FormControl>
      </Grid> */}

        <Grid item xs={12} lg={6}>
          <Typography variant="h6">
            Prize Pool
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <FormControl sx={{ mt: 1 }} fullWidth error={errors.prize !== undefined}>
            <OutlinedInput
              id="prize-pool"
              name="prize"
              aria-describedby="prize-pool-helper"
              value={inputs?.prize}
              disabled={disabled}
              type="number"
              onChange={handle.inputs}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
            {errors.prize !== undefined && (
              <FormHelperText id="prize-pool-helper" sx={{ mt: 2 }}>
                {errors.prize}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Typography variant="h6">
            Entry Fee
            {linkToken.toString() !== "undefined" && (
              <PlaidLink
                token={linkToken.toString()}
                env="sandbox"
                onSuccess={onPlaidSuccess}
                onExit={onPlaidExit}
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <span
                  style={{ color: theme.palette.primary.main, fontSize: "1rem", cursor: "pointer" }}
                >
                  {" "}
                  Link your pay-out method{" "}
                </span>
              </PlaidLink>
            )}
            <span style={{ color: theme.palette.primary.main }}>*</span>
          </Typography>
          <FormControl sx={{ mt: 1 }} fullWidth error={errors.entryFee !== undefined}>
            <OutlinedInput
              id="entry-fee"
              name="entryFee"
              aria-describedby="entry-fee-helper"
              value={inputs?.entryFee}
              disabled={disabled}
              type="number"
              onChange={handle.inputs}
              startAdornment={<InputAdornment position="start">$</InputAdornment>}
            />
            {errors.entryFee !== undefined && (
              <FormHelperText id="check-in-helper" sx={{ mt: 2 }}>
                {errors.entryFee}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            Game
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <Select
            labelId="game-select-label"
            id="game-select"
            value={inputs?.game}
            name="game"
            onChange={handle.inputs}
            variant="outlined"
            disabled={disabled}
            sx={{ mt: 1 }}
            fullWidth
          >
            <MenuItem key="rainbow-six-siege" value={0}>
              Rainbow Six Siege
            </MenuItem>
          </Select>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            Platform
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <SelectInput
            name="platform"
            options={config.PLATFORMS}
            value={inputs?.platform}
            onChange={handle.inputs}
            disabled={disabled}
            sx={{ mt: 1 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            Region
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <SelectInput
            name="region"
            options={config.EVENT_REGIONS}
            value={inputs?.region}
            onChange={handle.inputs}
            disabled={disabled}
            sx={{ mt: 1 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h6">
            Time Zone
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <Select
            labelId="timezone-select-label"
            id="timezone-select"
            value={inputs?.timezone}
            name="timezone"
            onChange={handle.inputs}
            variant="outlined"
            disabled={disabled}
            sx={{ mt: 1 }}
            fullWidth
          >
            <MenuItem key="ast" value={0}>
              Atlantic Standard Time (AST)
            </MenuItem>
            <MenuItem key="est" value={1}>
              Eastern Standard Time (EST)
            </MenuItem>
            <MenuItem key="cst" value={2}>
              Central Standard Time (CST)
            </MenuItem>
            <MenuItem key="mst" value={3}>
              Mountain Standard Time (MST)
            </MenuItem>
            <MenuItem key="pst" value={4}>
              Pacific Standard Time (PST)
            </MenuItem>
            <MenuItem key="akst" value={5}>
              Alaskan Standard Time (AKST)
            </MenuItem>
          </Select>
        </Grid>

        {/** PLACE SCHEDULE HERE */}
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography variant="h6">Add a Rulebook</Typography>
            <Typography variant="subtitle2">
              Publicly shared (.pdf) and must be accepted by competitors.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" align="center">
              {inputs?.rulebook}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              component="label"
              fullWidth
              disabled={disabled}
            >
              + Upload
              <input
                type="file"
                accept=".pdf"
                name="upload-rulebook"
                id="upload-rulebook"
                hidden
                onChange={(e) => handle.upload(e, "rulebook")}
              />
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography variant="h6">Add Terms and Conditions</Typography>
            <Typography variant="subtitle2">
              Must be accepted by competitors and is displayed alongside rulebooks.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" align="center">
              {inputs?.terms}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              component="label"
              fullWidth
              disabled={disabled}
            >
              + Upload
              <input
                type="file"
                accept=".pdf"
                name="upload-terms"
                id="upload-terms"
                hidden
                onChange={(e) => handle.upload(e, "terms")}
              />
            </Button>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <Box>
            <Typography variant="h6">Add Privacy Policy</Typography>
            <Typography variant="subtitle2">
              Must be accepted by competitors and is displayed alongside rulebooks and terms and
              conditions.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" align="center">
              {inputs?.privacy}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              component="label"
              fullWidth
              disabled={disabled}
            >
              + Upload
              <input
                type="file"
                accept=".pdf"
                name="upload-privacy"
                id="upload-privacy"
                hidden
                onChange={(e) => handle.upload(e, "privacy")}
              />
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Colors colors={inputs} onColorChange={handle.colorChange} sx={{ mt: 3 }} />
    </>
  );
};

export default EventInput;
