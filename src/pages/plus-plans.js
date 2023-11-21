import PublicLayout from "@/src/content/PublicLayout";
import TournamentProvider from "@/src/context/TournamentContext";
import PlusPlan from '@/src/pages/plus plan main page/plus-plan';

const Page = (props) => {
  return <PlusPlan />;
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;