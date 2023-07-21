import { Box, Typography } from "@mui/material";

import Avatar from "@/src/components/Avatar";
import { GAMES } from "@/src/config/global";
import { useTournamentContext } from "@/src/context/TournamentContext";

export default function LiveChannelCard({ item }) {
  const { player } = useTournamentContext();
  return (
    <Box sx={{ p: 1, ":hover": { backgroundColor: "rgba(255,255,255,.2)" }, borderRadius: 2 }}>
      <Box
        sx={{
          background: `url("${item?.image}")`,
          height: 200,
          width: "100%",
          minWidth: 240,
          backgroundPosition: "center",
          backgroundSize: "cover",
          borderRadius: 1
        }}
      ></Box>
      <Box sx={{ display: "flex", alignItems: "center", py: 2, gap: 1 }}>
        <Avatar sx={{ width: 35, height: 35 }} user={player.players[item?.uid]} hideStatus={true} />
        <Typography variant="body1">{player.players[item?.uid]?.userName}</Typography>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Typography
          variant="h6"
          fontSize={18}
          fontWeight="bold"
          sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}
        >
          {item?.title}
        </Typography>
        <Typography variant="subtitle1" color="gray">
          {GAMES[item?.category].name}
        </Typography>
      </Box>
    </Box>
  );
}
