import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Stack,
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Button,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import GroupIcon from "@mui/icons-material/Group";
import InsightsIcon from "@mui/icons-material/Insights";
import { useNavigate } from "react-router-dom";

// From Redux
import { signOut } from "../redux/company/companySlice";
import { useDispatch } from "react-redux";
// const drawerWidth = 240;

const SideLinks = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  //   Redux
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
  // const [mobileOpen, setMobileOpen] = useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };

  // Drawer contents
  // const drawer = (
  //   <Box>
  //     <Link to="/">
  //       <img
  //         src="../Frame_4.png"
  //         alt="Logo"
  //         sx={{ margin: "15px 10px 30px" }}
  //       />
  //     </Link>
  //     <List>
  //       <ListItem button component={Link} to="/dashboard">
  //         <ListItemText primary="Dashboard" />
  //       </ListItem>
  //       <ListItem button component={Link} to="/employee-onboard">
  //         <ListItemText primary="Employee Onboard" />
  //       </ListItem>
  //       <ListItem button component={Link} to="/employee-offboard">
  //         <ListItemText primary="Employee Offboard" />
  //       </ListItem>
  //       <ListItem button component={Link} to="/team-directory">
  //         <ListItemText primary="Team Directory" />
  //       </ListItem>
  //     </List>
  //   </Box>
  // );

  return (
    // <Box sx={{ display: 'flex' }}>
    //   <IconButton
    //     color="inherit"
    //     aria-label="open drawer"
    //     edge="start"
    //     onClick={handleDrawerToggle}
    //     sx={{}}
    //   >
    //     <MenuIcon />
    //   </IconButton>
    //   <Drawer
    //     sx={{
    //       width: drawerWidth,
    //       flexShrink: 0,
    //       '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
    //       display: { xs: 'block', sm: 'none' },
    //     }}
    //     variant="temporary"
    //     open={mobileOpen}
    //     onClose={handleDrawerToggle}
    //     ModalProps={{
    //       keepMounted: true,
    //     }}
    //   >
    //     {drawer}
    //   </Drawer>
    //   <Drawer
    //     variant="permanent"
    //     sx={{
    //       display: { xs: 'none', sm: 'block' },
    //       '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    //     }}
    //     open
    //   >
    //     {drawer}
    //   </Drawer>
    // </Box>
    <Box>
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Stack
          id="sidenav"
          direction="column"
          spacing={2}
          sx={{
            position: "fixed",
            top: 20,
            left: 20,
            right: 0,
          }}
        >
          <Link to="/">
            <img
              src="../../images/logo.png"
              alt="Logo"
              sx={{ margin: "15px 10px 30px" }}
            />
          </Link>
          <NavLink to="/dashboard">
            <InsightsIcon />
            &nbsp;Dashboard
          </NavLink>
          <NavLink to="/employee-onboard">
            <PersonAddAlt1Icon />
            &nbsp;Employee Onboard
          </NavLink>
          <NavLink to="/employee-offboard">
            <PersonRemoveIcon />
            &nbsp;Employee Offboard
          </NavLink>
          <NavLink to="/team-directory">
            <GroupIcon />
            &nbsp;Team Directory
          </NavLink>
        </Stack>
        <Box
          sx={{
            position: "fixed",
            bottom: 10,
            left: 20,
            right: 0,
          }}
        >
          <Button variant="outlined" color="error" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Box>

      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <Paper
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            textAlign: "center",
          }}
          elevation={3}
        >
          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Dashboard"
              component={Link}
              to="/dashboard"
              icon={<InsightsIcon />}
            />
            <BottomNavigationAction
              label="Employee Onboard"
              component={Link}
              to="/employee-onboard"
              icon={<PersonAddAlt1Icon />}
            />
            <BottomNavigationAction
              label="Employee Offboard"
              component={Link}
              to="/employee-offboard"
              icon={<PersonRemoveIcon />}
            />
            <BottomNavigationAction
              label="Team Directory"
              component={Link}
              to="/team-directory"
              icon={<GroupIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </Box>
  );
};

export default SideLinks;
