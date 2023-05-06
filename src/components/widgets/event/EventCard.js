import Link from 'next/link';
import {
  Box,
  Typography,
  Grid,
  Chip
} from '@mui/material'
import dayjs from 'dayjs';
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_LOGO } from '@/src/config/global';

const EventCard = ({ item }) => {
  return (
    <Link href={`/event/${item?.id}/info`}>
      <Box
        sx={{
          border: 'solid 1px rgba(255, 255, 255, 0.2)',
          height: '280px',
          background: 'black',
          ':hover': {
            cursor: 'pointer',
            background: 'rgba(245, 131, 31, 0.1)'
          }
        }}
      >
        <Box
          sx={{
            height: '70px',
            background: 'url(' + (item?.banner || DEFAULT_CONTENTBLOCK_IMAGE) + ')',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderBottom: 'solid 1px gray',
            p: 1,
            alignItems: 'center',
            display: 'flex'
          }}
        >
          <Chip icon={<img src="/static/images/games/r6s.webp" width="30px" height="30px" />} label="R6" sx={{ backgroundColor: '#404040', color: 'white', fontSize: '1rem' }} />
        </Box>
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
          <img src={item?.darkLogo || DEFAULT_LOGO} style={{ height: '40px', width: '40px', objectFit: 'cover' }} />
          <Typography variant='h4' fontSize={24} color="white">
            {item?.name}
          </Typography>
        </Box>
        <Box sx={{ p: 2, background: 'transparent' }}>
          <Grid container color="lightgray">
            <Grid item sx={{ width: '100px' }}>
              Date:
            </Grid>
            <Grid item xs>
              <Typography variant='body2'>
                {dayjs(item?.startAt).format('DD. MMM. YYYY')}
              </Typography>
            </Grid>
          </Grid>
          <Grid container color="lightgray">
            <Grid item sx={{ width: '100px' }}>
              Min Age:
            </Grid>
            <Grid item xs>
              16
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Link>
  )
}

export default EventCard;