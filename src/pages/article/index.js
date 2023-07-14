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
import { EVENT_REGIONS, PLATFORMS } from "@/src/config/global";
import { KeyboardArrowDown, Search } from "@mui/icons-material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useMemo, useState } from "react";

import ArticleCollection from "@/src/components/widgets/article/ArticleCollection";
import CategoryCard from "@/src/components/widgets/article/CategoryCard";
import DropdownMenu from "@/src/components/DropdownMenu";
import { GAMES } from "@/src/config/global";
import PostCard from "@/src/components/widgets/article/PostCard";
import PublicLayout from "@/src/content/PublicLayout";
import { useRouter } from "next/router";

const regions = [
  {
    id: 0,
    name: "North America"
  },
  {
    id: 1,
    name: "Latin America"
  },
  {
    id: 2,
    name: "Europe"
  }
];

const platforms = [
  {
    id: 0,
    name: "PC"
  },
  {
    id: 1,
    name: "Console"
  }
];

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { article } = useTournamentContext();
  const [filter, setFilter] = useState("");
  const [game, setGame] = useState(GAMES[0]);
  const [platform, setPlatform] = useState(platforms[0]);
  const [region, setRegion] = useState(regions[0]);

  const onFilterChange = (e, inv) => {
    setFilter(inv);
  };

  const onGameChange = (newGame) => {
    setGame(newGame);
  };
  const onPlatformChange = (newPlatform) => {
    setPlatform(newPlatform);
  };
  const onRegionChange = (newRegion) => {
    setRegion(newRegion);
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

        {/* Begin Search Field */}
        <Container
          gap={4}
          sx={{ display: "flex", alignItems: "stretch", mt: 5 }}
          className="search-box"
        >
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
              paddingInline: 4
            }}
          >
            <Search fontSize="large" />
          </Button>
        </Container>
        {/* End Search Field */}

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

          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Button
              variant="contained"
              sx={{
                color: "white"
              }}
              onClick={() => {
                router.push("/article/create");
              }}
            >
              Create Article
            </Button>
          </Box>
        </Container>
      </Box>

      <Box
        component={"section"}
        sx={{
          position: "relative",
          borderTop: "solid 2px rgb(245,131,31)",
          background: "linear-gradient(to right, #321401 30%, #a84900)",
          py: "10px"
        }}
      >
        <Box sx={{ marginInline: "7%", display: "flex", alignItems: "center", gap: 1 }}>
          <Box component={"img"} src={game?.image}></Box>
          <Typography
            variant="body1"
            fontWeight={700}
            fontSize={25}
            color={theme.palette.primary.main}
            textTransform="uppercase"
          >
            {game?.name}
          </Typography>
          <Box
            sx={{
              flex: 1,
              textAlign: "right",
              display: "flex",
              gap: 2,
              alignItems: "center",
              flexDirection: "row-reverse"
            }}
          >
            <DropdownMenu name="game" title="Change Game" items={GAMES} onChange={onGameChange} />
            <DropdownMenu
              name="region"
              title="Change Region"
              items={regions}
              onChange={onRegionChange}
            />
            <DropdownMenu
              name="platform"
              title="Change Platform"
              items={platforms}
              onChange={onPlatformChange}
            />
          </Box>
        </Box>
      </Box>

      <Box sx={{ padding: 3, background: "black", paddingInline: "7%" }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            alignItems: "center",
            // backgroundColor: "#140300",
            background: "linear-gradient(to right, #fff, #a84900)",
            border: "none",
            borderLeft: "solid 5px #ed7606",
            padding: 2
          }}
        >
          <Typography
            variant="body1"
            fontWeight={700}
            fontSize={25}
            color="black"
            textTransform="uppercase"
          >
            Articles
          </Typography>
          <Box
            sx={{
              flex: 1,
              textAlign: "right"
            }}
          >
            <DropdownMenu
              name="sort"
              title="Sort"
              items={[
                {
                  id: 0,
                  name: "Most recent"
                },
                {
                  id: 1,
                  name: "Most Viewed"
                },
                {
                  id: 3,
                  name: "Tiered"
                },
                {
                  id: 4,
                  name: "Trending"
                }
              ]}
            />
            <DropdownMenu
              name="category"
              title="Category"
              sx={{
                marginLeft: 2
              }}
              items={[
                {
                  id: 0,
                  name: "Players"
                },
                {
                  id: 1,
                  name: "Teams"
                },
                {
                  id: 3,
                  name: "Organizations"
                },
                {
                  id: 4,
                  name: "Organizers"
                },
                {
                  id: 5,
                  name: "Events"
                }
              ]}
            />
          </Box>
        </Box>

        {/* Begin Article Collection */}
        <ArticleCollection items={article?.articles} />
        {/* End Article Collection */}
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
