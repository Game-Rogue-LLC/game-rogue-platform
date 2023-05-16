import { Chip } from "@mui/material";
import * as config from "@/src/config/global";

const RegionChip = ({ type, sx }) => {
  return (
    <Chip
      label={config.EVENT_REGIONS[type].name}
      sx={{
        backgroundColor: "#393D40",
        color: "white",
        fontSize: "14px",
        backdropFilter: "blur(2px)",
        ...sx,
      }}
    />
  );
};

export default RegionChip;
