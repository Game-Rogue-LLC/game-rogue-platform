import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";

const Welcome = () => {
  const theme = useTheme();
  return (
    <Box sx={{ px: "30px" }}>
      <Typography variant="h4">Home</Typography>
      <Typography
        variant="h3"
        textAlign="center"
        textTransform="uppercase"
        marginTop="30px"
        color="white"
      >
        WELCOME TO{" "}
        <span style={{ color: theme.palette.primary.main }}>ROGUE SOCIAL!</span>
      </Typography>
      <Typography
        variant="body1"
        textAlign="center"
        fontSize="24px"
        marginTop="20px"
      >
        Expore the world of esports with no limits. Create account, follow
        friends, join a team, or search for the perfect event all in one place!
        Join the game now!
      </Typography>
    </Box>
  );
};

export default Welcome;
