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
import CustomDateTimePicker from "../DateTimePicker";

const MatchDialog = (props) => {
  const { onClose, title, open, onSave, status } = props;
  if (status == 0) {
    const { start, end, onStartChange, onEndChange } = props;
    return (
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2
            }}
          >
            <CustomDateTimePicker value={start} setValue={onStartChange} />
            <CustomDateTimePicker value={end} setValue={onEndChange} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  } else if (status == 1) {
    const { team1, team2, score1, score2, onScore1Change, onScore2Change } = props;
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
              <Box>
                <Typography variant="h5" textAlign={'center'}>
                  {team1?.name}
                </Typography>
                <Box
                  component={'img'}
                  sx={{
                    mt: 2,
                    height: '150px',
                    width: '150px',
                    borderRadius: '50%',
                    outline: 'solid 2px rgba(255, 255, 255, 0.2)',
                    outlineOffset: '2px'
                  }}
                  src={team1?.darkLogo || DEFAULT_LOGO}
                ></Box>
              </Box>
              <OutlinedInput value={score1} onChange={onScore1Change} />
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
              <OutlinedInput value={score2} onChange={onScore2Change} />

              <Box>
                <Typography variant="h5" textAlign={'center'}>
                  {team2?.name}
                </Typography>
                <Box
                  component={'img'}
                  sx={{
                    mt: 2,
                    height: '150px',
                    width: '150px',
                    borderRadius: '50%',
                    outline: 'solid 2px rgba(255, 255, 255, 0.2)',
                    outlineOffset: '2px'
                  }}
                  src={team2?.darkLogo || DEFAULT_LOGO}
                ></Box>
              </Box>
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

  const { team1, team2, score1, score2 } = props;
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
            <Box>
              <Typography variant="h5" textAlign={'center'}>
                {team1?.name}
              </Typography>
              <Box
                component={'img'}
                sx={{
                  mt: 2,
                  height: '150px',
                  width: '150px',
                  borderRadius: '50%',
                  outline: 'solid 2px rgba(255, 255, 255, 0.2)',
                  outlineOffset: '2px'
                }}
                src={team1?.darkLogo || DEFAULT_LOGO}
              ></Box>
            </Box>
            <Typography variant='body1'>{score1}</Typography>
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
            <Typography variant='body1'>{score2}</Typography>
            <Box>
              <Typography variant="h5" textAlign={'center'}>
                {team2?.name}
              </Typography>
              <Box
                component={'img'}
                sx={{
                  mt: 2,
                  height: '150px',
                  width: '150px',
                  borderRadius: '50%',
                  outline: 'solid 2px rgba(255, 255, 255, 0.2)',
                  outlineOffset: '2px'
                }}
                src={team2?.darkLogo || DEFAULT_LOGO}
              ></Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
      </DialogActions>
    </Dialog>
  )
}

export default MatchDialog;