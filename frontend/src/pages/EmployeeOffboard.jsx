import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, IconButton, Alert } from "@mui/material";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { ArrowForwardIos } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import EmployeeImage from "../components/EmployeeImage";
import MobileWorkerData from "../components/MobileWorkerData";
import MobileContractData from "../components/MobileContractData";
import CustomPagination from "../components/CustomPagination";
import { useDispatch, useSelector } from "react-redux";
import { selectEmployee, addEmployees } from "../redux/employee/employeeSlice";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import dayjs from "dayjs";
import { EmployeeListUnavailableIcon } from "../components/icons";

const EmployeeOffBoarding = () => {
  const navigate = useNavigate();
  const renderActionButton = (status) => {
    return status !== "active" ? "Initiated" : "Offboard";
  };

  const handleButtonClick = ({ _id: employeeId, status }) => {
    if (status === "active") {
      navigate(`/offboard-form/${employeeId}`);
    }
  };

  const { currentCompany } = useSelector((state) => state.company);
  const { _id: companyId } = currentCompany || {};

  const dispatch = useDispatch();
  const employees = useSelector(selectEmployee);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Or any other default page size you prefer
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

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

  const workerData = employees.filter(
    ({ jobType }) => jobType !== "contractor"
  );
  const contractorData = employees.filter(
    ({ jobType }) => jobType === "contractor"
  );

  const columns = [
    {
      field: "name",
      headerName: "Employee Name",
      headerAlign: "left",
      flex: 1,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "left", marginLeft: 15 }}>
          <EmployeeImage img={params.row.profilePicture} />
          <Typography variant="body2" style={{ marginLeft: 10 }}>
            {params.row.name}
          </Typography>
        </div>
      ),
    },
    {
      field: "department",
      headerName: "Department",
      headerAlign: "left",
      flex: 1,
    },
    { field: "jobTitle", headerName: "Role", headerAlign: "left", flex: 1 },
    {
      field: "startDate",
      headerName: "Employee Since",
      headerAlign: "left",
      flex: 1,
      renderCell: (params) => dayjs(params.value).format("MMM DD, YYYY"), // Use renderCell to format the date
    },
    {
      field: "managerName",
      headerName: "Manager",
      headerAlign: "left",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      headerAlign: "left",
      flex: 1,
      renderCell: (params) => {
        return (
          <Box
            onClick={() => handleButtonClick(params.row)}
            sx={{
              display: "flex",
              alignItems: "left",
              justifyContent: "space-between",
              cursor: "pointer",
              gap: 2,
            }}
          >
            <Button
              variant="inherent"
              disabled={params.row.status !== "active"}
              sx={{
                textTransform: "none",
                px: 3,
                color: "black",
                // Conditional styles based on the status
                ...(params.row.status !== "active"
                  ? {
                      border: "none",
                      bgcolor: "#FFEFCF", // Background color when not hovering
                      borderRadius: 5,
                      opacity: 1,
                      "&:hover": {
                        bgcolor: "#0A0B1A",
                        opacity: 0.8,
                        color: "white",
                      },
                    }
                  : {
                      bgcolor: "transparent", // Background color when not hovering
                      border: "1.5px solid black",
                      "&:hover": {
                        bgcolor: "#0A0B1A",
                        opacity: 0.8,
                        color: "white",
                      },
                    }),
              }}
            >
              {renderActionButton(params.row.status)}
            </Button>
            <IconButton disabled={params.row.status !== "active"}>
              <ArrowForwardIos sx={{ color: "black", fontSize: "13px" }} />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const [showContractorData, setShowContractorData] = useState(false);

  const applyFilters = (data) =>
    data.filter((employee) => {
      const matchesSearchQuery = employee.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesStatusFilter = filterStatus
        ? employee.status === filterStatus
        : true;
      return matchesSearchQuery && matchesStatusFilter;
    });

  const filteredData = showContractorData
    ? applyFilters(contractorData)
    : applyFilters(workerData);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // CustomNoRowsOverlay
  const CustomNoRowsOverlay = () => {
    const navigate = useNavigate();

    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <EmployeeListUnavailableIcon
          sx={{
            fontSize: { xs: 40, sm: 60 }, // Smaller icon on xs screens
            color: "primary.main",
          }}
        />
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: { xs: "0.875rem", sm: "1rem" }, // Smaller font size on xs screens
          }}
        >
          No employee found.
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/employee-onboard")}
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Smaller button font size on xs screens
          }}
        >
          Onboard New Employee
        </Button>
      </Box>
    );
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return currentCompany ? (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Employee Offboard</title>
        <meta name="description" content="Employee Offboard Page" />
      </Helmet>
      <Box
        sx={{
          bgcolor: "#F5F5F5",
          height: { sm: "85vh", xs: "85vh", md: "82vh" },
          width: { sm: "98%", xs: "100%" },
          overflowY: "scroll",
          "&::webkit-scrollbar": {
            display: "none",
          },
          display: "flex",
          flexDirection: "column",
          gap: { sm: 1, xs: 1, md: 1 },
          borderRadius: 3,
          p: 2,
        }}
      >
        <Box sx={{ textAlign: { xs: "center", sm: "start", md: "start" } }}>
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
        <Box
          sx={{
            display: "flex",
            width: "100%",
            gap: 3,
            alignItems: "left",
            paddingBottom: 2,
            borderBottom: "0.8px solid grey",
            position: "relative",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
            }}
            onClick={() => setShowContractorData(false)}
          >
            <Typography
              sx={{
                fontSize: "15px",
                "&:hover": {
                  color: "#CC5229",
                },
              }}
              component="span"
            >
              Company Employee&nbsp;
            </Typography>
            <Typography
              component="span"
              sx={{ color: "grey", fontSize: "15px" }}
            >
              ({workerData.length})
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
            }}
            onClick={() => setShowContractorData(true)}
          >
            <Typography
              sx={{
                fontSize: "15px",
                "&:hover": {
                  color: "#CC5229",
                },
              }}
              component="span"
            >
              Contractors&nbsp;
            </Typography>
            <Typography
              component="span"
              sx={{ color: "grey", fontSize: "15px" }}
            >
              ({contractorData.length})
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
        {employees.length === 0 ? (
          <>
            <CustomNoRowsOverlay />
          </>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TextField
                variant="outlined"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  mb: 2,
                  mr: 2,
                  flex: "0 1 auto",
                  width: "400px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "10px",
                    backgroundColor: "white",
                  },
                  "& .MuiInputAdornment-root": {
                    color: "rgba(0, 0, 0, 0.54)",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography
                  sx={{ mb: 2, mr: 2, display: { xs: "none", sm: "block" } }}
                >
                  Refine by:
                </Typography>
                <FormControl
                  variant="outlined"
                  sx={{
                    mb: 2,
                    mr: 2,
                    flex: "0 1 auto",
                    minWidth: { xs: 100, sm: 150 }, // Shrink width on mobile
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "white",
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "white",
                    },
                    "& .MuiInputLabel-root": {
                      display: { xs: "none", sm: "block" }, // The label will disappear on small screens
                    },
                    "& .MuiSelect-icon": {
                      color: { xs: "black", sm: "rgba(0, 0, 0, 0.54)" },
                    },
                  }}
                >
                  <InputLabel
                    id="select-label"
                    sx={{ display: { xs: "none", sm: "block" } }}
                  >
                    Select Filter
                  </InputLabel>
                  <Select
                    labelId="select-label"
                    id="select"
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    label="Select Filter"
                    IconComponent={FilterListIcon}
                    sx={{
                      "& .MuiSelect-select": {
                        display: { xs: "flex", sm: "flex" }, // Ensure the select is always displayed
                        alignItems: "center",
                      },
                      "& .MuiOutlinedInput-root": {
                        paddingRight: "8px !important", // Adjust the padding to fit the filter icon
                      },
                    }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="active">Offboard</MenuItem>
                    <MenuItem value="inactive">Initiated</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
            <Box
              sx={{
                height: "45rem",
                overflowY: "scroll",
                "&::webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              {showContractorData ? (
                <>
                  <DataGrid
                    //rows={paginatedData(showContractorData ? contractorData : workerData)}
                    rows={paginatedData}
                    columns={columns}
                    pageSize={10}
                    rowHeight={70}
                    getRowId={({ _id }) => _id}
                    columnHeaderHeight={70}
                    onPageChange={(newPage) => setCurrentPage(newPage)}
                    hideFooterPagination
                    slots={{
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    sx={{
                      height: "45rem",
                      border: "none",
                      display: { xs: "none", sm: "none", md: "flex" },
                      "& .MuiDataGrid-row:hover": {
                        backgroundColor: "white", // Sets the background to transparent on hover
                        border: "1px solid black",
                      },
                      "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                        display: "none",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "white",
                        marginBottom: 1,

                        border: "none",
                      },
                      "&.MuiDataGrid-root .MuiDataGrid-withBorderColor": {
                        borderColor: "transparent",
                        justifyContent: "left",
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
                        marginBottom: 1,
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
                  <MobileContractData
                    searchQuery={searchQuery}
                    filterStatus={filterStatus}
                  />
                </>
              ) : (
                <>
                  <DataGrid
                    rows={paginatedData}
                    columns={columns}
                    pageSize={10}
                    rowHeight={70}
                    getRowId={({ _id }) => _id}
                    columnHeaderHeight={70}
                    hideFooterPagination
                    slots={{
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    sx={{
                      height: "45rem",
                      border: "none",
                      display: { xs: "none", sm: "none", md: "flex" },
                      "& .MuiDataGrid-row:hover": {
                        backgroundColor: "white", // Sets the background to transparent on hover
                        border: "1px solid black",
                      },
                      "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                        display: "none",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "white",
                        marginBottom: 2,
                        border: 0,
                        fontSize: "15px",
                      },
                      "&.MuiDataGrid-root .MuiDataGrid-withBorderColor": {
                        borderColor: "transparent",
                        justifyContent: "left",
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
                        marginBottom: 1,
                        borderRadius: 3,
                        border: "none",

                        "& .MuiDataGrid-root": {
                          boxShadow: "none",
                          border: "none",
                          justifyContent: "center",
                        },
                        "& .MuiDataGrid-cell": {
                          border: "none",
                        },
                        "& .MuiDataGrid-headerCell": {
                          border: "none",
                        },
                        "& .MuiDataGrid-iconSeparator": {
                          display: "none",
                        },
                      },
                    }}
                  />
                  <MobileWorkerData
                    searchQuery={searchQuery}
                    filterStatus={filterStatus}
                  />
                </>
              )}
            </Box>
          </>
        )}
      </Box>
      <CustomPagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default EmployeeOffBoarding;
