import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import EmployeeOnboardTable from "../components/EmployeeOnboardTable";
import JobTypeSelection from "../components/JobTypeSelection";
import EmployOnboardForm from "../components/EmployOnboardForm";
import ContractorOnboardForm from "../components/ContractorOnboardForm";
import theme from "../theme/theme";
import { useTheme,useMediaQuery } from "@mui/material";

const EmployeeOnboard = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));


  const { currentCompany, loading, error } = useSelector(
    (state) => state.company
  );

  const { _id } = currentCompany || {};

  const [currentStep, setCurrentStep] = useState(0);
  const [hasAwaitingJoinEmployee, setHasAwaitingJoinEmployee] = useState(false);

  useEffect(() => {
    const url =
      import.meta.env.VITE_API_ENDPOINT + `/companies/${_id}/employees`;
    fetch(url, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const hasAwaitingJoin = data.some(
          (employee) => employee.isJoined === "Awaiting Join"
        );
        setHasAwaitingJoinEmployee(hasAwaitingJoin);
        if (hasAwaitingJoin) {
          setCurrentStep(3); // If there are awaiting join employee, go directly to step 3
        }
      })
      .catch((error) => console.error("There was an error!", error));
  }, [_id]);

  const handleJobTypeSelection = (step) => {
    setCurrentStep(step);
  };

  return currentCompany ? (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Employee Onboard</title>
        <meta name="description" content="Employee Onboard Page" />
      </Helmet>
      <Container
        mb={2}
        pb={2}
        id="xxdd"
        maxWidth="100%"
        style={{
          backgroundColor: theme.palette.grey[50],
          paddingLeft: 16,
          paddingRight: 16,
          borderRadius: 12,
          paddingBottom: 0,
          width: "98%",
          margin: 0,
          height: isMobile?"178vh":"90vh",
          marginRight:"1rem !important"
        }}
      >
        {currentStep === 0 && (
          <JobTypeSelection handleJobTypeSelection={handleJobTypeSelection} />
        )}
        {currentStep === 1 && (
          <EmployOnboardForm
            handleJobTypeSelection={handleJobTypeSelection}
            companyId={_id}
          />
        )}
        {currentStep === 2 && (
          <ContractorOnboardForm
            handleJobTypeSelection={handleJobTypeSelection}
            companyId={_id}
          />
        )}
        {currentStep === 3 && hasAwaitingJoinEmployee && (
          <EmployeeOnboardTable
            companyId={_id}
            handleJobTypeSelection={handleJobTypeSelection}
          />
        )}
      </Container>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default EmployeeOnboard;
