import React , {useState , useEffect} from 'react';
import { Box, Typography, Slider, Grid, Card } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import theme from '../theme/theme';





const EmployeeCountByDeptDashboard = ({departmentCount}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [emp, setEmp] = useState([]);
  
  /* useEffect(() => {
    setEmp(departmentCount);
  }, [departmentCount]) */

/* const departmentValues = [
  { name: 'Carpet Cleaning', value:emp, color: '#F44336' },
  { name: 'Residential Cleaning', value:emp, color: '#2196F3' },
  { name: 'Floor Restoration', value:emp, color: '#4CAF50' },
  { name: 'Commercial Cleaning', value:emp, color: '#FFC107' },
  { name: 'Window Cleaning', value:emp, color: '#9C27B0' },
]; */

/* function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
} */



const colors = ['#F44336', '#2196F3', '#4CAF50', '#FFC107', '#9C27B0'];

const departmentValues = departmentCount.map((item, index) => ({
  name: item.department,
  value: item.count,
  color: colors[index % colors.length],
}));

useEffect(() => {
  if (departmentCount && departmentCount.length > 0) {
    setEmp(departmentCount);
  }
}, [departmentCount]);

/* const departmentValues = departmentCount.map(dept => ({
  name: dept.department || 'Unknown',
  value: dept.count || 0, 
  color: '#F44336' 
})); */


  return (
    <Card sx={{height:"100%"}}>
      <Typography sx={{ textAlign: 'left', padding:"1rem", paddingBottom:"0" }} variant={isMobile?'h5Small':'h5Large'} component="div">Employee Count By Department</Typography>
      <Box sx={{padding:"1rem"}}>
        {departmentValues.map(({ name, value, color }) => (
          <Box sx={{display:"flex", gap:"1rem", justifyContent:"center", alignItems:"center", width:"70%", margin:"auto"}} key={name} >
            <Box sx={{textAlign:"right", flex:"1 0 30%" ,color:theme.palette.grey[200]}}>
              <Typography gutterBottom sx={{textAlign:"right", fontSize:"15px"}}>{name}</Typography>
            </Box>
            <Box sx={{flex:"1 0 60%"}}>
              <Slider 
                value={value}
                sx={{
                  color: theme.palette.grey[100],
                  height: "10px",
                  '& .MuiSlider-thumb': {
                    display: 'none', 
                    color: color,
                  },
                  '& .MuiSlider-track': {
                    color: color, 
                  },
                  /* '& .MuiSlider-rail': {
                    color: color
                  }, */
                }}
                valueLabelDisplay="off"
                aria-label={`${name} slider`}
              />
            </Box>
            <Box sx={{flex:"1 0 10%",color:theme.palette.grey[200] }}>
              <Typography>{value}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default EmployeeCountByDeptDashboard;
