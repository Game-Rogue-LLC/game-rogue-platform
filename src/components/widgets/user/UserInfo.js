import { Box, Button, ButtonBase, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { AddAPhoto, Edit, Female, Logout, Male, Man, Woman } from "@mui/icons-material";
import { useMemo, useState } from "react";

import Avatar from "@/src/components/Avatar";
import { LoadingButton } from "@mui/lab";
import dayjs from "dayjs";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useTournamentContext } from "@/src/context/TournamentContext";

// import { useUser } from "@/lib/firebase/useUser";

const UserInfo = ({ inputs, item, editable, handle }) => {
  const user = useAuthContext();
  const theme = useTheme();
  const { player, ticket } = useTournamentContext();
  const [following, setFollowing] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  console.log(item);

  const isFollowing = useMemo(() => {
    if (user.user && item && player.players)
      return _.includes(player.players[user.user.id].followings, item.id);
    return false;
  }, [player.players, item, user.user]);
  const onFollow = async (e) => {
    if (user.user) {
      setFollowing(true);
      let res = await player.update(item.id, {
        followers: [..._.filter(item.followers, (val) => val !== user.user.id), user.user.id]
      });
      if (res.code === "failed") {
        setFollowing(false);
        console.warn(res.message);
        return;
      }
      res = await player.update(user.user.id, {
        followings: [..._.filter(user.user.followings, (val) => val !== item.id), item.id]
      });
      if (res.code === "failed") {
        setFollowing(false);
        console.warn(res.message);
        return;
      }
      res = await ticket.create({
        type: "FOLLOW_USER",
        meta: {},
        users: [user.user.id, item.id],
        createdBy: user.user.id,
        openedAt: new Date(),
        closedAt: null,
        deleted: false
      });
      if (res.code === "failed") {
        setFollowing(false);
        console.warn(res.message);
        return;
      }
      enqueueSnackbar("Followed Successfully!", { variant: "success" });
      setFollowing(false);
    }
  };
  const onUnfollow = async (e) => {
    if (user.user) {
      setFollowing(true);
      let res = await player.update(item.id, {
        followers: _.filter(item.followers, (val) => val !== user.user.id)
      });
      if (res.code === "failed") {
        setFollowing(false);
        console.warn(res.message);
        return;
      }
      res = await player.update(user.user.id, {
        followings: _.filter(user.user.followings, (val) => val !== item.id)
      });
      if (res.code === "failed") {
        setFollowing(false);
        console.warn(res.message);
        return;
      }
      enqueueSnackbar("Unfollowed Successfully!", { variant: "success" });
      // res = await ticket.create({
      //   type: "UNFOLLOW_USER",
      //   meta: {},
      //   users: [user.user.id, item.id],
      //   createdBy: user.user.id,
      //   openedAt: new Date(),
      //   closedAt: null,
      //   deleted: false
      // });
      // if (res.code === "failed") console.warn(res.message);
      setFollowing(false);
    }
  };

  return (
    <Box>
      <Box sx={{ textAlign: "center", position: "relative" }}>
        {editable && (
          <Box
            sx={{
              width: "100%",
              height: "100px",
              backgroundImage: `url(${inputs?.banner})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5
            }}
          >
            <ButtonBase
              component={"label"}
              sx={{
                width: "100%",
                height: "100%",
                opacity: 0,
                padding: 1,
                justifyContent: "end",
                alignItems: "start",
                cursor: "pointer",
                ":hover": {
                  background: "rgba(0,0,0,.2)",
                  opacity: 1
                },
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5
              }}
            >
              <AddAPhoto />
              <input
                type="file"
                accept="image/*"
                name="upload-banner"
                id="upload-banner"
                hidden
                onChange={(e) => handle(e, "banner")}
              />
            </ButtonBase>
          </Box>
        )}
        <Avatar
          size="large"
          editable={editable}
          src={inputs?.profilePic}
          user={item}
          ContainerProps={{
            sx:
              editable === true
                ? {
                    position: "absolute",
                    top: "100px",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }
                : {}
          }}
          sx={{
            width: 150,
            height: 150,
            mx: "auto"
          }}
          onChange={(e) => handle(e, "profilePic")}
        />
      </Box>

      <Box sx={{ mt: editable === true ? "100px" : 0 }}>
        {user?.user && item?.id === user.user.id && !editable && (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <Button variant="contained" sx={{ mt: 2, mx: "auto" }} onClick={handle}>
              EDIT PROFILE
            </Button>
          </Box>
        )}
        {user?.user && item && item.id !== user.user.id && (
          <Box sx={{ width: "100%", textAlign: "center" }}>
            <LoadingButton
              loading={following}
              variant="contained"
              sx={{ mt: 2, mx: "auto" }}
              onClick={isFollowing ? onUnfollow : onFollow}
            >
              {isFollowing ? "UNFOLLOW" : "FOLLOW"}
            </LoadingButton>
          </Box>
        )}
        {user?.user && item?.id === user.user.id && (
          <Box sx={{ textAlign: "center", position: "relative", mt: 2 }}>
            <Button variant="contained" transform="uppercase" onClick={() => user.logout()}>
              <Logout />
              &nbsp; Log out
            </Button>
          </Box>
        )}
      </Box>

      <Box sx={{ mt: 4, px: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ fontWeight: "900" }}>
              ROGUE ID
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{item?._id}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ fontWeight: "900" }}>
              NAME
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{item?.name}</Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ fontWeight: "900" }}>
              USER NAME
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{item?.userName}</Typography>
          </Grid>
        </Grid>

        {item?.showAge && (
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" sx={{ fontWeight: "900" }}>
                AGE
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                {dayjs(new Date()).diff(item?.birthday, "year")}
              </Typography>
            </Grid>
          </Grid>
        )}

        {/* <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ fontWeight: "900" }}>
              GENDER
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1">{item?.gender == 0 ? <Man /> : <Woman />}</Typography>
          </Grid>
        </Grid> */}

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" sx={{ fontWeight: "900" }}>
              RESIDENCY
            </Typography>
          </Grid>
          <Grid item>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${item?.residency.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${item?.residency.code.toLowerCase()}.png 2x`}
              alt=""
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default UserInfo;
