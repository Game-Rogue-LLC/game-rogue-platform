import { Box, Button, Paper, Typography } from "@mui/material";

const CategoryCard = ({ banner, title, children, sx }) => {
  return (
    <Paper sx={{ borderRadius: 2, overflow: "hidden", ...sx }}>
      <Box component="img" src={banner} height={80} width="100%" sx={{ objectFit: "cover" }}></Box>
      <Box sx={{ padding: 2 }}>
        <Typography variant="h4" fontSize={26}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {children}
        </Typography>
        <Box textAlign="right" sx={{ mt: 1 }}>
          <Button variant="contained" sx={{ color: "white" }}>
            More
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default CategoryCard;
