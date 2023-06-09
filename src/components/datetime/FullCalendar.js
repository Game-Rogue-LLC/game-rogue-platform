import { useEffect, useState } from "react";
import ReactFullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { nanoid } from "nanoid";
import _ from "lodash";
import MatchDialog from "@/src/components/dialog/MatchDialog";
import { formatDate } from "@/src/utils/utils";

export const colors = ["#B65A0C", "#880167", "#014984", "#5E8F1C"];

const FullCalendar = ({
  events,
  setEvents,
  limit,
  sx,
  selectable,
  editable,
}) => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleDateSelect = (selectInfo) => {
    if ((limit && events.length >= limit) || !setEvents) return;
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      // calendarApi.addEvent({
      //   id: nanoid(),
      //   title,
      //   start: selectInfo.startStr,
      //   end: selectInfo.endStr,
      //   allDay: selectInfo.allDay,
      //   color: colors[_.random(0, 13) % 4],
      //   resourceId: (selectInfo.resource ? selectInfo.resource.id : undefined)
      //   // color: `rgb(${_.random(0, 255)},${_.random(0, 255)},${_.random(0, 255)})`
      // })
      setEvents([
        ...events,
        {
          id: nanoid(),
          title,
          start: selectInfo.start,
          end: selectInfo.end,
          startStr: selectInfo.startStr,
          endStr: selectInfo.endStr,
          allDay: selectInfo.allDay,
          color: colors[_.random(0, 13) % 4],
          resourceId: selectInfo.reseource ? selectInfo.resource.id : undefined,
        },
      ]);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
      setEvents(events.filter((val, i) => val.id != clickInfo.event.id));
    }
  };

  // const handleEvents = (evts) => {
  //   setEvents(evts);
  // }

  return (
    <div className="demo-app" style={sx}>
      <div className="demo-app-main">
        <MatchDialog open={false} />
        <ReactFullCalendar
          plugins={[
            dayGridPlugin,
            timeGridPlugin,
            interactionPlugin /*, resourceTimelinePlugin*/,
          ]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay", //,resourceTimelineDay'
          }}
          initialView="dayGridMonth"
          editable={editable == true ? true : false}
          selectable={selectable == true ? true : false}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={weekendsVisible}
          displayEventTime={true}
          // initialEvents={} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect}
          eventContent={renderEventContent} // custom render function
          eventClick={handleEventClick}
          // eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          // resources={[
          //   { id: 'a', title: 'Resource A' },
          //   { id: 'b', title: 'Resource B' },
          //   { id: 'c', title: 'Resource C' }
          // ]}
          // views={{
          //   resourceTimelineDay: {
          //     type: 'resourceTimeline',
          //     duration: { days: 1 },
          //     buttonText: 'resource day'
          //   }
          // }}
          events={events}

          /* you can update a remote database when these fire:
        eventAdd={function(){}}
        eventChange={function(){}}
        eventRemove={function(){}}
        */
        />
      </div>
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

function renderSidebarEvent(event) {
  return (
    <li key={event.id}>
      <b>
        {formatDate(event.start, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </b>
      <i>{event.title}</i>
    </li>
  );
}

export default FullCalendar;
