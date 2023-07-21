import { Box, Typography, useTheme } from "@mui/material";

import PlatformChip from "../../chip/PlatformChip";
import RegionChip from "../../chip/RegionChip";

export default function GameCategoryCard({ item }) {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: 150 }}>
        <Box
          sx={{
            backgroundImage: `url(${item?.image})`,
            width: "100%",
            height: 196,
            backgroundPosition: "center",
            backgroundSize: "cover",
            borderRadius: 2,
            cursor: "pointer",
            ":hover": {
              filter: "sepia(1) hue-rotate(340deg) contrast(1.4) brightness(1) saturate(3)"
              // border: "solid 2px rgb(245,131,31)"
            }
          }}
        ></Box>
        <Box sx={{ py: 1 }}>
          <Typography variant="h6" fontSize={16} fontWeight="bold" color="white">
            {item?.name}
          </Typography>
          <Typography variant="subtitle1" color="gray">
            {item?.view} viewers
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <PlatformChip type={1} />
            <RegionChip type={0} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
