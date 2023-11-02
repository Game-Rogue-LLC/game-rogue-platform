import { Box, Button, Grid, SvgIcon, Typography } from "@mui/material";
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_DARK_LOGO } from "@/src/config/global";
import { formatDate, formatNumber } from "@/src/utils/utils";
import { useEffect, useMemo } from "react";

import GameChip from "@/src/components/chip/GameChip";
import Link from "next/link";
import PlatformChip from "@/src/components/chip/PlatformChip";
import RegionChip from "@/src/components/chip/RegionChip";
import dayjs from "dayjs";
import { useTournamentContext } from "@/src/context/TournamentContext";

const ProductCard = ({ item }) => {
  return (
    <Link href={`/product/${item?.id}/info`}>
      <Box
        sx={{
          border: "solid 1px rgba(255, 255, 255, 0.2)",
          // minHeight: "280px",
          background: "black",
          ":hover": {
            cursor: "pointer",
            background: "rgba(245, 131, 31, 0.1)"
          }
        }}
      >
        <Box
          sx={{
            height: "150px",
            background: "url(" + (item?.banner || DEFAULT_CONTENTBLOCK_IMAGE) + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderBottom: "solid 1px gray",
            p: 1,
            alignItems: "center",
            display: "flex",
            gap: 1
          }}
        ></Box>
        <Box sx={{ px: 2, py: 1, minHeight: 50 }}>
          <Typography variant="h5" color="white">
            {item?.name}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default ProductCard;
