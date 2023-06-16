import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Switch,
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
import AccountInfo from "@/src/components/widgets/rogue-social/profile/AccountInfo";

export const initialInputs = {
  name: "",
  userName: "",
  // gender: 0,
  birthday: new Date(),
  showAge: true,
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
  const [uid, setUID] = useState(null);
  const [item, setItem] = useState(null);
  const [inputs, setInputs] = useState({ ...initialInputs });
  const { setTitle } = useAppContext();
  const { player } = useTournamentContext();

  useEffect(() => {
    setInputs({
      ...inputs,
      ...item
    });
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
  }, [router, player.players]);

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
      if (e.target.files.length === 0) return;
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
    <Paper sx={{ p: 2 }}>
      <AccountInfo item={item} />
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
