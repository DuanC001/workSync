import React, { useState } from "react";
import { useTheme, useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
import SignUpAccount from "./../components/SignUpAccout";
import SignpDepartmemtInfo from "../components/SignUpDepartmentInfo";
import SignUpCompanyInfo from "../components/SignUpCompanyInfo";
import SignUpStepIndicator from "../components/SignUpStepIndicator";
import SignUpFormTitle from "../components/SignUpFormTitle";
import { Helmet } from "react-helmet";

export default function SignUp() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    name: "",
    address: "",
    size: "",
    phone: "",
    website: "",
    departments: "",
  });

  const [activeStep, setActiveStep] = useState(0);

  const formSteps = [
    {
      title: "Setup Account",
      subtitle: "One HRMS solution for all Cleaning agencies ",
    },
    { title: "Setup Your Company", subtitle: "Add your company details" },
    {
      title: "Add Departments",
      subtitle: "Manage the different departments of our company's operations",
    },
  ];

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
  const prevStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const renderForm = () => {
    switch (activeStep) {
      case 0:
        return (
          <SignUpAccount
            formData={formData}
            setFormData={setFormData}
            next={nextStep}
          />
        );

      case 1:
        return (
          <SignUpCompanyInfo
            formData={formData}
            setFormData={setFormData}
            next={nextStep}
            previous={prevStep}
          />
        );

      case 2:
        return (
          <SignpDepartmemtInfo
            formData={formData}
            setFormData={setFormData}
            next={nextStep}
          />
        );

      default:
        return <>Signup Complete!</>;
    }
  };

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Worksynk | Sign Up</title>
        <meta name="description" content="Worksynk Sign Up Page" />
      </Helmet>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Box sx={{ flex: "1 0 45%", display: isMobile ? "none" : "block" , paddingLeft:"2rem", paddingTop:"0.5rem"}}>
          <img
            src="../../images/login-image.svg"
            alt="login image"
            style={{
              borderRadius: "2rem",
              transform: "scaleX(-1)",
              height: "97vh",
              marginLeft: "1rem",
              
            }}
          />
        </Box>

        <Box sx={{ margin: "1rem",flex:"1 0 55%", height:"95vh", paddingTop:".2rem"}}>
          <Box>
            {formSteps[activeStep] && (
              <SignUpFormTitle
                title={formSteps[activeStep].title}
                subtitle={formSteps[activeStep].subtitle}
              />
            )}
          </Box>
          <Box>
            <SignUpStepIndicator
              steps={formSteps.map((step) => step.title)}
              activeStep={activeStep}
            />
            {renderForm()}
            {console.log(formData)}
          </Box>
        </Box>
      </Box>
    </>
  );
}
