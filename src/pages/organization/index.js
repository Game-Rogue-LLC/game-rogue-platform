import { useEffect, useState } from "react";
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
import { useTournamentContext } from "@/src/context/TournamentContext";
import { useAuthContext } from "@/src/context/AuthContext";

const Page = (props) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { organization, event } = useTournamentContext();

  useEffect(() => {
    setTitle("ORGANIZATION");
    organization.setCurrent(null);
    event.setCurrent(null);
  }, []);

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Organization Dashboard</Typography>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
