import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

import { GAMES } from "@/src/config/global";
import TeamItem from "@/src/components/item/TeamItem";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";
import { withOpacity } from "@/src/utils/utils";

const TeamTable = ({ teams, uid, handleClick, showCreate, showMine }) => {
  const router = useRouter();
  const { colors } = useStyleContext();

  const myTeams = useMemo(() => {
    if (showMine === false) return Object.keys(teams);
    return Object.keys(teams).filter(
      (key, i) => teams[key].players.findIndex((val) => val.id == uid) >= 0
    );
  });

  const handleCreate = (e) => {
    router.push("/team/create");
  };
  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: withOpacity(colors.primary, 0.1) }}
      variant="elevation"
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">TEAM NAME</TableCell>
            <TableCell align="center">GAME</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {myTeams && myTeams.length > 0 ? (
            myTeams.map(
              (id, i) =>
                teams[id] && (
                  <TableRow
                    hover
                    key={id}
                    onClick={() => {
                      if (handleClick) handleClick(id);
                    }}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="center">
                      <TeamItem team={teams[id]} />
                    </TableCell>
                    <TableCell align="center">
                      {teams[id]?.game || GAMES[teams[id]?.game].name}
                    </TableCell>
                  </TableRow>
                )
            )
          ) : (
            <TableRow>
              <TableCell align="center" colSpan={2}>
                No Teams
              </TableCell>
            </TableRow>
          )}
          {showCreate && (
            <TableRow>
              <TableCell colSpan={2}>
                <Button variant="contained" onClick={handleCreate}>
                  Create
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TeamTable;
