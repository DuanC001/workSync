import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import theme from './theme';
import { useTheme } from '@mui/material/styles';



//CTA Button========================================
export const PrimaryButton = styled(Button)(({theme})=>{

    const styles = {
        fontSize: "18px",
        backgroundColor: theme.palette.primary.main,
        color: "white",
        '&:hover': {
            backgroundColor: "#e15a2d",
            color: "white"
        },
        '&:disabled': {
            backgroundColor: "#FFDBCF",
            color: "#FF9370",
        }
    };

    if (theme.breakpoints.down('sm')) {
        styles.fontSize = "14px";
    }

    return styles;
})


export const SecondaryButton = styled(Button)(({theme})=>{
    
    
    const styles = {
        fontSize: "18px",
        backgroundColor:"white",
        color:"black",
        border:"1px solid black",
        "&:hover":{
            color:"white",
            border:"1px solid #84858C",
            backgroundColor:"rgba(71, 72, 83, 1)"
        },
        "&:disabled":{
            backgroundColor: "rgba(152, 153, 155, 1)",
            color: "rgba(230, 230, 230, 1)"
        }
    }

    if (theme.breakpoints.down('sm')) {
        styles.fontSize = "14px";
    }

    return styles;
})




export const FloatingButton = styled(Button)(({theme, variant})=>{
    
    const styles= {
        fontSize: "18px",
        backgroundColor:theme.palette.primary.main,
        borderRadius:'56px',
        border:"1px solid white !important",
        color:'#fff',
        padding: '6px 18px',
        "&:hover":{
            backgroundColor:"white",
            color:theme.palette.primary.main,
            border:"1px solid theme.palette.primary.main"
        },
        "&:disabled":{
            backgroundColor:"",
            color:theme.palette.primary.main
        }
    }

    if (theme.breakpoints.down('sm')) {
        styles.fontSize = "14px";
    }

    return styles;

})


// status button =========================

export const StatusButtonActive = styled(Button)(({theme, variant})=>({ 
    display:"inline-flex",
    color:"rgba(0, 115, 42, 1)",
    backgroundColor:"rgba(197, 242, 213, 1)",
    padding:"3px 22px",
    borderRadius:"20px",
}))

export const StatusButtonInactive = styled(Button)(({theme, variant})=>({ 
    color:"rgba(153, 0, 0, 1)",
    backgroundColor:"rgba(255, 229, 229, 1)",
    display: "inline-flex",
    padding: "3px 22px",
    justifyContent:" center",
    alignItems:" center",
    gap: "10px"
}))

export const StatusButtonHold = styled(Button)(({theme, variant})=>({ 
    color:"rgba(153, 102, 0, 1)",
    backgroundColor:"rgba(255, 239, 207, 1)",
    display: "inline-flex",
    padding: "3px 22px",
    justifyContent:" center",
    alignItems:" center",
    gap: "10px",
    width: "114px"
}))


// landing page buttons

export const LandingPrimaryButton = styled(Button)(({theme})=>({
    fontSize: "14px",
    backgroundColor: "transparent",
    border:"1px solid white",
    color: "white", 
}))

export const LandingSecondaryButton = styled(Button)(({theme})=>({
    fontSize: "14px",
    backgroundColor:"white",
    color:theme.palette.primary.main,
    '&:hover': {
        backgroundColor: 'white',
        color: theme.palette.primary.main,
    }
    
}))