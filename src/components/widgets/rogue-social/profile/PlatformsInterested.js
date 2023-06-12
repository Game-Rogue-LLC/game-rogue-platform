import { Box, Grid, Typography } from "@mui/material";

import { PLATFORMS } from "@/src/config/global";
import PlatformItem from "@/src/components/item/PlatformItem";
import _ from "lodash";
import { useAuthContext } from "@/src/context/AuthContext";
import { useMemo } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

const PlatformsInterested = ({ uid, sx }) => {
  const { player } = useTournamentContext();

  const interested = useMemo(() => {
    if (player.players[uid] && player.players[uid].interestedPlatforms) {
      return _.filter(PLATFORMS, (val) =>
        _.includes(player.players[uid].interestedPlatforms, val.id)
      );
    }
    return [];
  }, [player.players[uid]?.interestedPlatforms]);

  const notInterested = useMemo(() => {
    if (player.players[uid] && player.players[uid].notInterestedPlatforms) {
      return _.filter(PLATFORMS, (val) =>
        _.includes(player.players[uid].notInterestedPlatforms, val.id)
      );
    }
    return [];
  }, [player.players[uid]?.notInterestedPlatforms]);

  return (
    <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", borderRadius: 1, ...sx }}>
      <Box sx={{ borderBottom: "solid 1px rgba(255,255,255,.2)", padding: 2 }}>
        <Typography variant="h4" fontSize={24}>
          Platforms
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
              gap: 2,
              flexWrap: true
            }}
          >
            {interested.length > 0 ? (
              interested.map((val) => <PlatformItem key={val.id} iconOnly={true} item={val} />)
            ) : (
              <Typography textAlign="center" textTransform="uppercase">
                No Platforms.
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
              gap: 2,
              flexWrap: true
            }}
          >
            {notInterested.length > 0 ? (
              notInterested.map((val) => <PlatformItem key={val.id} iconOnly={true} item={val} />)
            ) : (
              <Typography textAlign="center" textTransform="uppercase">
                No Platforms.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PlatformsInterested;
