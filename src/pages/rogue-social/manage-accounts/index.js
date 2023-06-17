import { Container } from "@mui/material";
import ManageAccounts from "@/src/components/widgets/rogue-social/accounts/ManageAccounts";
import PublicLayout from "@/src/content/PublicLayout";
import TournamentProvider from "@/src/context/TournamentContext";

const Page = (props) => {
  return (
    <Container sx={{ py: 5 }}>
      <ManageAccounts isMainPage={true} />
    </Container>
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
