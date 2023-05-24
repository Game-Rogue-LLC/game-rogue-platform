import { useState, useEffect } from "react";
import { useStyleContext } from "@/src/context/StyleContext";
import { hoverColor } from "@/src/utils/utils";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useTournamentContext } from "@/src/context/TournamentContext";
import TeamScoreBoard from "./TeamScoreBoard";
import MatchChat from "./MatchChat";
import { useAuthContext } from "@/src/context/AuthContext";

const MatchScoreBoard = ({ item }) => {
  const theme = useTheme();
  const { buttonStyle } = useStyleContext();
  const { team } = useTournamentContext();
  const { user } = useAuthContext();
  const [myTeam, setMyTeam] = useState(null);
  const [opTeam, setOpTeam] = useState(null);

  const isMyTeam = (team) => {
    return team.uid === user.id;
  };

  useEffect(() => {
    if (isMyTeam(team?.teams[item?.participants[0]?.id])) {
      setMyTeam(team.teams[item.participants[0].id]);
      setOpTeam(team.teams[item.participants[1].id]);
    } else if (isMyTeam(team?.teams[item?.participants[1]?.id])) {
      setMyTeam(team.teams[item.participants[1].id]);
      setOpTeam(team.teams[item.participants[0].id]);
    }
  }, [team?.teams, item]);

  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Button sx={{ ...buttonStyle }}>BANS</Button>
        <Button sx={{ ...buttonStyle }}>RULEBOOK</Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            gap: 2,
          }}
        >
          <TeamScoreBoard item={opTeam} sx={{ flexGrow: 1 }} />
          <Button variant="contained" sx={{ width: "250px" }}>
            Full Analysis
          </Button>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            p: 2,
            pl: "200px",
            pr: "270px",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4" color="white">
              Map
            </Typography>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              textAlign: "center",
            }}
          >
            <Typography variant="h4" color="white">
              0 - 0
            </Typography>
          </Box>
          <Box>
            <Typography variant="h4" color="white">
              Banned Operators
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
            gap: 2,
          }}
        >
          <TeamScoreBoard item={myTeam} sx={{ flexGrow: 1 }} />
          <MatchChat item={item} />
        </Box>
      </Box>
    </Box>
  );
};

export default MatchScoreBoard;
