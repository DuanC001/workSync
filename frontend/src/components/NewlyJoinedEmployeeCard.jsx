import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Avatar from '@mui/material/Avatar';
import { CardHeader } from '@mui/material';

const NewlyJoinedEmployeeCard = ({ name, department, image, nameStyle, departmentStyle,flexStyle }) => {
    return (
        <Box sx={{ maxWidth: 345}}>
        <Box sx={{position: 'relative', '::after': {
                    content: '""', 
                    display: 'block',
                    height: '1px',
                    background: '#F5F5F5',
                    width: '90%',
                margin: '0 auto',}
                }}>
            <CardHeader 
                avatar={<Avatar aria-label="employee" src={image} />}
                title={name}
                subheader={department}
                titleTypographyProps={{ style: nameStyle }}
                subheaderTypographyProps={{ style: departmentStyle }}
            sx={{flex:"1 0 100%"}}/>
        </Box>
    </Box>
    );
};

export default NewlyJoinedEmployeeCard;

