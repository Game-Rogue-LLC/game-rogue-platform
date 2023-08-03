import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { DEFAULT_DARK_LOGO } from "@/src/config/global";
import Image from "next/image";
import match from "@/lib/firestore/collections/match";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const MatchChatAnimation = ({ mid }) => {
  const { user } = useAuthContext();
  const [myTeam, setMyTeam] = useState(null);
  const [opTeam, setOpTeam] = useState(null);
  const [item, setItem] = useState(null);
  const { team, match } = useTournamentContext();

  const isMyTeam = (team) => {
    return team?.uid === user.id;
  };

  useEffect(() => {
    if (match?.matches && match.matches.findIndex((val) => val.id === mid) >= 0)
      setItem(match.matches.find((val) => val.id === mid));
  }, [match?.matches, mid]);

  useEffect(() => {
    if (isMyTeam(team?.teams[item?.participants[0]?.id])) {
      setMyTeam(team.teams[item.participants[0].id]);
      setOpTeam(team.teams[item.participants[1].id]);
    } else if (isMyTeam(team?.teams[item?.participants[1]?.id])) {
      setMyTeam(team.teams[item.participants[1].id]);
      setOpTeam(team.teams[item.participants[0].id]);
    }
  }, [team?.teams, item]);

  if (!myTeam?.darkLogo || !opTeam?.darkLogo)
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "black",
          zIndex: 9999
        }}
      ></Box>
    );

  return (
    <Box className="match-chat-anim">
      <video
        style={{
          width: "100vw",
          height: "100vh",
          zIndex: 9999
        }}
        muted={true}
        autoPlay={true}
      >
        <source src="/static/videos/mc_animation.webm" type="video/webm" />
      </video>
      <Box className="match-chat-team" sx={{ left: "25vw" }}>
        <Box textAlign={"center"}>
          <Image
            style={{
              mt: 2,
              filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))"
            }}
            width={150}
            height={150}
            src={myTeam.darkLogo}
          />
          <Typography variant="body1" textAlign="center" fontSize="1.5rem" color="white">
            {myTeam.name}
          </Typography>
        </Box>
      </Box>
      <Box className="match-chat-team" sx={{ left: "75vw" }}>
        <Box textAlign={"center"}>
          <Image
            style={{
              mt: 2,
              filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))"
            }}
            width={150}
            height={150}
            src={opTeam.darkLogo}
          />
          <Typography variant="body1" textAlign="center" fontSize="1.5rem" color="white">
            {opTeam.name}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MatchChatAnimation;
