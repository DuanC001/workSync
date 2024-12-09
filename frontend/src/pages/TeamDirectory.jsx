import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { addEmployees, selectEmployee } from "../redux/employee/employeeSlice";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import EmployeeImage from "../components/EmployeeImage";
import CustomPagination from "../components/CustomPagination";
import MobileContractDataDirectory from "../components/MobileContractDataDirectory";
import MobileWorkerDataDirectory from "../components/MobileWorkerDataDirectory";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { EmployeeListUnavailableIcon } from "../components/icons";
import dayjs from "dayjs";

const TeamDirectory = () => {
  const navigate = useNavigate();
  const handleRowClick = ({ row }) => navigate(`/employee/${row._id}`);

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
    {
      field: "status",
      headerName: "Employee Status",
      headerAlign: "left",
      flex: 1,
      renderCell: (params) => {
        let backgroundColor;
        let color;
        switch (params.value) {
          case "active":
            backgroundColor = "#c5f2d5";
            color = "#00732a";
            break;
          case "inactive":
            backgroundColor = "#ffe5ef";
            color = "#990000";
            break;
          // case "hold":
          //   backgroundColor = "#ffefcf";
          //   color = "#996600";
          //   break;
          default:
            backgroundColor = "transparent";
        }
        return (
          <div
            style={{
              backgroundColor,
              color,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "3px",
              paddingBottom: "3px",
              paddingLeft: "10px",
              paddingRight: "10px",
              fontSize: "10px",
              borderRadius: "1rem",
              fontWeight: "700",
            }}
          >
            {params.value}
          </div>
        );
      },
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
  ];

  const [showContractorData, setShowContractorData] = useState(false);
  const dispatch = useDispatch();
  const employees = useSelector(selectEmployee);
  const { currentCompany } = useSelector((state) => state.company);
  const { _id: companyId } = currentCompany || {};
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Datagrid Page size number for pagination
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

  // Apply filters to the respective group based on `showContractorData`
  const filteredData = showContractorData
    ? applyFilters(contractorData)
    : applyFilters(workerData);
  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Paginated data for display
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
        <title>Team Directory</title>
        <meta name="description" content="Team Directory Page" />
      </Helmet>
      <Box
        sx={{
          bgcolor: "#F4F5F7",
          height: { sm: "85vh", xs: "85vh", md: "82vh" },
          width: { sm: "98%", xs: "100%" },
          // overflowY: "scroll",
          // "&::webkit-scrollbar": {
          //   display: "none",
          // },
          display: "flex",
          flexDirection: "column",
          gap: { sm: 1, xs: 1, md: 1 },
          borderRadius: 3,
          p: 2,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: { sm: "space-between", xs: "center" },
            alignItems: "start",
          }}
        >
          <Stack>
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { sm: "20px", xs: "18px" },

                textAlign: { xs: "center", sm: "start" },
              }}
            >
              Employee Directory
            </Typography>
            <Typography
              variant="p"
              sx={{
                fontWeight: "light",
                color: "#84858C",
                fontSize: { sm: "15px", xs: "12px" },
                textAlign: { xs: "center", sm: "start" },
              }}
            >
              Discover your team easily with our simple and accessible Employee
              Directory
            </Typography>
          </Stack>
          <Button
            onClick={() => navigate("/employee-onboard")}
            sx={{
              color: "white",
              bgcolor: "#FA6432", // Background color when not hovering
              borderRadius: 2,
              fontSize: "13px",
              px: 3,
              py: 1.5,
              display: { sm: "block", xs: "none" },
              "&:hover": {
                bgcolor: "#E55B2B",
              },
            }}
            variant="inherent"
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
                  width: "8rem",
                  bgcolor: "#FA6432",
                  position: "absolute",
                  bottom: -1.5,
                  left: 12,
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
                    backgroundColor: "white", // Set the background color to white
                  },
                  "& .MuiInputAdornment-root": {
                    color: "rgba(0, 0, 0, 0.54)",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white", // Optional: Set the border color if needed
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
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
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
                    onRowClick={handleRowClick}
                    columns={columns}
                    rowHeight={70}
                    getRowId={({ _id }) => _id}
                    columnHeaderHeight={70}
                    onPageChange={(newPage) => setCurrentPage(newPage)}
                    slots={{
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    hideFooterPagination
                    sx={{
                      height: "45rem",
                      cursor: "pointer",
                      border: "none",
                      display: { xs: "none", sm: "none", md: "flex" },
                      "& .MuiDataGrid-row:hover": {
                        backgroundColor: "white", // Sets the background to transparent on hover
                        border: "1px solid black", // Adds a black border
                      },
                      "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                        display: "none",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "white",
                        marginBottom: 1,
                        border: "none",
                        fontSize: "15px",
                      },
                      "& .MuiDataGrid-columnHeaderTitleContainer": {
                        justifyContent: "left", // Aligns the header title text to the left
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
                  <MobileContractDataDirectory
                    searchQuery={searchQuery}
                    filterStatus={filterStatus}
                  />
                </>
              ) : (
                <>
                  <DataGrid
                    rows={paginatedData}
                    onRowClick={handleRowClick}
                    getRowId={({ _id }) => _id}
                    columns={columns}
                    rowHeight={70}
                    columnHeaderHeight={70}
                    hideFooterPagination
                    slots={{
                      NoRowsOverlay: CustomNoRowsOverlay,
                    }}
                    sx={{
                      height: "45rem",
                      cursor: "pointer",
                      border: "none",
                      display: { xs: "none", sm: "none", md: "flex" },
                      "& .MuiDataGrid-row:hover": {
                        backgroundColor: "white", // Sets the background to transparent on hover
                        border: "1px solid black", // Adds a black border
                      },
                      "& .MuiDataGrid-virtualScroller::-webkit-scrollbar": {
                        display: "none",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "white",
                        marginBottom: 1,
                        border: 0,
                        fontSize: "15px",
                      },
                      "& .MuiDataGrid-columnHeaderTitleContainer": {
                        justifyContent: "left", // Aligns the header title text to the left
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
                  <MobileWorkerDataDirectory
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
        onChange={(event, value) => setCurrentPage(value)}
      />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default TeamDirectory;
