import "react-responsive-carousel/lib/styles/carousel.min.css";

import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Grid, Typography, useTheme } from "@mui/material";

import { Carousel } from "react-responsive-carousel";
import { GAMES } from "@/src/config/global";
import { useTournamentContext } from "@/src/context/TournamentContext";

const streams = [
  {
    title: "road trip across Thailand tomorrow",
    image: "/static/images/games/480.webp",
    video: "/static/videos/CYCLE_Promo_720_60_standard.mp4",
    uid: "t1KQ33hm4aflQluIwnv1VlIkZ4e2",
    category: 0
  },
  {
    title: "LONG STRIM?",
    image: "/static/images/r6s-gameinfo-discover-intro-bg.jpg",
    video: "/static/videos/CYCLE_Promo_Season01_720_60.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  },
  {
    title: "WALKING CARPET PLAYS YOUR SONG REQUESTS!",
    image: "/static/images/games/480-1.webp",
    video: "/static/videos/Y1S3MarketingMovie.mp4",
    uid: "JHZmfIGnoMeSvmbxHVn8b7ksbZ42",
    category: 0
  }
];

export default function FeaturedStreams({ sx }) {
  const { player } = useTournamentContext();
  return (
    <Box sx={sx}>
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={2}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              p: 2
            }}
          >
            <Typography variant="h4" color="black" textAlign="center">
              The only platform for Esport Organizers, solely
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Carousel
            sx={{
              position: "relative"
            }}
            showThumbs={false}
            showStatus={false}
            infiniteLoop={true}
            showIndicators={false}
          >
            {_.map(streams, (val, i) => (
              <Box sx={{ px: 4 }} key={`stream-${i}`}>
                <Box
                  component="img"
                  src={val.image}
                  height={400}
                  sx={{ objectFit: "cover", borderRadius: 2 }}
                ></Box>
                <Box>
                  <Typography variant="h6" textAlign="left" fontWeight="bold">
                    {val.title}
                  </Typography>
                  <Typography variant="body1" textAlign="left">
                    {player.players[val.uid]?.userName}
                  </Typography>
                  <Typography variant="body1" textAlign="left">
                    {GAMES[val.category].name}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Carousel>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </Box>
  );
}
