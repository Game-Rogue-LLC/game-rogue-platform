import {
  Box,
  Button,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useTheme
} from "@mui/material";
import { Delete, Event, KeyboardArrowDown } from "@mui/icons-material";
import { useEffect, useState } from "react";

import { alpha } from "@mui/material/styles";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Menu = ({ item }) => {
  const { organizer, event } = useTournamentContext();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: open
            ? alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity)
            : null,
          pb: 0
        }}
      >
        <ListItem
          key={item.id}
          alignItems="flex-start"
          sx={{
            px: 3,
            py: 2,
            alignItems: "center"
            // '&:hover, &:focus': { '& svg': { opacity: open ? 1 : 0 } },
          }}
        >
          <ListItemText
            primary={item.name}
            primaryTypographyProps={{
              fontSize: 15,
              fontWeight: "medium",
              lineHeight: "20px",
              mb: "2px"
            }}
            sx={{ my: 0 }}
          />
          <IconButton onClick={handleOpen}>
            <KeyboardArrowDown
              sx={{
                // opacity: 0,
                transform: open ? "rotate(-180deg)" : "rotate(0)",
                transition: "0.2s"
              }}
            />
          </IconButton>
        </ListItem>
        {open &&
          _.map(item.children, (child, idx) =>
            child.name == "divider" ? (
              <Divider />
            ) : (
              <ListItem
                key={"menu_" + item.id + "_" + idx}
                sx={{ justifyContent: "space-between", padding: 0 }}
              >
                <ListItemButton
                  sx={{ minHeight: 32, color: "rgba(255,255,255,.8)" }}
                  onClick={() => {
                    router.push(child.href);
                  }}
                  disabled={!!child.disabled}
                >
                  <ListItemText
                    primary={child.name}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: "medium"
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )
          )}
      </Box>
      <Divider />
    </>
  );
};

export default Menu;
