import { OutlinedInput, styled } from "@mui/material";

const SearchInput = styled(OutlinedInput)(({ theme }) => ({
  ".MuiSvgIcon-root": {
    transform: "rotateY(0deg) tranlate(0,0)",
    transition: "all 0.5s linear"
  },
  "& :hover": {
    ".MuiSvgIcon-root": {
      transform: "rotateY(180deg)"
    }
  },
  "& :focus": {
    ".MuiSvgIcon-root": {
      transform: "translate(-100px, 0px)"
    }
  }
}));

export default SearchInput;
