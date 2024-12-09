import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Icon,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import InfoIcon from "@mui/icons-material/Info";
import useFetch from "../hooks/useFetch";
import { useTheme , useMediaQuery} from '@mui/material';
import { PrimaryButton } from "../theme/buttons";
import CelebrationIcon from '@mui/icons-material/Celebration';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CustomSpinner from "../assets/loader/customloader";

export default function SignpDepartmemtInfo({formData, setFormData}){
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [departments, setDepartments] = useState([""]);
    const [departmentErrors, setDepartmentErrors] = useState([]);

    const options = {
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(formData),
    }
    // console.log(formData);
    const {data, isLoading, error, fetchData} = useFetch(import.meta.env.VITE_API_ENDPOINT + `/companies`, "POST", options);
  

  const handleAddDepartment = () => {
    setDepartments([...departments, ""]);
    setDepartmentErrors([...departmentErrors, false]);
  };


  const handleChange = (index, event) => {
    const newDepartments = departments.map((dept, i) => i === index ? event.target.value : dept);
    setDepartments(newDepartments);
    setFormData({ ...formData, departments: newDepartments });

    if (event.target.value.trim() !== "") {
        const newErrors = [...departmentErrors];
        newErrors[index] = false;
        setDepartmentErrors(newErrors);
    }
  };

  const handleBlur = (index) => {
    if (departments[index].trim() === "") {
        const newErrors = [...departmentErrors];
        newErrors[index] = true; // Set error for this department
        setDepartmentErrors(newErrors);
    }
}

const handleRemoveDepartment = (index) => {
    const newDepartments = departments.filter((_, i) => i !== index);
    setDepartments(newDepartments);
    setFormData({ ...formData, departments: newDepartments });
};


const handleSubmit = async (e) => {
  e.preventDefault();
 await fetchData();
 if(!error && !isLoading){
  setOpen(true);
 }
  // console.log(formData); 
};

  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  const handlePrevious = () => {
    previous();
  };

  if (isLoading) {
    return <CustomSpinner/>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>

      <Box sx={{margin:"auto", width:isMobile?"100%":"70%"}}>

        <Alert 
          icon={<InfoIcon fontSize="inherit" />} 
          severity="info" 
          sx={{
            fontSize:"theme.typography.body1.fontSize",
            borderRadius: '1px solid ${theme.palette.secondary.main}',
            backgroundColor: 'rgba(112, 143, 255, 0.05)', 
            color: '#0A0B1A', 
            '.MuiAlert-icon': { color: '#708FFF' }, 
            marginBottom:"1rem"
          }}
        >
          <AlertTitle sx={{ fontWeight: 'bold', color: '#1071BC' }}>These departments represent the core areas of our Cleaning Services, please add at-least one department to proceed further</AlertTitle>
        </Alert>
        <Box
         sx={{
            maxHeight: "300px", 
            overflowY: "auto",
            padding: "48px",
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
            }
        }}>
            <form onSubmit={handleSubmit} style={{display : "flex", flexDirection: "column", gap:"2rem"}}>
                        {departments.map((department, index) => (
                            <Box key={index}
                            sx={{position:"relative"}}>
                                <TextField
                                    id={`department-${index}`}
                                    name="departments"
                                    label={`Department Name ${index + 1}`}
                                    value={department}
                                    onChange={(event) => handleChange(index, event)}
                                    fullWidth
                                    error={departmentErrors[index]}
                                    helperText={departmentErrors[index] ? "This field cannot be empty" : ""}
                                    onBlur={() => handleBlur(index)}
                                />
                                {departments.length > 1 && (
                                    <IconButton onClick={() => handleRemoveDepartment(index)} sx={{position:"absolute",
                                    right: "0",
                                    top: "50%", 
                                    transform: "translateY(-50%)",}}>
                                        <RemoveCircleOutlineIcon />
                                    </IconButton>
                                )}
                            </Box>
                        ))}
                        <Button startIcon={<AddCircleOutlineIcon />} onClick={handleAddDepartment} sx={{alignSelf:"flex-start", color:"primary.main", backgroundColor:"white"}}>
                            Add more department
                        </Button>
                        <PrimaryButton type="submit" sx={{ marginTop:"1rem",margin:"auto", width:"100%",display: "block"}} variant="contained">
                            Sign up
                        </PrimaryButton>
            
                    </form>
        </Box>

        <Dialog open={open} onClose={handleClose} sx={{textAlign:"center", padding:"2rem"}}>
                
                <DialogTitle sx={{fontSize:isMobile? theme.typography.h2Small:theme.typography.h2Large}}>{"Signup Successful!"}<CelebrationIcon sx={{color:theme.palette.primary.main, fontSize:isMobile? theme.typography.h2Small: theme.typography.h2Large}}/></DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{fontSize:isMobile? theme.typography.body2 : theme.typography.body1}}>
                        You have successfully set up your company. You are now ready to use the app.
                    </DialogContentText>
                </DialogContent>
                <DialogActions >
                    <PrimaryButton onClick={handleClose} autoFocus sx={{textAlign:"center" , margin:"auto"}}>
                        Launch App <RocketLaunchIcon sx={{color:"white"}}/>
                    </PrimaryButton>
                </DialogActions>
        </Dialog>
      </Box>
    </>
  )
};   
