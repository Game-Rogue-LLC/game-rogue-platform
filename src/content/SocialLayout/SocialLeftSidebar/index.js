import * as React from "react";

import {
  ArrowRight,
  Explore,
  Home,
  Groups,
  SportsEsports,
  Settings,
  Notifications,
  People,
  Man
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Tabs,
  Tab,
  Divider,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import Link from "next/link";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

export default function SocialLeftSidebar({ sx }) {
  const theme = useTheme();
  const router = useRouter();
  const { organizer, player } = useTournamentContext();
  const [showMenu, setShowMenu] = React.useState(false);
  const { user } = useAuthContext();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "500px",
        zIndex: 1,
        ...sx
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Social Sidebar"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Item One" {...a11yProps(0)} />
        <Tab label="Item Two" {...a11yProps(1)} />
        <Tab label="Item Three" {...a11yProps(2)} />
        <Tab label="Item Four" {...a11yProps(3)} />
        <Tab label="Item Five" {...a11yProps(4)} />
        <Tab label="Item Six" {...a11yProps(5)} />
        <Tab label="Item Seven" {...a11yProps(6)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four
      </TabPanel>
      <TabPanel value={value} index={4}>
        Item Five
      </TabPanel>
      <TabPanel value={value} index={5}>
        Item Six
      </TabPanel>
      <TabPanel value={value} index={6}>
        Item Seven
      </TabPanel>
      {/*    <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "100%",
          overflowX: "hidden",
          overflowY: "auto",
          backgroundColor: "transparent",
        }}
      >
        <List component="nav" disablePadding>
          <ListItem key={"home_menu_container"} component="div" disablePadding>
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <Home fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={`Home`}
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: "medium",
                  variant: "h4",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem key={"chat_menu_container"} component="div" disablePadding>
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <SportsEsports fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={`My Match Chats`}
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: "medium",
                  variant: "h4",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"discover_menu_container"}
            component="div"
            disablePadding
          >
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <Explore fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={`Discover`}
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: "medium",
                  variant: "h4",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"notifications_menu_container"}
            component="div"
            disablePadding
          >
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <Notifications fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={`Notifications`}
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: "medium",
                  variant: "h4",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"featured_menu_container"}
            component="div"
            disablePadding
          >
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <Home fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={`Featured`}
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: "medium",
                  variant: "h4",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"my_teams_menu_container"}
            component="div"
            disablePadding
          >
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <People fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={`My Teams`}
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: "medium",
                  variant: "h4",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"community_menu_container"}
            component="div"
            disablePadding
          >
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <Groups fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={`My Communities`}
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: "medium",
                  variant: "h4",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"profile_menu_container"}
            component="div"
            disablePadding
          >
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <Man fontSize="large" />
              </ListItemIcon>
              <ListItemText
                primary={`Profile`}
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: "medium",
                  variant: "h4",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </ListItem>
          <ListItem
            key={"settings_menu_container"}
            component="div"
            disablePadding
          >
            <ListItemButton sx={{ height: 56 }}>
              <ListItemIcon>
                <Settings lancer="large" />
              </ListItemIcon>
              <ListItemText
                primary={`Settings`}
                primaryTypographyProps={{
                  color: "white",
                  fontWeight: "medium",
                  variant: "h4",
                  fontSize: "22px",
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Paper> */}
    </Box>
  );
}
