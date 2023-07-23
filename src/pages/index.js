import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Box, Container, Grid, Tooltip, Typography, useTheme } from "@mui/material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useMemo, useState } from "react";

import Benefits from "@/src/components/widgets/Benefits";
import Button from "@mui/material/Button";
import { Carousel } from "react-responsive-carousel";
import FeaturedTournaments from "@/src/components/widgets/FeaturedTournaments";
import Link from "next/link";
import PublicLayout from "@/src/content/PublicLayout";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";

const MyApp = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const [banner, setBanner] = useState(0);
  const [aboutUsHover, setAboutUsHover] = useState(false);

  useEffect(() => {
    setTitle("Welcome to Game Rogue");
    setInterval(() => {
      setBanner((prev) => (prev + 1) % 6);
    }, 3000);
  }, []);

  return (
    <>
      <Box
        component={"section"}
        sx={{
          position: "relative",
          height: "57px",
          backgroundColor: "transparent"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            background: "white",
            width: "100%",
            height: "57px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: banner % 2 == 0 ? 1 : 0,
            transition: "all 0.5s"
          }}
        >
          <img src="/static/images/GRLOGO_O_B.webp" style={{ height: "57px" }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            background: theme.palette.primary.main,
            width: "100%",
            height: "57px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: banner == 1 ? 1 : 0,
            transition: "all 0.5s"
          }}
        >
          <Typography variant="h4" sx={{ position: "absolute", color: "white", fontSize: "30px" }}>
            <Link href="/organization/create">
              TOO MANY HEADACHES FROM HOSTING EVENTS? WE GOT YOU COVERED, CLICK HERE!
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            background: theme.palette.primary.main,
            width: "100%",
            height: "57px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: banner == 3 ? 1 : 0,
            transition: "all 0.5s"
          }}
        >
          <Typography variant="h4" sx={{ position: "absolute", color: "white", fontSize: "30px" }}>
            <Link href="/locked?page=">
              GET 10 PIECES OF TEAM MERCH FOR A FRACTION OF THE COST, TAILORED FOR YOU!
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            position: "absolute",
            background: theme.palette.primary.main,
            width: "100%",
            height: "57px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: banner == 5 ? 1 : 0,
            transition: "all 0.5s"
          }}
        >
          <Typography variant="h4" sx={{ position: "absolute", color: "white", fontSize: "30px" }}>
            <Link href="/organization/create">LOOKING TO START A TEAM? CLICK HERE!</Link>
          </Typography>
        </Box>
      </Box>
      <Box
        component={"section"}
        sx={{
          position: "relative",
          backgroundImage: "url(/static/images/back1.png)",
          height: "910px",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          alignItems: "center"
        }}
      >
        <video
          style={{
            position: "absolute"
          }}
          autoPlay
          loop
          muted
          poster="/static/images/back1.png"
        >
          <source src="/intro.mp4" type="video/mp4" />
        </video>
        <Typography
          variant="h1"
          align="center"
          fontSize={"72px"}
          fontStyle={"italic"}
          color={"black"}
          lineHeight={"100.8px"}
        >
          PLUS PLANS
          <br />
          AVAILABLE JULY 25TH
          <br />
          <Button
            variant="contained"
            sx={{ mt: "22px", px: "22px", py: "8px", borderRadius: 0 }}
            onClick={() => {
              router.push("/plus-plans");
            }}
          >
            <Typography variant="h1" fontSize={"59px"} color={"white"} letterSpacing={"5.9px"}>
              SUBSCRIBE
            </Typography>
          </Button>
        </Typography>
      </Box>

      <FeaturedTournaments />

      <Box
        component={"section"}
        sx={{
          position: "relative",
          backgroundColor: "#101216",
          paddingTop: "80px",
          paddingBottom: "175px"
        }}
      >
        <Box
          sx={{
            width: "80%",
            mx: "auto"
          }}
        >
          <Grid
            container
            columnSpacing={{
              xs: 0,
              xl: 28
            }}
            alignItems="center"
          >
            <Grid item xs={12} xl={6}>
              <Box
                sx={{
                  borderRadius: "30px",
                  border: "solid 3px rgba(227, 81, 6, 0.73)",
                  backgroundColor: "black",
                  textAlign: "center",
                  px: "20px",
                  minWidth: "500px"
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    mt: "43px",
                    mb: "23px",
                    fontSize: "30px"
                  }}
                >
                  THE NEXT GENERATION OF ESPORTS
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "23px"
                  }}
                >
                  Are you an event-hoster looking for an all-in-one package to produce pro-league
                  level events from structure to productions?
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "23px"
                  }}
                >
                  Or a team looking to build with the most influential tools to win and grow?
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "23px"
                  }}
                >
                  Maybe your just a player or content creator looking for casual play or
                  professional development?
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "23px"
                  }}
                >
                  We have every feature bundled in low-cost packages with the most fundamental
                  features always available for free!
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    px: 5,
                    my: 3,
                    borderRadius: 0
                  }}
                  onClick={() => {
                    router.push("/plus-plans");
                  }}
                >
                  <Typography variant="h4" fontSize={"35px"}>
                    VIEW NOW
                  </Typography>
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} xl={6}>
              <Box
                sx={{
                  display: "flex",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <video
                  poster="/static/images/laptop.png"
                  loop={true}
                  autoPlay={true}
                  muted={true}
                  style={{ width: "150%", height: "150%" }}
                >
                  <source src="/static/animations/Laptop.webm" type="video/webm" />
                </video>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          backgroundColor: theme.palette.primary.main
        }}
      >
        <Benefits />
      </Box>

      <Box
        component={"section"}
        sx={{
          pt: "70px",
          background: "url(/static/images/about_us_bg.gif)"
        }}
      >
        <Box
          sx={{
            maxWidth: "940px",
            mx: "auto",
            px: "10px",
            textAlign: "center",
            border: "solid 3px rgba(227, 81, 6, 0.73)",
            borderRadius: "30px",
            background: "black",
            py: "30px"
          }}
        >
          <Typography variant="h3" fontSize={"30px"}>
            WHAT IS GAME ROGUE?
          </Typography>
          <Typography variant="body1" fontSize={"23px"} sx={{ mt: 2 }}>
            Don't know Game Rogue? We've been hosting tournaments since 2018 and would love for you
            to join the experience! We tailor to our community, fulfilling our obligations time-in
            and time-out since our creation.
          </Typography>
          <Typography variant="body1" fontSize={"23px"} sx={{ mt: 2 }}>
            Thank you to our community for giving us the ability to host tournaments and provide the
            next generation of esports globally.
          </Typography>
          <Box
            component={"img"}
            src={"/static/images/Game_Rogue_Text_1.png"}
            alignSelf={"center"}
            maxWidth={"100%"}
            height={"80px"}
            sx={{
              mt: 2,
              mx: "auto",
              width: "auto",
              display: "block"
            }}
          ></Box>
          <Button
            variant="contained"
            sx={{
              mt: 5,
              width: "275px",
              height: "65px",
              borderRadius: 0
            }}
            onMouseOver={() => setAboutUsHover(true)}
            onMouseOut={() => setAboutUsHover(false)}
            onClick={() => {
              router.push("/about");
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontSize: aboutUsHover ? "35px" : "30px",
                transition: "ease-in-out 0.2s"
              }}
            >
              ABOUT US
            </Typography>
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            pt: "60px",
            pb: "40px",
            textAlign: "center"
          }}
        >
          <Button
            onClick={() =>
              document.scrollingElement.scroll({
                left: 0,
                top: 0,
                behavior: "smooth"
              })
            }
            sx={{
              background: "none",
              ":hover": {
                background: "none",
                opacity: 0.7
              },
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2
            }}
          >
            <img src={"/static/images/back-to-top.svg"} style={{ width: "73px", height: "56px" }} />
            <Typography variant="body1" color="white" fontSize="23px">
              BACK TO TOP
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box component="section" sx={{ maxWidth: "80%", mx: "auto", py: "40px" }}>
        <Typography variant="h4" textTransform="upperase" textAlign="center">
          SPONSORED BY
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={4} rowSpacing={2} alignItems="center" justifyContent="center">
            <Grid item>
              <Tooltip title="All World Gaming: CSGO (Organizer)">
                <Link href="https://twitter.com/AllWorldGaming">
                  <img src="/static/images/sponsors/White.png" height={80} />
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Safari Legion (Organization)">
                <Link href="https://twitter.com/SafariLegion">
                  <img src="/static/images/sponsors/lion-logo_Black.png" height={80} />
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Vista Esports (Organization)">
                <Link href="https://discord.gg/vistaesc">
                  <img src="/static/images/sponsors/VISTA_White.png" height={80} />
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Ottawa Warriors (Team)">
                <Link href="https://discord.gg/EGCNvVGFE">
                  <img src="/static/images/sponsors/Ottawa_Warriors_Whitte.png" height={80} />
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Evil Connections (Team)">
                <Link href="https://twitter.com/EvilConnections">
                  <img src="/static/images/sponsors/ECE_Logomark_White.png" height={80} />
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Red Bull">
                <Link href="https://www.redbull.com/us-en/energydrink">
                  <img src="/static/images/sponsors/red-bull-white.png" height={80} />
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Tempr Esports (Team)">
                <Link href="https://twitter.com/EsportsTempr">
                  <img src="/static/images/sponsors/Tempr Esports Logo.webp" />
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="One Shot Gaming (Former Organization)">
                <Link href="#">
                  <img src="/static/images/sponsors/OSG Logo.webp" />
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Team Krysos (Former Organization)">
                <Link href="#">
                  <img src="/static/images/sponsors/Krysos Logo White.webp" />
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Chaos Nation (Team)">
                <Link href="https://twitter.com/ChaosNationGG">
                  <img src="/static/images/sponsors/Chaos Nation II White.webp" />
                </Link>
              </Tooltip>
            </Grid>
            <Grid item>
              <Tooltip title="Silent Sins (Organization)">
                <Link href="https://twitter.com/SilentSinsLLC">
                  <img src="/static/images/sponsors/Silent Sins White.webp" />
                </Link>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

MyApp.getLayout = (page) => {
  return (
    <TournamentProvider>
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

MyApp.ignoreAuth = true;

export default MyApp;
