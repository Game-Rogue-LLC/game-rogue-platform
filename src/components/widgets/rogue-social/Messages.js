import {
  AddComment,
  ArrowLeft,
  KeyboardDoubleArrowDown,
  KeyboardDoubleArrowUp,
  Message,
  QuestionAnswer,
  Sell
} from "@mui/icons-material";
import {
  Badge,
  Box,
  Button,
  ButtonBase,
  IconButton,
  Tooltip,
  Typography,
  styled,
  useTheme
} from "@mui/material";
import { isMyTeam, withOpacity } from "@/src/utils/utils";
import { useMemo, useState } from "react";

import Image from "next/image";
import TeamChat from "./TeamChat";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const StyledButton = styled(Button)((theme) => ({
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  position: "fixed",
  bottom: 0,
  right: 0,
  minWidth: "416px",
  fontSize: "22px",
  alignItems: "center",
  color: "white",
  zIndex: 8500
}));

const TeamItem = ({ item, width, height, onClick }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        py: 2,
        px: 2,
        color: "black",
        cursor: "pointer",
        ":hover": {
          background: withOpacity(theme.palette.primary.main, 0.2)
        }
      }}
      onClick={onClick}
    >
      <Image
        loading="lazy"
        src={item?.darkLogo ?? DEFAULT_DARK_LOGO}
        alt={item?.darkLogo}
        width={width || 30}
        height={height || 30}
      />
      {item?.name}
    </Box>
  );
};

const Messages = ({ count = 3 }) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const { team } = useTournamentContext();
  const [open, setOpen] = useState(false);
  const [chatting, setChatting] = useState(0);
  const [opponent, setOpponent] = useState(null);

  const myTeams = useMemo(() => {
    if (user) return _.filter(team.teams, (val) => isMyTeam(val, user.id));
    return _.map(team.teams, (val) => val);
  }, [team, user]);

  const onToggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        minWidth: 416,
        zIndex: 8500
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: theme.palette.primary.main,
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          cursor: "pointer",
          px: 2,
          py: 1,
          gap: 2
        }}
      >
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            backgroundColor: "transparent"
          }}
          onClick={onToggleOpen}
        ></Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: "white" }}>
          <Message />
          <Typography variant="h6">Messages</Typography>
        </Box>
        <Box sx={{ display: "flex", position: "relative", alignItems: "center", gap: 1 }}>
          <Tooltip title="Tickets" PopperProps={{ popperOptions: { placement: "top" } }}>
            <IconButton>
              <Sell fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Requests" PopperProps={{ popperOptions: { placement: "top" } }}>
            <IconButton>
              <QuestionAnswer fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Create" PopperProps={{ popperOptions: { placement: "top" } }}>
            <IconButton>
              <AddComment fontSize="small" />
            </IconButton>
          </Tooltip>
          <IconButton onClick={onToggleOpen}>
            {open === true ? (
              <KeyboardDoubleArrowDown fontSize="small" />
            ) : (
              <KeyboardDoubleArrowUp fontSize="small" />
            )}
          </IconButton>
        </Box>
      </Box>

      {open && (
        <Box
          sx={{
            height: 500,
            backgroundColor: "white",
            overflow: "auto"
          }}
        >
          {chatting === 0 ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column"
              }}
            >
              {myTeams &&
                myTeams?.length > 0 &&
                myTeams?.map((item) => (
                  <TeamItem
                    key={"team_" + item.id}
                    item={item}
                    onClick={() => {
                      setChatting(1);
                      setOpponent({
                        type: "TEAM",
                        value: item
                      });
                    }}
                  />
                ))}
            </Box>
          ) : (
            <Box sx={{ height: 500 }}>
              <ButtonBase
                sx={{
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "start",
                  color: "black",
                  fontSize: 20,
                  height: 40,
                  borderBottom: "solid 1px rgba(255,255,255,.2)"
                }}
                onClick={() => {
                  setChatting(0);
                }}
              >
                <ArrowLeft />
                Back
              </ButtonBase>
              {opponent && opponent.type === "TEAM" ? (
                <TeamChat
                  item={opponent.value}
                  sx={{ width: "100%", height: 460, border: "none" }}
                />
              ) : (
                <></>
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Messages;
