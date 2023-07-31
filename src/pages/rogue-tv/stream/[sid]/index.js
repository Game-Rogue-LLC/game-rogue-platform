import RogueSocialSplash from "@/src/content/Splash/RogueSocialSplash";
import TVLayout from "@/src/content/TVLayout";
import TournamentProvider from "@/src/context/TournamentContext";

const Page = ({}) => {
  return <></>;
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <RogueSocialSplash />
      <TVLayout>{page}</TVLayout>
    </TournamentProvider>
  );
};

export default Page;
