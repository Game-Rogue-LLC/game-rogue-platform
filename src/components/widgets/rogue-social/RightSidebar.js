import { useMemo, useEffect } from "react";
import { Box } from "@mui/material";
import { useAppContext } from "@/src/context/app";
import { useTournamentContext } from "@/src/context/TournamentContext";
import dayjs from "dayjs";
import MatchItem from "@/src/components/widgets/rogue-social/MatchItem";
import { useAuthContext } from "@/src/context/AuthContext";
import CustomButton from "@/src/components/button/CustomButton";
import { useRouter } from "next/router";

const RightSidebar = () => {
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { user } = useAuthContext();
  const { team, match, currentTime, setCurrentTime } = useTournamentContext();

  const onViewAllClick = (e) => {
    router.push("/rogue-social/matches");
  };

  const upcomingMatches = useMemo(() => {
    if (match?.matches) {
      const res = match.matches.filter(
        (item) =>
          dayjs(item.start).isAfter(currentTime) &&
          item.participants?.length === 2 &&
          (team.teams[item.participants[0].id].players.findIndex((val) => val.id === user.id) >=
            0 ||
            team.teams[item.participants[1].id].players.findIndex((val) => val.id === user.id) >= 0)
      );
      return res;
    }
    return [];
  }, [match?.matches, currentTime, team?.teams]);

  useEffect(() => {
    console.log(upcomingMatches);
  }, [upcomingMatches]);

  return (
    <Box
      sx={{
        width: "400px",
        display: "flex",
        alignItems: "left",
        gap: 1,
        flexDirection: "column"
      }}>
      {upcomingMatches.length < 4
        ? upcomingMatches.map((item) => <MatchItem key={"match_" + item.id} item={item} />)
        : upcomingMatches
            .slice(0, 4)
            .map((item) => <MatchItem key={"match_" + item.id} item={item} />)}
      {upcomingMatches.length >= 4 && (
        <CustomButton onClick={onViewAllClick}>VIEW ALL</CustomButton>
      )}
    </Box>
  );
};

export default RightSidebar;
