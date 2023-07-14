import { Box, Grid, Typography } from "@mui/material";

import { GAMES } from "@/src/config/global";
import GameItem from "@/src/components/item/GameItem";
import _ from "lodash";
import { useAuthContext } from "@/src/context/AuthContext";
import { useMemo } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

const GamesInterested = ({ uid }) => {
  const { player } = useTournamentContext();

  const interested = useMemo(() => {
    if (player.players[uid] && player.players[uid].interestedGames) {
      return _.filter(GAMES, (val) => _.includes(player.players[uid].interestedGames, val.id));
    }
    return [];
  }, [player.players[uid]?.interestedGames]);

  const notInterested = useMemo(() => {
    if (player.players[uid] && player.players[uid].notInterestedGames) {
      return _.filter(GAMES, (val) => _.includes(player.players[uid].notInterestedGames, val.id));
    }
    return [];
  }, [player.players[uid]?.notInterestedGames]);

  return (
    <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", borderRadius: 1 }}>
      <Box sx={{ borderBottom: "solid 1px rgba(255,255,255,.2)", padding: 2 }}>
        <Typography variant="h4" fontSize={24}>
          Games
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ p: 2 }}>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6" textAlign="center">
            Interested
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: true
            }}
          >
            {interested.length > 0 ? (
              interested.map((val) => <GameItem key={val.id} iconOnly={true} item={val} />)
            ) : (
              <Typography textAlign="center" textTransform="uppercase">
                No Games.
              </Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Typography variant="h6" textAlign="center">
            Not Interested
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: true
            }}
          >
            {notInterested.length > 0 ? (
              notInterested.map((val) => <GameItem key={val.id} iconOnly={true} item={val} />)
            ) : (
              <Typography textAlign="center" textTransform="uppercase">
                No Games.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GamesInterested;
