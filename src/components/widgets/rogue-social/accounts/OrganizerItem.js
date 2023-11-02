import { Box, Skeleton, Typography } from "@mui/material";

import Image from "next/image";
import Link from "next/link";
import { useTournamentContext } from "@/src/context/TournamentContext";

export default function ({ organizer, win, sx, disableLink }) {
  const { player } = useTournamentContext();
  if (!sx) sx = {};
  return (
    <Link href={"/rogue-social/organizer/" + organizer?.id}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 1,
          border: "solid 1px rgba(255, 255, 255, .5)",
          borderRadius: "5px",
          textAlign: "left",
          ":hover": {
            backgroundColor: "rgba(245, 131, 31, .2)"
          },
          color: "white",
          ...sx
        }}
      >
        <img
          src={organizer?.darkLogo || player.players[organizer.uid]?.profilePic}
          width={50}
          height={50}
          alt={organizer?.darkLogo || player.players[organizer.uid]?.name}
        />
        {/* <Skeleton variant="rectangular" width={30} height={30} /> */}
        <Box>
          <Typography>{organizer?.name}</Typography>
          <Typography variant="subtitle2">{organizer?.tagline}</Typography>
        </Box>
      </Box>
    </Link>
  );
}
