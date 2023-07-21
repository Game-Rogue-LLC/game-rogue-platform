import { Box, Button, Card, Typography, useTheme } from "@mui/material";

import Avatar from "@/src/components/Avatar";
import calendar from "dayjs/plugin/calendar";
import dayjs from "dayjs";
import { useTournamentContext } from "@/src/context/TournamentContext";

dayjs.extend(calendar);
const calendarOptions = {
  sameDay: "[Today at] h:mm A", // The same day ( Today at 2:30 AM )
  nextDay: "[Tomorrow at] h:mm A", // The next day ( Tomorrow at 2:30 AM )
  nextWeek: "dddd [at] h:mm A", // The next week ( Sunday at 2:30 AM )
  lastDay: "[Yesterday at] h:mm A", // The day before ( Yesterday at 2:30 AM )
  lastWeek: "[Last] dddd [at] h:mm A", // Last week ( Last Monday at 2:30 AM )
  sameElse: "DD/MM/YYYY" // Everything else ( 17/10/2011 )
};

export default function UpcomingStreamCard({ item }) {
  const theme = useTheme();
  const { player } = useTournamentContext();

  const onRemindClick = () => {};

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        p: 2
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", py: 1, gap: 1 }}>
        <Avatar sx={{ width: 35, height: 35 }} user={player.players[item?.uid]} hideStatus={true} />
        <Typography variant="body1">{player.players[item?.uid]?.userName}</Typography>
      </Box>
      <Box>
        <Typography variant="h6">{item?.title}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
        <Typography variant="body1" color="gray">
          {dayjs(item?.openAt).calendar(null, calendarOptions)}
        </Typography>
        <Button variant="contained" size="small" onClick={onRemindClick}>
          Remind Me
        </Button>
      </Box>
    </Card>
  );
}
