import ShopLayout from "@/src/content/ShopLayout";
import dynamic from "next/dynamic";
import { Overlay } from "@/src/components/widgets/shop/Overlay";
import { Box, IconButton } from "@mui/material";
import Splash from "@/src/content/Splash";
import Head from "next/head";
import ApparelSplash from "@/src/content/Splash/ApparelSplash";

const Page = (props) => {
  const AppDynamic = dynamic(() => import("@/src/components/widgets/shop/Canvas.js"), {
    ssr: false
  });

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <AppDynamic sx={{ position: "relative", flex: 1, minHeight: "650px" }} />
        {/* <ShopRightSidebar /> */}
        <Overlay sx={{ flexBasis: "320px" }} />
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => {
  return (
    <>
      <ApparelSplash content={"Customize Apparel Loading..."} />
      <ShopLayout>{page}</ShopLayout>
    </>
  );
};

export default Page;
