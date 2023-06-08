import { useEffect, useState } from "react";
import { MenuItem, Select } from "@mui/material";

export const games = [
  "Rainbow Six Siege"
  // "Valorant",
  // "Counter-Strike: Global Offensive",
  // "Roller Champions",
  // "Rocket League",
  // "League of Legends",
  // "Trackmania",
  // "Magic: The Gathering",
  // "Overwatch 2",
  // "Modern Warfare 2",
  // "FIFA",
  // "Zula Global"
];

export default function GameSelect(props) {
  const { option, setOption, sx } = props;
  const [options, setOptions] = useState([...games]);

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    if (!option && options.length > 0) setOption(options[0]);
  }, [options]);

  return (
    <Select
      labelId="game-select-label"
      id="game-select"
      sx={{ ...sx }}
      value={option}
      onChange={handleChange}
    >
      {options.map((val) => (
        <MenuItem value={val} key={"game_" + val}>
          {val}
        </MenuItem>
      ))}
    </Select>
  );
}
