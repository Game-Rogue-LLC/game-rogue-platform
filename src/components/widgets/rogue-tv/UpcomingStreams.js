import { Grid } from "@mui/material";
import UpcomingStreamCard from "@/src/components/widgets/rogue-tv/UpcomingStreamCard";

export default function UpcomingStreams({ items }) {
  return (
    <Grid container spacing={2} rowSpacing={2}>
      {_.map(items, (val) => (
        <Grid item xs={12} md={6}>
          <UpcomingStreamCard item={val} />
        </Grid>
      ))}
    </Grid>
  );
}
