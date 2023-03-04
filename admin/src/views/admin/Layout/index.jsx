import { Outlet } from "react-router-dom";
import { ColorModeContext, useMode } from "../../../context/themeContext";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar />
          <main className="content">
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
