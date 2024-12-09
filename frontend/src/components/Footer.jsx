import React from 'react';
import { Box } from '@mui/material';
import {Link as ScrollLink} from 'react-scroll';


export default function Footer() {
  return <div>
    <Box sx={{background:"rgba(10, 11, 26, 1)"}}>
      <div className="footer-container">
        <Box>
          <div className="footer-logo">
            <img src="../../images/Landing page/Brand Logo.svg" alt="Company Logo" />
          </div>
          <div className="footer-text">
            <p>Streamline small company operations. Boost efficiency, satisfaction. Transform paperwork to productivity with user-friendly tech.</p>
          </div>
        </Box>
        <Box>
          <div className="footer-links">
            <ul>
              <li><ScrollLink
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
              <li><ScrollLink
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
              <li><ScrollLink
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
              <li><ScrollLink
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
            </ul>
          </div>
          <div className="footer-socials">
            <ul>
              <li><a href="https://www.instagram.com/"><img src="../../images/Landing page/Social Icons.svg" alt="Instagram" /></a></li>
              <li><a href="https://www.linkedin.com/"><img src="../../images/Landing page/linkedin Icon.svg" alt="LinkedIn" /></a></li>
            </ul>
          </div>
        </Box>
        
      </div>
      <div className='footer-p'>
          <p>© 2024 Worksynk, all right reserved</p>
        </div>
    </Box>
  </div>
}
