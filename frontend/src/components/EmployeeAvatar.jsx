import * as React from "react";
import { styled } from "@mui/material/styles";

const StyledAvatar = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 35, 
  height: 35, 
  borderRadius: "50%",
  backgroundColor: "#e5e5e5", 

  fontWeight: "bold",
}));

const EmployeeAvatar = ({ name }) => {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();
  return <StyledAvatar>{initials}</StyledAvatar>;
};

export default EmployeeAvatar;
