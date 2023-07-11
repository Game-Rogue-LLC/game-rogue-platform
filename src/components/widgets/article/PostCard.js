import { Box, Paper, Typography, useTheme } from "@mui/material";
import { Sms, VisibilityOutlined } from "@mui/icons-material";

import Avatar from "@/src/components/Avatar";
import { useTournamentContext } from "@/src/context/TournamentContext";

const PostCard = ({ item, sx, onClick }) => {
  const theme = useTheme();
  const { player } = useTournamentContext();
  return (
    <Paper
      sx={{
        position: "relative",
        overflow: "hidden",
        border: "solid 1px rgba(255,255,255,.2)",
        ...sx
      }}
      onClick={() => onClick(item)}
    >
      <Box
        component="img"
        src={item?.banner}
        height={120}
        width="100%"
        sx={{ objectFit: "cover" }}
      ></Box>
      <Box sx={{ p: 2, position: "relative" }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Avatar
            editable={false}
            src={player.players[item?.uid]?.profilePic}
            sx={{ width: 30, height: 30 }}
            hideStatus={true}
          />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">{player.players[item?.uid]?.name}</Typography>
          </Box>
          <Box></Box>
        </Box>

        <Box
          sx={{
            mt: 2,
            minHeight: "150px",
            maxHeight: "300px",
            overflow: "hidden",
            textOrientation: "mixed",
            textOverflow: "ellipsis"
          }}
        >
          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
            {item?.title}
          </Typography>
          <div
            style={{ marginTop: 1 }}
            dangerouslySetInnerHTML={{
              __html: item?.text
            }}
          ></div>
        </Box>

        <Box
          sx={{
            borderTop: "gray",
            paddingBlock: 1,
            display: "flex",
            alignItems: "center",
            gap: 2
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <VisibilityOutlined />
            {item?.view || "0"}
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Sms />
            {item?.reply || "0"}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default PostCard;
