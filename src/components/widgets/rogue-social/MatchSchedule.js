import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { DEFAULT_LOGO } from "@/src/config/global";
import CustomDateTimePicker from "../../datetime/DateTimePicker";
import dayjs from "dayjs";
import { useAuthContext } from "@/src/context/AuthContext";

const MatchSchedule = ({ item, matchTime, setMatchTime }) => {
  const { user } = useAuthContext();
  const { team, ticket } = useTournamentContext();
  const [myTeam, setMyTeam] = useState(null);
  const [opTeam, setOpTeam] = useState(null);

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
    const newTicket = {
      type: "MATCH_SCHEDULE_REQUEST",
      sender: myTeam.uid,
      receiver: opTeam.uid,
      data: {
        time: matchTime,
        senderTeam: myTeam.id,
        receiverTeam: opTeam.id,
      },
      createdAt: new Date(),
      deleted: false,
    };

    // await ticket.create(newTicket);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
      <Box>
        <Box textAlign={"center"}>
          <Box
            component={"img"}
            sx={{
              mt: 2,
              height: "150px",
              width: "150px",
              filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))",
            }}
            src={myTeam?.darkLogo || DEFAULT_LOGO}
          ></Box>
          <Typography
            variant="body1"
            textAlign={"center"}
            fontSize={"1.5rem"}
            color={"white"}
          >
            {myTeam?.name}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexDirection: "column",
        }}
      >
        <CustomDateTimePicker
          name="schedule"
          minDateTime={dayjs(item?.startAt)}
          maxDateTime={dayjs(item?.endAt)}
          value={matchTime}
          setValue={setMatchTime}
        />
        <Button variant="contained" onClick={onAsk}>
          ASK
        </Button>
      </Box>

      <Box>
        <Box textAlign={"center"}>
          <Box
            component={"img"}
            sx={{
              mt: 2,
              height: "150px",
              width: "150px",
              filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))",
            }}
            src={opTeam?.darkLogo || DEFAULT_LOGO}
          ></Box>
          <Typography
            variant="body1"
            textAlign={"center"}
            fontSize={"1.5rem"}
            color={"white"}
          >
            {opTeam?.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchSchedule;
