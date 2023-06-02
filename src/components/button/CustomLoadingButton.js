import { useStyleContext } from "@/src/context/StyleContext";
import { LoadingButton } from "@mui/lab";

const CustomLoadingButton = ({ sx, loading, ...props }) => {
  const { buttonStyle } = useStyleContext();
  return (
    <LoadingButton {...props} loading={loading} sx={{ ...buttonStyle, ...sx }}>
      {props.children}
    </LoadingButton>
  );
};

export default CustomLoadingButton;
