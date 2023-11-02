import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";

import { Box } from "@mui/material";
import Organizations from "@/src/components/widgets/rogue-social/accounts/Organizations";
import PublicLayout from "@/src/content/PublicLayout";
import { useAuthContext } from "@/src/context/AuthContext";
import { useMemo } from "react";

const Page = (props) => {
  const { user } = useAuthContext();
  const { organizer } = useTournamentContext();

  const myOrganizations = useMemo(() => {
    if (organizer?.organizers) {
      return _.filter(organizer.organizers, (val) => val.uid === user.id);
    }
    return [];
  }, [organizer?.organizers, user]);

  return (
    <Box>
      <Organizations items={myOrganizations} />
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
