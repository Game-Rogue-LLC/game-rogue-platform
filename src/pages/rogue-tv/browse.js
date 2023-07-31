import { Box, Container, InputAdornment, OutlinedInput, Typography } from "@mui/material";

import GameCategories from "@/src/components/widgets/rogue-tv/GameCategories";
import RogueSocialSplash from "@/src/content/Splash/RogueSocialSplash";
import { Search } from "@mui/icons-material";
import TVLayout from "@/src/content/TVLayout";
import TournamentProvider from "@/src/context/TournamentContext";

const Page = ({}) => {
  return (
    <Container>
      <Box sx={{ py: 2 }}>
        <OutlinedInput
          placeholder="Search Category Tags"
          size="small"
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        />
      </Box>
      <Box sx={{ py: 2 }}>
        <Typography variant="h5" color="white">
          Game Categories
        </Typography>
        <GameCategories />
      </Box>
    </Container>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <RogueSocialSplash />
      <TVLayout>{page}</TVLayout>
    </TournamentProvider>
  );
};

export default Page;
