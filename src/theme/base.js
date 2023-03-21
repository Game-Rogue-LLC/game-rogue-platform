import DarkTheme from './schemes/dark';
import LightTheme from './schemes/light';

const themeMap = {
	dark: DarkTheme,
	light: LightTheme,
};

export function themeCreator(theme) {
  return themeMap[theme];
}
