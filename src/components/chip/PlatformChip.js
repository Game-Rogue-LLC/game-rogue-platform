import {
  Chip
} from "@mui/material"
import * as config from "@/src/config/global";

const PlatformChip = ({ type, sx }) => {
  return (
    <Chip label={config.PLATFORMS[type].name} sx={{ backgroundColor: "#404040", color: "white", fontSize: "1rem", ...sx }} />
  )
}

export default PlatformChip;