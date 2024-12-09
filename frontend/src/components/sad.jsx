import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField";

export default function EmployeeOnboardTable({
  companyId,
  handleJobTypeSelection,
}) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [showContractorData, setShowContractorData] = useState(false);

  useEffect(() => {
    const url =
      import.meta.env.VITE_API_ENDPOINT + `/companies/${companyId}/employees`;
    fetch(url, {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredAndMappedData = data
          .filter((item) => new Date(item.startDate) >= today)
          .map((item) => ({
            id: item.id, // Assuming each employee has a unique ID
            name: item.name,
            avatar: item.profilePicture,
            jobTitle: item.jobTitle,
            startDate: item.startDate,
            jobType: item.jobType,
            email: item.email,
            status: item.status,
            department: item.department,
            manager: item.managerName,
            daysToJoin: Math.round(
              (new Date(item.startDate) - today) / (1000 * 60 * 60 * 24)
            ),
          }));
        setRows(filteredAndMappedData);
      })
      .catch((error) => console.error("There was an error!", error));
  }, [companyId]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const filteredRows = rows.filter((row) =>
    row.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: "name",
      headerName: "Employee Name",
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            alt={params.row.name}
            src={params.row.avatar}
            sx={{ width: 30, height: 30 }}
          />
          <Typography>{params.row.name}</Typography>
        </Box>
      ),
    },
    { field: "jobTitle", headerName: "Job Title", flex: 1 },
    { field: "daysToJoin", headerName: "Days to Join", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "jobType", headerName: "Employment Type", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
  ];

  const mobileView = (
    <Box display={{ xs: "flex", md: "none" }} flexDirection="column">
      <Box sx={{ textAlign: { xs: "center" }, padding: 2 }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", fontSize: { sm: "20px", xs: "18px" } }}
        >
          Off-Board Employee
        </Typography>
        <Typography
          color="#84858C"
          variant="p"
          sx={{ fontWeight: "light", fontSize: { sm: "15px", xs: "12px" } }}
        >
          Streamlining Processes and Support for Off-Board Employees
        </Typography>
      </Box>
      {rows.map((worker, index) => (
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
                Employee type:
              </Typography>
              <Typography fontSize={20} fontWeight={500} pb={1}>
                {worker.jobType}
              </Typography>
            </Stack>
            <Stack sx={{}}>
              <Typography color={"gray"} fontSize={15}>
                Manager:
              </Typography>
              <Typography fontSize={20} fontWeight={500} pb={1}>
                {worker.manager}
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
            <Avatar sx={{ width: 80, height: 80 }} src={`${worker.avatar}`} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const desktopView = (
    <Box display={{ xs: "none", md: "block" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        mb={2}
        pt={2}
        style={{
          paddingBottom: "20px",
        }}
      >
        <div>
          <Typography variant="h3" gutterBottom>
            On-Board Employee
          </Typography>
          <Typography variant="body1">
            Discover your team easily with our simple and accessible Employee
            Directory
          </Typography>
        </div>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#FA6432",
            color: "#FFFFFF",
            borderRadius: "4px",
          }}
          onClick={() => handleJobTypeSelection(0)}
        >
          Add New Employees
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          gap: 3,
          alignItems: "center",
          paddingBottom: 2,
          borderBottom: "0.8px solid grey",
          position: "relative",
          marginBottom: 3,
        }}
      >
        <Box
          sx={{
            cursor: "pointer",
            fontWeight: showContractorData ? "normal" : "bold",
          }}
          onClick={() => setShowContractorData(false)}
        >
          <Typography sx={{ fontSize: "15px" }} component="span">
            Company Employee&nbsp;
          </Typography>
          <Typography component="span" sx={{ color: "grey", fontSize: "15px" }}>
            ({rows.filter((row) => row.jobType === "employee").length})
          </Typography>
          {!showContractorData && (
            <Box
              sx={{
                height: "2px",
                width: "10rem",
                bgcolor: "#FA6432",
                position: "absolute",
                bottom: -1,
                left: 2,
              }}
            ></Box>
          )}
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            fontWeight: showContractorData ? "bold" : "normal",
          }}
          onClick={() => setShowContractorData(true)}
        >
          <Typography sx={{ fontSize: "15px" }} component="span">
            Contractors&nbsp;
          </Typography>
          <Typography component="span" sx={{ color: "grey", fontSize: "15px" }}>
            ({rows.filter((row) => row.jobType === "contractor").length})
          </Typography>
          {showContractorData && (
            <Box
              sx={{
                height: "2px",
                width: "8rem",
                bgcolor: "#FA6432",
                position: "absolute",
                bottom: -1.5,
                left: "11rem",
              }}
            ></Box>
          )}
        </Box>
      </Box>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 20, backgroundColor: "#FFFFFF" }}
      />
      <DataGrid
        rows={
          showContractorData
            ? rows.filter((row) => row.jobType === "contractor")
            : rows.filter((row) => row.jobType === "employee")
        }
        columns={columns}
        pageSize={rowsPerPage}
        page={page - 1}
        rowCount={
          showContractorData
            ? rows.filter((row) => row.jobType === "contractor").length
            : rows.filter((row) => row.jobType === "employee").length
        }
        paginationMode="server"
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 20]}
        onPageSizeChange={handleChangeRowsPerPage}
        getRowId={(row) => rows.indexOf(row)}
        sx={{
          height: "53vh",
          overflowY: "auto",
          cursor: "pointer",
          border: "none",
          "& .MuiDataGrid-row:hover": {
            backgroundColor: "white",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "white",
            marginBottom: 4,
            border: "none",
          },
          "&.MuiDataGrid-root .MuiDataGrid-withBorderColor": {
            borderColor: "transparent",
          },
          "& .MuiDataGrid-columnHeader:first-child": {
            borderTopLeftRadius: "2rem",
            borderBottomLeftRadius: "1.2rem",
            backgroundColor: "white",
          },
          "& .MuiDataGrid-columnHeader:last-child": {
            borderTopRightRadius: "2rem",
            borderBottomRightRadius: "1.2rem",
            backgroundColor: "white",
          },
          "& .MuiDataGrid-row": {
            backgroundColor: "white",
            marginBottom: 2,
            borderRadius: 3,
            border: "none",
            "& .MuiDataGrid-root": {
              boxShadow: "none",
              border: "none",
              borderColor: "none",
              borderStyle: "none",
            },
            "& .MuiDataGrid-cell": {
              border: "none",
            },
          },
        }}
      />

      <Pagination
        count={Math.ceil(filteredRows.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        style={{ marginTop: 20 }}
      />
    </Box>
  );

  return (
    <React.Fragment>
      {mobileView}
      {desktopView}
    </React.Fragment>
  );
}
