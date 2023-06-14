import { DEFAULT_LOGO } from "@/src/config/global";
import { Box, Typography, Skeleton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import { useTournamentContext } from "@/src/context/TournamentContext";

export default function ({ organization, win, sx, disableLink }) {
  const { player } = useTournamentContext();
  if (!sx) sx = {};
  return (
    <Link href={"/rogue-social/my-organizer/" + organization?.id} className="organizer-link">
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
          src={organization?.darkLogo || player.players[organization.uid]?.profilePic}
          width={50}
          height={50}
          alt={organization?.darkLogo || player.players[organization.uid]?.name}
        />
        {/* <Skeleton variant="rectangular" width={30} height={30} /> */}
        <Box>
          <Typography>{organization?.name}</Typography>
          <Typography variant="subtitle2">{organization?.tagline}</Typography>
        </Box>
      </Box>
    </Link>
  );
}
