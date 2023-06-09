import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { customMessages, model, rules } from "@/lib/firestore/collections/team";
import { useEffect, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import Button from "@mui/material/Button";
import CountrySelect from "@/src/components/dropdown/CountrySelect";
import { DEFAULT_LOGO } from "@/src/config/global";
import { Edit } from "@mui/icons-material";
import GameSelect from "@/src/components/dropdown/GameSelect";
import { LoadingButton } from "@mui/lab";
import Validator from "validatorjs";
import { enqueueSnackbar } from "notistack";
import { useAppContext } from "@/src/context/app";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { useUser } from "@/lib/firebase/useUser";

const initialInputs = {
  ...model
};

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useUser();
  const { setTitle } = useAppContext();
  const [inputs, setInputs] = useState({ ...initialInputs });
  const { team } = useTournamentContext();
  const [tid, setTID] = useState(null);
  const [darkLogo, setDarkLogo] = useState(null);
  const [lightLogo, setLightLogo] = useState(null);
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState(null);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  const validate = (data, rule, messages) => {
    let validator = new Validator(data, rule, messages);
    if (validator.fails()) {
      setErrors(validator.errors.errors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handle = {
    save: async (e) => {
      if (validate(inputs, rules, customMessages) === false) return;
      setSaving(true);
      let newTeam = {
        ...inputs
      };
      let uploaded = true;
      if (darkLogo) {
        uploaded = false;
        const res = await team.upload(darkLogo, tid, "logo_dark");
        if (res.code === "succeed") {
          newTeam.darkLogo = res.url;
          uploaded = true;
        }
      }
      if (lightLogo) {
        uploaded = false;
        const res = await team.upload(lightLogo, tid, "logo_light");
        if (res.code === "succeed") {
          newTeam.lightLogo = res.url;
          uploaded = true;
        }
      }
      if (banner) {
        uploaded = false;
        const res = await team.upload(banner, tid, "banner");
        if (res.code === "succeed") {
          newTeam.banner = res.url;
          uploaded = true;
        }
      }

      if (uploaded) {
        const res = await team.update(tid, newTeam);
        if (res.code === "succeed") {
          enqueueSnackbar("Saved successfully!", { variant: "success" });
        }
      }
      setSaving(false);
    },
    delete: async (e) => {
      const res = await team.delete(tid);
      if (res.code === "succeed") {
        router.push("/team");
      }
    },
    inputs: (e) => {
      let { name, type, value } = e.target;
      if (type === "number") value = Number(value);
      setInputs((prev) => ({
        ...prev,
        [name]: value
      }));
    },
    changeDarkLogo: (e) => {
      const file = e.target.files[0];
      setDarkLogo(file);
      const url = URL.createObjectURL(file);
      setInputs((prev) => ({
        ...prev,
        darkLogo: url
      }));
    },
    changeLightLogo: (e) => {
      const file = e.target.files[0];
      setLightLogo(file);
      const url = URL.createObjectURL(file);
      setInputs((prev) => ({
        ...prev,
        lightLogo: url
      }));
    },
    removeDarkLogo: (e) => {
      setInputs((prev) => ({
        ...prev,
        darkLogo: DEFAULT_LOGO
      }));
    },
    removeLightLogo: (e) => {
      setInputs((prev) => ({
        ...prev,
        lightLogo: DEFAULT_LOGO
      }));
    },
    upload: (e, name) => {
      const file = e.target.files[0];
      if (name === "banner") setBanner(file);
      const url = URL.createObjectURL(file);
      setInputs((prev) => ({
        ...prev,
        [name]: url
      }));
    }
  };

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      ...team.teams[tid]
    }));
  }, [tid]);

  useEffect(() => {
    setTID(router.query?.tid);
  }, [router]);

  useEffect(() => {
    setTitle("EDIT TEAM");
  }, []);

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Grid container rowSpacing={3} spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ textAlign: "center", position: "relative", mt: 3 }}>
            <IconButton
              sx={{ position: "absolute", right: 0, bottom: 0 }}
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
                height: "200px",
                maxWidth: "600px",
                objectFit: "cover",
                border: "solid 1px rgba(255, 255, 255, 0.2)",
                borderRadius: "4px"
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box border={"solid 1px gray"} p={4} borderRadius={1}>
            <Typography variant="h5">Logo</Typography>

            <Typography variant="body1">
              We need you to upload a dark and a light logo to ensure that the logo is visible on
              every background. The logo must have sufficient contrast both on white and on black
              background. Besides that the logo must touch at least two of four cyan guidelines.
            </Typography>

            <Box display={"flex"} justifyContent={"center"} gap={4} alignItems={"center"} mt={2}>
              <Box display={"flex"} justifyContent={"center"} gap={2}>
                <Box display={"flex"} flexDirection={"column"} gap={2} alignItems={"baseline"}>
                  <Button variant="contained" component="label">
                    UPLOAD DARK LOGO
                    <input
                      type="file"
                      accept="image/*"
                      name="upload-dark-logo"
                      id="upload-dark-logo"
                      hidden
                      onChange={handle.changeDarkLogo}
                    />
                  </Button>
                  <Button variant="contained" component="label" onClick={handle.removeDarkLogo}>
                    REMOVE DARK LOGO
                  </Button>
                </Box>
                <Box width={"200px"} height={"200px"} textAlign={"center"}>
                  <img
                    src={inputs.darkLogo || DEFAULT_LOGO}
                    style={{ height: "200px", maxWidth: "200px", objectFit: "contain" }}
                  />
                </Box>
              </Box>
              <Box display={"flex"} justifyContent={"center"} gap={2}>
                <Box display={"flex"} flexDirection={"column"} gap={2} alignItems={"baseline"}>
                  <Button variant="contained" component="label">
                    UPLOAD LIGHT LOGO
                    <input
                      type="file"
                      accept="image/*"
                      name="upload-light-logo"
                      id="upload-light-logo"
                      hidden
                      onChange={handle.changeLightLogo}
                    />
                  </Button>
                  <Button variant="contained" component="label" onClick={handle.removeLightLogo}>
                    REMOVE LIGHT LOGO
                  </Button>
                </Box>
                <Box width={"200px"} height={"200px"} textAlign={"center"}>
                  <img
                    src={inputs.lightLogo || DEFAULT_LOGO}
                    style={{ height: "200px", maxWidth: "200px", objectFit: "contain" }}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel htmlFor="team-name">Team Name</InputLabel>
          <FormControl fullWidth error={errors.name !== undefined}>
            <OutlinedInput
              id="team-name"
              name="name"
              aria-describedby="team-name-helper"
              value={inputs.name}
              onChange={handle.inputs}
              sx={{ mt: 1 }}
              fullWidth
              required
            />
            {errors.name !== undefined && (
              <FormHelperText id="team-name-helper" sx={{ mt: 2 }}>
                {errors.name}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel htmlFor="team-short">Short Name</InputLabel>
          <FormControl fullWidth error={errors.short !== undefined}>
            <OutlinedInput
              id="team-short"
              name="short"
              value={inputs.short}
              aria-describedby="team-short-helper"
              onChange={handle.inputs}
              sx={{ mt: 1 }}
              fullWidth
              required
            />
            {errors.short !== undefined && (
              <FormHelperText id="team-short-helper" sx={{ mt: 2 }}>
                {errors.short}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel htmlFor="team-access-code">Access Code</InputLabel>
          <FormControl fullWidth error={errors.accessCode !== undefined}>
            <OutlinedInput
              id="team-access-code"
              name="accessCode"
              value={inputs.accessCode}
              aria-describedby="team-access-code-helper"
              onChange={handle.inputs}
              sx={{ mt: 1 }}
              fullWidth
              required
            />
            {errors.accessCode !== undefined && (
              <FormHelperText id="team-access-code-helper" sx={{ mt: 2 }}>
                {errors.accessCode}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel htmlFor="team-residency">Residency</InputLabel>
          <CountrySelect
            sx={{ mt: 1, width: "100%" }}
            option={inputs.residency}
            setOption={(val) => setInputs((prev) => ({ ...prev, residency: val }))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel htmlFor="team-game">Game</InputLabel>
          <GameSelect
            sx={{ mt: 1, width: "100%" }}
            option={inputs.game}
            setOption={(val) => setInputs((prev) => ({ ...prev, game: val }))}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputLabel htmlFor="team-type">Team Type</InputLabel>
          <Select
            labelId="type-select-label"
            id="type-select"
            variant="outlined"
            sx={{ mt: 1 }}
            value={inputs.type}
            name="type"
            onChange={handle.inputs}
            fullWidth
          >
            <MenuItem value={0}>Casual</MenuItem>
            <MenuItem value={1}>Major</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <InputLabel htmlFor="team-description">Description</InputLabel>
          <FormControl fullWidth>
            <OutlinedInput
              multiline
              id="team-description"
              name="description"
              value={inputs.description}
              onChange={handle.inputs}
              sx={{ mt: 1 }}
              fullWidth
              required
            />
          </FormControl>
        </Grid>
        <Grid item>
          <LoadingButton loading={saving} sx={{ mr: 2 }} variant="contained" onClick={handle.save}>
            Save
          </LoadingButton>
          <Button variant="contained" onClick={handle.delete}>
            Delete Team
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
