import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  styled,
  useTheme
} from "@mui/material";
import { ChevronRight, Search } from "@mui/icons-material";
import { useEffect, useMemo, useRef, useState } from "react";

import Avatar from "@/src/components/Avatar";
import { DEFAULT_PROFILE_PICTURE } from "@/src/config/global";
import Link from "next/link";
import NavItem from "@/src/content/TVLayout/Navbar/NavItem";
import SearchInput from "@/src/components/input/SearchBox";
import { StyledMenu } from "@/src/content/PublicLayout/Navbar/NavItem";
import _ from "lodash";
import { isMyTeam } from "@/src/utils/utils";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const organizer = {
  channels: []
};

const TVNavbar = ({ sx }) => {
  const user = useAuthContext();
  const router = useRouter();
  const theme = useTheme();
  const [filter, setFilter] = useState("");
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const logoRef = useRef();
  const { player, team } = useTournamentContext();

  useEffect(() => {
    if (router.pathname) {
      const pathname = router.pathname;
      if (pathname.includes("rogue-tv/following")) setCurrentPage(1);
      else if (pathname.includes("rogue-tv/browse")) setCurrentPage(2);
      else setCurrentPage(0);
    }
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      logoRef.current.classList.toggle("opacity-0");
    }, 10000);
    return () => clearInterval(interval);
  }, [user.user?.id]);

  const onFilterChange = (e) => {
    setFilter(e.target.value);
  };
  const onFollowingClick = () => {
    setCurrentPage(1);
    router.push("/rogue-tv/following");
  };
  const onLiveClick = () => {
    setCurrentPage(2);
    router.push("/rogue-tv/browse");
  };
  const onOpenUser = (e) => {
    if (anchorElUser !== e.currentTarget) setAnchorElUser(e.currentTarget);
  };
  const onCloseUser = (e) => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        height: "67px",
        // backgroundColor: 'rgba(0, 0, 0, 0.2)'
        backgroundColor: "black",
        backgroundImage: "none",
        borderBottom: "solid 1px rgba(255,255,255,.2)",
        zIndex: 8000,
        ...sx
      }}
    >
      <Container maxWidth="xxl">
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "stretch",
            height: 67
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              gap: 3
            }}
          >
            <Box sx={{ position: "relative", height: "40px" }}>
              {/* <Box component="img" src="/GR_Letters.png" height={40} /> */}
              <video autoPlay loop muted poster="/GR_Letters.png">
                <source src="/static/animations/GR_Letters.webm" type="video/webm" />
              </video>
              <Box
                component="img"
                src="/GR_Letters.png"
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
            </Box>
            <NavItem name="Following" active={currentPage === 1} onClick={onFollowingClick} />
            <NavItem name="Live" active={currentPage === 2} onClick={onLiveClick} />
          </Box>

          {/* Begin Search Field */}
          <Box sx={{ display: "flex", alignItems: "center", py: "auto" }} className="search-box">
            <TextField
              variant="outlined"
              size="small"
              value={filter}
              onChange={onFilterChange}
              sx={{
                flexGrow: 1,
                ".MuiInputBase-root": {
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }
              }}
              placeholder="Enter Search Term"
            />
            <Button
              variant="contained"
              sx={{
                height: 40,
                borderBottomLeftRadius: 0,
                borderTopLeftRadius: 0,
                color: "white"
              }}
            >
              <Search fontSize="medium" />
            </Button>
          </Box>
          {/* End Search Field */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
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
                  onClick={onOpenUser}
                  disableTouchRipple
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
                  onClick={onOpenUser}
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
            {/* Begin User Submenu */}
            {user.user && user.user.id && player?.players[user.user.id] ? (
              <StyledMenu
                id="user-menu"
                MenuListProps={{
                  "aria-labelledby": "user-button"
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
                onClose={onCloseUser}
              >
                <MenuItem onClick={onCloseUser} key="user-setting" disableRipple>
                  <Link href={"/user/" + user.user?.id}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={user.user?.profilePic}
                        sx={{ width: 30, height: 30 }}
                        hideStatus={true}
                      />
                      {player.players[user.user?.id]?.userName}
                    </Box>
                  </Link>
                </MenuItem>

                <Divider />

                {organizer.channels && organizer.channels.length > 0 ? (
                  <>
                    <Typography
                      variant="body1"
                      textTransform="uppercase"
                      textAlign="center"
                      color="gray"
                    >
                      MY CHANNELS
                    </Typography>
                  </>
                ) : (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={() => {
                        router.push("/rogue-social/manage-accounts");
                      }}
                    >
                      Create Organizer
                    </Button>
                  </Box>
                )}

                <Divider sx={{ my: 1 }} />

                <MenuItem onClick={onCloseUser} key="public-channel" disableRipple>
                  <Link href={"/rogue-tv"}>Public Channel</Link>
                </MenuItem>
                <MenuItem onClick={onCloseUser} key="video-publisher" disableRipple>
                  <Link href={"/"}>Video Publisher</Link>
                </MenuItem>
                <MenuItem onClick={onCloseUser} key="live-dashboard" disableRipple>
                  <Link href={"/"}>Live Dashboard </Link>
                </MenuItem>
                <MenuItem onClick={onCloseUser} key="tv-analytics" disableRipple>
                  <Link href={"/"}>TV Analytics </Link>
                </MenuItem>

                <Divider />

                <MenuItem onClick={onCloseUser} key="engagements" disableRipple>
                  <Link href={`/`}>Engagements</Link>
                </MenuItem>
                <MenuItem onClick={onCloseUser} key="payments" disableRipple>
                  Payments
                </MenuItem>

                <Divider />
                <MenuItem onClick={onCloseUser} key="tv-settings" disableRipple>
                  TV Settings
                </MenuItem>
              </StyledMenu>
            ) : (
              <StyledMenu
                id="user-menu"
                MenuListProps={{
                  "aria-labelledby": "user-button"
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
                onClose={onCloseUser}
              >
                <MenuItem onClick={onCloseUser} key="signup" disableRipple>
                  <Link href={"/auth"}>Sign Up</Link>
                </MenuItem>
                <MenuItem onClick={onCloseUser} key="login" disableRipple>
                  <Link href={"/auth"}>Log In</Link>
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

export default TVNavbar;
