import { useStyleContext } from "@/src/context/StyleContext";
import { Button } from "@mui/material";

const StyledButton = (props) => {
  const { buttonStyle } = useStyleContext();
  return (
    <Button {...props} sx={{ ...buttonStyle, ...props?.sx }}>
      {props.children}
    </Button>
  );
};

export default StyledButton;
