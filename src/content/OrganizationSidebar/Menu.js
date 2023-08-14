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

const Menu = (props) => {
  const { organization: item } = props;
  const { organization, event } = useTournamentContext();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(!open);
  };

  const onDeleteEvent = async (eid) => {
    if (confirm("Are you sure you want to delete " + event.events[eid].name)) {
      const res = await event.delete(eid);
      if (res.code === "succeed") {
        enqueueSnackbar("Event deleted successfully", { variant: "success" });
      } else {
        console.warn(res.message);
      }
    }
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
            py: 2.5,
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
            secondary={!open && item.tagline}
            secondaryTypographyProps={{
              noWrap: true,
              fontSize: 12,
              lineHeight: "16px"
              // color: open ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.5)',
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
        {open && (
          <>
            {Object.keys(event.events)
              .filter((key, i) => item.id == event.events[key].oid)
              .map((id, idx) => (
                <ListItem
                  key={"event_menu_" + item.id + "_" + idx}
                  sx={{ justifyContent: "space-between", padding: 0 }}
                >
                  <ListItemButton
                    sx={{ minHeight: 32, color: "rgba(255,255,255,.8)" }}
                    onClick={() => {
                      organization.setCurrent(item.id);
                      event.setCurrent(id);
                      router.push("/match?event=" + id);
                    }}
                  >
                    <ListItemIcon sx={{ color: "inherit" }}>
                      <Event />
                    </ListItemIcon>
                    <ListItemText
                      primary={event.events[id].name}
                      primaryTypographyProps={{
                        fontSize: 14,
                        fontWeight: "medium"
                      }}
                    />
                  </ListItemButton>

                  <IconButton
                    sx={{ color: "inherit" }}
                    onClick={() => {
                      onDeleteEvent(id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </ListItem>
              ))}
            <Box
              sx={{
                display: "flex"
              }}
            >
              <Button
                variant="outlined"
                onClick={() => router.push("/organization/" + item.id + "/edit")}
                sx={{
                  flexGrow: 1,
                  m: 1
                }}
                size="small"
              >
                Edit Organization
              </Button>
              <Tooltip title="Create Event">
                <Button
                  variant="contained"
                  onClick={() => router.push("/event/create?organization=" + item.id)}
                  sx={{
                    flexGrow: 0,
                    my: 1,
                    mr: 1,
                    color: "white",
                    border: "1px solid rgba(255, 255, 255, .5)",
                    display: event.activeCount[item.id] >= 5 ? "none" : "block"
                  }}
                  color="secondary"
                  size="small"
                >
                  {" "}
                  +{" "}
                </Button>
              </Tooltip>
            </Box>
          </>
        )}
      </Box>
      <Divider />
    </>
  );
};

export default Menu;
