import { Box, Button, Tooltip } from "@mui/material";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import { colors as COLORS } from "@/src/components/datetime/FullCalendar";
import { Draggable } from "@/src/components/drag-reorder";
import { LoadingButton } from "@mui/lab";
import TeamItem from "@/src/components/item/TeamItem";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

const Page = (props) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const { organizer, event, team, match } = useTournamentContext();
  const [eid, setEID] = useState(router?.query?.eid);
  const [events, setEvents] = useState([]);
  const [positions, setPositions] = useState([...Array(6)].map((_, i) => i));
  const [items, setItems] = useState(getItems(10));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    console.log(items);
  }, [items])

  useEffect(() => {
    setTitle("Event Format");
  });

  useEffect(() => {
    if (router?.query) {
      setEID(router.query.eid);
    }
  }, [router]);

  useEffect(() => {
    if (event?.events && event.events[eid]) {
      setPositions([...Array(event.events[eid].participants?.length)].map((_, i) => i));
    }
  }, [eid, event?.events]);

  useEffect(() => {
    console.log(positions);
  }, [positions])

  const getChangedPos = (currentPos, newPos) => {
    setPositions(prev => {
      const cp = prev[currentPos], np = prev[newPos];
      let newPositions = [...prev];
      newPositions[currentPos] = np;
      newPositions[newPos] = cp;
      return newPositions;
    });
  };

  const handle = {
    save: async () => {
      setSaving(true);
      if (event && eid && event.events[eid]) {
        const res = await event.update(eid, {
          participants: positions.map((key, _) => event.events[eid].participants[key])
        });

        if (res.code === "succeed") {
          enqueueSnackbar("Saved successfully!", { variant: "success" });
        }
        setSaving(false);
      }
    },
    reset: () => {
      if (event?.events && event.events[eid]) {
        setPositions([...Array(event.events[eid].participants?.length)].map((_, i) => i));
      }
      // window.location.reload();
    }
  }

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    setItems(prev => {
      const newItems = reorder(
        prev,
        result.source.index,
        result.destination.index
      )
      return newItems;
    });
  }

  return (
    <Box sx={{position: "relative"}}>
      <Box position="absolute" display="flex" justifyContent="right" width="100%" gap={2} top={-50}>
        <LoadingButton loading={saving} variant="contained" onClick={handle.save}>Save</LoadingButton>
        {/* <Button variant="contained" onClick={handle.reset}>Reset</Button> */}
      </Box>
      <Draggable onPosChange={getChangedPos}>
        {event?.events[eid]?.participants?.map((participant, idx) => {
          return (
            <div key={idx} style={{paddingBlock: 4 }}>
              <TeamItem disableLink={true} team={team.teams[participant.id]} sx={{border: "1px solid", borderColor: "#ffffff80", borderRadius: 1, justifyContent: "left", padding: 2}} />
            </div>
          );
        })}
      </Draggable>
{/*       
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      123
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> */}
    </Box>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <AdminLayout>{page}</AdminLayout>
    </TournamentProvider>
  );
};

export default Page;
