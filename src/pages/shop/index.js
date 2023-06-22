import { Box, Button, Container, Grid, IconButton, Typography } from "@mui/material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";

import ShopContainer from "@/src/components/widgets/shop/ShopContainer";
import ShopLayout from "@/src/content/ShopLayout";
import { useRouter } from "next/router";

const Page = (props) => {
  const router = useRouter();
  const { shop } = useTournamentContext();

  const moreButtonStyle = {
    fontWeight: 700,
    textTransform: "uppercase",
    backgroundColor: "rgba(0,0,0,0.9)",
    color: "white",
    ":hover": {
      backgroundColor: "rgba(0,0,0,0.6)",
      color: "white"
    }
  };

  return (
    <Box>
      <Box>
        <video
          style={{
            height: "80vh",
            width: "100vw",
            zIndex: 9999,
            objectFit: "cover"
          }}
          muted={true}
          autoPlay={true}
          loop={true}
        >
          <source src="/static/animations/asset2.webm" type="video/webm" />
        </video>
      </Box>
      <Box sx={{ display: "flex", backgroundColor: "white" }}>
        <Box sx={{ flex: 6, margin: "40px" }}>
          <video
            style={{
              height: "80vh",
              width: "100%",
              zIndex: 9999,
              objectFit: "cover"
            }}
            muted={true}
            autoPlay={true}
            loop={true}
          >
            <source src="/static/animations/asset3.webm" type="video/webm" />
          </video>
        </Box>
        <Box sx={{ flex: 4, display: "flex", alignItems: "center" }}>
          <Box textAlign="center">
            <Typography variant="h4" color="black" sx={{ fontSize: "35px" }}>
              2023 TAILORED TEAM BUNDLE
            </Typography>
            <Button
              variant="contained"
              sx={{
                margin: "20px",
                width: "80%",
                borderRadius: 18,
                backgroundColor: "black",
                color: "white",
                ":hover": { backgroundColor: "darkgrey" }
              }}
            >
              VIEW COLLECTION
            </Button>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", backgroundColor: "white", justifyContent: "center" }}>
        <Box sx={{ display: "flex", marginTop: "30px" }}>
          <Box textAlign="center">
            <Typography variant="h4" color="black" sx={{ fontSize: "35px", marginTop: "20px" }}>
              CREATE YOUR OWN APPAREL
            </Typography>
            <Button
              variant="contained"
              sx={{
                width: "80%",
                borderRadius: 18,
                backgroundColor: "black",
                margin: "30px",
                color: "white",
                ":hover": { backgroundColor: "darkgrey" }
              }}
              onClick={() => {
                router.push("/shop/apparel");
              }}
            >
              START NOW
            </Button>
          </Box>
        </Box>
        <Box sx={{ margin: "20px", overflow: "hidden" }}>
          <video
            style={{
              height: "80vh",
              width: "100%",
              zIndex: 9999,
              marginTop: "-25px"
            }}
            muted={true}
            autoPlay={true}
            loop={true}
          >
            <source src="/static/animations/asset4.mp4" type="video/mp4" />
          </video>
        </Box>
      </Box>

      <Box sx={{ backgroundColor: "black", mt: 4, paddingInline: "10%" }}>
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
          <Box
            component={"img"}
            src="/static/images/games/r6s.webp"
            sx={{ filter: "invert(1)" }}
          ></Box>
          <Typography
            variant="body1"
            fontWeight={700}
            fontSize={25}
            color="black"
            textTransform="uppercase"
          >
            SHOPS
          </Typography>
          <Box
            sx={{
              flex: 1,
              textAlign: "right"
            }}
          >
            <Button
              variant="contained"
              sx={{
                // backgroundColor: "#c2260a",
                ":hover": {
                  // backgroundColor: "#ff4929",
                },
                ...moreButtonStyle
              }}
              onClick={() => {
                router.push("/shop/create");
              }}
            >
              OPEN SHOP
            </Button>
          </Box>
        </Box>
        <Box textAlign="center" marginBlock="30px">
          <ShopContainer items={_.map(shop?.shops, (val) => val)} />
        </Box>
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <ShopLayout>{page}</ShopLayout>
    </TournamentProvider>
  );
};

export default Page;
