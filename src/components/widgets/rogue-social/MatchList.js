import { useEffect, useMemo } from "react";

import { Box } from "@mui/material";
import MatchItem from "@/src/components/widgets/rogue-social/MatchItem";
import dayjs from "dayjs";
import { isMyMatch } from "@/src/utils/utils";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

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
