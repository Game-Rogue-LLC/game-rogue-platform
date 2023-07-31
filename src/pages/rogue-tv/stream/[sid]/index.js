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
