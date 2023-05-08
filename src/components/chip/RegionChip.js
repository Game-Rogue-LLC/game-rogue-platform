import {
  Chip
} from "@mui/material"
import * as config from "@/src/config/global";

const RegionChip = ({ type, sx }) => {
  return (
    <Chip
      label={config.EVENT_REGIONS[type].name}
      sx={{ backgroundColor: "#00000096", color: "white", fontSize: "1rem", backdropFilter: "blur(2px)", ...sx }}
    />
  )
}

export default RegionChip;