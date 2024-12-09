import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { Dashboard, OnboardIcon, OffboardIcon, DirectoryIcon } from "./icons";

const ButtomNavigation = () => {
  const [value, setValue] = useState(0);
  const iconColor = (index) => (value === index ? "#FA6432" : "#474853");
  return (
    <Paper
      sx={{
        display: { sm: "block", xs: "block", md: "none" },
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        boxShadow: "none",
        padding: 0.5,
        bgcolor: "#F5F5F5",
        zIndex: 3
      }}
      elevation={6}
    >
      <BottomNavigation
        showLabels
        value={value}
        sx={{
          display: { sm: "flex", xs: "flex", md: "none" },
          bgcolor: "#F5F5F5",
        }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          disableRipple
          sx={{
            color: "#84858C",
            gap: 0.5,
            "& .Mui-selected": {
              color: "#FA6432",
              fontWeight: "700",
            },
          }}
          label="Dashboard"
          icon={<Dashboard color={iconColor(0)} />}
          component={NavLink}
          to="/dashboard"
        />
        <BottomNavigationAction
          disableRipple
          label="Onboard"
          sx={{
            color: "#84858C",
            gap: 0.5,
            "& .Mui-selected": {
              color: "#FA6432",
              fontWeight: "700",
            },
          }}
          icon={<OnboardIcon color={iconColor(1)} />}
          component={NavLink}
          to="/employee-onboard"
        />
        <BottomNavigationAction
          disableRipple
          label="Offboard"
          sx={{
            color: "#84858C",
            gap: 0.5,
            "& .Mui-selected": {
              color: "#FA6432",
              fontWeight: "700",
            },
          }}
          icon={<OffboardIcon color={iconColor(2)} />}
          component={NavLink}
          to="/employee-offboard"
        />
        <BottomNavigationAction
          disableRipple
          label="Employee"
          sx={{
            color: "#84858C",
            gap: 0.5,
            "& .Mui-selected": {
              color: "#FA6432",
              fontWeight: "700",
            },
          }}
          icon={<DirectoryIcon color={iconColor(3)} />}
          component={NavLink}
          to="/team-directory"
        />
      </BottomNavigation>
    </Paper>
  );
};

export default ButtomNavigation;
