import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface Theme {
    secondary: {
      main: string;
    };
  }
}

export const theme = createTheme({
  palette: {
    secondary: {
      main: "#717171",
    },
  },
});
