import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@mui/material'
import PublicLayout from '@/src/content/PublicLayout';
import { useAppContext } from '@/src/context/app';
import TournamentProvider, { useTournamentContext } from '@/src/context/TournamentContext';
import { DEFAULT_CONTENTBLOCK_IMAGE, DEFAULT_LOGO } from '@/src/config/global';
import dayjs from 'dayjs';
import Link from 'next/link';

const Page = (props) => {
  const { setTitle } = useAppContext();
  const { event } = useTournamentContext();

  useEffect(() => {
    setTitle('UPCOMING EVENTS');
  }, [])

  return (
    <Container>
      <Grid container spacing={2} rowSpacing={3} sx={{ mt: 2 }}>
        {event?.events && Object.keys(event.events).filter(key => dayjs(event.events[key].startAt).isAfter(new Date())).map(eid => {
          const item = event.events[eid];
          return (
            <Grid item xs={12} sm={6} lg={4} key={'event_' + eid}>
              <Link href={`/event/${eid}/info`}>
                <Box
                  sx={{
                    border: 'solid 1px rgba(255, 255, 255, 0.2)',
                    borderRadius: '4px',
                    height: '280px',
                    background: 'rgba(25, 25, 25, 0.8)',
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
                      borderBottom: 'solid 1px gray'
                    }}
                  >
                  </Box>
                  <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src={item?.darkLogo || DEFAULT_LOGO} style={{ height: '40px', width: '40px', objectFit: 'cover' }} />
                    <Typography variant='h4'>
                      {item?.name}
                    </Typography>
                  </Box>
                  <Box sx={{ p: 2, background: 'transparent' }}>
                    <Grid container>
                      <Grid item sx={{ width: '100px' }}>
                        Date:
                      </Grid>
                      <Grid item xs>
                        <Typography variant='body2'>
                          {dayjs(item?.startAt).format('DD. MMM. YYYY')}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container>
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
            </Grid>
          )
        })}
      </Grid>
    </Container>
  )
}

Page.getLayout = (page) => {
  return (
    <PublicLayout>
      <TournamentProvider>
        {page}
      </TournamentProvider>
    </PublicLayout>
  )
}

export default Page;