import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Typography,
  Container,
  Button,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Stack,
  Input,
  Modal,
  IconButton,
} from "@mui/material";
import ConfirmationModalOffboard from "./ConfirmationModalOffboard";
import { useSelector, useDispatch } from "react-redux";
import { editEmployee } from "../redux/employee/employeeSlice";
import { useNavigate } from "react-router-dom";
import Success from "../components/Success.jsx";
import { ArrowBack } from "../components/icons";

const OffboardForm = () => {
  const dispatch = useDispatch();
  const { id: employeeId } = useParams();
  const navigate = useNavigate();
  const { currentCompany } = useSelector((state) => state.company);
  const { _id: companyId } = currentCompany || {};

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [formFilled, setFormFilled] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    console.log("formData:", formData);
    checkFormFilled();
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
  }, [formData]);

  //   useEffect(() => {
  //     console.log("formData:", formData);
  //     checkFormFilled();
  //   }, [formData]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalOpen(true);
  };

  const handleConfirmOffboard = async () => {
    setModalOpen(false);
    console.log(formData);
    try {
      const url =
        import.meta.env.VITE_API_ENDPOINT +
        `/companies/${currentCompany._id}/employees/${employeeId}`;
      console.log("url", url);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Success:", jsonResponse);
        dispatch(
          editEmployee({
            employeeId,
            newEmployeeData: jsonResponse,
          })
        );
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
          navigate(-1);
        }, 1000);
      } else {
        console.error("Server responded with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkFormFilled = () => {
    if (
      formData.offBoardingReason &&
      formData.lastEmploymentDay &&
      formData.lastWorkingDay
    ) {
      setFormFilled(true);
    } else {
      setFormFilled(false);
    }
    console.log("formFilled:", formFilled);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 4, sm: 3 },
        borderRadius: 3,
        py: { xs: 0, sm: 2 },
        flexDirection: "column",
        position: "relative",
        //bgcolor: "#F4F5F7",
        bgcolor: { sm: "#F4F5F7", xs: "#F4F5F7" },
        overflowY: "scroll",
        width: { sm: "100%", xs: "100%" },
        height: { sm: "80%", xs: "100%" },
        margin: "0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          justifyContent: "center",
          alignItems: "center",
          bgcolor: { xs: "white", sm: "white" },
          width: { sm: "70%", xs: "100%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { sm: "column", xs: "row" },
            bgcolor: { xs: "#F4F5F7", sm: "white" },
            width: "100%",
            p: { sm: "2%", xs: "0" }, // This sets the padding to 0 for xs screens
            pt: { sm: "2%", xs: "10%" }, // pt is for padding-top
            pb: { sm: "2%", xs: "10%" }, // pb is for padding-bottom
          }}
        >
          <Box sx={{ display: { sm: "none", xs: "flex" } }}>
            <IconButton
              onClick={() => navigate("/employee-offboard")}
              sx={{ display: { sm: "none", xs: "block" } }}
            >
              <ArrowBack />
            </IconButton>
          </Box>
          <Stack alignItems="center" marginTop="15px">
            <Typography
              sx={{ fontSize: { sm: "20px", xs: "17px" } }}
              variant="h5"
            >
              Employee Offboarding Details
            </Typography>
            <Typography
              color="#0A0B1A"
              variant="subtitle1"
              sx={{
                fontWeight: "light",
                fontSize: { sm: "15px", xs: "11px" },
                textAlign: { xs: "center", sm: "start" },
                marginTop: "5px",
              }}
            >
              Effortless onboarding, input details for accurate company records.
            </Typography>
          </Stack>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 1,
          }}
        >
          {/* <Box
                      sx={{
                          display: "flex",
                          alignItems: "center",
                      }}
                  >
                      <Typography
                          sx={{
                          bgcolor: "#FA6432",
                          color: "white",
                          p: 2,
                          borderRadius: "100%",
                          width: "1rem",
                          height: "1rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          }}
                      >
                          O
                      </Typography>
                    </Box> */}
          {/* <Box
                      sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: { sm: 20, xs: 8 },
                          width: "100%",
                      }}
                  >
                    <Typography fontSize={12}>Offboarding Information</Typography>
                  </Box> */}
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1, width: "70%" }}
        >
          <FormControl fullWidth margin="normal">
            <InputLabel id="offboarding-reason-label">
              Offboarding Reason
            </InputLabel>
            <Select
              labelId="offboarding-reason-label"
              id="offboarding-reason"
              label="Offboarding Reason"
              onChange={(e) =>
                setFormData({ ...formData, offBoardingReason: e.target.value })
              }
            >
              <MenuItem value="Career break">Career break</MenuItem>
              <MenuItem value="Resignation">Resignation</MenuItem>
              <MenuItem value="Retirement">Retirement</MenuItem>
              <MenuItem value="Relocation">Relocation</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              required
              id="last-employment-day"
              label="Last Employment Day"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setFormData({ ...formData, lastEmploymentDay: e.target.value })
              }
            />
          </FormControl>

          <FormControl fullWidth margin="normal">
            <TextField
              required
              id="last-working-day"
              label="Last Working Day"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) =>
                setFormData({ ...formData, lastWorkingDay: e.target.value })
              }
            />
          </FormControl>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: { xs: 10, sm: 10, md: 10 },
              mb: 8,
              gap: 3,
            }}
          >
            <Button
              onClick={() => navigate("/employee-offboard")}
              sx={{
                border: "1px solid black",
                px: 6,
                display: { sm: "flex", xs: "none" },
                bgcolor: "transparent",
                color: "black",

                fontSize: "13px",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#0A0B1A",
                  opacity: "80%",
                  color: "white",
                },
              }}
              variant="inherent"
            >
              Go Back
            </Button>

            <Button
              type="submit"
              disabled={!formFilled}
              sx={{
                bgcolor: "#FA6432",
                color: "white",
                textTransform: "none",
                px: 6,

                fontSize: "13px",
                "&:hover": {
                  bgcolor: "#FA6432",
                  opacity: "70%",
                },
              }}
              variant="contained"
            >
              Continue
            </Button>
          </Box>
          <Modal
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
          >
            <ConfirmationModalOffboard
              selectedEmployee={selectedEmployee}
              onClose={() => setModalOpen(false)}
              onConfirm={handleConfirmOffboard}
              titleText="You have initiated the employee off-board. Are you sure to off-board "
            />
          </Modal>
          {/* {modalOpen && (
                            <ConfirmationModalOffboard
                                onClose={() => setModalOpen(false)}
                                onConfirm={handleConfirmOffboard}
                                titleText="Are you sure you want to offboard this employee?"
                            />
                        )} */}
        </Box>
        {showAlert && (
          <Alert
            icon={<Success fill={{ xs: "#fff", sm: "#fff", md: "#22C55E" }} />}
            variant="outlined"
            sx={{
              position: "fixed",
              top: "3%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 9999,
              width: { xs: "90%", sm: "30%", md: "30%" },
              outline: "1.2px solid green",
              bgcolor: { md: "white", sm: "white", xs: "#3DCC72" },
              color: { md: "#0A0B1A", sm: "#0A0B1A", xs: "white" },
            }}
            severity="success"
            onClose={() => setShowAlert(false)}
          >
            You have successfully off-boarded employee
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default OffboardForm;
