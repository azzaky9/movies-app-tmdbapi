import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/theme";
import { AuthProvider } from "./context/AuthContext";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
