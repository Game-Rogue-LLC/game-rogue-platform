import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";

export const games = [
  {
    id: 0,
    name: "Rainbow Six Siege",
    image: "/static/images/games/r6s.webp"
  }
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

export default function GameSelect({ option, setOption, sx }) {
  const [options, setOptions] = useState([...games]);

  const handleChange = (e) => {
    setOption(e.target.value);
  };

  useEffect(() => {
    if (!option && options.length > 0) setOption(options[0].id);
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
        <MenuItem value={val.id} key={"game_" + val.id}>
          {val.name}
        </MenuItem>
      ))}
    </Select>
  );
}
