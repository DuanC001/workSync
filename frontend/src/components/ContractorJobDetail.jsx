import React from "react";
import {
  Container,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import theme from "../theme/theme";
import {
  PrimaryButton,
  SecondaryButton,
  FloatingButton,
} from "../theme/buttons";

export default function JobDetailsForm({
  departments,
  formData,
  setFormData,
  next,
  previous,
}) {
  const currencies = [
    {
      value: "CAD",
      label: "CAD",
    },
    {
      value: "USD",
      label: "USD",
    },
    {
      value: "EUR",
      label: "EUR",
    },
  ];
  const departmentOptions = Array.isArray(departments)
    ? departments
    : ["No department yet"];

    const handlePrevious = () => {
      previous();
    };

    const handleNext = () => {
      validateForm();

      if (isValid && Object.keys(errors).length === 0) {
        next();
      }
    };

    let isValid = true;
    const validateForm = () => {
      const requiredFields = [
        "jobTitle",
        "department",
        "sin",
        "managerName",
        "managerEmail",
        "startDate",
        "duration",
        "payPeriod",
        "salaryType",
        "salary"
      ];

      requiredFields.forEach((field) => {
        if (!formData[field]) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [field]: `${
              field.charAt(0).toUpperCase() + field.slice(1)
            } is required`,
          }));
          isValid = false;
        }
      });

      return isValid;
    };

    const [errors, setErrors] = React.useState({});
    const validateEmail = (email) => {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
      return re.test(String(email).toLowerCase());
    };

    const handleBlur = (field) => {
      const newErrors = { ...errors };
      if (!formData[field]) {
        newErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`;
      } else if (
        field === "managerEmail" &&
        !validateEmail(formData.managerEmail)
      ) {
        newErrors.managerEmail = "Please enter a valid email address";
      } else {
        delete newErrors[field];
      }
      setErrors(newErrors);
    };
  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="jobTitle"
              name="jobTitle"
              label="Job Duties"
              fullWidth
              variant="outlined"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              error={!!errors.jobTitle}
              helperText={errors.jobTitle}
              onBlur={() => handleBlur("jobTitle")}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              error={!!errors.department}
              variant="outlined"
            >
              <InputLabel id="department-label">Assign Department</InputLabel>
              <Select
                labelId="department-label"
                id="department"
                name="department"
                label="Assign Department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                onBlur={() => handleBlur("department")}
              >
                {departmentOptions.map((department, index) => (
                  <MenuItem key={index} value={department}>
                    {department}
                  </MenuItem>
                ))}
              </Select>
              {errors.department && (
                <FormHelperText>{errors.department}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="sin"
              name="sin"
              label="Contractor SIN Number"
              fullWidth
              autoComplete="sin"
              variant="outlined"
              value={formData.sin}
              onChange={(e) =>
                setFormData({ ...formData, sin: e.target.value })
              }
              error={!!errors.sin}
              helperText={errors.sin}
              onBlur={() => handleBlur("sin")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="managerName"
              name="managerName"
              label="Manager's Name"
              fullWidth
              variant="outlined"
              value={formData.managerName}
              onChange={(e) =>
                setFormData({ ...formData, managerName: e.target.value })
              }
              error={!!errors.managerName}
              helperText={errors.managerName}
              onBlur={() => handleBlur("managerName")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="managerEmail"
              name="managerEmail"
              label="Manager's Email"
              fullWidth
              variant="outlined"
              value={formData.managerEmail}
              onChange={(e) =>
                setFormData({ ...formData, managerEmail: e.target.value })
              }
              error={!!errors.managerEmail}
              helperText={errors.managerEmail}
              onBlur={() => handleBlur("managerEmail")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="startDate"
              name="startDate"
              label="Job Start Date"
              fullWidth
              type="date"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              error={!!errors.startDate}
              helperText={errors.startDate}
              onBlur={() => handleBlur("startDate")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="duration-label">Contract Duration</InputLabel>
              <Select
                labelId="duration-label"
                id="duration"
                name="duration"
                value={formData.duration}
                label="Contract Duration"
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
              >
                <MenuItem value="3 months">3 months</MenuItem>
                <MenuItem value="6 months">6 months</MenuItem>
                <MenuItem value="1 year">1 year</MenuItem>
                <MenuItem value="3 years">3 years</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              required
              error={!!errors.payPeriod}
              variant="outlined"
            >
              <InputLabel id="payPeriod-label">Salary Pay Period</InputLabel>
              <Select
                labelId="payPeriod-label"
                id="payPeriod"
                name="payPeriod"
                value={formData.payPeriod}
                label="Salary Pay Period"
                onChange={(e) =>
                  setFormData({ ...formData, payPeriod: e.target.value })
                }
                onBlur={() => handleBlur("payPeriod")}
              >
                <MenuItem value="hourly">Hourly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
                <MenuItem value="yearly">Yearly</MenuItem>
              </Select>
              {errors.payPeriod && (
                <FormHelperText>{errors.payPeriod}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl
              fullWidth
              required
              error={!!errors.salaryType}
              variant="outlined"
            >
              <InputLabel id="salaryType">Salary Type</InputLabel>
              <Select
                labelId="salaryType"
                id="salaryType"
                name="salaryType"
                value={formData.salaryType}
                label="Salary Type"
                onChange={(e) =>
                  setFormData({ ...formData, salaryType: e.target.value })
                }
                onBlur={() => handleBlur("salaryType")}
              >
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
              </Select>
              {errors.salaryType && (
                <FormHelperText>{errors.salaryType}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="salary"
              name="salary"
              label="Pay Amount"
              fullWidth
              autoComplete="salary"
              variant="outlined"
              value={formData.salary}
              onChange={(e) =>
                setFormData({ ...formData, salary: e.target.value })
              }
              error={!!errors.salary}
              helperText={errors.salary}
              onBlur={() => handleBlur("salary")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TextField
                      select
                      value={formData.currency}
                      onChange={(e) =>
                        setFormData({ ...formData, currency: e.target.value })
                      }
                      variant="standard"
                      sx={{ m: 1, minWidth: 60 }}
                      SelectProps={{
                        disableUnderline: true,
                      }}
                      InputProps={{
                        style: { fontSize: "inherit", color: "inherit" },
                      }}
                    >
                      {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
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

          <PrimaryButton onClick={handleNext} sx={{ width: 200 }}>
            Continue
          </PrimaryButton>
        </Box>
      </form>
    </Container>
  );
}
