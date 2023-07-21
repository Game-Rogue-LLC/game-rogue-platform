import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

import { useTournamentContext } from "@/src/context/TournamentContext";

const RequestViewDialog = ({ open, onClose, item, onAccept, onDeny }) => {
  const { player, team } = useTournamentContext();
  return (
    <Dialog open={open} onClose={onClose} disableScrollLock>
      <DialogTitle>
        From: {player.players[item?.sender]?.userName} at {team.teams[item?.data.team]?.name}
      </DialogTitle>
      <DialogContent sx={{ p: 2 }}>{item?.data.text}</DialogContent>
      <DialogActions sx={{ px: 2, pb: 2 }}>
        <Button variant="contained" onClick={onAccept}>
          Accept
        </Button>
        <Button variant="contained" onDeny={onDeny}>
          Deny
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RequestViewDialog;
