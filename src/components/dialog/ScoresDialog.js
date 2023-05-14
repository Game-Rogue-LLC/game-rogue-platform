import { DEFAULT_LOGO } from "@/src/config/global";
import { useStyleContext } from "@/src/context/StyleContext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";

const scoreStyles = {
  win: {
    color: "#efe804",
    textShadow: "0 0 12px #ff2f00",
  },
  lose: {},
  draw: {
    color: "#efe804",
    textShadow: "0 0 12px #ff2f00",
  },
};

const ScoresDialog = ({
  open,
  title,
  team1,
  team2,
  score1,
  score2,
  onScore1Change,
  onScore2Change,
  onSave,
  onClose,
  editable,
}) => {
  const theme = useTheme();
  const { buttonStyle } = useStyleContext();
  const sc1 = score1 || 0,
    sc2 = score2 || 0;
  let style1 = {},
    style2 = {};
  if (sc1 > sc2) {
    style1 = scoreStyles.win;
    style2 = scoreStyles.lose;
  } else if (sc1 == sc2) {
    style1 = style2 = scoreStyles.draw;
  } else {
    style1 = scoreStyles.lose;
    style2 = scoreStyles.win;
  }
  return (
    <Dialog
      onClose={onClose}
      open={open}
      PaperProps={{
        style: {
          backgroundColor: "#0a1e28",
          backgroundImage: "linear-gradient(0deg, #ab013875, transparent)",
          padding: "20px",
        },
      }}
    >
      <DialogTitle
        variant="h2"
        fontSize={"3rem"}
        textAlign={"center"}
        textTransform={"uppercase"}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            height: "300px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box textAlign={"center"}>
              <Box
                component={"img"}
                sx={{
                  mt: 2,
                  height: "150px",
                  width: "150px",
                  filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))",
                }}
                src={team1?.darkLogo || DEFAULT_LOGO}
              ></Box>
              <Typography
                variant="body1"
                textAlign={"center"}
                fontSize={"1.5rem"}
              >
                {team1?.name}
              </Typography>
              {editable == true ? (
                <OutlinedInput
                  value={score1}
                  onChange={onScore1Change}
                  inputProps={{ style: { textAlign: "center" } }}
                />
              ) : (
                <Typography variant="h3" fontSize={"3rem"} sx={style1}>
                  {!score1 ? 0 : score1}
                </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="/static/images/vs.png" height={80} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
              gap: 2,
            }}
          >
            <Box textAlign={"center"}>
              <Box
                component={"img"}
                sx={{
                  mt: 2,
                  height: "150px",
                  width: "150px",
                  filter: "drop-shadow(0px 0px 20px rgb(171, 1, 56))",
                }}
                src={team2?.darkLogo || DEFAULT_LOGO}
              ></Box>
              <Typography
                variant="body1"
                textAlign={"center"}
                fontSize={"1.5rem"}
              >
                {team2?.name}
              </Typography>
              {editable == true ? (
                <OutlinedInput
                  value={score2}
                  onChange={onScore2Change}
                  inputProps={{ style: { textAlign: "center" } }}
                />
              ) : (
                <Typography variant="h3" fontSize={"3rem"} sx={style2}>
                  {!score2 ? 0 : score2}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      {editable == true && (
        <DialogActions>
          <Button variant="contained" sx={{ ...buttonStyle }} onClick={onSave}>
            Save
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default ScoresDialog;
