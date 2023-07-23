import { Box, Button, Container, Grid, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import Image from "next/image";
import { Lock } from "@mui/icons-material";
import MemberItem from "@/src/components/item/MemberItem";
import PublicLayout from "@/src/content/PublicLayout";
import TournamentProvider from "@/src/context/TournamentContext";
import { useRouter } from "next/router";

const Page = ({}) => {
  const theme = useTheme();
  const router = useRouter();
  const [page, setPage] = useState("/");
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    if (router?.query?.page) setPage(router.query.page);
  }, [router]);

  const onAccessCodeChange = (e) => {
    setAccessCode(e.target.value);
  };
  const onAccess = (e) => {};

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 1,
        py: 5
      }}
    >
      <Lock sx={{ width: "80px", height: "80px", fill: theme.palette.primary.main }} />
      <Typography variant="h4" color={theme.palette.primary.main}>
        This feature is currently locked. Come back on the 25th for access!
      </Typography>
      <Box sx={{ height: "20px" }}></Box>
      <Typography variant="h6">Access Code</Typography>
      <TextField value={accessCode} onChange={onAccessCodeChange} />
      <Button variant="contained" sx={{ color: "white" }} onClick={onAccess}>
        ACCESS
      </Button>
    </Box>
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
