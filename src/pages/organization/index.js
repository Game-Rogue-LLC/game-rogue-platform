import { Alert, Box, OutlinedInput, Paper, TextField, Typography, useTheme } from "@mui/material";
import { useEffect, useMemo } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import Button from "@mui/material/Button";
import OrganizationList from "@/src/components/widgets/rogue-social/accounts/OrganizationList";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Page = (props) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const router = useRouter();
  const { setTitle } = useAppContext();
  const { organization, event, team } = useTournamentContext();

  useEffect(() => {
    setTitle("Event Organization");
    if (Object.keys(organization.organizations).length === 0) router.push("/organization/create");
    organization.setCurrent(null);
    event.setCurrent(null);
  }, []);

  const myOrganizations = useMemo(() => {
    if (organization?.organizations) {
      return _.filter(organization.organizations, (val) => val.uid === user.id);
    }
    return [];
  }, [organization?.organizations, user]);

  return (
    <Paper sx={{ px: 4, py: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography
          variant="h4"
          color={theme.palette.primary.main}
          sx={{ fontStyle: "italic", mb: 2 }}
        >
          My Organizations
        </Typography>
        <Button variant="contained">Create Event</Button>
      </Box>
      {myOrganizations.length > 0 ? (
        <OrganizationList items={myOrganizations} />
      ) : (
        <Typography variant="subtitle1" sx={{ textAlign: "center" }}>
          No Organizations
        </Typography>
      )}
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
