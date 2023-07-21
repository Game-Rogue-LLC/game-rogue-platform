import ArticleShowDialog from "@/src/components/widgets/article/ArticleShowDialog";
import { Grid } from "@mui/material";
import PostCard from "@/src/components/widgets/article/PostCard";
import { useRouter } from "next/router";
import { useState } from "react";

const ArticleCollection = ({ items }) => {
  const router = useRouter();
  const [openArticle, setOpenArticle] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState();

  const onArticleClick = (item) => {
    setOpenArticle(true);
    setSelectedArticle(item);
  };
  const onCloseArticleDialog = (item) => {
    setOpenArticle(false);
  };
  const onEditArticle = (item) => {
    setOpenArticle(false);
    router.push("/article/" + item.id);
  };

  return (
    <>
      <ArticleShowDialog
        open={openArticle}
        item={selectedArticle}
        onClose={onCloseArticleDialog}
        onEdit={onEditArticle}
      />
      <Grid container spacing={2} rowSpacing={2} sx={{ mt: 2 }}>
        {items &&
          _.keys(items).map((key) => {
            const item = items[key];
            return (
              <Grid key={key} item xs={12} md={4} lg={3}>
                <PostCard
                  item={{
                    banner: "/static/images/post_back/2.webp",
                    ...item
                  }}
                  sx={{
                    ":hover": {
                      backgroundColor: "rgba(245,131,31,.15)",
                      cursor: "pointer"
                    }
                  }}
                  onClick={onArticleClick}
                />
              </Grid>
            );
          })}
      </Grid>
    </>
  );
};

export default ArticleCollection;
