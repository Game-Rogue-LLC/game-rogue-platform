import { useTournamentContext } from "@/src/context/TournamentContext";
import { Autorenew, BarChart, Favorite, MoreVert, Sms } from "@mui/icons-material";
import { Avatar, Box, Grid, IconButton, Typography } from "@mui/material";
import { markdownToHtml } from "@/src/utils/html-markdown";
import Link from "next/link";

const PostItem = ({ item }) => {
  const { player, post } = useTournamentContext();

  return (
    <Box
      sx={{
        marginInline: "auto",
        width: "100%",
        borderBottom: "solid 1px rgb(255,255,255,0.2)",
        padding: 1,
        ":hover": {
          backgroundColor: "rgba(255,255,255,0.2)"
        }
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs="60px">
          <Avatar src={player?.players[item.uid].profilePic} sx={{ width: 50, height: 50 }} />
        </Grid>
        <Grid item xs>
          <Box>
            <Typography variant="h5" color="white">
              {item.title}
            </Typography>
            <Typography style={{ color: "grey" }}>{player?.players[item.uid]?.name}</Typography>
          </Box>
          <div
            className="html-wrapper"
            style={{
              color: "white"
            }}
            dangerouslySetInnerHTML={{
              __html: markdownToHtml(item?.text)
            }}
          ></div>
          <Box sx={{ marginTop: 2, display: "flex", gap: 4, color: "white" }}>
            <Link href="#" onClick={(e) => {}}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Sms />
                {item?.reply}
              </Box>
            </Link>
            <Link
              href="#"
              onClick={(e) => {
                post.update(item.id, { reply: item.reply + 1 });
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Autorenew />
                {item?.reply}
              </Box>
            </Link>
            <Link
              href="#"
              onClick={(e) => {
                post.update(item.id, { vote: item.vote + 1 });
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Favorite />
                {item?.vote}
              </Box>
            </Link>
            <Link
              href="#"
              onClick={(e) => {
                post.update(item.id, { view: item.view + 1 });
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <BarChart />
                {item?.view}
              </Box>
            </Link>
          </Box>
        </Grid>
        <Grid item xs="auto">
          <IconButton>
            <MoreVert />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PostItem;
