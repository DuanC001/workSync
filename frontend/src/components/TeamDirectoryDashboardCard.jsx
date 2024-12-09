import React, { useState,useEffect } from 'react';
import { Avatar, Box, Button, Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { PrimaryButton,SecondaryButton, FloatingButton } from '../theme/buttons';
import { useTheme, useMediaQuery } from '@mui/material';
import theme from '../theme/theme';

/* const teamImage = [
    {
        image: "https://picsum.photos/200/300",
    },
    {
        image: "https://picsum.photos/200/300?12",
    },
    {
        image: "https://picsum.photos/200/300",
    },
]; */

const TeamDirectoryDashboardCard = ({teamDirectory}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [team, setTeam] = useState([]);

    useEffect(() => {
        setTeam(teamDirectory);
    }, [teamDirectory]);


    return (
        <Box sx={{marginBottom:isMobile?"5rem":"0", height:"100%"}}>
            <Card sx={{background: "linear-gradient(158.41deg, #FF9A6E -10.4%, #FF524D 111.55%)", color:"white", padding:"1.9rem", height:"100%"}}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    {teamDirectory.map((item, index) => (
                        <Avatar
                            key={index}
                            src={item.image}
                            alt={`team member ${index}`}
                            style={{
                                borderRadius: '50%',
                                width: '65px',
                                height: '65px',
                                border: '2px solid white',
                                objectFit: 'cover',
                                transform: index === 1 ? 'scale(1.3)' : 'none',
                                zIndex: index === 1 ? '1' : '0',
                            }}
                        />
                    ))}
                </Box>
                
                <CardContent sx={{textAlign:"center", marginBottom:"0"}}>
                    <Typography variant={isMobile?"h5Small":"h5Large"} sx={{ textAlign: "center" , margin:"0", color:"white"}} >
                        Team Directory
                    </Typography>
                    <Typography variant={isMobile?"body2":"body1"} color="textSecondary" component="p" sx={{ textAlign: "center", color:"white"}}>
                        Manage your team with ease.
                    </Typography>
                    
                </CardContent>
                <Box sx={{margin:"auto", textAlign:"center"}}>
                    <Link to="/team-directory" style={{ textDecoration: 'none' }} sx={{margin:"auto", paddingTop:"1rem", textAlign:"center"}}>
                            <FloatingButton >
                                Manage Now
                            </FloatingButton>
                    </Link>
                </Box>
            </Card>
        </Box>
    );
};

export default TeamDirectoryDashboardCard;
