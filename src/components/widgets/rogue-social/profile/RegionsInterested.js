import { Box, Grid, Typography } from "@mui/material";

import { EVENT_REGIONS } from "@/src/config/global";
import RegionItem from "@/src/components/item/RegionItem";
import _ from "lodash";
import { useAuthContext } from "@/src/context/AuthContext";
import { useMemo } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

const RegionsInterested = ({ uid, sx }) => {
  const { player } = useTournamentContext();

  const interested = useMemo(() => {
    if (player.players[uid] && player.players[uid].interestedRegions) {
      return _.filter(EVENT_REGIONS, (val) =>
        _.includes(player.players[uid].interestedRegions, val.id)
      );
    }
    return [];
  }, [player.players[uid]?.interestedRegions]);

  const notInterested = useMemo(() => {
    if (player.players[uid] && player.players[uid].notInterestedRegions) {
      return _.filter(EVENT_REGIONS, (val) =>
        _.includes(player.players[uid].notInterestedRegions, val.id)
      );
    }
    return [];
  }, [player.players[uid]?.notInterestedRegions]);

  return (
    <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", borderRadius: 1, ...sx }}>
      <Box sx={{ borderBottom: "solid 1px rgba(255,255,255,.2)", padding: 2 }}>
        <Typography variant="h4" fontSize={24}>
          Regions
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
              interested.map((val) => <RegionItem key={val.id} item={val} />)
            ) : (
              <Typography textAlign="center" textTransform="uppercase">
                No Regions.
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
              notInterested.map((val) => <RegionItem key={val.id} item={val} />)
            ) : (
              <Typography textAlign="center" textTransform="uppercase">
                No Regions.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegionsInterested;
