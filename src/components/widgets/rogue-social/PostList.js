import { Box, CircularProgress, Typography } from "@mui/material";

import ConfirmDialog from "../../dialog/ConfirmDialog";
import PostDialog from "@/src/components/widgets/rogue-social/PostDialog";
import PostItem from "@/src/components/widgets/rogue-social/PostItem";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useTournamentContext } from "@/src/context/TournamentContext";

const PostList = ({}) => {
  const [openPostDialog, setOpenPostDialog] = useState(false);
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
  const onEditPost = (id) => {
    setSelectedPost(id);
    onOpenPostDialog(true);
  };
  const onDeletePost = (id) => {
    setSelectedPost(id);
    setOpenConfirm(true);
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
        <PostDialog
          posting={post?.posts[selectedPost]}
          open={openPostDialog}
          onClose={onClosePostDialog}
        />
      )}
      {Object.keys(post?.posts).map((key) => {
        const item = post.posts[key];
        return (
          <PostItem key={"post_" + key} item={item} onEdit={onEditPost} onDelete={onDeletePost} />
        );
      })}
    </Box>
  );
};

export default PostList;
