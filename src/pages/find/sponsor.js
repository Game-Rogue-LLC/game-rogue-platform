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
import { formatDate } from "@/src/utils/utils";

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { setColors } = useStyleContext();
  const { organizer, event, team, sponsor } = useTournamentContext();
  const [eid, setEID] = useState(router?.query?.event);
  const [sponsors, setSponsors] = useState([]);

  useEffect(() => {
    setTitle("Sponsor Finder");
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
    if (sponsor?.sponsors) {
      setSponsors(_.map(sponsor.sponsors, (val) => val));
    }
  }, [sponsor?.sponsors]);

  useEffect(() => {
    if (event?.events[eid]) {
      setColors({
        primary: event.events[eid].primary,
        secondary: event.events[eid].secondary,
        tertiary: event.events[eid].tertiary
      });
    }
  }, [eid, event?.events]);

  return (
    <Box>
      <TableContainer component={Paper} variant="elevation">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Organization</TableCell>
              <TableCell align="center">Requirements</TableCell>
              <TableCell align="center">Sponsorship</TableCell>
              <TableCell align="center">Deadline</TableCell>
              <TableCell align="center">Application</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sponsors && sponsors.length > 0 ? (
              sponsors.map((item, i) => (
                <TableRow key={item.id}>
                  <TableCell align="center">Organization</TableCell>
                  <TableCell align="center" style={{ color: "red" }}>
                    NOT PASSED
                  </TableCell>
                  <TableCell align="center">$1,000</TableCell>
                  <TableCell align="center">{formatDate(new Date(), "MMM DD, YYYY")}</TableCell>
                  <TableCell align="center" sx={{ color: "#F5831F" }}>
                    UNAVAILABLE
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell align="center" colSpan={9}>
                  NO SPONSORS
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
