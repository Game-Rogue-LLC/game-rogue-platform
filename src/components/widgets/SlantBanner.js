import { useStyleContext } from "@/src/context/StyleContext";
import { Box } from "@mui/material";

export default function SlantBanner({ background }) {
  const { colors } = useStyleContext();

  return (
    <Box
      sx={{
        filter: `drop-shadow(0 6px 0 ${colors.primary})`,
      }}
    >
      <Box
        sx={{
          background: "url(" + background + ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          height: "300px",
          clipPath: "polygon(0 0px, 100% 0px, 100% 100%, 0 83%)",
        }}
      ></Box>
    </Box>
  );
}
