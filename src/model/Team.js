import { DEFAULT_DARK_LOGO, DEFAULT_LIGHT_LOGO } from "@/src/config/global";

export const Team = {
  uid: "",
  id: "",
  name: "",
  short: "",
  description: "",
  darkLogo: DEFAULT_DARK_LOGO,
  lightLogo: DEFAULT_LIGHT_LOGO,
  accessCode: "",
  score: 0,
  level: 0,
  wins: 0,
  draws: 0,
  loses: 0,
  players: [],
  game: 0,
  residency: {
    code: "US",
    label: "United States",
    phone: "1"
  },
  type: 0,
  deleted: false
};

export default Team;
