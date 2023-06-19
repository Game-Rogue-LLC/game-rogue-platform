import { Box, Typography } from "@mui/material";

import Link from "next/link";
import { useTournamentContext } from "@/src/context/TournamentContext";

const ShopCard = ({ item }) => {
  const { player } = useTournamentContext();
  return (
    <Link href={`/shop/${item?.id}`}>
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

        <Box sx={{ p: 2 }}>
          <Typography variant="h5">{item?.name}</Typography>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body1" color="white">
              {item?.description}
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle2" color="gray">
              {"Opened by " + player.players[item?.uid].name}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default ShopCard;
