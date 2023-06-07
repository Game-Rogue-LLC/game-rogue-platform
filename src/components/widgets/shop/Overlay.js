import { Logo } from "@pmndrs/branding";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box, Button } from "@mui/material";
import {
  AiFillCamera,
  AiOutlineArrowLeft,
  AiOutlineHighlight,
  AiOutlineShopping
} from "react-icons/ai";
import { useSnapshot } from "valtio";
import { state } from "@/src/store";
import FilePicker from "@/src/components/widgets/shop/FilePicker";

export function Overlay({ sx }) {
  const snap = useSnapshot(state);
  const transition = { type: "spring", duration: 0.8 };
  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  };
  return (
    <Box
      sx={{
        position: "relative",
        // height: "100%",
        borderLeft: "solid 3px rgb(245,131,31)",
        paddingBlock: 5,
        ...sx
      }}
    >
      <AnimatePresence>
        <motion.section key="custom" {...config}>
          <Customizer />
        </motion.section>
      </AnimatePresence>
    </Box>
  );
}

function Customizer() {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");

  const readFile = (type) => {
    state.texture = file;
  };

  return (
    <div className="customizer">
      <Box className="color-options">
        <div className="color-options-child">
          {snap.colors.map((color) => (
            <div
              key={color}
              className={`circle`}
              style={{ background: color }}
              onClick={() => (state.color = color)}
            ></div>
          ))}
        </div>
        <div className="color-options-child">
          {snap.colors.map((color) => (
            <div
              key={color}
              className={`circle`}
              style={{ background: color }}
              onClick={() => (state.color = color)}
            ></div>
          ))}
        </div>
        <div className="color-options-child">
          {snap.colors.map((color) => (
            <div
              key={color}
              className={`circle`}
              style={{ background: color }}
              onClick={() => (state.color = color)}
            ></div>
          ))}
        </div>
      </Box>
      {/* <Button
        variant="contained"
        onClick={() => rotate()}
        sx={{ width: "160px", fontSize: "1rem" }}
      >
        Rotate
      </Button> */}
      <div>
        <FilePicker file={file} setFile={setFile} readFile={readFile} />
      </div>
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
      {/* <button className="exit" style={{ background: snap.color }} onClick={() => (state.intro = true)}>
        GO BACK
        <AiOutlineArrowLeft size="1.3em" />
      </button> */}
    </div>
  );
}
