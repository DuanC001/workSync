import React from "react";
import { styled } from "@mui/material/styles";

// const StyledAvatar = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   width: 35,
//   height: 35,
//   borderRadius: "100%",
//   overflow:'hidden'

// }));

// const EmployeeImage = ({ img }) => {
//  if (img === null || img === undefined || img === "null") return  null
//   return (
//     <StyledAvatar>
//       <img style={{objectFit:'cover' , width:'100%'}} src={img} alt="avatar" />
//     </StyledAvatar>
//   );
// };

const EmployeeImage = ({ img , height=35 , width=35}) => {
 
  const StyledAvatar = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: width ,
    height: height,
    borderRadius: "100%",
    overflow: "hidden",
  }));
  if (img === null || img === undefined || img === "null") return  null
    return (
      <StyledAvatar width={width} height={height}>
        <img style={{objectFit:'cover' , width:'100%'}} src={img} alt="avatar" />
      </StyledAvatar>
    );
};

export default EmployeeImage;
