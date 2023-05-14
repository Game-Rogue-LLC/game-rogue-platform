import { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import { useAppContext } from "@/src/context/app";
import { Box, Container, Typography, useTheme } from "@mui/material";
import PublicLayout from "@/src/content/PublicLayout";
import dayjs from "dayjs";
import EventContainer from "@/src/components/widgets/event/EventContainer";
import MatchContainer from "@/src/components/widgets/match/MatchContainer";
import TournamentProvider, {
  useTournamentContext,
} from "@/src/context/TournamentContext";
import { useRouter } from "next/router";
import FeaturedTournaments from "@/src/components/widgets/FeaturedTournaments";

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { event, match, currentTime, setCurrentTime } = useTournamentContext();

  const moreButtonStyle = {
    fontWeight: 700,
    textTransform: "uppercase",
    backgroundColor: "rgba(0,0,0,0.9)",
    color: "white",
    ":hover": {
      backgroundColor: "rgba(0,0,0,0.6)",
      color: "white",
    },
  };

  const upcomingMatches = useMemo(() => {
    if (match?.matches) {
      return match.matches.filter((item) =>
        dayjs(item.start).isAfter(currentTime)
      );
    }
    return [];
  }, [match?.matches, currentTime]);

  const ongoingEventIds = useMemo(() => {
    if (event?.events) {
      return Object.keys(event.events).filter(
        (key) =>
          dayjs(event.events[key].startAt).isBefore(currentTime) &&
          dayjs(event.events[key].endAt).isAfter(currentTime)
      );
    }
    return [];
  }, [event?.events, currentTime]);

  const upcomingEventIds = useMemo(() => {
    if (event?.events) {
      return Object.keys(event.events).filter((key) =>
        dayjs(event.events[key].startAt).isAfter(currentTime)
      );
    }
    return [];
  }, [event?.events, currentTime]);

  const finishedEventIds = useMemo(() => {
    if (event?.events) {
      return Object.keys(event.events).filter((key) =>
        dayjs(event.events[key].endAt).isBefore(currentTime)
      );
    }
    return [];
  }, [event?.events, currentTime]);

  useEffect(() => {
    setTitle("Events");
    setCurrentTime(new Date());
  }, []);

  return (
    <>
      <Box
        component={"section"}
        sx={{
          position: "relative",
          backgroundImage: "url(/static/images/event_banner.png)",
          height: "998px",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <video autoPlay loop muted poster="/static/images/event_banner.png">
          <source src="/static/images/event_banner.mp4" type="video/mp4" />
        </video>
      </Box>

      <FeaturedTournaments />

      <Box
        component={"section"}
        sx={{
          position: "relative",
          backgroundColor: "rgb(36, 35, 35)",
          py: "10px",
        }}
      >
        <Container
          sx={{ margin: "auto", display: "flex", alignItems: "center", gap: 1 }}
        >
          <Box component={"img"} src="/static/images/games/r6s.webp"></Box>
          <Typography
            variant="body1"
            fontWeight={700}
            fontSize={25}
            color={theme.palette.primary.main}
            textTransform="uppercase"
          >
            Rainbow six siege
          </Typography>
          <Box
            sx={{
              flex: 1,
              textAlign: "right",
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexDirection: "row-reverse",
            }}
          >
            <Button variant="contained" sx={{ textTransform: "uppercase" }}>
              CHANGE GAME
            </Button>
            <Button variant="contained" sx={{ textTransform: "uppercase" }}>
              CHANGE PLATFORM
            </Button>
            <Button variant="contained" sx={{ textTransform: "uppercase" }}>
              CHANGE REGION
            </Button>
          </Box>
        </Container>
      </Box>

      <Box
        component={"section"}
        sx={{
          position: "relative",
          background: "linear-gradient(to top,#28160c,#000)",
          position: "relative",
        }}
      >
        <Container sx={{ margin: "auto", pb: 5 }}>
          <Box sx={{ mt: 8 }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                // backgroundColor: "#140300",
                background: "linear-gradient(to right, #321401 30%, #a84900)",
                border: "none",
                borderLeft: "solid 5px #ed7606",
                padding: 2,
              }}
            >
              <Box component={"img"} src="/static/images/games/r6s.webp"></Box>
              <Typography
                variant="body1"
                fontWeight={700}
                fontSize={25}
                color="white"
                textTransform="uppercase"
              >
                UPCOMING MATCHES
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  textAlign: "right",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    // backgroundColor: "#c2260a",
                    ":hover": {
                      // backgroundColor: "#ff4929",
                    },
                    ...moreButtonStyle,
                  }}
                  onClick={() => {
                    router.push("/match/upcoming");
                  }}
                >
                  MORE MATCHES
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 2,
              }}
            >
              <MatchContainer matches={upcomingMatches} limit={6} />
            </Box>
          </Box>

          <Box sx={{ mt: 8 }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                // backgroundColor: "#000a14",
                background: "linear-gradient(to right, #321401 30%, #a84900)",
                border: "none",
                borderLeft: "solid 5px #ed7606",
                padding: 2,
              }}
            >
              <Box component={"img"} src="/static/images/games/r6s.webp"></Box>
              <Typography
                variant="body1"
                fontWeight={700}
                fontSize={25}
                color="white"
                textTransform="uppercase"
              >
                ONGOING EVENTS
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  textAlign: "right",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    // backgroundColor: "#0a68c7",
                    ":hover": {
                      // backgroundColor: "#2993ff",
                    },
                    ...moreButtonStyle,
                  }}
                  onClick={() => {
                    router.push("/event/ongoing");
                  }}
                >
                  MORE EVENTS
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 2,
              }}
            >
              <EventContainer
                events={ongoingEventIds?.map((eid) => event?.events[eid])}
                limit={6}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 8 }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                // backgroundColor: "#140300",
                background: "linear-gradient(to right, #321401 30%, #a84900)",
                border: "none",
                borderLeft: "solid 5px #ed7606",
                padding: 2,
              }}
            >
              <Box component={"img"} src="/static/images/games/r6s.webp"></Box>
              <Typography
                variant="body1"
                fontWeight={700}
                fontSize={25}
                color="white"
                textTransform="uppercase"
              >
                UPCOMING EVENTS
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  textAlign: "right",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    // backgroundColor: "#c2260a",
                    ":hover": {
                      // backgroundColor: "#ff4929",
                    },
                    ...moreButtonStyle,
                  }}
                  onClick={() => {
                    router.push("/event/upcoming");
                  }}
                >
                  MORE EVENTS
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 2,
              }}
            >
              <EventContainer
                events={upcomingEventIds?.map((eid) => event?.events[eid])}
                limit={6}
              />
            </Box>
          </Box>

          <Box sx={{ mt: 8 }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                // backgroundColor: "#140013",
                background: "linear-gradient(to right, #321401 30%, #a84900)",
                border: "none",
                borderLeft: "solid 5px #ed7606",
                padding: 2,
              }}
            >
              <Box component={"img"} src="/static/images/games/r6s.webp"></Box>
              <Typography
                variant="body1"
                fontWeight={700}
                fontSize={25}
                color="white"
                textTransform="uppercase"
              >
                COMPLETED EVENTS
              </Typography>
              <Box
                sx={{
                  flex: 1,
                  textAlign: "right",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    // backgroundColor: "#c20ab9",
                    ":hover": {
                      // backgroundColor: "#ff29f4",
                    },
                    ...moreButtonStyle,
                  }}
                  onClick={() => {
                    router.push("/event/completed");
                  }}
                >
                  MORE EVENTS
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                mt: 2,
              }}
            >
              <EventContainer
                events={finishedEventIds?.map((eid) => event?.events[eid])}
                limit={6}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => {
  return (
    <PublicLayout>
      <TournamentProvider>{page}</TournamentProvider>
    </PublicLayout>
  );
};

export default Page;
