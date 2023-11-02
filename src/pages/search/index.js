import { Box, Container, Typography, useTheme } from "@mui/material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import PublicLayout from "@/src/content/PublicLayout";
import RogueSocialSplash from "@/src/content/Splash/RogueSocialSplash";
import _ from "lodash";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { withOpacity } from "@/src/utils/utils";

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const { player } = useTournamentContext();
  const [uid, setUID] = useState(router.query?.uid);

  useEffect(() => {
    if (router.query?.uid) setUID(router.query.uid);
  }, [router]);

  const results = useMemo(() => {
    if (uid)
      return _.filter(
        player.players,
        (val) =>
          val._id.toLowerCase().includes(uid.toLowerCase()) ||
          val.userName.toLowerCase().includes(uid.toLowerCase())
      );
    return _.map(player.players, (val) => val);
  }, [uid, player.players]);

  return (
    <Container
      sx={{
        py: 4,
        background: "black",
        display: "flex",
        flexDirection: "column",
        gap: 1
      }}
    >
      {results &&
        _.map(results, (val) => (
          <Link href={`/rogue-social/profile/${val.id}`}>
            <Box
              sx={{
                width: "100%",
                padding: 2,
                borderRadius: 2,
                border: "solid 1px rgba(255,255,255,.2)",
                ":hover": { backgroundColor: withOpacity(theme.palette.primary.main, 0.2) }
              }}
            >
              <Typography variant="h6">{val.userName + " (" + val._id + ")"}</Typography>
            </Box>
          </Link>
        ))}
    </Container>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <RogueSocialSplash />
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;
