import { Box, Chip, Container, Divider, Grid, Typography, useTheme } from "@mui/material";
import {
  CalendarMonthOutlined,
  GamepadOutlined,
  LinkOutlined,
  LocationOn,
  PeopleOutline
} from "@mui/icons-material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { formatDate, isMyTeam } from "@/src/utils/utils";
import { useEffect, useMemo, useState } from "react";

import ArticleContainer from "@/src/components/widgets/rogue-social/ArticleContainer";
import Avatar from "@/src/components/Avatar";
import CustomButton from "@/src/components/button/CustomButton";
import GameSelect from "@/src/components/dropdown/GameSelect";
import MatchContainer from "@/src/components/widgets/match/MatchContainer";
import PlayerPortrait from "@/src/components/widgets/player/PlayerPortrait";
import PublicLayout from "@/src/content/PublicLayout";
import SlantBanner from "@/src/components/widgets/SlantBanner";
import TeamHistory from "@/src/components/widgets/team/TeamHistory";
import TeamItem from "@/src/components/item/TeamItem";
import _ from "lodash";
import dayjs from "dayjs";
import { games } from "@/src/components/dropdown/GameSelect";
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
  const style = useStyleContext();
  const { player, match, team, currentTime } = useTournamentContext();
  const [tid, setTID] = useState(router?.query?.tid);
  const [placements, setPlacements] = useState([]);
  const [item, setItem] = useState(null);

  const myMatches = useMemo(() => {
    if (match?.matches && item?.id) {
      return _.filter(
        match.matches,
        (val) => _.findIndex(val.participants, (participant) => participant.id === item.id) >= 0
      );
    }
    return [];
  }, [match?.matches, item]);

  const articles = [];

  useEffect(() => {
    setTitle("Team Rogue Social Public Profile");
  }, []);

  useEffect(() => {
    if (router?.query?.tid) {
      const newTID = router.query.tid;
      if (team?.team && team.teams[newTID]) {
        setTID(newTID);
      } else {
        console.warn("Invalid Organizaiton ID");
        // Redirect to 404 page.
      }
    }
  }, [router, team?.teams]);

  useEffect(() => {
    if (team?.teams[tid]) {
      setItem(team.teams[tid]);

      team.getPlacements(tid).then((data) => {
        setPlacements(data);
      });
    }
  }, [tid, team?.teams]);

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
          <img
            src={item?.darkLogo}
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
            <Typography variant="h4" color={style.colors.primary}>
              {item?.name}
            </Typography>
            <Typography variant="h6" color="white">
              {"#" + item?.id}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Container sx={{ position: "relative" }}>
        {isMyTeam(item, user.id) && (
          <Box textAlign="right" sx={{ position: "absolute", top: -70, right: 30 }}>
            <CustomButton
              sx={{ paddingInline: "16px" }}
              onClick={() => router.push("/team/" + tid + "/edit")}
            >
              Edit Profile
            </CustomButton>
          </Box>
        )}

        <Box sx={{ my: 2 }}>
          <Typography variant="h4" sx={{ fontSize: "24px" }}>
            Description
          </Typography>
          <div
            className="html-wrapper"
            style={{ marginTop: "16px", color: "white" }}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(item?.description)
            }}
          ></div>
        </Box>

        <Divider />

        <Box
          sx={{
            my: 2,
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
            <LinkOutlined />
            {item?.url}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <GamepadOutlined />
            {games[item?.game] ? games[item?.game].name : games[0].name}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarMonthOutlined />
            Joined {formatDate(item?.createdAt, "MMM. DD. YYYY")}
          </Box>
        </Box>

        <Divider />

        <Box sx={{ my: 2, textAlign: "center" }}>
          <Typography variant="h4" textAlign="center">
            Poster
          </Typography>

          <Grid container sx={{ mt: 2, color: "white" }}>
            {_.map(item?.players, (val) => (
              <Grid item xs={6} sm={4} md={3}>
                <PlayerPortrait key={"player_" + val.id} item={player?.players[val.id]} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Divider />

        <Box sx={{ my: 2, textAlign: "center" }}>
          <Typography variant="h4" textAlign="center">
            Team Statistics
          </Typography>
          <Grid container spacing={2} rowSpacing={2} sx={{ mt: 2, color: "white" }}>
            <Grid item xs={12} lg={3}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Box>
                  <Typography variant="h4" fontSize={24} textAlign="center">
                    GR Rating
                  </Typography>
                  <Typography variant="h6" textAlign="center">
                    {"0.0"}
                  </Typography>
                </Box>

                <Box>
                  <Typography variant="h4" fontSize={24} textAlign="center">
                    Leaderboards
                  </Typography>
                  <Typography variant="h6" textAlign="center">
                    {"#100"}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} lg={9} container rowSpacing={0} spacing={0.5}>
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
                      <Box
                        component="img"
                        src={item?.darkLogo}
                        sx={{ margin: "auto", height: "60px" }}
                      ></Box>
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
          </Grid>
        </Box>

        <Divider />

        <Box sx={{ my: 2, textAlign: "center" }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4
            }}
          >
            <Typography variant="h4" textAlign="center">
              Standings
            </Typography>
            <Box sx={{ position: "absolute", right: 0, textAlign: "right" }}>
              <CustomButton>View ALL </CustomButton>
            </Box>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Grid container spacing={2} marginTop={1}>
              {/* {_.map(placements, (val) => {
            return (
              <Grid key={key} item xs={12} md={6}>
                <Box sx={{ border: "solid 1px rgba(255,255,255,.2)" }}>
                  <Box
                    sx={{
                      height: 150,
                      backgroundImage: `url(${val.banner})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover"
                    }}
                  ></Box>
                  <Box sx={{ px: 1 }}>
                    <Typography variant="h5">
                      {sequenceNumber(val.participants.findIndex((v) => v.id === tid) + 1)}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 1 }}>{formatDate(val.startAt.toDate(), "MMM, DD")}</Box>
                </Box>
              </Grid>
            );
          })} */}
            </Grid>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ my: 2, textAlign: "center" }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4
            }}
          >
            <Typography variant="h4" textAlign="center">
              Games
            </Typography>
            <Box sx={{ position: "absolute", right: 0, textAlign: "right" }}>
              <CustomButton>View ALL </CustomButton>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <MatchContainer matches={myMatches} />
          </Box>
        </Box>

        <Divider />

        <Box sx={{ my: 2, textAlign: "center" }}>
          <Box
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4
            }}
          >
            <Typography variant="h4" textAlign="center">
              Mentioned Articles
            </Typography>
            <Box sx={{ position: "absolute", right: 0, textAlign: "right" }}>
              <CustomButton>View ALL </CustomButton>
            </Box>
          </Box>

          <Box sx={{ mt: 2 }}>
            <ArticleContainer items={articles} />
          </Box>
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
