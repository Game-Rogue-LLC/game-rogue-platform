import * as config from "@/src/config/global";

import {
  Box,
  Button,
  ButtonBase,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  OutlinedInput,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import { useEffect, useRef, useState } from "react";

import AddCollabDialog from "./AddCollabDialog";
import AddCollabTool from "./AddCollabTool";
import CategoryTool from "@/src/components/widgets/article/CategoryTool";
import ContentsBlockTool from "@/src/components/widgets/article/ContentsBlockTool";
import { Edit } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import TemplateTool from "@/src/components/widgets/article/TemplateTool";
import dynamic from "next/dynamic";
import { enqueueSnackbar } from "notistack";
import { model } from "@/lib/firestore/collections/articles";
import { useRouter } from "next/router";
import { useTournamentContext } from "@/src/context/TournamentContext";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false
});

const zoomPlugin = {
  // @Required @Unique
  // plugin name
  name: "zoom",
  // @Required
  // data display
  display: "Zoom",

  // @Options
  title: "Zoom",
  buttonClass: "",
  innerHTML: "<p>Auto</p>",

  // @Required
  // add function - It is called only once when the plugin is first run.
  // This function generates HTML to append and register the event.
  // arguments - (core : core object, targetElement : clicked button element)
  add: function (core, targetElement) {
    const context = core.context;

    context.zoom = {
      targetButton: targetElement,
      scale: 1
    };

    targetElement.addEventListener("click", this.onClick.bind(core));
  },

  active: function (element) {
    if (!element) {
      this.util.removeClass(this.context.zoom.targetButton, "active");
    } else if (/^mark$/i.test(element.nodeName) && element.style.backgroundColor.length > 0) {
      this.util.addClass(this.context.zoom.targetButton, "active");
      return true;
    }

    return false;
  },
  onClick: function () {
    this.context.zoom.scale = 1;
    this.util.setStyle(
      this.context.element.wysiwyg,
      "transform",
      "scale(" + this.context.zoom.scale + ")"
    );
  }
};

const zoomInPlugin = {
  // @Required @Unique
  // plugin name
  name: "zoomin",
  // @Required
  // data display
  display: "Zoom In",

  // @Options
  title: "Zoom In",
  buttonClass: "",
  innerHTML: "<i class='fa-solid fa-magnifying-glass-plus'></i>",

  // @Required
  // add function - It is called only once when the plugin is first run.
  // This function generates HTML to append and register the event.
  // arguments - (core : core object, targetElement : clicked button element)
  add: function (core, targetElement) {
    const context = core.context;

    context.zoomin = {
      targetButton: targetElement
    };

    targetElement.addEventListener("click", this.onClick.bind(core));
  },

  active: function (element) {
    if (!element) {
      this.util.removeClass(this.context.zoomin.targetButton, "active");
    } else if (/^mark$/i.test(element.nodeName) && element.style.backgroundColor.length > 0) {
      this.util.addClass(this.context.zoomin.targetButton, "active");
      return true;
    }

    return false;
  },
  onClick: function () {
    this.context.zoom.scale += 0.1;
    this.util.setStyle(
      this.context.element.wysiwyg,
      "transform",
      "scale(" + this.context.zoom.scale + ")"
    );
  }
};

const zoomOutPlugin = {
  // @Required @Unique
  // plugin name
  name: "zoomout",
  // @Required
  // data display
  display: "Zoom Out",

  // @Options
  title: "Zoom Out",
  buttonClass: "",
  innerHTML: "<i class='fa-solid fa-magnifying-glass-minus'></i>",

  // @Required
  // add function - It is called only once when the plugin is first run.
  // This function generates HTML to append and register the event.
  // arguments - (core : core object, targetElement : clicked button element)
  add: function (core, targetElement) {
    const context = core.context;

    context.zoomout = {
      targetButton: targetElement
    };

    targetElement.addEventListener("click", this.onClick.bind(core));
  },

  active: function (element) {
    if (!element) {
      this.util.removeClass(this.context.zoomout.targetButton, "active");
    } else if (/^mark$/i.test(element.nodeName) && element.style.backgroundColor.length > 0) {
      this.util.addClass(this.context.zoomout.targetButton, "active");
      return true;
    }

    return false;
  },
  onClick: function () {
    this.context.zoom.scale -= 0.1;
    this.util.setStyle(
      this.context.element.wysiwyg,
      "transform",
      "scale(" + this.context.zoom.scale + ")"
    );
  }
};

const ArticleEdit = ({ item }) => {
  const theme = useTheme();
  const router = useRouter();
  const { article } = useTournamentContext();
  const editorRef = useRef();
  const [input, setInput] = useState({ ...model });
  const [saving, setSaving] = useState(false); // True if Article is being saved
  const [open, setOpen] = useState(false); // True if SideToolbar is Opened
  const [selected, setSelected] = useState(0); // Selected Toolbar Item
  const [openAddCollabDialog, setOpenAddCollabDialog] = useState(false);
  const [banner, setBanner] = useState(null);

  const onUploadBanner = (e, name) => {
    const file = e.target?.files[0];
    const url = URL.createObjectURL(file);
    switch (name) {
      case "banner":
        setBanner(file);
        setInput({
          ...input,
          banner: url
        });
        break;
    }
  };

  const getSunEditorInstance = (sunEditor) => {
    editorRef.current = sunEditor;
  };

  useEffect(() => {
    if (item) setInput({ ...item });
  }, [item]);

  const insertArticle = (text) => {
    editorRef.current.insertHTML(text);
  };

  const onArticleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const onSave = async (e) => {
    let uploaded = true;
    setSaving(true);
    let newArticle = { ...input };

    if (banner) {
      uploaded = false;
      const res = await article.upload(banner, item?.id, "banner");
      if (res.code === "succeed") {
        newArticle.banner = res.url;
        uploaded = true;
      }
    }

    const res = await article.update(item?.id, {
      ...newArticle,
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

  const onOpenAddCollabDialog = () => {
    setOpenAddCollabDialog(true);
  };
  const onCloseAddCollabDialog = () => {
    setOpenAddCollabDialog(false);
  };

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Grid container spacing={2} rowSpacing={2}>
        {/* Begin Side Toolbar */}
        <Grid item sx={{ width: "100px", zIndex: 4000 }}>
          {open && (
            <Box
              sx={{ position: "fixed", zIndex: 3000, width: "100vw", height: "100vh" }}
              onClick={() => setOpen(false)}
            ></Box>
          )}

          <Box
            sx={{
              position: "relative",
              zIndex: 4000,
              backgroundColor: "linear-gradient(to top, #4a2807 -20%, #221204 80%)",
              border: "solid 1px rgba(255,255,255,.2)",
              borderRadius: 1,
              height: "100%",
              p: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1
            }}
          >
            {/* Begin Toolbar Items */}
            <TemplateTool
              onClick={() => {
                setOpen(!open || selected !== 0);
                setSelected(0);
              }}
            />
            <CategoryTool
              onClick={() => {
                setOpen(!open || selected !== 1);
                setSelected(1);
              }}
            />
            <ContentsBlockTool
              onClick={() => {
                setOpen(!open || selected !== 2);
                setSelected(2);
              }}
            />
            <AddCollabTool
              onClick={() => {
                onOpenAddCollabDialog();
              }}
            />
            {/* End Toolbar Items */}

            {/* Begin Toolbar Panel */}
            <Box
              sx={{
                position: "absolute",
                left: "90px",
                top: -1,
                zIndex: 4000,
                border: "solid 1px rgba(255,255,255,.2)",
                borderRadius: 1,
                background: "rgba(0,0,0,.8)",
                width: "250px",
                height: "calc(100% + 2px)",
                backdropFilter: "blur(20px)",
                display: open ? "block" : "none",
                padding: 2,
                overflow: "auto",
                transition: "all .5s ease-in-out"
              }}
            >
              {/* Begin Template Toolbar Panel */}
              {selected === 0 && (
                <Box>
                  <RadioGroup
                    aria-labelledby="template-label"
                    defaultValue={0}
                    value={input?.category}
                    onChange={(_, val) =>
                      onArticleChange({ target: { name: "category", value: val } })
                    }
                    name="template-group"
                  >
                    <FormControlLabel value={0} control={<Radio />} label="Player Article" />
                    <FormControlLabel value={1} control={<Radio />} label="Team Article" />
                    <FormControlLabel value={2} control={<Radio />} label="Organization Article" />
                    <FormControlLabel value={3} control={<Radio />} label="Organizer Article" />
                    <FormControlLabel value={4} control={<Radio />} label="Event Article" />
                  </RadioGroup>
                </Box>
              )}
              {/* End Template Toolbar Panel */}
              {/* Begin Category Toolbar Panel */}
              {selected === 1 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <FormControl>
                    <FormLabel id="category-region-label">Region</FormLabel>
                    <RadioGroup
                      aria-labelledby="category-region-label"
                      defaultValue={0}
                      value={input?.region}
                      onChange={(_, val) =>
                        onArticleChange({ target: { name: "region", value: val } })
                      }
                      name="category-region-group"
                    >
                      <FormControlLabel value={0} control={<Radio />} label="North America" />
                      <FormControlLabel value={1} control={<Radio />} label="Latin America" />
                      <FormControlLabel value={2} control={<Radio />} label="Europe" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="category-platform-label">Platform</FormLabel>
                    <RadioGroup
                      aria-labelledby="category-platform-label"
                      defaultValue={0}
                      value={input?.platform}
                      onChange={(_, val) =>
                        onArticleChange({ target: { name: "platform", value: val } })
                      }
                      name="category-platform-group"
                    >
                      <FormControlLabel value={0} control={<Radio />} label="PC" />
                      <FormControlLabel value={1} control={<Radio />} label="Console" />
                    </RadioGroup>
                  </FormControl>
                  <FormControl>
                    <FormLabel id="category-game-label">Game</FormLabel>
                    <RadioGroup
                      aria-labelledby="category-game-label"
                      defaultValue={0}
                      value={input?.game}
                      onChange={(_, val) =>
                        onArticleChange({ target: { name: "game", value: val } })
                      }
                      name="category-game-group"
                    >
                      <FormControlLabel value={0} control={<Radio />} label="Rainbow Six Siege" />
                    </RadioGroup>
                  </FormControl>
                </Box>
              )}
              {/* End Category Toolbar Panel */}

              {/* Begin Contents Block Panel */}
              {selected === 2 && (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <ButtonBase
                    sx={{
                      border: "solid 1px rgba(255,255,255,.2)",
                      borderRadius: 1,
                      width: "100%",
                      p: 2
                    }}
                    onClick={(_) => {
                      insertArticle("<h1>Article Title</h1>");
                    }}
                  >
                    Article Title
                  </ButtonBase>
                  <ButtonBase
                    sx={{
                      border: "solid 1px rgba(255,255,255,.2)",
                      borderRadius: 1,
                      width: "100%",
                      p: 2
                    }}
                    onClick={(_) => {
                      insertArticle("<p>Description</p>");
                    }}
                  >
                    Description
                  </ButtonBase>
                </Box>
              )}
              {/* End Contents Block Panel */}

              {/* Begin Add Collab Modal */}
              <AddCollabDialog
                open={openAddCollabDialog}
                onClose={onCloseAddCollabDialog}
                aid={item?.id}
              />
              {/* End Add Collab Modal */}
            </Box>
            {/* End Toolbar Panel */}
          </Box>
        </Grid>
        {/* End Side Toolbar */}

        {/* Begin Article Input */}
        <Grid item xs container spacing={2} rowSpacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Article Graphic</Typography>
            <Box sx={{ textAlign: "center", position: "relative", mt: 3 }}>
              <IconButton sx={{ position: "absolute", right: 0, bottom: 0 }} component="label">
                <Edit />
                <input
                  type="file"
                  accept="image/*"
                  name="upload-banner"
                  id="upload-banner"
                  hidden
                  onChange={(e) => onUploadBanner(e, "banner")}
                />
              </IconButton>
              <img
                src={input?.banner || config.DEFAULT_CONTENTBLOCK_IMAGE}
                style={{
                  height: "200px",
                  maxWidth: "600px",
                  objectFit: "cover",
                  border: "solid 1px rgba(255, 255, 255, 0.2)",
                  borderRadius: "4px"
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <OutlinedInput name="title" value={input?.title} onChange={onArticleChange} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <SunEditor
              setOptions={{
                plugins: [zoomInPlugin, zoomOutPlugin, zoomPlugin],
                resizingBar: false,
                buttonList: [
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
                  "/",
                  ["undo", "redo"],
                  ["zoomin", "zoom", "zoomout"],
                  ["preview"]
                ]
              }}
              defaultValue={input?.text}
              onChange={(content) => {
                setInput((prev) => ({
                  ...prev,
                  text: content
                }));
              }}
              getSunEditorInstance={getSunEditorInstance}
            />
          </Grid>
        </Grid>
        {/* End Article Input */}

        {/* Begin Article Actions */}
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
        {/* End Article Actions */}
      </Grid>
    </Paper>
  );
};

export default ArticleEdit;
