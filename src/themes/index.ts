import { extendTheme } from "native-base";
export const THEME = extendTheme({
  colors: {
    blue: {
      600: "#647AC7",
      900: "#364D9D",
    },
    gray: {
      900: "#1A181B",
      800: "#3E3A40",
      600: "#5F5B62",
      400: "#9F9BA1",
    },
    red: {
      400: "#EE7070",
    },
  },
  fonts: {
    heading: "Karla_700Bold",
    body: "Karla_400Regular",
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
    14: 56,
    33: 148,
  },
});
