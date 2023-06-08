import * as React from "react";
import Link from "next/link";
import { styled, useTheme } from "@mui/material/styles";
import {
  Avatar,
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
import { ArrowRight, Home, Settings } from "@mui/icons-material";

import OrganizationMenu from "@/src/content/OrganizationSidebar/Menu";
import TeamMenu from "@/src/content/OrganizationSidebar/TeamMenu";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { useRouter } from "next/router";
import _ from "lodash";

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

export default function OrganizationSidebar(props) {
  const theme = useTheme();
  const router = useRouter();
  const { organization, player, team } = useTournamentContext();
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
                  alt={player.players[user.id]?.name}
                  src={player.players[user.id]?.profilePic}
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
                  primary={`My Organizations`}
                  primaryTypographyProps={{
                    color: "primary",
                    fontWeight: "medium",
                    variant: "body2",
                    textTransform: "uppercase"
                  }}
                />
              </ListItemButton>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElMenu}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left"
                }}
                open={Boolean(anchorElMenu)}
                onClose={handleCloseMenu}
              >
                <MenuItem onClick={handleCloseMenu} key="organization-create">
                  <Link href="/organization/create">
                    <Typography textAlign="center">Add Organization</Typography>
                  </Link>
                </MenuItem>
              </Menu>
            </ListItem>
            <Divider />
            {Object.keys(_.filter(organization.organizations, (val) => val.uid === user.id)).map(
              (id) => {
                const item = organization.organizations[id];
                if (item.uid === user?.id)
                  return <OrganizationMenu key={"organization_menu_" + id} organization={item} />;
              }
            )}

            {organization?.organizations &&
              _.filter(organization.organizations, (val) => val.uid === user.id).length < 3 && (
                <>
                  <ListItem component="div" disablePadding>
                    <ListItemButton
                      sx={{ height: 56 }}
                      onClick={() => {
                        router.push("/organization/create");
                      }}
                    >
                      <ListItemText
                        sx={{
                          textAlign: "center",
                          color: theme.palette.primary.main
                        }}
                      >
                        Create Organization
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
          </FireNav>
        </FirePaper>
      </Box>
    </Box>
  );
}
