import { Box, CircularProgress, Typography } from "@mui/material";

import ConfirmDialog from "@/src/components/dialog/ConfirmDialog";
import PostDialog from "@/src/components/widgets/rogue-social/PostDialog";
import PostItem from "@/src/components/widgets/rogue-social/PostItem";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { setPost } from "@/src/redux/features/postSlice";
import { useAuthContext } from "@/src/context/AuthContext";

const PostList = ({}) => {
  const dispatch = useDispatch();
  const { user } = useAuthContext();
  const [openPostDialog, setOpenPostDialog] = useState(false);
  const [openReplyDialog, setOpenReplyDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const { post: postController } = useTournamentContext();
  const post = useSelector((state) => state.post);

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
      console.log(selectedPost);
      const res = await postController.update(selectedPost, {
        reply: post.posts[selectedPost].reply + 1,
        replies: [
          {
            id: nanoid(),
            uid: user.id,
            text: data.text,
            reply: 0,
            reshare: 0,
            vote: 0,
            view: 0,
            createdAt: new Date(),
            deleted: false
          }
        ]
      });
      console.log(res);
      // add conditional which checks update success
      if (res.code === "succeed") {
        dispatch(setPost(res.data));
      }
    }
  };

  if (post && post?.status === "loading") {
    return (
      <Box textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  if (post && Object.keys(post.posts).length === 0)
    return (
      <Box>
        <Typography variant="h6" align="center">
          NO POSTS
        </Typography>
      </Box>
    );

  return (
    <Box>
      <ConfirmDialog
        comment="Do you really want to delete this?"
        open={openConfirm}
        onAccept={onAccept}
        onDeny={onCloseConfirm}
      />
      {selectedPost && (
        <>
          <PostDialog
            posting={post?.posts[selectedPost]}
            open={openPostDialog}
            onClose={onClosePostDialog}
            onPost={onPost}
          />
          <PostDialog open={openReplyDialog} onClose={onCloseReplyDialog} onPost={onPostReply} />
        </>
      )}
      {Object.keys(post?.posts).map((key) => {
        const item = post.posts[key];
        return (
          <PostItem
            key={"post_" + key}
            item={item}
            onEdit={onEditPost}
            onDelete={onDeletePost}
            onReport={onReportPost}
            onReply={onReply}
          />
        );
      })}
    </Box>
  );
};

export default PostList;
