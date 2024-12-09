import { Box, SvgIcon, Typography, Icon, Button } from "@mui/material";
import { useCookies } from "react-cookie";
import {
  DashboardCustomize,
  Person,
  Person2,
  OfflinePinRounded,
} from "@mui/icons-material";
import {
  Dashboard,
  DirectoryIcon,
  OnboardIcon,
  OffboardIcon,
  AdminImage,
  InfoIcon
} from "./icons";
import CollapseIcon from "./icons/CollapseIcon";
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
// From Redux
import { signOut } from "../redux/company/companySlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SecondaryButton } from "../theme/buttons";
import {useTheme,useMediaQuery} from "@mui/material";
import theme from "../theme/theme";




const SideBar = () => {
  const [cookies, removeCookie] = useCookies([]);
  const location = useLocation();
  const [showCollapse, setShowCollapse] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const isActive = (path) => {
    return (
      location.pathname.startsWith(path) &&
      (location.pathname === path || location.pathname[path.length] === "/")
    );
  };
  const navigate = useNavigate();
  //   Redux
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await fetch(import.meta.env.VITE_API_ENDPOINT + "/signout", {
        credentials: "include",
      });
      dispatch(signOut());
      removeCookie("access_token");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const items = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <Dashboard color="#474853" />,
    },
    {
      path: "/employee-onboard",
      label: "On-Board Employee",
      icon: <OnboardIcon color="#474853" />,
    },
    {
      path: "/employee-offboard",
      label: "Off-Board Employee",
      icon: <OffboardIcon color="#474853" />,
    },
    {
      path: "/team-directory",
      label: "Employee Directory",
      icon: <DirectoryIcon color="#474853" />,
    },
  ];
  const SideBarCollaps = () =>{
    return (
        <Box
      sx={{
        width: "72px",
        height: "87vh",
        display: { xs: "none", md: "flex" },
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        position:"relative"
      }}
    >
        <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 1, alignContent:"center", justifyContent:"center" }}>
          {items.map((item) => (
            <Box sx={{ display: "flex", gap: 0.3 }}>
              {isActive(item.path) && (
                <Box
                  sx={{
                    width: 6,
                    height: "70%",
                    backgroundColor: "#FA6432",
                    borderRadius: "1rem",
                    alignSelf:"center"
                  }}
                />
              )}
              <NavLink
                end
                to={item.path}
                color="black"
                key={item.path}
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  alignS: "center",
                  padding: "1px",
                  gap: 3,
                  borderRadius: 5,
                  alignSelf: "center",
                  backgroundColor: isActive(item.path) ? "#f5f5f5" : "",
                  padding:isActive(item.path)? ".5rem " : "",
                  flex:isActive(item.path) ?"":"1 0 100%",
                  marginLeft:isActive(item.path)? "" : "1rem"
                }}
              >
                {item.icon}
                {/* <Typography
                  sx={{
                    padding: 0.5,
                    fontWeight: isActive(item.path) ? "bold" : "normal",
                  }}
                  component="span"
                >
                  {item.label}
                </Typography> */}
              </NavLink>
            </Box>
          ))}
        </Box> 
        
        </Box>
        
        <Box
                  sx={{
                    position: "absolute",
                    bottom:"50%",
                    left:"50%",
                    zIndex: 1,
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Button
                  onClick={() => {
                    setShowCollapse(!showCollapse);
                  }}
                  sx={{rotate:"180deg",backgroundColor:"transparent" , "&:hover":{backgroundColor:"transparent", animation: "fadeIn 1s ease-in-out forwards"}}}>

                    <CollapseIcon />
                  </Button>
        </Box>

        <Box sx={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "20px",
              backgroundColor:"transparent",
              "&:hover":{backgroundColor:"transparent"}
            }}>
            <InfoIcon sx={{color:"white"}}/>
          </Button>
          <Box
            sx={{
              //position: "fixed",
              bottom: 10,
              left: 20,
              right: 0,
            }}
          
          >
            <Button onClick={logout} sx={{backgroundColor:"transparent" , "&:hover":{backgroundColor:"transparent"}}}>
              <LogoutIcon sx={{color:theme.palette.grey[300]}}/>
            </Button>
          </Box>
        </Box>
    </Box>
    )
}




return (
  showCollapse ? <SideBarCollaps /> :
    <Box
      sx={{
        width: "270px",
        height: "87vh",
        display: { xs: "none", md: "flex" },
        justifyContent: "space-between",
        flexDirection: "column",
        alignItems: "start",
        gap: 5,
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 1 ,alignSelf:"center"}}>
          {items.map((item) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.3 }}>
              {isActive(item.path) && (
                <Box
                  sx={{
                    width: 6,
                    height: "70%",
                    backgroundColor: "#FA6432",
                    borderRadius: "1rem",
                  }}
                />
              )}
              <NavLink
                end
                to={item.path}
                color="black"
                key={item.path}
                style={{
                  textDecoration: "none",
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  padding: "1px",
                  gap: 3,
                  borderRadius: 5,
                  backgroundColor: isActive(item.path) ? "#f5f5f5" : "",
                  padding:isActive(item.path)? ".2rem " : "",
                  marginLeft:isActive(item.path)? "" : "1rem",
                  flexGrow: "1"
                }}
              >
                {item.icon}
                <Typography
                  sx={{
                    padding: 0.5,
                    fontWeight: isActive(item.path) ? "bold" : "normal",
                    flex:"1 0 100%"
                  }}
                  component="span"
                >
                  {item.label}
                </Typography>
              </NavLink>
              
            </Box>
          ))}
        </Box>
      </Box>
      <Box
          sx={{
            display: "flex",
            alignItems: "center",
            position: "absolute",
            left:"85%",
            bottom:"50%",
            zIndex: 1,
            gap: 2,
          }}
        >
          <Button
          onClick={() => {
            setShowCollapse(!showCollapse);
            
          }}
          sx={{backgroundColor:"transparent" , "&:hover":{backgroundColor:"transparent"}}}>

            <CollapseIcon 
              
            />
          </Button>
        </Box>

       

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          justifyContent: "start",
          gap: 2,
          px: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <InfoIcon />
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "light",
              color: "#0A0B1A",
            }}
          >
            Help Center
          </Typography>
        </Box>
        {/*<Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            height={40}
            width={40}
            sx={{ bgcolor: "#f4f5f7", borderRadius: "100%" }}
          ></Box>
           <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography
              variant="p"
              sx={{
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Nikhil Kanda
            </Typography>
            <Typography
              sx={{
                fontWeight: "light",
                fontSize: "12px",
                opacity: "50%",
              }}
            >
              nikhil@gmail.com
            </Typography>
          </Box> 
        </Box>*/}
        
        <Box
          sx={{
            //position: "fixed",
            bottom: 10,
            left: 20,
            right: 0,
          }}
        >
          <SecondaryButton variant="outlined" color="error" onClick={logout}>
            Logout
          </SecondaryButton>
        </Box>
      </Box>
    </Box>
  );
};

export default SideBar;
