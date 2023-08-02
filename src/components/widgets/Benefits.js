import { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";

const TitleComponent = ({ active, sx, children }) => {
  return (
    <Typography
      variant="h2"
      textTransform="uppercase"
      sx={{
        fontSize: "80px",
        position: "absolute",
        left: "calc(50%)",
        transform: "translate(-50%, 0)",
        width: "fit-content",
        margin: "auto",
        opacity: active ? 1 : 0,
        transition: "all ease-in-out 1s",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};

const ContentComponent = ({ active, sx, children }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Typography
        variant="h4"
        textTransform="uppercase"
        sx={{
          position: "absolute",
          textAlign: "center",
          opacity: active ? 1 : 0,
          transition: "all ease-in-out 1s",
          fontSize: "40px",
          ...sx,
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

const Benefits = () => {
  const [activeTitleIndex, setActiveTitleIndex] = useState(0);
  const [activeContentIndex1, setActiveContentIndex1] = useState(0);
  const [activeContentIndex2, setActiveContentIndex2] = useState(0);
  const [activeContentIndex3, setActiveContentIndex3] = useState(0);
  const [activeContentIndex4, setActiveContentIndex4] = useState(0);
  const [activeContentIndex5, setActiveContentIndex5] = useState(0);
  const [activeContentIndex6, setActiveContentIndex6] = useState(0);

  useEffect(() => {
    const titleIntervalId = setInterval(() => {
      setActiveTitleIndex((prev) => (prev + 1) % 6);
    }, 3000);
    let contentIntervalId1,
      contentIntervalId2,
      contentIntervalId3,
      contentIntervalId4,
      contentIntervalId5,
      contentIntervalId6;

    setTimeout(() => {
      contentIntervalId1 = setInterval(() => {
        setActiveContentIndex1((prev) => (prev + 1) % 5);
      }, 3000);
      contentIntervalId2 = setInterval(() => {
        setActiveContentIndex2((prev) => (prev + 1) % 3);
      }, 3000);
      contentIntervalId3 = setInterval(() => {
        setActiveContentIndex3((prev) => (prev + 1) % 5);
      }, 3000);
      contentIntervalId4 = setInterval(() => {
        setActiveContentIndex4((prev) => (prev + 1) % 3);
      }, 3000);
      contentIntervalId5 = setInterval(() => {
        setActiveContentIndex5((prev) => (prev + 1) % 5);
      }, 3000);
      contentIntervalId6 = setInterval(() => {
        setActiveContentIndex6((prev) => (prev + 1) % 4);
      }, 3000);
    }, 500);
    return () => {
      clearInterval(titleIntervalId);
      clearInterval(contentIntervalId1);
      clearInterval(contentIntervalId2);
      clearInterval(contentIntervalId3);
      clearInterval(contentIntervalId4);
      clearInterval(contentIntervalId5);
      clearInterval(contentIntervalId6);
    };
  }, []);

  return (
    <Box sx={{ position: "relative", py: 8 }}>
      <Box id="title" sx={{ textAlign: "center", height: "200px" }}>
        <TitleComponent
          active={activeTitleIndex === 0}
          sx={{ borderBottom: "solid 3px white" }}
        >
          <span style={{ color: "white" }}> The</span>&nbsp;
          <span style={{ color: "black" }}>Cheapest </span>
        </TitleComponent>
        <TitleComponent active={activeTitleIndex === 1}>
          <span style={{ color: "white" }}>The</span>&nbsp;
          <span style={{ color: "black" }}>Fastest</span>
        </TitleComponent>
        <TitleComponent active={activeTitleIndex === 2}>
          <span style={{ color: "white" }}>The</span>&nbsp;
          <span style={{ color: "black" }}>Most Efficient</span>
        </TitleComponent>
        <TitleComponent active={activeTitleIndex === 3}>
          <span style={{ color: "black" }}>Revolutionary</span>
          <br />
          <span style={{ color: "white" }}>Player Solutions</span>
        </TitleComponent>
        <TitleComponent active={activeTitleIndex === 4}>
          <span style={{ color: "black" }}>Revolutionary</span>
          <br />
          <span style={{ color: "white" }}>Team Solutions</span>
        </TitleComponent>
        <TitleComponent active={activeTitleIndex === 5}>
          <span style={{ color: "black" }}>Revolutionary</span>
          <br />
          <span style={{ color: "white" }}>Event Solutions</span>
        </TitleComponent>
      </Box>
      <Box id="content" sx={{ mt: 4, textAlign: "center", px: "50px" }}>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            sx={{ position: "relative", height: "200px" }}
          >
            <ContentComponent active={activeContentIndex1 === 0}>
              <span>
                <span style={{ color: "white" }}>Instant</span>&nbsp;
                <span style={{ color: "black" }}>Stream</span>
              </span>
              <br />
              <span>
                <span style={{ color: "black" }}>Editting</span>&nbsp;
                <span style={{ color: "white" }}>Software</span>
              </span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex1 === 1}>
              <span style={{ color: "white" }}>Productions</span>
              <br />
              <span style={{ color: "black" }}>Host & Dashboard</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex1 === 2}>
              <span style={{ color: "white" }}>Productions</span>
              <br />
              <span style={{ color: "black" }}>Edittable Graphics</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex1 === 3}>
              <span style={{ color: "white" }}>Stream</span>&nbsp;
              <span style={{ color: "black" }}>Templates</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex1 === 4}>
              <span>
                <span style={{ color: "white" }}>Instant</span>&nbsp;
                <span style={{ color: "black" }}>Video</span>
              </span>
              <br />
              <span>
                <span style={{ color: "black" }}>Editting</span>&nbsp;
                <span style={{ color: "white" }}>Software</span>
              </span>
            </ContentComponent>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            sx={{ position: "relative", height: "200px" }}
          >
            <ContentComponent active={activeContentIndex2 === 0}>
              <span>
                <span style={{ color: "white" }}>Instant</span>&nbsp;
                <span style={{ color: "black" }}>Team</span>
              </span>
              <br />
              <span>
                <span style={{ color: "white" }}>Statistics</span>
              </span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex2 === 1}>
              <span>
                <span style={{ color: "white" }}>Instant</span>&nbsp;
                <span style={{ color: "black" }}>Event</span>
              </span>
              <br />
              <span>
                <span style={{ color: "white" }}>Statistics</span>
              </span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex2 === 2}>
              <span>
                <span style={{ color: "white" }}>Instant</span>&nbsp;
                <span style={{ color: "black" }}>Player</span>
              </span>
              <br />
              <span>
                <span style={{ color: "white" }}>Statistics</span>
              </span>
            </ContentComponent>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            sx={{ position: "relative", height: "200px" }}
          >
            <ContentComponent active={activeContentIndex3 === 0}>
              <span style={{ color: "white" }}>Instant Opponent</span>
              <br />
              <span style={{ color: "black" }}>Communication</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex3 === 1}>
              <span style={{ color: "white" }}>Event Stuff</span>
              <br />
              <span style={{ color: "black" }}>Support Options</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex3 === 2}>
              <span style={{ color: "white" }}>Add Rulebooks &</span>
              <br />
              <span style={{ color: "black" }}>Custom Regulations</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex3 === 3}>
              <span style={{ color: "white" }}>Easily Register</span>
              <br />
              <span style={{ color: "black" }}>Event Licenses</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex3 === 4}>
              <span style={{ color: "white" }}>Instant Game</span>
              <br />
              <span style={{ color: "black" }}>Match-Making</span>
            </ContentComponent>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            sx={{ position: "relative", height: "200px" }}
          >
            <ContentComponent active={activeContentIndex4 === 0}>
              <span style={{ color: "white" }}>Support</span>
              <br />
              <span style={{ color: "black" }}>Nonprofits</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex4 === 1}>
              <span style={{ color: "white" }}>Crowd-funding</span>
              <br />
              <span style={{ color: "black" }}>Contributions</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex4 === 2}>
              <span style={{ color: "white" }}>Link Your</span>
              <br />
              <span style={{ color: "black" }}>Existing Community</span>
            </ContentComponent>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            sx={{ position: "relative", height: "200px" }}
          >
            <ContentComponent active={activeContentIndex5 === 0}>
              <span style={{ color: "white" }}>Find</span>&nbsp;
              <span style={{ color: "black" }}>Players</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex5 === 1}>
              <span style={{ color: "white" }}>Find</span>&nbsp;
              <span style={{ color: "black" }}>Teams</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex5 === 2}>
              <span style={{ color: "white" }}>Find</span>&nbsp;
              <span style={{ color: "black" }}>Events</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex5 === 3}>
              <span style={{ color: "white" }}>Find</span>
              <br />
              <span style={{ color: "black" }}>Production Staff</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex5 === 4}>
              <span style={{ color: "white" }}>Find</span>&nbsp;
              <span style={{ color: "black" }}>Sponsors</span>
            </ContentComponent>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            sx={{ position: "relative", height: "200px" }}
          >
            <ContentComponent active={activeContentIndex6 === 0}>
              <span style={{ color: "white" }}>Esports</span>
              <br />
              <span style={{ color: "black" }}>Social Media</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex6 === 1}>
              <span>
                <span style={{ color: "white" }}>Live</span>&nbsp;
                <span style={{ color: "black" }}>Games</span>
              </span>
              <br />
              <span style={{ color: "black" }}>& Stream Chats</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex6 === 2}>
              <span style={{ color: "white" }}>Instant Social</span>
              <br />
              <span style={{ color: "black" }}>Media Manager</span>
            </ContentComponent>
            <ContentComponent active={activeContentIndex6 === 3}>
              <span style={{ color: "white" }}>Social Media</span>
              <br />
              <span style={{ color: "black" }}>Edittable Templates</span>
            </ContentComponent>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Box
          sx={{
            width: "250px",
            height: "120px",
            py: "30px",
            margin: "auto",
            borderTop: "solid 3px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              filter: "brightness(0)",
              objectFit: "contain",
            }}
            src="/static/images/home/gr_letters.png"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Benefits;
