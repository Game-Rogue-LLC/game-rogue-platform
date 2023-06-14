import { Box, Grid, Typography } from "@mui/material";

import ArticleCard from "@/src/components/widgets/rogue-social/ArticleCard";

const ArticleContainer = ({ items }) => {
  return (
    <Grid container spacing={2} rowSpacing={2}>
      <Grid item xs={4} lg={3}>
        <ArticleCard />
      </Grid>
      <Grid item xs={4} lg={3}>
        <ArticleCard />
      </Grid>
      <Grid item xs={4} lg={3}>
        <ArticleCard />
      </Grid>
    </Grid>
  );
};

export default ArticleContainer;
