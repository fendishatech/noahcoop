import { Outlet } from "react-router-dom";
import { ColorModeContext, useMode } from "../../../context/themeContext";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import { useState } from "react";

const Layout = () => {
  const [open, setOpen] = useState(false);
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar open={open} setOpen={setOpen} />
          <main style={{ marginLeft: open ? "64px" : "270px" }}>
            <TopBar />
            <Box p={2}>
              <Outlet />
            </Box>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Layout;
