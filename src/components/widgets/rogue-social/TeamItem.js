import { Box, Skeleton, Typography } from "@mui/material";

import { DEFAULT_LOGO } from "@/src/config/global";
import Image from "next/image";
import Link from "next/link";

export default function ({ team, win, sx, width, height, fontSize, disableLink }) {
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
          <Image
            src={team.darkLogo}
            width={width ? width : 30}
            height={height ? height : 30}
            alt={team.darkLogo}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={width ? width : 30}
            height={height ? height : 30}
          />
        )}
        &nbsp;
        <Typography sx={{ color: "white", fontSize: fontSize ? fontSize : "16px" }}>
          {team?.name}
        </Typography>
      </Box>
    </Link>
  );
}
