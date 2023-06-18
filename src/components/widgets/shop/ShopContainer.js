import { Grid, Typography } from "@mui/material";

import ShopCard from "@/src/components/widgets/shop/ShopCard";

const ShopContainer = ({ items, limit }) => {
  return (
    <Grid container spacing={2}>
      {items && items.length > 0 ? (
        items.slice(0, limit ? limit : items.length).map((item) => (
          <Grid key={"shop_" + item.id} item xs={12} sm={6} md={4} lg={3}>
            <ShopCard item={item} />
          </Grid>
        ))
      ) : (
        <Grid item xs={12} textAlign="center">
          <Typography variant="h6" textTransform="uppercase" color="white">
            No Shops
          </Typography>
        </Grid>
      )}
    </Grid>
  );
};

export default ShopContainer;
