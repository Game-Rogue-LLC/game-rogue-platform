import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  useTheme
} from "@mui/material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import { colors as COLORS } from "@/src/components/datetime/FullCalendar";
import ReactFullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";
import { formatDate } from "@/src/utils/utils";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";

const Page = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const { organizer, event, team, match } = useTournamentContext();
  const [eid, setEID] = useState(router?.query?.eid);
  const [events, setEvents] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [clickedDate, setClickedDate] = useState(null);
  const [eventsOnDate, setEventsOnDate] = useState([]);

  useEffect(() => {
    setTitle("Event Calendar");
  });

  useEffect(() => {
    if (router?.query) {
      setEID(router.query.eid);
    }
  }, [router]);

  useEffect(() => {
    if (event?.events && match?.matches) {
      let newEvents = [];
      _.forEach(event.events, (val, i) => {
        const startAt =
            val.registerFrom || dayjs(val.registerTo).subtract(val.checkin, "minutes").toDate(),
          endAt = val.registerTo;
        newEvents.push({
          id: val.id,
          title: `${val.name || "Unknown Event"}'s Registration Opens`,
          color: val.id === eid ? val.secondary : COLORS[1],
          start: startAt,
          end: startAt,
          startStr: dayjs(startAt).format("YYYY-MM-DD hh:mm"),
          endStr: dayjs(startAt).format("YYYY-MM-DD hh:mm")
        });
        newEvents.push({
          id: val.id,
          title: `${val.name || "Unknown Event"}'s Registration Closes`,
          color: val.id === eid ? val.secondary : COLORS[1],
          start: endAt,
          end: endAt,
          startStr: dayjs(endAt).format("YYYY-MM-DD hh:mm"),
          endStr: dayjs(endAt).format("YYYY-MM-DD hh:mm")
        });

        const eventMatches = _.filter(match.matches, (mval) => mval.eid == val.id);
        let matchesByRound = {};
        eventMatches.map((mt) => {
          if (matchesByRound[mt.round]) {
            matchesByRound[mt.round].push(mt);
          } else {
            matchesByRound[mt.round] = [mt];
          }
        });
        _.forEach(matchesByRound, (_matches) => {
          const firstMatch = _.minBy(_matches, (_match) => _match.start),
            lastMatch = _.maxBy(_matches, (_match) => _match.end);

          newEvents.push({
            id: val.id,
            title: `${val.name || "Unknown Event"}'s Round ${firstMatch.round} Stage Begins`,
            color: val.id === eid ? val.secondary : COLORS[1],
            start: firstMatch.start,
            end: firstMatch.end,
            startStr: dayjs(firstMatch.start).format("YYYY-MM-DD hh:mm"),
            endStr: dayjs(firstMatch.end).format("YYYY-MM-DD hh:mm")
          });
        });
      });
      setEvents(newEvents);
    }
  }, [eid, match?.matches, event?.events]);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  // Event Handlers
  const onDateClick = (data) => {
    setClickedDate(data.date);
    const date = dayjs(data.date);
    const eventsOnCurrentDate = _.filter(events, (_val) => {
      return date.isSame(_val.start, "day");
    });
    console.log(eventsOnCurrentDate);
    setEventsOnDate(_.sortBy(eventsOnCurrentDate, "start"));
    openDialog();
  };

  return (
    <Box>
      <ReactFullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin /*, resourceTimelinePlugin*/]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay" //,resourceTimelineDay'
        }}
        initialView="dayGridMonth"
        editable={false}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        displayEventTime={true}
        dateClick={onDateClick}
        // select={handleDateSelect}
        eventContent={renderEventContent}
        // eventClick={handleEventClick}
        events={events}
      />

      <Dialog open={isDialogOpen} onClose={closeDialog} sx={{ minWidth: 500 }} PaperProps={{
        sx: {
          backgroundColor: "rgb(0,0,0)",
        }
      }}>
        <DialogTitle sx={{ color: theme.palette.primary.main }} variant="h4">
          {formatDate(clickedDate, "YYYY-MM-DD")} Schedule
        </DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: 18, color: theme.palette.primary.main, textAlign: "center" }}>Time</TableCell>
                <TableCell sx={{ fontSize: 18, color: theme.palette.primary.main, textAlign: "center" }}>
                  Schedule
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {eventsOnDate.length > 0 ? (
                _.map(eventsOnDate, (_event, _i) => (
                  <TableRow key={`event-${_i}`} hover>
                    <TableCell sx={{ fontSize: 18, color: _event.color, fontWeight: 700, filter: "saturate(2.5)" }}>
                      {formatDate(_event.start, "hh:mm A")}
                    </TableCell>
                    <TableCell sx={{ fontSize: 18, color: _event.color, fontWeight: 700, filter: "saturate(2.5)" }}>
                      {_event.title}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell sx={{ fontSize: 18, textAlign: "center" }} colSpan={2}>
                    No Schedules
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

function renderEventContent(eventInfo) {
  const { timeText, event, backgroundColor, borderColor } = eventInfo;
  return (
    <Tooltip
      title={
        <div style={{ fontSize: "1rem" }}>
          <b>{timeText + "m"}</b>
          <br />
          <i>{event.title}</i>
        </div>
      }
    >
      <div style={{ backgroundColor, borderColor, borderRadius: 4 }}>{event.title}</div>
    </Tooltip>
  );
}

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <AdminLayout>{page}</AdminLayout>
    </TournamentProvider>
  );
};

export default Page;
