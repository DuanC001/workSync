import React, { useState, useEffect } from "react";
// import { Link as RouterLink } from 'react-router-dom';
// import {Link} from '@mui/material'
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  Button,
  IconButton,
  TextField,
  InputLabel,
  InputAdornment,
  Typography,
  FormControl,
} from "@mui/material";
// import Form from "@mui/material/Form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
// From Redux
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/company/companySlice";
import { useDispatch } from "react-redux";
import { flexbox, useMediaQuery, width } from "@mui/system";
import { PrimaryButton } from "../theme/buttons";
import { AlertErrorStyled } from "../theme/alerterror";


export default function LoginForm({ formData, setFormData }) {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [errors, setErrors] = useState({});
  // const [formValid, setFormValid] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  //   Redux
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();

  const validateEmail = (email) => {
    // email regex pattern for validation
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

  const passwordHelperText = () => {
    if (!formData.password) return "";
    if (errors.password) return errors.password;
    if (formData.password.length < 8)
      return "Password must be at least 8 characters.";
  };

  const validateForm = () => {
    let valid = true;

    const requiredFields = ["email", "password"];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        valid = false;
      }
    });

    return valid;
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

  const handleLogin = async (e) => {
    e.preventDefault();

    let newErrors = {};
    let isFormValid = true;

    if (!formData.email) {
      newErrors.email = "Email is required";
      isFormValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isFormValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isFormValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
      isFormValid = false;
    }

    setErrors(newErrors);

    if (isFormValid) {
      handleLoginSuccess();
    }
  };

  const handleLoginSuccess = async () => {
    try {
      dispatch(signInStart);
      const res = await fetch(import.meta.env.VITE_API_ENDPOINT + "/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        dispatch(signInSuccess(data));

        // naviagt to dashboard
        setTimeout(() => {
          navigate("/dashboard", { state: { handleLoginSuccess: true } });
        }, 1000);
      } else {
        console.error("Login failed:");
        const errorData = await res.json();
        setLoginError(
          errorData.message ||
            "Login failed. Please check your credentials and try again."
        );
        dispatch(signInFailure());
        return;
      }
    } catch (err) {
      console.error("Login request failed:", err);
      setLoginError(
        "Login failed. Please check your credentials and try again."
      );
      setTimeout(() => setLoginError(""), 3000);
      dispatch(signInFailure());
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        overflow: "hidden",
        paddingLeft: isMobile ? "0" : "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          height: isMobile ? "100vh" : "100%",
        }}
      >
        <Box sx={{ flex: "1", display: isMobile ? "none" : "block" }}>
          <img
            src="../../images/login-image.svg"
            alt="login image"
            style={{
              borderRadius: "2rem",
              transform: "scaleX(-1)",
              height: "97vh",
              margin: "auto",
            }}
          />
        </Box>

        <Box sx={{ flex: "1 0 50%" }}>
          <Box
            sx={{
              textAlign: "center",
              marginBottom: isMobile ? "3rem" : "7rem",
            }}
          >
            <Link to="/">
              <img src="../../images/logo.png" alt="workSync logo" />
            </Link>
          </Box>
          <Box sx={{ margin: "2rem", textAlign: "center" }}>
            <Typography
              variant={isMobile ? "h2Small" : "h2Large"}
              sx={{ textAlign: "center", margin: "1rem" }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              sx={{ textAlign: "center" }}
            >
              Simplify your HR tasks with Worksynk's effortless 14-day free
              trial.
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              margin: "auto",
              width: "70%",
            }}
          >
            <FormControl sx={{ display: "grid", gap: "1rem" }}>
              <TextField
                id="email-input"
                name="email"
                label="Business Email"
                value={formData.email}
                onChange={handleChange}
                required
                error={!!errors.email}
                helperText={errors.email}
                onBlur={() => handleBlur("email")}
              />
              <TextField
                id="password-input"
                name="password"
                label="Min 8 character password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                onBlur={() => handleBlur("password")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                required
              />

              {loginError && (
                <AlertErrorStyled
                  severity="error"
                  sx={{
                    vertical: "top",
                    top: "0",
                    horizontal: isMobile ? "center" : "right",
                  }}
                >
                  {loginError}
                </AlertErrorStyled>
              )}

              <PrimaryButton
                onClick={handleLogin}
                // disabled={!formValid}
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  margin: "auto",
                  width: "100%",
                  marginTop: "1rem",
                }}
                variant="contained"
              >
                Login
              </PrimaryButton>
            </FormControl>

            <Typography
              sx={{ margin: "1rem", textAlign: "center" }}
              variant="body1"
            >
              New to Worksynk?
              <Link
                to="/sign-up"
                style={{
                  color: "#FF7A58",
                  paddingLeft: "2px",
                  textDecoration: "none",
                  "&hover": { textDecoration: "none" },
                }}
              >
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
