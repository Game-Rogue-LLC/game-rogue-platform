import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  event,
  Menu,
  MenuItem,
  MenuList,
  Typography,
  useTheme,
  DialogActions
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import MatchTable from "@/src/components/table/MatchTable";
import TeamItem from "@/src/components/item/TeamItem";
import TeamList from "@/src/components/list/TeamList";

const DoubleEliminationTableView = ({ myTeam, eid, matches }) => {
  const router = useRouter();
  const theme = useTheme();
  const { organization, event, team, match } = useTournamentContext();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    if (event?.events[eid]) {
      let temp = [];
      event.events[eid].participants.forEach((item) => {
        temp.push({
          ...team.teams[item.id]
        });
      });
      setTeams(temp);
    }
  }, [eid, event?.events, team.teams]);

  return (
    <Box
      sx={{
        display: "flex",
        gap: 2
      }}
    >
      <Box sx={{ width: "300px" }}>
        <TeamList teams={teams} myTeam={myTeam} />
      </Box>
      <Box sx={{ flex: 1, zIndex: 100 }}>
        <MatchTable matches={matches} eid={eid} myTeam={myTeam} />
      </Box>
    </Box>
  );
};

export default DoubleEliminationTableView;
