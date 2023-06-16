import { Container } from "@mui/material";
import Organizations from "@/src/components/widgets/rogue-social/accounts/Organizations";
import PublicLayout from "@/src/content/PublicLayout";
import TournamentProvider from "@/src/context/TournamentContext";

const Page = (props) => {
  return (
    <Container sx={{ my: 4 }}>
      <Organizations />
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
