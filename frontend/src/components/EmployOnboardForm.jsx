import React, { useState, useEffect } from "react";
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import EmployeeInformationForm from "./EmployeeInformationForm";
import JobDetailsForm from "./JobDetailForm";
import ReviewSubmit from "./ReviewSubmit";
import StepIcon from "@mui/material/StepIcon";
import theme from "../theme/theme";
import { useMediaQuery, useTheme } from "@mui/system";

const steps = [
  "Basic Information",
  "Employment Information",
  "Details Summary",
];
const CustomStepIcon = (props) => {
  const { active, completed } = props;

  return (
    <Box
      sx={{
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: "50%",
          border: "1px solid #FA6432",
          boxSizing: "border-box",
        },
      }}
    >
      <StepIcon
        {...props}
        sx={{
          color: completed ? "#FA6432" : "#FFF",
          ".MuiStepIcon-text": {
            fill: active ? "white" : "orange",
          },
          "&.Mui-completed": {
            color: "#FA6432",
          },
          "&.Mui-active": {
            color: "#FA6432",
          },
        }}
      />
    </Box>
  );
};

export default function OnboardEmployee({ companyId, handleJobTypeSelection }) {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    jobType: "employee",
    password: "123456",
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    async function loadData() {
      const departmentsData = await fetchDepartments(companyId);
      setDepartments(departmentsData);
    }
    loadData();
  }, [companyId]);

  async function fetchDepartments(companyId) {
    const url = import.meta.env.VITE_API_ENDPOINT + `/companies/${companyId}`;
    try {
      const response = await fetch(url, {
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        return data.departments;
      } else {
        console.error("Failed to fetch departments:", response.status);
        return [];
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
      return [];
    }
  }

  function handleNext() {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  }

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <EmployeeInformationForm
            formData={formData}
            setFormData={setFormData}
            next={handleNext}
            handleJobTypeSelection={handleJobTypeSelection}
          />
        );
      case 1:
        return (
          <JobDetailsForm
            formData={formData}
            setFormData={setFormData}
            departments={departments}
            next={handleNext}
            previous={handleBack}
          />
        );
      case 2:
        return (
          <ReviewSubmit
            formData={formData}
            setFormData={setFormData}
            previous={handleBack}
            companyId={companyId}
            handleJobTypeSelection={handleJobTypeSelection}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  }
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Container
      component="main"
      maxWidth="md"
      style={{
        marginTop: 0,
        paddingLeft: isMobile ? 20 : 70,
        paddingRight: isMobile ? 20 : 70,
        display: "flex",
        justifyContent: "center",
        height: "90vh",
        boxSizing: "border-box",
        height: isSmallScreen?"100vh":"calc(100vh - 100px)",
        overflowY: isSmallScreen?"auto":"hidden"
      }}
    >
      <Paper
        style={{
          padding: isMobile ? 20 : 20,
          paddingBottom: isMobile ? 40 : 20,
          paddingTop: isMobile ? 20 : 40,
          paddingRight: isMobile ? 20 : 150,
          paddingLeft: isMobile ? 20 : 150,
          marginBottom: isMobile ? 0 : 20,
          marginTop: 16,
          width: isMobile ? "auto" : 776,
          maxWidth: "100%",
          backgroundColor: "#FFFFFF",
          // maxHeight: ,
          overflowY: "auto",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          {activeStep === 0 ? (
            <>
              <Typography variant="h3" gutterBottom>
                Employee Basic Information
              </Typography>
              <Typography variant="body1">
                Effortless onboarding, input details for accurate company
                records.
              </Typography>
            </>
          ) : activeStep === 1 ? (
            <>
              <Typography variant="h3" gutterBottom>
                Employee Employment Information
              </Typography>
              <Typography variant="body1">
                Effortless onboarding, input details for accurate company
                records.
              </Typography>
            </>
          ) : (
            activeStep === 2 && (
              <>
                <Typography variant="h3" gutterBottom>
                  Confirm Details
                </Typography>
                <Typography variant="body1">
                  Effortless onboarding, input details for accurate company
                  records.
                </Typography>
              </>
            )
          )}
        </div>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>{getStepContent(activeStep)}</Box>
      </Paper>
    </Container>
  );
}