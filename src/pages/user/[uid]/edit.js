import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import CountrySelect from "@/src/components/dropdown/CountrySelect";
import DatePicker from "@/src/components/datetime/DatePicker";
import { LoadingButton } from "@mui/lab";
import UserInfo from "@/src/components/widgets/user/UserInfo";
import Validator from "validatorjs";
import { useAppContext } from "@/src/context/app";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

export const initialInputs = {
  name: "",
  userName: "",
  gender: 0,
  birthday: new Date(),
  residency: {
    code: "US",
    label: "United States",
    phone: "1"
  }
};

export const rules = {
  userName: "required"
};

export const customMessages = {
  "required.userName": "User Name is required."
};

const Page = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const [uid, setUID] = useState(null);
  const [item, setItem] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [inputs, setInputs] = useState({ ...initialInputs });
  const [disabled, setDisabled] = useState(false);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const { setTitle } = useAppContext();
  const { player, team } = useTournamentContext();

  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      ...item
    }));
  }, [item]);

  useEffect(() => {
    setItem(player.players[uid]);
  }, [player.players, uid]);

  useEffect(() => {
    if (router?.query?.uid) {
      const newUID = router.query.uid;
      if (player.players[newUID]) {
        setUID(router.query.uid);
      } else {
        console.warn("Invalid User ID");
      }
    }
  }, [router]);

  useEffect(() => {
    setTitle("EDIT USER PROFILE");
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

  const setDate = (newDate) => {
    setInputs((prev) => ({
      ...prev,
      birthday: new Date(newDate)
    }));
  };

  const handle = {
    save: async (e) => {
      if (validate(inputs, rules, customMessages) === false) return;
      setSaving(true);
      let uploaded = true,
        newData = { ...inputs };

      if (avatar) {
        uploaded = false;
        const res = await player.upload(avatar, uid, "profilePic");
        if (res.code === "succeed") {
          newData.profilePic = res.url;
          uploaded = true;
        } else {
          console.warn(res.message);
        }
      }

      const res = await player.update(uid, newData);
      if (res.code === "succeed") {
        alert("Saved successfully!");
      } else {
        console.warn(res.message);
      }
      setSaving(false);
    },
    inputs: (e) => {
      let { name, type, value } = e.target;
      if (type === "number") value = Number(value);
      setInputs((prev) => ({
        ...prev,
        [name]: value
      }));
    },
    upload: (e, name) => {
      const file = e.target?.files[0];
      const url = URL.createObjectURL(file);
      setAvatar(file);
      setInputs((prev) => ({
        ...prev,
        [name]: url
      }));
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Grid container spacing={2}>
        <Grid item sx={{ width: 300 }}>
          <UserInfo
            avatar={inputs?.profilePic}
            item={item}
            editable={true}
            handle={(e) => handle.upload(e, "profilePic")}
          />
        </Grid>
        <Grid item xs container spacing={2}>
          <Grid item xs={12} lg={6}>
            <Typography variant="h6">User Name</Typography>
            <FormControl sx={{ mt: 1 }} fullWidth error={errors.userName !== undefined}>
              <OutlinedInput
                id="user-name"
                name="userName"
                aria-describedby="user-name-helper"
                value={inputs?.userName}
                disabled={disabled}
                onChange={handle.inputs}
              />
              {errors.userName !== undefined && (
                <FormHelperText id="user-name-helper" sx={{ mt: 2 }}>
                  {errors.userName}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h6">Gender</Typography>
            <Select
              labelId="gender-select-label"
              id="gender-select"
              value={inputs?.gender}
              onChange={handle.inputs}
              variant="outlined"
              name="gender"
              disabled={disabled}
              sx={{ mt: 1 }}
              fullWidth
            >
              <MenuItem key={0} value={0}>
                Male
              </MenuItem>
              <MenuItem key={1} value={1}>
                Female
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h6">Birthday</Typography>
            <DatePicker
              value={inputs?.birthday}
              setValue={setDate}
              sx={{ mt: 1, width: "100%" }}
              disabled={disabled}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <Typography variant="h6">Residency</Typography>
            <CountrySelect
              sx={{ mt: 1, width: "100%" }}
              option={inputs?.residency}
              setOption={(val) => setInputs((prev) => ({ ...prev, residency: val }))}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton loading={saving} variant="contained" onClick={handle.save}>
              Save
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
