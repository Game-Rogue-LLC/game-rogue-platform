import { Grid, Typography } from "@mui/material";
import MatchCard from "@/src/components/widgets/match/MatchCard";

const MatchContainer = ({ matches, limit }) => {
  return (
    <Grid container spacing={2}>
      {matches && matches.length > 0 ? (
        matches
          .filter((val, i) => !limit || i < limit)
          .map(
            (item) =>
              item.participants?.length == 2 && (
                <Grid key={"match_" + item.id} item xs={12} sm={6} lg={4}>
                  <MatchCard item={item} />
                </Grid>
              )
          )
      ) : (
        <Grid item xs={12} textAlign="center">
          <Typography variant="h6" textTransform="uppercase">
            No Matches
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default MatchContainer;
