import { Box, Tooltip, Typography } from "@mui/material";

const PlatformItem = ({ item, iconOnly }) => {
  if (iconOnly)
    return (
      <Tooltip title={item.name}>
        <Box sx={{ width: 40, height: 40 }}>
          <img src={item.image} width={40} height={40} alt={item.name} />
        </Box>
      </Tooltip>
    );

  return (
    <Box>
      <img src={item.image} width={40} height={40} alt={item.name} />
      <Typography>{item.name}</Typography>
    </Box>
  );
};

export default PlatformItem;
