import { Grid, Typography } from "@mui/material";
import StreamCard from "@/src/components/widgets/rogue-social/profile/StreamCard";

const StreamContainer = ({ streams, limit }) => {
  return (
    <Grid container spacing={2}>
      {streams && streams.length > 0 ? (
        streams
          .filter((val, i) => !limit || i < limit)
          .map((item) => (
            <Grid key={"event_" + item.id} item xs={12} sm={6} lg={4}>
              <StreamCard item={item} />
            </Grid>
          ))
      ) : (
        <Grid item xs={12} textAlign="center">
          <Typography variant="h6" textTransform="uppercase" color="white">
            No Streams
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default StreamContainer;
