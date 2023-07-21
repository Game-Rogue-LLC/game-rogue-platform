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

import ArticleLayout from "@/src/content/ArticleLayout";
import Button from "@mui/material/Button";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Page = (props) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { organization, event } = useTournamentContext();

  useEffect(() => {
    setTitle("ARTICLE");
  }, []);

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">CREATE ARTICLE</Typography>
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <ArticleLayout>{page}</ArticleLayout>;
};

export default Page;
