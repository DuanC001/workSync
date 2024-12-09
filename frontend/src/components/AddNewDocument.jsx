import React, { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  InputLabel,
  Input,
  Button,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AddDocumentIconButton } from "./icons";
import CameraIcon from "./CameraIcon";
import { app } from "../firebase/firebase";
import dayjs from "dayjs";
import {
  getDownloadURL,
  getStorage,
  ref as firebaseRef,
  uploadBytesResumable,
} from "firebase/storage";
import { AddBox } from "@mui/icons-material";

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

const AddNewDocument = ({ onClose, open, selectedEmployee }) => {
  const [formData, setFormData] = useState({
    ...selectedEmployee,
    documentDate: selectedEmployee.documentDate ? dayjs(selectedEmployee.documentDate) : dayjs(),
  });

  const handleNewDocument = async () => {
    try {
      console.log("formData", formData);
      const url =
        import.meta.env.VITE_API_ENDPOINT +
        `/companies/${formData.companyId}/employees/${formData._id}`;
      const response = await fetch(url, {
        method: "PUT", //
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

  const handleDocumentUpload = async (e) => {
    e.preventDefault();
    const image = e.target.files[0];
    const storage = getStorage(app);
    const timestamp = Date.now();
    const storageRef = firebaseRef(
      storage,
      `documents/${timestamp}-${image.name}`
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
        setFormData({ ...formData, documentImage: downloadURL });
        console.log("downloadURL", downloadURL);
      }
    );
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: '100%',
          justifyContent: "space-between",
          gap: 2,
          width: { sm: "30rem", xs: "100vw" },
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto', // Add scroll to content if needed
          }}
        >
          <Box
            sx={{
              px: 4,
              py: 2,
            }}
          >
            <Typography
              display="flex"
              flexDirection="row"
              gap="0.7rem"
              alignItems="center"
              fontSize={20}
              fontWeight={500}
              textAlign="center"
            >
              {/* <IconButton onClick={onClose}> */}
                <AddDocumentIconButton />
              {/* </IconButton> */}
              Add New Document
            </Typography>
          </Box>

          <Box
            sx={{
              p: 4,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: "white",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
                backgroundColor: "#f5f5f5",
                borderRadius: 2,
                p: 8,
              }}
            >
              <img
                    style={{ width: "100%", objectFit: "contain" }}
                    src={`${formData.documentImage}`}
                    alt=""
                  />
              <CameraIcon />

              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                onChange={handleDocumentUpload}
              >
                Upload file
                <VisuallyHiddenInput type="file" />
              </Button>
            </Box>
            <Stack>
              <Input
                disableunderline
                placeholder="Document Type"
                onChange={(e) =>
                  setFormData({ ...formData, documentName: e.target.value })
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
                sx={{
                  color: "#84858C",
                  fontSize: "14px",
                }}
                htmlFor="valid till"
              >
                Date Added
              </InputLabel>
              <DatePicker
                onChange={(value) =>
                  setFormData({ ...formData, documentDate: value.toISOString() })
                }
                value={formData.documentDate}
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
                labelId="valid till"
              />
            </Stack>
            <Stack>
              <InputLabel
                variant="inherent"
                sx={{
                  color: "#84858C",
                  fontSize: "13px",
                }}
                htmlFor="notes"
              >
                Notes
              </InputLabel>
              <TextField
                multiline
                rows={3}
                disableunderline
                placeholder="Notes"
                onChange={(e) =>
                  setFormData({ ...formData, documentNotes: e.target.value })
                }
                sx={{
                  px: 1,
                  py: 0.4,
                  backgroundColor: "white",
                  "& .MuiInputBase-textarea::placeholder": {
                    color: "black",
                    fontSize: "12px",
                    opacity: 0.7,
                  },

                  borderRadius: 2,
                }}
              ></TextField>
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
                    '&:hover': {
                      bgcolor: '#0A0B1A', 
                      opacity: 0.8,
                      color: 'white'
                    },
                  }}
                  variant="inherent" 
                  onClick={onClose}
                >
                  Cancel
                </Button>
              <Button
                sx={{
                  bgcolor: "#FA6432",
                  color: "white",
                  textTransform: "none",
                  px: 4,
                  py: 1,
                  fontSize: "13px",
                  '&:hover': {
                    bgcolor: '#CC5229', 
                    color: 'white'
                  },
                }}
                variant="inherent"
                onClick={handleNewDocument}
              >
                Save
              </Button>
            </Box>
      </Box>
    </Drawer>
  );
};

export default AddNewDocument;
