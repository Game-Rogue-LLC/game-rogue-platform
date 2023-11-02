import { Avatar, Box, Button, Grid, Paper, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

import AdminLayout from "@/src/content/AdminLayout";
import TeamTable from "@/src/components/table/TeamTable";
import UserInfo from "@/src/components/widgets/user/UserInfo";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const Page = (props) => {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useAuthContext();
  const [uid, setUID] = useState(props.uid);
  const [item, setItem] = useState(null);
  const { setTitle } = useAppContext();
  const { player, team } = useTournamentContext();

  const handle = {
    show: (id) => {
      router.push("/team/" + id);
    },
    edit: (e) => {
      router.push("/user/" + uid + "/edit");
    }
  };

  useEffect(() => {
    setItem(player.players[uid]);
  }, [player.players, uid]);

  useEffect(() => {
    if (router?.query?.uid) {
      const newUID = router.query.uid;
      if (player.players[newUID]) {
        setUID(router.query.uid);
      } else {
        console.warn("Invalid User ID");
      }
    }
  }, [router]);

  useEffect(() => {
    setTitle("USER PROFILE");
  }, []);

  const onTeamCreate = () => {
    router.push("/team/create");
  };
  const onTeamJoin = () => {
    router.push("/team/join");
  };
  const onOrganizationCreate = () => {
    router.push("/organizer/create");
  };
  const onOrganizationJoin = () => {
    // router.push("/organizer/join");
  };
  const onOrganizerCreate = () => {
    // router.push("/organizer/create");
  };
  const onOrganizerJoin = () => {
    // router.push("/organizer/join");
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Grid container spacing={2}>
        <Grid item sx={{ width: 300 }}>
          <UserInfo avatar={item?.profilePic} item={item} editable={false} handle={handle.edit} />
        </Grid>
        <Grid item xs container spacing={2} rowSpacing={4}>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h5" color="white">
                TEAMS
              </Typography>
              <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
                <Button variant="contained" onClick={onTeamCreate}>
                  CREATE
                </Button>
                <Button variant="contained" onClick={onTeamJoin}>
                  JOIN
                </Button>
              </Box>
            </Box>
            {/* <Box
              sx={{
                border: "solid 1px rgb(52, 43, 35)",
                width: "100%",
                borderRadius: "5px"
              }}
            >
              <TeamTable
                teams={team.teams}
                uid={uid}
                handleClick={handle.show}
                showCreate={uid === user.id}
              />
            </Box> */}
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h5" color="white">
                ORGANIZERS
              </Typography>
              <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
                <Button variant="contained" onClick={onOrganizationCreate}>
                  CREATE
                </Button>
                <Button variant="contained" onClick={onOrganizationJoin}>
                  JOIN
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="h5" color="white">
                ORGANIZERS
              </Typography>
              <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 2 }}>
                <Button variant="contained" onClick={onOrganizerCreate}>
                  CREATE
                </Button>
                <Button variant="contained" onClick={onOrganizerJoin}>
                  JOIN
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

Page.getLayout = (page) => {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Page;
