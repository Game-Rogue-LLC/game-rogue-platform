import { Box, Button, Paper, Typography } from "@mui/material";

import { MoreHoriz } from "@mui/icons-material";

const CategoryCard = ({ banner, title, children, sx }) => {
  return (
    <Paper sx={{ borderRadius: 2, height: 350, overflow: "hidden", ...sx }}>
      <Box component="img" src={banner} height={80} width="100%" sx={{ objectFit: "cover" }}></Box>
      <Box
        sx={{
          padding: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: 270,
          gap: 2
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontSize={26}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {children}
          </Typography>
        </Box>
        <Box textAlign="right">
          <Button variant="contained" sx={{ color: "white" }}>
            More ...
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CategoryCard;
