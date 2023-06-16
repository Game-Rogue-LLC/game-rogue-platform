import { Box, Chip, Container, Divider, Grid, Typography, useTheme } from "@mui/material";
import {
  CalendarMonthOutlined,
  LinkOutlined,
  LocationOn,
  PeopleOutline
} from "@mui/icons-material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { formatDate, isMyMatch, isMyTeam } from "@/src/utils/utils";
import { useEffect, useMemo, useState } from "react";

import Avatar from "@/src/components/Avatar";
import CustomButton from "@/src/components/button/CustomButton";
import GameSelect from "@/src/components/dropdown/GameSelect";
import MatchContainer from "@/src/components/widgets/match/MatchContainer";
import PublicLayout from "@/src/content/PublicLayout";
import SlantBanner from "@/src/components/widgets/SlantBanner";
import TeamHistory from "@/src/components/widgets/team/TeamHistory";
import TeamItem from "@/src/components/item/TeamItem";
import dayjs from "dayjs";
import { markdownToHtml } from "@/src/utils/html-markdown";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";

const Page = (props) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const theme = useTheme();
  const { setTitle } = useAppContext();
  const { setColors, colors } = useStyleContext();
  const { player, match, team, currentTime } = useTournamentContext();
  const [pid, setPID] = useState(router?.query?.pid);
  const [item, setItem] = useState(null);
  const [game, setGame] = useState(0);

  const upcomingGames = useMemo(() => {
    if (match?.matches) {
      return _.filter(match.matches, (val) => dayjs(val.start).isAfter(currentTime));
    }
    return [];
  }, [match?.matches, currentTime]);

  const myTeams = useMemo(() => {
    if (team?.teams && user && user.id) {
      return _.filter(team.teams, (val) => isMyTeam(val, user.id));
    }
  }, [team?.teams, user]);

  useEffect(() => {
    setTitle("Player");
  }, []);

  useEffect(() => {
    if (router?.query?.pid) {
      const newPID = router.query.pid;
      if (player?.players && player.players[newPID]) {
        setPID(newPID);
      } else {
        console.warn("Invalid Organizaiton ID");
        // Redirect to 404 page.
      }
    }
  }, [router, player?.players]);

  useEffect(() => {
    if (player?.players[pid]) {
      setItem(player.players[pid]);
    }
  }, [pid, player?.players]);

  return (
    <Box sx={{ pb: 4 }}>
      <SlantBanner background={item?.banner} />
      <Box
        sx={{
          height: "100px",
          display: "flex",
          justifyContent: "space-between",
          paddingInline: "10%",
          alignItems: "end",
          gap: 2
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "end",
            gap: 2
          }}
        >
          <Avatar src={item?.profilePic} hideStatus={true} sx={{ width: 200, height: 200 }} />
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" color={colors.primary}>
              {item?.name}
            </Typography>
            <Typography variant="h6" color="white">
              {"#" + item?.id}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Container sx={{ position: "relative" }}>
        <Box textAlign="right" sx={{ position: "absolute", top: -70, right: 30 }}>
          <CustomButton sx={{ paddingInline: "16px" }}>Edit Profile</CustomButton>
        </Box>

        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
            color: "white",
            fontSize: "20px",
            fontWeight: "bold"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PeopleOutline />
            {item?.name}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LocationOn />
            {item?.residency.label}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <LinkOutlined />
            {item?.url}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarMonthOutlined />
            Joined {formatDate(item?.createdAt, "MMM. DD. YYYY")}
          </Box>
        </Box>

        <Box sx={{ my: 4 }}>
          <Box
            sx={{
              display: "flex",
              gap: 1,
              alignItems: "center",
              backgroundColor: "#140300",
              padding: 2,
              border: "solid 1px rgba(255, 255, 255, 0.2)"
            }}
          >
            <Typography
              variant="body1"
              fontWeight={700}
              fontSize={25}
              color={theme.palette.primary.main}
              textTransform="uppercase"
            >
              UPCOMING GAMES
            </Typography>
          </Box>
          <Box
            sx={{
              mt: 2
            }}
          >
            <MatchContainer matches={upcomingGames} />
          </Box>
        </Box>

        <Divider />

        <Box sx={{ my: 4, textAlign: "center" }}>
          <Typography variant="h4" textAlign="center">
            Game Statistics
          </Typography>
          <GameSelect option={game} setOption={setGame} sx={{ mt: 2 }} />
          <Grid container spacing={2} rowSpacing={2} sx={{ mt: 2, color: "white" }}>
            <Grid item xs={6} sm={4} lg={3}>
              <Typography variant="h4" fontSize={24} textAlign="center">
                GR Rating
              </Typography>
              <Typography variant="h6" textAlign="center">
                {"0.0"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} lg={3}>
              <Typography variant="h4" fontSize={24} textAlign="center">
                K - D
              </Typography>
              <Typography variant="h6" textAlign="center">
                {"0 - 0 (+0)"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} lg={3}>
              <Typography variant="h4" fontSize={24} textAlign="center">
                Entry
              </Typography>
              <Typography variant="h6" textAlign="center">
                {"0 - 0 (+0)"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} lg={3}>
              <Typography variant="h4" fontSize={24} textAlign="center">
                K / R
              </Typography>
              <Typography variant="h6" textAlign="center">
                {"0.00"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} lg={3}>
              <Typography variant="h4" fontSize={24} textAlign="center">
                HS%
              </Typography>
              <Typography variant="h6" textAlign="center">
                {"0%"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} lg={3}>
              <Typography variant="h4" fontSize={24} textAlign="center">
                SURV
              </Typography>
              <Typography variant="h6" textAlign="center">
                {"0%"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} lg={3}>
              <Typography variant="h4" fontSize={24} textAlign="center">
                KOST
              </Typography>
              <Typography variant="h6" textAlign="center">
                {"0%"}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={4} lg={3}>
              <Typography variant="h4" fontSize={24} textAlign="center">
                Plant
              </Typography>
              <Typography variant="h6" textAlign="center">
                {"0"}
              </Typography>
            </Grid>
          </Grid>
        </Box>

        <Divider />

        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3} rowSpacing={2}>
            <Grid item xs={12} lg={6}>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Box sx={{ border: "solid 1px rgba(245,131,31,.2)", borderRadius: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 2,
                      p: 2
                    }}
                  >
                    <Avatar
                      src={item?.profilePic}
                      user={item}
                      hideStatus={true}
                      sx={{ height: 150, width: 150 }}
                    />
                    <Avatar
                      src={item?.profilePic}
                      user={item}
                      hideStatus={true}
                      sx={{ height: 150, width: 150 }}
                    />
                  </Box>
                  <Box
                    sx={{
                      height: 70,
                      mt: "-30px",
                      backgroundColor: theme.palette.primary.main,
                      borderBottomLeftRadius: 1,
                      borderBottomRightRadius: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Typography variant="h5" textAlign="center">
                      Operators Top
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1 }}
                >
                  <Typography variant="h5" fontSize={30} textAlign="right">
                    Games Played
                  </Typography>
                  <Typography variant="h4" fontSize={60}>
                    :0
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
                <TeamItem team={myTeams[0]} width={100} height={100} fontSize={30} />
                <Chip label={<Typography variant="h6">#{myTeams[0].id}</Typography>} />
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", borderRadius: 1 }}>
                {/* <TeamHistory item={myTeams[0]}  /> */}
                <TeamHistory
                  items={[
                    {
                      id: 0,
                      text: "Joined team",
                      createdAt: new Date()
                    },
                    {
                      id: 1,
                      text: "Won MVP",
                      createdAt: new Date()
                    }
                  ]}
                />
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
