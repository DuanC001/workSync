import React, { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, Navigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import theme from "../theme/theme";
import {
  Box,
  Typography,
  Grid,
  Button,
  useMediaQuery,
  useTheme,
  Snackbar,
} from "@mui/material";
import {
  PrimaryButton,
  FloatingButton,
  SecondaryButton,
} from "../theme/buttons";

import { useSelector } from "react-redux";
import DashboardFourCards from "../components/DashboardFourCards";
import NewlyJoinedEmployeeList from "../components/NewlyJoinedEmployeeList";
import EmployeeManagementChart from "../components/EmployeeManagementChart";
import EmployeeCountByDeptDashboard from "../components/EmployeeCountByDeptDashboard";
import EmployeeTypeDashboardCard from "../components/EmployeeTypeDashboardCard";
import TeamDirectoryDashboardCard from "../components/TeamDirectoryDashboardCard";

import formatDate from "../utils/dateformat";
import calculateQuarter from "../utils/quarterlycount";
import extractYear from "../utils/yearlycount";
import { Helmet } from "react-helmet";
import ReportExportDialog from "../components/ReportExportDialog";
import { AlertStyled } from "../theme/alert";
import IosShareIcon from "@mui/icons-material/IosShare";
import converasPdf from "../utils/convertasPdf";
import convertasDocx from "../utils/convertasDocx";
import CustomSpinner from "../assets/loader/customloader";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
/* const companyEmployeeCount = 57;
const contractorCount = 23; */

const EmptyDashboard = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  let isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  useEffect(() => {
    if (location.state?.handleLoginSuccess) {
      setOpenSnackbar(true);
      const newState = { ...location.state };
      delete newState.loginSuccess;
      history.replaceState({}, "", location.pathname, newState);
    }
  }, [location]);

  // total employee count
  const totalEmployeeCount = 0;
  // filtering the data to get the count of company employees that are active
  const companyEmployeeCount = 0;
  // filtering the data to get count of offboarded employees
  const offboardedEmployeeCount = 0;
  // filtering the data to get the new employee count
  const newEmployeeCount = 0;
  //filtering the data to get the department wise employee count
  const departmentWiseEmployeeCount = 0;

  const DemoData = {
    name: "Employee Name",
    image: "",
    department: "Department Name",
    startMonth: "Start Month",
    startDate: "Start Date",
  };

  const newlyJoinedEmployeeList = [];

  for (let i = 0; i < 5; i++) {
    newlyJoinedEmployeeList.push(DemoData);
  }

  // offboard and onboard employee count based on start and end date to show in the chart

  // console.log(onboardOffboardCounts);
  const onboardOffboardCounts = [];
  for (let i = 1; i <= 12; i++) {
    onboardOffboardCounts.push(0);
  }
  // onboard offboard based on quateryly count

  const demoCountsQuarterly = [
    {
      name: "Q1",
      onboarded: 0,
      offboarded: 0,
    },
    {
      name: "Q2",
      onboarded: 0,
      offboarded: 0,
    },
    {
      name: "Q3",
      onboarded: 0,
      offboarded: 0,
    },
    {
      name: "Q4",
      onboarded: 0,
      offboarded: 0,
    },
  ];

  const onboardOffboardCountsQuarterly = demoCountsQuarterly;

  // console.log(onboardOffboardCountsQuarterly);

  // department count based on the department available in the data

  const departmentCount = [
    {
      department: "Department",
      count: 0,
    },
    {
      department: "Department",
      count: 0,
    },
    {
      department: "Department",
      count: 0,
    },
    {
      department: "Department",
      count: 0,
    },
    {
      department: "Department",
      count: 0,
    },
  ];

  // employee type count based on the jobType available in the data
  const employeeTypeCount = {
    companyEmployee: 0,
    contractor: 0,
  };

  // images for the team directory 3 images in array

  const teamDirectory = [{ image: "" }, { image: "" }, { image: "" }];

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
        <meta name="description" content="Dashboard Page" />
      </Helmet>
      <Box sx={{ mt:0,
          backgroundColor: "rgb(244, 245, 247)",
          position: "relative",
          borderRadius:"1rem",
          position: "relative",
          borderRadius: "1rem",
          marginBottom: "5rem",
          height: "90vh",
          overflow: "hidden",
          marginRight:isMobile?"0":"1rem" }}>
        <Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column-reverse" : "row",
            alignItems: isMobile ? "center" : "flex-start",
            justifyContent: isMobile ? "center" : "space-between",
            height: "100px",
            p:3,
            mt:isMobile?"1rem":"0"
          }}
        >  
          <Box sx={{ textAlign: isMobile ? "center" : "left", paddingTop:isMobile?"1rem":"0" }}>
            <Typography variant="h1">Dashboard</Typography>
            <Typography
              variant="body1"
              sx={{ mb: "1rem", color: theme.palette.grey[200] }}
            >
              Access a consolidated overview of your company's employee data
              effortlessly
            </Typography>
          </Box>

          <Box sx={{ display: isMobile ? "none" : "block" }}>
            <PrimaryButton onClick={handleOpenDialog} disabled>
              Export Report
            </PrimaryButton>
            <ReportExportDialog
              open={dialogOpen}
              handleCloseEvent={handleCloseDialog}
            />
          </Box>  
        </Box>

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{
              vertical: "top",
              top: "80%",
              horizontal: isMobile ? "center" : "right",
            }}
          >
            <AlertStyled
              onClose={() => setOpenSnackbar(false)}
              severity="success"
              iconMapping={{
                success: <CheckCircleIcon style={{ fontSize: 'inherit', color: 'white', backgroundColor: 'rgba(61, 204, 114, 1)', borderRadius: '50%' }} />,
              }}
            >
              You have logged in successfully!
            </AlertStyled>
          </Snackbar>
        </Box>


        <Box
        sx={{
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          paddingRight: "1rem",
          p: 3,
          '&::-webkit-scrollbar': {
            width: '10px',display:isTablet?"none":"block", height:"100%", 
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#E6E6E6',
            borderRadius: '10px',
            border: '3px solid #E6E6E6',
            width: '6px'
          }
          }}
          >
        <DashboardFourCards
          companyEmployeeCount={companyEmployeeCount}
          newEmployeeCount={newEmployeeCount}
          offboardedEmployeeCount={offboardedEmployeeCount}
          departmentWiseEmployeeCount={departmentWiseEmployeeCount}
          totalEmployeeCount={totalEmployeeCount}
        />

        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={0} lg={4}>
            <NewlyJoinedEmployeeList
              newlyJoinedEmployeeList={newlyJoinedEmployeeList}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={8}>
            <EmployeeManagementChart
              data={onboardOffboardCounts}
              onboardOffboardCountsQuarterly={onboardOffboardCountsQuarterly}
              // onboardOffboardCountsYearly={onboardOffboardCountsYearly}
            />
          </Grid>
        </Grid>

        <Grid
          container
          spacing={2}
          sx={{
            mt: 2,
            alignItems: "stretch",
            marginBottom: isMobile ? "1rem" : "5rem",
          }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            sx={{ minHeight: "100%", flex: isTablet ? "1 0 100%" : "1 0 60%" }}
          >
            <EmployeeCountByDeptDashboard departmentCount={departmentCount} />
          </Grid>
          <Grid item xs={12} md={3} sx={{ flex: "2 0 40%", minHeight: "100%" }}>
            <EmployeeTypeDashboardCard employeeTypeCount={employeeTypeCount} />
          </Grid>
          <Grid item xs={12} md={3} sx={{ minHeight: "100%" }}>
            <TeamDirectoryDashboardCard teamDirectory={teamDirectory} />
          </Grid>
        </Grid>

        </Box>
      </Box>
    </>
  );
};

// DashBoard function=======================================

const Dashboard = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  let isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  let isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState({ message: '', severity: 'info' });

  const dashboardRef = useRef(null);

  // console.log(dashboardRef);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = (event) => {
    // event.stopPropagation();
    console.log("Report is being downloaded.");
    setDialogOpen(false);
  };

  const captureDashboard = React.useCallback(async () => {
    try {
      // console.log("reference :");
      if (dashboardRef.current) {
        // const canvas = await html2canvas(dashboardRef.current);
        // console.log("reference :",canvas);
        // return canvas.toDataURL('image/png');
        const pdf = await converasPdf(dashboardRef);
        setTimeout(() => {
          setShowAlert(true);
      }, 10000);

      if(pdf==='success'){setDialogOpen(false);}
        

      } else if (dashboardRef.current) {
        const docx = await convertasDocx(dashboardRef);
        <AlertStyled severity="success"
        iconMapping={{
          success: <CheckCircleIcon style={{ fontSize: 'inherit', color: 'white', backgroundColor: 'rgba(61, 204, 114, 1)', borderRadius: '50%' }} />,
        }}>
          Report downloaded successfully
        </AlertStyled>;

        setDialogOpen(false);
      } else {
        throw new Error("Dashboard reference not found");
      }
    } catch (error) {
      throw new Error("Dashboard reference not found");
    }
  });

  // console.log("lets see if its working: ",captureDashboard());

  useEffect(() => {
    if (location.state?.handleLoginSuccess) {
      setOpenSnackbar(true);
      const newState = { ...location.state };
      delete newState.loginSuccess;
      history.replaceState({}, "", location.pathname, newState);
    }
  }, [location]);

  const { currentCompany } = useSelector((state) => state.company);
  if (!currentCompany) return <Navigate to="/login" />;

  /* const {companyID} = currentCompany || {}; // Make sure currentCompany is not undefined */
  // const companyID = currentCompany ? currentCompany['65e7806186f16b4f825966c3'] : undefined;
  const companyID = currentCompany ? currentCompany._id : undefined;

  // console.log("hello", companyID);

  const {
    data: employees,
    isLoading,
    error,
    fetchData,
  } = useFetch(
    import.meta.env.VITE_API_ENDPOINT + `/companies/${companyID}/employees`
  );

  const initialData = useCallback(async () => {
    await fetchData();
    // return res;
  }, []);
  useEffect(() => {
    initialData();
  }, [initialData]);

  /* useEffect(() => {
    console.log("hello capture");
    captureDashboard();
  }, []) */

  // useEffect(() => {
  //   console.log("heelo",employees);
  // }, [employees]);

  if (isLoading) return <CustomSpinner/>;
  if (error) return <EmptyDashboard />;
  // Immediately after loading and error checks
  if (!employees || employees.length === 0) {
    return <EmptyDashboard />;
  }

  // total employee count
  const totalEmployeeCount = employees.length;
  // filtering the data to get the count of company employees that are active
  const companyEmployeeCount = employees.filter(
    (employee) =>
      (employee.jobType === "employee" || employee.jobType === "contractor") &&
      employee.status === "active"
  ).length;
  // filtering the data to get count of offboarded employees
  const offboardedEmployeeCount = employees.filter(
    (employee) => employee.status === "inactive"
  ).length;
  // filtering the data to get the new employee count
  const currentMonth = formatDate(new Date().toISOString().split("T")[0]);

  const newEmployeeCount = employees.filter(
    (employee) => formatDate(employee.startDate) >= currentMonth
  ).length;

  console.log("start date : ", new Date().toISOString().split("T")[0])

    console.log("newEmployeeCount 439 : ",newEmployeeCount)

  //filtering the data to get the department wise employee count
  const departmentWiseEmployeeCount = employees.reduce((acc, employee) => {
    const departmentName = employee.department.toLowerCase();
    if (acc[departmentName]) {
      acc[departmentName]++;
    } else {
      acc[departmentName] = 1;
    }
    return acc;
  }, {});

  // newly joined employee list with name and department

  const newlyJoinedEmployeeList = Array.isArray(employees)
    ? employees.map((employee) => ({
        name: employee.name,
        image: employee.profilePicture,
        department: employee.department,
        startMonth: formatDate(employee.startDate),
        startDate: employee.startDate,
      }))
    : [];

  // offboard and onboard employee count based on start and end date to show in the chart

  const onboardOffboardCounts = employees.reduce((acc, employee) => {
    const monthName = formatDate(employee.startDate);
    if (!acc[monthName]) {
      acc[monthName] = { onboarded: 0, offboarded: 0 };
    }
    acc[monthName].onboarded += 1;
    if (employee.status === "inactive" && employee.lastEmploymentDay) {
      const offboardMonthName = formatDate(employee.lastEmploymentDay);
      if (!acc[offboardMonthName]) {
        acc[offboardMonthName] = { onboarded: 0, offboarded: 0 };
      }
      acc[offboardMonthName].offboarded += 1;
    }
    return acc;
  },{});

  // console.log(onboardOffboardCounts);


 

  function countFrequency(arr) {
    const frequencyCounter = {};

    let arrayQuarter = [];
    for (let i = 1; i <= 4; i++) {
      frequencyCounter[i] = {
        name: i,
        onboarded: 0,
        offboarded: 0,
      };
    }
    // Loop over the array
    for (let emp of arr) {
      // If the property already exists, increment it, otherwise set it to 1
      const monthName = formatDate(emp.startDate);
      // console.log("monthName from dashboard:", monthName);


      const quarter = calculateQuarter(monthName);
      frequencyCounter[quarter].onboarded =
        (frequencyCounter[quarter].onboarded || 0) + 1;
      if (emp.status === "inactive" && emp.lastEmploymentDay) {
        const offboardMonthName = formatDate(emp.lastEmploymentDay);
        const offboardQuarter = calculateQuarter(offboardMonthName);
        frequencyCounter[offboardQuarter].offboarded =
          (frequencyCounter[offboardQuarter].offboarded || 0) + 1;
      }
    }

    for (let freq in frequencyCounter) {
      arrayQuarter.push(frequencyCounter[freq]);
    }
    return arrayQuarter;
  }

  const onboardOffboardCountsQuarterly = countFrequency(employees);

  // console.log(onboardOffboardCountsQuarterly);

  // department count based on the department available in the data
  const departmentCount = Object.keys(departmentWiseEmployeeCount)
    .map((key) => {
      const departmentName = key.charAt(0).toUpperCase() + key.slice(1);
      return {
        department: departmentName,
        count: departmentWiseEmployeeCount[key],
      };
    })
    .slice(0, 5);

  // employee type count based on the jobType available in the data
  const employeeTypeCount = employees.reduce(
    (acc, employee) => {
      if (employee.jobType === "employee") {
        acc.companyEmployee++;
      } else {
        acc.contractor++;
      }
      return acc;
    },
    { companyEmployee: 0, contractor: 0 }
  );

  // images for the team directory 3 images in array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const shuffledEmployees = shuffleArray([...employees]);
  const teamDirectory = shuffledEmployees.slice(0, 3).map((employee) => {
    return {
      image: employee.profilePicture,
    };
  });

  // console.log(captureDashboard());

  return currentCompany ? (
    <Box ref={dashboardRef}
    sx={{
          mt:0,
          backgroundColor: "rgb(244, 245, 247)",
          position: "relative",
          borderRadius:"1rem",
          position: "relative",
          borderRadius: "1rem",
          marginBottom: "5rem",
          height: "90vh",
          overflow: "hidden",
          marginRight:"1rem"}}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Dashboard</title>
        <meta name="description" content="Dashboard Page" />
      </Helmet>
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column-reverse" : "row",
            alignItems: isMobile ? "center" : "flex-start",
            justifyContent: isMobile ? "center" : "space-between",
            height: "100px",
            p:3,
          }}
        >
          <Box sx={{ textAlign: isMobile ? "center" : "left" }}>
            <Typography variant={isMobile ? "h1Small" : "h1Large"}>
              Dashboard
            </Typography>
            <Typography
              variant={isMobile ? "body2" : "body1"}
              sx={{
                mb: "1rem",
                color: theme.palette.grey[200],
                textAlign: isMobile ? "center" : "left",
              }}
            >
              Access a consolidated overview of your company's employee data
              effortlessly
            </Typography>
          </Box>
          {!isMobile && (
            <Box>
              <PrimaryButton
                variant="contained"
                onClick={() => {
                  // captureDashboard();
                  handleOpenDialog();
                }}
              >
                Export Report{" "}
                <IosShareIcon
                  sx={{ transform: "rotate(90deg)", marginLeft: "1rem" }}
                />
              </PrimaryButton>
              <ReportExportDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                SnackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                snackbarMessage={snackbarMessage}
                setSnackbarMessage={setSnackbarMessage}
                captureDashboard={captureDashboard}
              />
            </Box>
          )}

          {isMobile && (
            <Box
              sx={{
                position: "fixed",
                bottom: "-20px",
                left: 0,
                right: 0,
                width: "100%",
                backgroundColor: "white",
                textAlign: "center",
                borderRadius: "2rem 2rem 0 0",
                p: 1,
                zIndex: 3,
              }}
            >
              <PrimaryButton onClick={handleOpenDialog} hover>
                Export Report
              </PrimaryButton>

              <ReportExportDialog
                open={dialogOpen}
                setOpen={handleCloseDialog}
                SnackbarOpen={snackbarOpen}
                setSnackbarOpen={setSnackbarOpen}
                snackbarMessage={snackbarMessage}
                setSnackbarMessage={setSnackbarMessage}
                captureDashboard={captureDashboard}
              />
            </Box>
          )}

          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            anchorOrigin={{
              vertical: "top",
              top: "80%",
              horizontal: isMobile ? "center" : "right",
            }}
          >
            <AlertStyled
            iconMapping={{
              success: <CheckCircleIcon style={{ fontSize: 'inherit', color: 'white', backgroundColor: 'rgba(61, 204, 114, 1)', borderRadius: '50%' }} />,
            }}
              onClose={() => setOpenSnackbar(false)}
              severity="success"
            >
              You have logged in successfully!
            </AlertStyled>
          </Snackbar>
        </Box>

        <Snackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
               <AlertStyled onClose={() => setSnackbarOpen(false)} severity={snackbarMessage.severity}
               iconMapping={{
                success: <CheckCircleIcon style={{ fontSize: 'inherit', color: 'white', backgroundColor: 'rgba(61, 204, 114, 1)', borderRadius: '50%' }} />,
              }}>
                  {snackbarMessage.message}
                </AlertStyled>
        </Snackbar>


        <Box
        sx={{
          maxHeight: "calc(100vh - 100px)",
          overflowY: "auto",
          paddingRight: "1rem",
          p: 3,
          '&::-webkit-scrollbar': {
            width: '10px',display:isTablet?"none":"block", height:"100%", 
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#E6E6E6',
            borderRadius: '10px',
            border: '3px solid #E6E6E6',
            width: '6px'
          }
          }}
          >
  
          <DashboardFourCards
            companyEmployeeCount={companyEmployeeCount}
            newEmployeeCount={newEmployeeCount}
            offboardedEmployeeCount={offboardedEmployeeCount}
            departmentWiseEmployeeCount={departmentWiseEmployeeCount}
            totalEmployeeCount={totalEmployeeCount}
          />
  
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={0} lg={4}>
              <NewlyJoinedEmployeeList
                newlyJoinedEmployeeList={newlyJoinedEmployeeList}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={8}>
              <EmployeeManagementChart
                data={onboardOffboardCounts}
                onboardOffboardCountsQuarterly={onboardOffboardCountsQuarterly}
                // onboardOffboardCountsYearly={onboardOffboardCountsYearly}
              />
            </Grid>
          </Grid>
  
          <Grid
            container
            spacing={2}
            sx={{ mt: 2, alignItems: "stretch", marginBottom: "5rem" }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              sx={{ minHeight: "100%", flex: isTablet ? "1 0 100%" : "1 0 60%" }}
            >
              <EmployeeCountByDeptDashboard departmentCount={departmentCount} />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={3}
              sx={{ flex: "1 0 40%", minHeight: "100%" }}
            >
              <EmployeeTypeDashboardCard employeeTypeCount={employeeTypeCount} />
            </Grid>
            <Grid item xs={12} md={3} sx={{ minHeight: "100%" }}>
              <TeamDirectoryDashboardCard teamDirectory={teamDirectory} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  ) : employees.length === 0 ? (
    <EmptyDashboard />
  ) : (
    <Navigate to="/login" />
  );
};

export default Dashboard;
