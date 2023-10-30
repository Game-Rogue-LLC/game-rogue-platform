import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import Button from "@mui/material/Button";
import OrganizationList from "@/src/components/widgets/rogue-social/accounts/OrganizationList";
import OrganizerList from "@/src/components/widgets/rogue-social/accounts/OrganizerList";
import TeamList from "@/src/components/widgets/rogue-social/accounts/TeamList";
import { isMyTeam } from "@/src/utils/utils";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Page = (props) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { organization, organizer, event, team } = useTournamentContext();

  useEffect(() => {
    setTitle("Event Organizer");
    // if (Object.keys(organizer.organizers).length === 0) router.push("/organizer/create");
    organizer.setCurrent(null);
    event.setCurrent(null);
  }, []);

  const myOrganizers = useMemo(() => {
    if (organizer?.organizers) {
      return _.filter(organizer.organizers, (val) => val.uid === user.id);
    }
    return [];
  }, [organizer?.organizers, user]);

  const myOrganizations = useMemo(() => {
    if (organization?.organizations) {
      return _.filter(organization.organizations, (val) => val.uid === user.id);
    }
    return [];
  }, [organization?.organizations, user]);

  const myTeams = useMemo(() => {
    if (team?.teams) {
      return Object.keys(team.teams)
        .filter((key) => isMyTeam(team.teams[key], user?.id))
        .map((key) => team.teams[key]);
    }
    return [];
  }, [team?.teams, user]);

  return (
    <>
      <Paper sx={{ px: 4, py: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            color={theme.palette.primary.main}
            sx={{ fontStyle: "italic", mb: 2 }}
          >
            My Event Organizers
          </Typography>
          <Button variant="contained" onClick={() => {router.push('/event/create')}}>Create Event</Button>
        </Box>
        {myOrganizers.length > 0 ? (
          <OrganizerList items={myOrganizers} />
        ) : (
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            No Event Organizers
          </Typography>
        )}
      </Paper>

      <Paper sx={{ px: 4, py: 2, mt: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            color={theme.palette.primary.main}
            sx={{ fontStyle: "italic", mb: 2 }}
          >
            My Organizations
          </Typography>
          <Button variant="contained" onClick={() => {router.push('/organization/create')}}>Create Organization</Button>
        </Box>
        {myOrganizations.length > 0 ? (
          <OrganizationList items={myOrganizations} />
        ) : (
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            No Organizations
          </Typography>
        )}
      </Paper>

      <Paper sx={{ px: 4, py: 2, mt: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography
            variant="h4"
            color={theme.palette.primary.main}
            sx={{ fontStyle: "italic", mb: 2 }}
          >
            My Teams
          </Typography>
          <Button variant="contained" onClick={() => {router.push('/team/create')}}>Create Team</Button>
        </Box>
        {myTeams.length > 0 ? (
          <TeamList items={myTeams} />
        ) : (
          <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
            No Teams
          </Typography>
        )}
      </Paper>
    </>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
