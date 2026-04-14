
import React, { useState, useMemo } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";

import router from "./Router";
import getTheme from "./Theme";

const queryClient = new QueryClient();

export default function App() {
  // حالة الوضع (Light / Dark)
  const [mode, setMode] = useState("light");

  // إنشاء الثيم حسب الوضع
  const theme = useMemo(() => getTheme(mode), [mode]);

  // دالة التبديل بين Light و Dark
  const toggleMode = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RouterProvider router={router(toggleMode, mode)} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

