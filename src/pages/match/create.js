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
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import DemoFullCalendar from '@/src/components/DemoFullCalendar/index.js';

// a custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

const initialInputs = {
  eid: '',
  status: 0,
  admin: 0,
  category: 0,
  schedule: 0,
  deleted: false
}

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { organization, event, team } = useTournamentContext();
  const { match } = useMatchContext();
  const [games, setGames] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [eid, setEID] = useState(router?.query.event);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    setTitle('ORGANIZE MATCHES');
  }, [])

  useEffect(() => {
    if (router?.query?.event) {
      const newEID = router.query.event;
      if (event?.events && event.events[newEID]) {
        setEID(newEID);
        event.setCurrent(newEID);
        organization.setCurrent(event.events[newEID]?.oid);
      } else {
        console.error('Invalid Event ID');
        // Redirect to 404 page.
      }
    }
  }, [router])

  const createMatches = (type, teams, participants, participantsCount, randomized) => {
    if (type === 0) {   //! Single Elimination Bracket
      let newGames = [], gameIDs = []
      const matches = SingleElimination(randomized);
      matches.forEach((val, i) => {
        const newParticipants = [];

        if (val.player1 && participants[val.player1 - 1]) {
          newParticipants.push({
            id: participants[val.player1 - 1].tid,
            resultText: '',
            isWinner: false,
            status: null,
            name: teams[participants[val.player1 - 1].tid].name
          })
        }

        if (val.player2 && participants[val.player2 - 1]) {
          newParticipants.push({
            id: participants[val.player2 - 1].tid,
            resultText: '',
            isWinner: false,
            status: null,
            name: teams[participants[val.player2 - 1].tid].name
          })
        }

        const newGame = {
          ...val,
          id: nanoid(),
          name: '',
          nextMatchId: null,
          tournamentRoundText: `${val.round}`,
          startTime: '',
          state: "DONE",
          participants: newParticipants
        }

        gameIDs.push(newGame.id);
        newGames.push(newGame);
      })
      matches.forEach((val, i) => {
        const nextMatch = matches.findIndex(itr => itr.round === val.win?.round && itr.match == val.win?.match);
        if (nextMatch >= 0) {
          newGames[i].nextMatchId = gameIDs[nextMatch];
        }
      })
      return newGames;
    } else if (type === 1) {  //! Double Elimination Bracket
      let newGames = {
        'upper': [],
        'lower': []
      }
      let gameIDs = []
      const matches = DoubleElimination(randomized);
      matches.forEach((val, i) => {
        const newParticipants = [];

        if (val.player1 && participants[val.player1 - 1]) {
          newParticipants.push({
            id: participants[val.player1 - 1].tid,
            resultText: '',
            isWinner: false,
            status: null,
            name: teams[participants[val.player1 - 1].tid].name
          })
        }

        if (val.player2 && participants[val.player2 - 1]) {
          newParticipants.push({
            id: participants[val.player2 - 1].tid,
            resultText: '',
            isWinner: false,
            status: null,
            name: teams[participants[val.player2 - 1].tid].name
          })
        }

        const newGame = {
          ...val,
          id: nanoid(),
          name: '',
          nextMatchId: null,
          nextLooserMatchId: null,
          tournamentRoundText: `${val.round}`,
          startTime: '',
          state: "DONE",
          participants: newParticipants
        }

        gameIDs.push(newGame.id);
        if (val.loss) {
          newGames.upper.push(newGame);
        } else {
          newGames.lower.push(newGame);
        }
      })
      newGames.upper.forEach((val, i) => {
        const nextMatch = matches.findIndex(itr => itr.round === val.win?.round && itr.match == val.win?.match);
        const nextLooserMatch = matches.findIndex(itr => itr.round === val.loss?.round && itr.match == val.loss?.match)
        if (nextMatch >= 0) {
          newGames.upper[i].nextMatchId = gameIDs[nextMatch];
        }
        if (nextLooserMatch >= 0) {
          newGames.upper[i].nextLooserMatchId = gameIDs[nextLooserMatch];
        }
      })
      newGames.lower.forEach((val, i) => {
        const nextMatch = matches.findIndex(itr => itr.round === val.win?.round && itr.match == val.win?.match);
        if (nextMatch >= 0) {
          newGames.lower[i].nextMatchId = gameIDs[nextMatch];
        }
      })
      return newGames;
    } else if (type === 2) {  //! Ladder Elimination
      let newGames = [], gameIDs = []
      const matches = Stepladder(randomized);
      matches.forEach((val, i) => {
        const newParticipants = [];

        if (val.player1 && participants[val.player1 - 1]) {
          newParticipants.push({
            id: participants[val.player1 - 1].tid,
            resultText: '',
            isWinner: false,
            status: null,
            name: teams[participants[val.player1 - 1].tid].name
          })
        }

        if (val.player2 && participants[val.player2 - 1]) {
          newParticipants.push({
            id: participants[val.player2 - 1].tid,
            resultText: '',
            isWinner: false,
            status: null,
            name: teams[participants[val.player2 - 1].tid].name
          })
        }

        const newGame = {
          ...val,
          id: nanoid(),
          name: '',
          nextMatchId: null,
          tournamentRoundText: `${val.round}`,
          startTime: '',
          state: "DONE",
          participants: newParticipants
        }

        gameIDs.push(newGame.id);
        newGames.push(newGame);
      })
      matches.forEach((val, i) => {
        const nextMatch = matches.findIndex(itr => itr.round === val.win?.round && itr.match == val.win?.match);
        if (nextMatch >= 0) {
          newGames[i].nextMatchId = gameIDs[nextMatch];
        }
      })
      return newGames;
    }
  }

  const handle = {
    buildTemplate: (e) => {
      const { participants, participantsCount, format } = event.events[eid];
      const randomized = _.shuffle(_.range(1, participantsCount + 1)); // Generate random array to seed teams randomly
      const matches = createMatches(format, team.teams, [...participants], participantsCount, randomized);

      console.info('matches:', matches);
      setGames(matches);
    },
    organize: (e) => { }
  }

  return (
    <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
      <Box sx={{ border: `solid 1px rgba(255, 255, 255, 0.2)`, borderRadius: '4px', padding: 3 }}>
        <Grid container spacing={2} rowSpacing={3}>
          <Grid item xs={12}>
            <Typography variant='h5'>
              Event Details
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6} container sx={{ alignItems: 'center' }}>
            <Grid item sx={{ width: '150px' }}>
              <Typography variant='h6'>
                Name:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                {event?.events[eid]?.name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6} container sx={{ alignItems: 'center' }}>
            <Grid item sx={{ width: '150px' }}>
              <Typography variant='h6'>
                Format:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                {EVENT_FORMATS[event?.events[eid]?.format].name}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6} container sx={{ alignItems: 'center' }}>
            <Grid item sx={{ width: '150px' }}>
              <Typography variant='h6'>
                Seeding:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                {event?.events[eid]?.seeding ? 'Random' : 'Manual'}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} lg={6} container sx={{ alignItems: 'center' }}>
            <Grid item sx={{ width: '150px' }}>
              <Typography variant='h6'>
                Participants:
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant='body1'>
                {event?.events[eid]?.participantsCount}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 3 }}>
        {
          event?.events[eid] &&
          (event.events[eid].format == 2
            ?
            <Box>
              <DemoFullCalendar
                events={events}
                setEvents={setEvents}
              />
            </Box>
            :
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  variant='contained'
                  onClick={handle.buildTemplate}
                  disabled={disabled}
                >
                  Build Template
                </Button>
                <Button
                  variant='contained'
                  onClick={handle.organize}
                  disabled={disabled}
                  sx={{ ml: 2 }}
                >
                  Organize
                </Button>
              </Grid>
              <Grid item xs={12} sx={{ overflow: 'auto', border: 'solid 1px rgba(255, 255, 255, 0.2)', minHeight: '300px', borderRadius: '4px', mt: 3 }}>
                {
                  games && event?.events[eid]?.format == 0
                    ?
                    <SingleEliminationBracket matches={games} handlePartyClick={() => { }} />
                    :
                    event?.events[eid]?.format == 1
                      ?
                      <DoubleEliminationBracket matches={games} handlePartyClick={() => { }} />
                      :
                      <></>
                }
              </Grid>
            </Grid>
          )
        }
      </Box>
    </Paper>
  )
}

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page;
