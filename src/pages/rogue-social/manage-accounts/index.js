import { Box } from "@mui/material";
import ManageAccounts from "@/src/components/widgets/rogue-social/accounts/ManageAccounts";
import PublicLayout from "@/src/content/PublicLayout";
import TournamentProvider from "@/src/context/TournamentContext";

const Page = (props) => {
  return (
    <Box
      sx={{
        mt: 0
      }}
    >
      <ManageAccounts />
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
