import { Grid, Typography } from "@mui/material";

import GameCategoryCard from "@/src/components/widgets/rogue-tv/GameCategoryCard";

const categories = [
  {
    id: 0,
    image: "/static/images/games/r6s_cardback.webp",
    name: "Rainbow Six Siege",
    view: 4020,
    platform: 1,
    region: 0
  }
];

export default function GameCategories({}) {
  return (
    <Grid container spacing={2} rowSpacing={2} py={1}>
      {_.map(categories, (val, i) => (
        <Grid item key={`game-category-${i}`}>
          <GameCategoryCard item={val} />
        </Grid>
      ))}
    </Grid>
  );
}
