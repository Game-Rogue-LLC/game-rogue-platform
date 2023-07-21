import {
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography,
  useTheme
} from "@mui/material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { customMessages, model, rules } from "@/lib/firestore/collections/shops";
import { useEffect, useState } from "react";

import ColorSelect from "@/src/components/dropdown/ColorSelect";
import { Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import ShopLayout from "@/src/content/ShopLayout";
import Validator from "validatorjs";
import config from "@/src/config/global";
import { enqueueSnackbar } from "notistack";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";

const initialInputs = {
  ...model
};

const Page = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useAuthContext();
  const { shop } = useTournamentContext();
  const { colors, setColors } = useStyleContext();
  const [banner, setBanner] = useState(null);
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
      setErrors((prev) => ({
        ...prev,
        ...validator.errors.errors
      }));
      return false;
    }

    setErrors({});
    return true;
  };

  const handle = {
    create: async (e) => {
      if (validate(inputs, rules, customMessages) === false) {
        return;
      }
      let newShop = { ...inputs, uid: user.id };
      setSaving(true);

      const res = await shop.create(newShop);
      if (res.code === "succeed") {
        if (banner) {
          const res1 = await shop.upload(banner, res.data.id, "banner");
          if (res1.code === "succeed") {
            const res2 = await shop.update(res.data.id, { banner: res1.url });
            if (res2.code === "succeed") {
              enqueueSnackbar("Saved successfully!", { variant: "success" });
            } else {
              console.warn(res2.message);
            }
          } else {
            console.warn(res1.message);
          }
        }
      } else {
        console.warn(res.message);
      }

      setSaving(false);
    },
    inputs: (e) => {
      let { name, type, value } = e.target;
      if (type === "number") value = Number(value);
      setInputs({
        ...inputs,
        [name]: value
      });
    },
    upload: (e, name) => {
      if (e.target.files.length === 0) return;
      const file = e.target?.files[0];
      const url = URL.createObjectURL(file);
      switch (name) {
        case "banner":
          setBanner(file);
          setInputs({
            ...inputs,
            banner: url
          });
          break;
      }
    }
  };

  const onColorChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value?.hex
    });
  };

  return (
    <Container sx={{ py: 4 }}>
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
            <InputLabel htmlFor="name">Shop Name</InputLabel>
            <FormControl fullWidth error={errors.name !== undefined}>
              <OutlinedInput
                id="name"
                name="name"
                aria-describedby="name-helper"
                value={inputs.name}
                onChange={handle.inputs}
                sx={{ mt: 1 }}
                fullWidth
                required
              />
              {errors.name !== undefined && (
                <FormHelperText id="name-helper" sx={{ mt: 2 }}>
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="description">Tagline</InputLabel>
            <FormControl fullWidth error={errors.description !== undefined}>
              <OutlinedInput
                id="description"
                name="description"
                value={inputs.description}
                aria-describedby="description-helper"
                onChange={handle.inputs}
                sx={{ mt: 1 }}
                fullWidth
                required
              />
              {errors.description !== undefined && (
                <FormHelperText id="description-helper" sx={{ mt: 2 }}>
                  {errors.description}
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
            <LoadingButton loading={saving} variant="contained" onClick={handle.create}>
              Register
            </LoadingButton>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <ShopLayout>{page}</ShopLayout>
    </TournamentProvider>
  );
};

export default Page;
