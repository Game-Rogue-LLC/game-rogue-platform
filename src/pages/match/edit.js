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
} from "@mui/material";
import { DoubleElimination, SingleElimination, Stepladder } from "tournament-pairings";
import {
  EVENT_FORMATS,
  EVENT_STATES,
  MATCH_STATES,
  SCORE_DRAW,
  SCORE_LOSE,
  SCORE_WIN
} from "@/src/config/global";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import CustomLoadingButton from "@/src/components/button/CustomLoadingButton";
import DatePickDialog from "@/src/components/dialog/DatePickDialog";
import DatePicker from "@/src/components/datetime/DatePicker";
import DoubleEliminationBracket from "@/src/components/tournament-bracket/DoubleEliminationBracket";
import FullCalendar from "@/src/components/datetime/FullCalendar.js";
import LadderEliminationBracket from "@/src/components/tournament-bracket/LadderEliminationBracket";
import { LoadingButton } from "@mui/lab";
import { NULL_FUNCTION } from "@/src/config/global";
import ScoresDialog from "@/src/components/dialog/ScoresDialog";
import SingleEliminationBracket from "@/src/components/tournament-bracket/SingleEliminationBracket";
import _ from "lodash";
import { enqueueSnackbar } from "notistack";
import { nanoid } from "nanoid";
import { useAppContext } from "@/src/context/app";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { setColors } = useStyleContext();
  const { organizer, event, team, match, matchLoading } = useTournamentContext();
  const [matches, setMatches] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [eid, setEID] = useState(router?.query.event);
  const [events, setEvents] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(0);
  const [openDatePick, setOpenDatePick] = useState(false);
  const [openScores, setOpenScores] = useState(false);
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);
  const [isUpper, setUpper] = useState(true);
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [saving, setSaving] = useState(false);
  const [changingStatus, setChangingStatus] = useState(false);

  useEffect(() => {
    setTitle("EDIT MATCHES");
    // const timer = setInterval(() => {
    //   const currentTime = new Date().getTime();
    //   match?.matches.forEach(async val => {
    //     if (val.start.getTime() - currentTime < 0) {
    //       await match.update(val.id, { status: MATCH_STATES.STARTED.value });
    //     }
    //     if (val.end.getTime() - currentTime < 0) {
    //       await match.update(val.id, { status: MATCH_STATES.FINISHED.value });
    //     }
    //   })
    // }, 60000)

    // return () => {
    //   clearInterval(timer);
    // }
  }, []);

  useEffect(() => {
    if (router?.query?.event) {
      const newEID = router.query.event;
      if (event?.events && event.events[newEID]) {
        setEID(newEID);
        event.setCurrent(newEID);
        organizer.setCurrent(event.events[newEID]?.oid);
      } else {
        console.warn("Invalid Event ID");
        // TODO: Redirect to 404 page.
      }
    }
  }, [router]);

  useEffect(() => {
    if (matchLoading == false && match.matches && match.matches.length > 0) {
      const newMatches = _.sortBy(
        match.matches.filter((val) => val.eid === eid),
        ["round", "match"]
      );
      setMatches(newMatches);
      // if (event.events[eid].format == 0) {
      //   setMatches(newMatches);
      // } else if (event.events[eid].format === 1) {
      //   setMatches({
      //     upper: [...newMatches.filter(val => val.group == 0)],
      //     lower: [...newMatches.filter(val => val.group == 1)]
      //   })
      // }
    }
  }, [eid, match.matches, matchLoading]);

  useEffect(() => {
    if (event?.events[eid]) {
      setColors({
        primary: event.events[eid].primary,
        secondary: event.events[eid].secondary,
        tertiary: event.events[eid].tertiary
      });
    }
  }, [eid, event?.events]);

  const initializeDates = () => {
    setStart(new Date());
    setEnd(new Date());
  };

  const initializeScores = () => {
    setScore1(0);
    setScore2(0);
  };

  const doubleEliminationMatches = useMemo(() => {
    if (matches) {
      return {
        upper: [...matches.filter((val) => val.group == 0)],
        lower: [...matches.filter((val) => val.group == 1)]
      };
    }
  }, [matches]);

  const handle = {
    finishScheduling: async (e) => {
      setChangingStatus(true);
      if (confirm("Do you really want to finish scheduling this event?")) {
        // for (let i = 0; i < matches.length; i++) {
        //   const res = await match.update(matches[i].id, {
        //     status: MATCH_STATES.SCHEDULED.value,
        //   });
        // }
        const res = await event.update(eid, {
          status: EVENT_STATES.SCHEDULED.value
        });
        if (res.code === "succeed") {
          enqueueSnackbar("Scheduled successfully!", { variant: "success" });
        }
      }
      setChangingStatus(false);
    },
    startEvent: async (e) => {
      setChangingStatus(true);
      if (confirm("Do you really want to start this event?")) {
        // for (let i = 0; i < matches.length; i++) {
        //   const res = await match.update(matches[i].id, {
        //     status: MATCH_STATES.STARTED.value,
        //   });
        // }
        const res = await event.update(eid, {
          status: EVENT_STATES.STARTED.value
        });
        if (res.code === "succeed") {
          enqueueSnackbar("Event started!", { variant: "success" });
        }
      }
      setChangingStatus(false);
    },
    finishEvent: async (e) => {
      setChangingStatus(true);
      if (confirm("Do you really want to finish this event?")) {
        for (let i = 0; i < matches.length; i++) {
          const res = await match.update(matches[i].id, {
            status: MATCH_STATES.FINISHED.value
          });
        }
        const res = await event.update(eid, {
          status: EVENT_STATES.FINISHED.value
        });
        if (res.code === "succeed") {
          enqueueSnackbar("Event finished!", { variant: "success" });
        }
      }
      setChangingStatus(false);
    },
    save: async (e) => {
      const { format } = event.events[eid];
      setSaving(true);
      let saved = true,
        currentRound = 1;

      if (format == 0 || format == 1) {
        if (!matches) {
          setSaving(false);
          return;
        }
        for (let i = 0; i < matches.length; i++) {
          const val = matches[i];
          if (val.state === "DONE") currentRound = val.round;
          const res = await match.update(val.id, val);
          if (res.code == "failed") {
            saved = false;
            console.warn("Match save error:", val);
          }
        }
      }

      event.update(eid, { currentRound });

      if (saved) {
        // const res = await event.update(eid, { status: 1 });
        // if (res.code === 'succeed') {
        enqueueSnackbar("Saved successfully!", { variant: "success" });
        // }
      }
      setSaving(false);
    },
    matchClick: (match) => {
      const index = _.findIndex(matches, (val) => val.id == match.id);

      // if (ind < 0 || matches[ind]?.participants?.filter(val => val.id ? true : false).length < 2) return;

      if (index >= 0) {
        setSelectedMatch(index);
        if (matches[index].status === MATCH_STATES.FINISHED.value) {
          setTeam1(team?.teams[matches[index].participants[0].id]);
          setTeam2(team?.teams[matches[index].participants[1].id]);
          setScore1(matches[index].participants[0].score || 0);
          setScore2(matches[index].participants[1].score || 0);
          setOpenScores(true);
        } else setOpenDatePick(true);
      }
    },
    doubleMatchClick: (match) => {
      const indexInUpper = _.findIndex(matches.upper, (val) => val.id == match.id);
      const indexInLower = _.findIndex(matches.lower, (val) => val.id == match.id);

      // if (matches.upper[indexInUpper]?.participants?.filter(val => val.id ? true : false).length < 2) return;
      // if (matches.lower[indexInLower]?.participants?.filter(val => val.id ? true : false).length < 2) return;

      // let newGames = { ...matches }, participant = 0;
      // if (party.id === matches.upper[indexInUpper]?.participants[0]?.id || party.id === matches.lower[indexInLower]?.participants[0]?.id) participant = 0;
      // else if (party.id === matches.upper[indexInUpper]?.participants[1]?.id || party.id === matches.lower[indexInLower]?.participants[1]?.id) participant = 1;

      if (indexInUpper >= 0) {
        setSelectedMatch(indexInUpper);
        setUpper(true);
        setStart(matches.upper[indexInUpper].start || new Date());
        setEnd(matches.upper[indexInUpper].end || new Date());
        setOpenDatePick(true);
        return;
      }

      if (indexInLower >= 0) {
        setSelectedMatch(indexInLower);
        setUpper(false);
        setStart(matches.lower[indexInLower].start || new Date());
        setEnd(matches.lower[indexInLower].end || new Date());
        setOpenDatePick(true);
        return;
      }
    },
    startChange: (newValue) => {
      const newDate = new Date(newValue);
      setStart(newDate);
    },
    endChange: (newValue) => {
      const newDate = new Date(newValue);
      setEnd(newDate);
    },
    closeDatePick: (e) => {
      setOpenDatePick(false);
    },
    saveDates: (e) => {
      const { format } = event.events[eid];
      let newGames;
      if (format == 0 || format == 1) {
        newGames = [...matches];
        newGames[selectedMatch] = {
          ...newGames[selectedMatch],
          start,
          end
        };
      }
      // else if (format == 1) {
      //   newGames = { ...matches }
      //   if (isUpper)
      //     newGames.upper[selectedMatch] = {
      //       ...newGames.upper[selectedMatch],
      //       start,
      //       end
      //     }
      //   else
      //     newGames.lower[selectedMatch] = {
      //       ...newGames.lower[selectedMatch],
      //       start,
      //       end
      //     }
      // } else if (format == 2) {
      // }
      setMatches(newGames);
      setOpenDatePick(false);
      initializeDates();
    },
    partyClick: (party, partyWon) => {
      const index = _.findLastIndex(
        matches,
        (val) =>
          (val.participants[0]?.id == party.id && val.participants[0]?.round == party.round) ||
          (val.participants[1]?.id == party.id && val.participants[1]?.round == party.round)
      );

      if (
        index < 0 ||
        matches[index]?.participants?.filter((val) => (val.id ? true : false)).length < 2
      )
        return;

      if (index >= 0) {
        setTeam1(team?.teams[matches[index].participants[0]?.id]);
        setTeam2(team?.teams[matches[index].participants[1]?.id]);
        setScore1(matches[index].participants[0].score || 0);
        setScore2(matches[index].participants[1].score || 0);
        setSelectedMatch(index);
        setOpenScores(true);
      }
    },
    doublePartyClick: (party, partyWon) => {
      if (party.status === "DONE") return;

      const indexInUpper = _.findLastIndex(
        matches.upper,
        (val) =>
          (val.participants[0]?.id == party.id && val.participants[0]?.round == party.round) ||
          (val.participants[1]?.id == party.id && val.participants[1]?.round == party.round)
      );
      const indexInLower = _.findLastIndex(
        matches.lower,
        (val) =>
          (val.participants[0]?.id == party.id && val.participants[0]?.round == party.round) ||
          (val.participants[1]?.id == party.id && val.participants[1]?.round == party.round)
      );

      if (
        matches.upper[indexInUpper]?.participants?.filter((val) => (val.id ? true : false)).length <
        2
      )
        return;
      if (
        matches.lower[indexInLower]?.participants?.filter((val) => (val.id ? true : false)).length <
        2
      )
        return;

      // let newGames = { ...matches }, participant = 0;
      // if (party.id === matches.upper[indexInUpper]?.participants[0]?.id || party.id === matches.lower[indexInLower]?.participants[0]?.id) participant = 0;
      // else if (party.id === matches.upper[indexInUpper]?.participants[1]?.id || party.id === matches.lower[indexInLower]?.participants[1]?.id) participant = 1;

      if (indexInUpper >= 0) {
        setTeam1(team?.teams[matches.upper[indexInUpper]?.participants[0]?.id]);
        setTeam2(team?.teams[matches.upper[indexInUpper]?.participants[1]?.id]);
        setSelectedMatch(indexInUpper);
        setUpper(true);
        setOpenScores(true);
      }

      if (indexInLower >= 0) {
        setTeam1(team?.teams[matches.lower[indexInLower]?.participants[0]?.id]);
        setTeam2(team?.teams[matches.lower[indexInLower]?.participants[1]?.id]);
        setSelectedMatch(indexInLower);
        setUpper(false);
        setOpenScores(true);
      }
    },
    score1Change: (e) => {
      setScore1(Number(e.target.value));
    },
    score2Change: (e) => {
      setScore2(Number(e.target.value));
    },
    closeScores: (e) => {
      setOpenScores(false);
      initializeScores();
    },
    saveScore: (e) => {
      const winner = score1 < score2 ? 1 : 0;
      const { format } = event.events[eid];
      let newGames = [...matches];

      newGames[selectedMatch].participants[0].state = "DONE";
      newGames[selectedMatch].participants[0].score = score1;
      newGames[selectedMatch].participants[0].resultText = score1;
      newGames[selectedMatch].participants[0].status = "DONE";
      newGames[selectedMatch].participants[1].score = score2;
      newGames[selectedMatch].participants[1].resultText = score2;
      newGames[selectedMatch].participants[1].status = "DONE";
      newGames[selectedMatch].participants[winner].isWinner = true;
      newGames[selectedMatch].participants[1 - winner].isWinner = false;
      // * Let the match only finishes by the current time, not the scores or other factors.
      // newGames[selectedMatch].status = MATCH_STATES.FINISHED.value;

      const newEventParticipant = [...event.events[eid].participants],
        player1 = newEventParticipant.findIndex(
          (val) => val.id === newGames[selectedMatch].participants[0].id
        ),
        player2 = newEventParticipant.findIndex(
          (val) => val.id === newGames[selectedMatch].participants[1].id
        );
      if (score1 > score2) {
        newEventParticipant[player1].score += SCORE_WIN;
        newEventParticipant[player1].wins++;
        newEventParticipant[player2].score += SCORE_LOSE;
        newEventParticipant[player2].loses++;
      } else if (score1 === score2) {
        newEventParticipant[player1].score += SCORE_DRAW;
        newEventParticipant[player1].draws++;
        newEventParticipant[player2].score += SCORE_DRAW;
        newEventParticipant[player2].draws++;
      } else {
        newEventParticipant[player1].score += SCORE_LOSE;
        newEventParticipant[player1].loses++;
        newEventParticipant[player2].score += SCORE_WIN;
        newEventParticipant[player2].wins++;
      }
      event.update(eid, { participants: newEventParticipant });

      if (format == 0) {
        let nextIndex = -1;
        if (newGames[selectedMatch].nextMatchId) {
          nextIndex = _.findIndex(
            newGames,
            (val) => val?.id === newGames[selectedMatch].nextMatchId
          );
        }

        if (nextIndex >= 0) {
          if (newGames[nextIndex]?.participants.length == 0)
            newGames[nextIndex].participants = [{}, {}];

          const newParticipant = {
            ...newGames[selectedMatch].participants[winner],
            round: newGames[selectedMatch].participants[winner].round + 1,
            isWinner: false,
            score: 0,
            resultText: "",
            status: null
          };

          if (newGames[selectedMatch].id == newGames[nextIndex].up)
            newGames[nextIndex].participants[0] = newParticipant;
          else newGames[nextIndex].participants[1] = newParticipant;
        }
      } else if (format == 1) {
        // if (newGames[selectedMatch].group == 0) {
        let nextIndex = -1,
          nextLooserIndex = -1;

        if (newGames[selectedMatch].nextMatchId) {
          nextIndex = _.findIndex(
            newGames,
            (val) => val?.id === newGames[selectedMatch].nextMatchId
          );
        }
        if (newGames[selectedMatch].nextLooserMatchId) {
          nextLooserIndex = _.findIndex(
            newGames,
            (val) => val?.id === newGames[selectedMatch].nextLooserMatchId
          );
        }

        if (nextIndex >= 0) {
          const newParticipant = {
            ...newGames[selectedMatch].participants[winner],
            round: newGames[selectedMatch].participants[winner].round + 1,
            isWinner: false,
            resultText: "",
            status: null
          };
          if (newGames[nextIndex]?.id == newGames[selectedMatch].nextMatchId) {
            if (newGames[nextIndex]?.participants.length == 0)
              newGames[nextIndex].participants = [{}, {}];

            if (newGames[selectedMatch]?.id === newGames[nextIndex]?.up) {
              newGames[nextIndex].participants[0] = newParticipant;
            } else {
              newGames[nextIndex].participants[1] = newParticipant;
            }
          }
          // if (newGames.lower[nextIndex]?.id == newGames.upper[selectedMatch].nextMatchId) {
          //   if (newGames.lower[nextIndex]?.participants.length == 0) newGames.lower[nextIndex].participants = [{}, {}];
          //   newGames.lower[nextIndex].participants[0] = newParticipant;
        }

        if (nextLooserIndex >= 0) {
          const newParticipant = {
            ...newGames[selectedMatch].participants[1 - winner],
            round: newGames[selectedMatch].participants[1 - winner].round + 1,
            isWinner: false,
            resultText: "",
            status: null
          };

          if (newGames[nextLooserIndex].participants.length == 0)
            newGames[nextLooserIndex].participants = [{}, {}];

          if (newGames[selectedMatch]?.id == newGames[nextLooserIndex].up) {
            newGames[nextLooserIndex].participants[0] = newParticipant;
          } else {
            newGames[nextLooserIndex].participants[1] = newParticipant;
          }
        }
        // }
        // else {
        //   let nextIndex = -1;

        //   if (matches.lower[selectedMatch].nextMatchId) {
        //     nextIndex = _.findIndex(matches.lower, (val) => val?.id === newGames.lower[selectedMatch].nextMatchId);
        //     if (nextIndex < 0) nextIndex = _.findIndex(matches.upper, (val) => val?.id === newGames.lower[selectedMatch].nextMatchId);
        //   }

        //   if (nextIndex >= 0) {
        //     const newParticipant = {
        //       ...newGames.lower[selectedMatch].participants[winner],
        //       round: newGames.lower[selectedMatch].participants[winner].round + 1,
        //       isWinner: false,
        //       resultText: '',
        //       status: null
        //     }

        //     if (newGames.lower[nextIndex]?.id == newGames.lower[selectedMatch].nextMatchId) {
        //       if (newGames.lower[nextIndex].participants.length == 0) newGames.lower[nextIndex].participants = [{}, {}];
        //       if (newGames.lower[selectedMatch].id == newGames.lower[nextIndex].up)
        //         newGames.lower[nextIndex].participants[0] = newParticipant;
        //       else
        //         newGames.lower[nextIndex].participants[1] = newParticipant;
        //     }
        //     if (newGames.upper[nextIndex]?.id == newGames.lower[selectedMatch].nextMatchId) {
        //       if (newGames.upper[nextIndex].participants.length == 0) newGames.upper[nextIndex].participants = [{}, {}];
        //       if (newGames.lower[selectedMatch].id == newGames.upper[nextIndex].up)
        //         newGames.upper[nextIndex].participants[0] = newParticipant;
        //       else
        //         newGames.upper[nextIndex].participants[1] = newParticipant;
        //     }
        //   }
        // }
      }
      setOpenScores(false);
      setMatches(newGames);
    }
  };

  return (
    <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
      <Box
        sx={{
          border: `solid 1px rgba(255, 255, 255, 0.2)`,
          borderRadius: "4px",
          padding: 3
        }}
      >
        {matches && selectedMatch >= 0 && (
          <ScoresDialog
            title={"Team scores"}
            onClose={handle.closeScores}
            open={openScores}
            team1={team1}
            team2={team2}
            score1={score1}
            score2={score2}
            onScore1Change={handle.score1Change}
            onScore2Change={handle.score2Change}
            onSave={handle.saveScore}
            editable={matches[selectedMatch].status !== MATCH_STATES.FINISHED.value}
          />
        )}
        <DatePickDialog
          title={"Select Date/Time"}
          start={start}
          end={end}
          onStartChange={handle.startChange}
          onEndChange={handle.endChange}
          onClose={handle.closeDatePick}
          onSave={handle.saveDates}
          open={openDatePick}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
          <Box
            sx={{
              width: "300px",
              display: "flex",
              flexDirection: "column",
              gap: 3
            }}
          >
            <Typography variant="h5">Event Details</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "130px" }}>
                <Typography variant="h6">Name:</Typography>
              </Box>
              <Box>
                <Typography variant="body1">{event?.events[eid]?.name}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "130px" }}>
                <Typography variant="h6">Format:</Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  {EVENT_FORMATS[event?.events[eid]?.format].name}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "130px" }}>
                <Typography variant="h6">Seeding:</Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  {event?.events[eid]?.seeding ? "Random" : "Manual"}
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "130px" }}>
                <Typography variant="h6">Participants:</Typography>
              </Box>
              <Box>
                <Typography variant="body1">{event?.events[eid]?.participantsCount}</Typography>
              </Box>
            </Box>
            {event?.events[eid]?.status != EVENT_STATES.SCHEDULED.value &&
              event.events[eid]?.status != EVENT_STATES.FINISHED.value && (
                <CustomLoadingButton
                  loading={saving}
                  variant="contained"
                  onClick={handle.save}
                  disabled={disabled}
                >
                  Save
                </CustomLoadingButton>
              )}
            {event?.events[eid]?.status == EVENT_STATES.SCHEDULING.value && (
              <CustomLoadingButton
                loading={changingStatus}
                variant="contained"
                onClick={handle.finishScheduling}
                disabled={disabled}
              >
                Finish Scheduling
              </CustomLoadingButton>
            )}
            {event?.events[eid]?.status == EVENT_STATES.SCHEDULED.value && (
              <CustomLoadingButton
                loading={changingStatus}
                variant="contained"
                onClick={handle.startEvent}
                disabled={disabled}
              >
                Start Event
              </CustomLoadingButton>
            )}
            {event?.events[eid]?.status == EVENT_STATES.STARTED.value && (
              <CustomLoadingButton
                loading={changingStatus}
                variant="contained"
                onClick={handle.finishEvent}
                disabled={disabled}
              >
                Finish Event
              </CustomLoadingButton>
            )}
          </Box>
          <Box
            sx={{
              overflow: "auto",
              flex: 1,
              border: "solid 1px rgba(255, 255, 255, 0.2)",
              minHeight: "300px",
              borderRadius: "4px"
            }}
          >
            {event?.events[eid] && event.events[eid].format == 2 ? (
              <FullCalendar
                sx={{
                  marginTop: "24px"
                }}
                events={events}
                setEvents={setEvents}
                selectable={true}
                editable={true}
              />
            ) : (
              matches &&
              (event?.events[eid]?.format == 0 ? (
                <SingleEliminationBracket
                  matches={matches}
                  handleMatchClick={
                    event.events[eid].status == 1 || event.events[eid].status == 3
                      ? handle.matchClick
                      : null
                  }
                  handlePartyClick={event.events[eid].status == 3 ? handle.partyClick : null}
                />
              ) : event?.events[eid]?.format == 1 ? (
                <DoubleEliminationBracket
                  matches={doubleEliminationMatches}
                  handleMatchClick={
                    event.events[eid].status == 1 || event.events[eid].status == 3
                      ? handle.matchClick
                      : null
                  }
                  handlePartyClick={event.events[eid].status == 3 ? handle.partyClick : null}
                />
              ) : (
                <></>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
