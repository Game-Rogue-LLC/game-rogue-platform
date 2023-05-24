import Color from "color";
import dayjs from "dayjs";

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

export const formatDate = (date, format) => {
  if (format) {
    return dayjs(date).format(format);
  }
  return dayjs(date).format("DD.MM.YYYY");
};

export const formatNumber = (number, precision) => {
  if (precision) {
    return Number(number).toFixed(precision);
  }
  return Number(number).toFixed(0);
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
