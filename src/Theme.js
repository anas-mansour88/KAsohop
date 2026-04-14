
import { createTheme } from "@mui/material/styles";

const getTheme = (mode = "light") => createTheme({
  palette: {
    mode: mode,
    primary: {
      main: "#ff0000",         // اللون الأساسي أحمر
      contrastText: "#ffffff", // نصوص الأزرار بيضاء
    },
    secondary: {
      main: "#3f464d",
      contrastText: "#ffffff",
    },
    background: {
      default: mode === "light" ? "#e0e0e0" : "#121212", // خلفية الشاشة
      paper: mode === "light" ? "#ffffff" : "#1e1e1e",   // خلفية البطاقات
    },
    text: {
      primary: mode === "light" ? "#000000" : "#ffffff", // نصوص رئيسية
      secondary: mode === "light" ? "#555555" : "#cccccc", // نصوص ثانوية
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    body1: { fontSize: "1rem" },
    body2: { fontSize: "0.875rem" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          transition: "all 0.3s ease",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#b71c1c", // لون أغمق عند Hover
            color: "#ffffff",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundColor: mode === "light" ? "#1976d2" : "#333333",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "16px",
          borderRadius: "12px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        },
      },
    },
  },
});

export default getTheme;