import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from "@mui/material";
import { Close, Save } from "@mui/icons-material";
import { htmlToMarkdown, markdownToHtml } from "@/src/utils/html-markdown";
import { useEffect, useState } from "react";

import { LoadingButton } from "@mui/lab";
import RichTextInput from "@/src/components/input/RichTextInput";
import { useTournamentContext } from "@/src/context/TournamentContext";

const PostDialog = ({ posting, open, onClose }) => {
  const { post } = useTournamentContext();
  const [content, setContent] = useState(markdownToHtml(posting?.text));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (posting?.text) setContent(markdownToHtml(posting.text));
  }, [posting?.text]);

  const onContentChange = (newContent) => {
    setContent(newContent);
  };
  const onPost = async (e) => {
    setSaving(true);
    await post.update(posting.id, {
      text: htmlToMarkdown(content)
    });
    setSaving(false);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} disableScrollLock={true}>
      <DialogTitle align="center">Post</DialogTitle>
      <DialogContent>
        <RichTextInput
          content={content}
          sx={{ color: "white", marginTop: 8 }}
          handleContentChange={onContentChange}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <LoadingButton variant="contained" loading={saving} startIcon={<Save />} onClick={onPost}>
          Post
        </LoadingButton>
        <Button variant="contained" color="error" startIcon={<Close />} onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PostDialog;
