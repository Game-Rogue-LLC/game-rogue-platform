import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
  Toolbar,
  Typography,
  styled,
  useTheme
} from "@mui/material";
import { ChevronRight, Search } from "@mui/icons-material";
import NavItem, { StyledMenu } from "@/src/content/PublicLayout/Navbar/NavItem";
import { useEffect, useMemo, useRef, useState } from "react";

import Avatar from "@/src/components/Avatar";
import { DEFAULT_PROFILE_PICTURE } from "@/src/config/global";
import Link from "next/link";
import SearchBox from "@/src/components/input/SearchBox";
import _ from "lodash";
import { isMyTeam } from "@/src/utils/utils";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const PublicNavbar = ({ sx }) => {
  const user = useAuthContext();
  const router = useRouter();
  const theme = useTheme();
  const [search, setSearch] = useState("");
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(router?.pathname);
  const logoRef = useRef();
  const { player, team } = useTournamentContext();

  const myTeams = useMemo(() => {
    if (team?.teams && user.user && user.user.id) {
      return _.filter(team.teams, (val) => isMyTeam(val, user.user.id));
    }
    return [];
  }, [team?.teams, user.user]);

  const totalPlayers = useMemo(() => {
    if (player.players)
      return _.filter(player.players, (val) => val.userName || val.name).map((val) => ({
        label: val.userName || val.name,
        ...val
      }));
    return [];
  }, [player.players]);

  useEffect(() => {
    if (router?.pathname) {
      const pathname = router.pathname;
      if (pathname === "/") setCurrentPage("home");
      else if (pathname.substring(1, 6) === "event" || pathname.substring(1, 6) === "match")
        setCurrentPage("event");
      else if (pathname.substring(1, 6) === "rogue") setCurrentPage("rogue-social");
      else if (pathname.substring(1, 13) === "organization") setCurrentPage("organization");
      else if (pathname.substring(1, 5) === "tool") setCurrentPage("tool");
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      logoRef.current.classList.toggle("opacity-0");
    }, 10000);
    return () => clearInterval(interval);
  }, [user.user?.id]);

  const handle = {
    changeSearch: (e, val) => {
      router.push("/rogue-social/profile/" + val.id);
      setSearch(val);
    },
    typeSearch: (e) => {
      if (e.key === "Enter") {
        router.push("/search?uid=" + search);
      }
    }
  };

  const handleClickHome = (e) => {
    router.push("/");
  };

  const handleClickUser = (e) => {
    if (user?.user) router.push("/user/" + user.user.id);
  };
  const handleOpenUser = (e) => {
    if (anchorElUser !== e.currentTarget) setAnchorElUser(e.currentTarget);
  };
  const handleCloseUser = (e) => {
    setAnchorElUser(null);
  };

  const handleClickOrganize = (e) => {
    router.push("/organization");
  };
  const handleClickEvent = (e) => {
    router.push("/event");
  };
  const handleClickRogueSocial = (e) => {
    router.push("/rogue-social");
  };
  const handleClickSupport = (e) => {};
  const handleClickTools = (e) => {};
  const handleClickPlusPlans = (e) => {
    router.push("/plus-plans");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        height: "67px",
        // backgroundColor: 'rgba(0, 0, 0, 0.2)'
        backgroundColor: "black",
        backgroundImage: "none",
        zIndex: 8000,
        ...sx
      }}
    >
      <Box sx={{ px: 1, borderBottom: "solid 3px #f5831f" }}>
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Begin Left menus */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center"
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Begin Logo */}
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "end",
                  gap: 1,
                  height: "40px"
                }}
              >
                {/* <Box component="img" src="/static/images/home/gr_letters.png" height={40} /> */}
                <video autoPlay loop muted poster="/static/images/home/gr_letters.png">
                  <source src="/static/videos/gr_letters.webm" type="video/webm" />
                </video>
                <Box
                  component="img"
                  src="/static/images/home/gr_letters.png"
                  height={40}
                  ref={logoRef}
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    filter: "brightness(10)",
                    display: "none"
                  }}
                />
                <Typography variant="h4" sx={{ lineHeight: 1, fontSize: 16 }}>
                  OB 1.0
                </Typography>
              </Box>
              {/* End Logo */}
              {/* Begin Search Box */}
              <Box className="search-box">
                <SearchBox
                  id="search"
                  name="search"
                  placeholder="Search"
                  value={search}
                  onChange={handle.changeSearch}
                  onKeyUp={handle.typeSearch}
                  sx={{
                    height: "40px"
                  }}
                  options={totalPlayers}
                />
              </Box>
              {/* End Search Box */}
            </Box>

            <NavItem name="HOME" active={currentPage === "home"} handleClick={handleClickHome} />
            <NavItem
              name="Events"
              active={currentPage === "event"}
              handleClick={handleClickEvent}
              isDropdown={true}
              items={[
                // TODO: Event Submenu comes here
                {
                  name: "Matches",
                  key: "upcoming-matches",
                  isLink: true,
                  to: "/match/upcoming"
                },
                {
                  name: "Events",
                  key: "upcoming-events",
                  isLink: true,
                  to: "/event/upcoming"
                },
                {
                  name: "Live Events",
                  key: "ongoing-events",
                  isLink: true,
                  to: "/event/ongoing"
                },
                {
                  name: "Past Events",
                  key: "completed-events",
                  isLink: true,
                  to: "/event/completed"
                }
              ]}
            />
            <NavItem
              name="Rogue Social"
              active={currentPage === "rogue-social"}
              handleClick={handleClickRogueSocial}
              isDropdown={true}
              items={[
                {
                  name: "MANAGE ACCOUNTS",
                  key: "manage-accounts",
                  isLink: true,
                  to: "/rogue-social/manage-accounts"
                },
                {
                  name: "LEADERBOARD",
                  key: "leaderboard",
                  isLink: true,
                  to: "/rogue-social?tab=4"
                }
              ]}
            />
            <NavItem name="ROGUE TV" handleClick={() => router.push("/rogue-tv")} />
            <NavItem name="ARTICLES" handleClick={() => router.push("/article")} />
            <NavItem
              name="SHOP"
              handleClick={() => {
                router.push("/shop");
              }}
            />
          </Box>
          {/* End Left menus */}

          {/* Begin Right menus */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 3,
                alignItems: "center"
              }}
            >
              <NavItem
                name="Organize"
                active={currentPage === "organization"}
                handleClick={handleClickOrganize}
                isDropdown={true}
                items={[
                  {
                    name: "My Organizer",
                    key: "my-organizer",
                    isLink: true,
                    to: "/rogue-social/organization"
                  },
                  {
                    name: "Producer Dashboard",
                    key: "producer-dashboard",
                    isLink: true,
                    to: "/"
                  }
                ]}
              />
              <NavItem
                name="Tools"
                active={currentPage === "tool"}
                handleClick={handleClickTools}
                isDropdown={true}
                items={[
                  {
                    name: "Video Editor",
                    key: "video-editor",
                    isLink: true,
                    to: "/video-editor"
                  },
                  {
                    name: "Customize",
                    key: "customize",
                    isLink: true,
                    to: "/"
                  },
                  {
                    name: "Create Article",
                    key: "create-article",
                    isLink: true,
                    to: "/"
                  },
                  {
                    name: "_divider",
                    key: "divider"
                  },
                  {
                    name: "WIKI",
                    key: "wiki",
                    isLink: true,
                    to: "/wiki"
                  },
                  {
                    name: "FAQS",
                    key: "faqs",
                    isLink: true,
                    to: "/faqs"
                  }
                ]}
              />
              <NavItem
                name="Plus Plans"
                active={currentPage === "plus-plans"}
                handleClick={handleClickPlusPlans}
                isDropdown={true}
                items={[
                  {
                    name: "Player Plus",
                    key: "add-player",
                    isLink: true,
                    to: "/"
                  },
                  {
                    name: "Team Plus",
                    key: "add-team",
                    isLink: true,
                    to: "/team/create"
                  },
                  {
                    name: "Organizer Plus",
                    key: "add-organizer",
                    isLink: true,
                    to: "/organization/create"
                  }
                ]}
              />
            </Box>

            {/* Begin User Menu */}
            {user.user && user.user.id && player?.players[user.user.id] ? (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                <Button
                  id="user-button"
                  aria-controls={anchorElUser ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorElUser) ? "true" : undefined}
                  onClick={handleOpenUser}
                  disableTouchRipple
                  // onMouseOut={handleMouseOutUser}
                  sx={{
                    zIndex: 8500,
                    cursor: "pointer",
                    borderRadius: "25px",
                    background: "transparent",
                    cursor: "pointer",
                    ":hover": {
                      background: "rgba(255,255,255,0.08)"
                    }
                  }}
                >
                  <Avatar user={player?.players[user.user?.id]} />
                  <ChevronRight
                    sx={{
                      color: theme.palette.primary.main,
                      transform: Boolean(anchorElUser) ? "rotate(90deg)" : "",
                      transition: "all 0.2s"
                    }}
                  />
                </Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center"
                }}
              >
                <IconButton
                  id="user-button"
                  aria-controls={anchorElUser ? "user-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorElUser) ? "true" : undefined}
                  onClick={handleOpenUser}
                  // onMouseOut={handleMouseOutUser}
                  sx={{
                    zIndex: 8500,
                    cursor: "pointer"
                  }}
                >
                  <img src={DEFAULT_PROFILE_PICTURE} style={{ width: "50px", height: "50px" }} />
                  <ChevronRight
                    sx={{
                      color: theme.palette.primary.main,
                      transform: Boolean(anchorElUser) ? "rotate(90deg)" : "",
                      transition: "all 0.2s"
                    }}
                  />
                </IconButton>
              </Box>
            )}
            {/* Begin User Menu */}
            {/* Begin User Submenu */}
            {user.user && user.user.id && player?.players[user.user.id] ? (
              <StyledMenu
                id="user-menu"
                MenuListProps={{
                  "aria-labelledby": "user-button"
                  // onMouseLeave: handleCloseUser,
                  // onMouseOver: handleMouseOverUser,
                }}
                disablePortal={true}
                disableScrollLock={true}
                keepMounted
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUser}
              >
                <MenuItem onClick={handleCloseUser} key="user-setting" disableRipple>
                  <Link href={"/user/" + user.user?.id}>Settings</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseUser} key="my-team" disableRipple>
                  <Link href={"/rogue-social/team"}>My Team</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUser} key="my-organizer" disableRipple>
                  <Link href={"/rogue-social/organization"}>My Organizer</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseUser} key="my-profile" disableRipple>
                  <Link href={`/rogue-social/profile/${user.user?.id}`}>My Profile</Link>
                </MenuItem>
                <MenuItem
                  onClick={(e) => {
                    handleCloseUser(e);
                    user.logout();
                  }}
                  key="logout-user"
                  disableRipple
                >
                  LOGOUT
                </MenuItem>
              </StyledMenu>
            ) : (
              <StyledMenu
                id="user-menu"
                MenuListProps={{
                  "aria-labelledby": "user-button"
                  // onMouseLeave: handleCloseUser,
                  // onMouseOver: handleMouseOverUser,
                }}
                disablePortal={true}
                disableScrollLock={true}
                keepMounted
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUser}
              >
                <MenuItem onClick={handleCloseUser} key="signup" disableRipple>
                  <Link href={"/auth"}>Sign Up</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUser} key="login" disableRipple>
                  <Link href={"/auth"}>Log In</Link>
                </MenuItem>
              </StyledMenu>
            )}
            {/* End User Submenu */}
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default PublicNavbar;
