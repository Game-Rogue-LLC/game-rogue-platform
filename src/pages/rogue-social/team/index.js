import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";

import { Box } from "@mui/material";
import PublicLayout from "@/src/content/PublicLayout";
import Teams from "@/src/components/widgets/rogue-social/accounts/Teams";
import _ from "lodash";
import { isMyTeam } from "@/src/utils/utils";
import { useAuthContext } from "@/src/context/AuthContext";
import { useMemo } from "react";

const Page = (props) => {
  const { user } = useAuthContext();
  const { team } = useTournamentContext();

  const myTeams = useMemo(() => {
    return _.filter(team.teams, (val) => isMyTeam(val, user?.id));
  }, [user, team.teams]);
  return (
    <Box>
      <Teams items={myTeams} />
    </Box>
  );
};
Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;
