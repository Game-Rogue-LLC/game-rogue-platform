import { Box, Tooltip, Typography } from "@mui/material";

import Image from "next/image";

const GameItem = ({ item, iconOnly }) => {
  if (iconOnly)
    return (
      <Tooltip title={item.name}>
        <Box sx={{ width: 40, height: 40 }}>
          <Image src={item.image} width={40} height={40} alt={item.name} />
        </Box>
      </Tooltip>
    );

  return (
    <Box>
      <Image src={item.image} width={40} height={40} alt={item.name} />
      <Typography>{item.name}</Typography>
    </Box>
  );
};

export default GameItem;
