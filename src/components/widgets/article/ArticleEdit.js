import {
  Box,
  Button,
  Grid,
  IconButton,
  OutlinedInput,
  Paper,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useState } from "react";

import { LoadingButton } from "@mui/lab";
import dynamic from "next/dynamic";
import { enqueueSnackbar } from "notistack";
import { model } from "@/lib/firestore/collections/articles";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false
});

const ArticleEdit = ({ item }) => {
  const theme = useTheme();
  const router = useRouter();
  const { article } = useTournamentContext();
  const [input, setInput] = useState({ ...model });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (item) setInput({ ...item });
  }, [item]);

  const onArticleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSave = async (e) => {
    setSaving(true);
    const res = await article.update(item?.id, {
      ...input,
      published: true,
      modifiedAt: new Date()
    });
    if (res.code === "succeed") {
      enqueueSnackbar("Saved Successfully!", { variant: "success" });
    } else {
      console.warn(res.message);
    }
    setSaving(false);
  };

  const onCancel = (e) => {
    router.back();
  };

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6">Title</Typography>
          <OutlinedInput name="title" value={input?.title} onChange={onArticleChange} fullWidth />
        </Grid>
        <Grid item xs={12}>
          <SunEditor
            setOptions={{
              resizingBar: false,
              buttonList: [
                ["undo", "redo"],
                [
                  "formatBlock",
                  "font",
                  "fontSize",
                  "bold",
                  "underline",
                  "italic",
                  "strike",
                  "superscript",
                  "subscript",
                  "removeFormat"
                ],
                [
                  "blockquote",
                  "showBlocks",
                  "fontColor",
                  "hiliteColor",
                  "outdent",
                  "indent",
                  "align",
                  "list",
                  "horizontalRule",
                  "table",
                  "link",
                  "image",
                  "video"
                ],
                ["preview"]
              ]
            }}
            defaultValue={input?.text}
            onChange={(content) => {
              console.log(content);
              setInput((prev) => ({
                ...prev,
                text: content
              }));
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", gap: 2, flexDirection: "row-reverse" }}>
            <Button variant="contained" onClick={onCancel}>
              Cancel
            </Button>
            <LoadingButton loading={saving} variant="contained" onClick={onSave}>
              Save
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ArticleEdit;
/*
['undo', 'redo', 'font', 'fontSize', 'formatBlock'],
['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript', 'removeFormat'],
'/' // Line break
['fontColor', 'hiliteColor', 'outdent', 'indent', 'align', 'horizontalRule', 'list', 'table'],
['link', 'image', 'video', 'fullScreen', 'showBlocks', 'codeView', 'preview', 'print', 'save']
*/
