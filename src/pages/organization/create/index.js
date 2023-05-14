import { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  InputLabel,
  FormHelperText,
  Grid,
  Paper,
  useTheme,
  Typography,
  TextField,
  Alert,
  OutlinedInput,
} from "@mui/material";

import AdminLayout from "@/src/content/AdminLayout";
import { useAppContext } from "@/src/context/app";
import { useRouter } from "next/router";
import Validator from "validatorjs";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { useAuthContext } from "@/src/context/AuthContext";
// import ColorPicker from "@mapbox/react-colorpickr";
import {
  GooglePicker,
  SketchPicker,
  ChromePicker,
} from "@hello-pangea/color-picker";
import ColorSelect from "@/src/components/dropdown/ColorSelect";
import {
  model,
  rules,
  customMessages,
} from "@/lib/firestore/collections/organization";
import colorConvert from "color-convert";
import { brighterColor, isBrightColor } from "@/src/utils/utils";
import { useStyleContext } from "@/src/context/StyleContext";

const initialInputs = {
  ...model,
};

const Page = (props) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { colors, setColors, buttonStyle } = useStyleContext();
  const { organization, event } = useTournamentContext();
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setTitle("REGISTER AN ORGANIZATION");
    organization.setCurrent(null);
    event.setCurrent(null);
  }, []);

  useEffect(() => {
    if (organization.activeCount >= 3) setDisabled(true);
    else setDisabled(false);
  }, [organization.activeCount]);

  useEffect(() => {
    setColors({
      primary: inputs?.primary,
      secondary: inputs?.secondary,
      tertiary: inputs?.tertiary,
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
      if (!validate(inputs, rules, customMessages)) return;
      const newOrg = {
        ...inputs,
        uid: user.id,
      };

      organization
        .create(newOrg)
        .then((res) => {
          if (res.code === "succeed") {
            router.push("/profile?organization=" + res.id);
          } else if (res.code === "failed") {
            console.error(res.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    },
    inputs: (e) => {
      let { name, type, value } = e.target;
      if (type === "number") value = Number(value);
      setInputs({
        ...inputs,
        [name]: value,
      });
    },
  };

  const onColorChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value?.hex,
    });
  };

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
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
          <FormControl
            fullWidth
            sx={{ mt: 1 }}
            error={errors.tagline !== undefined}
          >
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
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} lg={4}>
            <InputLabel>Primary</InputLabel>
            <ColorSelect
              name="primary"
              label="Primary"
              value={inputs?.primary}
              onChange={(val) => onColorChange("primary", val)}
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} lg={4}>
            <InputLabel>Secondary</InputLabel>
            <ColorSelect
              name="secondary"
              label="Secondary"
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
              value={inputs?.tertiary}
              onChange={(val) => onColorChange("tertiary", val)}
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            onClick={handle.create}
            disabled={disabled}
            sx={{
              ...buttonStyle,
            }}
          >
            Register
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
