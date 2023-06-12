import { Box, Typography } from "@mui/material";

import NotificationItem from "@/src/components/item/NotificationItem";

const NotificationList = ({ items }) => {
  return (
    <Box>
      {items.length > 0 ? (
        items.map((item) => <NotificationItem item={item} />)
      ) : (
        <Typography textAlign="center" fontSize={20} color="white">
          No notifications
        </Typography>
      )}
    </Box>
  );
};

export default NotificationList;
