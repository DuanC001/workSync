import React , {useState} from "react";
import {TextField,InputLabel, Button,Box,Typography,FormControl} from "@mui/material";
import {useDispatch} from 'react-redux';
import { PrimaryButton } from "../theme/buttons";
import { useTheme, useMediaQuery } from '@mui/material';


export default function SignUpCompanyInfo({formData, setFormData, next , previous}){

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [errors, setErrors] = useState({}); 

    const dispatch = useDispatch();
    
    

    const validateSize = (size) => {
        return !isNaN(size) && Number(size) > 0;
    };
    
    const validateWebsite = (website) => {
        const re = /^https:\/\/www\.[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i;
        return re.test(String(website).toLowerCase());
    };
    
    const validateForm = () => {
        let valid = true;

        const requiredFields = [
          "name",
          "address",
          "phone",
          "size",
          "website"
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
        } if (field === "size" && validateSize(formData.size)) {
            delete newErrors.size; 
        } else if (field === "website" && validateWebsite(formData.website)) {
            delete newErrors.website; 
        }
        else {
          delete newErrors[field];
        }
        setErrors(newErrors);
      };  


    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        const newErrors = {};
        let formIsValid = true;
    

        if (!formData.name) {
            newErrors.name = "Company name is required";
            formIsValid = false;
        } else if (formData.name.length < 1) {
            newErrors.name = "Company name must be at least 1 character long";
            formIsValid = false;
        }
    
    
        if (!formData.address) {
            newErrors.address = "Address is required";
            formIsValid = false;
        }
    
        if (!formData.phone) {
            newErrors.phone = "Phone is required";
            formIsValid = false;
        }

        if (!formData.size) {
            newErrors.size = "Company size is required";
            formIsValid = false;
        } else if (!validateSize(formData.size)) {
            newErrors.size = "Size must be a number greater than 0";
            formIsValid = false;
        }
    
       
        if (!formData.website) {
            newErrors.website = "Website is required";
            formIsValid = false;
        } else if (!validateWebsite(formData.website)) {
            newErrors.website = "Please enter a valid website URL, including 'https://www.'";
            formIsValid = false;
        }
    
        
        setErrors(newErrors);
    
       
        if (formIsValid) {
            next();
        }
    };
    

    const handlePrevious = () => {
        previous();
    }

    return (
        <>

        <Box sx={{display : "flex", flexDirection: "column", maxHeight:"430px", overflowY:"auto",
            paddingRight:"1rem",
            margin:"auto",
            width:isMobile?"100%":"70%",
            '&::-webkit-scrollbar': {
                width: '0.4em'
            },
            '&::-webkit-scrollbar-track': {
                // boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                borderRadius: '10px'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                borderRadius: '10px'
                // outline: '1px solid slategrey'
            }}}>
            <FormControl sx={{display:"grid", gap:"1rem" , padding:"1rem"}}>
                {/* <InputLabel htmlFor="companyname-input">Company Name</InputLabel> */}
                <TextField
                    id = "companyname-input"
                    label="Company Name"
                    name = "name"
                    value = {formData.name}
                    onChange = {handleChange}
                    required
                    onBlur={() => handleBlur("name")}
                    error={!!errors.name}
                    helperText={errors.name}
                    autoFocus
                />
                {/* <InputLabel htmlFor="companyaddress-input">Company Address</InputLabel> */}
                <TextField
                    id = "companyaddress-input"
                    label="Company Address"
                    name = "address"
                    value = {formData.address}
                    onChange = {handleChange}
                    required
                    onBlur={() => handleBlur("address")}
                    error={!!errors.address}
                    helperText={errors.address}
                />
                {/* <InputLabel htmlFor="companysize-input">Company Size</InputLabel> */}
                <TextField
                    id=" companysize-input"
                    label="Company Size"
                    name = "size"
                    value = {formData.size}
                    onChange = {handleChange}
                    error={!!errors.size}
                    helperText={
                        <span style={{ color: 'grey' }}>
                            {errors.size || "Please enter a positive number."}
                    </span>
                    }
                    onBlur={() => handleBlur("size")}
                    required
                />
                {/* <InputLabel htmlFor="companyphone-input">Company Phone</InputLabel> */}
                <TextField
                    id="companyphone-input"
                    label="Company Phone"
                    name = "phone"
                    value = {formData.phone}
                    onChange = {handleChange}
                    required
                    onBlur={() => handleBlur("phone")}
                    error={!!errors.phone}
                    helperText={errors.phone}
                />
                {/* <InputLabel htmlFor="companywebsite-input">Website</InputLabel> */}
                <TextField
                    id= "companywebsite-input"
                    label=" Company Website"
                    name = "website"
                    value = {formData.website}
                    onChange = {handleChange}
                    required
                    error={!!errors.website}
                    helperText={errors.website || "Format: https://www.something.com"}
                    onBlur={() => handleBlur("website")}
    
                />
                <PrimaryButton onClick = {handleNext} variant="contained" sx={{margin:"auto", width:"100%", marginTop:"1rem", marginBottom:"1rem"}}>
                    Continue
                </PrimaryButton>
                <Button onClick = {handlePrevious}  sx={{ marginTop:"1rem",margin:"auto", width:"100%", backgroundColor:"white" , color:"primary.main"}} >
                    Back
                </Button>
            </FormControl>
        </Box>


        </>
    )

    
}