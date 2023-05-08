import { useState } from "react";
import { Edit } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputLabel,
  OutlinedInput,
  Paper,
  Typography
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { DEFAULT_CONTENTBLOCK_IMAGE } from "@/src/config/global";
import { useEffect } from "react";
import RichTextInput from "@/src/components/input/RichTextInput";

const ContentBlock = (props) => {
  const { contentBlock, handleChange, handleUpload, save, saving } = props;

  const handleInputs = (e) => {
    let { name, type, value } = e.target;
    const content = {
      ...contentBlock,
      [name]: value
    }
    handleChange(content);
  }
  const handleContentBlockTextChange = (newEditorState) => {
    if (contentBlock.text != newEditorState) {
      handleChange({
        ...contentBlock,
        text: newEditorState
      })
    }
  }

  return (
    <Paper sx={{ p: 4, mt: 4 }}>
      <Typography variant='h6'>Content Block</Typography>
      <Box sx={{ textAlign: 'center', position: 'relative' }}>
        <IconButton sx={{ position: 'absolute', right: 0, bottom: 0 }} color='primary' component='label'>
          <Edit />
          <input type="file" accept="image/*" name="upload-image" id="upload-image" hidden onChange={(e) => handleUpload(e, 'image')} />
        </IconButton>
        <img src={contentBlock?.image || DEFAULT_CONTENTBLOCK_IMAGE} style={{ height: '200px', maxWidth: '600px', objectFit: 'contain' }} />
      </Box>
      <Box>
        <InputLabel htmlFor="content-url" sx={{ mt: 2 }}>URL</InputLabel>
        <OutlinedInput id="content-url" name="url" value={contentBlock?.url || ''} onChange={handleInputs} aria-describedby="content-url-helper" sx={{ mt: 1 }} fullWidth />
      </Box>
      <Box>
        <InputLabel htmlFor="content-title" sx={{ mt: 2 }}>Title</InputLabel>
        <OutlinedInput id="content-title" name="title" value={contentBlock?.title || ''} onChange={handleInputs} aria-describedby="content-title-helper" sx={{ mt: 1 }} fullWidth />
      </Box>
      <Box>
        <InputLabel htmlFor="content-text" sx={{ mt: 2 }}>Text</InputLabel>
        {/* <OutlinedInput id="content-text" name="text" value={contentBlock?.text || ''} onChange={handleInputs} aria-describedby="content-text-helper" sx={{ mt: 1 }} inputProps={{ maxLength: 50 }} fullWidth /> */}
        <RichTextInput content={contentBlock?.text} handleContentChange={handleContentBlockTextChange} />
      </Box>
      <LoadingButton
        loading={saving}
        variant="contained"
        sx={{ mt: 2 }}
        onClick={save}
      >
        Save
      </LoadingButton>
    </Paper>
  )
}

export default ContentBlock;