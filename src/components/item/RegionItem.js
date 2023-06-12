import { Box, Chip, Tooltip, Typography } from "@mui/material";

const RegionItem = ({ item }) => {
  return (
    <Box>
      <Chip label={item.name}></Chip>
    </Box>
  );
};

export default RegionItem;
