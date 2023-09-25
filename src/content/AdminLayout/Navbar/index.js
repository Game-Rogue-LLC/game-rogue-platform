import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useAppContext } from "@/src/context/app";

import routes from "./routes";
import { DEFAULT_CONTENTBLOCK_IMAGE } from "@/src/config/global";
import { useTournamentContext } from "@/src/context/TournamentContext";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    minHeight: "20px"
  }
}));

const NavItem = styled(Button)(({ theme }) => ({
  color: theme.palette.card.main,
  ":hover": {
    backgroundColor: alpha(theme.palette.card.main, theme.palette.action.selectedOpacity)
  }
}));

function Navbar() {
  const theme = useTheme();
  const { organizer, event } = useTournamentContext();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const toolbarStyle = useStyles(theme);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        // borderTop: `2px #f5831f solid`,
        // borderBottom: `2px #f5831f solid`,
        backgroundImage: "none"
      }}
    >
      <Container maxWidth="xxl">
        <Toolbar classes={{ root: toolbarStyle.root }} disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {routes.map((route) => (
                <MenuItem key={route.href} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{route.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link href={`/match?event=${event.current}`}>
              <NavItem
                key={`/match?event=${event.current}`}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Matches
              </NavItem>
            </Link>
            <Link href={`/ticket?event=${event.current}`}>
              <NavItem
                key={`/ticket?event=${event.current}`}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Tickets
              </NavItem>
            </Link>
            <Link href={`/staff?organizer=${organizer.current}`}>
              <NavItem
                key={`/staff?organizer=${organizer.current}`}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Staff
              </NavItem>
            </Link>
            <Link href={`/participant?event=${event.current}`}>
              <NavItem
                key={`/participant?event=${event.current}`}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Participants
              </NavItem>
            </Link>
            <Link href={`/event/${event.current}/edit`}>
              <NavItem
                key={`/event/${event.current}/edit`}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Edit Event
              </NavItem>
            </Link>
            <Link href={`/archived?event=${event.current}`}>
              <NavItem
                key={`/archived?event=${event.current}`}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Archived
              </NavItem>
            </Link>
            <Link href={`/match/organize?event=${event.current}`}>
              <NavItem
                key={`/match/organize?event=${event.current}`}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Organizer +
              </NavItem>
            </Link>
            <Link href={`/match/organize?event=${event.current}`}>
              <NavItem
                key={`/match/organize?event=${event.current}`}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                Organizer Profile
              </NavItem>
            </Link>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {organizer.current && (
              <Tooltip title="Open settings">
                <Box sx={{ height: "30px", position: "relative", pr: 2 }}>
                  <img
                    src={
                      organizer.organizers[organizer.current]?.contentBlock?.image ||
                      DEFAULT_CONTENTBLOCK_IMAGE
                    }
                    height={"100%"}
                  />
                </Box>
              </Tooltip>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
