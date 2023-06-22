import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import { AuthProvider } from "./context/AuthContext";
import { SourceMoviesProvider } from "./context/MoviesContext";
import { SnackbarProvider } from "notistack";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SourceMoviesProvider>
          <SnackbarProvider
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <App />
          </SnackbarProvider>
        </SourceMoviesProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
