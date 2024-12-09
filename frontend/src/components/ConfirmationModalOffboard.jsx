import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import EmployeeImage from "./EmployeeImage";

const ConfirmationModalOffboard = ({
  selectedEmployee,
  onClose,
  onConfirm,
  titleText,
}) => {
  const confirmationModalStyle = {
    width: { sm: "30rem", xs: "95vw" },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    flexDirection: "column",
    bgcolor: "white",
    boxShadow: 24,
    borderRadius: 4,
    p: 6,
    position: "relative",
  };

  const [formData, setFormData] = useState(selectedEmployee);
  const handleSave = async () => {
    try {
      // const url = `http://localhost:3000/api/v1/companies/${formData.companyId}/employees/${formData._id}`
      const url =
        import.meta.env.VITE_API_ENDPOINT +
        `/companies/${formData.companyId}/employees/${formData._id}`;
      const response = await fetch(url, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
    <Box sx={confirmationModalStyle}>
      <IconButton
        aria-label="close"
        onClick={() => {
          onClose();
        }}
        sx={{ position: "absolute", top: 8, right: 8, color: "black" }}
      >
        <Close />
      </IconButton>

      {selectedEmployee && (
        <Box>
          <EmployeeImage
            width={150}
            height={150}
            img={`${selectedEmployee.profilePicture}`}
          />
        </Box>
      )}

      <Typography variant="h5" sx={{ fontWeight: "bold", fontSize: "25px" }}>
        Offboard Employee
      </Typography>
      {selectedEmployee && (
        <Typography
          variant="p"
          sx={{ fontWeight: "light", textAlign: "center", fontSize: "15px" }}
        >
          {titleText}
          <span style={{ fontWeight: "bold" }}>{selectedEmployee.name} ?</span>
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          sx={{
            textTransform: "none",
            borderRadius: 1,
            backgroundColor: "white",
            border: "1px solid black",
            px: 2,
            color: "black",
            "&:hover": {
              backgroundColor: "#0A0B1A",
              color: "white",
              opacity: 0.8,
            },
          }}
          //onClick={() => closeModal()}
          onClick={() => onClose()}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          sx={{
            textTransform: "none",
            borderRadius: 1,
            bgcolor: "#FA6432",
            px: 2,
            color: "white",
            "&:hover": {
              backgroundColor: "#CC5229",
            },
          }}
        >
          Off-board
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmationModalOffboard;

// const ConfirmationModal = ({ onClose, onConfirm, titleText }) => {
//   return (
//     <Dialog open onClose={onClose}>
//       <DialogTitle>{titleText}</DialogTitle>
//       <DialogActions>
//         <Button onClick={onClose}>No</Button>
//         <Button onClick={onConfirm} autoFocus>
//           Yes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ConfirmationModal;
// You have initiated the employee off-board. Are you sure to
//             off-board&nbsp;
