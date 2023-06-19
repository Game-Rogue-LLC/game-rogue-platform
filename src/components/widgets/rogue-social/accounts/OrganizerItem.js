import { Box, Skeleton, Typography } from "@mui/material";

import Avatar from "@/src/components/Avatar";
import Link from "next/link";

export default function ({ organizer, sx, width, height, fontSize }) {
  if (!sx) sx = {};
  return (
    <Link href={"/rogue-social/profile/" + organizer?.id}>
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
        {organizer?.profilePic ? (
          <Avatar
            src={organizer.profilePic}
            width={width ? width : 30}
            height={height ? height : 30}
            alt={organizer.profilePic}
            hideStatus={true}
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
          {organizer?.name}
        </Typography>
      </Box>
    </Link>
  );
}
