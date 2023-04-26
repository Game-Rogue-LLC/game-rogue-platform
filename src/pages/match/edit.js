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
  const [saving, setSaving] = useState(false);
  const [selectedGame, setSelectedGame] = useState(0);
  const [open, setOpen] = useState(false);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [isUpper, setUpper] = useState(true);

  useEffect(() => {
    setTitle('EDIT MATCHES');
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
      if (event.events[eid].format == 0) {
        setGames(newMatches);
      } else if (event.events[eid].format === 1) {
        setGames({
          upper: [...newMatches.filter(val => val.group == 0)],
          lower: [...newMatches.filter(val => val.group == 1)]
        })
      }
    }
  }, [match.matches, matchLoading])

  const handle = {
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
          match.read(eid);
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

      if (ind >= 0) {
        setSelectedGame(ind);
        setOpen(true);
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

      // let newGames = { ...games }, participant = 0;
      // if (party.id === games.upper[indexInUpper]?.participants[0]?.id || party.id === games.lower[indexInLower]?.participants[0]?.id) participant = 0;
      // else if (party.id === games.upper[indexInUpper]?.participants[1]?.id || party.id === games.lower[indexInLower]?.participants[1]?.id) participant = 1;

      if (indexInUpper >= 0) {
        setSelectedGame(indexInUpper);
        setUpper(true);
        setOpen(true);
      }

      if (indexInLower >= 0) {
        setSelectedGame(indexInLower);
        setUpper(false);
        setOpen(true);
      }
    },
    score1Change: (e) => {
      setScore1(e.target.value);
    },
    score2Change: (e) => {
      setScore2(e.target.value);
    },
    saveScore: (e) => {
      const winner = score1 < score2 ? 1 : 0;

      if (event.events[eid].format == 0) {
        let newGames = [...games];
        newGames[selectedGame].participants[0].score = score1;
        newGames[selectedGame].participants[0].resultText = '' + score1;
        newGames[selectedGame].participants[0].status = 'DONE';
        newGames[selectedGame].participants[1].score = score2;
        newGames[selectedGame].participants[1].resultText = '' + score2;
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

          console.log('newParticipant', newParticipant);
          if (newGames[selectedGame].id == newGames[nextIndex].up)
            newGames[nextIndex].participants[0] = newParticipant;
          else newGames[nextIndex].participants[1] = newParticipant;

          console.warn(newGames[nextIndex].participants)
        }
        setGames(newGames);
      } else if (event.events[eid].format == 1) {
        let newGames = { ...games };
        if (isUpper) {
          newGames.upper[selectedGame].participants[winner].isWinner = true;
          newGames.upper[selectedGame].participants[1 - winner].isWinner = false;
          newGames.upper[selectedGame].participants[0].resultText = '' + score1;
          newGames.upper[selectedGame].participants[0].status = 'DONE';
          newGames.upper[selectedGame].participants[1].resultText = '' + score2;
          newGames.upper[selectedGame].participants[1].status = 'DONE';

          let nextIndex = -1, nextLooserIndex = -1;

          if (games.upper[selectedGame].nextMatchId) {
            nextIndex = _.findIndex(games.upper, (val) => val?.id === newGames.upper[selectedGame].nextMatchId);
            if (nextIndex < 0) nextIndex = _.findIndex(games.lower, (val) => val?.id === newGames.upper[selectedGame].nextMatchId);
          }
          if (games.upper[selectedGame].nextLooserMatchId) {
            nextLooserIndex = _.findIndex(games.lower, (val) => val?.id === newGames.upper[selectedGame].nextLooserMatchId);
          }

          if (nextIndex >= 0) {
            const newParticipant = {
              ...newGames.upper[selectedGame].participants[winner],
              round: newGames.upper[selectedGame].participants[winner].round + 1,
              isWinner: false,
              resultText: '',
              status: null
            }
            if (newGames.upper[nextIndex]?.id == newGames.upper[selectedGame].nextMatchId) {
              if (newGames.upper[nextIndex]?.participants.length == 0) newGames.upper[nextIndex].participants = [{}, {}];

              if (newGames.upper[selectedGame]?.id === newGames.upper[nextIndex]?.up) {
                newGames.upper[nextIndex].participants[0] = newParticipant;
              } else {
                newGames.upper[nextIndex].participants[1] = newParticipant;
              }
            }
            // if (newGames.lower[nextIndex]?.id == newGames.upper[selectedGame].nextMatchId) {
            //   if (newGames.lower[nextIndex]?.participants.length == 0) newGames.lower[nextIndex].participants = [{}, {}];
            //   newGames.lower[nextIndex].participants[0] = newParticipant;
          }

          if (nextLooserIndex >= 0) {
            const newParticipant = {
              ...newGames.upper[selectedGame].participants[1 - winner],
              round: newGames.upper[selectedGame].participants[1 - winner].round + 1,
              isWinner: false,
              resultText: '',
              status: null
            }

            if (newGames.lower[nextLooserIndex].participants.length == 0) newGames.lower[nextLooserIndex].participants = [{}, {}];

            if (newGames.upper[selectedGame]?.id == newGames.lower[nextLooserIndex].up) {
              newGames.lower[nextLooserIndex].participants[0] = newParticipant;
            } else {
              newGames.lower[nextLooserIndex].participants[1] = newParticipant;
            }
          }
        } else {
          newGames.lower[selectedGame].participants[winner].isWinner = true;
          newGames.lower[selectedGame].participants[1 - winner].isWinner = false;
          newGames.lower[selectedGame].participants[0].resultText = '' + score1;
          newGames.lower[selectedGame].participants[0].status = 'DONE';
          newGames.lower[selectedGame].participants[1].resultText = '' + score2;
          newGames.lower[selectedGame].participants[1].status = 'DONE';

          let nextIndex = -1;

          if (games.lower[selectedGame].nextMatchId) {
            nextIndex = _.findIndex(games.lower, (val) => val?.id === newGames.lower[selectedGame].nextMatchId);
            if (nextIndex < 0) nextIndex = _.findIndex(games.upper, (val) => val?.id === newGames.lower[selectedGame].nextMatchId);
          }

          if (nextIndex >= 0) {
            const newParticipant = {
              ...newGames.lower[selectedGame].participants[winner],
              round: newGames.lower[selectedGame].participants[winner].round + 1,
              isWinner: false,
              resultText: '',
              status: null
            }

            if (newGames.lower[nextIndex]?.id == newGames.lower[selectedGame].nextMatchId) {
              if (newGames.lower[nextIndex].participants.length == 0) newGames.lower[nextIndex].participants = [{}, {}];
              if (newGames.lower[selectedGame].id == newGames.lower[nextIndex].up)
                newGames.lower[nextIndex].participants[0] = newParticipant;
              else
                newGames.lower[nextIndex].participants[1] = newParticipant;
            }
            if (newGames.upper[nextIndex]?.id == newGames.lower[selectedGame].nextMatchId) {
              if (newGames.upper[nextIndex].participants.length == 0) newGames.upper[nextIndex].participants = [{}, {}];
              if (newGames.lower[selectedGame].id == newGames.upper[nextIndex].up)
                newGames.upper[nextIndex].participants[0] = newParticipant;
              else
                newGames.upper[nextIndex].participants[1] = newParticipant;
            }
          }
        }
        setOpen(false);
        setGames(newGames);
      }
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
            <LoadingButton
              loading={saving}
              variant='contained'
              onClick={handle.save}
              disabled={disabled}
            >
              Save
            </LoadingButton>
          </Box>
          <Box sx={{ overflow: 'auto', flex: 1, border: 'solid 1px rgba(255, 255, 255, 0.2)', minHeight: '300px', borderRadius: '4px' }}>
            {
              event?.events[eid] && event.events[eid].format == 2
                ?
                <DemoFullCalendar
                  sx={{
                    marginTop: '24px'
                  }}
                  events={events}
                  setEvents={setEvents}
                />
                :
                (games && event?.events[eid]?.format == 0
                  ?
                  <SingleEliminationBracket matches={games} handlePartyClick={handle.singlePartyClick} />
                  :
                  event?.events[eid]?.format == 1
                    ?
                    <DoubleEliminationBracket matches={games} handlePartyClick={handle.doublePartyClick} />
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
