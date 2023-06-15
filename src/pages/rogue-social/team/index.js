import { Container } from "@mui/material";
import MyTeams from "@/src/components/widgets/rogue-social/MyTeams";
import PublicLayout from "@/src/content/PublicLayout";
import TournamentProvider from "@/src/context/TournamentContext";

const Page = (props) => {
  return (
    <Container sx={{ my: 4 }}>
      <MyTeams />
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
