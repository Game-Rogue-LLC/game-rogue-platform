import {
  Alert,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { ChromePicker, GooglePicker, SketchPicker } from "@hello-pangea/color-picker";
import { brighterColor, isBrightColor } from "@/src/utils/utils";
import { customMessages, model, rules } from "@/lib/firestore/collections/sponsor";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import ColorSelect from "@/src/components/dropdown/ColorSelect";
import CustomButton from "@/src/components/button/CustomButton";
import CustomLoadingButton from "@/src/components/button/CustomLoadingButton";
import DatePicker from "@/src/components/datetime/DatePicker";
import { LoadingButton } from "@mui/lab";
import Validator from "validatorjs";
import _ from "lodash";
import colorConvert from "color-convert";
import { enqueueSnackbar } from "notistack";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

// import ColorPicker from "@mapbox/react-colorpickr";

const initialInputs = {
  ...model
};

const Page = () => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const router = useRouter();
  const { colors, setColors } = useStyleContext();
  const { sponsor, organization } = useTournamentContext();
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  const { setTitle } = useAppContext();

  useEffect(() => {
    setTitle("CREATE SPONSOR");
  }, []);

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
    create: async (e) => {
      if (!validate(inputs, rules, customMessages)) return;
      const newItem = {
        ...inputs,
        uid: user.id
      };

      const rogueIdExists = await sponsor.rogueIdExists(inputs?._id);
      if (rogueIdExists) {
        setErrors((prev) => ({ ...prev, _id: "Rogue ID is already taken." }));
        return;
      } else setErrors((prev) => ({ ...prev, _id: undefined }));

      setDisabled(true);

      sponsor
        .create(newItem)
        .then((res) => {
          if (res.code === "succeed") {
            router.push("/sponsor");
          } else if (res.code === "failed") {
            console.warn(res.message);
          }
        })
        .catch((err) => {
          console.warn(err);
        })
        .finally(() => {
          setDisabled(false);
        });
    },
    inputs: (e) => {
      let { name, type, value } = e.target;
      if (type === "number") value = Number(value);
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    deadlineChange: (newDate) => {
      setInputs((prev) => ({
        ...prev,
        deadline: new Date(newDate)
      }));
    }
  };

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <InputLabel htmlFor="amount">
            Organization
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </InputLabel>
          <FormControl fullWidth sx={{ mt: 1 }} error={errors.amount !== undefined}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Select
                labelId="organization-label"
                id="organization"
                value={inputs?.organizationId}
                onChange={handle.inputs}
                variant="outlined"
                name="organizationId"
                disabled={disabled}
                sx={{ flexGrow: 1 }}
                fullWidth
              >
                {Object.keys(organization.organizations).map((key, i) => {
                  const item = organizer.organizations[key];
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
              <Button
                variant="contained"
                onClick={() => {
                  router.push("/organization/create");
                }}
                sx={{ whiteSpace: "nowrap", px: 4, py: 2 }}
              >
                Create Organization
              </Button>
            </Box>
          </FormControl>
        </Grid>

        {/* <Grid item xs={12}>
          <InputLabel htmlFor="org-name">Sponsor Name</InputLabel>
          <FormHelperText sx={{ mt: 2 }}>
            Controls the publically visible name of this sponsor.
          </FormHelperText>
          <FormControl fullWidth error={errors.name !== undefined}>
            <OutlinedInput
              id="org-name"
              name="name"
              aria-describedby="org-name-helper"
              value={inputs.name}
              onChange={handle.inputs}
              disabled={disabled}
              sx={{ mt: 1 }}
              fullWidth
              required
            />
            {errors.name !== undefined && (
              <FormHelperText id="org-name-helper" sx={{ mt: 2 }}>
                {errors.name}
              </FormHelperText>
            )}
          </FormControl>
        </Grid> */}

        <Grid item xs={12}>
          <InputLabel htmlFor="amount">Sponsor Amount
            <span style={{ color: theme.palette.primary.main }}> * </span></InputLabel>
          <FormControl fullWidth sx={{ mt: 1 }} error={errors.amount !== undefined}>
            <OutlinedInput
              id="amount"
              name="amount"
              aria-describedby="amount-helper"
              value={inputs.amount}
              onChange={handle.inputs}
              disabled={disabled}
              type="number"
              fullWidth
            />
            {errors.amount !== undefined && (
              <FormHelperText id="amount-helper" sx={{ mt: 2 }}>
                {errors.amount}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <InputLabel htmlFor="deadline">Deadline
            <span style={{ color: theme.palette.primary.main }}> * </span></InputLabel>
          <FormControl fullWidth>
            <DatePicker
              value={inputs?.deadline}
              setValue={handle.deadlineChange}
              sx={{ mt: 1, width: "100%" }}
              disabled={disabled}
            />
          </FormControl>
        </Grid>
        
        <Grid item xs={12}>
          <InputLabel htmlFor="views">Views
            <span style={{ color: theme.palette.primary.main }}> * </span></InputLabel>
          <FormControl fullWidth sx={{ mt: 1 }} error={errors.views !== undefined}>
            <OutlinedInput
              id="views"
              name="views"
              aria-describedby="views-helper"
              value={inputs.views}
              onChange={handle.inputs}
              disabled={disabled}
              type="number"
              fullWidth
            />
            {errors.views !== undefined && (
              <FormHelperText id="views-helper" sx={{ mt: 2 }}>
                {errors.views}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <InputLabel htmlFor="liveViewers">Live Viewers
            <span style={{ color: theme.palette.primary.main }}> * </span></InputLabel>
          <FormControl fullWidth sx={{ mt: 1 }} error={errors.liveViewers !== undefined}>
            <OutlinedInput
              id="liveViewers"
              name="liveViewers"
              aria-describedby="liveViewers-helper"
              value={inputs.liveViewers}
              onChange={handle.inputs}
              disabled={disabled}
              type="number"
              fullWidth
            />
            {errors.liveViewers !== undefined && (
              <FormHelperText id="liveViewers-helper" sx={{ mt: 2 }}>
                {errors.liveViewers}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <InputLabel htmlFor="followers">Followers
            <span style={{ color: theme.palette.primary.main }}> * </span></InputLabel>
          <FormControl fullWidth sx={{ mt: 1 }} error={errors.followers !== undefined}>
            <OutlinedInput
              id="followers"
              name="followers"
              aria-describedby="followers-helper"
              value={inputs.followers}
              onChange={handle.inputs}
              disabled={disabled}
              type="number"
              fullWidth
            />
            {errors.followers !== undefined && (
              <FormHelperText id="followers-helper" sx={{ mt: 2 }}>
                {errors.followers}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>

        <Grid item>
          <LoadingButton variant="contained" onClick={handle.create} disabled={disabled}>
            PUBLISH
          </LoadingButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
