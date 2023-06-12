import { Logo } from "@pmndrs/branding";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Button, Grid, Tab, Typography, styled, Checkbox } from "@mui/material";
import { IconButton } from "@mui/material";
import {
  AiFillCamera,
  AiOutlineArrowLeft,
  AiOutlineHighlight,
  AiOutlineShopping
} from "react-icons/ai";
import { useSnapshot } from "valtio";
import { state } from "@/src/store";
import FilePicker from "@/src/components/widgets/shop/FilePicker";
import { SwatchesPicker } from "react-color";
import { LoadingButton, TabContext, TabPanel, TabList } from "@mui/lab";
import { Close } from "@mui/icons-material";

export function Overlay({ sx }) {
  const snap = useSnapshot(state);
  const transition = { type: "spring", duration: 0.8 };

  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
          // height: "100%",
          borderLeft: "solid 3px rgb(245,131,31)",
          paddingBlock: 2,
          ...sx
        }}
      >
        <AnimatePresence>
          <motion.section key="custom" {...config}>
            <Customizer />
          </motion.section>
        </AnimatePresence>
      </Box>
    </>
  );
}

const StyledTabList = styled(TabList)(({ theme }) => ({
  ".MuiTabs-flexContainer": {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  ".MuiTab-root": {
    flexGrow: 1
  }
}));

function Customizer() {
  const snap = useSnapshot(state);
  const apparelSize = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const [file, setFile] = useState("");
  const [tab, setTab] = useState("1");
  const [quantity, setQuantity] = useState(0);

  const handle = {
    changeTab: (e, newTab) => {
      setTab(newTab);
    },
    changeFrontLogo: () => {
      state.frontLogoDisplay = !snap.frontLogoDisplay;
    },
    changeBackLogo: () => {
      state.backLogoDisplay = !snap.backLogoDisplay;
    },
    plusQuantity: () => {
      setQuantity(quantity + 1);
    },
    minusQuantity: () => {
      if (quantity > 0) setQuantity(quantity - 1);
    }
  };
  const readFile = (type) => {
    state.texture = file;
  };

  return (
    <Box sx={{ padding: 0 }}>
      <TabContext value={tab}>
        <StyledTabList onChange={handle.changeTab} aria-label="Tabs for games">
          <Tab label="LOGO" value="1" sx={{ fontSize: "17px" }} />
          <Tab label="CHECKOUT" value="2" sx={{ fontSize: "17px" }} />
        </StyledTabList>
        <TabPanel value="1" sx={{ padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#3f3c3b",
                borderRadius: "3px"
              }}
            >
              <Box sx={{ position: "relative", width: "40px", height: "100%" }}>
                <img
                  src="/static/images/logoSide/front.png"
                  height={50}
                  width={48}
                  style={{ position: "absolute", bottom: 0, left: 0 }}
                />
              </Box>
              <Typography
                variant="body"
                textAlign={"center"}
                fontSize={"1rem"}
                color={"white"}
                alignContent={"center"}
                marginLeft={"10px"}
              >
                FRONT
              </Typography>
              <Checkbox
                name="front"
                checked={snap.frontLogoDisplay}
                onChange={handle.changeFrontLogo}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#3f3c3b",
                borderRadius: "3px"
              }}
            >
              <Box sx={{ position: "relative", width: "40px", height: "100%" }}>
                <img
                  src="/static/images/logoSide/back.png"
                  height={50}
                  width={48}
                  style={{ position: "absolute", bottom: 0, left: 0 }}
                />
              </Box>
              <Typography
                variant="body1"
                textAlign={"center"}
                fontSize={"1rem"}
                color={"white"}
                alignContent={"center"}
                marginLeft={"10px"}
              >
                BACK
              </Typography>
              <Checkbox
                name="back"
                checked={snap.backLogoDisplay}
                onChange={handle.changeBackLogo}
              />
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "10px"
            }}
          >
            <FilePicker file={file} setFile={setFile} readFile={readFile} />
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Grid container spacing={2} rowSpacing={2}>
            {apparelSize.map((size) => (
              <Grid
                key={size}
                item
                xs={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <div
                  className={`size_circle`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#FFFFFF",
                    justifyContent: "center"
                  }}
                >
                  <Typography variant="body1" color="#000000" fontSize="16px" fontWeight="bold">
                    {size}
                  </Typography>
                </div>
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "space-around", marginTop: "30px" }}>
            <Box>
              <Typography variant="body3" color="#FFFFFF" fontSize="18px" fontWeight="bold">
                Quantity
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "40px"
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    minWidth: "20px",
                    fontWeight: 600,
                    backgroundColor: "white",
                    ":hover": {
                      backgroundColor: "gray"
                    }
                  }}
                  onClick={handle.minusQuantity}
                >
                  -
                </Button>
                <Typography
                  variant="body3"
                  color="#FFFFFF"
                  fontSize="18px"
                  fontWeight="bold"
                  sx={{ width: "45px", textAlign: "center" }}
                >
                  {quantity}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    minWidth: "20px",
                    fontWeight: 600,
                    backgroundColor: "white",
                    ":hover": {
                      backgroundColor: "gray"
                    }
                  }}
                  onClick={handle.plusQuantity}
                >
                  +
                </Button>
              </Box>
            </Box>
            <Box>
              <Typography
                variant="body4"
                color="#FFFFFF"
                fontSize="18px"
                fontWeight="bold"
                sx={{ width: "30px" }}
              >
                Total
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", height: "40px" }}>
                <Typography variant="body3" color="#FFFFFF" fontSize="18px" fontWeight="bold">
                  {50 * quantity}$
                </Typography>
              </Box>
            </Box>
          </Box>
        </TabPanel>
      </TabContext>
      <div className="customizer">
        <Button
          variant="contained"
          sx={{ width: "160px", fontWeight: 600 }}
          endIcon={<AiFillCamera size="1.3em" />}
          onClick={() => {
            const link = document.createElement("a");
            link.setAttribute("download", "canvas.png");
            link.setAttribute(
              "href",
              document
                .querySelector("canvas")
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream")
            );
            link.click();
          }}
        >
          DOWNLOAD
        </Button>
      </div>
    </Box>
  );
}
