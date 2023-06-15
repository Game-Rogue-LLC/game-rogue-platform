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
