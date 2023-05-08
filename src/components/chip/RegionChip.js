import {
  Chip
} from "@mui/material"
import * as config from "@/src/config/global";

const RegionChip = ({ type, sx }) => {
  return (
    <Chip label={config.EVENT_REGIONS[type].name} sx={{ backgroundColor: "#404040", color: "white", fontSize: "1rem", ...sx }} />
  )
}

export default RegionChip;