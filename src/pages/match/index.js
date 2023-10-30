import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import { Check, Close, Visibility } from "@mui/icons-material";
import { EVENT_STATES, MATCH_STATES, TICKET_TYPES } from "@/src/config/global";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import CustomButton from "@/src/components/button/CustomButton";
import RequestViewDialog from "@/src/components/widgets/event/RequestViewDialog";
import dayjs from "dayjs";
import { enqueueSnackbar } from "notistack";
import { register } from "validatorjs";
import { useAppContext } from "@/src/context/app";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { setColors } = useStyleContext();
  const { organizer, event, team, player, match, ticket } = useTournamentContext();
  const [eid, setEID] = useState(router?.query?.event);
  const [matches, setMatches] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    setTitle("MATCHES");
  }, []);

  const registerRequests = useMemo(() => {
    if (ticket.tickets)
      return _.filter(
        ticket.tickets,
        (val) => val.type === TICKET_TYPES.TEAM_REGISTER_REQUEST && val.data?.event === eid
      );
    return [];
  }, [ticket.tickets]);

  const onViewRequest = (val) => {
    setSelectedRequest(val);
    setOpenView(true);
  };
  const onCloseView = (val) => {
    setOpenView(false);
  };
  const onAcceptRequest = async (ticketId, id, tid) => {
    const res = await event.addParticipant(id, tid);
    if (res.code === "succeed") {
      await ticket.update(ticketId, { closedAt: new Date(), deleted: true, result: "accepted" });
      enqueueSnackbar("Accepted successfully!", { variant: "success" });
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };
  const onDenyRequest = async (ticketId) => {
    const res = await ticket.update(ticketId, {
      closedAt: new Date(),
      deleted: true,
      result: "denied"
    });
    if (res.code === "succeed") {
      enqueueSnackbar("Denied successfully!", { variant: "success" });
    } else {
      enqueueSnackbar(res.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (router?.query?.event) {
      const newEID = router.query.event;
      if (event?.events && event.events[newEID]) {
        setEID(newEID);
        event.setCurrent(newEID);
        organizer.setCurrent(event.events[newEID]?.oid);
      } else {
        console.warn("Invalid Event ID");
        // Redirect to 404 page.
      }
    }
  }, [router]);

  useEffect(() => {
    if (match?.matches) {
      setMatches(match.matches.filter((val) => val.eid === eid));
    }
  }, [eid, match?.matches]);

  useEffect(() => {
    if (event?.events[eid]) {
      setColors({
        primary: event.events[eid].primary,
        secondary: event.events[eid].secondary,
        tertiary: event.events[eid].tertiary
      });
    }
  }, [eid, event?.events]);

  const getStatus = (item) => {
    const current = new Date(),
      start = dayjs(item.start),
      end = dayjs(item.end),
      status = item.status,
      eventStatus = event.events[item.eid].status;
    if (eventStatus == EVENT_STATES.CREATING.value || eventStatus == EVENT_STATES.SCHEDULING.value)
      return "SCHEDULING";
    if (eventStatus == EVENT_STATES.SCHEDULED.value) return "SCHEDULED";
    if (eventStatus == EVENT_STATES.STARTED.value) {
      if (start.isBefore(current) && end.isAfter(current)) return "STARTED";
      if (end.isBefore(current)) return "FINISHED";
      return "WAITING";
    }
    if (eventStatus == EVENT_STATES.FINISHED.value) return "FINISHED";
  };

  const handle = {
    create: (e) => {
      if (event.events[eid].participants?.length < event.events[eid].participantsCount) {
        enqueueSnackbar("Too few participants.", { variant: "success" });
        return;
      } else if (event.events[eid].participants?.length === event.events[eid].participantsCount) {
        router.push("/match/create?event=" + eid);
      }
    },
    show: (e) => {
      if (event.events[eid].status) {
        router.push("/match/show?event=" + eid);
      }
    }
  };

  return (
    <Box>
      <TableContainer component={Paper} variant="elevation">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">MATCH ID</TableCell>
              <TableCell align="center">STATUS</TableCell>
              <TableCell align="center">ADMIN</TableCell>
              <TableCell align="center">CREATED</TableCell>
              <TableCell align="center">CATEGORY</TableCell>
              <TableCell align="center">SCHEDULE</TableCell>
              <TableCell align="center">SOCIAL POST</TableCell>
              <TableCell align="center">HIGHLIGHTS</TableCell>
              <TableCell align="center">STREAM NOW</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matches && matches.length > 0 ? (
              matches.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{item.id}</TableCell>
                  <TableCell align="center">{getStatus(item)}</TableCell>
                  <TableCell align="center">
                    {player.players[organizer.organizers[event.events[item.eid].oid].uid].userName}
                  </TableCell>
                  <TableCell align="center">{dayjs(item.createdAt).format("MMM DD")}</TableCell>
                  <TableCell align="center">{"ROUND" + item.round}</TableCell>
                  <TableCell align="center">
                    {item.status == MATCH_STATES.NOT_STARTED_SCHEDULING.value
                      ? "NOT_STARTED"
                      : item.status == MATCH_STATES.SCHEDULING.value
                      ? "ONGOING"
                      : dayjs(item.start).format("MMM D, h:mm A")}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#F5831F" }}>
                    UPGRADE
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#F5831F" }}>
                    UPGRADE
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#F5831F" }}>
                    UPGRADE
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={9}>
                  NO MATCHES
                </TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell sx={{ border: "none" }} colSpan={9}>
                {event?.events[eid]?.status ? (
                  <CustomButton
                    variant="contained"
                    onClick={handle.show}
                    // sx={{ borderRadius: 0, color: 'white', background: 'black', ':hover': { background: theme.palette.primary.main } }}
                  >
                    VIEW MATCHES
                  </CustomButton>
                ) : (
                  <CustomButton variant="contained" onClick={handle.create}>
                    CREATE MATCHES
                  </CustomButton>
                )}
                <CustomButton variant="contained" sx={{ ml: 2 }}>
                  PAST MATCHES
                </CustomButton>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ mt: 4, p: 2 }}>
        <Typography variant="h5">NEXT STAGE</Typography>
        <Typography variant="subtitle1">
          Automatically generate the next state of match chats.
        </Typography>
        <CustomButton variant="contained" sx={{ mt: 2 }}>
          GENERATE
        </CustomButton>
      </Paper>

      <Paper sx={{ mt: 4, p: 2 }}>
        <RequestViewDialog
          open={openView}
          onClose={onCloseView}
          onAccept={() =>
            onAcceptRequest(
              selectedRequest.id,
              selectedRequest.data.event,
              selectedRequest.data.team
            )
          }
          item={selectedRequest}
          onDeny={() =>
            onDenyRequest(selectedRequest.id, selectedRequest.data.event, selectedRequest.data.team)
          }
        />
        <Typography variant="h5">REGISTER REQUESTS</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Team ID</TableCell>
              <TableCell>Team Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registerRequests &&
              registerRequests.map((val, i) => (
                <TableRow hover key={`request-${i}`}>
                  <TableCell>{player.players[val.sender]?.userName}</TableCell>
                  <TableCell>{val.data.team}</TableCell>
                  <TableCell>{team.teams[val.data.team]?.name}</TableCell>
                  <TableCell>{val.data.text}</TableCell>
                  <TableCell sx={{ maxWidth: 100 }}>
                    <Tooltip title="View">
                      <IconButton
                        variant="contained"
                        onClick={() => {
                          onViewRequest(val);
                        }}
                      >
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Accept">
                      <IconButton
                        variant="contained"
                        onClick={() => {
                          onAcceptRequest(val.id, val.data.event, val.data.team);
                        }}
                      >
                        <Check />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Deny">
                      <IconButton
                        variant="contained"
                        onClick={() => {
                          onDenyRequest(val.id, val.data.event, val.data.team);
                        }}
                      >
                        <Close />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>

      <Paper sx={{ mt: 4, p: 2 }}>
        <CustomButton
          onClick={() => {
            router.push("/event/" + eid + "/edit");
          }}
        >
          Re-Edit
        </CustomButton>
      </Paper>
    </Box>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
