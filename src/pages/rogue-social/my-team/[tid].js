import { Box, Container, Grid, Skeleton, SvgIcon, Typography } from "@mui/material";
import { Instagram, Twitter, YouTube } from "@mui/icons-material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { formatDate, sequenceNumber } from "@/src/utils/utils";
import { useEffect, useMemo, useState } from "react";

import CustomButton from "@/src/components/button/CustomButton";
import Image from "next/image";
import PublicLayout from "@/src/content/PublicLayout";
import TeamChat from "@/src/components/widgets/rogue-social/TeamChat";
import TeamMembers from "@/src/components/widgets/rogue-social/TeamMembers";
import { formatNumber } from "@/src/utils/utils";
import team from "@/lib/firestore/collections/team";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";

const Page = (props) => {
  const { uesr } = useAuthContext();
  const router = useRouter();
  const { team } = useTournamentContext();
  const [tid, setTID] = useState(router?.query?.tid);
  const [item, setItem] = useState(null);
  const [placements, setPlacements] = useState([]);
  const [upcomingGames, setUpcomingGames] = useState([]);
  const [news, setNews] = useState([]);

  useEffect(() => {
    if (router?.query?.tid && router.query.tid != tid) setTID(router.query.tid);
  }, [router?.query]);

  useEffect(() => {
    if (tid) {
      if (team?.teams && team.teams[tid]) {
        setItem(team.teams[tid]);
      }

      team.getPlacements(tid).then((data) => {
        setPlacements(data);
      });

      // team.getUpcomingGames(tid).then((data) => {
      //   setUpcomingGames(data);
      // });

      // team.getNews(tid).then((data) => {
      //   setNews(data);
      // });
    }
  }, [tid]);

  return (
    <Container sx={{ py: 5 }}>
      <Box>
        <Grid item xs={12} container spacing={2}>
          <Grid item minWidth={150}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                gap: 1,
                border: "solid 1px rgba(255,255,255,.2)",
                p: 1
              }}
            >
              {item?.darkLogo ? (
                <Image src={item.darkLogo} alt={item.darkLogo} width={85} height={85} />
              ) : (
                <Skeleton variant="rectangular" width={85} height={85} />
              )}
              <CustomButton sx={{ width: "100%" }}>Rogue Social</CustomButton>
              <Grid
                container
                justifyContent="center"
                rowSpacing={1}
                spacing={1}
                sx={{ width: 150 }}
              >
                <Grid item xs={3}>
                  <CustomButton sx={{ width: 30, height: 30 }}>
                    <img src="/static/images/discord.svg" style={{ height: "20px" }} />
                  </CustomButton>
                </Grid>
                <Grid item xs={3}>
                  <CustomButton sx={{ width: 30, height: 30 }}>
                    <YouTube fontSize="medium" sx={{ color: "white" }} />
                  </CustomButton>
                </Grid>
                <Grid item xs={3}>
                  <CustomButton sx={{ width: 30, height: 30 }}>
                    <SvgIcon fontSize="medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fill="white"
                          d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"
                        />
                      </svg>
                    </SvgIcon>
                  </CustomButton>
                </Grid>
                <Grid item xs={3}>
                  <CustomButton sx={{ width: 30, height: 30 }}>
                    <Twitter fontSize="medium" sx={{ color: "white" }} />
                  </CustomButton>
                </Grid>
                <Grid item xs={3}>
                  <CustomButton sx={{ width: 30, height: 30 }}>
                    <Instagram fontSize="medium" sx={{ color: "white" }} />
                  </CustomButton>
                </Grid>
                <Grid item xs={3}>
                  <CustomButton sx={{ width: 30, height: 30 }}>
                    <img src="/static/images/tiktok.svg" style={{ height: "20px" }} />
                  </CustomButton>
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12} lg>
            <TeamMembers team={item} />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: 3, minHeight: 50 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(to right, #321401 30%, #a84900)",
            padding: 1
          }}
        >
          <Typography variant="h5" color="white">
            PLACEMENTS
          </Typography>
          <CustomButton>View All</CustomButton>
        </Box>
        <Grid container spacing={2} marginTop={1}>
          {Object.keys(placements).map((key) => {
            const val = placements[key];
            return (
              <Grid key={key} item xs={12} md={6} lg={4} xl={3}>
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
          })}
        </Grid>
      </Box>

      <Box sx={{ marginTop: 3, minHeight: 50 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 1,
            background: "linear-gradient(to right, #321401 30%, #a84900)"
          }}
        >
          <Typography variant="h5" color="white">
            UPCOMING GAMES
          </Typography>
          <CustomButton>View All</CustomButton>
        </Box>
        <Grid container spacing={2} marginTop={1}>
          {/* {upcomingGames.map((val) => (
            <Grid item xs={3}></Grid>
          ))} */}
          <Grid item sm={12}>
            <Typography variant="body1" color="white" textAlign="center">
              No Upcoming Games
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ marginTop: 3, minHeight: 50 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 1,
            background: "linear-gradient(to right, #321401 30%, #a84900)"
          }}
        >
          <Typography variant="h5" color="white">
            TOP NEWS
          </Typography>
          <CustomButton>View All</CustomButton>
        </Box>
        <Grid container spacing={2} marginTop={1}>
          {/* {news.map((val) => (
            <Grid item xs={3}></Grid>
          ))} */}
          <Grid item sm={12}>
            <Typography variant="body1" color="white" textAlign="center">
              No Top News.
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
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
