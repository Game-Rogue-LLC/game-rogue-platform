import { formatDate } from "@/src/utils/utils";
import { CalendarMonth, Instagram, Twitter } from "@mui/icons-material";
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

  const onFinish = () => {};

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
            <Typography variant="h6" sx={{ mt: 2 }}>
              Share to
            </Typography>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button variant="contained" startIcon={<Instagram />}>
                Instagram
              </Button>
              <Button variant="contained" startIcon={<Twitter />}>
                Twitter
              </Button>
            </Box>
            <Typography variant="h6" sx={{ mt: 2 }}>
              Save to
            </Typography>
            <Button variant="contained" startIcon={<CalendarMonth />}>
              Google Calendar
            </Button>
          </Box>
        </Menu>
      </Box>
      {/* <Button variant="contained" onClick={onFinish} sx={{ mt: "30px" }}>
        FINISH
      </Button> */}
    </Box>
  );
};

export default MatchShare;
