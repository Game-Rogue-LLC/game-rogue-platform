import {
  Chip
} from "@mui/material"

const GameChip = ({ type, sx }) => {
  return (
    <Chip icon={<img src="/static/images/games/r6s.webp" width="30px" height="30px" />} label="R6" sx={{ backgroundColor: "#404040", color: "white", fontSize: "1rem", ...sx }} />
  )
}

export default GameChip;