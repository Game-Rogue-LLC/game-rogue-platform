import {
  Box,
  Button,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { useEffect, useState } from "react";

import CustomDateTimePicker from "@/src/components/datetime/DateTimePicker";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { MATCH_STATES } from "@/src/config/global";
import ParticipantInfo from "@/src/components/widgets/match/ParticipantInfo";
import TeamItem from "@/src/components/item/TeamItem";
import dayjs from "dayjs";
import { formatDate } from "@/src/utils/utils";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const MatchSchedule = ({ item, matchTime, setMatchTime }) => {
  const { user } = useAuthContext();
  const { team, ticket, match } = useTournamentContext();
  const [myTeam, setMyTeam] = useState(null);
  const [opTeam, setOpTeam] = useState(null);
  const [asking, setAsking] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const onClose = (e) => {
    setAnchorEl(null);
  };

  const isMyTeam = (team) => {
    return team?.uid === user.id;
  };

  useEffect(() => {
    if (isMyTeam(team?.teams[item?.participants[0]?.id])) {
      setMyTeam(team.teams[item.participants[0].id]);
      setOpTeam(team.teams[item.participants[1].id]);
    } else if (isMyTeam(team?.teams[item?.participants[1]?.id])) {
      setMyTeam(team.teams[item.participants[1].id]);
      setOpTeam(team.teams[item.participants[0].id]);
    }
  }, [team?.teams, item]);

  const onAsk = async () => {
    setAsking(true);
    const newTicket = {
      type: "MATCH_SCHEDULE_REQUEST",
      sender: myTeam.uid,
      receiver: opTeam.uid,
      data: {
        time: matchTime,
        senderTeam: myTeam.id,
        receiverTeam: opTeam.id
      },
      createdAt: new Date(),
      deleted: false
    };

    const res = await ticket.create(newTicket);
    if (res.code === "succeed") alert("Asked successfully!");
    else console.warn(res.message);
    setAsking(false);
  };

  const onAccept = async (time) => {
    Object.keys(ticket.tickets).map((key) => {
      ticket.delete(key);
    });
    const res = await match.update(item.id, {
      start: time,
      status: MATCH_STATES.SCHEDULED.value
    });
    if (res.code === "succeed") {
      alert("Scheduled Successfully!");
    } else {
      console.warn(res.message);
    }
  };

  const onDeny = async (id) => {
    const res = await ticket.delete(id);
  };

  const onDateTimeChange = (newDate) => {
    setMatchTime(new Date(newDate));
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <ParticipantInfo item={myTeam} />
          {/* <Box textAlign={"center"}>
            <Box
              component={"img"}
              sx={{
                mt: 2,
                height: "150px",
                width: "150px",
                filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))"
              }}
              src={myTeam?.darkLogo || DEFAULT_DARK_LOGO}
            ></Box>
            <Typography variant="body1" textAlign="center" fontSize="1.5rem" color="white">
              {myTeam?.name}
            </Typography>
          </Box> */}
        </Box>

        <Box>
          <Button
            id="schedule-btn"
            variant="contained"
            aria-controls={open ? "schedule-menu" : undefined}
            aria-haspopup="true"
            onClick={onOpen}
            endIcon={open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            fullWidth
          >
            Schedule
          </Button>
          <Menu
            id="schedule-menu"
            anchorEl={anchorEl}
            disableScrollLock={true}
            open={open}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
            MenuListProps={{ "aria-labelledby": "schedule-btn" }}
            onClose={onClose}
          >
            <Box
              sx={{
                padding: 2,
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexDirection: "column"
              }}
            >
              <CustomDateTimePicker
                name="schedule"
                minDateTime={dayjs(item?.start)}
                maxDateTime={dayjs(item?.end)}
                value={matchTime}
                setValue={onDateTimeChange}
              />
              <LoadingButton loading={asking} variant="contained" onClick={onAsk}>
                ASK
              </LoadingButton>
            </Box>
          </Menu>
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <ParticipantInfo item={opTeam} reverse />
          {/* <Box textAlign={"center"}>
            <Box
              component={"img"}
              sx={{
                mt: 2,
                height: "150px",
                width: "150px",
                filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))"
              }}
              src={opTeam?.darkLogo || DEFAULT_DARK_LOGO}
            ></Box>
            <Typography variant="body1" textAlign={"center"} fontSize={"1.5rem"} color={"white"}>
              {opTeam?.name}
            </Typography>
          </Box> */}
        </Box>
      </Box>

      <Box sx={{ mt: 5 }}>
        <Table border="solid 1px rgba(255,255,255,0.2)">
          <TableHead>
            <TableRow>
              <TableCell align="center">Sender</TableCell>
              <TableCell align="center">Receiver</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {_.filter(ticket?.tickets, (val) => val.type === "MATCH_SCHEDULE_REQUEST").map(
              (val) => {
                return (
                  <TableRow>
                    <TableCell>
                      <TeamItem team={team?.teams[val.data.senderTeam]} disableLink={true} />
                    </TableCell>
                    <TableCell>
                      <TeamItem team={team?.teams[val.data.receiverTeam]} disableLink={true} />
                    </TableCell>
                    <TableCell align="center">
                      {formatDate(val.data.time.toDate(), "YYYY-MM-DD HH:mm")}
                    </TableCell>
                    {val.sender === user.id ? (
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={(e) => onDeny(key)}
                        >
                          Cancel
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell
                        align="center"
                        sx={{ display: "flex", gap: 1, justifyContent: "center" }}
                      >
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          onClick={(e) => onAccept(val.data.time)}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          color="error"
                          onClick={(e) => onDeny(key)}
                        >
                          Deny
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default MatchSchedule;
