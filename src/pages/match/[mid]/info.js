import { AccessTimeFilled, Grid3x3, LockClock, PunchClock, Sell } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  ListItemIcon,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme
} from "@mui/material";
import {
  DEFAULT_CONTENTBLOCK_IMAGE,
  DEFAULT_DARK_LOGO,
  EVENT_FORMATS,
  EVENT_STATES
} from "@/src/config/global";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { formatDate, romanNumber } from "@/src/utils/utils";
import { useEffect, useMemo, useState } from "react";

import Link from "next/link";
import ParticipantProfile from "@/src/components/widgets/match/ParticipantProfile";
import PublicLayout from "@/src/content/PublicLayout";
import SlantBanner from "@/src/components/widgets/SlantBanner";
import _ from "lodash";
import dayjs from "dayjs";
import { useAppContext } from "@/src/context/app";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";

const Page = (props) => {
  const router = useRouter();
  const { setTitle } = useAppContext();
  const theme = useTheme();
  const { colors, setColors, ...style } = useStyleContext();
  const { organizer, event, team, match, player } = useTournamentContext();
  const [oid, setOID] = useState();
  const [eid, setEID] = useState();
  const [mid, setMID] = useState(router?.query?.mid);
  const [item, setItem] = useState(null);
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  useEffect(() => {
    if (router?.query?.mid) {
      const newMID = router.query.mid,
        newItem = match?.matches?.find((val) => val.id === newMID);
      if (match?.matches && newItem) {
        setMID(newMID);
        setEID(newItem.eid);
        setItem(newItem);
      } else {
        console.warn("Invalid Match ID");
        // TODO: Redirect to 404 page.
      }
    }
  }, [router, match?.matches]);

  useEffect(() => {
    if (event?.events[eid]) {
      setOID(event.events[eid].oid);
      setColors({
        primary: event.events[eid].primary,
        secondary: event.events[eid].secondary,
        tertiary: event.events[eid].tertiary
      });
    }
  }, [eid, event?.events]);

  useEffect(() => {
    if (
      team?.teams &&
      item &&
      team.teams[item.participants[0].id] &&
      team.teams[item.participants[1].id]
    ) {
      setTeam1(team.teams[item.participants[0].id]);
      setTeam2(team.teams[item.participants[1].id]);
    }
  }, [item, team?.teams]);

  const getStatus = (item) => {
    if (!item) return "NOT CREATED";
    const current = new Date(),
      start = dayjs(item?.start),
      end = dayjs(item?.end),
      status = item?.status,
      eventStatus = event?.events[item?.eid]?.status;
    if (eventStatus == EVENT_STATES.CREATING.value || eventStatus == EVENT_STATES.SCHEDULING.value)
      return "SCHEDULING";
    if (eventStatus == EVENT_STATES.SCHEDULED.value) return "SCHEDULED";
    if (eventStatus == EVENT_STATES.STARTED.value) {
      if (start.isBefore(current) && end.isAfter(current)) return "STARTED";
      if (end.isBefore(current)) return "FINISHED";
      return "WAITING";
    }
    if (eventStatus == EVENT_STATES.FINISHED.value) return "FINISHED";
  };

  return (
    <Box>
      <SlantBanner background={event?.events[eid]?.banner} />
      <Box
        sx={{
          height: "100px",
          display: "flex",
          justifyContent: "left",
          paddingLeft: "10%",
          alignItems: "end",
          gap: 2
        }}
      >
        <img
          src={event?.events[eid]?.darkLogo}
          width={200}
          height={200}
          style={{
            // borderRadius: '50%',
            // outline: '2px solid rgba(245, 131, 31, 0.5)',
            objectFit: "cover"
            // outlineOffset: '2px'
          }}
        />
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" color={colors.primary}>
            {event?.events[eid]?.name}
          </Typography>
          <Typography variant="h5" fontWeight="bold" color={colors.secondary}>
            {organizer.organizers[event?.events[eid]?.oid]?.name}
          </Typography>
        </Box>
      </Box>
      <Container sx={{ mt: "20px", py: 5 }}>
        <Box component={"section"}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                alignItems: "center",
                flexDirection: "column",
                flexBasis: "20%"
              }}
            >
              <Box
                sx={{
                  py: 2,
                  px: 3,
                  backgroundColor: style.secondaryBackgroundColor,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                  height: "100px"
                }}
              >
                <Box>
                  <Link href={`/organizer/${oid}/edit`}>
                    <Typography variant="h4" fontSize={18} color={colors.primary}>
                      VIEW ORGANIZER
                    </Typography>
                    <Typography variant="body1" paddingLeft="5px">
                      {organizer?.organizers[oid]?.name}
                    </Typography>
                  </Link>
                </Box>
              </Box>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: style.secondaryBackgroundColor,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                  height: "100px"
                }}
              >
                <AccessTimeFilled />
                <Box sx={{ ml: "-10px" }}>
                  <Typography variant="h4" fontSize={18} color={colors.primary}>
                    START TIME
                  </Typography>
                  <Typography variant="body1" paddingLeft="5px">
                    {dayjs(item?.start).format("MMM DD, YYYY, HH:mm A") +
                      " GMT" +
                      dayjs(item?.start).format("Z")}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "center",
                flexGrow: 4
              }}
            >
              <Box
                sx={{
                  p: 2,
                  backgroundColor: style.secondaryBackgroundColor,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  width: "100%",
                  height: "100px"
                }}
              >
                <Box
                  component="img"
                  src={event?.events[eid]?.darkLogo}
                  alt=""
                  width={50}
                  height={50}
                ></Box>
                <Box sx={{ ml: "-10px" }}>
                  <Typography variant="h4" fontSize={18} color={colors.primary} marginLeft="5px">
                    EVENT
                  </Typography>
                  <Chip
                    label={
                      // "Round " + romanNumber(event?.events[eid]?.currentRound)
                      "Round " + romanNumber(item?.round)
                    }
                    sx={{
                      backgroundColor: "rgba(0,0,0,.5)", //"#393D40",
                      backdropFilter: "blur(3px)",
                      color: "white",
                      mt: 1
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "100px",
                  width: "100%",
                  gap: 1
                }}
              >
                <Box
                  sx={{
                    flexBasis: "25%",
                    flexGrow: 1,
                    p: 2,
                    backgroundColor: style.secondaryBackgroundColor,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    height: "100%"
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontSize={18} color={colors.primary}>
                      MATCH STATE
                    </Typography>
                    <Typography variant="body1" paddingLeft="5px">
                      {getStatus(item)}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flexBasis: "25%",
                    flexGrow: 1,
                    p: 2,
                    backgroundColor: style.secondaryBackgroundColor,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    height: "100%"
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontSize={18} color={colors.primary}>
                      FORMAT
                    </Typography>
                    <Typography variant="body1" paddingLeft="5px">
                      {EVENT_FORMATS[event?.events[eid]?.format || 0].name}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flexBasis: "25%",
                    flexGrow: 1,
                    p: 2,
                    backgroundColor: style.secondaryBackgroundColor,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    height: "100%"
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontSize={18} color={colors.primary}>
                      EVENT ID
                    </Typography>
                    <Typography variant="body1" paddingLeft="5px">
                      {eid || ""}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    flexBasis: "25%",
                    flexGrow: 1,
                    p: 2,
                    backgroundColor: style.secondaryBackgroundColor,
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    height: "100%"
                  }}
                >
                  <Box>
                    <Typography variant="h4" fontSize={18} color={colors.primary}>
                      MATCH ID
                    </Typography>
                    <Typography variant="body1" paddingLeft="5px">
                      {mid || ""}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box component="section" sx={{ mt: 15 }}>
          <Grid container spacing={5}>
            <Grid item xs={12} lg={6}>
              <ParticipantProfile item={team1} />
            </Grid>

            <Grid item xs={12} lg={6}>
              <ParticipantProfile item={team2} />
            </Grid>
          </Grid>
        </Box>

        <Box component="section" sx={{ mt: 15 }}>
          <Grid container spacing={0.5} rowSpacing={0}>
            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: style.primaryBackgroundColor
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    textAlign: "center",
                    fontSize: "1.5rem"
                  }}
                >
                  MAPBAN
                </Typography>
              </Box>
            </Grid>
            {_.range(0, 9, 1).map((val, i) => (
              <Grid item xs={3} lg key={`mapban_${i}`}>
                <Box
                  sx={{
                    height: "15rem",
                    width: "100%"
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: style.secondaryBackgroundColor,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: "190px"
                    }}
                  >
                    {i % 2 == 0 ? (
                      <Box
                        component="img"
                        src={team1?.darkLogo}
                        sx={{ margin: "auto", height: "60px" }}
                      ></Box>
                    ) : (
                      <Box
                        component="img"
                        src={team2?.darkLogo}
                        sx={{ margin: "auto", height: "60px" }}
                      ></Box>
                    )}
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "black",
                      border: `solid 1px ${style.secondaryBackgroundColor}`
                    }}
                  >
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      TBD
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      backgroundColor: "black",
                      border: `solid 1px ${style.secondaryBackgroundColor}`
                    }}
                  >
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      BAN
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box component="section" sx={{ mt: 15 }}>
          <Grid container spacing={0.5}>
            <Grid item xs={12}>
              <Box
                sx={{
                  backgroundColor: style.primaryBackgroundColor
                }}
              >
                <Typography variant="h4" sx={{ textAlign: "center", fontSize: "1.5rem" }}>
                  POST GAME REPORT
                </Typography>
              </Box>
            </Grid>
            <Grid item xs>
              <Box
                sx={{
                  width: "100%",
                  py: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 4,
                  backgroundColor: style.secondaryBackgroundColor
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1
                  }}
                >
                  <Box
                    component="img"
                    src={team1?.darkLogo}
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: "80px"
                    }}
                  ></Box>
                  <Link href={`/team/${team1?.id}`}>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                      {team1?.name}
                    </Typography>
                  </Link>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 3
                  }}
                >
                  <Typography variant="h4" sx={{ textAlign: "center" }}>
                    {item?.participants[0]?.score}
                    {" - "}
                    {item?.participants[1]?.score}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 1
                  }}
                >
                  <Box
                    component="img"
                    src={team2?.darkLogo}
                    sx={{
                      alignItems: "center",
                      justifyContent: "center",
                      height: "80px"
                    }}
                  ></Box>
                  <Link href={`/team/${team2?.id}`}>
                    <Typography
                      variant="h5"
                      sx={{
                        textAlign: "center"
                        // ":hover": { color: theme.palette.primary.main },
                      }}
                    >
                      {team2?.name}
                    </Typography>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
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
