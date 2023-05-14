import colorConvert from "color-convert";
import dayjs from "dayjs";

export const isBrightColor = (hex) => {
  const color = colorConvert.hex.rgb(hex);
  const hsp = Math.sqrt(
    color[0] * color[0] * 0.299 +
      color[1] * color[1] * 0.587 +
      color[2] * color[2] * 0.114
  );

  return hsp > 127.5;
};

export const brighterColor = (hex, plus) => {
  const color = colorConvert.hex.hsl(hex);
  console.log("hsl", color);
  return colorConvert.hsl.hex(
    color[0],
    color[1],
    Math.min(color[2] + 100 * plus, 100)
  );
};

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
