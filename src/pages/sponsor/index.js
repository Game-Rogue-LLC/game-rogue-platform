import {
  Alert,
  Box,
  Button,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useMemo } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import SponsorList from "@/src/components/widgets/rogue-social/accounts/SponsorList";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Page = (props) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { sponsor, event, team } = useTournamentContext();

  useEffect(() => {
    setTitle("Sponsor");
    if (Object.keys(sponsor.sponsors).length === 0) router.push("/sponsor/create");
  }, []);

  const mySponsors = useMemo(() => {
    if (sponsor?.sponsors) {
      return _.filter(sponsor.sponsors, (val) => val.uid === user.id);
    }
    return [];
  }, [sponsor?.sponsors, user]);

  return (
    <Paper sx={{ px: 4, py: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          color={theme.palette.primary.main}
          sx={{ fontStyle: "italic", mb: 2 }}
        >
          My Sponsors
        </Typography>
        <Button variant="contained">Create Event</Button>
      </Box>
      {mySponsors.length > 0 ? (
        <SponsorList items={mySponsors} />
      ) : (
        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
          No Sponsors
        </Typography>
      )}
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
