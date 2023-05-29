import { Box, Typography } from "@mui/material";
import PostItem from "@/src/components/widgets/rogue-social/PostItem";
import { useTournamentContext } from "@/src/context/TournamentContext";

const PostList = ({}) => {
  const { post } = useTournamentContext();

  if (Object.keys(post?.posts).length === 0)
    return (
      <Box sx={{ py: 1 }}>
        <Typography variant="h6" align="center">
          NO POSTS
        </Typography>
      </Box>
    );

  return (
    <Box>
      {Object.keys(post?.posts).map((key) => {
        const item = post.posts[key];
        return <PostItem item={item} />;
      })}
    </Box>
  );
};

export default PostList;
