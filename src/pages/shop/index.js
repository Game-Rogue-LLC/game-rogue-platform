import ShopLayout from "@/src/content/ShopLayout";
import dynamic from "next/dynamic";
import { Overlay } from "@/src/components/widgets/shop/Overlay";
import { Box, IconButton } from "@mui/material";

const Page = (props) => {
  const AppDynamic = dynamic(() => import("@/src/components/widgets/shop/Canvas.js"), {
    ssr: false
  });

  return (
    <Box sx={{ height: "100%" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <AppDynamic sx={{ position: "relative", flex: 1 }} />
        {/* <ShopRightSidebar /> */}
        <Overlay sx={{ flexBasis: "300px" }} />
      </Box>
    </Box>
  );
};

Page.getLayout = (page) => {
  return <ShopLayout>{page}</ShopLayout>;
};

export default Page;
