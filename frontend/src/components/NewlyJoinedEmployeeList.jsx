import React , {useState} from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItemStyled';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NewlyJoinedEmployeeCard from "./NewlyJoinedEmployeeCard";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import { fontSize, style, useMediaQuery, useTheme } from '@mui/system';
// import {MenuItemStyled} from '../theme/menuItemSize';
// import { PrimaryButton, SecondaryButton, FloatingButton } from '../theme/buttons';



/* const employeeData = [
    {
        id: 1,
        name: "Martin Geidt",
        department: "Carpet Cleaning",
        image: "https://picum.photos.jpg", 
        joinedDate:"January",
        moreAction: () => {
          console.log('More details for Martin Geidt');
        }
    },
    {
        id: 2,
        name: "John Doe",
        department: "Floor Cleaning",
        image: "https://picum.photos.jpg", 
        joinedDate:"February",
        moreAction: () => {
          console.log('More details for John Doe');
        }
    },
    {
        id: 3,
        name: "Jane Doe",
        department: "Window Cleaning",
        image: "https://picum.photos.jpg", 
        joinedDate:"January",
        moreAction: () => {
          console.log('More details for Jane Doe');
        }
    },
    {
        id: 4,
        name: "John Smith",
        department: "Carpet Cleaning",
        image: "https://picum.photos.jpg", 
        joinedDate:"January",
        moreAction: () => {
          console.log('More details for John Smith');
        }
    }
]; */


function NewlyJoinedEmployeeList({ newlyJoinedEmployeeList }) {
  // console.log("newlyJoinedEmployeeList", newlyJoinedEmployeeList);
  const [selectedMonth, setSelectedMonth] = useState('');
  const theme = useTheme();
  let isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  let isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const filteredList = selectedMonth === ''
    ? newlyJoinedEmployeeList
    : newlyJoinedEmployeeList.filter(employee => employee.startMonth === selectedMonth);


  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };


  return (
    <Card sx={{
      maxWidth:"350", margin: isTablet? 'none' : 'auto', maxHeight: '413px', overflowY: 'auto', '&::-webkit-scrollbar': {
        width: '6px',display:isTablet?"none":"block"
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#E6E6E6',
        borderRadius: '10px',
        border: '2px solid #E6E6E6',
        width: '6px'
      }

    }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", margin: "1rem 12px ", position: "sticky", top: "-1px", backgroundColor: "white", zIndex: "2" }}>
        <Box sx={{ flex: "1 0 60%"}}>
          <Typography variant={isMobile ? "h5Small" : "h5Large"} component="div" sx={{ flex: "2 0 60%" }}>
            Newly Joined
          </Typography>
          <Typography color={theme.palette.grey[200]}>
            {selectedMonth === '' ? 'All' : selectedMonth}
          </Typography>
        </Box>
        <FormControl sx={{ width: "100%", overflow: "hidden" }}>
          <Select
            // labelId="month-select-label"
            id="month-select"
            value={selectedMonth}
            onChange={handleMonthChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{ width:"100%", height:"12px",padding: "1rem", fontSize:"14px" , padding:"1rem 2px"}}
            IconComponent={props => <ExpandMore {...props} />}
            >
           
            <MenuItem sx={{fontSize:"15px",color:theme.palette.grey[300]}} value="">
              Month
            </MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'January'}>January</MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'February'}>February</MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'March'}>March</MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'April'}>April</MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'May'}>May</MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'June'}>June</MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'July'}>July</MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'August'}>August</MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'September'}>September</MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'October'}>October</MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'November'}>November</MenuItem>
            <MenuItem sx={{fontSize:"15px" ,color:theme.palette.grey[300]}} value={'December'}>December</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Filtered employee list based on the selected month */}
      <Box sx={{ mt: 2 }}>
        {filteredList.length > 0 ? (
          filteredList.map((employee) => (
            <NewlyJoinedEmployeeCard
              key={employee.id}
              name={employee.name}
              department={<>Dept: <b>{employee.department}</b></>}
              image={employee.image}
              flexStyle={{flex: "1 0 100%"}}
              nameStyle={{color: "black", fontWeight: "bold", fontSize:isMobile?"12px":"14px"}}
              departmentStyle={{ color:theme.palette.grey[400] }}/>
          ))
        ) : (
          // Display the placeholder when there are no employees in the filtered list
          <List>

            <ListItem>
              <ListItemAvatar>
                <Avatar /> {/* Placeholder for an empty avatar */}
              </ListItemAvatar>
              <ListItemText primary="Employee name" secondary="Department" />
            </ListItem>
          </List>
        )}
      </Box>

    </Card>
  );
}

export default NewlyJoinedEmployeeList;