import { Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useMemo } from "react";

import CustomButton from "@/src/components/button/CustomButton";
import MatchItem from "@/src/components/widgets/rogue-social/MatchItem";
import dayjs from "dayjs";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const RightSidebar = ({ sx }) => {
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
        (item) => dayjs(item.start).isAfter(currentTime) && item.participants?.length === 2
        // isMyMatch(item, team.teams, user.id)
      );
      return res;
    }
    return [];
  }, [match?.matches, currentTime, team?.teams]);

  return (
    <Box
      sx={{
        width: "400px",
        display: "flex",
        alignItems: "left",
        gap: 1,
        flexDirection: "column",
        ...sx
      }}
    >
      <Typography variant="h4" fontSize={30} color="white">
        Messages
      </Typography>
      <Box>
        <OutlinedInput placeholder="Search here..." fullWidth />
      </Box>
      <Box>
        {upcomingMatches.length < 4
          ? upcomingMatches.map((item) => <MatchItem key={"match_" + item.id} item={item} />)
          : upcomingMatches
              .slice(0, 4)
              .map((item) => <MatchItem key={"match_" + item.id} item={item} />)}
        {upcomingMatches.length >= 4 && (
          <CustomButton onClick={onViewAllClick}>VIEW ALL</CustomButton>
        )}
        {upcomingMatches.length === 0 && (
          <>
            <Typography variant="body1" color="white" align="center" fontSize={20} marginTop={2}>
              There are no current match-chats available for you.
            </Typography>
            <Button variant="contained" fullWidth sx={{ mt: 2 }}>
              Join an event
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default RightSidebar;
