import PublicLayout from "@/src/content/PublicLayout";
import TournamentProvider from "@/src/context/TournamentContext";

const Page = (props) => {
  return (
    <iframe
      src="https://game-rogue-creative-suite.vercel.app"
      width="100%"
      height={800}
      frameBorder="0"
    ></iframe>
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
