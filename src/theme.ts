import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonPropsColorOverrides {
    neutral: true;
  }
}

export const theme = createTheme({
  palette: {
    neutral: {
      main: "#F9B546",
    },
  },
});
