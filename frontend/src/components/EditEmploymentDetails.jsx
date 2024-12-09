import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  InputLabel,
  Input,
  Button,
  Stack,
  Select,
  MenuItem,
} from "@mui/material";
import { BagIcon } from "./icons";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const EditEmploymentDetails = ({ selectedEmployee, open, onClose }) => {
  //const [formData, setFormData] = useState(selectedEmployee);
  const [formData, setFormData] = useState({
    ...selectedEmployee,
    startDate: selectedEmployee.startDate
      ? dayjs(selectedEmployee.startDate)
      : dayjs(),
  });
  //console.log('formData', formData)
  const handleSave = async () => {
    try {
      const url =
        import.meta.env.VITE_API_ENDPOINT +
        `/companies/${formData.companyId}/employees/${formData._id}`;
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // transfer form into JSON
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("jsonResponse", jsonResponse);
        console.log("Success:", jsonResponse);

        onClose();
      } else {
        console.error("Server responded with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      {selectedEmployee && (
        <Drawer anchor="right" open={open} onClose={onClose}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: { sm: "30rem", xs: "100vw" },
              height: "100%",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto",
              }}
            >
              <Box
                sx={{
                  p: 3,
                }}
              >
                <Typography
                  display="flex"
                  flexDirection="row"
                  gap="0.7rem"
                  alignItems="center"
                  fontWeight={700}
                  fontSize={20}
                  variant="p"
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
                    <BagIcon />
                  </Box>
                  Employee Details
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Stack>
                  <InputLabel
                    sx={{
                      color: "#84858C",
                      fontSize: "13px",
                    }}
                    htmlFor="add months"
                  >
                    Employment Status
                  </InputLabel>
                  <Select
                    sx={{
                      borderRadius: 2,
                      height: "2.5rem",
                    }}
                    value={formData.status}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                  </Select>
                </Stack>
                <Stack>
                  <InputLabel
                    variant="inherent"
                    sx={{
                      color: "#84858C",
                      fontSize: "13px",
                    }}
                    htmlFor="add months"
                  >
                    Job Title
                  </InputLabel>
                  <Input
                    disableUnderline
                    variant="inherent"
                    value={`${formData.jobTitle}`}
                    onChange={(e) =>
                      setFormData({ ...formData, jobTitle: e.target.value })
                    }
                    sx={{
                      px: 1,
                      py: 0.4,
                      border: "1px solid #CECED1",
                      borderRadius: 2,
                      "& .MuiInputBase-input::placeholder": {
                        color: "black",
                        fontSize: "14px",
                        opacity: 0.7,
                      },
                    }}
                  ></Input>
                </Stack>
                <Stack>
                  <InputLabel
                    sx={{
                      color: "#84858C",
                      fontSize: "13px",
                    }}
                    htmlFor="department-select"
                  >
                    Assign Department
                  </InputLabel>
                  <Select
                    autoWidth
                    id="department-select"
                    sx={{
                      borderRadius: 2,
                      height: "2.5rem",
                    }}
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                  >
                    <MenuItem value="Sweeping">Sweeping</MenuItem>
                    <MenuItem value="Adversory">Adversory</MenuItem>
                    <MenuItem value="Cleaning">Cleaning</MenuItem>
                    <MenuItem value="Glass Maintenance">
                      Glass Maintenance
                    </MenuItem>
                  </Select>
                </Stack>

                <Stack>
                  <InputLabel
                    variant="inherent"
                    sx={{
                      color: "#84858C",
                      fontSize: "13px",
                    }}
                    htmlFor="add months"
                  >
                    Employee SIN Number
                  </InputLabel>
                  <Input
                    disableUnderline
                    value={`${formData.sin}`}
                    onChange={(e) =>
                      setFormData({ ...formData, sin: e.target.value })
                    }
                    sx={{
                      px: 1,
                      py: 0.4,
                      backgroundColor: "white",
                      border: "1px solid #CECED1",
                      borderRadius: 2,
                      "& .MuiInputBase-input::placeholder": {
                        color: "black",
                        fontSize: "14px",
                        opacity: 0.7,
                      },
                    }}
                  ></Input>
                </Stack>

                <Stack>
                  <InputLabel
                    variant="inherent"
                    sx={{
                      color: "#84858C",
                      fontSize: "13px",
                    }}
                    htmlFor="add months"
                  >
                    Managers Name
                  </InputLabel>
                  <Input
                    disableUnderline
                    value={`${formData.managerName}`}
                    onChange={(e) =>
                      setFormData({ ...formData, managerName: e.target.value })
                    }
                    sx={{
                      px: 1,
                      py: 0.4,
                      backgroundColor: "white",
                      border: "1px solid #CECED1",
                      "& .MuiInputBase-input::placeholder": {
                        color: "black",
                        fontSize: "14px",
                        opacity: 0.7,
                      },

                      borderRadius: 2,
                    }}
                  ></Input>
                </Stack>
                <Stack>
                  <InputLabel
                    variant="inherent"
                    sx={{
                      color: "#84858C",
                      fontSize: "13px",
                    }}
                    htmlFor="add months"
                  >
                    Manager's Email
                  </InputLabel>
                  <Input
                    disableUnderline
                    value={`${formData.managerEmail}`}
                    onChange={(e) =>
                      setFormData({ ...formData, managerEmail: e.target.value })
                    }
                    sx={{
                      px: 1,
                      py: 0.4,
                      backgroundColor: "white",
                      border: "1px solid #CECED1",
                      "& .MuiInputBase-input::placeholder": {
                        color: "black",
                        fontSize: "14px",
                        opacity: 0.7,
                      },

                      borderRadius: 2,
                    }}
                  ></Input>
                </Stack>
                {/* <Stack>
                  <InputLabel
                    variant="inherent"
                    sx={{
                      color: "#84858C",
                      fontSize: "13px",
                    }}
                    htmlFor="add months"
                  >
                    Job Start Date
                  </InputLabel>
                  <Input
                    disableUnderline
                    value={`${formData.startDate}`}
                    onChange={(e) =>
                      setFormData({ ...formData, startDate: e.target.value })
                    }
                    sx={{
                      px: 1,
                      py: 0.4,
                      backgroundColor: "white",
                      border: "1px solid #CECED1",
                      "& .MuiInputBase-input::placeholder": {
                        color: "black",
                        fontSize: "14px",
                        opacity: 0.7,
                      },

                      borderRadius: 2,
                    }}
                  ></Input>
                </Stack> */}
                <Stack>
                  <InputLabel
                    sx={{
                      color: "#84858C",
                      fontSize: "14px",
                    }}
                    htmlFor="Job Start Date"
                  >
                    Job Start Date
                  </InputLabel>
                  <DatePicker
                    value={formData.startDate}
                    onChange={(newValue) =>
                      setFormData({
                        ...formData,
                        startDate: newValue.toISOString(),
                      })
                    }
                    sx={{
                      height: "3rem",
                      backgroundColor: "white",
                      borderRadius: 3,
                      opacity: 1,
                      borderColor: "black",

                      "& .MuiInputLabel-root.Mui-focused": {},
                      "& .MuiOutlinedInput-root": {
                        opacity: 1,
                        "&:hover > fieldset": {
                          borderColor: "black",
                        },
                        height: "48px",
                        borderRadius: 3,
                      },
                      "& .MuiInput-underline:after": {
                        borderColor: "black",
                      },
                    }}
                    labelId="Job Start Date"
                  />
                </Stack>
                <Stack>
                  <InputLabel
                    variant="inherent"
                    sx={{
                      color: "#84858C",
                      fontSize: "13px",
                    }}
                    htmlFor="add months"
                  >
                    Salary Annual
                  </InputLabel>
                  <Input
                    disableUnderline
                    value={`${formData.salary}`}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    sx={{
                      px: 1,
                      py: 0.4,
                      backgroundColor: "white",
                      border: "1px solid #CECED1",
                      "& .MuiInputBase-input::placeholder": {
                        color: "black",
                        fontSize: "14px",
                        opacity: 0.7,
                      },

                      borderRadius: 2,
                    }}
                  />
                </Stack>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                bgcolor: "#f5f5f5",
                gap: 2,
                p: 4,
              }}
            >
              <Button
                sx={{
                  border: "1px solid black",
                  px: 2,
                  py: 1,
                  fontSize: "13px",
                  textTransform: "none",
                  bgcolor: "transparent",
                  color: "black",
                  "&:hover": {
                    bgcolor: "#0A0B1A",
                    opacity: 0.8,
                    color: "white",
                  },
                }}
                variant="inherent" // Corrected from "inherent" to "contained" for MUI Button
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                sx={{
                  bgcolor: "#FA6432",
                  color: "white",
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  fontSize: "13px",
                  "&:hover": {
                    bgcolor: "#CC5229",
                    color: "white",
                  },
                }}
                variant="inherent"
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default EditEmploymentDetails;
