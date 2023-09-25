import { Box, Tab, Typography, styled } from "@mui/material";
import {
  ORGANIZATION_PROFILE_LIMIT,
  ORGANIZER_PROFILE_LIMIT,
  TEAM_PROFILE_LIMIT
} from "@/src/config/global";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useMemo, useState } from "react";

import Organizations from "@/src/components/widgets/rogue-social/accounts/Organizations";
import Organizers from "@/src/components/widgets/rogue-social/accounts/Organizers";
import Teams from "@/src/components/widgets/rogue-social/accounts/Teams";
import { isMyTeam } from "@/src/utils/utils";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const StyledTab = styled(Tab)(({ theme }) => ({
  fontSize: "16px",
  justifyContent: "left",
  paddingInline: theme.spacing(5)
}));

const ManageAccounts = ({}) => {
  const { user } = useAuthContext();
  const { team, organization, organizer, player } = useTournamentContext();
  const [tab, setTab] = useState("0");

  const myTeams = useMemo(() => {
    if (team?.teams) {
      const res = Object.keys(team.teams)
        .filter((key) => isMyTeam(team.teams[key], user.id))
        .map((key) => team.teams[key]);
      return res;
    }
    return [];
  }, [team?.teams, user]);

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

  const onTabChange = (e, newTab) => {
    setTab(newTab);
  };

  return (
    <Box
      sx={{
        background: "black",
        display: "flex",
        flexGrow: 1
      }}
    >
      <TabContext value={tab}>
        <Box
          sx={{
            borderRight: 1,
            position: "static",
            borderColor: "divider"
          }}
        >
          <TabList
            onChange={onTabChange}
            orientation="vertical"
            sx={{
              width: "280px",
              height: "100%",
              minHeight: "500px",
              background: "linear-gradient(to top,#28160c 60%,#000)"
            }}
          >
            <StyledTab
              value="0"
              label={
                <>
                  <Typography variant="h6" color="inherit">
                    Organization
                  </Typography>
                  <Typography variant="subtitle2">
                    {ORGANIZATION_PROFILE_LIMIT - myOrganizations.length || 0}
                    {ORGANIZATION_PROFILE_LIMIT > 1 ? " accounts remaining" : " account remaining"}
                  </Typography>
                </>
              }
            />
            <StyledTab
              value="1"
              label={
                <>
                  <Typography variant="h6" color="inherit">
                    Event Organizer
                  </Typography>
                  <Typography variant="subtitle2">
                    {ORGANIZER_PROFILE_LIMIT - team.length || 0}
                    {ORGANIZER_PROFILE_LIMIT > 1 ? " accounts remaining" : " account remaining"}
                  </Typography>
                </>
              }
            />
            <StyledTab
              value="2"
              label={
                <>
                  <Typography variant="h6" color="inherit">
                    Team
                  </Typography>
                  <Typography variant="subtitle2">
                    {TEAM_PROFILE_LIMIT - myTeams.length}
                    {TEAM_PROFILE_LIMIT > 1 ? " accounts remaining" : " account remaining"}
                  </Typography>
                </>
              }
            />
          </TabList>
        </Box>
        <TabPanel value="0" sx={{ flexGrow: 1, p: 0 }}>
          <Organizations items={myOrganizations} />
        </TabPanel>
        <TabPanel value="1" sx={{ flexGrow: 1, p: 0 }}>
          <Organizers items={myOrganizers} />
        </TabPanel>
        <TabPanel value="2" sx={{ flexGrow: 1, p: 0 }}>
          <Teams items={myTeams} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ManageAccounts;
