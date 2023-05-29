import { DEFAULT_LOGO } from "@/src/config/global";
import { Box, Skeleton } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function ({ team, win, sx, disableLink }) {
  if (!sx) sx = {};
  return (
    <Link href={"/rogue-social/my-team/" + team?.id} className="team-link">
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: 2,
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
        {team?.darkLogo ? (
          <Image src={team.darkLogo} width={30} height={30} alt={team.darkLogo} />
        ) : (
          <Skeleton variant="rectangular" width={30} height={30} />
        )}
        &nbsp;
        {team?.name}
      </Box>
    </Link>
  );
}
