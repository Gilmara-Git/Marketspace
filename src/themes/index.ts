import { extendTheme } from "native-base";
export const THEME = extendTheme({
  colors: {
    blue: {
      100: '#e2e6f4',
      600: "#647AC7",
      900: "#364D9D",
    },
    gray: {
      900: "#1A181B",
      800: "#3E3A40",
      600: "#5F5B62",
      400: "#9F9BA1",
      300: '#D9D8DA',
      200: '#EDECEE',
       50: '#F7F7F8'
    },
    red: {
      400: "#EE7070",
    },
  },
  fonts: {
    heading: "Karla_700Bold",
    body: "Karla_400Regular",
    light: "Karla_300Light",
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  sizes: {
    8:  26,
    11: 42,
    13: 45,
    14: 56,
    15: 60,
    17: 139,
    33: 148,
    50: 180,
    58: 249,
    69: 279,
    102:450
  },
});
