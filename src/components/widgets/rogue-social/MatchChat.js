import { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Paper,
  Typography,
  OutlinedInput,
} from "@mui/material";
import { Send } from "@mui/icons-material";
import { DEFAULT_LOGO } from "@/src/config/global";
import match from "@/lib/firestore/collections/match";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const MatchChat = ({ item }) => {
  const messageBoxRef = useRef(null);
  const { user } = useAuthContext();
  const { team, match } = useTournamentContext();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [myTeam, setMyTeam] = useState(null);
  const [opTeam, setOpTeam] = useState(null);

  const isMyTeam = (team) => {
    return team.uid === user.id;
  };

  useEffect(() => {
    if (item?.messages) {
      setMessages(item.messages);
    }
  }, [item]);

  useEffect(() => {
    if (isMyTeam(team?.teams[item?.participants[0]?.id])) {
      setMyTeam(team.teams[item.participants[0].id]);
      setOpTeam(team.teams[item.participants[1].id]);
    } else if (isMyTeam(team?.teams[item?.participants[1]?.id])) {
      setMyTeam(team.teams[item.participants[1].id]);
      setOpTeam(team.teams[item.participants[0].id]);
    }
  }, [team?.teams, item]);

  const handleSend = () => {
    if (input.trim() !== "" && item?.id) {
      console.log(input);
      match.update(item?.id, {
        messages: [
          ...messages,
          {
            sender: myTeam.id,
            text: input,
            sentAt: new Date(),
          },
        ],
      });
      setInput("");
    }
  };

  useEffect(() => {
    const messageBox = messageBoxRef.current;
    messageBox.scrollTo(0, 99999);
  }, [messages]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "250px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        bgcolor: "grey.200",
        border: "solid 1px rgba(255,255,255,0.1)",
      }}
    >
      <Box sx={{ backgroundColor: "black" }}>
        <Typography variant="h4" textAlign="center" fontSize="20px">
          Game Chat
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }} ref={messageBoxRef}>
        {messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            team1={opTeam}
            team2={myTeam}
          />
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={input}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={handleSend}
            >
              <Send />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const Message = ({ message, team1, team2 }) => {
  const isLeft = message.sender === team1.id;
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        mb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isLeft ? "row" : "row-reverse",
          alignItems: "center",
        }}
      >
        <img
          src={isLeft ? team1?.darkLogo : team2?.darkLogo}
          width={50}
          height={50}
        />
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            ml: isLeft ? 1 : 0,
            mr: isLeft ? 0 : 1,
            backgroundColor: isLeft ? "primary.light" : "secondary.light",
            borderRadius: isLeft ? "20px 20px 20px 5px" : "20px 20px 5px 20px",
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default MatchChat;
