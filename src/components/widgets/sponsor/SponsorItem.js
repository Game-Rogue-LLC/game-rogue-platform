import { Box, Typography } from "@mui/material";

import Link from "next/link";
import { useTournamentContext } from "@/src/context/TournamentContext";

export default function ({ item, sx = {} }) {
  const { organization } = useTournamentContext();

  return (
    <Link href={"/sponsor/" + item?.id}>
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
        <Box>
          <Typography>{organization.organizations[item?.organizationId]?.name}</Typography>
        </Box>
      </Box>
    </Link>
  );
}
