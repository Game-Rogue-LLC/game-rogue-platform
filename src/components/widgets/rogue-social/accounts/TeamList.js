import { Box, Button } from "@mui/material";

import { TEAM_PROFILE_LIMIT } from "@/src/config/global";
import TeamItem from "@/src/components/widgets/rogue-social/accounts/TeamItem";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const TeamList = ({ items }) => {
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { user } = useAuthContext();

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
      {items &&
        items.length > 0 &&
        items.map((item) => <TeamItem key={"team_" + item.id} team={item} />)}
      {items.length < TEAM_PROFILE_LIMIT && (
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

export default TeamList;
