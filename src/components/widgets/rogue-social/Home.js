import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import RichTextInput from "@/src/components/input/RichTextInput";
import { Add, Close, Save } from "@mui/icons-material";
import PostList from "@/src/components/widgets/rogue-social/PostList";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";
import { htmlToMarkdown } from "@/src/utils/html-markdown";

const Home = () => {
  const { user } = useAuthContext();
  const theme = useTheme();
  const [content, setContent] = useState("");
  const [openNewPost, setOpenNewPost] = useState(false);
  const [title, setTitle] = useState("");
  const [saving, setSaving] = useState(false);
  const { post } = useTournamentContext();

  const onOpenNewPost = () => {
    setOpenNewPost(true);
  };
  const onCloseNewPost = () => {
    setTitle("");
    setContent("");
    setOpenNewPost(false);
  };

  const onPost = async (e) => {
    setSaving(true);
    await post.create({
      uid: user.id,
      title,
      text: htmlToMarkdown(content),
      reply: 0,
      vote: 0,
      view: 0,
      replies: [],
      createdAt: new Date(),
      deleted: false
    });
    setSaving(false);
    onCloseNewPost();
  };
  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <Box sx={{ p: 1, width: "100%" }}>
      <Dialog open={openNewPost} onClose={onCloseNewPost} disableScrollLock={true}>
        <DialogTitle align="center">New Post</DialogTitle>
        <DialogContent>
          <TextField placeholder="Title" value={title} onChange={onTitleChange} fullWidth />
          <RichTextInput
            content={content}
            sx={{ color: "white", marginTop: 8 }}
            handleContentChange={(newContent) => {
              setContent(newContent);
            }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <LoadingButton variant="contained" loading={saving} startIcon={<Save />} onClick={onPost}>
            Post
          </LoadingButton>
          <Button variant="contained" color="error" startIcon={<Close />} onClick={onCloseNewPost}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pb: 2,
          borderBottom: "solid 1px rgba(255,255,255,.5)"
        }}
      >
        <Typography variant="h4" color="white">
          Home
        </Typography>
        <Button variant="contained" startIcon={<Add />} onClick={onOpenNewPost}>
          New Post
        </Button>
      </Box>
      <PostList />
      {/* <Box mt={5}>
        <Typography variant="h4" color="white">
          Home
        </Typography>
        <Typography
          variant="h3"
          textAlign="center"
          textTransform="uppercase"
          marginTop="30px"
          color="white"
        >
          WELCOME TO <span style={{ color: theme.palette.primary.main }}>ROGUE SOCIAL!</span>
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          fontSize="24px"
          marginTop="20px"
          color="white"
        >
          Expore the world of esports with no limits. Create account, follow friends, join a team,
          or search for the perfect event all in one place! Join the game now!
        </Typography>
      </Box> */}
    </Box>
  );
};

export default Home;
