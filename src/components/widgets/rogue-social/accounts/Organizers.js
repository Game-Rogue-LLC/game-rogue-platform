import { Box, Paper, Tab, Typography, styled, useTheme } from "@mui/material";
import { ORGANIZATION_PROFILE_LIMIT, ORGANIZER_PROFILE_LIMIT } from "@/src/config/global";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import { KeyboardArrowRight } from "@mui/icons-material";
import OrganizationCreateForm from "@/src/components/widgets/organization/OrganizationCreateForm";
import OrganizerCreateForm from "../../organizer/OrganizerCreateForm";
import OrganizerList from "@/src/components/widgets/rogue-social/accounts/OrganizerList";
import { useState } from "react";

const StyledTab = styled(Tab)(({ theme }) => ({
  justifyContent: "space-between",
  paddingInline: theme.spacing(2),
  ":hover": {
    background: "rgba(0,0,0,.2)"
  }
}));

const Organizers = ({ items }) => {
  const theme = useTheme();
  const [tab, setTab] = useState("0");

  const onTabChange = (e, newTab) => {
    setTab(newTab);
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <TabContext value={tab}>
        <Box
          sx={{
            position: "static",
            borderRight: 1,
            borderColor: "divider"
          }}
        >
          <TabList
            onChange={onTabChange}
            orientation="vertical"
            sx={{
              width: "280px",
              height: "100%",
              background: "linear-gradient(to top,#28160c 60%,#000)"
            }}
          >
            <StyledTab
              icon={<KeyboardArrowRight />}
              iconPosition="end"
              label={<Typography>Create Account</Typography>}
              value="0"
            />
            <StyledTab
              icon={<KeyboardArrowRight />}
              iconPosition="end"
              label={<Typography>Manage Accounts</Typography>}
              value="1"
            />
          </TabList>
        </Box>
        <TabPanel value="0" sx={{ flexGrow: 1 }}>
          <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
            <OrganizerCreateForm disabled={items.length >= ORGANIZER_PROFILE_LIMIT} />
          </Paper>
        </TabPanel>
        <TabPanel value="1" sx={{ flexGrow: 1 }}>
          <OrganizerList items={items} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Organizers;
