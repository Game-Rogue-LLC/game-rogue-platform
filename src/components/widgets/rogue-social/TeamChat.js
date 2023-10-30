import { Box, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import Avatar from "@/src/components/Avatar";
import { Send } from "@mui/icons-material";
import { nanoid } from "nanoid";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const TeamChat = ({ item, sx }) => {
  const messageBoxRef = useRef(null);
  const { user } = useAuthContext();
  const { team } = useTournamentContext();
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (item?.messages) {
      setMessages(item.messages);
    } else setMessages([]);
  }, [item?.messages]);

  const handleSend = async () => {
    if (input.trim() !== "" && item?.id) {
      const newMessage = {
        id: nanoid(),
        sender: user.id,
        text: input,
        sentAt: new Date()
      };
      const res = await team.update(item?.id, {
        messages: [...messages, newMessage]
      });
      setMessages((prev) => [...prev, newMessage]);
      setInput("");
    }
  };

  useEffect(() => {
    const messageBox = messageBoxRef.current;
    messageBox.scrollTo(0, 99999);
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

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
        ...sx
      }}
    >
      <Box sx={{ backgroundColor: "black", padding: 1 }}>
        <Typography variant="h4" textAlign="center" fontSize="20px" color="white">
          {item?.name}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto", p: 1 }} ref={messageBoxRef}>
        {messages.map((message) => (
          <Message key={message.id} message={message} me={user} />
        ))}
      </Box>
      <Box sx={{ p: 2, backgroundColor: "background.default" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              size="small"
              fullWidth
              placeholder="Type a message"
              variant="outlined"
              value={input}
              sx={{ ".MuiInputBase-root": { paddingRight: 0 } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ paddingInline: 0 }}>
                    <IconButton color="primary" variant="contained" onClick={handleSend}>
                      <Send />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              onKeyDown={handleKeyDown}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const Message = ({ message, me }) => {
  const isLeft = message.sender !== me.id;
  const { player } = useTournamentContext();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isLeft ? "flex-start" : "flex-end",
        mb: 2
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isLeft ? "row" : "row-reverse",
          alignItems: "center"
        }}
      >
        <Avatar user={player.players[message.sender]} size="small" />
        {/* <img src={player.players[message.sender]?.profilePic} width={40} height={40} /> */}
        <Paper
          variant="outlined"
          sx={{
            p: 1,
            ml: isLeft ? 1 : 0,
            mr: isLeft ? 0 : 1,
            backgroundColor: isLeft ? "primary.light" : "secondary.light",
            borderRadius: isLeft ? "20px 20px 20px 5px" : "20px 20px 5px 20px"
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default TeamChat;
