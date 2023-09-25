import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  useTheme,
  Divider,
  IconButton,
  Tooltip
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useRouter } from "next/router";
import { Event, KeyboardArrowDown } from "@mui/icons-material";
import { useTournamentContext } from "@/src/context/TournamentContext";
import TeamItem from "@/src/components/item/TeamItem";

const TeamMenu = (props) => {
  const { team: item } = props;
  const { team } = useTournamentContext();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();

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
          <TeamItem team={item} />
        </ListItem>
      </Box>
      <Divider />
    </>
  );
};

export default TeamMenu;
