import { Box, List } from "@mui/material";

import TeamHistoryItem from "./TeamHistoryItem";
import _ from "lodash";

const TeamHistory = ({ items }) => {
  return (
    <List>
      {_.map(items, (val) => (
        <TeamHistoryItem key={val.id} item={val} />
      ))}
    </List>
  );
};

export default TeamHistory;
