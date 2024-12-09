import React from "react";
import {
  Container,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Button,
} from "@mui/material";
import AvatarUpload from "./AvatarUpload";
import {
  PrimaryButton,
  SecondaryButton,
  FloatingButton,
} from "../theme/buttons";
import theme from "../theme/theme";

export default function EmployeeInformationForm({
  formData,
  setFormData,
  next,
  handleJobTypeSelection,
}) {
  const [errors, setErrors] = React.useState({});

  const handleNext = () => {
    validateForm();

    if (isValid && Object.keys(errors).length === 0) {
      next();
    }
  };

  let isValid = true;
  const validateForm = () => {
    const requiredFields = [
      "name",
      "email",
      "address",
      "phone",
      "education",
      "allergies",
    ];

    if (formData.profilePicture) {
      delete errors.profilePicture;
      isValid = true;
    }
    if (!formData.profilePicture) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        profilePicture: "Profile picture is required",
      }));
      isValid = false;
    }

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
    } else if (field === "email" && !validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else {
      delete newErrors[field];
    }
    setErrors(newErrors);
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4}}>
      <AvatarUpload formData={formData} setFormData={setFormData} />
      {errors.profilePicture && (
        <p
          style={{
            color: "red",
            textAlign: "center",
            marginTop: 0,
            marginBottom: 11,
          }}
        >
          {errors.profilePicture}
        </p>
      )}
      <form>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Employee Name"
              fullWidth
              autoComplete="name"
              variant="outlined"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={!!errors.name}
              helperText={errors.name}
              onBlur={() => handleBlur("name")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="email"
              name="email"
              label="Employee Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
              onBlur={() => handleBlur("email")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="phone"
              name="phone"
              label="Employee Phone Number"
              fullWidth
              autoComplete="phone"
              variant="outlined"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              error={!!errors.phone}
              helperText={errors.phone}
              onBlur={() => handleBlur("phone")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="education"
              name="education"
              label="Employee Education"
              fullWidth
              autoComplete="education"
              variant="outlined"
              value={formData.education}
              onChange={(e) =>
                setFormData({ ...formData, education: e.target.value })
              }
              error={!!errors.education}
              helperText={errors.education}
              onBlur={() => handleBlur("education")}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              name="address"
              label="Employee Address"
              fullWidth
              autoComplete="address"
              variant="outlined"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              error={!!errors.address}
              helperText={errors.address}
              onBlur={() => handleBlur("address")}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="province">Province</InputLabel>
              <Select
                labelId="province"
                id="province"
                name="province"
                label="province"
                value={formData.province}
                onChange={(e) =>
                  setFormData({ ...formData, province: e.target.value })
                }
                variant="outlined"
              >
                <MenuItem value="Alberta">Alberta</MenuItem>
                <MenuItem value="British Columbia">British Columbia</MenuItem>
                <MenuItem value="Manitoba">Manitoba</MenuItem>
                <MenuItem value="New Brunswick">New Brunswick</MenuItem>
                <MenuItem value="Newfoundland and Labrador">
                  Newfoundland and Labrador
                </MenuItem>
                <MenuItem value="Nova Scotia">Nova Scotia</MenuItem>
                <MenuItem value="Ontario">Ontario</MenuItem>
                <MenuItem value="Prince Edward Island">
                  Prince Edward Island
                </MenuItem>
                <MenuItem value="Quebec">Quebec</MenuItem>
                <MenuItem value="Saskatchewan">Saskatchewan</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="country">Country</InputLabel>
              <Select
                labelId="country"
                id="country"
                name="country"
                label="Country"
                value={formData.country}
                onChange={(e) =>
                  setFormData({ ...formData, country: e.target.value })
                }
                variant="outlined"
              >
                <MenuItem value="Canada">Canada</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="allergies"
              name="allergies"
              label="Allergies"
              fullWidth
              variant="outlined"
              value={formData.allergies}
              onChange={(e) =>
                setFormData({ ...formData, allergies: e.target.value })
              }
              error={!!errors.allergies}
              helperText={errors.allergies}
              onBlur={() => handleBlur("allergies")}
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
          <SecondaryButton
            onClick={() => handleJobTypeSelection(0)}
            sx={{ width: 200, mr: 2 }}
          >
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
