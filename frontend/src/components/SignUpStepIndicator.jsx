import React from 'react';
import { Stepper, Step, StepLabel, StepConnector,useTheme,useMediaQuery } from '@mui/material';



const SignUpStepIndicator = ({ steps, activeStep }) => {


  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  

  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ margin: "2rem auto", justifyContent: "center" }}>
      {steps.map((label, index) => (
        <Step key={label}>
          <StepLabel sx={{
            '& .MuiStepLabel-label': { 
              fontSize: '1rem',
              color: index === activeStep ? 'primary.main' : 'text.secondary',
              '&.Mui-active': {
                color: 'primary.main',
              },
              '&.Mui-completed': {
                color: 'text.primary',
              }
            },
          }}>
            {label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );

}; 

export default SignUpStepIndicator;



