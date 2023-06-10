import {
  Alert,
  Box,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  OutlinedInput,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { DEFAULT_LOGO, TEAM_POSITIONS } from "@/src/config/global";
import { useEffect, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import Avatar from "@/src/components/Avatar";
import Button from "@mui/material/Button";
import Link from "next/link";
import dayjs from "dayjs";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const initialInputs = {
  name: "",
  short: "",
  accessCode: "",
  residency: "",
  game: "",
  type: 0,
  darkLogo: DEFAULT_LOGO,
  lightLogo: DEFAULT_LOGO,
  description: "",
  deleted: false
};

const Page = (props) => {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();
  const { setTitle } = useAppContext();
  const [item, setItem] = useState({ ...initialInputs });
  const { team, player } = useTournamentContext();
  const [tid, setTID] = useState(null);
  const [inviteUrl, setInviteUrl] = useState("");

  const handle = {
    invite: (e) => {
      navigator.clipboard.writeText(inviteUrl).then(
        () => {
          alert("Content copied successfully!");
        },
        () => {
          console.warn("Failed to copy");
        }
      );
    }
  };

  useEffect(() => {
    const nid = router.query?.tid;
    setTID(nid);
  }, [router]);

  useEffect(() => {
    if (team.teams[tid]) {
      setItem({ ...team.teams[tid] });
      setInviteUrl(
        window.location.protocol +
          "://" +
          window.location.host +
          "/team/join?id=" +
          tid +
          "&&accessCode=" +
          team.teams[tid]?.accessCode
      );
    }
  }, [tid, team.teams]);

  useEffect(() => {
    setTitle("TEAM INFO");
  }, []);

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Grid container rowSpacing={3} spacing={2}>
        <Grid item xs={4} sx={{ minWidth: "200px" }}>
          <Box textAlign={"center"}>
            <img
              src={item.darkLogo ?? DEFAULT_LOGO}
              style={{ height: "200px", maxWidth: "200px", objectFit: "contain" }}
            />
            <Typography variant="h6">{item?.name}</Typography>
          </Box>
          <Box mt={1}>
            {item?.players?.findIndex((val) => val.id === user?.id) >= 0 && (
              <Grid container rowSpacing={2} spacing={2}>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button variant="contained" sx={{ width: "150px" }} onClick={handle.invite}>
                    INVITE URL
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Button variant="contained" sx={{ width: "150px" }}>
                    LEAVE TEAM
                  </Button>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }} hidden={item?.uid != user?.id}>
                  <Button
                    variant="contained"
                    sx={{ width: "150px" }}
                    onClick={(e) => router.push("/team/" + tid + "/edit")}
                  >
                    EDIT TEAM
                  </Button>
                </Grid>
              </Grid>
            )}
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ border: "solid 1px rgb(52, 43, 35)", borderRadius: "5px", width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={4}>
                    <Typography variant="h4">TEAM MEMBERS</Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">USER NAME</TableCell>
                  <TableCell align="center">POSITION</TableCell>
                  <TableCell align="center">RESIDENCY</TableCell>
                  <TableCell align="center">JOINED ON</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {item.players?.map((val, i) => (
                  <TableRow hover key={"user_" + val.id}>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          justifyContent: "center"
                        }}
                      >
                        <Avatar variant="circular" user={player.players[val.id]} />
                        <Link href={"/user/" + val.id}>{player.players[val.id].name}</Link>
                      </Box>
                    </TableCell>
                    <TableCell align="center">{TEAM_POSITIONS[val.position].name}</TableCell>
                    <TableCell align="center">{val.residency?.label}</TableCell>
                    <TableCell align="center">
                      {dayjs(val.joinedOn.toDate()).format("DD. MMM. YYYY")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
