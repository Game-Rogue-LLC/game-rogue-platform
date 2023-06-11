import { Badge, Box, Grid, Tab, Typography, styled } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { useMemo, useState } from "react";

import Account from "@/src/components/widgets/rogue-social/profile/Account";
import Featured from "@/src/components/widgets/rogue-social/profile/Featured";
import { KeyboardArrowRight } from "@mui/icons-material";
import Notifications from "@/src/components/widgets/rogue-social/profile/Notifications";
import Privacy from "@/src/components/widgets/rogue-social/profile/Privacy";
import Security from "@/src/components/widgets/rogue-social/profile/Security";
import _ from "lodash";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const StyledTab = styled(Tab)(({ theme }) => ({
  justifyContent: "space-between",
  paddingInline: theme.spacing(2),
  ":hover": {
    background: "rgba(0,0,0,.2)"
  }
}));

const Settings = ({ tab, onTabChange }) => {
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
              label={<Typography>Featured</Typography>}
              value="0"
            />
            <StyledTab
              icon={<KeyboardArrowRight />}
              iconPosition="end"
              label={<Typography>Security</Typography>}
              value="1"
            />
            <StyledTab
              icon={<KeyboardArrowRight />}
              iconPosition="end"
              label={<Typography>Privacy</Typography>}
              value="2"
            />
          </TabList>
        </Box>
        <TabPanel value="0" sx={{ flexGrow: 1, p: 0 }}>
          <Featured />
        </TabPanel>
        <TabPanel value="1" sx={{ flexGrow: 1, p: 0 }}>
          <Security />
        </TabPanel>
        <TabPanel value="2" sx={{ flexGrow: 1, p: 0 }}>
          <Privacy />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default Settings;
