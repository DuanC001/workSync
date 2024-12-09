import React, { useState, useMemo } from "react";
import {
  Typography,
  Grid,
  Container,
  Button,
  TextField,
  Avatar,
  Box,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { OnboardAlertStyled } from "../theme/onboardAlert";
import theme from "../theme/theme";
import {
  PrimaryButton,
  SecondaryButton,
  FloatingButton,
} from "../theme/buttons";
import { EditIcon } from "./icons";

const DisplayFormData = ({
  formData,
  setFormData,
  companyId,
  previous,
  handleJobTypeSelection,
}) => {
  const dataToDisplay = useMemo(() => {
    return [
      { label: "Employee Name:", value: formData.name, name: "name" },
      { label: "Employee Email:", value: formData.email, name: "email" },
      { label: "Employee Phone Number:", value: formData.phone, name: "phone" },
      { label: "Education:", value: formData.education, name: "education" },
      { label: "Employee Address:", value: formData.address, name: "address" },
      { label: "Province:", value: formData.province, name: "province" },
      { label: "Country:", value: formData.country, name: "country" },
      { label: "Allergies:", value: formData.allergies, name: "allergies" },
      { label: "Job Title:", value: formData.jobTitle, name: "jobTitle" },
      {
        label: "Assign Department:",
        value: formData.department,
        name: "department",
      },
      { label: "Employee SIN Number:", value: formData.sin, name: "sin" },
      {
        label: "Manager's Name:",
        value: formData.managerName,
        name: "managerName",
      },
      {
        label: "Manager's Email:",
        value: formData.managerEmail,
        name: "managerEmail",
      },
      {
        label: "Job Start Date:",
        value: formData.startDate,
        name: "startDate",
      },
      {
        label: "Work Schedule:",
        value: formData.workSchedule,
        name: "workSchedule",
      },
      { label: "Salary Term:", value: formData.payPeriod, name: "payPeriod" },
      {
        label: "Salary Type:",
        value: formData.salaryType,
        name: "salaryType",
      },
      { label: "Annual Salary:", value: formData.salary, name: "salary" },
    ];
  }, [formData]);

  const handlePrevious = () => {
    previous();
  };

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  async function handleSubmit() {
    const url =
      import.meta.env.VITE_API_ENDPOINT + `/companies/${companyId}/employees`;
    try {
      const { startDate, ...restFormData } = formData;
      const formattedStartDate = (() => {
        const [year, month, day] = startDate.split("-");
        return `${month}-${day}-${year}`;
      })();

      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...restFormData,
          startDate: formattedStartDate,
        }),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Success:", jsonResponse);
        setAlertMessage(`You have successfully onboarded ${formData.name}`);
        setShowAlert(true);
        setTimeout(() => {
          handleJobTypeSelection(3);
        }, 1000);
      } else {
        const errorResponse = await response.json();
        console.error("Server responded with status:", response.status);
        setAlertMessage(`Failed to onboard: ${errorResponse}`);
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertMessage("Error during onboarding: " + error.message);
      setShowAlert(true);
    }
  }

  const [isEditing, setIsEditing] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e, name) => {
    let { value } = e.target;

    if (name === "startDate") {
      const [year, month, day] = value.split("-");
      value = `${month}-${day}-${year}`;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmSubmit = () => {
    setOpenDialog(false);
    handleSubmit();
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      {showAlert && (
        <OnboardAlertStyled
          onClose={() => setShowAlert(false)}
          severity="warning"
        >
          {alertMessage}
        </OnboardAlertStyled>
      )}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Avatar
          src={formData.profilePicture}
          alt="Avatar"
          sx={{
            width: 56,
            height: 56,
            marginBottom: 3,
          }}
        />
        <Button
          variant="contained"
          onClick={handleEditToggle}
          style={{
            position: "relative",
            right: -10,
            top: -20,
            backgroundColor: "#FFFFFF",
            color: "#FA6432",
            boxShadow: "none",
            fontSize: 14,
          }}
        >
          <EditIcon color="#fa6432" />
          {isEditing ? "Save" : "Edit"}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {dataToDisplay.map((item, index) => (
          <React.Fragment key={index}>
            <Grid item xs={6}>
              <Typography align="left">{item.label}</Typography>
            </Grid>
            <Grid item xs={6}>
              {isEditing ? (
                <TextField
                  align="right"
                  fullWidth
                  name={item.name}
                  value={item.value}
                  onChange={(e) => handleChange(e, item.name)}
                />
              ) : (
                <Typography align="right">{item.value}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          pt: 5,
          pl: 4,
          pr: 4,
          pb: 5,
        }}
      >
        <SecondaryButton onClick={handlePrevious} sx={{ width: 200, mr: 2 }}>
          Back
        </SecondaryButton>

        <PrimaryButton onClick={handleOpenDialog} sx={{ width: 200 }}>
          Continue
        </PrimaryButton>
      </Box>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            padding: "113px 68px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <img
          src="../images/Employee-with-laptop.png"
          alt="Employee-with-laptop.png"
          style={{
            height: 140,
            width: 140,
            marginBottom: 20,
          }}
        />
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {"Do you want to On-Board?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ marginX: "45px", textAlign: "center" }}
          >
            You have initiated the employee On-board. Are you sure to on-board?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <SecondaryButton onClick={handleCloseDialog}>Cancel</SecondaryButton>
          <PrimaryButton onClick={handleConfirmSubmit} autoFocus>
            On-Board Employee
          </PrimaryButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default DisplayFormData;
