import { Chip } from "@mui/material";
import * as config from "@/src/config/global";

const PlatformChip = ({ type, sx }) => {
  return (
    <Chip
      label={config.PLATFORMS[type].name}
      sx={{
        backgroundColor: "#393D40",
        color: "white",
        fontSize: "1rem",
        backdropFilter: "blur(2px)",
        ...sx,
      }}
    />
  );
};

export default PlatformChip;
