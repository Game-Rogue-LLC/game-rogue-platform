import { Chip } from "@mui/material";

const GameChip = ({ type, sx }) => {
  return (
    <Chip
      icon={
        <img src="/static/images/games/r6s.webp" width="30px" height="30px" />
      }
      label="R6"
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

export default GameChip;
