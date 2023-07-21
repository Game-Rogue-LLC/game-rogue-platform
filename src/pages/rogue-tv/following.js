import { Box, Container, Divider, Typography, useTheme } from "@mui/material";

import LiveChannels from "@/src/components/widgets/rogue-tv/LiveChannels";
import RogueSocialSplash from "@/src/content/Splash/RogueSocialSplash";
import TVLayout from "@/src/content/TVLayout";
import TournamentProvider from "@/src/context/TournamentContext";
import UpcomingStreams from "@/src/components/widgets/rogue-tv/UpcomingStreams";
import dayjs from "dayjs";

const channels = [
  {
    title: "road trip across Thailand tomorrow",
    image: "/static/images/streams/360 (1).webp",
    video: "/static/videos/CYCLE_Promo_720_60_standard.mp4",
    uid: "t1KQ33hm4aflQluIwnv1VlIkZ4e2",
    category: 0
  },
  {
    title: "LONG STRIM?",
    image: "/static/images/streams/360 (2).webp",
    video: "/static/videos/CYCLE_Promo_Season01_720_60.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  },
  {
    title: "WALKING CARP[ET PLAYS YOUR SONG REQUESTS!",
    image: "/static/images/streams/360 (3).webp",
    video: "/static/videos/Y1S3MarketingMovie.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  },
  {
    title: "WALKING CARP[ET PLAYS YOUR SONG REQUESTS!",
    image: "/static/images/streams/9114f21e-a705-475d-8657-360e4f2d57c2-thumbnail.jpeg",
    video: "/static/videos/Y1S3MarketingMovie.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  },
  {
    title: "WALKING CARP[ET PLAYS YOUR SONG REQUESTS!",
    image: "/static/images/streams/e19307b6-5fc7-43f4-86e8-2cd4a8df781d-thumbnail.jpeg",
    video: "/static/videos/Y1S3MarketingMovie.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  },
  {
    title: "WALKING CARP[ET PLAYS YOUR SONG REQUESTS!",
    image: "/static/images/streams/f9f5acc5-a37f-41a9-b48f-76ebdc9e6c1a-thumbnail.jpeg",
    video: "/static/videos/Y1S3MarketingMovie.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  }
];

const upcomingStreams = [
  {
    title: "Untitled Stream",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    openAt: dayjs(new Date()).add(1, "day")
  },
  {
    title: "Untitled Stream",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    openAt: dayjs(new Date()).add(5, "days")
  }
];

const Page = ({}) => {
  const theme = useTheme();

  return (
    <Container>
      {/* Begin Live Channels */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" fontSize={26} sx={{ px: 1 }}>
          Live Channels
        </Typography>
        <Box sx={{ mt: 2 }}>
          <LiveChannels items={channels} />
        </Box>
      </Box>
      {/* End Live Channels */}

      <Divider sx={{ background: theme.palette.primary.main }} />

      {/* Begin Upcoming Games */}
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" fontSize={26}>
          Upcoming Streams
        </Typography>
        <Box sx={{ mt: 2 }}>
          <UpcomingStreams items={upcomingStreams} />
        </Box>
      </Box>
      {/* End Upcoming Games */}
    </Container>
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
