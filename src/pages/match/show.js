import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
  useTheme
} from '@mui/material'
import { useRouter } from 'next/router';
import { LoadingButton } from '@mui/lab';
import _ from 'lodash';

import AdminLayout from '@/src/content/AdminLayout';
import { useAppContext } from '@/src/context/app';
import DatePicker from '@/src/components/DatePicker';
import { useMatchContext } from '@/src/context/MatchContext';
import { useTournamentContext } from '@/src/context/TournamentContext';
import { EVENT_FORMATS } from '@/src/config/global';
import { DoubleElimination, SingleElimination, Stepladder } from 'tournament-pairings';
import { nanoid } from 'nanoid';
import SingleEliminationBracket from '@/src/components/match/SingleEliminationBracket';
import DoubleEliminationBracket from '@/src/components/match/DoubleEliminationBracket';
import LadderEliminationBracket from '@/src/components/match/LadderEliminationBracket';
import FullCalendar from '@/src/components/FullCalendar/index.js';
import ScoresDialog from '@/src/components/match/ScoresDialog';

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { organization, event, team, match, matchLoading } = useTournamentContext();
  const [games, setGames] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [eid, setEID] = useState(router?.query.event);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setTitle('MATCHES');
  }, [])

  useEffect(() => {
    if (router?.query?.event) {
      const newEID = router.query.event;
      if (event?.events && event.events[newEID]) {
        setEID(newEID);
        event.setCurrent(newEID);
        organization.setCurrent(event.events[newEID]?.oid);
        match.read(newEID);
      } else {
        console.error('Invalid Event ID');
        // Redirect to 404 page.
      }
    }
  }, [router])

  useEffect(() => {
    if (matchLoading == false && match.matches && match.matches.length > 0) {
      console.log('match matches', match.matches);
      const newMatches = _.sortBy(match.matches, ['round', 'match']);
      const { format } = event.events[eid];
      if (format == 0) {
        setGames(newMatches);
      } else if (format === 1) {
        setGames({
          upper: [...newMatches.filter(val => val.group == 0)],
          lower: [...newMatches.filter(val => val.group == 1)]
        })
      }
    }
  }, [match.matches, matchLoading, event])

  useEffect(() => {
    if (event?.events[eid]?.rounds) {
      if (event.events[eid].format == 2) {
        const schedules = [...event.events[eid].rounds];
        console.log(schedules.map(val => ({
          ...val,
          start: val.start.toDate(),
          end: val.end.toDate()
        })));
        console.log('schedules:', schedules)
        setEvents(schedules.map(val => ({
          ...val,
          start: val.start.toDate(),
          end: val.end.toDate()
        })));
      }
    }
  }, [eid, event])

  const handle = {
    edit: (e) => {
      router.push('/match/edit?event=' + eid);
    },
    singleMatchClick: (match) => {
      const ind = _.findLastIndex(games, (val) => val.id == match.id);

      // if (ind < 0 || games[ind]?.participants?.filter(val => val.id ? true : false).length < 2) return;

      if (ind >= 0) {
        setSelectedGame(ind);
        setOpen(true);
      }
    },
    doubleMatchClick: (match) => {
      const indexInUpper = _.findLastIndex(games.upper, (val) => val.id == match.id)
      const indexInLower = _.findLastIndex(games.lower, (val) => val.id == match.id)

      // if (games.upper[indexInUpper]?.participants?.filter(val => val.id ? true : false).length < 2) return;
      // if (games.lower[indexInLower]?.participants?.filter(val => val.id ? true : false).length < 2) return;

      // let newGames = { ...games }, participant = 0;
      // if (party.id === games.upper[indexInUpper]?.participants[0]?.id || party.id === games.lower[indexInLower]?.participants[0]?.id) participant = 0;
      // else if (party.id === games.upper[indexInUpper]?.participants[1]?.id || party.id === games.lower[indexInLower]?.participants[1]?.id) participant = 1;

      if (indexInUpper >= 0) {
        setSelectedGame(indexInUpper);
        setUpper(true);
        setStart(games.upper[indexInUpper].start || new Date());
        setEnd(games.upper[indexInUpper].end || new Date());
        setOpen(true);
        return;
      }

      if (indexInLower >= 0) {
        setSelectedGame(indexInLower);
        setUpper(false);
        setStart(games.lower[indexInLower].start || new Date());
        setEnd(games.lower[indexInLower].end || new Date());
        setOpen(true);
        return;
      }
    }
  }

  return (
    <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
      <Box sx={{ border: `solid 1px rgba(255, 255, 255, 0.2)`, borderRadius: '4px', padding: 3 }}>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 4 }}>
          <Box sx={{ width: '300px', display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Typography variant='h5'>
              Event Details
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '130px' }}>
                <Typography variant='h6'>
                  Name:
                </Typography>
              </Box>
              <Box>
                <Typography variant='body1'>
                  {event?.events[eid]?.name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '130px' }}>
                <Typography variant='h6'>
                  Format:
                </Typography>
              </Box>
              <Box>
                <Typography variant='body1'>
                  {EVENT_FORMATS[event?.events[eid]?.format].name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '130px' }}>
                <Typography variant='h6'>
                  Seeding:
                </Typography>
              </Box>
              <Box>
                <Typography variant='body1'>
                  {event?.events[eid]?.seeding ? 'Random' : 'Manual'}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: '130px' }}>
                <Typography variant='h6'>
                  Participants:
                </Typography>
              </Box>
              <Box>
                <Typography variant='body1'>
                  {event?.events[eid]?.participantsCount}
                </Typography>
              </Box>
            </Box>
            <Button
              variant='contained'
              onClick={handle.edit}
              disabled={disabled}
            >
              Edit
            </Button>
          </Box>
          <Box sx={{ overflow: 'auto', flex: 1, border: 'solid 1px rgba(255, 255, 255, 0.2)', minHeight: '300px', borderRadius: '4px' }}>
            {
              event?.events[eid] && event.events[eid].format == 2
                ?
                <FullCalendar
                  sx={{
                    marginTop: '24px'
                  }}
                  events={events}
                  setEvents={setEvents}
                />
                :
                (games && event?.events[eid]?.format == 0
                  ?
                  <SingleEliminationBracket matches={games} />
                  :
                  event?.events[eid]?.format == 1
                    ?
                    <DoubleEliminationBracket matches={games} />
                    :
                    <></>)
            }
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page;
