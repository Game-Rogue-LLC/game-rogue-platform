import { useStyleContext } from "@/src/context/StyleContext";
import { Button } from "@mui/material";

const CustomButton = ({ sx, ...props }) => {
  const { buttonStyle } = useStyleContext();
  return (
    <Button {...props} sx={{ ...buttonStyle, ...sx }}>
      {props.children}
    </Button>
  );
};

export default CustomButton;
