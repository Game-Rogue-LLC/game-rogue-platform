import { DEFAULT_LOGO } from "@/src/config/global";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  Typography
} from "@mui/material";

const ScoresDialog = (props) => {
  const { onClose, title, open, team1, team2, score1, score2, onScore1Change, onScore2Change, onSave } = props;
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            height: '300px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Box
              component={'img'}
              sx={{
                height: '150px',
                width: '150px',
                borderRadius: '50%'
              }}
              src={team1?.darkLogo || DEFAULT_LOGO}
            ></Box>
            <OutlinedInput value={score1} onChange={onScore1Change} />
          </Box>
          <Box>
            <Typography variant="h2">V.S.</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'right'
            }}
          >
            <OutlinedInput value={score2} onChange={onScore2Change} />
            <Box
              component={'img'}
              sx={{
                height: '150px',
                width: '150px',
                borderRadius: '50%'
              }}
              src={team2?.darkLogo || DEFAULT_LOGO}
            ></Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ScoresDialog;