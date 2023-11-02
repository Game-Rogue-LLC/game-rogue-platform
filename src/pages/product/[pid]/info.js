import { Box, Button, Container, Grid, Rating, Typography, useTheme } from "@mui/material";
import { ShoppingBag, ShoppingCart } from "@mui/icons-material";
import TournamentProvider, { useTournamentContext } from "@/src/context/TournamentContext";
import { useEffect, useState } from "react";

import Link from "next/link";
import ShopLayout from "@/src/content/ShopLayout";
import { formatNumber } from "@/src/utils/utils";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/router";

const Page = ({}) => {
  const router = useRouter();
  const theme = useTheme();
  const { user } = useAuthContext();
  const { shop, product } = useTournamentContext();
  const [pid, setPID] = useState(router.query?.pid);
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (router.query?.pid) {
      setPID(router.query.pid);
    }
  }, [router]);

  useEffect(() => {
    if (product.products && product.products[pid]) {
      setItem(product.products[pid]);
    }
  }, [pid, product.products]);

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 5, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Box component="img" src={item?.banner} width={500} height={500}></Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="h4" fontSize={24}>
            {item?.name}
          </Typography>
          <Typography variant="body1" color="gray" sx={{ display: "flex", alignItems: "center" }}>
            <Rating name="read-only" value={4.4} precision={0.2} readOnly />
            {"(4.2)"}&nbsp;
            <Link href="/" style={{ color: "white", ":hover": { color: "gray" } }}>
              {" 7 reviews"}
            </Link>
          </Typography>
          <Typography
            variant="body1"
            fontSize={28}
            color={theme.palette.primary.main}
            fontWeight="bold"
          >
            {"$" + formatNumber(item?.price, 2)}
          </Typography>
          <Typography variant="body1" fontSize={20} color="white">
            {item?.amount + " Remaining"}
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="contained" startIcon={<ShoppingBag />}>
              Purchase
            </Button>
            <Button variant="contained" startIcon={<ShoppingCart />}>
              Add to cart
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

Page.getLayout = (page) => {
  return (
    <TournamentProvider>
      <ShopLayout>{page}</ShopLayout>
    </TournamentProvider>
  );
};

export default Page;
