import styled from '@emotion/styled';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';
import theme from './theme';



export const AlertErrorStyled = styled(Alert)(({theme, variant})=>({
   
    backgroundColor:'white !important',
    color:theme.palette.grey[300] ,
    border:"1px solid red !important",
    '&.MuiAlert-root .MuiAlert-icon':{
        
        '& svg':{
        clipPath:'circle(50%)',
        // borderRadius:'50%',
        color:'white !important',
        backgroundColor:'red !important',
        }
    },
    '&.MuiAlert-root .MuiAlert-action':{
        color:theme.palette.grey[300],
        '& button':{
            color:theme.palette.grey[300],
        }
    },

    [theme.breakpoints.down('sm')]:{
        backgroundColor:'red !important',
        color:'white',
        border:"none",
        '& .MuiAlert-icon':{
            '& svg':{
                clipPath:'circle(50%)',
                color:'red !important',
                backgroundColor:'white !important',
            }
        },
        '& .MuiAlert-action':{
            color:'white !important',
            '& button':{
                color:'white !important',
            }
        }, 
    }
}))
