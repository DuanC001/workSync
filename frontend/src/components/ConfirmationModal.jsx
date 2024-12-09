import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

const ConfirmationModal = ({ onClose, onConfirm, titleText }) => {
  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{titleText}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose}
          sx={{
            textTransform: "none",
            borderRadius: 1,
            backgroundColor: "white",
            border: "1px solid black",
            px: 2,
            color: "black",
            "&:hover":{
              backgroundColor: "#0A0B1A",
              color: "white",
              opacity: 0.8,
            }
        }}
        >
          No
        </Button>


        <Button onClick={onConfirm} 
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
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
