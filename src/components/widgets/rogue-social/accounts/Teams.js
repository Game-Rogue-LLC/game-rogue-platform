import { Box, Button } from "@mui/material";
import { useEffect, useMemo } from "react";

import { TEAM_PROFILE_LIMIT } from "@/src/config/global";
import TeamItem from "@/src/components/widgets/rogue-social/accounts/TeamItem";
import dayjs from "dayjs";
import { isMyTeam } from "@/src/utils/utils";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Teams = ({ isMainPage }) => {
  const router = useRouter();
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
      }}
    >
      {myTeams.length > 0
        ? myTeams.map((item) => <TeamItem key={"team_" + item.id} team={item} disableLink={true} />)
        : isMainPage === false && (
            <Button
              variant="contained"
              onClick={() => {
                router.push("/rogue-social/manage-accounts");
              }}
            >
              GO TO MANAGE ACCOUNTS PAGE
            </Button>
          )}
      {isMainPage === true && myTeams.length < TEAM_PROFILE_LIMIT && (
        <Button
          variant="outlined"
          onClick={() => {
            router.push("/team/create");
          }}
        >
          CREATE NEW ACCOUNT
        </Button>
      )}
    </Box>
  );
};

export default Teams;
