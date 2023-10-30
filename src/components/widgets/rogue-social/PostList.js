import { Box, CircularProgress, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import ConfirmDialog from "@/src/components/dialog/ConfirmDialog";
import PostDialog from "@/src/components/widgets/rogue-social/PostDialog";
import PostItem from "@/src/components/widgets/rogue-social/PostItem";
import { nanoid } from "nanoid";
import { setPost } from "@/src/redux/features/postSlice";
import { useAuthContext } from "@/src/context/AuthContext";
import { useState } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

const PostList = ({ loading, posts, sx }) => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { post: postController } = useTournamentContext();

  const onOpenPostDialog = () => {
    setOpenPostDialog(true);
  };
  const onClosePostDialog = () => {
    setOpenPostDialog(false);
  };

  const onOpenReplyDialog = () => {
    setOpenReplyDialog(true);
  };
  const onCloseReplyDialog = () => {
    setOpenReplyDialog(false);
  };

  const onEditPost = (id) => {
    setSelectedPost(id);
    onOpenPostDialog();
  };
  const onDeletePost = (id) => {
    setSelectedPost(id);
    setOpenConfirm(true);
  };
  const onReportPost = (id) => {
    // Report function
  };
  const onReply = (id) => {
    setSelectedPost(id);
    onOpenReplyDialog();
  };

  const onAccept = async () => {
    await postController.update(selectedPost, {
      deleted: true
    });
    setOpenConfirm(false);
  };
  const onCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const onPost = async (data) => {
    if (selectedPost) await postController.update(selectedPost, data);
  };
  const onPostReply = async (data) => {
    if (selectedPost) {
      const res = await postController.update(selectedPost, {
        reply: posts[selectedPost].reply + 1,
        replies: [
          {
            id: nanoid(),
            uid: user.id,
            text: data.text,
            reply: 0,
            reshare: 0,
            vote: 0,
            view: 0,
            replies: [],
            reshares: [],
            votes: [],
            views: [],
            createdAt: new Date(),
            deleted: false
          }
        ]
      });
      // add conditional which checks update success
      if (res.code === "succeed") {
        dispatch(setPost(res.data));
      }
    }
  };

  if (posts && loading === true) {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (posts && Object.keys(posts).length === 0)
    return (
      <Box>
        <Typography variant="h6" align="center">
          NO POSTS
        </Typography>
      </Box>
    );

  return (
    <Box sx={{ ...sx }}>
      <ConfirmDialog
        comment="Do you really want to delete this?"
        open={openConfirm}
        onAccept={onAccept}
        onDeny={onCloseConfirm}
      />
      {selectedPost && (
        <>
          <PostDialog
            posting={posts[selectedPost]}
            open={openPostDialog}
            onClose={onClosePostDialog}
            onPost={onPost}
          />
          <PostDialog open={openReplyDialog} onClose={onCloseReplyDialog} onPost={onPostReply} />
        </>
      )}
      {Object.keys(posts).map((key) => {
        const item = posts[key];
        return (
          <PostItem
            key={"post_" + key}
            item={item}
            onEdit={onEditPost}
            onDelete={onDeletePost}
            onReport={onReportPost}
            onReply={onReply}
          >
            {item.replies.map((reply) => (
              <PostItem
                key={"post_reply_" + reply.id}
                item={reply}
                onEdit={onEditPost}
                onDelete={onDeletePost}
                onReport={onReportPost}
                onReply={onReply}
              />
            ))}
          </PostItem>
        );
      })}
    </Box>
  );
};

export default PostList;
