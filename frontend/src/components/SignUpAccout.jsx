import React , {useState} from "react";
import {TextField, Button , Box, InputAdornment, IconButton, FormControl} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { PrimaryButton } from "../theme/buttons";
import theme from "../theme/theme";
import { useTheme,useMediaQuery } from '@mui/material';
// import { validateEmail, passwordHelperText} from "../utils/validator";



export default function SignUpAccount({formData, setFormData, next}){
    
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({}); 

    const validateName = (username) => {
        const re = /^[A-Za-z\s]{2,}$/;
        return re.test(String(username).trim());
    };
    

    const validateEmail = (email) => {
        // email regex pattern for validation
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
        return re.test(String(email).toLowerCase());
    }; 
    
    
    const passwordHelperText = () => {
        if (!formData.password) return "";
        if (errors.password) return errors.password;
        if (formData.password.length < 8) return "Password must be at least 8 characters.";
    };
    
    const validateForm = () => {

        let valid = true;

        const requiredFields = [
          "username",
          "email",
          "password",
        ];
    
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

        } else if (field === "name" && !validateName(formData.username)) {
            newErrors.name = "Name must be at least 2 characters long and contain only letters and spaces.";
        }
        else {
          delete newErrors[field];
        }
        setErrors(newErrors);
      };  


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleNext = () => {
        let newErrors = {};
        let isFormValid = true;
    
    
        if (!formData.username) {
            newErrors.username = "Name is required";
            isFormValid = false;
        } else if (!validateName(formData.username)) {
            newErrors.username = "Name must be at least 2 characters long and contain only letters and spaces.";
            isFormValid = false;
        }
    
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
            next();
        }
    };
    


    return(
        <>
            <Box sx={{display : "flex", flexDirection: "column", margin:"auto", width:isMobile?"100%":"70%"}}>
                {/* <InputLabel htmlFor="name-input">Name</InputLabel> */}
                <FormControl sx={{display:"grid", gap:"1rem"}}>
                    <TextField
                        // error={Boolean(errors.name)}
                        id= "name-input"
                        label="Name"
                        name = "username"
                        value = {formData.username}
                        onChange = {handleChange}
                        required
                        error={!!errors.username}
                        helperText={errors.username}
                        onBlur={() => handleBlur("username")}
                    />
                    {/* <InputLabel htmlFor="email-input">Email</InputLabel> */}
                    <TextField
                        // error={Boolean(errors.email)}
                        id = "email-input"
                        label="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        error={!!errors.email}
                        helperText={errors.email}
                        onBlur={() => handleBlur("email")}
                    />
                    {/* <InputLabel htmlFor="password-input">Password</InputLabel> */}
                    <TextField
                        // error={Boolean(errors.password)}
                        id="password-input"
                        label="Min 8 character Password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
                        required
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
                        error={!!errors.password}
                        helperText={
                        <span style={{ color: 'red' }}>
                            {passwordHelperText() || errors.password}
                        </span>
                        }
                        onBlur={() => handleBlur("password")}

                    />
                    
                    <PrimaryButton onClick = {handleNext} sx={{color:"primary", margin: "auto", width:"100%" ,marginTop:"1rem"}} variant="contained">
                        Continue
                    </PrimaryButton>
                </FormControl>
                       
            </Box>
        </>
    )
}