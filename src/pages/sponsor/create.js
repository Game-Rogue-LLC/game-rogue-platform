import {
  Alert,
  Box,
  Button,
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
import { customMessages, model, rules } from "@/lib/firestore/collections/sponsor";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import ColorSelect from "@/src/components/dropdown/ColorSelect";
import CustomButton from "@/src/components/button/CustomButton";
import CustomLoadingButton from "@/src/components/button/CustomLoadingButton";
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
  const { organization, event } = useTournamentContext();
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  const { setTitle } = useAppContext();

  useEffect(() => {
    setTitle("CREATE SPONSOR");
  }, []);

  useEffect(() => {
    organization.setCurrent(null);
    event.setCurrent(null);
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

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">CREATE SPONSOR</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">
            Organization
            <span style={{ color: theme.palette.primary.main }}> * </span>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
            <Select
              labelId="organizer-select-label"
              id="organizer-select"
              value={inputs?.oid}
              onChange={handle.inputs}
              variant="outlined"
              name="oid"
              disabled={disabled}
              sx={{ mt: 1, flexGrow: 1 }}
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
            <Button
              variant="contained"
              onClick={() => {
                router.push("/organization/create");
              }}
            >
              Create Organization
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <InputLabel htmlFor="org-name">sponsor Name</InputLabel>
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
          <FormHelperText>Controls the publically visible name of this sponsor.</FormHelperText>
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
        <Grid item>
          <LoadingButton variant="contained" onClick={handle.create} disabled={disabled}>
            Register
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
