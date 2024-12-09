import { Box, Stack, Typography, Button, IconButton } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  BusinessCenter,
  BorderColorOutlined,
  ArrowBackIosNewRounded,
  Feed,
} from "@mui/icons-material";
import EmployeeDocumentDetails from "../components/EmployeeDocumentDetails";
import EditBasicDetails from "../components/EditBasicDetails";
import EditEmploymentDetails from "../components/EditEmploymentDetails";
import AddNewDocument from "../components/AddNewDocument";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  ArrowBack,
  EditDocument,
  OffboardIcon,
  AddIcon,
} from "../components/icons";
import EmployeeImage from "../components/EmployeeImage";
import { BasicDetail } from "../components/icons";
import { EditIcon, BagIcon } from "../components/icons";
import dayjs from "dayjs";

const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { id: employeeId } = useParams();
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openBasicEditModal, setOpenBasicEditModal] = useState(false);
  const [openEmploymentEditModal, setOpenEmploymentEditModal] = useState(false);
  const [addnewDocument, setAddnewDocument] = useState(false);
  const [currentDetail, setCurrentDetail] = useState("employee-details");

  const { currentCompany } = useSelector((state) => state.company);
  const { _id: companyId } = currentCompany || {};

  useEffect(() => {
    const asyncFn = async () => {
      try {
        const url =
          import.meta.env.VITE_API_ENDPOINT +
          `/companies/${companyId}/employees/${employeeId}`;
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log("asyncFn jsonResponse", jsonResponse);
          setSelectedEmployee(jsonResponse);
        } else {
          console.error("Server responded with status:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    asyncFn();
  }, [openBasicEditModal, openEmploymentEditModal, addnewDocument]);

  const handleAddDocument = () => {
    setAddnewDocument(true);
  };

  return currentCompany ? (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Employee Details</title>
        <meta name="description" content="Employee Details Page" />
      </Helmet>
      {selectedEmployee && (
        <Box
          sx={{
            bgcolor: "#F4F5F7",
            height: { sm: "87vh", xs: "90vh", md: "87vh" },
            width: "98%",
            overflowY: "scroll",
            "&::webkit-scrollbar": {
              display: "none",
            },
            display: "flex",
            flexDirection: "column",
            gap: 3,
            borderRadius: 3,
            p: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Box sx={{ display: { sm: "none", xs: "flex" } }}>
              <IconButton
                onClick={() => navigate("/team-directory")}
                sx={{ display: { sm: "none", xs: "block" } }}
              >
                <ArrowBack />
              </IconButton>
            </Box>

            <Stack
              alignItems={{ sm: "start", xs: "center" }}
              sx={{ pl: { sm: 8, xs: 0 } }}
            >
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                {selectedEmployee.name}
              </Typography>
              <Typography
                variant="p"
                sx={{ fontWeight: "light", fontSize: "13px", color: "#98999B" }}
              >
                {selectedEmployee.country}
              </Typography>
            </Stack>
            {currentDetail === "employee-details" ? (
              <Button
                onClick={() => navigate("/employee-offboard")}
                sx={{
                  display: { sm: "flex", xs: "none" },
                  color: "black",
                  border: "1.5px solid black",
                  bgcolor: "transparent",
                  "&:hover": {
                    bgcolor: "black", // Change to red on hover
                    color: "white",
                    opacity: 0.8, // Optional: change opacity on hover
                  },
                  fontSize: "13px",
                  px: 2,
                  py: 1,
                }}
              >
                Off-Board Employee
              </Button>
            ) : (
              <Button
                onClick={handleAddDocument}
                sx={{
                  display: { sm: "flex", xs: "none" },
                  color: "white",
                  bgcolor: "#FA6432",
                  fontSize: "13px",
                  px: 2,
                  py: 1,
                  "&:hover": {
                    bgcolor: "#E55B2B",
                  },
                }}
              >
                Add new document
              </Button>
            )}

            <IconButton
              sx={{
                position: "absolute",
                top: 5,
                left: 10,
                display: { sm: "block", xs: "none" },
              }}
              onClick={() => navigate("/team-directory")}
            >
              <ArrowBackIosNewRounded
                sx={{ color: "black", width: "1rem", height: "1rem" }}
              />
            </IconButton>
            {currentDetail === "employee-details" ? (
              <Box sx={{ display: { sm: "none", xs: "flex" } }}>
                <IconButton sx={{ display: { sm: "none", xs: "block" } }}>
                  <EditDocument />
                </IconButton>
                <IconButton sx={{ display: { sm: "none", xs: "block" } }}>
                  <OffboardIcon color="#474853" />
                </IconButton>
              </Box>
            ) : (
              <Box
                onClick={handleAddDocument}
                sx={{ display: { sm: "none", xs: "flex" } }}
              >
                <IconButton sx={{ display: { sm: "none", xs: "block" } }}>
                  <AddIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              gap: 3,
              alignItems: "center",
              borderBottom: "0.9px solid grey",
              position: "relative",
            }}
          >
            <Box
              sx={{
                cursor: "pointer",
              }}
              onClick={() => setCurrentDetail("employee-details")}
            >
              <Typography sx={{ fontSize: "15px" }} component="span">
                Employee Overview
              </Typography>

              {currentDetail === "employee-details" && (
                <Box
                  sx={{
                    height: "2px",
                    width: "8rem",
                    bgcolor: "#FA6432",
                    position: "absolute",
                    bottom: -1.5,
                    left: 2,
                  }}
                ></Box>
              )}
            </Box>
            <Box
              sx={{
                cursor: "pointer",
              }}
              onClick={() => setCurrentDetail("employee-documents")}
            >
              <Typography
                sx={{
                  fontSize: "15px",
                  color:
                    currentDetail === "employee-details" ? "#98999B" : "black",
                  component: "span",
                }}
              >
                Documents
              </Typography>

              {currentDetail === "employee-documents" && (
                <Box
                  sx={{
                    height: "2px",
                    width: "8rem",
                    bgcolor: "#FA6432",
                    position: "absolute",
                    bottom: -1.5,
                    left: "9rem",
                  }}
                ></Box>
              )}
            </Box>
          </Box>
          {currentDetail === "employee-details" && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                flexDirection: { xs: "column", sm: "column", md: "row" },
                gap: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  bgcolor: "white",
                  p: 2,
                  flex: { sm: 1, xs: 0 },
                  height: "36rem",
                  borderRadius: 2,
                  width: { xs: "100%" },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "column",
                    background: `radial-gradient(circle at center, 
                              #708FFF 0%, 
                              #6C82FF 20%, 
                              #647BEF 40%, 
                              #5C74DF 60%, 
                              #546BCE 80%)`,
                    borderRadius: 2,
                    position: "relative",
                    height: "8rem",
                    p: 2,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "-2rem",
                      alignItems: "center",
                      //left: { md: "7rem", sm: "22rem", xs: "7rem" },
                      border: "4px solid white",
                      borderRadius: "100%",
                    }}
                  >
                    <EmployeeImage
                      width={80}
                      height={80}
                      img={`${selectedEmployee.profilePicture}`}
                    />
                  </Box>
                  <Stack alignItems="center">
                    <Typography
                      sx={{
                        fontSize: "20px",
                        color: "white",
                      }}
                    >
                      {selectedEmployee.name}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "13px",
                        color: "white",
                      }}
                    >
                      {selectedEmployee.jobTitle}
                    </Typography>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                  }}
                >
                  <Stack spacing={0.4} sx={{}}>
                    <Typography color={"gray"} fontSize={13}>
                      Employment Status
                    </Typography>
                    <Typography fontSize={15} fontWeight={500}>
                      {selectedEmployee.status}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.4} sx={{}}>
                    <Typography color={"gray"} fontSize={13}>
                      Job Role
                    </Typography>
                    <Typography fontSize={15} fontWeight={500}>
                      {selectedEmployee.jobTitle}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.4} sx={{}}>
                    <Typography color={"gray"} fontSize={13}>
                      Manager
                    </Typography>
                    <Typography fontSize={15} fontWeight={500}>
                      {selectedEmployee.managerName}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.4} sx={{}}>
                    <Typography color={"gray"} fontSize={13}>
                      Department
                    </Typography>
                    <Typography fontSize={15} fontWeight={500}>
                      {selectedEmployee.department}
                    </Typography>
                  </Stack>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    bgcolor: "#f4f5f7",
                    p: 2,
                    mt: { sm: 5, xs: 5, md: 0 },
                    borderRadius: 2,
                  }}
                >
                  <Typography color={"#84858C"} fontSize={13}>
                    Salary 💰
                  </Typography>
                  <Typography fontSize={20} fontWeight={500}>
                    CAD {selectedEmployee.salary}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  flex: 2.4,
                  gap: 2,
                  width: { xs: "100%" },
                  height: "700px", // Example fixed height, adjust as needed
                  overflowY: "scroll", // Enables vertical scrolling
                }}
              >
                <Box
                  sx={{
                    height: "28rem",
                    bgcolor: "white",
                    p: 3,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      display="flex"
                      flexDirection="row"
                      gap="0.7rem"
                      alignItems="center"
                      fontSize={20}
                      fontWeight={500}
                    >
                      <Box
                        sx={{
                          bgcolor: "#C5F2D5",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          p: 0.5,
                          borderRadius: 2,
                        }}
                      >
                        <BasicDetail color="#3DCC72" />
                      </Box>
                      Basic Details
                    </Typography>
                    <IconButton
                      onClick={() => setOpenBasicEditModal(true)}
                      sx={{
                        color: "#FA6432",
                        "&:hover": {
                          bgcolor: "transparent",
                        },
                      }}
                      aria-label="edit"
                    >
                      <EditIcon color="#fa6432" />
                      <Typography sx={{ ml: 1, fontSize: "14px" }}>
                        Edit
                      </Typography>
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Employment Name:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.name}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Employee Address:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.address}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Country:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.country}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Employee Email:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.email}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Employee Phone Number:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.phone}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Education:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.education}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
                <Box
                  sx={{
                    bgcolor: "white",
                    p: 3,
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography
                      display="flex"
                      flexDirection="row"
                      gap="0.7rem"
                      alignItems="center"
                      fontSize={20}
                      fontWeight={500}
                    >
                      <Box
                        sx={{
                          bgcolor: "#CFF8FF",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          p: 0.5,
                          borderRadius: 2,
                        }}
                      >
                        <BagIcon />
                      </Box>
                      Employment Details
                    </Typography>
                    <IconButton
                      onClick={() => setOpenEmploymentEditModal(true)}
                      sx={{
                        color: "#FA6432",
                        "&:hover": {
                          bgcolor: "transparent",
                        },
                      }}
                      aria-label="edit"
                    >
                      <EditIcon color="#fa6432" />
                      <Typography sx={{ ml: 1, fontSize: "14px" }}>
                        Edit
                      </Typography>
                    </IconButton>
                  </Box>
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      flexDirection: "column",
                      gap: 2,
                    }}
                  >
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Employment Status:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.status}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Job Title:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.jobTitle}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Assign Department:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.department}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Employee SIN Number:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.sin}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Managers Name:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.managerName}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Manager's Email:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {selectedEmployee.managerEmail}
                      </Typography>
                    </Stack>
                    <Stack spacing={0.4} sx={{}}>
                      <Typography color={"gray"} fontSize={13}>
                        Job Start Date:
                      </Typography>
                      <Typography fontSize={15} fontWeight={500}>
                        {/* {selectedEmployee.startDate} */}
                        {dayjs(selectedEmployee.startDate).format(
                          "MMM DD, YYYY"
                        )}
                      </Typography>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          {currentDetail === "employee-documents" && (
            <EmployeeDocumentDetails
              selectedEmployee={selectedEmployee}
              setSelectedEmployee={(data) => setSelectedEmployee(data)}
              handleAddDocument={() => handleAddDocument()}
            />
          )}
          {openBasicEditModal && (
            <EditBasicDetails
              selectedEmployee={selectedEmployee}
              open={openBasicEditModal}
              onClose={() => setOpenBasicEditModal(false)}
            />
          )}
          {openEmploymentEditModal && (
            <EditEmploymentDetails
              selectedEmployee={selectedEmployee}
              open={openEmploymentEditModal}
              onClose={() => setOpenEmploymentEditModal(false)}
            />
          )}
          {addnewDocument && (
            <AddNewDocument
              selectedEmployee={selectedEmployee}
              open={addnewDocument}
              onClose={() => setAddnewDocument(false)}
            />
          )}
        </Box>
      )}
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default EmployeeDetails;
