import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useState } from "react";

import { Lock } from "@mui/icons-material";
import PublicLayout from "@/src/content/PublicLayout";
import { enqueueSnackbar } from "notistack";
import store from "@/lib/firestore/collections";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";

const Page = ({}) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const [page, setPage] = useState("/");
  const [input, setInput] = useState("");
  const [meta, setMeta] = useState(null);

  useEffect(() => {
    if (router?.query?.page) setPage(router.query.page);
  }, [router]);

  useEffect(() => {
    store.meta.read("locked").then((res) => {
      if (res.code === "succeed") {
        setMeta(res.data);
      }
    });
  }, []);

  const onAccessCodeChange = (e) => {
    setInput(e.target.value);
  };
  const onAccess = (e) => {
    if (meta && input === meta.accessCode) {
      store.meta.save("locked", { allowed: [...(meta.allowed ? meta.allowed : []), user.id] });
      router.push(`/${page}`);
    } else {
      enqueueSnackbar("Access Code is not correct!", { variant: "error" });
    }
  };

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
      <TextField value={input} onChange={onAccessCodeChange} />
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
