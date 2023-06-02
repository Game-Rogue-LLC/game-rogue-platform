import {
  Select,
  MenuItem
} from "@mui/material"

const SelectInput = ({ name, options, value, onChange, disabled, sx }) => {
  return (
    <Select
      labelId={`${name}-select-label`}
      id={`${name}-select`}
      value={value}
      name={name}
      onChange={onChange}
      variant="outlined"
      disabled={disabled}
      sx={sx}
      fullWidth
    >
      {
        Object.keys(options).map(key => {
          const item = options[key];
          return (
            <MenuItem key={key} value={item.value}>
              {item.name}
            </MenuItem>
          )
        })
      }
    </Select>
  )
}

export default SelectInput;