import { Container } from "@mui/material";
import MyOrganizers from "@/src/components/widgets/rogue-social/profile/MyOrganizers";
import PublicLayout from "@/src/content/PublicLayout";
import TournamentProvider from "@/src/context/TournamentContext";

const Page = (props) => {
  return (
    <Container sx={{ my: 4 }}>
      <MyOrganizers />
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
