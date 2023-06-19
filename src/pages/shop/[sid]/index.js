import {
  Add,
  CalendarMonthOutlined,
  LinkOutlined,
  LocationOn,
  PeopleOutline
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { formatDate, isMyMatch } from "@/src/utils/utils";
import { useEffect, useMemo, useState } from "react";

import AddCategoryDialog from "@/src/components/widgets/shop/AddCategoryDialog";
import AddProductDialog from "@/src/components/widgets/shop/AddProductDialog";
import CustomButton from "@/src/components/button/CustomButton";
import EventContainer from "@/src/components/widgets/event/EventContainer";
import ProductCard from "@/src/components/widgets/shop/ProductCard";
import PublicLayout from "@/src/content/PublicLayout";
import SlantBanner from "@/src/components/widgets/SlantBanner";
import StreamContainer from "@/src/components/widgets/rogue-social/profile/StreamContainer";
import _ from "lodash";
import dayjs from "dayjs";
import { markdownToHtml } from "@/src/utils/html-markdown";
import { useAppContext } from "@/src/context/app";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";
import { useStyleContext } from "@/src/context/StyleContext";

const Page = (props) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const theme = useTheme();
  const { setTitle } = useAppContext();
  const { setColors, colors } = useStyleContext();
  const { shop, product, category } = useTournamentContext();
  const [sid, setSID] = useState(router?.query?.sid);
  const [item, setItem] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [isNewCategoryOpen, setIsNewCategoryOpen] = useState(false);
  const [newProduct, setNewProduct] = useState("");
  const [isNewProductOpen, setIsNewProductOpen] = useState(false);

  const onOpenNewCategory = () => {
    setIsNewCategoryOpen(true);
  };
  const onNewCategoryChange = (e) => {
    setNewCategory(e.target.value);
  };
  const onCloseNewCategory = () => {
    setIsNewCategoryOpen(false);
    setNewCategory("");
  };

  const onOpenNewProduct = () => {
    setIsNewProductOpen(true);
  };
  const onNewProductChange = (e) => {
    setNewProduct(e.target.value);
  };
  const onCloseNewProduct = () => {
    setIsNewProductOpen(false);
    setNewProduct("");
  };

  useEffect(() => {
    setTitle("Shop");
  }, []);

  useEffect(() => {
    if (router?.query?.sid) {
      const newSID = router.query.sid;
      if (shop?.shops && shop.shops[newSID]) {
        setSID(newSID);
      } else {
        console.warn("Invalid Shop ID");
        // Redirect to 404 page.
      }
    }
  }, [router, shop?.shops]);

  useEffect(() => {
    if (shop?.shops[sid]) {
      setItem(shop.shops[sid]);
    }
  }, [sid, shop?.shops]);

  const categories = useMemo(() => {
    if (item && item.categories && category.categories) {
      return _.map(item.categories, (key) => category.categories[key]);
    }
    return [];
  }, [item, category.categories]);
  const products = useMemo(() => {
    if (item && item.products && product.products)
      return _.map(item.products, (key) => product.products[key]);
    return [];
  }, [item, product.products]);

  return (
    <Box sx={{ pb: 4 }}>
      <SlantBanner background={item?.banner} />
      <Box
        sx={{
          height: "100px",
          mt: 1,
          display: "flex",
          justifyContent: "space-between",
          paddingInline: "10%",
          alignItems: "end",
          gap: 2
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "end",
            gap: 2
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" color={colors.primary}>
              {item?.name}
            </Typography>
            <Typography variant="h6" color="white">
              {"#" + item?.id}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Container sx={{ position: "relative" }}>
        {shop.shops[sid]?.uid === user.id && (
          <Box textAlign="right" sx={{ position: "absolute", top: -70, right: 30 }}>
            <CustomButton
              sx={{ paddingInline: "16px" }}
              onClick={(e) => router.push("/shop/" + sid + "/edit")}
            >
              Edit Profile
            </CustomButton>
          </Box>
        )}

        <Box sx={{ mt: 4, py: 2 }}>
          <Typography variant="body1" sx={{ fontSize: "16px" }}>
            {item?.description}
          </Typography>
        </Box>

        <Divider />

        <Box sx={{ py: 2 }}>
          <Grid container spacing={2} rowSpacing={2}>
            <Grid item sx={{ width: "250px" }}>
              <Box sx={{ position: "relative", border: "solid 1px rgba(255,255,255,.2)" }}>
                {user?.id === shop.shops[sid]?.uid && (
                  <>
                    <AddCategoryDialog
                      sid={sid}
                      open={isNewCategoryOpen}
                      value={newCategory}
                      onChange={onNewCategoryChange}
                      onClose={onCloseNewCategory}
                    />

                    <Tooltip title="Add Category">
                      <IconButton
                        sx={{ position: "absolute", right: 10, top: 10 }}
                        onClick={onOpenNewCategory}
                      >
                        <Add />
                      </IconButton>
                    </Tooltip>
                  </>
                )}

                <Typography
                  variant="h4"
                  fontSize={24}
                  textAlign="center"
                  padding={2}
                  color={theme.palette.primary.main}
                >
                  Categories
                </Typography>
                <List component="nav" sx={{ padding: 1 }}>
                  {categories && categories.length > 0 ? (
                    categories.map((val) => (
                      <ListItemButton key={val.id} alignItems="flex-start" sx={{ padding: 0 }}>
                        <ListItemText
                          primary={val.name}
                          sx={{ textAlign: "center", color: "white" }}
                        />
                      </ListItemButton>
                    ))
                  ) : (
                    <Typography variant="h6" color="white" textAlign="center">
                      No Categories
                    </Typography>
                  )}
                </List>
              </Box>
            </Grid>
            <Grid item xs>
              <Box sx={{ position: "relative" }}>
                {user?.id === shop.shops[sid]?.uid && (
                  <>
                    <AddProductDialog
                      sid={sid}
                      open={isNewProductOpen}
                      onClose={onCloseNewProduct}
                    />

                    <Button
                      variant="contained"
                      sx={{ position: "absolute", right: 10, top: 10 }}
                      onClick={onOpenNewProduct}
                    >
                      Add New Product
                    </Button>
                  </>
                )}

                <Typography
                  variant="h4"
                  fontSize={24}
                  textAlign="center"
                  padding={2}
                  color={theme.palette.primary.main}
                >
                  Products
                </Typography>

                <Grid container spacing={2} rowSpacing={2}>
                  {products &&
                    products.map((val) => (
                      <Grid item xs={12} md={6} lg={4} key={val.id}>
                        <ProductCard item={val} />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <PublicLayout>{page}</PublicLayout>
    </TournamentProvider>
  );
};

export default Page;
