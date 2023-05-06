import { useEffect, useMemo, useState } from 'react';
import Button from '@mui/material/Button';
import { useAppContext } from '@/src/context/app';
import {
  Box,
  Container,
  Typography,
  useTheme
} from '@mui/material';
import PublicLayout from '@/src/content/PublicLayout';
import dayjs from 'dayjs';
import EventContainer from '@/src/components/widgets/event/EventContainer';
import TournamentProvider, { useTournamentContext } from '@/src/context/TournamentContext';
import { useRouter } from 'next/router';
import FeaturedTournaments from '@/src/components/widgets/FeaturedTournaments';

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { event, match, currentTime, setCurrentTime } = useTournamentContext();

  const ongoingEventIds = useMemo(() => {
    if (event?.events && currentTime) {
      return Object.keys(event.events).filter(key => dayjs(event.events[key].startAt).isBefore(currentTime) && dayjs(event.events[key].endAt).isAfter(currentTime));
    }
    return [];
  }, [event?.events, currentTime])

  useEffect(() => {
    setTitle("Ongoing Events");
    setCurrentTime(new Date());
  }, [])

  return (
    <>
      <Box
        component={'section'}
        sx={{
          position: 'relative',
          backgroundImage: 'url(/static/images/event_bg.png)',
          height: '998px',
          backgroundPosition: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
      </Box>

      <FeaturedTournaments />

      <Box
        component={'section'}
        sx={{
          position: 'relative',
          backgroundColor: 'rgb(36, 35, 35)',
          py: '10px'
        }}
      >
        <Container sx={{ margin: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            component={'img'}
            src="/static/images/games/r6s.webp"
          ></Box>
          <Typography variant="body1" fontWeight={700} fontSize={25} color={theme.palette.primary.main} textTransform='uppercase'>
            Rainbow six siege
          </Typography>
          <Box
            sx={{
              flex: 1,
              textAlign: 'right'
            }}
          >
            <Button variant="contained">
              CHANGE GAME
            </Button>
          </Box>
        </Container>
      </Box>

      <Box
        component={'section'}
        sx={{
          position: 'relative',
          background: 'linear-gradient(to top,#28160c,#000)',
          position: 'relative'
        }}
      >
        <Container sx={{ margin: 'auto', pb: 5 }}>
          <Box sx={{ mt: 8 }}>
            <Box
              sx={{ display: 'flex', gap: 1, alignItems: 'center', backgroundColor: '#000a14', padding: 2, border: 'solid 1px rgba(255, 255, 255, 0.2)' }}
            >
              <Box
                component={'img'}
                src="/static/images/games/r6s.webp"
              ></Box>
              <Typography variant="body1" fontWeight={700} fontSize={25} color={theme.palette.primary.main} textTransform='uppercase'>
                ONGOING EVENTS
              </Typography>
            </Box>
            <Box
              sx={{
                mt: 2
              }}
            >
              <EventContainer events={ongoingEventIds?.map(eid => event?.events[eid])} />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
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
