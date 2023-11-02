import { Chip, styled } from "@mui/material";

const StyledChip = styled(Chip)((theme) => ({
  height: 24,
  borderRadius: 12,
  ".MuiChip-label": {
    paddingInline: 8
  }
}));

const GameChip = ({ type, sx }) => {
  return (
    <StyledChip
      icon={<img src="/static/images/games/r6s.webp" width="30px" height="30px" />}
      label="R6"
      sx={{
        backgroundColor: "#393D40",
        color: "white",
        fontSize: "14px",
        backdropFilter: "blur(2px)",
        ...sx
      }}
    />
  );
};

export default GameChip;
