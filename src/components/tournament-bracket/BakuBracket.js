import { Box, Grid } from "@mui/material";

import Match from "@/src/components/tournament-bracket/Match";

const BakuBracket = ({ matches, handlePartyClick, handleMatchClick }) => {
  return (
    <Grid container spacing={2} rowSpacing={2}>
      {matches &&
        _.map(matches, (val) => (
          <Grid item xs={6} md={3}>
            <Match
              item={val}
              onMatchClick={(props) => {
                if (handleMatchClick) handleMatchClick(props.match);
              }}
              onPartyClick={(party, partyWon) => {
                if (handlePartyClick) handlePartyClick(party, partyWon);
              }}
            />
          </Grid>
        ))}
    </Grid>
  );
};

export default BakuBracket;
