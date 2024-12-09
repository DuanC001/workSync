import { Box, Button, Stack } from "@mui/material";
import { Link as ScrollLink } from 'react-scroll';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { LandingPrimaryButton, LandingSecondaryButton } from "../theme/buttons";
import { color } from "@mui/system";
import CloseIcon from '@mui/icons-material/Close';


export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    if (window.innerWidth > 768) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCloseMenu = () => {
    setMobileMenuOpen(false);
  };

  const { currentCompany } = useSelector((state) => state.company);
  return (
    <Box sx={{ display:"flex", justifyContent:"space-between", alignItems:"center", width:"90%", margin:"auto", paddingTop:isMobile?"":"1rem"}}>
      <div className="brand-logo">
        <Link to="/">
          <img src="../../images/Landing page/Brand Logo.svg" alt="Company Logo" />
        </Link>
      </div>
      <nav>
        <Button className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu} sx={{backgroundColor:"transparent"}}>
          <img src="../../images/Landing page/Menu icon.svg"/>
        </Button>
        {isMobileMenuOpen && (
          <Box onClick={handleCloseMenu}>
            <CloseIcon  sx={{ position: 'fixed', top: 16, right: 16, color: 'grey[1 .00]', zIndex:"10000" }}>
          </CloseIcon>
          </Box>
          
        )}
        <ul className={`menu ${isMobileMenuOpen && windowWidth <= 768 ? 'open' : ''}`}>
          <li> <ScrollLink onClick={handleCloseMenu}
            activeClass="active"
            to="feature"
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            style={{ cursor: "pointer" }}
          >
            Features
          </ScrollLink></li>
          
          <li><ScrollLink onClick={handleCloseMenu}
          activeClass="active"
          to="about"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
          style={{ cursor: "pointer" }}
        >
          About
        </ScrollLink></li>
          <li><ScrollLink onClick={handleCloseMenu}
      activeClass="active"
      to="pricing"
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      style={{ cursor: "pointer" }}
    >
    Pricing
    </ScrollLink></li>
          <li ><ScrollLink onClick={handleCloseMenu}
      activeClass="active"
      to="contact"
      spy={true}
      smooth={true}
      offset={-70}
      duration={500}
      style={{ cursor: "pointer" }}
    >
      Contact
    </ScrollLink></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/sign-up">Sign Up</a></li>
        </ul>
        
      </nav>
      <Box sx={{display:isMobile?"none":"block"}}>
          
            <Stack direction="row" spacing={2}>
               <LandingPrimaryButton variant="text">
                <Link to="/login" style={{color:"white"}}>LOGIN</Link>
              </LandingPrimaryButton>

              <LandingSecondaryButton>
                <Link to="/sign-up" variant="outlined" color="white" style={{color:"rgba(250, 100, 50, 1)" , '&:hover':{
                  color:"white !important"
                }}}>SIGNUP</Link>
              </LandingSecondaryButton>
            </Stack>
         </Box>

        
  </Box>
  );
}
