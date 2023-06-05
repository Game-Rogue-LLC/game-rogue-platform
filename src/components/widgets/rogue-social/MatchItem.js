import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import Link from "next/link";
import { formatDate } from "@/src/utils/utils";
import { useTheme } from "@mui/material";
import { useTournamentContext } from "@/src/context/TournamentContext";

const MatchItem = ({ item, sx }) => {
  const theme = useTheme();
  const { team } = useTournamentContext();
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  useEffect(() => {
    if (
      team?.teams &&
      team.teams[item.participants[0]?.id] &&
      team.teams[item.participants[1]?.id]
    ) {
      setTeam1(team.teams[item.participants[0].id]);
      setTeam2(team.teams[item.participants[1].id]);
    }
  }, [team?.teams, item]);

  return (
    <Link href={"/match/" + item?.id + "/chat"}>
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
          ...sx
        }}
      >
        <Box>
          <Typography variant="h4" fontSize={20} textAlign="left" color="white">
            {team1?.name}
            <span style={{ color: theme.palette.primary.main }}>{" VS "}</span>
            {team2?.name}
          </Typography>
          <Typography variant="body1" textAlign="left" color="white">
            {formatDate(item?.start, "YYYY.MM.DD") + " - " + formatDate(item?.end, "YYYY.MM.DD")}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
};

export default MatchItem;
