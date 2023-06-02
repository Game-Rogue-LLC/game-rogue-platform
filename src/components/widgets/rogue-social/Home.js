import { Box, Tab, Typography, styled, useTheme } from "@mui/material";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";

import PostList from "@/src/components/widgets/rogue-social/PostList";
import RichTextInput from "@/src/components/input/RichTextInput";
import { htmlToMarkdown } from "@/src/utils/html-markdown";
import { useAuthContext } from "@/src/context/AuthContext";
import { useState } from "react";
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
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const { post } = useTournamentContext();
  const [tab, setTab] = useState("1");

  const onTabChange = (e, newTab) => {
    setTab(newTab);
  };

  const onContentChange = (newContent) => {
    setContent(newContent);
  };

  const onPost = async (e) => {
    setSaving(true);
    await post.create({
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
    setSaving(false);
  };

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
            borderBlock: "solid 1px rgba(255,255,255,.2)",
            px: 0,
            pb: 2
          }}
        >
          <RichTextInput
            content={content}
            className="tweet-textedit"
            placeholder="What's happening?"
            handleContentChange={onContentChange}
          />
          {(!content || !htmlToMarkdown(content)) && (
            <Typography variant="body1" className="tweet-placeholder">
              What's happening?
            </Typography>
          )}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2
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
