import { useState, useMemo } from "react";
import Link from "next/link";
import { Box, Button, Menu, MenuItem, Typography, useTheme, styled, Divider } from "@mui/material";

export const StyledMenu = styled((props) => <Menu {...props} />)(({ theme }) => ({
  "& .MuiPaper-root": {
    // background: "linear-gradient(to top,#f5851f,#000)",
    background: "linear-gradient(to top,#64370c,#2a0d00)",
    borderRadius: 0,
    // backgroundColor: '#000',
    marginTop: theme.spacing(1),
    padding: theme.spacing(1),
    zIndex: 8500,
    minWidth: 180,
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0 10px"
    },
    "& .MuiMenuItem-root": {
      color: "white",
      // marginRight: theme.spacing(1.5),
      justifyContent: "center",
      textAlign: "center",
      textTransform: "uppercase",
      "&:hover": {
        // color: theme.palette.primary.main,
        backgroundColor: "rgba(255, 255, 255, 0.1)"
      }
    }
  }
}));

const NavItem = ({ name, items, isDropdown, handleClick, active }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  let currentHover = false;

  const itemStyle = useMemo(() => {
    let style = {
      background: "transparent",
      color: "white",
      zIndex: 8500,
      ":hover": {
        // color: theme.palette.primary.main,
        backgroundSize: "cover"
        // background: "url(/static/images/bg_anim.gif)",
        // backgroundSize: "contain",
      }
    };
    if (active === true) {
      style.background = "url(/static/images/navitem_bg/16.png) !important";
    }
    return style;
  }, [active]);

  const itemTextStyle = {
    color: "white",
    textTransform: "uppercase",
    fontSize: "1rem",
    ":hover": {
      // color: theme.palette.primary.main,
    }
  };

  const handleOpen = (e) => {
    currentHover = true;
    if (anchorEl !== e.currentTarget) setAnchorEl(e.currentTarget);
  };
  const handleClose = (e) => {
    setAnchorEl(null);
  };
  const handleMouseOver = (e) => {
    currentHover = true;
  };
  const handleMouseOut = (e) => {
    currentHover = false;
    setTimeout(() => {
      if (currentHover === false) handleClose();
    }, 500);
  };

  if (isDropdown) {
    return (
      <>
        <Button
          sx={itemStyle}
          disableRipple
          id={`${name}-button`}
          aria-controls={anchorEl ? `${name}-menu` : undefined}
          aria-haspopup="true"
          aria-expanded={Boolean(anchorEl) ? "true" : undefined}
          // variant="contained"
          disableElevation
          onClick={handleClick}
          onMouseOver={handleOpen}
          onMouseOut={handleMouseOut}
          className="gif-once"
        >
          <Typography variant="h4" sx={itemTextStyle}>
            {name}
          </Typography>
        </Button>
        <StyledMenu
          id={`${name}-menu`}
          MenuListProps={{
            "aria-labelledby": `${name}-button`,
            onMouseLeave: handleClose,
            onMouseOver: handleMouseOver
          }}
          disablePortal={true}
          disableScrollLock={true}
          keepMounted
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center"
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {items.map((item, i) => {
            if (item.name === "_divider") {
              return <Divider key={item.key} />;
            } else {
              return (
                <MenuItem
                  key={item.key}
                  onClick={(e) => {
                    handleClose(e);
                    if (!item.isLink && item.handleClick) item.handleClick(e);
                  }}
                  disableRipple
                >
                  {item.isLink ? (
                    <Link
                      href={item.to}
                      target={item.newTab === true ? "_blank" : "_self"}
                      sx={{
                        color: "white",
                        ":hover": {
                          // color: theme.palette.primary.main,
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    item.name
                  )}
                </MenuItem>
              );
            }
          })}
        </StyledMenu>
      </>
    );
  }

  return (
    <Button
      sx={itemStyle}
      disableRipple
      id={`${name}-menu`}
      disableElevation
      onClick={handleClick}
      className="gif-once"
    >
      <Typography variant="h4" sx={itemTextStyle}>
        {name}
      </Typography>
    </Button>
  );
};

export default NavItem;
