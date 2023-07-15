import Color from "color";
import { TEAM_POSITIONS } from "@/src/config/global";
import dayjs from "dayjs";
import team from "@/lib/firestore/collections/team";

// * Begin: Color Util Functions
export const isBrightColor = (hex) => {
  return Color(hex).isLight();
};

export const brighterColor = (hex, ratio) => {
  return Color(hex).lighten(ratio).hex();
};

export const darkerColor = (hex, ratio) => {
  return Color(hex).darken(ratio).hex();
};

export const hoverColor = (hex) => {
  if (isBrightColor(hex)) return darkerColor(hex, 0.3);
  return brighterColor(hex, 0.3);
};

export const withOpacity = (hex, opacity) => {
  return Color(hex).alpha(opacity).hexa();
};
// * End: Color Util Functions
export const buttonStyle = (color) => {
  const hover = hoverColor(color),
    isBright = isBrightColor(color);
  return {
    backgroundColor: color,
    // color: isBright ? "black" : "white",
    color: "white",
    "&:hover": {
      // color: isBright ? "black" : "white",
      backgroundColor: hover
    }
  };
};

export const formatDate = (date, format) => {
  const dat = date ? new Date(date) : new Date();
  if (format) {
    return dayjs(dat).format(format);
  }
  return dayjs(dat).format("DD.MM.YYYY");
};

export const formatNumber = (number, precision) => {
  if (precision) {
    return Number(number).toFixed(precision);
  }
  return Number(number).toFixed(0);
};

export const sequenceNumber = (number) => {
  switch (number % 10) {
    case 1:
      return number + "st";
    case 2:
      return number + "nd";
    case 3:
      return number + "rd";
    default:
      return number + "th";
  }
};

export const romanNumber = (number) => {
  switch (number) {
    case 1:
      return "I";
    case 2:
      return "II";
    case 3:
      return "III";
    case 4:
      return "IV";
    case 5:
      return "V";
    case 6:
      return "VI";
    case 7:
      return "VII";
    case 8:
      return "VIII";
    case 9:
      return "IX";
    case 10:
      return "X";
    case 11:
      return "XI";
    case 12:
      return "XII";
    case 13:
      return "L";
    case 14:
      return "C";
    case 15:
      return "D";
    case 15:
      return "M";
    default:
      return "";
  }
};

export const numberLang = (number) => {
  const numbers = ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];
  return numbers[number - 1];
};

/** Tournament Related functions */
export const isMyTeam = (team, uid) => {
  if (!team || !uid) return false;
  if (!team.players) return false;
  for (let i = 0; i < team.players.length; i++) {
    if (team.players[i].id === uid) return true;
  }
  return false;
};

export const isMyMatch = (match, teams, uid) => {
  if (!match || !teams || !uid) return false;
  if (!match.participants) return false;
  for (let i = 0; i < match.participants.length; i++) {
    if (isMyTeam(teams[match.participants[i].id], uid)) return true;
  }
  return false;
};

export const isMyArticle = (article, uid) => {
  if (!article || !uid) return false;
  return article.uid === uid || _.includes(article.collabs, uid);
};

export const getTeamPosition = (position) => {
  return _.find(TEAM_POSITIONS, (val) => val.id === position).name;
};
