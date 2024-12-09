import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  InputBase,
  IconButton,
} from "@mui/material";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { selectEmployee, addEmployees } from "../redux/employee/employeeSlice";
import { useNavigate } from "react-router-dom";

const EmployeeTable = ({ companyId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employees = useSelector(selectEmployee);

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const url =
          import.meta.env.VITE_API_ENDPOINT +
          `/companies/${companyId}/employees`;
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const jsonResponse = await response.json();

          dispatch(addEmployees(jsonResponse));
        } else {
          console.error("Server responded with status:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    asyncFn();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        bgcolor: "#f4f5f7",
        height: "500px",
        maxWidth: "lg",
        borderRadius: "8px",
      }}
    >
      <Box sx={{ overflowX: "auto" }}>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Manager</TableCell>
                <TableCell align="right">Department</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell component="th" scope="row">
                    {employee.name}
                  </TableCell>
                  <TableCell align="right">{employee.jobTitle}</TableCell>
                  <TableCell align="right">{employee.managerName}</TableCell>
                  <TableCell align="right">{employee.department}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="contained"
                      disabled={employee.status !== "active"}
                      onClick={() =>
                        navigate(`/offboard-form/${employee._id}`, {
                          state: { name: employee.status },
                        })
                      }
                    >
                      {employee.status === "active" ? "Offboard" : "Initiated"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};
export default EmployeeTable;
