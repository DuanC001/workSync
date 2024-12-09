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
  IconButton,
} from "@mui/material";
import { BorderColorOutlined } from "@mui/icons-material";
import EmployeeImage from "./EmployeeImage";
import "../App.css";
import { styled } from "@mui/material/styles";
import { app } from "../firebase/firebase";
import { EditIcon } from "./icons";
import { BasicDetail } from "./icons";
import { editEmployee } from "../redux/employee/employeeSlice.js";
import {
  getDownloadURL,
  getStorage,
  ref as firebaseRef,
  uploadBytesResumable,
} from "firebase/storage";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const EditBasicDetails = ({ selectedEmployee, open, onClose }) => {
  const [formData, setFormData] = useState(selectedEmployee);
  const [saveDetails, setSaveDetails] = useState(false);
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
        setSaveDetails(true);

        onClose();
      } else {
        console.error("Server responded with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const storage = getStorage(app);
    const timestamp = Date.now();
    const storageRef = firebaseRef(
      storage,
      `avatars/${timestamp}-${image.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => null,
      (error) => {
        console.error("Error uploading a file", error);
      },
      async () => {
        // Once the upload is complete, get the download URL
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setFormData({ ...formData, profilePicture: downloadURL });
        console.log("downloadURL", downloadURL);
      }
    );
  };

  return (
    <>
      {selectedEmployee && (
        <Drawer anchor="right" open={open} onClose={onClose}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              justifyContent: "space-between",
              gap: 2,
              width: { sm: "30rem", xs: "100vw" },
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                overflowY: "auto", // Add scroll to content if needed
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
                    <BasicDetail color="#3DCC72" />
                  </Box>
                  Edit Basic Details
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  gap: 1,
                }}
              >
                {/* <EmployeeAvatar name={selectedEmployee.name} /> */}
                <EmployeeImage
                  width={80}
                  height={80}
                  img={`${formData.profilePicture}`}
                />
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  sx={{ color: "#FA6432" }}
                  aria-label="edit"
                >
                  <Button
                    sx={{
                      color: "#FA6432",
                      bgcolor: "transparent",
                      "&:hover": {
                        bgcolor: "transparent",
                      },
                    }}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    onChange={handleDocumentUpload}
                  >
                    Edit Picture
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box>
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
                    variant="inherent"
                    sx={{
                      color: "#84858C",
                      fontSize: "14px",
                    }}
                    htmlFor="add months"
                  >
                    Employee Name
                  </InputLabel>
                  <Input
                    disableUnderline
                    value={`${formData.name}`}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
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
                      fontSize: "14px",
                    }}
                    htmlFor="add months"
                  >
                    Employee Address
                  </InputLabel>
                  <Input
                    disableUnderline
                    value={`${formData.address}`}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
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
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    gap: 4,
                    justifyContent: "space-between",
                  }}
                >
                  <Stack width="50%">
                    <InputLabel
                      sx={{
                        color: "#84858C",
                        fontSize: "14px",
                      }}
                      htmlFor="province-select"
                    >
                      Province
                    </InputLabel>
                    <Select
                      id="province-select"
                      value={formData.province}
                      onChange={(e) =>
                        setFormData({ ...formData, province: e.target.value })
                      } // Uncommented and completed
                      autoWidth
                      sx={{
                        borderRadius: 2,
                        height: "2.5rem",
                        padding: 0,
                      }}
                    >
                      <MenuItem value="Alberta">Alberta</MenuItem>
                      <MenuItem value="British Columbia">
                        British Columbia
                      </MenuItem>
                      <MenuItem value="Manitoba">Manitoba</MenuItem>
                      <MenuItem value="New Brunswick">New Brunswick</MenuItem>
                      <MenuItem value="Newfoundland and Labrador">
                        Newfoundland and Labrador
                      </MenuItem>
                      <MenuItem value="Nova Scotia">Nova Scotia</MenuItem>
                      <MenuItem value="Ontario">Ontario</MenuItem>
                      <MenuItem value="Prince Edward Island">
                        Prince Edward Island
                      </MenuItem>
                      <MenuItem value="Quebec">Quebec</MenuItem>
                      <MenuItem value="Saskatchewan">Saskatchewan</MenuItem>
                    </Select>
                  </Stack>

                  <Stack width="50%">
                    <InputLabel
                      sx={{
                        color: "#84858C",
                        fontSize: "14px",
                      }}
                      htmlFor="country-select" // Ensures proper association with the select field
                    >
                      Country
                    </InputLabel>
                    <Select
                      id="country-select"
                      value={formData.country}
                      onChange={(e) =>
                        setFormData({ ...formData, country: e.target.value })
                      }
                      autoWidth
                      sx={{
                        borderRadius: 2,
                        height: "2.5rem",
                      }}
                    >
                      <MenuItem value="Canada">Canada</MenuItem>
                    </Select>
                  </Stack>
                </Box>
                <Stack>
                  <InputLabel
                    variant="inherent"
                    sx={{
                      color: "#84858C",
                      fontSize: "14px",
                    }}
                    htmlFor="add months"
                  >
                    Employee Email
                  </InputLabel>
                  <Input
                    disableUnderline
                    value={`${formData.email}`}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
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
                      fontSize: "14px",
                    }}
                    htmlFor="add months"
                  >
                    Employee Phone Number
                  </InputLabel>
                  <Input
                    disableUnderline
                    value={`${formData.phone}`}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
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
                      fontSize: "14px",
                    }}
                    htmlFor="add months"
                  >
                    Education
                  </InputLabel>
                  <Input
                    disableUnderline
                    value={`${formData.education}`}
                    onChange={(e) =>
                      setFormData({ ...formData, education: e.target.value })
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
                variant="contained" // Corrected from "inherent" to "contained" for MUI Button
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

export default EditBasicDetails;
