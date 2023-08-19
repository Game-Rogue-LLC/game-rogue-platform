import { Box, Divider, Typography, useTheme } from "@mui/material";

import AccountInfo from "./profile/AccountInfo";
import FeaturedTournaments from "@/src/components/widgets/FeaturedTournaments";
import UserInfo from "@/src/components/widgets/user/UserInfo";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { withOpacity } from "@/src/utils/utils";

const FeaturedSocial = ({}) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const { player } = useTournamentContext();

  return (
    <Box>
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" fontStyle="italic" color={theme.palette.primary.main}>
          EVENTS
        </Typography>
        <Divider sx={{ mt: 2, backgroundColor: withOpacity(theme.palette.primary.main, 0.5) }} />
        <FeaturedTournaments sx={{ mt: 2, borderBottom: "none" }} />
      </Box>
      {/* <Box sx={{ p: 4 }}>
        <Typography variant="h3" fontStyle="italic" color={theme.palette.primary.main}>
          ORGANIZERS
        </Typography>
        <Divider sx={{ mt: 2, backgroundColor: withOpacity(theme.palette.primary.main, 0.5) }} />
        <Box sx={{ mt: 2 }}>
          <AccountInfo item={player.players[user?.id]} />
        </Box>
      </Box> */}
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" fontStyle="italic" color={theme.palette.primary.main}>
          TEAMS
        </Typography>
        <Divider sx={{ mt: 2, backgroundColor: withOpacity(theme.palette.primary.main, 0.5) }} />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ textAlign: "center", fontSize: 18 }}>
            No teams have been featured yet.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ p: 4 }}>
        <Typography variant="h3" fontStyle="italic" color={theme.palette.primary.main}>
          PLAYERS
        </Typography>
        <Divider sx={{ mt: 2, backgroundColor: withOpacity(theme.palette.primary.main, 0.5) }} />
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ textAlign: "center", fontSize: 18 }}>
            No players have been featured yet.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedSocial;
