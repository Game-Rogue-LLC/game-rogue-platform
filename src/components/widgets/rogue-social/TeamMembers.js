import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { formatDate } from "@/src/utils/utils";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { TEAM_POSITIONS } from "@/src/config/global";

const TeamMembers = ({ team }) => {
  const { player } = useTournamentContext();
  return (
    <Box sx={{ border: "solid 1px rgba(255,255,255,.2)" }}>
      <Box sx={{ borderBottom: "solid 1px rgba(255,255,255,.2)", p: 1 }}>
        <Typography variant="h4" color="white">
          TEAM MEMBERS
        </Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Account ID</TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>GR Rating</TableCell>
            <TableCell>Joined On</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {team?.players?.map((val) => (
            <TableRow>
              <TableCell>{player.players[val.id]._id}</TableCell>
              <TableCell>{player.players[val.id].userName}</TableCell>
              <TableCell>{TEAM_POSITIONS[val.position].name}</TableCell>
              <TableCell>{val.rating || "0.0"}</TableCell>
              <TableCell>{formatDate(val.joinedOn.toDate(), "MMM, DD")}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default TeamMembers;
