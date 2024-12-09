import styled from "@emotion/styled";
import Alert from "@mui/material/Alert";
import { useTheme } from "@mui/material/styles";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import theme from "./theme";

export const AlertStyled = styled(Alert)(({theme, variant})=>({

    backgroundColor:'white !important',
    color:theme.palette.grey[300] ,
    border:"1px solid rgba(61, 204, 114, 1) !important",
    '&.MuiAlert-root .MuiAlert-icon':{

        '& svg':{
        clipPath:'circle(50%)',
        // borderRadius:'50%',
        color:'white !important',
        backgroundColor:'rgba(61, 204, 114, 1) !important',
        }
    },
    '&.MuiAlert-root .MuiAlert-action':{
        color:theme.palette.grey[300],
        '& button':{
            color:theme.palette.grey[300],
        }
    },

    [theme.breakpoints.down('sm')]:{
        backgroundColor:'rgba(61, 204, 114, 1) !important',
        color:'white',
        border:"none",
        '& .MuiAlert-icon':{
            '& svg':{
                clipPath:'circle(50%)',
                color:'rgba(61, 204, 114, 1) !important',
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


