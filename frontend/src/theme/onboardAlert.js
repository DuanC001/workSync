import styled from "@emotion/styled";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import theme from "./theme";

export const OnboardAlertStyled = styled(Alert)(({ theme, variant }) => ({
  position: "fixed",
  top: "10%",
  left: "55%",
  transform: "translate(-50%, -50%)",
  zIndex: theme.zIndex.snackbar + 1,
  backgroundColor: "white !important",
  color: theme.palette.grey[300],
  border: "1px solid green !important",
  "&.MuiAlert-root .MuiAlert-icon": {
    "& svg": {
      clipPath: "circle(50%)",
      color: "white !important",
      backgroundColor: "green !important",
    },
  },
  "&.MuiAlert-root .MuiAlert-action": {
    color: theme.palette.grey[300],
    "& button": {
      color: theme.palette.grey[300],
    },
  },
  [theme.breakpoints.down("sm")]: {
    left: "50%",
    backgroundColor: "green !important",
    color: "white",
    border: "none",
    "& .MuiAlert-icon": {
      "& svg": {
        clipPath: "circle(50%)",
        color: "green !important",
        backgroundColor: "white !important",
      },
    },
    "& .MuiAlert-action": {
      color: "white !important",
      "& button": {
        color: "white !important",
      },
    },
  },
}));
