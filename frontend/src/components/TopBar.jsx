import React, { useState } from "react";
import { Box, MenuItem, Menu, IconButton, Tooltip } from "@mui/material";
import { Notification, Search, MobileLogo, Hamburger, AdminImage } from "../components/icons";
import { useNavigate } from "react-router-dom";
import { signOut } from "../redux/company/companySlice";
import { useDispatch } from "react-redux";
import LogoutIcon from '@mui/icons-material/Logout';

const TopBar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await fetch(import.meta.env.VITE_API_ENDPOINT + "/signout");
      dispatch(signOut());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      sx={{
        pl: { md: 0, sm: 3, xs: 3 },
        pr: 3,
        py: { xs: 0.1, sm: 1 },
        display: "flex",
        justifyContent: { sm: "end", xs: "space-between", md: "space-between" },
        alignItems: "center",
      }}
    >
      <MobileLogo />
      <Box sx={{ display: { xs: "none", sm: "none", md: "block" } }}>
        <img style={{ fontSize: "0.1rem", objectFit: "contain" }} src="/logo.svg" alt="Logo" />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 3, justifyContent:"center", paddingRight:"1rem" }}>
        <Tooltip title="Search">
          <Search fontSize="small" aria-label="search"/>
        </Tooltip>
        <Tooltip title="Notifications">
          <Notification fontSize="small" aria-label="notifications"/>
        </Tooltip>
        <Tooltip title="logout">
          <IconButton size="small" sx={{display:{sm:"block", md:"none"}}}>
            <LogoutIcon aria-label="logout" tooltip="logout" onClick={logout} sx={{fill:"#474853"}}/> 
          </IconButton>
        </Tooltip>
        
        {/* <Menu
          id="admin-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'admin-button',
          }}
        >
          <MenuItem onClick={logout}>Logout</MenuItem> {/* Logout option 
        </Menu> */}
        {/* <DarkModeToggle /> */}
      </Box>
    </Box>
  );
};

export default TopBar;