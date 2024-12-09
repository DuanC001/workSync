import React, {useState, useEffect} from 'react';
import { BarChart, BarElement } from '@mui/x-charts/BarChart';
import { Box, Typography, MenuItem, FormControl,Select, Card, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import theme from '../theme/theme';
import { useTheme} from '@mui/material';
/* const chartData = [
    {
        name: 'January', 
        onboarded: 10, 
        offboarded: 2 
    },
    {
        name: 'February',
        onboarded: 15,
        offboarded: 4
    },
    {
        name: 'March',
        onboarded: 20,
        offboarded: 3
    },
    {
        name: 'April',
        onboarded: 25,
        offboarded: 5
    },
    {
        name: 'May',
        onboarded: 30,
        offboarded: 6
    },
    {
        name: 'June',
        onboarded: 35,
        offboarded: 7
    },
    {
        name: 'July',
        onboarded: 40,
        offboarded: 8
    },
    

]; */




export default function EmployeeManagementChart({data, onboardOffboardCountsQuarterly}) {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // console.log(data);
  // console.log(onboardOffboardCountsQuarterly);


  // const [chartData, setChartData] = useState([]);
  const [groupBy, setGroupBy] = useState('month');

  

  const handleChange = (event) => {
    setGroupBy(event.target.value);
  };  
  

  const chartData = Object.entries(data).map(([month, counts]) => ({
    name: month,
    onboarded: counts.onboarded,
    offboarded: counts.offboarded,
  }));

  useEffect(() => {
    let chartData;
    if (groupBy === 'month') {
      // Render data based on monthly grouping
      chartData = Object.entries(data).map(([month, counts]) => ({
        name: month,
        onboarded: counts.onboarded,
        offboarded: counts.offboarded,
      }));
    } else if (groupBy === 'quarter') {
      // Render data based on quarterly grouping
      chartData = onboardOffboardCountsQuarterly.map(({ quarter, onboarded, offboarded }) => ({
        name: quarter,
        onboarded,
        offboarded,
      }));
    }
  });

const allMonths = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const textMonths = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

const allQuarters = ['Q1', 'Q2', 'Q3', 'Q4'];

const chartDataWithAllMonths = allMonths.map(month => {
    const existingDataPoint = chartData.find(dataPoint => dataPoint.name === month);
    if (existingDataPoint) {
        return existingDataPoint;
    } else {
        return { name: month, onboarded: 0, offboarded: 0 }; 
    }
});


const onboardedData = chartDataWithAllMonths.map(dataPoint => dataPoint.onboarded);
const offboardedData = chartDataWithAllMonths.map(dataPoint => dataPoint.offboarded);
const months = chartDataWithAllMonths.map(dataPoint => dataPoint.name);

const onboardedDataQtr = onboardOffboardCountsQuarterly.map((data)=>data.onboarded);
const offboardedDataQtr = onboardOffboardCountsQuarterly.map((data)=>data.offboarded);
  // console.log(onboardedData, offboardedData);


  return (
    <Card sx={{p:1, height:"100%"}}>
        <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center", margin:".5rem"}}>
            <Box sx={{ flex: "1 0 60%" }}>
              <Typography variant={isMobile ? "h5Small" : "h5Large" }component="div" sx={{ flex:"2 0 70%" }}>
                  Employee Management
              </Typography>
              <Typography color={theme.palette.grey[200]}>
                  {groupBy.charAt(0).toUpperCase() + groupBy.slice(1)}
              </Typography>
            </Box>
    
            <FormControl sx={{display:"flex", flexDirection:"row", justifyContent:isMobile?"start":"center", alignItems:"center",flexWrap:isMobile?"wrap":"nowrap", gap:"1rem"}}>
                <Typography variant="body3" sx={{flex:isMobile?"1 0 20%":"1 0 40%", display:isMobile?"none":"block"}}>
                    <p sx={{display:"inline-flex" ,color:theme.palette.grey[100], fontSize:theme.typography.body2}}>Group <span sx={{display:"inline"}}>By:</span></p>
                </Typography>
                <Select sx={{width:"100%", height:"30px",fontSize:isMobile?"12px":"14px", padding:"6px 1rem" , paddingLeft:"0"}}
                    value={groupBy}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    IconComponent={props => <ExpandMoreIcon  {...props}  />}
                >
                <MenuItem value="month" sx={{color:theme.palette.grey[300]}}>Month</MenuItem>
                <MenuItem value="quarter" sx={{color:theme.palette.grey[300]}}>Quarter</MenuItem>
                {/* <MenuItem value="year">Year</MenuItem> */}
                </Select>
            </FormControl>
        </Box>

      
      
        <BarChart
          series={[
            { name: 'Onboarded', data: groupBy === 'month' ? onboardedData: onboardedDataQtr , color: '#3DCC72', cornerRadius:"4rem"},
            { name: 'Offboarded', data: groupBy === 'month' ? offboardedData: offboardedDataQtr , color: '#FF7070'},
          ]}
          height={290}
          xAxis={[{ data: groupBy==='month'?textMonths:allQuarters, scaleType: 'band', categoryGapRatio: 0.5,
          barGapRatio: 0.2 , axisLabel: {
            style: {
              fill: 'grey !important',
            },
          },
        }]}
          yAxis={[{ scaleType: 'linear' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
          // legendType="line"
          // sx={{marginTop: 2, maxLines: 1, overflow: 'hidden', textOverflow: 'ellipsis'}}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', marginRight: 4 }}>
              <Box sx={{ width: 14, height: 14,  borderRadius:"50%",background: "#3DCC72", marginRight: 1 }} />
              <Typography variant={isMobile?"body2": "body1"} sx={{color: theme.palette.grey[200]}}>Onboarded</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ width: 14, height: 14, borderRadius:"50%", background: '#FF7070', marginRight: 1 }} />
              <Typography variant={isMobile?"body2": "body1"} sx={{color: theme.palette.grey[200]}}>Offboarded</Typography>
            </Box>
        </Box>
    </Card>
  );
}

