import { formatDate } from "@/src/utils/utils";
import { Button, Box, Menu, Typography } from "@mui/material";
import { useState } from "react";

const MatchShare = ({ matchTime, onComplete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const onOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const onClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box>
        <Button
          id="scheduled-btn"
          variant="contained"
          aria-controls={open ? "scheduled-menu" : undefined}
          aria-haspopup="true"
          onClick={onOpen}
        >
          Scheduled
        </Button>
        <Menu
          id="scheduled-menu"
          anchorEl={anchorEl}
          disableScrollLock={true}
          open={open}
          MenuListProps={{ "aria-labelledby": "scheduled-btn" }}
          onClose={onClose}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h5" color="white">
              {formatDate(matchTime, "YYYY.MM.DD hh:mm:ss")}
            </Typography>
            <Typography variant="h6">Save to</Typography>
            <Button variant="contained">Google Calendar</Button>
          </Box>
        </Menu>
      </Box>
      <Button variant="contained" onClick={onComplete} sx={{ mt: "30px" }}>
        Map Bans
      </Button>
    </Box>
  );
};

export default MatchShare;
