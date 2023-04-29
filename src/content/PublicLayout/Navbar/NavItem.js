import { useState } from "react";
import {
  Button,
  Link,
  Menu,
  MenuItem,
  Typography,
  useTheme,
  styled
} from "@mui/material"

export const StyledMenu = styled((props) => (
  <Menu {...props} />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: '#0f0f0f',
    borderRadius: 0,
    // backgroundColor: '#000',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    zIndex: 8500,
    minWidth: 180,
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '0 10px',
    },
    '& .MuiMenuItem-root': {
      color: 'white',
      // marginRight: theme.spacing(1.5),
      justifyContent: 'center',
      textAlign: 'center',
      '&:hover': {
        color: theme.palette.primary.main,
        backgroundColor: 'transparent'
      },
    },
  },
}));

const NavItem = ({ name, items, isDropdown, handleClick }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  let currentHover = false;

  const itemStyle = {
    background: 'transparent',
    color: 'white',
    zIndex: 8500,
    ':hover': {
      color: theme.palette.primary.main,
      background: 'transparent'
    }
  }

  const itemTextStyle = {
    color: 'white',
    fontSize: '1rem',
    ':hover': {
      color: theme.palette.primary.main
    }
  }

  const handleOpen = (e) => {
    currentHover = true;
    if (anchorEl !== e.currentTarget)
      setAnchorEl(e.currentTarget);
  }
  const handleClose = (e) => {
    setAnchorEl(null);
  }
  const handleMouseOver = (e) => {
    currentHover = true;
  }
  const handleMouseOut = (e) => {
    currentHover = false;
    setTimeout(() => {
      if (currentHover === false)
        handleClose();
    }, 500)
  }

  if (isDropdown) {
    return (
      <>
        <Button
          sx={itemStyle}
          disableRipple
          id={`${name}-button`}
          aria-controls={anchorEl ? `${name}-menu` : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? 'true' : undefined}
          // variant="contained"
          disableElevation
          onClick={handleClick}
          onMouseOver={handleOpen}
          onMouseOut={handleMouseOut}
        >
          <Typography
            variant='h4'
            sx={itemTextStyle}
          >
            {name}
          </Typography>
        </Button>
        <StyledMenu
          id={`${name}-menu`}
          MenuListProps={{
            'aria-labelledby': `${name}-button`,
            onMouseLeave: handleClose,
            onMouseOver: handleMouseOver
          }}
          disablePortal={true}
          disableScrollLock={true}
          keepMounted
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center'
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {items.map((item, i) => (
            <MenuItem
              key={item.key}
              onClick={(e) => {
                handleClose(e);
                if (!item.isLink && item.handleClick) item.handleClick(e);
              }}
              disableRipple
            >
              {
                item.isLink
                  ?
                  <Link
                    href={item.to}
                    sx={{
                      color: 'white',
                      ':hover': {
                        color: theme.palette.primary.main
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                  :
                  item.name
              }
            </MenuItem>
          ))}
        </StyledMenu>
      </>
    )
  }

  return (
    <Button
      sx={itemStyle}
      disableRipple
      id={`${name}-menu`}
      disableElevation
      onClick={handleClick}
    >
      <Typography
        variant='h4'
        sx={itemTextStyle}
      >
        {name}
      </Typography>
    </Button>
  )
}

export default NavItem;