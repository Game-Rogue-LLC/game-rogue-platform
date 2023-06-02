import { DEFAULT_LOGO } from "@/src/config/global";
import Image from "next/image";
import { Box, Skeleton } from "@mui/material";
import Link from "next/link";

export default function ({ team, win, sx, disableLink }) {
  if (!sx) sx = {};
  let color = "white";
  if (win == 2) color = "#00c106";
  else if (win == 1) color = "#c15900";
  else if (win == 0) color = "gray";
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        color,
        gap: "5px",
        justifyContent: "center",
        ...sx
      }}
    >
      {/* <img src={team?.darkLogo ?? DEFAULT_LOGO} style={{ height: '30px' }} />&nbsp; */}
      <Image
        loading="lazy"
        src={team?.darkLogo ?? DEFAULT_LOGO}
        alt={team?.darkLogo}
        width={30}
        height={30}
      />
      &nbsp;
      {disableLink === true ? (
        team?.name
      ) : (
        <Link href={"/team/" + team?.id} className="team-link">
          {team?.name}
        </Link>
      )}
    </Box>
  );
}
