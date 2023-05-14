import { useEffect, useState } from "react";
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
  useTheme,
} from "@mui/material";
import { useRouter } from "next/router";
import { LoadingButton } from "@mui/lab";
import _, { template } from "lodash";

import AdminLayout from "@/src/content/AdminLayout";
import { useAppContext } from "@/src/context/app";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { EVENT_FORMATS, EVENT_STATES, MATCH_STATES } from "@/src/config/global";
import {
  DoubleElimination,
  SingleElimination,
  Stepladder,
} from "tournament-pairings";
import { nanoid } from "nanoid";
import SingleEliminationBracket from "@/src/components/tournament-bracket/SingleEliminationBracket";
import DoubleEliminationBracket from "@/src/components/tournament-bracket/DoubleEliminationBracket";
import LadderEliminationBracket from "@/src/components/tournament-bracket/LadderEliminationBracket";
import FullCalendar from "@/src/components/datetime/FullCalendar.js";
import { useStyleContext } from "@/src/context/StyleContext";

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { setColors, buttonStyle } = useStyleContext();
  const { organization, event, team, match } = useTournamentContext();
  const [games, setGames] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [eid, setEID] = useState(router?.query.event);
  const [events, setEvents] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setTitle("ORGANIZE MATCHES");
  }, []);

  useEffect(() => {
    if (router?.query?.event) {
      const newEID = router.query.event;
      if (event?.events && event.events[newEID]) {
        // * Redirect to match/index page if the matches are created.
        if (event.events[newEID].status) {
          router.push("/match?event=" + newEID);
        }

        setEID(newEID);
        event.setCurrent(newEID);
        organization.setCurrent(event.events[newEID]?.oid);
      } else {
        console.error("Invalid Event ID");
        // TODO: Redirect to 404 page.
      }
    }
  }, [router?.query?.event]);

  useEffect(() => {
    if (event?.events[eid]) {
      setColors({
        primary: event.events[eid].primary,
        secondary: event.events[eid].secondary,
        tertiary: event.events[eid].tertiary,
      });
    }
  }, [eid, event?.events]);

  const createMatches = (
    type,
    teams,
    participants,
    participantsCount,
    randomized
  ) => {
    if (type === 0) {
      // * Single Elimination Bracket
      let newGames = []; //, gameIDs = []
      const matches = SingleElimination(randomized);
      matches.forEach((val, i) => {
        let newParticipants = [];

        if (val.player1 && participants[val.player1 - 1]) {
          newParticipants.push({
            id: participants[val.player1 - 1].tid,
            round: val.round,
            resultText: "",
            isWinner: false,
            status: null,
            score: 0,
            wins: 0,
            loses: 0,
            draws: 0,
            name: teams[participants[val.player1 - 1].tid].name,
          });
        }

        if (val.player2 && participants[val.player2 - 1]) {
          newParticipants.push({
            id: participants[val.player2 - 1].tid,
            round: val.round,
            resultText: "",
            isWinner: false,
            status: null,
            score: 0,
            wins: 0,
            loses: 0,
            draws: 0,
            name: teams[participants[val.player2 - 1].tid].name,
          });
        }

        const newGame = {
          ...val,
          id: nanoid(),
          name: "",
          eid: eid,
          nextMatchId: null,
          up: null,
          down: null,
          tournamentRoundText: `${val.round}`,
          startTime: "",
          state: "DONE",
          participants: newParticipants,
          createdAt: new Date(),
        };

        // gameIDs.push(newGame.id);
        newGames.push(newGame);
      });
      matches.forEach((val, i) => {
        const nextMatch = matches.findIndex(
          (itr) => itr.round === val.win?.round && itr.match == val.win?.match
        );
        if (nextMatch >= 0) {
          newGames[i].nextMatchId = newGames[nextMatch].id;
          if (!newGames[nextMatch].up) newGames[nextMatch].up = newGames[i].id;
          else newGames[nextMatch].down = newGames[i].id;
        }
      });
      return newGames;
    } else if (type === 1) {
      // * Double Elimination Bracket
      let newGames = {
        upper: [],
        lower: [],
      };
      // let gameIDs = []
      const matches = DoubleElimination(randomized);
      matches.forEach((val, i) => {
        let newParticipants = [];

        if (val.player1 && participants[val.player1 - 1]) {
          newParticipants.push({
            id: participants[val.player1 - 1].tid,
            round: val.round,
            resultText: "",
            isWinner: false,
            status: null,
            score: 0,
            wins: 0,
            loses: 0,
            draws: 0,
            name: teams[participants[val.player1 - 1].tid].name,
          });
        }

        if (val.player2 && participants[val.player2 - 1]) {
          newParticipants.push({
            id: participants[val.player2 - 1].tid,
            round: val.round,
            resultText: "",
            isWinner: false,
            status: null,
            score: 0,
            wins: 0,
            loses: 0,
            draws: 0,
            name: teams[participants[val.player2 - 1].tid].name,
          });
        }

        const newGame = {
          ...val,
          id: nanoid(),
          name: "",
          eid: eid,
          nextMatchId: null,
          nextLooserMatchId: null,
          up: null,
          down: null,
          tournamentRoundText: `${val.round}`,
          startTime: "",
          state: "DONE",
          participants: newParticipants,
        };

        // gameIDs.push(newGame.id);
        if (!val.loss && val.win) {
          newGames.lower.push({ ...newGame, group: 1 }); // group = 0 : Upper, group = 1: Lower
        } else {
          newGames.upper.push({ ...newGame, group: 0 });
        }
      });
      newGames.upper.forEach((val, i) => {
        const nextMatch = newGames.upper.findIndex(
          (itr) => itr.round === val.win?.round && itr.match == val.win?.match
        );
        const nextLooserMatch = newGames.lower.findIndex(
          (itr) => itr.round === val.loss?.round && itr.match == val.loss?.match
        );
        if (nextMatch >= 0) {
          newGames.upper[i].nextMatchId = newGames.upper[nextMatch].id;
          if (!newGames.upper[nextMatch].up)
            newGames.upper[nextMatch].up = newGames.upper[i].id;
          else newGames.upper[nextMatch].down = newGames.upper[i].id;
        }
        if (nextLooserMatch >= 0) {
          newGames.upper[i].nextLooserMatchId =
            newGames.lower[nextLooserMatch].id;
          if (!newGames.lower[nextLooserMatch].up)
            newGames.lower[nextLooserMatch].up = newGames.upper[i].id;
          else newGames.lower[nextLooserMatch].down = newGames.upper[i].id;
        }
      });
      newGames.lower.forEach((val, i) => {
        const nextUpperMatch = newGames.upper.findIndex(
            (itr) => itr.round === val.win?.round && itr.match == val.win?.match
          ),
          nextLowerMatch = newGames.lower.findIndex(
            (itr) => itr.round === val.win?.round && itr.match == val.win?.match
          );
        if (nextUpperMatch >= 0) {
          newGames.lower[i].nextMatchId = newGames.upper[nextUpperMatch].id;
          if (!newGames.upper[nextUpperMatch].up)
            newGames.upper[nextUpperMatch].up = newGames.lower[i].id;
          else newGames.upper[nextUpperMatch].down = newGames.lower[i].id;
        }
        if (nextLowerMatch >= 0) {
          newGames.lower[i].nextMatchId = newGames.lower[nextLowerMatch].id;
          if (!newGames.lower[nextLowerMatch].up)
            newGames.lower[nextLowerMatch].up = newGames.lower[i].id;
          else newGames.lower[nextLowerMatch].down = newGames.lower[i].id;
        }
      });
      return newGames;
    } else if (type === 2) {
      // * Ladder Elimination
      let newGames = [],
        gameIDs = [];
      const matches = Stepladder(randomized);
      matches.forEach((val, i) => {
        let newParticipants = [];

        if (val.player1 && participants[val.player1 - 1]) {
          newParticipants.push({
            id: participants[val.player1 - 1].tid,
            resultText: "",
            isWinner: false,
            status: null,
            score: 0,
            wins: 0,
            loses: 0,
            draws: 0,
            name: teams[participants[val.player1 - 1].tid].name,
          });
        }

        if (val.player2 && participants[val.player2 - 1]) {
          newParticipants.push({
            id: participants[val.player2 - 1].tid,
            resultText: "",
            isWinner: false,
            status: null,
            score: 0,
            wins: 0,
            loses: 0,
            draws: 0,
            name: teams[participants[val.player2 - 1].tid].name,
          });
        }

        const newGame = {
          ...val,
          id: nanoid(),
          name: "",
          eid: eid,
          nextMatchId: null,
          tournamentRoundText: `${val.round}`,
          startTime: "",
          state: "DONE",
          participants: newParticipants,
        };

        gameIDs.push(newGame.id);
        newGames.push(newGame);
      });
      matches.forEach((val, i) => {
        const nextMatch = matches.findIndex(
          (itr) => itr.round === val.win?.round && itr.match == val.win?.match
        );
        if (nextMatch >= 0) {
          newGames[i].nextMatchId = gameIDs[nextMatch];
        }
      });
      return newGames;
    }
  };

  const handle = {
    buildTemplate: (e) => {
      const { participants, participantsCount, format } = event.events[eid];
      const randomized = _.shuffle(_.range(1, participantsCount + 1)); // Generate random array to seed teams randomly
      const matches = createMatches(
        format,
        team.teams,
        [...participants],
        participantsCount,
        randomized
      );

      console.info("newly built matches:", matches);
      setGames(matches);
    },
    save: async (e) => {
      setSaving(true);
      let saved = true;

      if (event.events[eid].format == 0) {
        if (!games) {
          setSaving(false);
          return;
        }

        for (let i = 0; i < games.length; i++) {
          const val = {
            ...games[i],
            createdAt: new Date(),
            status: MATCH_STATES.SCHEDULING.value,
            deleted: false,
          };
          const res = await match.update(val.id, val);
          if (res.code == "failed") {
            saved = false;
            console.warn("Match save error:", val);
          }
        }
      } else if (event.events[eid].format == 1) {
        if (!games) {
          setSaving(false);
          return;
        }
        for (let i = 0; i < games.upper.length; i++) {
          const val = {
            ...games.upper[i],
            createdAt: new Date(),
            status: MATCH_STATES.SCHEDULING.value,
            deleted: false,
          };
          const res = await match.update(val.id, val);
          if (res.code == "failed") {
            saved = false;
            console.warn("Match save error:", val);
          }
        }
        for (let i = 0; i < games.lower.length; i++) {
          const val = {
            ...games.lower[i],
            createdAt: new Date(),
            status: MATCH_STATES.SCHEDULING.value,
            deleted: false,
          };
          const res = await match.update(val.id, val);
          if (res.code == "failed") {
            saved = false;
            console.warn("Match save error:", val);
          }
        }
      } else if (event.events[eid].format == 2) {
        // const newSchedule = events.sort((a, b) => a.start.getTime() - b.start.getTime());
        // console.log(newSchedule);
        let participants = [];
        event.events[eid].participants.forEach((item) => {
          participants.push({
            ...team.teams[item.tid],
          });
        });
        participants.sort((a, b) => a.level - b.level);
        let ranks = {};
        participants.forEach((item, i) => {
          ranks[item.id] = i;
        });
        console.log("Participants:", participants);
        console.log("Ranks:", ranks);
        let temp = [];
        for (let i = 0; i < events.length; i++) {
          const item = events[i];
          // const res = await match.update(item.id, {
          temp.push({
            id: item.id,
            eid: eid,
            type: 0,
            title: item.title,
            color: item.color,
            end: item.end,
            endStr: item.endStr,
            start: item.start,
            startStr: item.startStr,
            createdAt: new Date(),
            status: MATCH_STATES.SCHEDULING.value,
            deleted: false,
            rank: ranks,
          });
        }
        const res = await event.update(eid, {
          ...event.events[eid],
          rounds: temp,
        });
        if (res.code == "failed") {
          saved = false;
          console.warn("Rounds save error:", res.message);
        }
      }

      if (saved) {
        const res = await event.update(eid, {
          status: EVENT_STATES.SCHEDULING.value,
        }); // Set the status of the event as CREATED/SCHEDULING.
        if (res.code === "succeed") {
          alert("Saved successfully!");
          router.push("/match?event=" + eid);
        }
      }
      setSaving(false);
    },
  };

  return (
    <Paper sx={{ p: 4, backgroundColor: theme.palette.card.main }}>
      <Box
        sx={{
          border: `solid 1px rgba(255, 255, 255, 0.2)`,
          borderRadius: "4px",
          padding: 3,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 4 }}>
          <Box
            sx={{
              width: "300px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            <Typography variant="h5">Event Details</Typography>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "130px" }}>
                <Typography variant="h6">Name:</Typography>
              </Box>
              <Box>
                <Typography variant="body1">
                  {event?.events[eid]?.name}
                </Typography>
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
                <Typography variant="body1">
                  {event?.events[eid]?.participantsCount}
                </Typography>
              </Box>
            </Box>
            {event?.events[eid] &&
              event.events[eid].format < 2 &&
              event.events[eid].status == 0 && (
                <Button
                  variant="contained"
                  onClick={handle.buildTemplate}
                  disabled={disabled}
                  sx={{ ...buttonStyle }}
                >
                  Build Template
                </Button>
              )}
            <LoadingButton
              loading={saving}
              variant="contained"
              onClick={handle.save}
              disabled={disabled}
              sx={{ ...buttonStyle }}
            >
              Save
            </LoadingButton>
          </Box>
          <Box
            sx={{
              overflow: "auto",
              flex: 1,
              border: "solid 1px rgba(255, 255, 255, 0.2)",
              minHeight: "300px",
              borderRadius: "4px",
            }}
          >
            {event?.events[eid] && event.events[eid].format == 2 ? (
              <FullCalendar
                sx={{
                  marginTop: "24px",
                }}
                events={events}
                setEvents={setEvents}
                selectable={true}
                editable={true}
              />
            ) : games && event?.events[eid]?.format == 0 ? (
              <SingleEliminationBracket matches={games} />
            ) : event?.events[eid]?.format == 1 ? (
              <DoubleEliminationBracket matches={games} />
            ) : (
              <></>
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
