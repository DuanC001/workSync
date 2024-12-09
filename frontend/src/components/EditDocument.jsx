import { useState } from "react";
import {
  Box,
  Drawer,
  Typography,
  InputLabel,
  Input,
  Button,
  Stack,
  TextField,
  IconButton,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import EditIcon from "./EditIcon";
import { styled } from "@mui/material/styles";
import Success from "./Success";
import { app } from "../firebase/firebase";
import dayjs from "dayjs";
import {
  getDownloadURL,
  getStorage,
  ref as firebaseRef,
  uploadBytesResumable,
} from "firebase/storage";

const EditDocument = ({ selectedDocument, open, onClose }) => {
  const [saveDocument, setSaveDocument] = useState(false);
  const [formData, setFormData] = useState({
    ...selectedDocument,
    documentDate: selectedDocument.documentDate
      ? dayjs(selectedDocument.documentDate)
      : dayjs(),
  });
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

  const handleSaveDocument = async () => {
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
        setSaveDocument(true);

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
    <>
      {selectedDocument && (
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
                >
                  <Box
                    sx={{
                      bgcolor: "#CFD9FF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      p: 0.5,
                      borderRadius: 2,
                    }}
                    onChange={handleDocumentUpload}
                  >
                    <EditIcon color="#0038FF" />
                  </Box>
                  Edit Document
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
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
                    p: 2,
                  }}
                >
                  <img
                    style={{ width: "100%", objectFit: "contain" }}
                    src={`${formData.documentImage}`}
                    alt=""
                  />
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
                    <EditIcon />
                    Edit Image
                    <VisuallyHiddenInput type="file" />
                  </Button>
                </Box>
                <Stack>
                  <InputLabel
                    variant="inherent"
                    sx={{
                      color: "#84858C",
                      fontSize: "13px",
                    }}
                    htmlFor="add months"
                  >
                    ID Name
                  </InputLabel>
                  <Input
                    disableUnderline
                    value={`${formData.documentName}`}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        documentName: event.target.value,
                      })
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
                    Valid till
                  </InputLabel>
                  <DatePicker
                    value={formData.documentDate}
                    // onChange={(newValue) => setFormData({ ...formData, documentDate: newValue.toISOString() })}
                    onChange={(newValue) =>
                      setFormData({
                        ...formData,
                        documentDate: newValue.toISOString(),
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
                    rows={4}
                    disableUnderline
                    value={`${formData.documentNotes}`}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        documentNotes: event.target.value,
                      })
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
                onClick={handleSaveDocument}
              >
                Save
              </Button>
            </Box>
          </Box>
          {saveDocument && (
            <Alert
              icon={
                <Success fill={{ xs: "#fff", sm: "#fff", md: "#22C55E" }} />
              }
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
              Successfully changed 🎉
            </Alert>
          )}
        </Drawer>
      )}
    </>
  );
};

export default EditDocument;
