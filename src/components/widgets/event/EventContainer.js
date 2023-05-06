import {
  Grid,
  Typography
} from '@mui/material'
import EventCard from '@/src/components/widgets/event/EventCard';

const EventContainer = ({ events, limit }) => {
  return (
    <Grid container spacing={2}>
      {
        events && events.length > 0
          ? events.filter((val, i) => !limit || i < limit).map(item => (
            <Grid key={'event_' + item.id} item xs={12} sm={6} lg={4}>
              <EventCard item={item} />
            </Grid>
          ))
          : <Grid item xs={12}>
            <Typography variant="h6">No Events</Typography>
          </Grid>
      }
    </Grid>
  )
}

export default EventContainer;