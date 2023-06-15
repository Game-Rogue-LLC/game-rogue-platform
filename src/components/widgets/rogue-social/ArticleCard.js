import { Box, Typography } from "@mui/material";

import { useStyleContext } from "@/src/context/StyleContext";

const ArticleCard = ({ item }) => {
  const { secondaryBackgroundColor } = useStyleContext();
  return (
    <Box sx={{ border: "solid 1px rgba(255,255,255,.2)" }}>
      <Box sx={{ padding: 2 }}>
        <Typography variant="body1" color="white">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </Typography>
      </Box>
      <Box
        sx={{
          height: 50,
          backgroundColor: secondaryBackgroundColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography variant="h5">Lorem Ipsum</Typography>
      </Box>
    </Box>
  );
};

export default ArticleCard;
