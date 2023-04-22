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
import DemoFullCalendar from '@/src/components/DemoFullCalendar/index.js';

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
        let newParticipants = [];

        if (val.player1 && participants[val.player1 - 1]) {
          newParticipants.push({
            id: participants[val.player1 - 1].tid,
            round: val.round,
            resultText: '',
            isWinner: false,
            status: null,
            name: teams[participants[val.player1 - 1].tid].name
          })
        }

        if (val.player2 && participants[val.player2 - 1]) {
          newParticipants.push({
            id: participants[val.player2 - 1].tid,
            round: val.round,
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
        let newParticipants = [];

        if (val.player1 && participants[val.player1 - 1]) {
          newParticipants.push({
            id: participants[val.player1 - 1].tid,
            round: val.round,
            resultText: '',
            isWinner: false,
            status: null,
            name: teams[participants[val.player1 - 1].tid].name
          })
        }

        if (val.player2 && participants[val.player2 - 1]) {
          newParticipants.push({
            id: participants[val.player2 - 1].tid,
            round: val.round,
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
        let newParticipants = [];

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
    organize: (e) => { },
    singlePartyClick: (party, partyWon) => {
      if (party.status == 'DONE') return;

      const ind = _.findLastIndex(games, (val) => (
        (val.participants[0]?.id == party.id && val.participants[0]?.round == party.round)
        || (val.participants[1]?.id == party.id && val.participants[1]?.round == party.round)
      ))

      if (ind < 0 || games[ind]?.participants?.filter(val => val.id ? true : false).length < 2) return;

      let newGames = [...games], participant = 0;

      if (party.id === games[ind]?.participants[0]?.id) participant = 0;
      else if (party.id === games[ind]?.participants[1]?.id) participant = 1;

      if (ind >= 0) {
        newGames[ind].participants[participant].isWinner = true;
        newGames[ind].participants[participant].resultText = 'WON';
        newGames[ind].participants[participant].status = 'DONE';
        newGames[ind].participants[1 - participant].isWinner = false;
        newGames[ind].participants[1 - participant].resultText = 'LOST';
        newGames[ind].participants[1 - participant].status = 'DONE';

        let nextIndex = -1;
        if (newGames[ind].nextMatchId) {
          nextIndex = _.findIndex(games, (val) => val?.id === newGames[ind].nextMatchId, ind);
        }

        if (nextIndex >= 0) {
          if (newGames[nextIndex]?.participants.length == 0) newGames[nextIndex].participants = [{}, {}];

          const newParticipant = {
            ...newGames[ind].participants[participant],
            round: newGames[ind].participants[participant].round + 1,
            isWinner: false,
            resultText: '',
            status: null
          }

          if (newGames[ind - 1]?.nextMatchId === newGames[nextIndex]?.id) {
            newGames[nextIndex].participants[1] = newParticipant;
          } else if (newGames[ind + 1]?.nextMatchId === newGames[nextIndex]?.id) {
            newGames[nextIndex].participants[0] = newParticipant;
          }

          console.warn(newGames[nextIndex].participants)
        }
        setGames(newGames);
      }
    },
    doublePartyClick: (party, partyWon) => {
      if (party.status === 'DONE') return;

      const indexInUpper = _.findLastIndex(games.upper, (val) => (
        (val.participants[0]?.id == party.id && val.participants[0]?.round == party.round)
        || (val.participants[1]?.id == party.id && val.participants[1]?.round == party.round)
      ))
      const indexInLower = _.findLastIndex(games.lower, (val) => (
        (val.participants[0]?.id == party.id && val.participants[0]?.round == party.round)
        || (val.participants[1]?.id == party.id && val.participants[1]?.round == party.round)
      ))

      if (games.upper[indexInUpper]?.participants?.filter(val => val.id ? true : false).length < 2) return;
      if (games.lower[indexInLower]?.participants?.filter(val => val.id ? true : false).length < 2) return;

      let newGames = { ...games }, participant = 0;
      if (party.id === games.upper[indexInUpper]?.participants[0]?.id || party.id === games.lower[indexInLower]?.participants[0]?.id) participant = 0;
      else if (party.id === games.upper[indexInUpper]?.participants[1]?.id || party.id === games.lower[indexInLower]?.participants[1]?.id) participant = 1;

      if (indexInUpper >= 0) {
        newGames.upper[indexInUpper].participants[participant].isWinner = true;
        newGames.upper[indexInUpper].participants[participant].resultText = 'WON';
        newGames.upper[indexInUpper].participants[participant].status = 'DONE';
        newGames.upper[indexInUpper].participants[1 - participant].isWinner = false;
        newGames.upper[indexInUpper].participants[1 - participant].resultText = 'LOST';
        newGames.upper[indexInUpper].participants[1 - participant].status = 'DONE';

        let nextIndex = -1, nextLooserIndex = -1;

        if (games.upper[indexInUpper].nextMatchId) {
          nextIndex = _.findIndex(games.upper, (val) => val?.id === newGames.upper[indexInUpper].nextMatchId, indexInUpper);
          if (nextIndex < 0) nextIndex = _.findIndex(games.lower, (val) => val?.id === newGames.upper[indexInUpper].nextMatchId);
        }
        if (games.upper[indexInUpper].nextLooserMatchId) {
          nextLooserIndex = _.findIndex(games.lower, (val) => val?.id === newGames.upper[indexInUpper].nextLooserMatchId);
        }

        if (nextIndex >= 0) {
          const newParticipant = {
            ...newGames.upper[indexInUpper].participants[participant],
            round: newGames.upper[indexInUpper].participants[participant].round + 1,
            isWinner: false,
            resultText: '',
            status: null
          }
          if (newGames.upper[nextIndex]?.id == newGames.upper[indexInUpper].nextMatchId) {
            if (newGames.upper[nextIndex]?.participants.length == 0) newGames.upper[nextIndex].participants = [{}, {}];

            if (newGames.upper[indexInUpper - 1]?.nextMatchId === newGames.upper[nextIndex]?.id) {
              newGames.upper[nextIndex].participants[1] = newParticipant;
            } else if (newGames.upper[indexInUpper + 1]?.nextMatchId === newGames.upper[nextIndex]?.id) {
              newGames.upper[nextIndex].participants[0] = newParticipant;
            }
          }
          if (newGames.lower[nextIndex]?.id == newGames.upper[indexInUpper].nextMatchId) {
            if (newGames.lower[nextIndex]?.participants.length == 0) newGames.lower[nextIndex].participants = [{}, {}];
            newGames.lower[nextIndex].participants[0] = newParticipant;
          }
        }

        if (nextLooserIndex >= 0) {
          const newParticipant = {
            ...newGames.upper[indexInUpper].participants[1 - participant],
            round: newGames.upper[indexInUpper].participants[1 - participant].round + 1,
            isWinner: false,
            resultText: '',
            status: null
          }

          if (newGames.lower[nextLooserIndex].participants.length == 0) newGames.lower[nextLooserIndex].participants = [{}, {}];

          if (newGames.upper[indexInUpper - 1]?.nextLooserMatchId == newGames.lower[nextLooserIndex].id)
            newGames.lower[nextLooserIndex].participants[1] = newParticipant;
          else newGames.lower[nextLooserIndex].participants[0] = newParticipant;
        }
      }

      if (indexInLower >= 0) {
        newGames.lower[indexInLower].participants[participant].isWinner = true;
        newGames.lower[indexInLower].participants[participant].resultText = 'WON';
        newGames.lower[indexInLower].participants[participant].status = 'DONE';
        newGames.lower[indexInLower].participants[1 - participant].isWinner = false;
        newGames.lower[indexInLower].participants[1 - participant].resultText = 'LOST';
        newGames.lower[indexInLower].participants[1 - participant].status = 'DONE';

        let nextIndex = -1;

        if (games.lower[indexInLower].nextMatchId) {
          nextIndex = _.findIndex(games.lower, (val) => val?.id === newGames.lower[indexInLower].nextMatchId);
        }

        if (nextIndex >= 0) {
          const newParticipant = {
            ...newGames.lower[indexInLower].participants[participant],
            round: newGames.lower[indexInLower].participants[participant].round + 1,
            isWinner: false,
            resultText: '',
            status: null
          }

          if (newGames.lower[nextIndex].participants.length == 0) newGames.lower[nextIndex].participants = [{}, {}];
          if (newGames.lower[nextIndex].nextMatchId) {
            if (newGames.lower[indexInLower + 1]?.nextMatchId == newGames.lower[nextIndex].id)
              newGames.lower[nextIndex].participants[0] = newParticipant;
            else
              newGames.lower[nextIndex].participants[1] = newParticipant;
          } else {
            newGames.lower[nextIndex].participants[1] = newParticipant;
          }
        }
      }

      setGames(newGames);
    }
  }

  return (
    <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
      <Box sx={{ border: `solid 1px rgba(255, 255, 255, 0.2)`, borderRadius: '4px', padding: 3 }}>
        <Grid container spacing={2} padding={2}>
          <Grid item container sx={{ width: '300px' }}>
            <Box>
              <Box>
                <Typography variant='h5'>
                  Event Details
                </Typography>
              </Box>
              <Grid container sx={{ alignItems: 'center', mt: 3 }}>
                <Grid item sx={{ width: '130px' }}>
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
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid item sx={{ width: '130px' }}>
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
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid item sx={{ width: '130px' }}>
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
              <Grid container sx={{ alignItems: 'center' }}>
                <Grid item sx={{ width: '130px' }}>
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
            </Box>
          </Grid>
          <Grid item xs>
            {
              event?.events[eid] &&
              (event.events[eid].format == 2
                ?
                <Box>
                  <Button
                    variant='contained'
                    onClick={handle.organize}
                    disabled={disabled}
                  >
                    Organize
                  </Button>
                  <DemoFullCalendar
                    sx={{
                      marginTop: '24px'
                    }}
                    events={events}
                    setEvents={setEvents}
                  />
                </Box>
                :
                <Grid container spacing={2} rowSpacing={3}>
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
                  <Grid item xs={12}>
                    <Box sx={{ overflow: 'auto', border: 'solid 1px rgba(255, 255, 255, 0.2)', minHeight: '300px', borderRadius: '4px' }}>
                      {
                        games && event?.events[eid]?.format == 0
                          ?
                          <SingleEliminationBracket matches={games} handlePartyClick={handle.singlePartyClick} />
                          :
                          event?.events[eid]?.format == 1
                            ?
                            <DoubleEliminationBracket matches={games} handlePartyClick={handle.doublePartyClick} />
                            :
                            <></>
                      }
                    </Box>
                  </Grid>
                </Grid>
              )
            }
          </Grid>
        </Grid >
      </Box >
    </Paper >
  )
}

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>
}

export default Page;
