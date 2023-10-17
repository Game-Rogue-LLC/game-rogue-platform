import Button from "@mui/material/Button";
import { KeyboardArrowDown } from "@mui/icons-material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import _ from "lodash";
import { useState } from "react";
import { useTheme } from "@mui/material";

export default function DropdownMenu({ name, title, items, onChange, sx }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        id={name + "-button"}
        variant="contained"
        sx={{ ...sx, color: "white", fontWeight: "bold" }}
        aria-controls={open ? name + "-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        endIcon={<KeyboardArrowDown />}
      >
        {title}
      </Button>
      <Menu
        id={name + "-menu"}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock
        MenuListProps={{
          "aria-labelledby": name + "-button"
        }}
      >
        {_.map(items, (item, i) => (
          <MenuItem
            key={name + "-menu-item-" + item.id}
            disabled={!!item.disabled}
            sx={{
              opacity: "1 !important",
              color: item.disabled ? theme.palette.primary.main : "white"
            }}
            onClick={() => {
              handleClose();
              onChange(item);
            }}
          >
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
