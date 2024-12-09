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
  Snackbar,
  SnackbarContent,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TextField from "@mui/material/TextField";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CustomPagination from "../components/CustomPagination";
import theme from "../theme/theme";

export default function EmployeeOnboardTable({
  companyId,
  handleJobTypeSelection,
}) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [showContractorData, setShowContractorData] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
          .filter((item) => item.isJoined === "Awaiting Join")
          .map((item) => {
            return {
              id: item._id,
              name: item.name,
              avatar: item.profilePicture,
              jobTitle: item.jobTitle,
              startDate: item.startDate,
              isJoined: item.isJoined,
              jobType: item.jobType,
              email: item.email,
              status: item.status,
              department: item.department,
              manager: item.managerName,
            };
          });
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

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (showContractorData
        ? row.jobType === "contractor"
        : row.jobType === "employee")
  );

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedRows = filteredRows.slice(startIndex, endIndex);

  const sendReminder = async (id) => {
    try {
      const response = await fetch(
        import.meta.env.VITE_API_ENDPOINT +
          `/companies/${companyId}/employees/${id}/email`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSnackbarOpen(true);
      } else {
        console.error("Failed to send reminder.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

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
    {
      field: "isJoined",
      headerName: "On-boarding Status",
      flex: 1,
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: "#FFEFCF",
            padding: 1,
            paddingLeft: 2,
            paddingRight: 2,
            borderRadius: 70,
            color: "#996600",
          }}
        >
          {params.value}
        </Box>
      ),
    },
    // { field: "isJoined", headerName: "On-boarding Status", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "jobType", headerName: "Employment Type", flex: 1 },
    {
      field: "email",
      headerName: "Required Action",
      flex: 1,
      renderCell: (cellValues) => {
        const employeeId = cellValues.row.id;
        return (
          <Button
            variant="contained"
            onClick={() => sendReminder(employeeId)}
            style={{
              backgroundColor: "#FFFFFF",
              color: "#FA6432",
              boxShadow: "none",
              paddingLeft: 0,
              marginLeft: 0,
            }}
          >
            Send Reminder <img src="../images/Email.svg" alt="email Icon" />
          </Button>
        );
      },
    },
  ];
  const mobileView = (
    <Box
      display={{ xs: "flex", md: "none" }}
      flexDirection="column"
      sx={{ pb: 0, mt: 0, pt: 2 }}
    >
      <Box pb={2} sx={{ textAlign: { xs: "center", sm: "center" } }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", fontSize: { sm: "20px", xs: "18px" } }}
        >
          On-Board Employee
        </Typography>
        <Typography
          color="#84858C"
          variant="p"
          sx={{ fontWeight: "light", fontSize: { sm: "15px", xs: "12px" } }}
        >
          Discover your team easily with our simple and accessible Employee
          Directory
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
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
            flexGrow: 1,
            display: "flex",
            justifyContent: "center", // Center content horizontally
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
                width: "10rem", // Adjust the width as necessary
                bgcolor: "#FA6432",
                position: "absolute",
                bottom: -1,
              }}
            ></Box>
          )}
        </Box>
        <Box
          sx={{
            cursor: "pointer",
            fontWeight: showContractorData ? "bold" : "normal",
            flexGrow: 1,
            display: "flex",
            justifyContent: "center", // Center content horizontally
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
                width: "10rem", // Adjust the width as necessary
                bgcolor: "#FA6432",
                position: "absolute",
                bottom: -1.5,
              }}
            ></Box>
          )}
        </Box>
      </Box>

      {rows
        .filter(
          (row) =>
            (showContractorData && row.jobType === "contractor") ||
            (!showContractorData && row.jobType === "employee")
        )
        .map((worker, index) => (
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
                <Typography
                  fontSize={14}
                  fontWeight={500}
                  mb={1}
                  style={{
                    backgroundColor: "#FFEFCF",
                    padding: 3,
                    paddingLeft: 22,
                    paddingRight: 22,
                    borderRadius: 70,
                    color: "#996600",
                  }}
                >
                  {worker.isJoined}
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
              <Button
                variant="contained"
                onClick={() => sendReminder(worker.id)}
                style={{
                  backgroundColor: "#FFFFFF",
                  color: "#FA6432",
                  boxShadow: "none",
                  paddingLeft: 0,
                  marginLeft: 0,
                }}
              >
                Send Reminder <img src="../images/Email.svg" alt="email Icon" />
              </Button>
            </CardContent>
          </Card>
        ))}
    </Box>
  );

  const desktopView = (
    <Box>
      <Box
        // mb={5}
        pb={2}
        id="sadsa"
        display={{ xs: "none", md: "block" }}
        style={{
          backgroundColor: theme.palette.grey[50],
        }}
      >
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
            onClick={() => {
              setShowContractorData(false);
              setPage(1);
            }}
          >
            <Typography sx={{ fontSize: "15px" }} component="span">
              Company Employee&nbsp;
            </Typography>
            <Typography
              component="span"
              sx={{ color: "grey", fontSize: "15px" }}
            >
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
            onClick={() => {
              setShowContractorData(true);
              setPage(1);
            }}
          >
            <Typography sx={{ fontSize: "15px" }} component="span">
              Contractors&nbsp;
            </Typography>
            <Typography
              component="span"
              sx={{ color: "grey", fontSize: "15px" }}
            >
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
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          style={{ marginBottom: 20, backgroundColor: "#FFFFFF" }}
        />
        <DataGrid
          rows={displayedRows}
          columns={columns}
          autoPageSize
          pagination={false}
          rowsPerPageOptions={[5, 10, 20]}
          className="custom-data-grid"
          sx={{
            height: "20rem",
            overflowY: "auto",
            border: "none",
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "white",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "white",
              paddingTop: 2,
              marginBottom: 4,
              border: "none",
            },
            "&.MuiDataGrid-root .MuiDataGrid-withBorderColor": {
              borderColor: "transparent",
            },
            "& .MuiDataGrid-columnHeader:first-child": {
              borderTopLeftRadius: "6px",
              borderBottomLeftRadius: "6px",
              backgroundColor: "white",
            },
            "& .MuiDataGrid-columnHeader:last-child": {
              borderTopRightRadius: "6px",
              borderBottomRightRadius: "6px",
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
      </Box>

      <CustomPagination
        count={Math.ceil(filteredRows.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
      />
    </Box>
  );

  return (
    <React.Fragment>
      <Container style={{ paddingLeft: 0, paddingRight: 0, maxWidth: "100%" }}>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <SnackbarContent
            message={
              <span style={{ display: "flex", alignItems: "center" }}>
                <CheckCircleIcon
                  style={{ marginRight: "8px", color: "#22C55E" }}
                />
                Email sent successfully！
                <span style={{ marginLeft: "8px" }}>🎉</span>
              </span>
            }
            style={{
              backgroundColor: "white",
              color: "black",
              justifyContent: "center",
              flexWrap: "wrap",
              display: "flex",
              boxShadow: "none",
              border: "1px solid #00732A",
              borderRadius: "8px",
              padding: "8px",
              maxWidth: "60vw",
              margin: "auto",
            }}
          />
        </Snackbar>
        <Box
          mb={5}
          pb={5}
          display={{ xs: "none", md: "block" }}
          position="relative"
        >
          {desktopView}
        </Box>
        <Box
          display={{ xs: "flex", md: "none" }}
          flexDirection="column"
          sx={{ pb: 15, mt: 2, pt: 2 }}
        >
          {mobileView}
        </Box>
      </Container>
    </React.Fragment>
  );
}
