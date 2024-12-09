import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slide,
} from "@mui/material";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeleteIcon";
import { Close } from "@mui/icons-material";
import ConfirmationModal from "./ConfirmationModal";
import EditDocument from "./EditDocument";
import { useMediaQuery } from "@mui/material";
import { DocumentUnavailableIcon } from "../components/icons";
import dayjs from "dayjs";

const EmployeeDocumentDetails = ({
  selectedEmployee,
  setSelectedEmployee,
  handleAddDocument,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isEdititng, setIsEditing] = useState(false);
  //const [selectedDocument, setSelectedDocument] = useState({...selectedEmployee});
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleOpenModal = (document) => {
    setSelectedEmployee(document);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEditDocument = () => setIsEditing(true);

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };

  const handleDeleteDocument = async () => {
    try {
      setOpenDeleteModal(false);
      const toBeDelete = {
        documentImage: null,
        documentName: null,
        documentDate: null,
        documentId: null,
        documentNotes: null,
      };
      const url =
        import.meta.env.VITE_API_ENDPOINT +
        `/companies/${document.companyId}/employees/${document._id}`;

      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(toBeDelete), // transfer form into JSON
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        setSelectedEmployee(jsonResponse);
        setIsEditing(false);
      } else {
        console.error("Server responded with status:", response.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const asyncFn = async () => {
      try {
        // const url = `http://localhost:3000/api/v1/companies/${document.companyID}/employees/${document._id}`;
        const url =
          import.meta.env.VITE_API_ENDPOINT +
          `/companies/${document.companyID}/employees/${document._id}`;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const jsonResponse = await response.json();
          console.log("jsonResponse from document details", jsonResponse);
          setSelectedEmployee(jsonResponse);
        } else {
          console.error("Server responded with status:", response.status);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    asyncFn();
  }, [isEdititng]);

  const document = {
    ...selectedEmployee,
  };

  if (!document || !document.documentImage) {
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
        <DocumentUnavailableIcon
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
          There's no document on this screen
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleAddDocument()}
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" }, // Smaller button font size on xs screens
          }}
        >
          Add Document
        </Button>
      </Box>
    );
  }

  return (
    <>
      {document.documentImage && (
        <Box>
          <Card
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { sm: "row", xs: "column" },
              alignItems: "center",
              borderRadius: 2,
              p: 1,
              marginBottom: 2,
              boxShadow: "none",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <CardMedia
                onClick={isMobile ? () => handleOpenModal(document) : null}
                component="img"
                sx={{
                  width: { sm: 350, xs: "100%" },
                  minWidth: 200,
                  objectFit: "contain",
                }}
                image={`${document.documentImage}`}
                alt={document.documentName}
              />
              <Box sx={{ display: "flex", alignItems: "start" }}>
                <Stack spacing={1}>
                  <Typography
                    sx={{ fontSize: { sm: "18px", xs: "15px" } }}
                    color="#0A0B1A"
                    variant="h6"
                  >
                    {document.documentName}
                  </Typography>
                  {/* <Typography color="#84858C" variant="body2">
                    Added on {document.documentDate}
                  </Typography> */}
                  <Typography color="#84858C" variant="body2">
                    Added on{" "}
                    {dayjs(document.documentDate).format("MMM DD, YYYY")}
                  </Typography>
                  <Typography color="#474853" variant="body2">
                    Note {document.documentNotes}
                  </Typography>
                  <Typography
                    onClick={() => handleOpenModal(document)}
                    sx={{
                      cursor: "pointer",
                      display: { sm: "block", xs: "none" },
                    }}
                    color="#FA6432"
                    fontWeight={500}
                  >
                    View Document
                  </Typography>
                </Stack>
                <Stack
                  sx={{ display: { sm: "none", xs: "flex" } }}
                  direction="row"
                  spacing={1}
                  alignItems="center"
                >
                  <IconButton
                    onClick={() => handleEditDocument(document)}
                    color="#474853"
                    aria-label="edit"
                  >
                    <EditIcon color="#474853" />
                  </IconButton>
                  <IconButton
                    color="#474853"
                    aria-label="delete"
                    onClick={handleOpenDeleteModal}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </Box>
            </CardContent>
            <CardContent
              sx={{
                display: { sm: "flex", xs: "none" },
                flexDirection: "column",
              }}
            >
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton
                  onClick={() => handleEditDocument(document)}
                  color="#474853"
                  aria-label="edit"
                >
                  <EditIcon color="#474853" />
                </IconButton>
                <IconButton
                  onClick={handleOpenDeleteModal}
                  color="#474853"
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}
      <Dialog
        maxWidth={{ sm: "30%", xs: "100%" }}
        open={openModal}
        onClose={handleCloseModal}
      >
        <DialogTitle>
          <IconButton
            sx={{ position: "absolute", right: 8, top: 8 }}
            onClick={handleCloseModal}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {selectedEmployee && (
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                boxShadow: "none",
              }}
            >
              <CardMedia
                component="img"
                sx={{ width: "100%", alignSelf: "center" }}
                image={`${selectedEmployee.documentImage}`}
                alt={selectedEmployee.documentName}
              />
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Stack spacing={0.5}>
                  <Typography fontSize={12} color="#0A0B1A" variant="body3">
                    {selectedEmployee.documentName}
                  </Typography>
                  <Typography fontSize={11} color="#84858C" variant="body2">
                    Added on{" "}
                    {dayjs(document.documentDate).format("MMM DD, YYYY")}
                  </Typography>
                  <Typography fontSize={11} color="#474853" variant="body3">
                    Note {selectedEmployee.documentNotes}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <IconButton color="#474853" aria-label="edit">
                    <EditIcon color="#474853" />
                  </IconButton>
                  <IconButton
                    onClick={handleOpenDeleteModal}
                    color="#474853"
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          )}
        </DialogContent>
      </Dialog>

      {openDeleteModal && (
        <ConfirmationModal
          onClose={() => setOpenDeleteModal(false)}
          onConfirm={handleDeleteDocument}
          titleText="Are you sure you want to delete this document?"
        />
      )}

      {isEdititng && (
        <EditDocument
          open={isEdititng}
          onClose={() => setIsEditing(false)}
          selectedDocument={selectedEmployee}
        />
      )}
    </>
  );
};

export default EmployeeDocumentDetails;
