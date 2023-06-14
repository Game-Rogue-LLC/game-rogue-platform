import { Box, ListItem, Typography } from "@mui/material";

import { formatDate } from "@/src/utils/utils";

const TeamHistoryItem = ({ item }) => {
  return (
    <ListItem sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
      <Box>
        <Typography variant="body1" fontSize="20px" color="white">
          {item?.text}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" fontSize="20px" color="gray">
          {formatDate(item?.createdAt)}
        </Typography>
      </Box>
    </ListItem>
  );
};

export default TeamHistoryItem;
