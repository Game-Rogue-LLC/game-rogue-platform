import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Toolbar,
  Typography,
  styled,
  useTheme
} from "@mui/material";
import {
  ArrowRight,
  ArrowRightAlt,
  ArrowRightOutlined,
  ArrowRightSharp,
  ChevronRight,
  Login,
  Logout,
  Person,
  Search
} from "@mui/icons-material";
import NavItem, { StyledMenu } from "@/src/content/PublicLayout/Navbar/NavItem";
import { useEffect, useRef, useState } from "react";

import Avatar from "@/src/components/Avatar";
import Link from "next/link";
import SearchInput from "@/src/components/input/SearchInput";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const PublicNavbar = ({ sx }) => {
  const user = useAuthContext();
  const router = useRouter();
  const theme = useTheme();
  const [logoNav, setLogoNav] = useState(true);
  const [search, setSearch] = useState("");
  const [fund, setFund] = useState("");
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(router?.pathname);
  const logoRef = useRef();
  let currentHoverUser = false;
  const { player } = useTournamentContext();

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
    switchLogoNav: (e) => {
      setLogoNav((prev) => !prev);
    },
    changeSearch: (e) => {
      setSearch(e.target.value);
    },
    changeFund: (e) => {
      setFund(e.target.value);
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
  const handleClickPlusPlans = (e) => {};

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
      <Container maxWidth="xxl" sx={{ borderBottom: "solid 3px #f5831f" }}>
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 3,
              alignItems: "center"
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Box component="img" src="/GR_Letters.png" height={40} />
              <Box
                component="img"
                src="/GR_Letters.png"
                height={40}
                ref={logoRef}
                style={{ position: "absolute", left: 0, top: 0, filter: "brightness(10)" }}
              />
            </Box>
            <Box className="search-box">
              <SearchInput
                id="search"
                name="search"
                placeholder="Search"
                value={search}
                onChange={handle.changeSearch}
                sx={{
                  height: "40px"
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <Search fontSize="large" />
                  </InputAdornment>
                }
              />
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
                  name: "My Team",
                  key: "my-team",
                  isLink: true,
                  to: "/team"
                },
                {
                  name: "Scout Opponent",
                  key: "scout-opponent",
                  isLink: true,
                  to: "/team"
                }
              ]}
            />
            <NavItem name="ROGUE TV" handleClick={() => {}} />
            <NavItem name="ARTICLES" handleClick={() => {}} />
            <NavItem
              name="SHOP"
              handleClick={() => {
                router.push("/shop");
              }}
            />
          </Box>
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
                    to: "/organization"
                  },
                  {
                    name: "Producer Dashboard",
                    key: "producer-dashboard",
                    isLink: true,
                    to: "/"
                  }
                ]}
              />
              {/* <NavItem
                name="Play"
                active={currentPage === "event"}
                handleClick={handleClickTools}
                isDropdown={true}
                items={[
                  {
                    name: "Upcoming Matches",
                    key: "upcoming-matches",
                    isLink: true,
                    to: "/match/upcoming",
                  },
                  {
                    name: "Upcoming Events",
                    key: "upcoming-events",
                    isLink: true,
                    to: "/event/upcoming",
                  },
                  {
                    name: "Ongoing Events",
                    key: "ongoing-events",
                    isLink: true,
                    to: "/event/ongoing",
                  },
                  {
                    name: "Completed Events",
                    key: "completed-events",
                    isLink: true,
                    to: "/event/completed",
                  },
                ]}
              /> */}
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
                    to: "/"
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
                    to: "/"
                  },
                  {
                    name: "FAQS",
                    key: "faqs",
                    isLink: true,
                    to: "/"
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
            {user.user ? (
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
                  <img
                    src="/static/images/Profile_Picture.png"
                    style={{ width: "50px", height: "50px" }}
                  />
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
            {/* Begin User Submenu */}
            {!user.user ? (
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
                <MenuItem onClick={handleCloseUser} key="user-setting" disableRipple>
                  <Link href={"/user/" + user.user?.id}>Settings</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseUser} key="my-team" disableRipple>
                  <Link href={"/user/" + user.user?.id}>My Team</Link>
                </MenuItem>
                <MenuItem onClick={handleCloseUser} key="my-organizer" disableRipple>
                  <Link href={"/user/" + user.user?.id}>My Organizer</Link>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleCloseUser} key="my-profile" disableRipple>
                  <Link href={"/user/" + user.user?.id}>My Profile</Link>
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
            )}
            {/* End User Submenu */}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default PublicNavbar;
