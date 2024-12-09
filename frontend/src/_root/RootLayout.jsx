import React from 'react'
import { Outlet } from "react-router-dom";
import { Box } from '@mui/material';
import TopBar from '../components/TopBar';
import SideBar from '../components/SideBar';
import ButtomNavigation from '../components/ButtomNavigation';
import { useTheme, useMediaQuery } from '@mui/material';

const RootLayout = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="div"
      sx={{
        width: "100vw",
        height: "100vh",
        margin: 0, 
        overflow: 'hidden',
      }}
    >
      <TopBar />
      <Box sx={{ display: "flex", flex: 1, height: "100%" }}>
        <SideBar />
        <Box sx={{ width: "100%", overflow:isMobile?"auto":"unset" , padding:isMobile?".5rem 1rem":"unset"}}>
          <Outlet />
      <ButtomNavigation />
        </Box>
      </Box>
    </Box>
  );
}

export default RootLayout