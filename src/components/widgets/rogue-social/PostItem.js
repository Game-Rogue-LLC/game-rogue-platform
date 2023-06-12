import {
  Autorenew,
  BarChart,
  Delete,
  Edit,
  Favorite,
  MoreVert,
  Report,
  Sms
} from "@mui/icons-material";
import {
  Box,
  ButtonBase,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useTheme
} from "@mui/material";

import Avatar from "@/src/components/Avatar";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { markdownToHtml } from "@/src/utils/html-markdown";
import { setPost } from "@/src/redux/features/postSlice";
import { useAuthContext } from "@/src/context/AuthContext";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

const PostItem = ({ item, asTooltip, onEdit, onDelete, onReport, onReply, ...props }) => {
  const theme = useTheme();
  const { user } = useAuthContext();
  const { player, post } = useTournamentContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();

  const onOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const onCloseMenu = (e) => {
    setAnchorEl(null);
  };

  const onEditPost = (e) => {
    onEdit(item.id);
    onCloseMenu(e);
  };
  const onDeletePost = (e) => {
    onDelete(item.id);
    onCloseMenu(e);
  };
  const onReportPost = (e) => {
    onReport(item.id);
    onCloseMenu(e);
  };

  const replied = (post, uid) => {
    if (post && uid && _.findIndex(post.replies, (val) => val.uid === uid) >= 0) return true;
    return false;
  };
  const reshared = (post, uid) => {
    if (post && uid && _.findIndex(post.reshares, (val) => val === uid) >= 0) return true;
    return false;
  };
  const voted = (post, uid) => {
    if (post && uid && _.findIndex(post.votes, (val) => val === uid) >= 0) return true;
    return false;
  };
  const viewed = (post, uid) => {
    if (post && uid && _.findIndex(post.views, (val) => val === uid) >= 0) return true;
    return false;
  };

  if (asTooltip) {
    return (
      <Box
        id={item.id}
        sx={{
          position: "relative",
          width: "100%",
          padding: 2,
          zIndex: 0
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar
                user={player.players[item.uid]}
                sx={{ width: 50, height: 50 }}
                hideStatus={true}
              />
              <Box>
                <Typography variant="h5" color="white">
                  {player?.players[item.uid]?.userName || player?.players[item.uid]?.name}
                </Typography>
                <Typography style={{ color: "grey" }}>{player?.players[item.uid]?.name}</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <div
                className="html-wrapper"
                style={{
                  color: "white",
                  fontSize: 16
                }}
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(item?.text)
                }}
              ></div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box
      id={item.id}
      sx={{
        position: "relative",
        width: "100%",
        borderTop: "solid 1px rgb(255,255,255,0.2)",
        padding: 2,
        paddingBottom: 0,
        zIndex: 0
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Avatar
            user={player.players[item.uid]}
            sx={{ width: 50, height: 50 }}
            hideStatus={true}
          />
        </Grid>
        <Grid item xs>
          <Box>
            <Typography variant="h5" color="white">
              {player?.players[item.uid]?.userName || player?.players[item.uid]?.name}
            </Typography>
            <Typography style={{ color: "grey" }}>{player?.players[item.uid]?.name}</Typography>
            <div
              className="html-wrapper"
              style={{
                color: "white"
              }}
              dangerouslySetInnerHTML={{
                __html: markdownToHtml(item?.text)
              }}
            ></div>

            <Box
              sx={{
                marginTop: 2,
                paddingBottom: 2,
                display: "flex",
                gap: 4,
                color: "white"
              }}
            >
              <ButtonBase
                onClick={() => {
                  // if (replied(item, user.id)) return;
                  onReply(item.id);
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: replied(item, user.id) ? theme.palette.primary.main : "white"
                  }}
                >
                  <Sms />
                  <Typography variant="body1">{item?.reply}</Typography>
                </Box>
              </ButtonBase>
              <ButtonBase
                onClick={(e) => {
                  if (reshared(item, user.id)) {
                    const temp = item.reshare - 1;
                    post.update(item.id, {
                      reshare: temp,
                      reshares: _.filter(item.reshares, (val) => val !== user.id)
                    });
                    dispatch(
                      setPost({
                        id: item.id,
                        reshare: temp,
                        reshares: _.filter(item.reshares, (val) => val !== user.id)
                      })
                    );
                  } else {
                    const temp = item.reshare + 1;
                    post.update(item.id, { reshare: temp, reshares: [...item.reshares, user.id] });
                    dispatch(
                      setPost({
                        id: item.id,
                        reshare: temp,
                        reshares: [...item.reshares, user.id]
                      })
                    );
                  }
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: reshared(item, user.id) ? theme.palette.primary.main : "white"
                  }}
                >
                  <Autorenew />
                  <Typography variant="body1">{item?.reshare}</Typography>
                </Box>
              </ButtonBase>
              <ButtonBase
                onClick={(e) => {
                  if (voted(item, user.id)) {
                    const temp = item.vote - 1;
                    post.update(item.id, {
                      vote: temp,
                      votes: _.filter(item.votes, (val) => val !== user.id)
                    });
                    dispatch(
                      setPost({
                        id: item.id,
                        vote: temp,
                        votes: _.filter(item.votes, (val) => val !== user.id)
                      })
                    );
                  } else {
                    const temp = item.vote + 1;
                    post.update(item.id, { vote: temp, votes: [...item.votes, user.id] });
                    dispatch(setPost({ id: item.id, vote: temp, votes: [...item.votes, user.id] }));
                  }
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: voted(item, user.id) ? theme.palette.primary.main : "white"
                  }}
                >
                  <Favorite />
                  <Typography variant="body1">{item?.vote}</Typography>
                </Box>
              </ButtonBase>
              <ButtonBase
                onClick={(e) => {
                  if (viewed(item, user.id)) {
                    const temp = item.view - 1;
                    post.update(item.id, {
                      view: temp,
                      views: _.filter(item.views, (val) => val !== user.id)
                    });
                    dispatch(
                      setPost({
                        id: item.id,
                        view: temp,
                        views: _.filter(item.views, (val) => val !== user.id)
                      })
                    );
                  } else {
                    const temp = item.view + 1;
                    post.update(item.id, { view: temp, views: [...item.views, user.id] });
                    dispatch(setPost({ id: item.id, view: temp, views: [...item.views, user.id] }));
                  }
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    color: viewed(item, user.id) ? theme.palette.primary.main : "white"
                  }}
                >
                  <BarChart />
                  <Typography variant="body1">{item?.view}</Typography>
                </Box>
              </ButtonBase>
            </Box>
          </Box>

          {/* Replies */}
          {props.children && <Box>{props.children}</Box>}

          {/* Begin Replies */}
          {/* {item.replies?.length > 0 && (
            <Box>
              <Divider sx={{ marginTop: 2 }} />
              <Box sx={{ mt: 1 }}>
                {item.replies.map((val) => {
                  return (
                    <Box key={val.id} sx={{ display: "flex", gap: 2 }}>
                      <Avatar user={player.players[val.id]} width={20} height={20} />
                      <Box>
                        <Box>
                          <Typography variant="h5" color="white">
                            {player?.players[val.uid]?.userName || player?.players[val.uid]?.name}
                          </Typography>
                          <Typography style={{ color: "grey" }}>
                            {player?.players[val.uid]?.name}
                          </Typography>
                        </Box>
                        <div
                          style={{ color: "white" }}
                          dangerouslySetInnerHTML={{
                            __html: markdownToHtml(val.text)
                          }}
                        ></div>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )} */}
          {/* End Replies */}
        </Grid>
        {asTooltip === true && (
          <Grid item xs="auto">
            <IconButton
              id={item.id + "-more-btn"}
              aria-controls={openMenu ? item.id + "-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openMenu ? "true" : undefined}
              onClick={onOpenMenu}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id={item.id + "_menu"}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={onCloseMenu}
              disableScrollLock={true}
              MenuListProps={{
                "aria-labelledby": item.id + "-more-btn"
              }}
            >
              {item.uid === user.id ? (
                <Box>
                  <MenuItem onClick={onEditPost}>
                    <ListItemIcon>
                      <Edit fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={onDeletePost}>
                    <ListItemIcon>
                      <Delete fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </MenuItem>
                </Box>
              ) : (
                <MenuItem onClick={onReportPost}>
                  <ListItemIcon>
                    <Report fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Report</ListItemText>
                </MenuItem>
              )}
            </Menu>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default PostItem;
