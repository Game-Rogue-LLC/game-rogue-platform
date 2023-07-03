import { Box, Divider, IconButton, Paper, Tooltip, Typography, useTheme } from "@mui/material";
import { Delete, Edit, Save } from "@mui/icons-material";

import { useRouter } from "next/router";

const ArticlePreview = ({ item }) => {
  const theme = useTheme();
  const router = useRouter();

  const onPublishClick = () => {};
  const onEditClick = () => {
    router.push("/article/" + item?.id + "/edit");
  };
  const onCloseClick = () => {};

  return (
    <Paper sx={{ p: 4, bgcolor: theme.palette.card.main }}>
      <Box sx={{ pb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography variant="h4" fontSize={24}>
          {item?.title}
        </Typography>
        <Box>
          <Tooltip title="Publish">
            <IconButton onClick={onPublishClick}>
              <Save />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton onClick={onEditClick}>
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={onCloseClick}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Divider />

      <Box sx={{ pt: 1 }}>
        <div
          dangerouslySetInnerHTML={{
            __html: item?.text
          }}
        ></div>
      </Box>
    </Paper>
  );
};

export default ArticlePreview;
