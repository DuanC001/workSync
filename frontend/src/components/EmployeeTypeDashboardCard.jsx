import React from 'react';
import { Card, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import theme from '../theme/theme';
import { useTheme, useMediaQuery } from '@mui/material';


const EmployeeTypeDashboardCard = ({ employeeTypeCount}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { companyEmployee, contractor } = employeeTypeCount;
    const total = companyEmployee + contractor;

    const calculatePercentage = (value) => {
        return (value / total) * 100;
    };

    return (
        <Card elevation={3} sx={{ paddingBottom: '0', height:"100%"}}>
            <CardContent>
                <Typography variant={isMobile?"h5Small":"h5Large"} style={{ marginBottom: '2rem' }}>Employment Type</Typography>
                <Box sx={{display:"flex", justifyContent:isMobile?"start":"center", gap:"2.3rem", alignItems:isMobile?"start":"center", padding:"1rem" , flexDirection:"column", paddingTop:"2rem"}}>
                    <Box sx={{display:"flex", color:"white", margin:"1rem", margin:isMobile?"auto":""}}>
                        
                        <Typography variant={isMobile?"h1Small":"h1Large"} style={{textAlign:"center", boxShadow: "0px 18.2259464263916px 35.641849517822266px 0px #FF996E66", borderRadius: '50%', background: "linear-gradient(180deg, #FF9A6E 34.38%, #FF524D 100%)",display: 'flex', justifyContent: 'center', alignItems: 'center', padding:"1rem",
                                width: '90px',
                                height: '90px',
                                objectFit: 'contain',
                                transform:'scale(1.3)',
                                zIndex: '1'}}>{companyEmployee}</Typography>
                        <Typography variant={isMobile?"h4Small":"h4Large"} style={{ textAlign: 'center' , background: "linear-gradient(356.21deg, rgba(39, 65, 157, 1) 4.28%, #4B72FF 105.73%)",borderRadius: '50%',display: 'flex', justifyContent: 'center', alignItems: 'center', padding:"1rem",
                                width: '70px',
                                height: '70px',
                                objectFit: 'cover'}}>{contractor}</Typography>
                    </Box>
                    <Box sx={{flex:"2 0 50%"}}>
                        <Box sx={{display:"flex", alignItems:"center"}}>
                            <Box sx={{ width: 10, height: 10, borderRadius:"50%", background: "linear-gradient(180deg, #FF9A6E 34.38%, #FF524D 100%)", marginRight: 1 }} />
                            <Typography  style={{ textAlign: 'left',fontSize:"13px", color:theme.palette.grey[200]}}>Company Employee</Typography>
                        </Box>

                        <Box sx={{display:"flex" ,alignItems:"center"}}>
                            <Box sx={{ width: 10, height: 10, borderRadius:"50%", background: "linear-gradient(356.21deg, #6779B7 4.28%, #4B72FF 105.73%)", marginRight: 1 }} />
                            <Typography  style={{ textAlign: 'left' , fontSize:"13px",color:theme.palette.grey[200]}}>Contracter</Typography>
                        </Box>
                    </Box>
                    
                </Box>    
            </CardContent>
        </Card>
    );
}

export default EmployeeTypeDashboardCard;