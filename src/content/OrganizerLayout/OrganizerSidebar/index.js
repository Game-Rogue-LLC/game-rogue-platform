import * as React from "react";

import { ArrowRight, Home, Settings } from "@mui/icons-material";
import {
  Box,
  Divider,
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

import Avatar from "@/src/components/Avatar";
import Link from "next/link";
import OrganizationMenu from "./Menu";
import { TEAM_PROFILE_LIMIT } from "@/src/config/global";
import TeamMenu from "./TeamMenu";
import _ from "lodash";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const FireNav = styled(List)(({ theme }) => ({
  "& .MuiPaper-root": {
    backgroundColor: theme.palette.primary.main
  },
  "& .MuiListItemButton-root": {
    paddingLeft: 24,
    paddingRight: 24
  },
  "& .MuiListItemIcon-root": {
    minWidth: 0,
    marginRight: 16
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20
  }
}));

const FirePaper = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.card.darker,
  borderRadius: 0
}));

export default function OrganizerSidebar(props) {
  const theme = useTheme();
  const router = useRouter();
  const { organizer, player, team } = useTournamentContext();
  const [showMenu, setShowMenu] = React.useState(false);
  const { user } = useAuthContext();
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const toggleShowMenu = (e) => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "2px 0px 7px #301701ba",
        zIndex: 1,
        position: "relative"
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "300px",
          height: "100%"
        }}
      >
        <FirePaper
          elevation={0}
          sx={{
            width: "100%",
            height: "100%",
            maxWidth: "100%",
            position: "absolute",
            overflowX: "hidden",
            overflowY: "auto"
          }}
        >
          <FireNav component="nav" disablePadding>
            <ListItem
              key={"profile_container"}
              sx={{
                display: "flex",
                flexFlow: "column",
                alignItems: "center",
                p: 2
              }}
            >
              <Box>
                <Avatar
                  size="large"
                  user={player.players[user.id]}
                  sx={{ width: 100, height: 100 }}
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">{player.players[user.id]?.name}</Typography>
              </Box>
            </ListItem>
            <Divider />
            <ListItem key={"profile_menu_container"} component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon>
                  <Home color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={`My Organizer`}
                  primaryTypographyProps={{
                    color: "primary",
                    fontWeight: "medium",
                    variant: "body2",
                    textTransform: "uppercase"
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            {_.filter(organizer.organizers, (val) => val.uid === user?.id).map((item) => {
              if (item.uid === user?.id)
                return <OrganizationMenu key={"organizer_menu_" + item.id} organizer={item} />;
            })}

            {organizer?.organizers &&
              _.filter(organizer.organizers, (val) => val.uid === user?.id).length < 3 && (
                <>
                  <ListItem component="div" disablePadding>
                    <ListItemButton
                      sx={{ height: 56 }}
                      onClick={() => {
                        router.push("/organizer/create");
                      }}
                    >
                      <ListItemText
                        sx={{
                          color: theme.palette.primary.main
                        }}
                      >
                        Create Organizer
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )}

            <Divider />
            <ListItem key={"my-teams-container"} component="div" disablePadding>
              <ListItemButton sx={{ height: 56 }}>
                <ListItemIcon>
                  <Home color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={`My Teams`}
                  primaryTypographyProps={{
                    color: "primary",
                    fontWeight: "medium",
                    variant: "body2",
                    textTransform: "uppercase"
                  }}
                />
              </ListItemButton>
            </ListItem>
            <Divider />
            {Object.keys(team.teams).map((id) => {
              const item = team.teams[id];
              if (item.uid === user?.id) return <TeamMenu key={"team_menu_" + id} team={item} />;
            })}
            <Divider />

            {team?.teams &&
              _.filter(team.teams, (val) => val.uid === user?.id).length < TEAM_PROFILE_LIMIT && (
                <>
                  <ListItem component="div" disablePadding>
                    <ListItemButton
                      sx={{ height: 56 }}
                      onClick={() => {
                        router.push("/team/create");
                      }}
                    >
                      <ListItemText
                        sx={{
                          color: theme.palette.primary.main
                        }}
                      >
                        Create Team
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )}
          </FireNav>
        </FirePaper>
      </Box>
    </Box>
  );
}
