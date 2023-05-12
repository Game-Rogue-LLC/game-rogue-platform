import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useAppContext } from "@/src/context/app";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import Stepper from "@/src/components/carousel/Stepper";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { Carousel } from "react-responsive-carousel";
import { useAuthContext } from "@/src/context/AuthContext";
import PublicLayout from "@/src/content/PublicLayout";
import Benefits from "@/src/components/widgets/Benefits";

const featuredTournaments = [
  {
    src: "/static/images/back2.png",
    name: "",
    content: (
      <Box
        sx={{
          position: "relative",
          bottom: "0",
          left: "0",
          width: "100%",
          background: "#f5831f",
          color: "#fff",
          padding: "10px",
          fontSize: "12px",
          border: "solid 2px white",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            color: "black",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          $1,500 2023 GAME ROGUE MAJORS
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "left", color: "white", fontSize: "25px" }}
        >
          PC - Rainbow Six Siege 3/1,12,18,19/22, 7:00 PM EST 1st - 4th Place
          Prizes
        </Typography>
      </Box>
    ),
  },
  {
    src: "/static/images/back2.png",
    name: "",
    content: (
      <Box
        sx={{
          position: "relative",
          bottom: "0",
          left: "0",
          width: "100%",
          background: "#f5831f",
          color: "#fff",
          padding: "10px",
          fontSize: "12px",
          border: "solid 2px white",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            color: "black",
            fontSize: "40px",
            fontWeight: "bold",
          }}
        >
          $1,500 2023 GAME ROGUE MAJORS
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "left", color: "white", fontSize: "25px" }}
        >
          PC - Rainbow Six Siege 3/1,12,18,19/22, 7:00 PM EST 1st - 4th Place
          Prizes
        </Typography>
      </Box>
    ),
  },
];

const MyApp = (props) => {
  const theme = useTheme();
  const user = useAuthContext();
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
          backgroundColor: "transparent",
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
            transition: "all 0.5s",
          }}
        >
          <img
            src="/static/images/GRLOGO_O_B.webp"
            style={{ height: "57px" }}
          />
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
            transition: "all 0.5s",
          }}
        >
          <Typography
            variant="h4"
            sx={{ position: "absolute", color: "white", fontSize: "30px" }}
          >
            TOO MANY HEADACHES FROM HOSTING EVENTS? WE GOT YOU COVERED, CLICK
            HERE!
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
            transition: "all 0.5s",
          }}
        >
          <Typography
            variant="h4"
            sx={{ position: "absolute", color: "white", fontSize: "30px" }}
          >
            GET 10 PIECES OF TEAM MERCH FOR A FRACTION OF THE COST, TAILORED FOR
            YOU!
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
            transition: "all 0.5s",
          }}
        >
          <Typography
            variant="h4"
            sx={{ position: "absolute", color: "white", fontSize: "30px" }}
          >
            LOOKING TO START A TEAM? LOOKING TO JOIN ONE? CLICK HERE!
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
          alignItems: "center",
        }}
      >
        <video
          style={{
            position: "absolute",
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
          AVAILABLE NOW
          <br />
          <Button
            variant="contained"
            sx={{ mt: "22px", px: "22px", py: "8px", borderRadius: 0 }}
          >
            <Typography
              variant="h1"
              fontSize={"59px"}
              color={"white"}
              letterSpacing={"5.9px"}
            >
              SUBSCRIBE
            </Typography>
          </Button>
        </Typography>
      </Box>
      <Box
        component={"section"}
        sx={{
          backgroundColor: "black",
          paddingBottom: "50px",
          borderBottom: "solid 3px #f5831f",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "85%",
            mt: 1,
            mx: "auto",
          }}
        >
          <Typography variant="h1" fontSize={"40px"} fontStyle={"italic"}>
            FEATURED TOURNAMENTS
          </Typography>
          <Stepper
            data={featuredTournaments}
            sx={{
              marginTop: "29px",
              position: "relative",
              boxShadow: "rgba(255,255,255,0.6) 0px 0px 50px 9px",
            }}
            config={{
              showThumbs: false,
              showStatus: false,
              infiniteLoop: true,
              showIndicators: false,
              renderArrowPrev: (clickHandler) => (
                <button
                  onClick={clickHandler}
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    display: "flex",
                    padding: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    border: "none",
                    zIndex: 20,
                  }}
                >
                  <ArrowBackIos
                    sx={{ fontSize: "60px", ":hover": { opacity: 0.7 } }}
                  ></ArrowBackIos>
                </button>
              ),
              renderArrowNext: (clickHandler) => (
                <button
                  onClick={clickHandler}
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    display: "flex",
                    padding: 30,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    border: "none",
                    zIndex: 20,
                  }}
                >
                  <ArrowForwardIos
                    sx={{ fontSize: "60px", ":hover": { opacity: 0.7 } }}
                  ></ArrowForwardIos>
                </button>
              ),
            }}
          />
        </Box>
      </Box>
      <Box
        component={"section"}
        sx={{
          position: "relative",
          backgroundColor: "#101216",
          paddingTop: "80px",
          paddingBottom: "175px",
        }}
      >
        <Box
          sx={{
            width: "80%",
            mx: "auto",
          }}
        >
          <Grid
            container
            columnSpacing={{
              xs: 0,
              xl: 28,
            }}
          >
            <Grid item xs={12} xl={6}>
              <Box
                sx={{
                  borderRadius: "30px",
                  border: "solid 3px rgba(227, 81, 6, 0.73)",
                  backgroundColor: "black",
                  textAlign: "center",
                  px: "20px",
                  minWidth: "500px",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    mt: "43px",
                    mb: "23px",
                    fontSize: "30px",
                  }}
                >
                  THE NEXT GENERATION OF ESPORTS
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "23px",
                  }}
                >
                  Are you an event-hoster looking for an all-in-one package to
                  produce pro-league level events from structure to productions?
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "23px",
                  }}
                >
                  Or a team looking to build with the most influential tools to
                  win and grow?
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "23px",
                  }}
                >
                  Maybe your just a player or content creator looking for casual
                  play or professional development?
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "23px",
                  }}
                >
                  We have every feature bundled in low-cost packages with the
                  most fundamental features always available for free!
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    color: "white",
                    px: 5,
                    my: 3,
                    borderRadius: 0,
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
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src="/static/images/laptop.png" />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Benefits />
      </Box>
      <Box component={"section"}>
        <Carousel
          sx={{
            position: "relative",
          }}
          showThumbs={false}
          showStatus={false}
          infiniteLoop={true}
          showIndicators={false}
          renderArrowPrev={(clickHandler) => (
            <button
              onClick={clickHandler}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: 0,
                display: "flex",
                padding: 30,
                justifyContent: "center",
                alignItems: "center",
                color: theme.palette.primary.main,
                backgroundColor: "transparent",
                cursor: "pointer",
                border: "none",
                zIndex: 20,
              }}
            >
              <ArrowBackIos
                sx={{ fontSize: "60px", ":hover": { opacity: 0.7 } }}
              ></ArrowBackIos>
            </button>
          )}
          renderArrowNext={(clickHandler) => (
            <button
              onClick={clickHandler}
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: 0,
                display: "flex",
                padding: 30,
                justifyContent: "center",
                alignItems: "center",
                color: theme.palette.primary.main,
                backgroundColor: "transparent",
                cursor: "pointer",
                border: "none",
                zIndex: 20,
              }}
            >
              <ArrowForwardIos
                sx={{ fontSize: "60px", ":hover": { opacity: 0.7 } }}
              ></ArrowForwardIos>
            </button>
          )}
        >
          <Box
            sx={{
              backgroundImage: "url(/static/images/carousel1.png)",
              height: "478px",
            }}
          ></Box>
          <Box
            sx={{
              backgroundImage: "url(/static/images/carousel2.png)",
              height: "478px",
            }}
          ></Box>
          <Box
            sx={{
              backgroundImage: "url(/static/images/carousel3.png)",
              height: "478px",
            }}
          ></Box>
        </Carousel>
      </Box>
      <Box
        component={"section"}
        sx={{
          pt: "70px",
          background: "url(/static/images/about_us_bg.gif)",
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
            py: "30px",
          }}
        >
          <Typography variant="h3" fontSize={"30px"}>
            WHAT IS GAME ROGUE?
          </Typography>
          <Typography variant="body1" fontSize={"23px"} sx={{ mt: 2 }}>
            Don't know Game Rogue? We've been hosting tournaments since 2018 and
            would love for you to join the experience! We tailor to our
            community, fulfilling our obligations time-in and time-out since our
            creation.
          </Typography>
          <Typography variant="body1" fontSize={"23px"} sx={{ mt: 2 }}>
            Thank you to our community for giving us the ability to host
            tournaments and provide the next generation of esports globally.
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
              display: "block",
            }}
          ></Box>
          <Button
            variant="contained"
            sx={{
              mt: 5,
              width: "275px",
              height: "65px",
              borderRadius: 0,
            }}
            onMouseOver={() => setAboutUsHover(true)}
            onMouseOut={() => setAboutUsHover(false)}
          >
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontSize: aboutUsHover ? "35px" : "30px",
                transition: "ease-in-out 0.2s",
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
            textAlign: "center",
          }}
        >
          <Button
            onClick={() =>
              document.scrollingElement.scroll({
                left: 0,
                top: 0,
                behavior: "smooth",
              })
            }
            sx={{
              background: "none",
              ":hover": {
                background: "none",
                opacity: 0.7,
              },
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
            }}
          >
            <img
              src={"/static/images/back-to-top.svg"}
              style={{ width: "73px", height: "56px" }}
            />
            <Typography variant="body1" color="white" fontSize="23px">
              BACK TO TOP
            </Typography>
          </Button>
        </Box>
      </Box>
      <Box component="section" sx={{ maxWidth: "60%", mx: "auto", py: "40px" }}>
        <Typography variant="h4" textTransform="upperase" textAlign="center">
          SPONSORED BY
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <img src="/static/images/sponsors/Tempr Esports Logo.webp" />
          <img src="/static/images/sponsors/OSG Logo.webp" />
          <img src="/static/images/sponsors/Krysos Logo White.webp" />
          <img src="/static/images/sponsors/Chaos Nation II White.webp" />
          <img src="/static/images/sponsors/Silent Sins White.webp" />
        </Box>
      </Box>
    </>
  );
};

MyApp.getLayout = (page) => {
  return <PublicLayout>{page}</PublicLayout>;
};

MyApp.ignoreAuth = true;

export default MyApp;
