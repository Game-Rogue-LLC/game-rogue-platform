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
import DatePicker from '@/src/components/datetime/DatePicker';
import { useMatchContext } from '@/src/context/MatchContext';
import { useTournamentContext } from '@/src/context/TournamentContext';
import { EVENT_FORMATS } from '@/src/config/global';
import { DoubleElimination, SingleElimination, Stepladder } from 'tournament-pairings';
import { nanoid } from 'nanoid';
import SingleEliminationBracket from '@/src/components/tournament-bracket/SingleEliminationBracket';
import DoubleEliminationBracket from '@/src/components/tournament-bracket/DoubleEliminationBracket';
import LadderEliminationBracket from '@/src/components/tournament-bracket/LadderEliminationBracket';
import FullCalendar from '@/src/components/datetime/FullCalendar.js';
import ScoresDialog from '@/src/components/dialog/ScoresDialog';

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { organization, event, team, match, matchLoading } = useTournamentContext();
  const [games, setGames] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [eid, setEID] = useState(router?.query.event);
  const [events, setEvents] = useState([]);
  const [saving, setSaving] = useState(false);
  const [selectedGame, setSelectedGame] = useState(0);
  const [open, setOpen] = useState(false);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

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
      setGames(_.sortBy(match.matches, ['round', 'match']));
    }
  }, [match.matches, matchLoading])

  const createMatches = (type, teams, participants, participantsCount, randomized) => {
    if (type === 0) {   //* Single Elimination Bracket
      let newGames = []//, gameIDs = []
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
          eid: eid,
          nextMatchId: null,
          up: null,
          down: null,
          tournamentRoundText: `${val.round}`,
          startTime: '',
          state: "DONE",
          participants: newParticipants
        }

        // gameIDs.push(newGame.id);
        newGames.push(newGame);
      })
      matches.forEach((val, i) => {
        const nextMatch = matches.findIndex(itr => itr.round === val.win?.round && itr.match == val.win?.match);
        if (nextMatch >= 0) {
          newGames[i].nextMatchId = newGames[nextMatch].id;
          if (!newGames[nextMatch].up) newGames[nextMatch].up = newGames[i].id;
          else newGames[nextMatch].down = newGames[i].id;
        }
      })
      return newGames;
    } else if (type === 1) {  //* Double Elimination Bracket
      let newGames = {
        'upper': [],
        'lower': []
      }
      // let gameIDs = []
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
          eid: eid,
          nextMatchId: null,
          nextLooserMatchId: null,
          up: null,
          down: null,
          tournamentRoundText: `${val.round}`,
          startTime: '',
          state: "DONE",
          participants: newParticipants
        }

        // gameIDs.push(newGame.id);
        if (!val.loss && val.win) {
          newGames.lower.push(newGame);
        } else {
          newGames.upper.push(newGame);
        }
      })
      newGames.upper.forEach((val, i) => {
        const nextMatch = newGames.upper.findIndex(itr => itr.round === val.win?.round && itr.match == val.win?.match);
        const nextLooserMatch = newGames.lower.findIndex(itr => itr.round === val.loss?.round && itr.match == val.loss?.match);
        if (nextMatch >= 0) {
          newGames.upper[i].nextMatchId = newGames.upper[nextMatch].id;
          if (!newGames.upper[nextMatch].up) newGames.upper[nextMatch].up = newGames.upper[i].id;
          else newGames.upper[nextMatch].down = newGames.upper[i].id;
        }
        if (nextLooserMatch >= 0) {
          newGames.upper[i].nextLooserMatchId = newGames.lower[nextLooserMatch].id;
        }
      })
      newGames.lower.forEach((val, i) => {
        const nextUpperMatch = newGames.upper.findIndex(itr => itr.round === val.win?.round && itr.match == val.win?.match),
          nextLowerMatch = newGames.lower.findIndex(itr => itr.round === val.win?.round && itr.match == val.win?.match)
        if (nextUpperMatch >= 0) {
          newGames.lower[i].nextMatchId = newGames.upper[nextUpperMatch].id;
          if (!newGames.upper[nextUpperMatch].up) newGames.upper[nextUpperMatch].up = newGames.lower[i].id;
          else newGames.upper[nextUpperMatch].down = newGames.lower[i].id;
        }
        if (nextLowerMatch >= 0) {
          newGames.lower[i].nextMatchId = newGames.lower[nextLowerMatch].id;
          if (!newGames.lower[nextLowerMatch].up) newGames.lower[nextLowerMatch].up = newGames.lower[i].id;
          else newGames.lower[nextLowerMatch].down = newGames.lower[i].id;
        }
      })
      return newGames;
    } else if (type === 2) {  //* Ladder Elimination
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
          eid: eid,
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
    close: (e) => {
      setOpen(false);
    },
    save: async (e) => {
      if (!games) return;
      setSaving(true);
      let saved = true;

      if (event.events[eid].format == 0) {
        for (let i = 0; i < games.length; i++) {
          const val = games[i];
          const res = await match.update(val.id, val);
          if (res.code == 'failed') {
            saved = false;
            console.warn('Match save error:', val);
          }
        }
      }

      if (saved) {
        const res = await event.update(eid, { status: 1 });
        if (res.code === 'succeed') {
          // match.read(eid);
          alert('Saved successfully!');
        }
      }
      setSaving(false);
    },
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
        console.log(ind, team?.teams[games[ind]?.participants[0]?.id])
        setSelectedGame(ind);
        setOpen(true);
        // newGames[ind].participants[participant].isWinner = true;
        // newGames[ind].participants[participant].resultText = 'WON';
        // newGames[ind].participants[participant].status = 'DONE';
        // newGames[ind].participants[1 - participant].isWinner = false;
        // newGames[ind].participants[1 - participant].resultText = 'LOST';
        // newGames[ind].participants[1 - participant].status = 'DONE';

        // let nextIndex = -1;
        // if (newGames[ind].nextMatchId) {
        //   nextIndex = _.findIndex(games, (val) => val?.id === newGames[ind].nextMatchId, ind);
        // }

        // if (nextIndex >= 0) {
        //   if (newGames[nextIndex]?.participants.length == 0) newGames[nextIndex].participants = [{}, {}];

        //   const newParticipant = {
        //     ...newGames[ind].participants[participant],
        //     round: newGames[ind].participants[participant].round + 1,
        //     isWinner: false,
        //     resultText: '',
        //     status: null
        //   }

        //   if (newGames[ind - 1]?.nextMatchId === newGames[nextIndex]?.id) {
        //     newGames[nextIndex].participants[1] = newParticipant;
        //   } else if (newGames[ind + 1]?.nextMatchId === newGames[nextIndex]?.id) {
        //     newGames[nextIndex].participants[0] = newParticipant;
        //   }

        //   console.warn(newGames[nextIndex].participants)
        // }
        // setGames(newGames);
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
    },
    score1Change: (e) => {
      setScore1(e.target.value);
    },
    score2Change: (e) => {
      setScore2(e.target.value);
    },
    saveScore: (e) => {
      const newGames = [...games];
      const winner = score1 < score2 ? 1 : 0;
      newGames[selectedGame].participants[0].score = score1;
      newGames[selectedGame].participants[0].resultText = score1;
      newGames[selectedGame].participants[0].status = 'DONE';
      newGames[selectedGame].participants[1].score = score2;
      newGames[selectedGame].participants[1].resultText = score2;
      newGames[selectedGame].participants[1].status = 'DONE';
      newGames[selectedGame].participants[winner].isWinner = true;
      newGames[selectedGame].participants[1 - winner].isWinner = false;

      let nextIndex = -1;
      if (newGames[selectedGame].nextMatchId) {
        nextIndex = _.findIndex(games, (val) => val?.id === newGames[selectedGame].nextMatchId);
      }

      if (nextIndex >= 0) {
        if (newGames[nextIndex]?.participants.length == 0) newGames[nextIndex].participants = [{}, {}];

        const newParticipant = {
          ...newGames[selectedGame].participants[winner],
          round: newGames[selectedGame].participants[winner].round + 1,
          isWinner: false,
          score: 0,
          resultText: '',
          status: null
        }

        newGames[nextIndex].participants[1 - newGames[selectedGame].id == newGames[nextIndex].up] = newParticipant;

        console.warn(newGames[nextIndex].participants)
      }
      setGames(newGames);
      setOpen(false);
    }
  }

  return (
    <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
      <Box sx={{ border: `solid 1px rgba(255, 255, 255, 0.2)`, borderRadius: '4px', padding: 3 }}>
        {games && selectedGame >= 0 && <ScoresDialog
          title={'Team scores'}
          onClose={handle.close}
          open={open}
          team1={team?.teams[games[selectedGame]?.participants[0]?.id]}
          team2={team?.teams[games[selectedGame]?.participants[1]?.id]}
          score1={score1}
          score2={score2}
          onScore1Change={handle.score1Change}
          onScore2Change={handle.score2Change}
          onSave={handle.saveScore}
        />}
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
                    onClick={handle.save}
                    disabled={disabled}
                  >
                    Save
                  </Button>
                  <FullCalendar
                    sx={{
                      marginTop: '24px'
                    }}
                    events={events}
                    setEvents={setEvents}
                    selectable={true}
                    editable={true}
                  />
                </Box>
                :
                <Grid container spacing={2} rowSpacing={3}>
                  <Grid item xs={12}>
                    {event?.events[eid]?.status == 0 &&
                      <Button
                        variant='contained'
                        onClick={handle.buildTemplate}
                        disabled={disabled}
                      >
                        Build Template
                      </Button>}
                    <LoadingButton
                      loading={saving}
                      variant='contained'
                      onClick={handle.save}
                      disabled={disabled}
                      sx={{ ml: 2 }}
                    >
                      Save
                    </LoadingButton>
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
