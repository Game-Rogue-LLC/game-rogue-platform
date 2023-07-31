import { Box, Button, Container, Divider, Tab, Typography, styled, useTheme } from "@mui/material";

import FeaturedStreams from "@/src/components/widgets/rogue-tv/FeaturedStreams";
import GameCategories from "@/src/components/widgets/rogue-tv/GameCategories";
import LiveChannels from "@/src/components/widgets/rogue-tv/LiveChannels";
import RogueSocialSplash from "@/src/content/Splash/RogueSocialSplash";
import TVLayout from "@/src/content/TVLayout";
import TournamentProvider from "@/src/context/TournamentContext";
import _ from "lodash";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";

const channels = [
  {
    title: "road trip across Thailand tomorrow",
    image: "/static/images/games/720.webp",
    video: "/static/videos/CYCLE_Promo_720_60_standard.mp4",
    uid: "t1KQ33hm4aflQluIwnv1VlIkZ4e2",
    category: 0
  },
  {
    title: "LONG STRIM?",
    image: "/static/images/games/720 (1).webp",
    video: "/static/videos/CYCLE_Promo_Season01_720_60.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  },
  {
    title: "WALKING CARPET PLAYS YOUR SONG REQUESTS!",
    image: "/static/images/games/720 (2).webp",
    video: "/static/videos/Y1S3MarketingMovie.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  }
];

const r6schannels = [
  {
    title: "road trip across Thailand tomorrow",
    image: "/static/images/streams/360.webp",
    video: "/static/videos/CYCLE_Promo_720_60_standard.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  },
  {
    title: "road trip across Thailand tomorrow",
    image: "/static/images/games/720.webp",
    video: "/static/videos/CYCLE_Promo_720_60_standard.mp4",
    uid: "t1KQ33hm4aflQluIwnv1VlIkZ4e2",
    category: 0
  },
  {
    title: "LONG STRIM?",
    image: "/static/images/games/720 (1).webp",
    video: "/static/videos/CYCLE_Promo_Season01_720_60.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  },
  {
    title: "WALKING CARPET PLAYS YOUR SONG REQUESTS!",
    image: "/static/images/games/720 (2).webp",
    video: "/static/videos/Y1S3MarketingMovie.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  }
];

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();

  useEffect(() => {
    // router.push("/locked?page=rogue-tv");
    setTitle("Rogue TV");
  }, []);

  return (
    <Box
      sx={{
        background: "black"
      }}
    >
      <FeaturedStreams sx={{ background: theme.palette.primary.dark, padding: 2 }} />

      <Container>
        <Box sx={{ py: 2, px: 1 }}>
          <Typography variant="h5" color="white">
            Game Categories
          </Typography>
          <GameCategories />
        </Box>
        <Divider sx={{ background: theme.palette.primary.main }} />

        <Box sx={{ py: 2 }}>
          <Typography variant="h6" sx={{ px: 1 }}>
            Live Channels
          </Typography>
          <LiveChannels items={channels} />
        </Box>

        <Divider sx={{ background: theme.palette.primary.main }} />

        <Box sx={{ py: 2 }}>
          <Typography variant="h6" sx={{ px: 1 }}>
            Rainbow Six Siege Channels
          </Typography>
          <LiveChannels items={r6schannels} />
        </Box>

        <Box sx={{ textAlign: "center", py: 2 }}>
          <Button variant="contained">Previous Games</Button>
        </Box>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <RogueSocialSplash />
      <TVLayout>{page}</TVLayout>
    </TournamentProvider>
  );
};

export default Page;
