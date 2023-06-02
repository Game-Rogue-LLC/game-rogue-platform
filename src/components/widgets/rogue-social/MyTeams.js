import { useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "@/src/context/app";
import { useTournamentContext } from "@/src/context/TournamentContext";
import dayjs from "dayjs";
import { useAuthContext } from "@/src/context/AuthContext";
import { isMyTeam } from "@/src/utils/utils";
import TeamItem from "@/src/components/widgets/rogue-social/TeamItem";

const MyTeams = () => {
  const { setTitle } = useAppContext();
  const { user } = useAuthContext();
  const { team } = useTournamentContext();

  const myTeams = useMemo(() => {
    if (team?.teams) {
      const res = Object.keys(team.teams)
        .filter((key) => isMyTeam(team.teams[key], user.id))
        .map((key) => team.teams[key]);
      return res;
    }
    return [];
  }, [team?.teams]);

  useEffect(() => {
    setTitle("MY TEAMS");
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        gap: 1,
        flexDirection: "column"
      }}>
      {myTeams.map((item) => (
        <TeamItem key={"team_" + item.id} team={item} disableLink={true} />
      ))}
    </Box>
  );
};

export default MyTeams;
