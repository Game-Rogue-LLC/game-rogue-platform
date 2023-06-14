import { Box, Button, Divider, IconButton, Menu, MenuItem, useTheme } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

import Avatar from "@/src/components/Avatar";
import Link from "next/link";
import { Logout } from "@mui/icons-material";
import { StyledMenu } from "@/src/content/PublicLayout/Navbar/NavItem";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { DEFAULT_CONTENTBLOCK_IMAGE } from "@/src/config/global";

// const StyledMenu = styled((props) => (
// 	<Menu
// 		elevation={0}
// 		anchorOrigin={{
// 			vertical: 'bottom',
// 			horizontal: 'right',
// 		}}
// 		transformOrigin={{
// 			vertical: 'top',
// 			horizontal: 'right',
// 		}}
// 		{...props}
// 	/>
// ))(({ theme }) => ({
// 	'& .MuiPaper-root': {
// 		borderRadius: 0,
// 		// backgroundColor: '#000',
// 		marginTop: theme.spacing(1),
// 		padding: theme.spacing(2),
// 		minWidth: 180,
// 		color:
// 			theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
// 		boxShadow:
// 			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
// 		'& .MuiMenu-list': {
// 			padding: '0 10px',
// 		},
// 		'& .MuiMenuItem-root': {
// 			fontSize: 10,
// 			color: theme.palette.primary.main,
// 			// marginRight: theme.spacing(1.5),
// 			justifyContent: 'center',
// 			textAlign: 'center',
// 			'&:active': {
// 				backgroundColor: alpha(
// 					theme.palette.primary.main,
// 					theme.palette.action.selectedOpacity,
// 				),
// 			},
// 		},
// 	},
// }));

const Header = () => {
  const [anchorElOrganization, setAnchorElOrganization] = useState(null);
  const [anchorElTeams, setAnchorElTeams] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const openOrganization = Boolean(anchorElOrganization);
  const openTeams = Boolean(anchorElTeams);
  const openUser = Boolean(anchorElUser);
  const theme = useTheme();
  const user = useAuthContext();
  const { player } = useTournamentContext();

  const handleClickUser = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleOpenUser = (e) => {
    if (anchorElUser !== e.currentTarget) setAnchorElUser(e.currentTarget);
  };
  const handleCloseUser = () => {
    setAnchorElUser(null);
  };

  const handleClickOrganization = (event) => {
    setAnchorElOrganization(event.currentTarget);
  };
  const handleCloseOrganization = () => {
    setAnchorElOrganization(null);
  };

  const handleClickTeams = (event) => {
    setAnchorElTeams(event.currentTarget);
  };
  const handleCloseTeams = () => {
    setAnchorElTeams(null);
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.backgroundColor.header,
        height: 80,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 2,
        position: "relative"
      }}
    >
      <Box
        sx={{
          height: "100%",
          padding: "1.6em",
          flex: 1
        }}
      >
        <Link href="/">
          <img src={DEFAULT_CONTENTBLOCK_IMAGE} style={{ height: "100%", visibility: "visible" }} />
        </Link>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          pr: 4
        }}
      >
        <Button
          id="organization-button"
          aria-controls={openOrganization ? "organization-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openOrganization ? "true" : undefined}
          // variant="contained"
          disableElevation
          onClick={handleClickOrganization}
          sx={{
            m: "auto"
          }}
          // endIcon={<KeyboardArrowDownIcon />}
        >
          ORGANIZE
        </Button>
        <Button
          id="teams-button"
          aria-controls={openTeams ? "teams-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openTeams ? "true" : undefined}
          // variant="contained"
          disableElevation
          onClick={handleClickTeams}
          sx={{
            m: "auto"
          }}
          // endIcon={<KeyboardArrowDownIcon />}
        >
          TEAMS
        </Button>
        <IconButton
          id="user-button"
          aria-controls={openUser ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openUser ? "true" : undefined}
          sx={{}}
          onClick={handleClickUser}
          onMouseOver={handleOpenUser}
        >
          <Avatar user={player.players[user.user.id]} />
        </IconButton>
      </Box>
      <StyledMenu
        id="user-menu"
        MenuListProps={{
          "aria-labelledby": "user-button",
          onMouseLeave: handleCloseUser
        }}
        anchorEl={anchorElUser}
        open={openUser}
        onClose={handleCloseUser}
      >
        <MenuItem onClick={handleCloseUser} key="user-profile" disableRipple>
          <Link href={"/user/" + user.user.id}>PROFILE</Link>
        </MenuItem>
        <MenuItem onClick={handleCloseUser} key="edit-user" disableRipple>
          <Link href={"/user/" + user.user.id + "/edit"}>EDIT</Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleCloseUser();
            user.logout();
          }}
          key="logout"
          disableRipple
        >
          LOG OUT
        </MenuItem>
      </StyledMenu>
      <StyledMenu
        id="organization-menu"
        MenuListProps={{
          "aria-labelledby": "organization-button"
        }}
        anchorEl={anchorElOrganization}
        open={openOrganization}
        onClose={handleCloseOrganization}
      >
        <MenuItem onClick={handleCloseOrganization} key="create-organization" disableRipple>
          <Link href="/organization/create">CREATE</Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleCloseOrganization} key="production-setting" disableRipple>
          PRODUCTION SETTING
        </MenuItem>
      </StyledMenu>
      <StyledMenu
        id="teams-menu"
        MenuListProps={{
          "aria-labelledby": "teams-button"
        }}
        anchorEl={anchorElTeams}
        open={openTeams}
        onClose={handleCloseTeams}
      >
        <MenuItem onClick={handleCloseTeams} key="team-index" disableRipple>
          <Link href="/team">TEAMS</Link>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleCloseTeams} key="create-team" disableRipple>
          <Link href="/team/create">CREATE</Link>
        </MenuItem>
        <MenuItem onClick={handleCloseTeams} key="join-team" disableRipple>
          <Link href="/team/join">JOIN</Link>
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default Header;
