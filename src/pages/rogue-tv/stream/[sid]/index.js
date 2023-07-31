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
