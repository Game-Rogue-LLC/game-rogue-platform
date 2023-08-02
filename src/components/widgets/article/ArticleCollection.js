import { DEFAULT_CONTENTBLOCK_IMAGE } from '@/src/config/global'
import { Grid } from "@mui/material";
import PostCard from "@/src/components/widgets/article/PostCard";
import { useRouter } from "next/router";

const ArticleCollection = ({ items }) => {
  const router = useRouter();

  const onArticleClick = (item) => {
    router.push("/article/" + item.id);
  };

  return (
    <>
      <Grid container spacing={2} rowSpacing={2} sx={{ mt: 2 }}>
        {items &&
          _.keys(items).map((key) => {
            const item = items[key];
            return (
              <Grid key={key} item xs={12} md={4} lg={3}>
                <PostCard
                  item={{
                    banner: DEFAULT_CONTENTBLOCK_IMAGE,
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
