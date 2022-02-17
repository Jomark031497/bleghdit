import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { responsiveFontSizes } from "@mui/material";

let theme = createTheme();

theme = createTheme(theme, {
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#dae0e6",
    },
  },
  typography: {
    fontFamily: "'IBM Plex Sans', sans-serif;",
    button: {
      textTransform: "none",
    },
    h5: {
      fontSize: "1.5rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1.3rem",
      },
    },
    h6: {
      fontSize: "1.25rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "1rem",
      },
    },
    subtitle1: {
      fontSize: "1rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.8rem",
      },
    },
    subtitle2: {
      fontSize: "0.875rem",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.7rem",
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: "8vh",
    },
  },
});

responsiveFontSizes(theme);

export default theme;
