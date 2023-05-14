import { Box, Typography } from "@mui/material";
import Stepper from "@/src/components/carousel/Stepper";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

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

const FeaturedTournaments = () => {
  return (
    <Box
      component={"section"}
      sx={{
        position: "relative",
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
            swipeable: false,
            showThumbs: false,
            showStatus: false,
            infiniteLoop: true,
            // showIndicators: false,
            animationHandler: (props, state) => {
              const transitionTime = props.transitionTime + "ms";
              const transitionTimingFunction = "ease-in-out";

              let slideStyle = {
                position: "absolute",
                display: "block",
                zIndex: -2,
                minHeight: "100%",
                opacity: 0,
                top: 0,
                right: 0,
                left: 0,
                bottom: 0,
                transitionTimingFunction: transitionTimingFunction,
                msTransitionTimingFunction: transitionTimingFunction,
                MozTransitionTimingFunction: transitionTimingFunction,
                WebkitTransitionTimingFunction: transitionTimingFunction,
                OTransitionTimingFunction: transitionTimingFunction,
              };

              if (!state.swiping) {
                slideStyle = {
                  ...slideStyle,
                  WebkitTransitionDuration: transitionTime,
                  MozTransitionDuration: transitionTime,
                  OTransitionDuration: transitionTime,
                  transitionDuration: transitionTime,
                  msTransitionDuration: transitionTime,
                };
              }

              return {
                slideStyle,
                selectedStyle: {
                  ...slideStyle,
                  opacity: 1,
                  position: "relative",
                },
                prevStyle: { ...slideStyle },
              };
            },
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
            renderIndicator: (clickHandler, isSelected, index, label) => (
              <button
                onClick={clickHandler}
                style={{
                  width: "10px",
                  height: "10px",
                  marginInline: "10px",
                  borderRadius: "50%",
                  outline: "solid 2px white",
                  outlineOffset: "1px",
                  backgroundColor:
                    isSelected === true ? "white" : "transparent",
                  cursor: "pointer",
                  border: "none",
                  zIndex: 20,
                  dropShadow: "0,0,5px,white",
                  ":hover": {
                    backgroundColor: "white",
                  },
                }}
              ></button>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default FeaturedTournaments;
