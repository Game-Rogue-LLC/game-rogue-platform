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
  Paper,
  Tooltip,
  Typography
} from "@mui/material";
import { DEFAULT_DARK_LOGO, TEAM_PROFILE_LIMIT } from "@/src/config/global";
import { styled, useTheme } from "@mui/material/styles";
import { useMemo, useState } from "react";

import Avatar from "@/src/components/Avatar";
import DropdownMenu from "@/src/components/DropdownMenu";
import Link from "next/link";
import Menu from "./Menu";
import OrganizationMenu from "@/src/content/OrganizationSidebar/OrganizationMenu";
import TeamMenu from "@/src/content/OrganizationSidebar/TeamMenu";
import _ from "lodash";
import { isMyTeam } from "@/src/utils/utils";
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

export default function OrganizationSidebar(props) {
  const theme = useTheme();
  const router = useRouter();
  const { organization, organizer, player, team, event } = useTournamentContext();
  const [showMenu, setShowMenu] = useState(false);
  const { user, setUser } = useAuthContext();
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const toggleShowMenu = (e) => {
    setShowMenu((prevState) => !prevState);
  };

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

  const organizerEvents = useMemo(() => {
    if (organizer?.organizers && user?.connectedAccount == "organizer") {
      return _.filter(event.events, (item, idx) => item.oid == user.organizerId);
    }
    return [];
  }, [user, organizer]);

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
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  size="large"
                  user={player.players[user.id]}
                  sx={{ width: 100, height: 100 }}
                />
                <Avatar
                  size="large"
                  sx={{ width: 100, height: 100, backgroundColor: "white" }}
                  hideStatus={true}
                  src={
                    user.connectedAccount == "organizer"
                      ? organizer.organizers[user.organizerId]?.darkLogo
                      : user.connectedAccount == "organization"
                      ? organization.organizations[user.organizationId]?.darkLogo
                      : user.connectedAccount == "team"
                      ? team.teams[user.teamId]?.darkLogo
                      : DEFAULT_DARK_LOGO
                  }
                />
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6">{player.players[user.id]?.name}</Typography>
              </Box>
              {/* Begin Connect Button */}
              <DropdownMenu
                name="connect"
                title={
                  user.connectedAccount == "organizer"
                    ? organizer.organizers[user.organizerId]?.name
                    : user.connectedAccount == "organization"
                    ? organization.organizations[user.organizationId]?.name
                    : user.connectedAccount == "team"
                    ? team.teams[user.teamId]?.name
                    : "Connect"}
                sx={{ mt: 2 }}
                onChange={(item) => {
                  if (Object.keys(organizer.organizers).includes(item.id)) {
                    player.update(user.id, {
                      organizerId: item.id,
                      connectedAccount: "organizer"
                    });
                    setUser({
                      ...user,
                      organizerId: item.id,
                      connectedAccount: "organizer"
                    });
                  } else if (Object.keys(organization.organizations).includes(item.id)) {
                    player.update(user.id, {
                      organizationId: item.id,
                      connectedAccount: "organization"
                    });
                    setUser({
                      ...user,
                      organizationId: item.id,
                      connectedAccount: "organization"
                    });
                  } else if (Object.keys(team.teams).includes(item.id)) {
                    player.update(user.id, {
                      teamId: item.id,
                      connectedAccount: "team"
                    });
                    setUser({
                      ...user,
                      teamId: item.id,
                      connectedAccount: "team"
                    });
                  }
                }}
                items={[
                  {
                    id: 0,
                    value: "event-organizer",
                    name: "Event Organizers",
                    disabled: true
                  },
                  ...(myOrganizers.length > 0
                    ? myOrganizers.map((val, i) => ({ id: val.id, name: val.name }))
                    : [
                        {
                          id: "no-organizers",
                          value: "no-organizers",
                          name: "No Organizers"
                        }
                      ]),
                  {
                    id: 1,
                    value: "organization",
                    name: "Organizations",
                    disabled: true
                  },
                  ...(myOrganizations.length > 0
                    ? myOrganizations.map((val, i) => ({ id: val.id, name: val.name }))
                    : [
                        {
                          id: "no-organizers",
                          value: "no-organizers",
                          name: "No Organizers"
                        }
                      ]),
                  {
                    id: 2,
                    value: "team",
                    name: "Teams",
                    disabled: true
                  },
                  ...myTeams.map((val, i) => ({ id: val.id, name: val.name }))
                ]}
              />
              {/* End Connect Button */}
            </ListItem>
            <Divider />
            {organizerEvents.length > 0 ? (
              organizerEvents.map((item, idx) => (
                <Menu
                  key={`event_terminal_menu_${idx}`}
                  isOpen={openMenu === item.id}
                  onOpen={() => setOpenMenu(item.id)}
                  onClose={() => setOpenMenu(null)}
                  item={{
                    id: `event-terminal-menu_${idx}`,
                    name: `${item.name} Terminal`,
                    children: [
                      {
                        name: "Matches",
                        href: `/match?event=${item.id}`
                      },
                      {
                        name: "Tickets",
                        href: `/ticket?event=${item.id}`
                      },
                      {
                        name: "Staff",
                        href: `/staff?event=${item.id}`
                      },
                      {
                        name: "Participants",
                        href: `/participant?event=${item.id}`
                      },
                      {
                        name: "Edit Event",
                        href: `/event/${item.id}/edit`
                      },
                      {
                        name: "divider"
                      },
                      {
                        name: "Event Calendar",
                        href: "/"
                      },
                      {
                        name: "Event Format",
                        href: "/"
                      },
                      {
                        name: "divider"
                      },
                      {
                        name: "Organizer+",
                        href: `/match/organize?event=${item.id}`
                      }
                    ]
                  }}
                />
              ))
            ) : (
              <Menu
                key="event_terminal_menu"
                isOpen={openMenu === 'event'}
                onOpen={() => setOpenMenu('event')}
                onClose={() => setOpenMenu(null)}
                item={{
                  id: "event-terminal-menu",
                  name: "Event Terminal",
                  children: [
                    {
                      name: "Matches",
                      href: "/",
                      disabled: true
                    },
                    {
                      name: "Tickets",
                      href: "/",
                      disabled: true
                    },
                    {
                      name: "Staff",
                      href: "/",
                      disabled: true
                    },
                    {
                      name: "Participants",
                      href: "/",
                      disabled: true
                    },
                    {
                      name: "Edit Event",
                      href: "/",
                      disabled: true
                    },
                    {
                      name: "divider"
                    },
                    {
                      name: "Event Calendar",
                      href: "/",
                      disabled: true
                    },
                    {
                      name: "Event Format",
                      href: "/",
                      disabled: true
                    },
                    {
                      name: "divider"
                    },
                    {
                      name: "Organizer+",
                      href: "/",
                      disabled: true
                    }
                  ]
                }}
              />
            )}
            <Menu
              key="plus_terminal_menu"
              isOpen={openMenu === 'plus'}
              onOpen={() => setOpenMenu('plus')}
              onClose={() => setOpenMenu(null)}
              item={{
                id: "plus-terminal-menu",
                name: "Plus Terminal",
                children: [
                  {
                    name: "Staff Finder+",
                    href: `/find/staff`
                  },
                  {
                    name: "Team Finder+",
                    href: "/"
                  },
                  {
                    name: "Production Finder+",
                    href: `/find/production`
                  },
                  {
                    name: "Sponsor Finder+",
                    href: `/find/sponsor`
                  },
                  {
                    name: "divider"
                  },
                  {
                    name: "Discord API & Bot",
                    href: "/"
                  },
                  {
                    name: "divider"
                  },
                  {
                    name: "Graphic Generator",
                    href: "/"
                  }
                ]
              }}
            />
            <Menu
              key="marketing_terminal_menu"
              isOpen={openMenu === 'marketing'}
              onOpen={() => setOpenMenu('marketing')}
              onClose={() => setOpenMenu(null)}
              item={{
                id: "marketing-terminal-menu",
                name: "Marketing Terminal",
                children: [
                  {
                    name: "Inbox",
                    href: "/"
                  },
                  {
                    name: "Email Tools",
                    href: "/"
                  },
                  {
                    name: "Automations",
                    href: "/"
                  },
                  { name: "divider" },
                  {
                    name: "Twitter (X) Tools",
                    href: "/"
                  },
                  {
                    name: "Instagram Tools",
                    href: "/"
                  },
                  {
                    name: "Discord Tools",
                    href: "/"
                  },
                  {
                    name: "divider"
                  },
                  {
                    name: "Marketing Calendar",
                    href: "/"
                  },
                  {
                    name: "Set Post Templates"
                  }
                ]
              }}
            />
            <Menu
              key="payments_terminal_menu"
              isOpen={openMenu === 'payments'}
              onOpen={() => setOpenMenu('payments')}
              onClose={() => setOpenMenu(null)}
              item={{
                id: "payments-terminal-menu",
                name: "Payments Terminal",
                children: [
                  {
                    name: "Update Payment Method",
                    href: "/"
                  },
                  {
                    name: "Transactions",
                    href: "/"
                  }
                ]
              }}
            />
            <ListItem key="analytics_menu" component="div" disablePadding>
              <ListItemButton
                sx={{ py: 2 }}
                onClick={() => {
                  router.push("/");
                }}
              >
                <ListItemText
                  primary="Analytics"
                  primaryTypographyProps={{
                    variant: "body2"
                  }}
                />
              </ListItemButton>
            </ListItem>
            {/* <Divider />
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
              )} */}
          </FireNav>
        </FirePaper>
      </Box>
    </Box>
  );
}
