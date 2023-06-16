import {
  Alert,
  Box,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  IconButton,
  useTheme
} from "@mui/material";
import { customMessages, model, rules } from "@/lib/firestore/collections/shops";
import { useEffect, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import Button from "@mui/material/Button";
import CountrySelect from "@/src/components/dropdown/CountrySelect";
import { DEFAULT_LOGO } from "@/src/config/global";
import GameSelect from "@/src/components/dropdown/GameSelect";
import { Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import * as config from "@/src/config/global";
import Validator from "validatorjs";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import PublicLayout from "@/src/content/PublicLayout";

const initialInputs = {
  ...model
};

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const { shop } = useTournamentContext();

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
      if (validate(inputs, rules, customMessages) === false) return;

      setSaving(true);

      const newShop = {
        ...inputs,
        uid: user.id,
        createdAt: new Date()
      };

      const data = await shop.create(newShop);

      if (data.code === "succeed") {
        let uploaded = true;

        if (banner) {
          uploaded = false;
          const res = await shop.upload(banner, data.data.id, "banner");
          if (res.code === "succeed") {
            uploaded = true;
            await shop.update(data.data.id, { banner: res.url });
          }
        }
      } else {
        console.warn(data.message);
      }
      setSaving(false);
    },
    inputs: (e) => {
      let { name, type, value } = e.target;
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

  useEffect(() => {
    setTitle("CREATE SHOP");
  }, []);

  return (
    <Container sx={{ marginTop: "20px", marginBottom: "20px" }}>
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
            <InputLabel htmlFor="shop-name">Shop Name</InputLabel>
            <FormControl fullWidth error={errors.name !== undefined}>
              <OutlinedInput
                id="shop-name"
                name="name"
                aria-describedby="shop-name-helper"
                value={inputs.name}
                onChange={handle.inputs}
                sx={{ mt: 1 }}
                fullWidth
                required
              />
              {errors.name !== undefined && (
                <FormHelperText id="shop-name-helper" sx={{ mt: 2 }}>
                  {errors.name}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <InputLabel htmlFor="shop-description">Description</InputLabel>
            <FormControl fullWidth error={errors.short !== undefined}>
              <OutlinedInput
                id="shop-description"
                name="description"
                value={inputs.short}
                aria-describedby="shop-description"
                onChange={handle.inputs}
                sx={{ mt: 1 }}
                fullWidth
                required
              />
              {errors.short !== undefined && (
                <FormHelperText id="shop-description-helper" sx={{ mt: 2 }}>
                  {errors.short}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item>
            <LoadingButton loading={saving} variant="contained" onClick={handle.create}>
              Create Shop
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
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;
