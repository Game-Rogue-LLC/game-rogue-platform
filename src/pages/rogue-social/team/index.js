import { Container } from "@mui/material";
import PublicLayout from "@/src/content/PublicLayout";
import Teams from "@/src/components/widgets/rogue-social/accounts/Teams";
import TournamentProvider from "@/src/context/TournamentContext";

const Page = (props) => {
  return (
    <Container sx={{ my: 4 }}>
      <Teams />
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
