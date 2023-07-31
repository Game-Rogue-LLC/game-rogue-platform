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
import { useEffect, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import Button from "@mui/material/Button";
import JoinTeam from "@/src/components/widgets/team/JoinTeam";
import { LoadingButton } from "@mui/lab";

const Page = (props) => {
  useEffect(() => {
    setTitle("JOIN A TEAM");
  }, []);

  return <JoinTeam />;
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
