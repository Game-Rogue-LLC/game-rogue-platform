import { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { DEFAULT_LOGO } from "@/src/config/global";
import CustomDateTimePicker from "../../datetime/DateTimePicker";
import dayjs from "dayjs";

const MatchSchedule = ({ item, onComplete, matchTime, setMatchTime }) => {
  const { team } = useTournamentContext();
  const [team1, setTeam1] = useState(null);
  const [team2, setTeam2] = useState(null);

  useEffect(() => {
    if (item?.participants[0]?.id)
      setTeam1(team?.teams[item.participants[0].id]);
    if (item?.participants[1]?.id)
      setTeam2(team?.teams[item.participants[1].id]);
    if (item?.startAt) setMatchTime(item.startAt);
  }, [team?.teams, item]);

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
            src={team1?.darkLogo || DEFAULT_LOGO}
          ></Box>
          <Typography
            variant="body1"
            textAlign={"center"}
            fontSize={"1.5rem"}
            color={"white"}
          >
            {team1?.name}
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
        <Button variant="contained" onClick={onComplete}>
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
            src={team2?.darkLogo || DEFAULT_LOGO}
          ></Box>
          <Typography
            variant="body1"
            textAlign={"center"}
            fontSize={"1.5rem"}
            color={"white"}
          >
            {team2?.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchSchedule;
