import React from 'react';
import { Typography, IconButton, useTheme, useMediaQuery,Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useNavigate} from 'react-router-dom';


export default function FormTitle ({ title, subtitle , onClick}){
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate  = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>

      <Box sx={{display:"flex", justifyContent:"start", alignItems:"center"}}>
        <IconButton onClick={handleBack} aria-label="back" sx={{position:"relative", left:"-12px"}}>
          <ArrowBackIosIcon  />
          {/* <ArrowBackIcon sx={{position:"absolute",  left: isMobile? "4rem" : "9rem", top: isMobile? "2rem": "3rem" }}/> */}
        </IconButton>
        <Box sx={{margin:isMobile?"0":"auto", marginLeft:isMobile?"0":"none"}}>
          {title && (
            <Typography component="h2" gutterBottom sx={{textAlign:"center", fontSize:isMobile ? theme.typography.h2Small : theme.typography.h2Large}}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography sx={{fontSize:isMobile ? theme.typography.body2 : theme.typography.body1, textAlign:"center"}}>
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};