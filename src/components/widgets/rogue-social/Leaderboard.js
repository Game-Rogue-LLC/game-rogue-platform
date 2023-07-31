import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { EVENT_REGIONS, GAMES, PLATFORMS, TEAM_POSITIONS } from "@/src/config/global";

import DropdownMenu from "@/src/components/DropdownMenu";
import { useState } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Leaderboard = ({}) => {
  const [game, setGame] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [region, setRegion] = useState(null);
  const { team, player } = useTournamentContext();

  const onGameChange = (newValue) => {
    setGame(newValue);
  };
  const onPlatformChange = (newValue) => {
    setPlatform(newValue);
  };
  const onRegionChange = (newValue) => {
    setRegion(newValue);
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h5" textTransform="uppercase">
          Rolling Leaderboard
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <DropdownMenu
            name="game"
            title={game ? game.name : "Game"}
            items={GAMES}
            onChange={onGameChange}
          />
          <DropdownMenu
            name="platform"
            title={platform ? platform.name : "Platform"}
            items={PLATFORMS}
            onChange={onPlatformChange}
          />
          <DropdownMenu
            name="region"
            title={region ? region.name : "Region"}
            items={EVENT_REGIONS}
            onChange={onRegionChange}
          />
        </Box>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ textAlign: "center", textTransform: "uppercase" }}>Rank</TableCell>
              <TableCell sx={{ textTransform: "uppercase" }}>Team Name</TableCell>
              <TableCell sx={{ textAlign: "center", textTransform: "uppercase" }}>Change</TableCell>
              <TableCell sx={{ textAlign: "center", textTransform: "uppercase" }}>
                Overall
              </TableCell>
              <TableCell sx={{ textTransform: "uppercase" }}>Organization</TableCell>
              <TableCell sx={{ textTransform: "uppercase" }}>Manager</TableCell>
              <TableCell sx={{ textAlign: "center", textTransform: "uppercase" }}>
                GR Rating
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {team &&
              team.teams &&
              _.sortBy(team.teams, ["score"]).map((val, i) => (
                <TableRow key={`team-${i}`} hover>
                  <TableCell sx={{ textAlign: "center" }}>{i + 1}</TableCell>
                  <TableCell>{val.name}</TableCell>
                  <TableCell sx={{ textAlign: "center", color: "green" }}>{"+1"}</TableCell>
                  <TableCell
                    sx={{ textAlign: "center" }}
                  >{`${val.wins}-${val.draws}-${val.loses}`}</TableCell>
                  <TableCell></TableCell>
                  <TableCell>
                    {
                      player?.players[
                        _.find(val.players, (plyr) => plyr.position === TEAM_POSITIONS[0].val)?.id
                      ]?.name
                    }
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{"0.0"}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
};

export default Leaderboard;
