import { Box, Typography } from "@mui/material";

import { getTeamPosition } from "@/src/utils/utils";
import { useStyleContext } from "@/src/context/StyleContext";

const PlayerPortrait = ({ item, sx }) => {
  const { primaryBackgroundColor } = useStyleContext();

  return (
    <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", textAlign: "center", ...sx }}>
      <img src={item?.profilePic} style={{ height: 150, objectFit: "cover" }} />
      <Box
        sx={{
          height: 50,
          backgroundColor: primaryBackgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography variant="h6" color="white">
          {getTeamPosition(1)}
        </Typography>
      </Box>
    </Box>
  );
};

export default PlayerPortrait;
