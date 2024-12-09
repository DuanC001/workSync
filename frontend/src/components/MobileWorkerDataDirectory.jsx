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

const MobileWorkertDataDirectory = ({ searchQuery, filterStatus }) => {
  const navigate = useNavigate();
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

  const handleShowDetails = ({_id: employeeId}) => {
    navigate(`/employee/${employeeId}`);
  };

  const statusColor = {
    active: "#00732a",
    "inactive": "#990000",
  };
  const statusBackground = {
    active: "#c5f2d5",
    "inactive": "#ffe5ef",
  };

  return (
    <Box
      sx={{
        display: { xs: "flex", sm: "flex", md: "none" },
        flexDirection: "column",
      }}
    >
      {workerData.map((worker, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            mb: 2,
            boxShadow: "none",
            justifyContent: "space-between",
          }}
        >
          <CardContent>
            <Stack
              sx={{
                textAlign: "start",
              }}
            >
              <Typography color={"gray"} fontSize={15}>
                Employee Name:
              </Typography>

              <Typography fontSize={20} fontWeight={500} pb={1}>
                {worker.name}
              </Typography>
              <Typography 
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 3,
                  width: "fit-content",
                  py: 0.5,
                  px: 1.5,
                  color: statusColor[worker.status],
                  bgcolor: statusBackground[worker.status],
                }}
              >
                {worker.status} 
              </Typography>
            </Stack>
            <Stack sx={{}}>
              <Typography color={"gray"} fontSize={15} pt={1}>
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
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <EmployeeImage width={80} height={80} img={`${worker.profilePicture}`} />
            <Button
              onClick={() => handleShowDetails(worker)}
              variant="inherent"
              sx={{
                textTransform: "none",
                width: "max-content",
                fontSize: "12px",
                border: "1.5px solid black",
                color: "black",
                bgcolor: "transparent",
              }}
            >
              View Employee
            </Button>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MobileWorkertDataDirectory;
