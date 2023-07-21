import { Paper, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import ArticleLayout from "@/src/content/ArticleLayout";
import ArticlePreview from "@/src/components/widgets/article/ArticlePreview";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const { article, event } = useTournamentContext();
  const [aid, setAID] = useState(router?.query.aid);
  const [item, setItem] = useState();

  useEffect(() => {
    setTitle("ARTICLE");
  }, []);

  useEffect(() => {
    if (router?.query?.aid && router.query.aid !== aid) setAID(router.query.aid);
  }, [router]);

  useEffect(() => {
    if (aid && article.articles[aid]) {
      setItem(article.articles[aid]);
    }
  }, [aid, article?.articles]);

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <ArticlePreview item={item} />
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <ArticleLayout>{page}</ArticleLayout>;
};

export default Page;
