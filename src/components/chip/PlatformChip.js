import * as config from "@/src/config/global";

import { Chip, styled } from "@mui/material";

const StyledChip = styled(Chip)((theme) => ({
  height: 24,
  borderRadius: 12,
  ".MuiChip-label": {
    paddingInline: 8
  }
}));

const PlatformChip = ({ type, sx }) => {
  return (
    <StyledChip
      label={config.PLATFORMS[type].name}
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

export default PlatformChip;
