import { useTournamentContext } from "@/src/context/TournamentContext";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useTheme,
} from "@mui/material";
const TeamScoreBoard = ({ item, sx }) => {
  const theme = useTheme();
  const { player } = useTournamentContext();
  return (
    <Box sx={{ display: "flex", alignItems: "start", gap: 2, ...sx }}>
      <Box
        sx={{
          border: "solid 1px rgba(255,255,255,0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "200px",
          gap: 2,
        }}
      >
        <Box sx={{ px: 2, pt: 2 }}>
          <img src={item?.darkLogo} width={85} height={85} />
          <Typography variant="body1" sx={{ color: "white" }}>
            {item?.name}
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            width: "100%",
            borderRadius: 0,
            backgroundColor: "black",
            color: theme.palette.primary.main,
            border: "solid 1px rgba(255,255,255,0.2)",
            ":hover": { backgroundColor: "#4d4d4d" },
          }}
        >
          View
        </Button>
      </Box>
      <Table border="solid 1px rgba(255,255,255,0.6)">
        <TableHead>
          <TableRow>
            <TableCell>Player</TableCell>
            <TableCell>KO</TableCell>
            <TableCell>Plants</TableCell>
            <TableCell>Refuses</TableCell>
            <TableCell>Game Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item?.players?.map((val, i) => (
            <TableRow key={`player_${i}`}>
              <TableCell>{player?.players[val.id]?.name}</TableCell>
              <TableCell>{Math.floor(Math.random() * 20)}</TableCell>
              <TableCell>{Math.floor(Math.random() * 20)}</TableCell>
              <TableCell>{Math.floor(Math.random() * 20)}</TableCell>
              <TableCell>{Math.floor(Math.random() * 20)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <></>
    </Box>
  );
};

export default TeamScoreBoard;
