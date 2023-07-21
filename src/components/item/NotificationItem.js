import { Box, IconButton, Paper, Typography, useTheme } from "@mui/material";

import { Close } from "@mui/icons-material";
import Link from "next/link";
import { TICKET_TYPES } from "@/src/config/global";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const NotificationItem = ({ item }) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const { player, ticket } = useTournamentContext();

  const getTitle = (type) => {
    if (type === TICKET_TYPES.FOLLOW_USER) return "Followed User";
  };
  const getContent = () => {
    if (item.type === TICKET_TYPES.FOLLOW_USER)
      return (
        <>
          <Link
            href={"/user/" + item.users[0]}
            style={{ color: user.id !== item.users[0] ? theme.palette.primary.main : "white" }} // #4d2400
          >
            {user.id === item.users[0] ? "You" : player.players[item.users[0]].name}
          </Link>
          {" followed "}
          <Link
            href={"/user/" + item.users[1]}
            style={{ color: user.id !== item.users[1] ? theme.palette.primary.main : "white" }}
          >
            {user.id === item.users[1] ? "you" : player.players[item.users[1]].name}
          </Link>
        </>
      );
  };

  const onClose = async (e) => {
    const res = await ticket.update(item.id, { closedAt: new Date(), deleted: true });
    if (res.code === "failed") {
      console.warn(res.message);
    }
  };

  return (
    <Paper
      sx={{
        padding: 1,
        borderRadius: 1,
        position: "relative",
        backgroundColor: theme.palette.secondary.bright,
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <Typography color="white" fontSize={18}>
        {getContent()}
      </Typography>
      <IconButton size="small" onClick={onClose}>
        <Close fontSize="small" />
      </IconButton>
    </Paper>
  );
};

export default NotificationItem;
