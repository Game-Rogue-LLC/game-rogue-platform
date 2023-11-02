import { Grid } from "@mui/material";
import LiveChannelCard from "@/src/components/widgets/rogue-tv/LiveChannelCard";

export default function LiveChannels({ items }) {
  return (
    <Grid container spacing={2} rowSpacing={2} columns={4}>
      {_.slice(items, 0, 10).map((val, i) => (
        <Grid item xs={1} key={`live-channel-${i}`}>
          <LiveChannelCard item={val} />
        </Grid>
      ))}
    </Grid>
  );
}
