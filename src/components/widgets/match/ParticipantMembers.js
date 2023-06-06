import { Avatar, Box, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

import CustomButton from "@/src/components/button/CustomButton";
import Link from "next/link";
import { TEAM_POSITIONS } from "@/src/config/global";
import { useTournamentContext } from "@/src/context/TournamentContext";

const ParticipantMembers = ({ item }) => {
  const { player } = useTournamentContext();

  const getTeamPlayers = (team) => {
    if (!team) return [];
    return team.players.map((val) => ({
      ...val,
      ...player.players[val.id]
    }));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">USER NAME</TableCell>
            <TableCell align="center">POSITION</TableCell>
            <TableCell align="center">RESIDENCY</TableCell>
            <TableCell align="center">VIEW PROFILE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {getTeamPlayers(item).map((val, i) => (
            <TableRow hover key={"user_" + val.id}>
              <TableCell align="center">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "center"
                  }}
                >
                  <Avatar
                    variant="circular"
                    src={val.profilePic} //player.players[val.id].profilePic}
                  />
                  <Link href={"/user/" + val.id}>
                    {/* {player.players[val.id].name} */}
                    {val.name}
                  </Link>
                </Box>
              </TableCell>
              <TableCell align="center">{TEAM_POSITIONS[val.position]?.name}</TableCell>
              <TableCell align="center">{val.residency?.label}</TableCell>
              <TableCell align="center">
                <CustomButton
                  variant="contained"
                  onClick={() => {
                    // TODO: Redirect to Rogue Social Profile
                    router.push("/user/" + val.id);
                  }}
                >
                  VIEW PROFILE
                </CustomButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ParticipantMembers;
