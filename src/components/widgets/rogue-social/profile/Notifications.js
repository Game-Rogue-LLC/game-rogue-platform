import { Box, Tooltip, Typography, styled, tooltipClasses, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Link from "next/link";
import PostItem from "@/src/components/widgets/rogue-social/PostItem";
import dayjs from "dayjs";
import { readPost } from "@/src/redux/features/postSlice";
import { useAuthContext } from "@/src/context/AuthContext";
import { useEffect } from "react";
import { useMemo } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

// import NotificationList from "@/src/components/list/NotificationList";

const StyledTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.card.main
  }
}));

const Notifications = ({ notifications }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const { player } = useTournamentContext();
  const post = useSelector((state) => state.post);

  const followers = useMemo(() => {
    return _.filter(player.players, (val) => _.includes(player.players[user.id].followers, val.id));
  }, [player.players, user]);

  const myPosts = useMemo(() => {
    return _.filter(post.posts, (val) => val.uid === user.id).sort((a, b) =>
      dayjs(a.modifiedAt).isAfter(dayjs(b.modifiedAt)) ? 1 : -1
    );
  }, [post.posts, user]);

  useEffect(() => {
    dispatch(readPost());
  }, []);

  return (
    <Box sx={{ padding: 1 }}>
      {/* <NotificationList items={notifications} /> */}
      <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", borderRadius: 2 }}>
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h5">Follows</Typography>
        </Box>
        <Box sx={{ p: 2, borderTop: "solid 1px rgba(255,255,255,.2)" }}>
          <Typography color="white">
            {followers.slice(0, 3).map((follower) => (
              <Link href={"/user/" + follower.id} style={{ color: theme.palette.primary.main }}>
                {follower.name}
              </Link>
            ))}
            {followers.length > 3 ? " and " + (followers.length - 3) + " more " : " "}
            followed you.
          </Typography>
        </Box>
      </Box>

      <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", borderRadius: 2, mt: 2 }}>
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h5">Likes</Typography>
        </Box>
        {myPosts.length === 0 ? (
          <Typography fontSize={20} color="white" textAlign="center">
            NO POSTS
          </Typography>
        ) : (
          myPosts.map((val) => (
            <Box sx={{ borderTop: "solid 1px rgba(255,255,255,.2)", px: 2, py: 1 }}>
              <Link href={"/rogue-social/?tab=0"}>
                <Typography
                  sx={{ color: "white", ":hover": { color: theme.palette.primary.main } }}
                >
                  {val.vote + " liked your post."}
                </Typography>
              </Link>
            </Box>
          ))
        )}
      </Box>

      <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", borderRadius: 2, mt: 2 }}>
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h5">Shares</Typography>
        </Box>
        {myPosts.length === 0 ? (
          <Typography fontSize={20} color="white" textAlign="center">
            NO POSTS
          </Typography>
        ) : (
          myPosts.map((val) => (
            <Box sx={{ borderTop: "solid 1px rgba(255,255,255,.2)", px: 2, py: 1 }}>
              <Link href={"/rogue-social/?tab=0"}>
                <Typography
                  sx={{ color: "white", ":hover": { color: theme.palette.primary.main } }}
                >
                  {val.reshare + " shared your post."}
                </Typography>
              </Link>
            </Box>
          ))
        )}
      </Box>

      <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", borderRadius: 2, mt: 2 }}>
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h5">Tagged</Typography>
        </Box>
        <Box sx={{ p: 2, borderTop: "solid 1px rgba(255,255,255,.2)" }}>
          <Link href="/rogue-social/?tab=0">
            <Typography sx={{ color: "white", ":hover": { color: theme.palette.primary.main } }}>
              {"2 mentioned you in a post."}
            </Typography>
          </Link>
        </Box>
      </Box>

      <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", borderRadius: 2, mt: 2 }}>
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h5">Reply</Typography>
        </Box>
        {myPosts.length === 0 ? (
          <Typography fontSize={20} color="white" textAlign="center">
            NO POSTS
          </Typography>
        ) : (
          myPosts.map((val) => (
            <Box sx={{ borderTop: "solid 1px rgba(255,255,255,.2)", px: 2, py: 1 }}>
              <Typography sx={{ color: "white", ":hover": { color: theme.palette.primary.main } }}>
                <StyledTooltip title={<PostItem item={val} asTooltip={true} />}>
                  <Link href={"/rogue-social/?tab=0"}>{val.reply + " replied to your post."}</Link>
                </StyledTooltip>
              </Typography>
            </Box>
          ))
        )}
      </Box>

      {/* <Box sx={{ border: "solid 1px rgba(255,255,255,.2)", borderRadius: 2, mt: 2 }}>
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="h5">Updates</Typography>
        </Box>
        {myPosts.length === 0 ? (
          <Typography fontSize={20} color="white" textAlign="center">
            NO UPDATES
          </Typography>
        ) : (
          myPosts.map((val) => (
            <Box sx={{ borderTop: "solid 1px rgba(255,255,255,.2)", px: 2, py: 1 }}>
              <Typography sx={{ color: "white", ":hover": { color: theme.palette.primary.main } }}>
                <StyledTooltip title={<PostItem item={val} asTooltip={true} />}>
                  <Link href={"/rogue-social/?tab=0"}>{val.reply + " replied to your post."}</Link>
                </StyledTooltip>
              </Typography>
            </Box>
          ))
        )}
      </Box> */}
    </Box>
  );
};

export default Notifications;
