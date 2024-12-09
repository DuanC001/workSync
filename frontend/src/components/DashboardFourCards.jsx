import React from "react";
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from "@mui/system";
import DashboardSingleTopCard from "./DashboardSingleTopCard";


/* const TopFourCardData = [
  {
    "title": "Example Title 1", "year": 2021, "percentage": 75, "number": 1
  },
  {
    "title": "Example Title 2", "year": 2022, "percentage": 85, "number": 2
  },
  {
    "title": "Example Title 3", "year": 2023, "percentage": 95, "number": 3
  },
  {
    "title": "Example Title 4", "year": 2024, "percentage": 65, "number": 4
  }
]; */
const bgcolor=["#596AA5", "#d0f3dd", "#fff3db", "#ffd9d9"];

const color = ["#596AA533", "#0bbf58", "#cc6907", "#ff4545"];

const DashboardFourCards = ({
  companyEmployeeCount,
  newEmployeeCount,
  offboardedEmployeeCount,
  departmentWiseEmployeeCount,
  totalEmployeeCount
}) => {

    // an array of card data using the dynamic props passed in
    const dynamicCardData = [
      {
        title: "Total Employees",
        year: new Date().getFullYear(),
        percentage: calculatePercentage(companyEmployeeCount, totalEmployeeCount),
        number: companyEmployeeCount
      },
      {
        title: "New Employees",
        year: new Date().getFullYear(),
        percentage: calculatePercentage(newEmployeeCount, totalEmployeeCount), 
        number: newEmployeeCount,
        color: color[1],
        bgcolor: bgcolor[1]
      },
      {
        title: "Employees Off-board ",
        year: new Date().getFullYear(),
        percentage: calculatePercentage(offboardedEmployeeCount, totalEmployeeCount), 
        number: offboardedEmployeeCount,
        color: color[2],
        bgcolor: bgcolor[2]
      },
      {
        title: "Total Departments",
        year: new Date().getFullYear(),
        percentage: calculatePercentage(Object.keys(departmentWiseEmployeeCount).length, totalEmployeeCount), 
        number: Object.keys(departmentWiseEmployeeCount).length,
        color: color[3],
        bgcolor: bgcolor[3]
      }
    ];

    const theme = useTheme();

    let isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: isMobile ? 'wrap': 'nowrap', gap: "1rem"}}>
            {dynamicCardData.map((card, index) => (
                <DashboardSingleTopCard
                    key={index}
                    title={card.title}
                    year={card.year}
                    percentage={`${card.percentage} %`}
                    number={card.number}  
                     isFirstCard={index === 0}
                     percentageColor={card.color}  
                     bgcolor={card.bgcolor}               
                    sx={{
                      ...(index === 0 && {
                        background: "linear-gradient(110.31deg, #596AA5 -23.72%, #597EFF 121.27%)",
                        color: "white"
                      }),
                    }}
                />
            ))}
        </Box>
    );
}

export default DashboardFourCards;

function calculatePercentage(part, whole) {
  if (!whole || whole === 0) return 0;
  return Number(((part / whole) * 100).toFixed(2));
}