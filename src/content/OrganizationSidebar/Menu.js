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

const Menu = ({ item, isOpen, onOpen, onClose }) => {
  const { organizer, event } = useTournamentContext();
  const [open, setOpen] = useState(isOpen);
  const router = useRouter();
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: (isOpen && open)
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
          <IconButton onClick={() => {
            if (onClose && isOpen) {
              onClose();
              setOpen(false);
            }
            else if (onOpen && !isOpen) {
              onOpen();
              setOpen(true);
            }
            if (!onOpen && !onClose) handleOpen();
          }}>
            <KeyboardArrowDown
              sx={{
                // opacity: 0,
                transform: (isOpen && open) ? "rotate(-180deg)" : "rotate(0)",
                transition: "0.2s"
              }}
            />
          </IconButton>
        </ListItem>
        {(isOpen && open) &&
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
