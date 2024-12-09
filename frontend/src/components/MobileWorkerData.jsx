import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Button,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import { selectEmployee } from "../redux/employee/employeeSlice";
import EmployeeImage from "./EmployeeImage";
import { useNavigate } from "react-router-dom";

const MobileWorkerData = ({ searchQuery, filterStatus }) => {
  const navigate = useNavigate()
  const employees = useSelector(selectEmployee);
  const renderActionButton = (status) => {
    return status !== "active" ? "Initiated" : "Offboard";
  };

  const workerData = employees.filter(({ jobType, name, status }) => {
    return (
      jobType !== "contractor" &&
      name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filterStatus ? status === filterStatus : true)
    );
  });
  
  const handleButtonClick = ({status, _id: employeeId}) => {
    if (status === "active") {
      navigate(`/offboard-form/${employeeId}`);
    }
  };

  console.log('workerData', workerData)
  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "flex", md: "none" },
        flexDirection: "column",
      }}
    >
      {workerData.map((worker, index) => (
        <Card key={index} sx={{ display: "flex", mb: 2, boxShadow: "none"  , justifyContent:'space-between'}}>
          <CardContent>
            <Stack sx={{}}>
              <Typography color={"gray"} fontSize={15}>
                Employee Name:
              </Typography>
              <Typography fontSize={20} fontWeight={500} pb={1}>
                {worker.name}
              </Typography>
            </Stack>
            <Stack sx={{}}>
              <Typography color={"gray"} fontSize={15}>
                Department:
              </Typography>
              <Typography fontSize={20} fontWeight={500} pb={1}>
                {worker.department}
              </Typography>
            </Stack>
            <Stack sx={{}}>
              <Typography color={"gray"} fontSize={15}>
                Role:
              </Typography>
              <Typography fontSize={20} fontWeight={500} pb={1}>
                {worker.jobTitle}
              </Typography>
            </Stack>
            <Stack sx={{}}>
              <Typography color={"gray"} fontSize={15}>
                Employee Since:
              </Typography>
              <Typography fontSize={20} fontWeight={500} pb={1}>
                {worker.startDate}
              </Typography>
            </Stack>
            <Stack sx={{}}>
              <Typography color={"gray"} fontSize={15}>
                Manager:
              </Typography>
              <Typography fontSize={20} fontWeight={500} pb={1}>
                {worker.managerName}
              </Typography>
            </Stack>
          </CardContent>
          <CardContent sx={{display:'flex',flexDirection:'column' , justifyContent:'space-between', alignItems:'center'}}>
            {worker.profilePicture ? <EmployeeImage width={80} height={80} img={`${worker.profilePicture}`} /> : null}
            <Button
              onClick={() => handleButtonClick(worker)}
              variant="inherent"
              sx={{
                textTransform: "none",
                px: 3,
                ...(worker.status !== "active"
                  ? {
                      border: "none",
                      bgcolor: "#FFEFCF",
                      borderRadius: 5,
                      color: "black",
                      opacity: 1,
                      width:'max-content',
                    }
                  : {
                      border: "1.5px solid black",
                      bgcolor: "transparent",
                      color: "black",
                    }),
              }}
              disabled={worker.status !== "active"}
            >
              {renderActionButton(worker.status)}
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MobileWorkerData;
