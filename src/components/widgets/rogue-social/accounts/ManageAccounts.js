import { Box, Tab } from "@mui/material";
import {
  ORGANIZATION_PROFILE_LIMIT,
  ORGANIZER_PROFILE_LIMIT,
  TEAM_PROFILE_LIMIT
} from "@/src/config/global";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import Organizations from "@/src/components/widgets/rogue-social/accounts/Organizations";
import Teams from "@/src/components/widgets/rogue-social/accounts/Teams";
import { useState } from "react";

const ManageAccounts = ({ isMainPage }) => {
  const [tab, setTab] = useState("0");

  const onTabChange = (e, newTab) => {
    setTab(newTab);
  };

  return (
    <Box>
      <TabContext value={tab}>
        <TabList onChange={onTabChange}>
          <Tab
            value="0"
            label={
              "Organizer - " +
              ORGANIZER_PROFILE_LIMIT +
              (ORGANIZER_PROFILE_LIMIT > 1 ? " accounts" : " account")
            }
          />
          <Tab
            value="1"
            label={
              "Organization - " +
              ORGANIZATION_PROFILE_LIMIT +
              (ORGANIZATION_PROFILE_LIMIT > 1 ? " accounts" : " account")
            }
          />
          <Tab
            value="2"
            label={
              "Team - " + TEAM_PROFILE_LIMIT + (TEAM_PROFILE_LIMIT > 1 ? " accounts" : " account")
            }
          />
        </TabList>
        <TabPanel value="0"></TabPanel>
        <TabPanel value="1">
          <Organizations isMainPage={isMainPage} />
        </TabPanel>
        <TabPanel value="2">
          <Teams isMainPage={isMainPage} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default ManageAccounts;
