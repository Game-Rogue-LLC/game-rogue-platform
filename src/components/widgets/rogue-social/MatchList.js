import { useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "@/src/context/app";
import { useTournamentContext } from "@/src/context/TournamentContext";
import dayjs from "dayjs";
import MatchItem from "@/src/components/widgets/rogue-social/MatchItem";

const MatchList = () => {
  const { setTitle } = useAppContext();
  const { event, match, currentTime, setCurrentTime } = useTournamentContext();

  const upcomingMatches = useMemo(() => {
    if (match?.matches) {
      return match.matches.filter(
        (item) =>
          dayjs(item.start).isAfter(currentTime) &&
          item.participants?.length === 2
      );
    }
    return [];
  }, [match?.matches, currentTime]);

  useEffect(() => {
    console.log(upcomingMatches);
  }, [upcomingMatches]);

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
        flexDirection: "column",
      }}
    >
      {upcomingMatches.map((item) => (
        <MatchItem key={"match_" + item.id} item={item} />
      ))}
    </Box>
  );
};

export default MatchList;
