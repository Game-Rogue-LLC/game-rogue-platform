import * as React from "react";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import { ChromePicker } from "@hello-pangea/color-picker";

const ColorSelect = ({ name, label, value, onChange, sx }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        variant="contained"
        id={`${name}-color-select-button`}
        aria-controls={open ? `${name}-color-select-menu` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          border: "solid 2px rgba(255,255,255,0.2)",
          backgroundColor: "transparent",
          padding: "2px",
          ":hover": {},
          ...sx,
        }}
        fullWidth
      >
        <Box
          sx={{
            width: "100%",
            height: "30px",
            backgroundColor: value,
            ":hover": {
              backgroundColor: value,
            },
          }}
        ></Box>
      </Button>
      <Menu
        id={`${name}-color-select-menu`}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": `${name}-color-select-button`,
        }}
      >
        <ChromePicker onChange={onChange} defaultColor={value} />
      </Menu>
    </div>
  );
};

export default ColorSelect;
