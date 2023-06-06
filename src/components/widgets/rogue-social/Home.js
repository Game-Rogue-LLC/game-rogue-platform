import { Box, Button, Tab, Typography, styled, useTheme } from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { createPost, readPost } from "@/src/redux/features/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import PostList from "@/src/components/widgets/rogue-social/PostList";
import RichTextInput from "@/src/components/input/RichTextInput";
import { htmlToMarkdown } from "@/src/utils/html-markdown";
import { useAuthContext } from "@/src/context/AuthContext";
import { useTournamentContext } from "@/src/context/TournamentContext";

const StyledTabList = styled(TabList)(({ theme }) => ({
  ".MuiTabs-flexContainer": {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  ".MuiTab-root": {
    flexGrow: 1
  }
}));

const Home = () => {
  const { user } = useAuthContext();
  const theme = useTheme();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const { post: postController } = useTournamentContext();
  const [tab, setTab] = useState("1");

  const onTabChange = (e, newTab) => {
    setTab(newTab);
  };

  const onContentChange = (newContent) => {
    setContent(newContent);
  };

  const onPost = async (e) => {
    setSaving(true);
    await postController.create({
      uid: user.id,
      // title: user.userName,
      text: htmlToMarkdown(content),
      reply: 0,
      reshare: 0,
      vote: 0,
      view: 0,
      replies: [],

      createdAt: new Date(),
      deleted: false
    });
    // dispatch(
    //   createPost({
    //     uid: user.id,
    //     text: htmlToMarkdown(content),
    //     reply: 0,
    //     reshare: 0,
    //     vote: 0,
    //     view: 0,
    //     replies: [],
    //     createdAt: new Date(),
    //     deleted: false
    //   })
    // );
    setSaving(false);
  };

  useEffect(() => {
    dispatch(readPost());
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" color="white">
          Home
        </Typography>
      </Box>
      <TabContext value={tab}>
        <StyledTabList
          onChange={onTabChange}
          aria-label="Tab List"
          className="rogue-social-home-tabs"
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Tab label="Recommended" value="1" />
          <Tab label="Following" value="2" />
        </StyledTabList>
        <Box
          sx={{
            position: "relative",
            px: 0,
            py: 2
          }}
        >
          <div className="tweet-container">
            <RichTextInput
              content={content}
              className="tweet-textedit"
              placeholder="What's happening?"
              handleContentChange={onContentChange}
            />
            <Box
              sx={{
                position: "absolute",
                right: "16px",
                bottom: "12px"
              }}
            >
              <LoadingButton
                loading={saving}
                variant="contained"
                sx={{ borderRadius: 20, height: 40 }}
                onClick={onPost}
              >
                Tweet
              </LoadingButton>
            </Box>
          </div>
          {/* <TextField
            variant="outlined"
            placeholder="What's happening?"
            multiline={true}
            rows={5}
            sx={{
              width: "100%",
              ".MuiOutlinedInput-notchedOutline": {
                border: "none"
              }
            }}
            InputProps={{
              sx: {
                resize: "block",
                alignItems: "baseline",
                width: "100%"
              }
            }}
          /> */}
        </Box>
        <TabPanel value="1" sx={{ p: 0 }}>
          <PostList />
        </TabPanel>
        <TabPanel value="2"></TabPanel>
      </TabContext>
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
