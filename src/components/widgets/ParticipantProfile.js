import Link from "next/link";
import { useRouter } from "next/router";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  useTheme,
} from "@mui/material";
import { Event, Grid3x3 } from "@mui/icons-material";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { formatDate } from "@/src/utils/utils";
import { useStyleContext } from "@/src/context/StyleContext";

export default function ParticipantProfile({ item }) {
  const theme = useTheme();
  const router = useRouter();
  const { colors, buttonStyle } = useStyleContext();
  const { team, player } = useTournamentContext();

  const getTeamPlayers = (team) => {
    if (!team) return [];
    return team.players.map((val) => ({
      ...val,
      ...player.players[val.id],
    }));
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            flexDirection: "column",
          }}
        >
          <Box
            component="img"
            src={team?.teams[item?.id]?.darkLogo}
            width={100}
            height={100}
          ></Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid3x3 fontSize="12px" />
            <Typography variant="body2">{item?.id}</Typography>
          </Box>
          {/* <Chip
            icon={}
            label={item?.id}
            sx={{ opacity: 0.8, p: 0, height: "20px" }}
          /> */}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title={item?.residency.label}>
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${item?.residency.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${item?.residency.code.toLowerCase()}.png 2x`}
                alt=""
              />
            </Tooltip>
            <Typography variant="h4" fontSize={24} color={colors.primary}>
              {item?.name}
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            <Typography variant="body1">Rogue Social Member Since:</Typography>
            <Chip
              icon={<Event />}
              label={formatDate(item?.createdAt, "MMM. YYYY")}
              sx={{ p: 1 }}
            />
          </Box>
          <Button
            variant="contained"
            sx={{ mt: 1, ...buttonStyle }}
            onClick={() => {
              router.push("/team/" + item?.id);
            }}
          >
            VIEW PROFILE
          </Button>
          {/* <Chip
          icon={
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${item?.residency.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${item?.residency.code.toLowerCase()}.png 2x`}
              alt=""
            />
          }
          label={item?.residency?.label}
          sx={{ p: 1 }}
        /> */}
        </Box>
      </Box>
      <Box sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">USER NAME</TableCell>
              <TableCell align="center">POSITION</TableCell>
              <TableCell align="center">RESIDENCY</TableCell>
              <TableCell align="center">VIEW PROFILE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getTeamPlayers(item).map((val, i) => (
              <TableRow hover key={"user_" + val.id}>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      justifyContent: "center",
                    }}
                  >
                    <Avatar
                      variant="circular"
                      src={val.profilePic} //player.players[val.id].profilePic}
                    />
                    <Link href={"/user/" + val.id}>
                      {/* {player.players[val.id].name} */}
                      {val.name}
                    </Link>
                  </Box>
                </TableCell>
                <TableCell align="center">
                  {team?.positions[val?.position]?.name}
                </TableCell>
                <TableCell align="center">{val.residency?.label}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    sx={{ ...buttonStyle }}
                    onClick={() => {
                      // TODO: Redirect to Rogue Social Profile
                      router.push("/user/" + val.id);
                    }}
                  >
                    VIEW PROFILE
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
}
