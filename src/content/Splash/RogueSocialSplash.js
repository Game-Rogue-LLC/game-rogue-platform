import { useDispatch, useSelector } from "react-redux";

import { Box } from "@mui/material";
import { setRogueSocialSplash } from "@/src/redux/features/splashSlice";
import { useEffect } from "react";

const RogueSocialSplash = ({}) => {
  const splash = useSelector((state) => state.splash);
  const dispatch = useDispatch();

  useEffect(() => {
    if (splash.rogueSocial === true) {
      setTimeout(() => {
        dispatch(setRogueSocialSplash(false));
      }, 10000);
    }
  }, []);

  if (splash && splash.rogueSocial === true) {
    return (
      <Box
        sx={{
          backgroundColor: "black",
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          zIndex: 9999,
          backgroundImage: "url(/static/images/rogue_social.gif)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          cursor: "pointer"
        }}
        className="rogue-social-splash"
        onClick={(e) => {
          e.currentTarget.classList.add("splash-hidden");
        }}
      ></Box>
    );
  }

  return <></>;
};

export default RogueSocialSplash;
