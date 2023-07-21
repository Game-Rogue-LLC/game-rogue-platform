import { Autocomplete, Box, TextField, styled } from "@mui/material";

import { Search } from "@mui/icons-material";

const SearchContainer = styled(Box)(({ theme }) => ({
  overflow: "visible",
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

const SearchAutoComplete = styled(Autocomplete)(({ theme }) => ({
  ".MuiOutlinedInput-notchedOutline": {
    border: "none"
  },
  ".MuiInputBase-root": {
    paddingBlock: 0
  },
  ".MuiAutocomplete-endAdornment": {
    display: "none"
  }
}));

const SearchBox = ({ id, name, onChange, onKeyUp, placeholder, sx, options, value }) => {
  return (
    <SearchContainer
      sx={{
        position: "relative",
        border: "solid 1px rgba(255,255,255,.2)",
        borderRadius: 1,
        display: "flex",
        alignItems: "center",
        gap: 0,
        px: 1
      }}
    >
      <Search />
      <SearchAutoComplete
        freeSolo
        id="combo-box-demo"
        onChange={onChange}
        onKeyUp={onKeyUp}
        placeholder={placeholder}
        sx={{ width: 300, ...sx }}
        ListboxProps={{
          sx: {
            mt: 2
          }
        }}
        options={options}
        renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
      />
    </SearchContainer>
  );
};

export default SearchBox;
