import { useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import {
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableFooter,
  useTheme
} from "@mui/material";
import AdminLayout from "@/src/content/AdminLayout";
import { useAppContext } from "@/src/context/app";
import { useRouter } from "next/router";
import { useMatchContext } from "@/src/context/MatchContext";
import dayjs from "dayjs";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { EVENT_STATES, MATCH_STATES } from "@/src/config/global";
import { useStyleContext } from "@/src/context/StyleContext";
import CustomButton from "@/src/components/button/CustomButton";

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { setColors } = useStyleContext();
  const { organization, event, player, match } = useTournamentContext();
  // const { match } = useMatchContext();
  const [eid, setEID] = useState(router?.query?.event);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    setTitle("MATCHES");
  }, []);

  useEffect(() => {
    if (router?.query?.event) {
      const newEID = router.query.event;
      if (event?.events && event.events[newEID]) {
        setEID(newEID);
        event.setCurrent(newEID);
        organization.setCurrent(event.events[newEID]?.oid);
      } else {
        console.error("Invalid Event ID");
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
        alert("Too few participants.");
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
                  {
                    player.players[organization.organizations[event.events[item.eid].oid].uid]
                      .userName
                  }
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
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
