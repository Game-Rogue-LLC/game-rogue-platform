import { useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "@/src/context/app";
import { useTournamentContext } from "@/src/context/TournamentContext";
import dayjs from "dayjs";
import MatchItem from "@/src/components/widgets/rogue-social/MatchItem";
import { useAuthContext } from "@/src/context/AuthContext";
import { isMyMatch } from "@/src/utils/utils";

const MatchList = () => {
  const { setTitle } = useAppContext();
  const { user } = useAuthContext();
  const { team, match, currentTime, setCurrentTime } = useTournamentContext();

  const upcomingMatches = useMemo(() => {
    if (match?.matches) {
      const res = match.matches.filter(
        (item) => dayjs(item.start).isAfter(currentTime) && item.participants?.length === 2
        // isMyMatch(item, team.teams, user.id)
      );
      return res;
    }
    return [];
  }, [match?.matches, currentTime, team?.teams]);

  useEffect(() => {
    setTitle("Upcoming Matches");
    setCurrentTime(new Date());
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "left",
        gap: 1,
        flexDirection: "column"
      }}
    >
      {upcomingMatches.map((item) => (
        <MatchItem key={"match_" + item.id} item={item} />
      ))}
    </Box>
  );
};

export default MatchList;
