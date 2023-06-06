import { Box, Button, InputAdornment, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import CustomButton from "@/src/components/button/CustomButton";
import MatchItem from "@/src/components/widgets/rogue-social/MatchItem";
import { Search } from "@mui/icons-material";
import SearchInput from "@/src/components/input/SearchInput";
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
  const [search, setSearch] = useState("");

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

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

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
      <Box className="search-box">
        <SearchInput
          id="search"
          name="search"
          placeholder="Search for Rogue ID..."
          value={search}
          onChange={onSearchChange}
          sx={{
            height: "40px",
            width: "100%"
          }}
          startAdornment={
            <InputAdornment position="start">
              <Search fontSize="large" />
            </InputAdornment>
          }
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "left",
          gap: 1,
          flexDirection: "column"
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            gap: 0,
            flexDirection: "column",
            border: "solid 1px rgba(245,131,31,.6)",
            borderRadius: "5px"
          }}
        >
          {upcomingMatches.length < 4
            ? upcomingMatches.map((item) => (
                <MatchItem
                  key={"match_" + item.id}
                  item={item}
                  sx={{ border: "none", borderRadius: "none" }}
                />
              ))
            : upcomingMatches
                .slice(0, 4)
                .map((item) => (
                  <MatchItem
                    key={"match_" + item.id}
                    item={item}
                    sx={{ border: "none", borderRadius: "none" }}
                  />
                ))}
        </Box>
        {upcomingMatches.length >= 4 && (
          <Box textAlign="right">
            <CustomButton onClick={onViewAllClick}>VIEW ALL</CustomButton>
          </Box>
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
