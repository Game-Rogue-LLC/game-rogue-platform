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

const ScoresDialog = ({ open, title, team1, team2, score1, score2, onScore1Change, onScore2Change, onSave, onClose, editable }) => {
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
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box textAlign={"center"}>
              <Box
                component={'img'}
                sx={{
                  mt: 2,
                  height: '150px',
                  width: '150px'
                }}
                src={team1?.darkLogo || DEFAULT_LOGO}
              ></Box>
              <Typography variant="h6" textAlign={'center'}>
                {team1?.name}
              </Typography>
              {editable == true
                ? <OutlinedInput value={score1} onChange={onScore1Change} />
                : <Typography variant="h5">{!score1 ? 0 : score1}</Typography>}
            </Box>
          </Box>
          <Box>
            <Typography variant="h2">V.S.</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'right',
              gap: 2
            }}
          >
            <Box textAlign={"center"}>
              <Box
                component={'img'}
                sx={{
                  mt: 2,
                  height: '150px',
                  width: '150px'
                }}
                src={team2?.darkLogo || DEFAULT_LOGO}
              ></Box>
              <Typography variant="h6" textAlign={'center'}>
                {team2?.name}
              </Typography>
              {editable == true
                ? <OutlinedInput value={score2} onChange={onScore2Change} />
                : <Typography variant="h5">{!score2 ? 0 : score2}</Typography>}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      {editable == true &&
        <DialogActions>
          <Button variant="contained" onClick={onSave}>
            Save
          </Button>
        </DialogActions>}
    </Dialog>
  )
}

export default ScoresDialog;