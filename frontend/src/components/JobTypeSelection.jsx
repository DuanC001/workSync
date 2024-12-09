import React from "react";
import { Typography, Grid, Paper, Button } from "@mui/material";
import { Container, Box } from "@mui/system"; //
import theme from "../theme/theme";
import { SecondaryButton } from "../theme/buttons";
import { useTheme, useMediaQuery } from "@mui/material";

export default function JobTypeSelection({ handleJobTypeSelection }) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container
      id="wdnmd"
      style={{
        padding: 20,
        paddingTop: "10vh",
        minHeight: "100vh",
        // paddingBottom: 128,
        height:isMobile?"100vh": "90vh",
        // marginBottom: 20,
      }}
    >
      <Typography
        // variant="theme.typography.h1Large"
        gutterBottom
        component="div"
        align="center"
        sx={{
          fontSize: theme.typography.h3Large,
        }}
      >
        On-Board Employee?
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        component="div"
        align="center"
        style={{
          paddingBottom: 25,
          fontSize: theme.typography.h5Large,
        }}
      >
        Who would you like to add in your cleaning agency?
      </Typography>

      <Grid container spacing={3} >
        <Grid item xs={0} md={2}></Grid>
        <Grid item xs={12} md={4}>
          <Paper
            style={{
              padding: 40,
              display: "flex",
              flexDirection: "column",
              // height: 428,
              justifyContent: "space-between",
              marginBottom: 40,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="../images/employee.jpg"
                alt="employee"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </Box>
            <Typography
              align="center"
              style={{
                paddingTop: 16,
                paddingBottom: 8,
                fontSize: theme.typography.h4Large,
              }}
            >
              Employee
            </Typography>
            <Typography align="center" style={{ paddingBottom: 16 }}>
              An employee who will work in your cleaning company
            </Typography>
            <SecondaryButton
              onClick={() => handleJobTypeSelection(1)}
              style={{ width: "190", padding: "9 20 9 20" }}
            >
              Onboard Employee
            </SecondaryButton>
            {/* </Box> */}
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} style={{paddingBottom: 40, marginBottom:20}}>
          <Paper
            style={{
              padding: 40,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              marginBottom: 40,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src="../images/contractor.jpg"
                alt="contractor"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </Box>
            <Typography
              align="center"
              style={{
                paddingTop: 16,
                paddingBottom: 8,
                fontSize: theme.typography.h4Large,
              }}
            >
              Contractor
            </Typography>
            <Typography align="center" style={{ paddingBottom: 16 }}>
              Self-employed individual having their own company
            </Typography>
            <SecondaryButton
              onClick={() => handleJobTypeSelection(2)}
              style={{ width: "190", padding: "9 20 9 20" }}
            >
              Onboard Contractor
            </SecondaryButton>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
