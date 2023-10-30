import { Box, Tooltip } from "@mui/material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import { colors as COLORS } from "@/src/components/datetime/FullCalendar";
import ReactFullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import dayjs from "dayjs";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";

const Page = (props) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const { organizer, event, team, match } = useTournamentContext();
  const [eid, setEID] = useState(router?.query?.eid);
  const [events, setEvents] = useState([]);

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
      // _.forEach(match.matches, (val, _) => {
      //   newEvents.push({
      //     id: val.id,
      //     title: event.events[val.eid]?.name || 'Unknown Event',
      //     color: val.eid == eid ? event.events[eid].primary : COLORS[0],
      //     start: val.start,
      //     end: val.end,
      //     startStr: dayjs(val.start).format("YYYY-MM-DD hh:mm"),
      //     endStr: dayjs(val.end).format("YYYY-MM-DD hh:mm")
      //   })
      // })
      _.forEach(event.events, (val, _) => {
        newEvents.push({
          id: val.id,
          title: `${val.name || "Unknown Event"}'s Registration Opens`,
          color: val.id === eid ? val.secondary : COLORS[1],
          start: val.registerFrom  || dayjs(val.registerTo).subtract(val.checkin, 'minutes').toDate(),
          end: val.registerTo,
          startStr: dayjs(val.registerFrom || dayjs(val.registerTo).subtract(val.checkin, 'minutes')).format("YYYY-MM-DD hh:mm"),
          endStr: dayjs(val.registerTo).format("YYYY-MM-DD hh:mm")
        });
        newEvents.push({
          id: val.id,
          title: `${val.name || "Unknown Event"}'s Registration Closes`,
          color: val.id === eid ? val.secondary : COLORS[1],
          start: val.registerTo,
          end: val.registerTo,
          startStr: dayjs(val.registerTo).format("YYYY-MM-DD hh:mm"),
          endStr: dayjs(val.registerTo).format("YYYY-MM-DD hh:mm")
        });
      });
      console.log(newEvents);
      setEvents(newEvents);
    }
  }, [eid, match?.matches, event?.events]);

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
        // select={handleDateSelect}
        eventContent={renderEventContent}
        // eventClick={handleEventClick}
        events={events}
      />
    </Box>
  );
};

function renderEventContent(eventInfo) {
  console.log(eventInfo);
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
      <div style={{backgroundColor, borderColor, borderRadius: 4}}>{event.title}</div>
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
