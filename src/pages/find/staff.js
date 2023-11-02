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
  const { organizer, event, team, player, match, ticket, staff } = useTournamentContext();
  const [eid, setEID] = useState(router?.query?.event);
  const [staffs, setStaffs] = useState([]);

  useEffect(() => {
    setTitle("Staff Finder");
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
        // Redirect to 404 page.
      }
    }
  }, [router]);

  useEffect(() => {
    if (staff?.staffs) {
      setStaffs(_.map(staff.staffs, (val) => val));
    }
  }, [staff?.staffs]);

  useEffect(() => {
    if (event?.events[eid]) {
      setColors({
        primary: event.events[eid].primary,
        secondary: event.events[eid].secondary,
        tertiary: event.events[eid].tertiary
      });
    }
  }, [eid, event?.events]);

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
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Previous Position</TableCell>
              <TableCell align="center">Previous Organization</TableCell>
              <TableCell align="center">Seeking Position</TableCell>
              <TableCell align="center">Compensation</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs && staffs.length > 0 ? (
              staffs.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell align="center">{player?.players[item.uid]?.userName}</TableCell>
                  <TableCell align="center">{item.oldPosition}</TableCell>
                  <TableCell align="center">{item.oldOrganization}</TableCell>
                  <TableCell align="center">{item.newPosition}</TableCell>
                  <TableCell align="center">
                    {item.compensation === 0 ? "Not Paid" : "Paid"}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#F5831F" }}>
                    RESUME
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={9}>
                  NO STAFFS
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
