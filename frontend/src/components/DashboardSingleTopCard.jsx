import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery, useTheme } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const DashboardSingleTopCard = ({ title, year, number, percentage,sx, isFirstCard,percentageColor,bgcolor}) => {

    const theme = useTheme();

    let isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <Box sx={{flex:isMobile ? "1 0 100%" : "1 0 22%", borderRadius:"8px"}}>
            <Card sx={{...sx}}>
                <CardContent>
                    <Typography variant= {isMobile ? "h5Small" : "h5Large"}>
                        {title}
                    </Typography>
                    <Typography color="text.secondary" sx={{color: isFirstCard? 'white':'#84858C'}} variant={isMobile ? "body2": "body1"}>
                        {year}
                    </Typography>
                    <Box sx={{display:"flex", justifyContent:"space-between" , alignItems:"center" , marginTop:"1rem"}}>
                        <Typography  component="h2" sx={{borderRadius:"20px", padding:"1px 6px", backgroundColor: isFirstCard? "#FFFFFF33" : bgcolor , color: percentageColor}}>
                            <b>{percentage}<TrendingUpIcon sx={{fontSize: isMobile?theme.typography.h4Small:theme.typography.h4Large, margin:"auto"}}></TrendingUpIcon></b>
                        </Typography>
                        <Typography color="text.secondary" sx={{color: isFirstCard ? 'white' : 'black' ,fontWeight:"bold", fontSize:isMobile ? theme.typography.h1Small: theme.typography.h1Large}}>
                            {number}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    )
};


export default DashboardSingleTopCard;