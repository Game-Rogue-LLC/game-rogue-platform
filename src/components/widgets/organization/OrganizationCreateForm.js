import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { ChromePicker, GooglePicker, SketchPicker } from "@hello-pangea/color-picker";
import { brighterColor, isBrightColor } from "@/src/utils/utils";
import { customMessages, model, rules } from "@/lib/firestore/collections/organization";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import Button from "@mui/material/Button";
import ColorSelect from "@/src/components/dropdown/ColorSelect";
import CustomButton from "@/src/components/button/CustomButton";
import CustomLoadingButton from "@/src/components/button/CustomLoadingButton";
import { ORGANIZATION_PROFILE_LIMIT } from "@/src/config/global";
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

const OrganizationCreateForm = ({ disabled: _disabled }) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const router = useRouter();
  const { colors, setColors } = useStyleContext();
  const { organization, event } = useTournamentContext();
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(_disabled);

  useEffect(() => {
    organization.setCurrent(null);
    event.setCurrent(null);
  }, []);

  useEffect(() => {
    if (organization.activeCount >= 3 || _disabled) setDisabled(true);
    else setDisabled(false);
  }, [organization.activeCount]);

  useEffect(() => {
    setColors({
      primary: inputs?.primary,
      secondary: inputs?.secondary,
      tertiary: inputs?.tertiary
    });
  }, [inputs?.primary, inputs?.secondary, inputs?.tertiary]);

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
      if (
        _.filter(organization.organizations, (org) => org.uid === user.id) >=
        ORGANIZATION_PROFILE_LIMIT
      ) {
        enqueueSnackbar("You can't create more than 1 organization.", { variant: "error" });
      }

      if (!validate(inputs, rules, customMessages)) return;
      const newOrg = {
        ...inputs,
        uid: user.id
      };

      const rogueIdExists = await organization.rogueIdExists(inputs?._id);
      if (rogueIdExists) {
        setErrors((prev) => ({ ...prev, _id: "Rogue ID is already taken." }));
        return;
      } else setErrors((prev) => ({ ...prev, _id: undefined }));

      organization
        .create(newOrg)
        .then((res) => {
          if (res.code === "succeed") {
            router.push("/organization/" + res.id + "/edit");
          } else if (res.code === "failed") {
            console.warn(res.message);
          }
        })
        .catch((err) => {
          console.warn(err);
        });
    },
    inputs: (e) => {
      let { name, type, value } = e.target;
      if (type === "number") value = Number(value);
      setInputs({
        ...inputs,
        [name]: value
      });
    }
  };

  const onColorChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value?.hex
    });
  };

  return (
    <Grid container rowSpacing={3}>
      <Grid item xs={12}>
        <Typography variant="h6">Register Organization</Typography>
      </Grid>
      <Grid item xs={12}>
        <InputLabel htmlFor="org-name">Organization Name</InputLabel>
        <FormHelperText sx={{ mt: 2 }}>
          Controls the publically visible name of this organization.
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
      </Grid>
      <Grid item xs={12}>
        <InputLabel htmlFor="org-tag">Tagline</InputLabel>
        <FormControl fullWidth sx={{ mt: 1 }} error={errors.tagline !== undefined}>
          <OutlinedInput
            id="org-tag"
            name="tagline"
            aria-describedby="org-tag-helper"
            value={inputs.tagline}
            inputProps={{ maxLength: 50 }}
            onChange={handle.inputs}
            disabled={disabled}
            fullWidth
            required
          />
          {errors.tagline !== undefined && (
            <FormHelperText id="org-tag-helper" sx={{ mt: 2 }}>
              {errors.tagline}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <InputLabel htmlFor="org-name" sx={{ color: "white" }}>
          Rogue ID
        </InputLabel>
        <FormHelperText>Controls the publically visible name of this organizer.</FormHelperText>
        <FormControl fullWidth error={errors._id !== undefined}>
          <OutlinedInput
            id="rogue-id"
            name="_id"
            aria-describedby="rogue-id-helper"
            value={inputs?._id || ""}
            onChange={handle.inputs}
            disabled={disabled}
            sx={{ mt: 1 }}
            fullWidth
            required
          />
          {errors._id !== undefined && (
            <FormHelperText id="rogue-id-helper" sx={{ mt: 2 }}>
              {errors._id}
            </FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} container spacing={2}>
        <Grid item xs={12} lg={4}>
          <InputLabel>Primary</InputLabel>
          <ColorSelect
            name="primary"
            label="Primary"
            value={inputs?.primary}
            disabled={disabled}
            onChange={(val) => onColorChange("primary", val)}
            sx={{ mt: 1 }}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <InputLabel>Secondary</InputLabel>
          <ColorSelect
            name="secondary"
            label="Secondary"
            disabled={disabled}
            value={inputs?.secondary}
            onChange={(val) => onColorChange("secondary", val)}
            sx={{ mt: 1 }}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <InputLabel>Tertiary</InputLabel>
          <ColorSelect
            name="tertiary"
            label="Tertiary"
            disabled={disabled}
            value={inputs?.tertiary}
            onChange={(val) => onColorChange("tertiary", val)}
            sx={{ mt: 1 }}
          />
        </Grid>
      </Grid>
      <Grid item>
        <CustomLoadingButton variant="contained" onClick={handle.create} disabled={disabled}>
          Register
        </CustomLoadingButton>
      </Grid>
    </Grid>
  );
};

export default OrganizationCreateForm;
