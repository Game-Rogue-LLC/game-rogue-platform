import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useMemo, useState } from "react";

import CategoryCard from "@/src/components/widgets/article/CategoryCard";
import PostCard from "@/src/components/widgets/article/PostCard";
import PublicLayout from "@/src/content/PublicLayout";
import { Search } from "@mui/icons-material";

const Page = (props) => {
  const [filter, setFilter] = useState("");

  const onFilterChange = (e, inv) => {
    setFilter(inv);
  };

  return (
    <Box>
      <Box sx={{ backgroundColor: "#232323", py: 6 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
          <Box
            component="img"
            src="/static/images/Game Rogue Text 2 copy.webp"
            sx={{ borderBottom: "solid 3px rgba(245,131,31)" }}
          ></Box>
          <Box component="img" src="/static/images/Game Rogue Text 3 copy.webp"></Box>
        </Box>

        <Container gap={4} sx={{ display: "flex", alignItems: "stretch", mt: 5 }}>
          <TextField
            variant="outlined"
            value={filter}
            onChange={onFilterChange}
            sx={{
              flexGrow: 1,
              ".MuiInputBase-root": {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0
              }
            }}
            placeholder="Enter Search Term"
          />
          <Button
            variant="contained"
            size="large"
            sx={{
              borderBottomLeftRadius: 0,
              borderTopLeftRadius: 0,
              color: "white",
              paddingInline: 6
            }}
          >
            <Search />
          </Button>
        </Container>

        <Container sx={{ mt: 5 }}>
          <Grid container sx={{ justifyContent: "center" }} spacing={2} rowSpacing={2}>
            <Grid item xs={12} md={6} lg={4}>
              <CategoryCard
                banner="/static/images/r6s-gameinfo-discover-intro-bg.jpg"
                title="GR - RAINBOW SIX SIEGE"
                sx={{
                  boxShadow: "rgba(245, 131, 31, 0.6)"
                }}
              >
                2023 Majors Qualifier II <br />
                2023 Majors Qualifier I <br />
                New Year's Slam Online Tournament <br />
                Weekend Brawl Online Tournament
              </CategoryCard>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <CategoryCard
                banner="/static/images/r6s-gameinfo-discover-intro-bg.jpg"
                title="RAINBOW SIX SIEGE"
                sx={{
                  boxShadow: "rgba(245, 131, 31, 0.6)"
                }}
              >
                The Premier League: Season 7 <br />
                SCS Esports: Season 7 <br />
                SFCL: Season 7 Regular Season <br />
                SFCL: Season 7 Closed Qualifiers
              </CategoryCard>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <CategoryCard
                banner="/static/images/r6s-gameinfo-discover-intro-bg.jpg"
                title="GAME ROGUE WIKI"
                sx={{
                  boxShadow: "rgba(245, 131, 31, 0.6)"
                }}
              >
                $10,000 Game Rogue LAN Invitational <br />
                How to Add New Articles <br />
                Plus Plans Release Notes <br />
                1.1. Release & Patch Notes <br />
              </CategoryCard>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ borderTop: "solid 2px rgb(245,131,31)", padding: 2, background: "black" }}>
        <Typography variant="h4">All Posts</Typography>

        <Grid container spacing={2} rowSpacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4} lg={2}>
            <PostCard
              item={{
                banner: "/static/images/post_back/2.webp",
                title: "NEW YEARS sLAM",
                uid: "t1KQ33hm4aflQluIwnv1VlIkZ4e2",
                text: "2023 started off with a CLASSIC, featuring top performances from HK Rebels...",
                view: 3,
                reply: 0,
                vote: 1
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <PostCard
              item={{
                banner: "/static/images/post_back/4.webp",
                title: "WEEKEND REMIX",
                uid: "t1KQ33hm4aflQluIwnv1VlIkZ4e2",
                text: "On September 10th, teams came back to double the prize pool of the Weekend Bawl,...",
                view: 3,
                reply: 0,
                vote: 1
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <PostCard
              item={{
                banner: "/static/images/post_back/4.webp",
                title: "WEEKEND BRAWL",
                uid: "t1KQ33hm4aflQluIwnv1VlIkZ4e2",
                text: "In the week leading up to the Weekend Brawl Tournament, the defending champions'...",
                view: 0,
                reply: 0,
                vote: 1
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <PostCard
              item={{
                banner: "/static/images/post_back/1.webp",
                title: "SUMMER THROWBACK",
                uid: "t1KQ33hm4aflQluIwnv1VlIkZ4e2",
                text: "Lycus Empire faced off against E7 Esports for their second matchup in the Grand Finals o...",
                view: 0,
                reply: 0,
                vote: 1
              }}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={2}>
            <PostCard
              item={{
                banner: "/static/images/post_back/3.webp",
                title: "FIRST EVENT SINCE 601 DAYS",
                uid: "t1KQ33hm4aflQluIwnv1VlIkZ4e2",
                text: "Game Rogue recently released their new rebrand from Esports Global League, also formerly...",
                view: 3,
                reply: 0,
                vote: 1
              }}
            />
          </Grid>
        </Grid>
      </Box>
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
