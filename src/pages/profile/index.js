import {
  Alert,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  SvgIcon,
  Switch,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { CreditCard, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { brighterColor, isBrightColor } from "@/src/utils/utils";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { customMessages, model, rules } from "@/lib/firestore/collections/organization";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import ColorSelect from "@/src/components/dropdown/ColorSelect";
import Colors from "@/src/components/Colors";
import ContentBlock from "@/src/components/widgets/ContentBlock";
import CustomButton from "@/src/components/button/CustomButton";
import CustomLoadingButton from "@/src/components/button/CustomLoadingButton";
import { DEFAULT_LIGHT_LOGO } from "@/src/config/global";
import { LoadingButton } from "@mui/lab";
import Validator from "validatorjs";
import { htmlToMarkdown } from "@/src/utils/html-markdown";
import { useAppContext } from "@/src/context/app";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const initialInputs = {
  ...model
};

const Page = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const { setTitle } = useAppContext();
  const { colors, setColors } = useStyleContext();
  const { organization, event } = useTournamentContext();
  const [disabled, setDisabled] = useState(false);
  const [open, setOpen] = useState(false);
  const [oid, setOID] = useState(null);
  const [errors, setErrors] = useState({});
  const [contentImage, setContentImage] = useState(null);
  const [darkLogo, setDarkLogo] = useState(null);
  const [lightLogo, setLightLogo] = useState(null);
  const [saving, setSaving] = useState({
    disband: false,
    name: false,
    social: false,
    contentBlock: false,
    features: false
  });
  const [inputs, setInputs] = useState({ ...initialInputs });

  const onColorChange = (name, value) => {
    setInputs({
      ...inputs,
      [name]: value?.hex
    });
  };

  useEffect(() => {
    setColors({
      primary: inputs?.primary,
      secondary: inputs?.secondary,
      tertiary: inputs?.tertiary
    });
  }, [inputs?.primary, inputs?.secondary, inputs?.tertiary]);

  useEffect(() => {
    setTitle("ORGANIZER PROFILE");
  }, []);

  useEffect(() => {
    if (router?.query?.organization) {
      setOID(router.query.organization);
      organization.setCurrent(oid);
      event.setCurrent(null);
    }
  }, [router?.query?.organization]);

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      ...organization.organizations[oid]
    }));
    // setColors({
    //   primary: organization.organizations[oid].primary,
    //   secondary: organization.organizations[oid].secondary,
    //   tertiary: organization.organizations[oid].tertiary,
    // });
  }, [organization.organizations, oid]);

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
    saveName: async (e) => {
      if (validate(inputs, rules, customMessages) === false) return;

      setSaving((prev) => ({
        ...prev,
        name: true
      }));

      let newOrganization = {
        name: inputs?.name,
        tagline: inputs?.tagline,
        primary: inputs?.primary,
        secondary: inputs?.secondary,
        tertiary: inputs?.tertiary
      };

      let uploaded = true;
      if (darkLogo) {
        uploaded = false;
        const res = await organization.upload(darkLogo, oid);
        if (res.code === "succeed") {
          newOrganization.darkLogo = res.url;
          uploaded = true;
        } else {
          console.warn(res.message);
        }
      }
      if (lightLogo) {
        uploaded = false;
        const res = await organization.upload(lightLogo, oid);
        if (res.code === "succeed") {
          newOrganization.lightLogo = res.url;
          uploaded = true;
        } else {
          console.warn(res.message);
        }
      }

      const res = await organization.update(oid, newOrganization);

      if (res.code == "succeed") {
        const key = enqueueSnackbar("Saved Successfully!", {
          variant: "success",
          SnackbarProps: { onClick: () => closeSnackbar(key) }
        });
      }

      setSaving((prev) => ({
        ...prev,
        name: false
      }));
    },
    saveLink: async (e) => {
      setSaving((prev) => ({
        ...prev,
        social: true
      }));

      const res = await organization.update(oid, {
        twitterLink: inputs?.twitterLink,
        instagramLink: inputs?.instagramLink,
        youtubeLink: inputs?.youtubeLink,
        twitchLink: inputs?.twitchLink,
        discordLink: inputs?.discordLink
      });

      if (res.code == "succeed") {
        alert(res.message);
      }

      setSaving((prev) => ({
        ...prev,
        social: false
      }));
    },
    saveContentBlock: async (e) => {
      setSaving((prev) => ({
        ...prev,
        contentBlock: true
      }));

      let newOrganization = {
        contentBlock: {
          ...inputs?.contentBlock
          // text: htmlToMarkdown(inputs?.contentBlock.text)
        }
      };

      let uploaded = true;
      if (contentImage) {
        uploaded = false;
        const res = await organization.upload(contentImage, oid);
        if (res.code === "succeed") {
          newOrganization.contentBlock.image = res.url;
          uploaded = true;
        } else {
          console.warn(res.message);
        }
      }
      if (uploaded) {
        const res = await organization.update(oid, newOrganization);
        if (res.code === "succeed") {
          alert("Saved successfully!");
        } else {
          console.warn(res.message);
        }
      }

      setSaving((prev) => ({
        ...prev,
        contentBlock: false
      }));
    },
    saveFeatures: async (e) => {
      setSaving((prev) => ({
        ...prev,
        features: true
      }));

      const res = await organization
        .update(oid, {
          twitter: inputs?.twitter,
          instagram: inputs?.instagram,
          youtube: inputs?.youtube,
          twitch: inputs?.twitch,
          discord: inputs?.discord,
          crowdFund: inputs?.crowdFund,
          actualFund: inputs?.actualFund,
          credit: inputs?.credit,
          paypal: inputs?.paypal
        })
        .then((res) => {
          if (res.code == "succeed") alert(res.message);
          setSaving((prev) => ({
            ...prev,
            features: false
          }));
        })
        .catch((err) => {
          setSaving((prev) => ({
            ...prev,
            features: false
          }));
        });
    },
    delete: (e) => {
      setOpen(false);
      setSaving((prev) => ({
        ...prev,
        disband: true
      }));
      organization.delete(oid);
    },
    // Open/Close the Modal for delete confirm
    modalOpen: (e) => {
      setOpen(true);
    },
    modalClose: (e) => {
      setOpen(false);
    },
    input: (e) => {
      let { name, type, value } = e.target;
      setInputs((prev) => ({
        ...prev,
        [name]: value
      }));
    },
    switch: (e) => {
      const { name, checked } = e.target;
      setInputs((prev) => ({
        ...prev,
        [name]: checked
      }));
    },
    changeContentBlock: (data) => {
      setInputs((prev) => ({
        ...prev,
        contentBlock: {
          ...prev.contentBlock,
          ...data
        }
      }));
    },
    upload: (e, name) => {
      const file = e.target?.files[0];
      const url = URL.createObjectURL(file);
      switch (name) {
        case "darkLogo":
          setDarkLogo(file);
          setInputs({
            ...inputs,
            darkLogo: url
          });
          break;
        case "lightLogo":
          setLightLogo(file);
          setInputs({
            ...inputs,
            lightLogo: url
          });
          break;
      }
    },
    removeDarkLogo: (e) => {
      setInputs({
        ...inputs,
        darkLogo: DEFAULT_DARK_LOGO
      });
    },
    removeLightLogo: (e) => {
      setInputs({
        ...inputs,
        lightLogo: DEFAULT_LIGHT_LOGO
      });
    },
    uploadContentImageAction: (e, name) => {
      const img = e.target?.files[0];
      if (img.size > 2048000) return;
      setContentImage(img);
      const path = URL.createObjectURL(img);
      setInputs((prev) => ({
        ...prev,
        contentBlock: {
          ...prev.contentBlock,
          image: path
        }
      }));
    }
  };

  return (
    <Box>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6">Disband/Delete Profile</Typography>
        <CustomLoadingButton
          loading={saving?.disband}
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handle.modalOpen}
        >
          Disband
        </CustomLoadingButton>
        <Dialog
          open={open}
          onClose={handle.modalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete the organizer profile?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you really want to delete this profile?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <CustomButton onClick={handle.modalClose}>Cancel</CustomButton>
            <CustomButton onClick={handle.delete} autoFocus>
              OK
            </CustomButton>
          </DialogActions>
        </Dialog>
      </Paper>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Box>
          <Typography variant="h6">Organization Detail</Typography>

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

          <InputLabel htmlFor="org-name" sx={{ mt: 2 }}>
            Organization Name
          </InputLabel>
          <FormHelperText>
            Controls the publically visible name of this organization.
          </FormHelperText>
          <FormControl fullWidth error={false}>
            <OutlinedInput
              id="org-name"
              name="name"
              aria-describedby="org-name-helper"
              value={inputs?.name || ""}
              onChange={handle.input}
              disabled={disabled}
              sx={{ mt: 1 }}
              fullWidth
              required
            />
          </FormControl>

          <InputLabel htmlFor="org-tag" sx={{ mt: 2 }}>
            Tagline
          </InputLabel>
          <FormControl fullWidth sx={{ mt: 1 }}>
            <OutlinedInput
              id="org-tag"
              name="tagline"
              aria-describedby="org-tag-helper"
              value={inputs?.tagline || ""}
              inputProps={{ maxLength: 50 }}
              required
              onChange={handle.input}
              disabled={disabled}
              fullWidth
            />
          </FormControl>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6">Colors</Typography>
          <Colors colors={inputs} onColorChange={onColorChange} />
        </Box>

        <CustomLoadingButton
          loading={saving?.name}
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handle.saveName}
        >
          Save
        </CustomLoadingButton>
      </Paper>

      <ContentBlock
        contentBlock={inputs.contentBlock}
        handleChange={handle.changeContentBlock}
        save={handle.saveContentBlock}
        handleUpload={handle.uploadContentImageAction}
        saving={saving?.contentBlock}
      />

      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6">Social Accounts</Typography>
        <Box sx={{ mt: 2 }}>
          <InputLabel htmlFor="org-twitter">Twitter</InputLabel>
          <FormControl fullWidth>
            <OutlinedInput
              id="org-twitter"
              name="twitterLink"
              aria-describedby="org-twitter-helper"
              value={inputs?.twitterLink || ""}
              onChange={handle.input}
              disabled={disabled}
              sx={{ mt: 1 }}
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Twitter fontSize="large" />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputLabel htmlFor="org-instagram">Instagram</InputLabel>
          <FormControl fullWidth>
            <OutlinedInput
              id="org-instagram"
              name="instagramLink"
              aria-describedby="org-instagram-helper"
              value={inputs?.instagramLink || ""}
              onChange={handle.input}
              disabled={disabled}
              sx={{ mt: 1 }}
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <Instagram fontSize="large" />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputLabel htmlFor="org-youtube">YouTube</InputLabel>
          <FormControl fullWidth>
            <OutlinedInput
              id="org-youtube"
              name="youtubeLink"
              aria-describedby="org-youtube-helper"
              value={inputs?.youtubeLink || ""}
              onChange={handle.input}
              disabled={disabled}
              sx={{ mt: 1 }}
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <YouTube fontSize="large" />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputLabel htmlFor="org-discord">Discord</InputLabel>
          <FormControl fullWidth>
            <OutlinedInput
              id="org-discord"
              name="discordLink"
              aria-describedby="org-discord-helper"
              value={inputs?.discordLink || ""}
              onChange={handle.input}
              disabled={disabled}
              sx={{ mt: 1 }}
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <img src="/static/images/discord.svg" height={"30px"} />
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box sx={{ mt: 2 }}>
          <InputLabel htmlFor="org-twitch">Twitch</InputLabel>
          <FormControl fullWidth>
            <OutlinedInput
              id="org-twitch"
              name="twitchLink"
              aria-describedby="org-twitch-helper"
              value={inputs?.twitchLink || ""}
              onChange={handle.input}
              disabled={disabled}
              sx={{ mt: 1 }}
              fullWidth
              startAdornment={
                <InputAdornment position="start">
                  <SvgIcon fontSize="large">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
                      />
                    </svg>
                  </SvgIcon>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <CustomLoadingButton
          loading={saving?.social}
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handle.saveLink}
        >
          Save
        </CustomLoadingButton>
      </Paper>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6">Turn on/off features</Typography>
        <FormGroup sx={{ mt: 2 }}>
          <FormControlLabel
            control={<Switch checked={inputs?.signup} name="signup" onChange={handle.switch} />}
            label="Sign-up"
          />
          <FormControlLabel
            control={<Switch checked={inputs?.discord} name="discord" onChange={handle.switch} />}
            label="Discord community preview"
          />
          <FormControlLabel
            control={<Switch checked={inputs?.twitter} name="twitter" onChange={handle.switch} />}
            label="Show recent Twitter activity"
          />
          <FormControlLabel
            control={
              <Switch checked={inputs?.instagram} name="instagram" onChange={handle.switch} />
            }
            label="Show recent Instagram activity"
          />
          <FormControlLabel
            control={<Switch checked={inputs?.youtube} name="youtube" onChange={handle.switch} />}
            label="Show recent YouTube videos"
          />
          <FormControlLabel
            control={<Switch checked={inputs?.twitch} name="twitch" onChange={handle.switch} />}
            label="Twitch streams"
          />
        </FormGroup>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Payment Information</Typography>
          <Grid container spacing={2} sx={{ alignItems: "center", mt: 0 }}>
            <Grid item>
              <FormControlLabel control={<Switch defaultChecked />} label="Crowdfund" />
            </Grid>
            <Grid item>
              <OutlinedInput
                size="small"
                name="actualFund"
                value={Number(inputs?.actualFund).toFixed(2)}
                disabled
              />
            </Grid>
            <Grid item>
              <span style={{ fontSize: "30px" }}>/</span>
            </Grid>
            <Grid item>
              <OutlinedInput
                size="small"
                name="crowdFund"
                value={inputs?.crowdFund}
                onChange={handle.input}
              />
            </Grid>
          </Grid>
          <Box display="flex" sx={{ pl: 5 }}>
            <Box>
              <Box display="flex" alignItems="center">
                <Checkbox name="credit" checked={inputs?.credit} onChange={handle.switch} />
                <CreditCard />
                <Typography variant="body2" sx={{ ml: 2 }}>
                  Credit/Debit Card
                </Typography>
              </Box>
              <Box></Box>
            </Box>
            <Box>
              <Box display="flex" alignItems="center">
                <Checkbox name="paypal" checked={inputs?.paypal} onChange={handle.switch} />
                <img src="/static/images/paypal-color.svg" style={{ height: "30px" }} />
              </Box>
            </Box>
          </Box>
        </Box>
        <CustomLoadingButton
          loading={saving?.features}
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handle.saveFeatures}
        >
          Save
        </CustomLoadingButton>
      </Paper>
    </Box>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
