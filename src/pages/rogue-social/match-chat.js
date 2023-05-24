import { Box } from "@mui/material";

const Page = (props) => {
  const { team1, team2, score1, score2, style1, style2 } = props;
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "150px" }}>
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
          <Typography variant="body1" textAlign={"center"} fontSize={"1.5rem"}>
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
      <Box sx={{ flexGrow: 1 }}></Box>
      <Box sx={{ width: "150px" }}>
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
          <Typography variant="body1" textAlign={"center"} fontSize={"1.5rem"}>
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
  );
};

export default Page;
