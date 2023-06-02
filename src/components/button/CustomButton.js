import { useStyleContext } from "@/src/context/StyleContext";
import { Button } from "@mui/material";

const CustomButton = ({ sx, ...props }) => {
  const { buttonStyle } = useStyleContext();
  return (
    <Button {...props} sx={{ minWidth: "auto", ...buttonStyle, ...sx }}>
      {props.children}
    </Button>
  );
};

export default CustomButton;
