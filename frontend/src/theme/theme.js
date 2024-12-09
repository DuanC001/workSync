import { createTheme } from '@mui/material/styles';

const breakpoints={
    values: {
         xs: 0,
          sm: 600,
          md: 860,
          lg: 1198,
          xl: 1620,
    }
}

const theme = createTheme({
    fontFamily: 'Public Sans, Arial, sans-serif',
    palette: {
        primary: {
          main: '#FF7A58', 
          contrastText: '#ffffff', 
        },
        secondary: {
          main: '#708FFF', 
          contrastText: '#ffffff', 
        },
        error: {
          main: '#FF4040',
        },
        warning: {
          main: '#FFAA00',
        },
        info: {
          main: '#00D9FF',
        },
        success: {
          main: '#3CDC72',
        },
        grey: {
          50: '#F5F5F5',
          100: '#CECED1',
          200: '#84858C',
          300: '#474853',
          400: '#A0A1BA',
        }
    },
    breakpoints: {
        values: breakpoints.values,
    },
    typography:{
        fontFamily: [
            'Public Sans',
            'Arial',
            'sans-serif',
          ].join(','),
            h1Large:{
              fontFamily: 'Public Sans, Arial, sans-serif',
              fontWeight: 700,
              fontSize: "40px",
              lineHeight: 1.2, // Or '48px'
            },
            h1Small:{
              fontFamily: 'Public Sans, Arial, sans-serif',
              fontWeight: 700,
              fontSize: "32px",
              lineHeight: 1.25,// Or '40px'
            },
            h2Large:{
              fontFamily: 'Public Sans, Arial, sans-serif',
              fontWeight: 700,
              fontSize:" 32px",
              lineHeight: 1.25, // Or '40px'

            },
            h2Small:{
              fontFamily: 'Public Sans, Arial, sans-serif',
              fontWeight: 700,  
              fontSize: "24px",
              lineHeight: 1.33, // Or '32px'
            },
            h3Large:{
              fontFamily: 'Public Sans, Arial, sans-serif',
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: 1.33, // Or '32px'
            },
            h3Small:{
              fontFamily: 'Public Sans, Arial, sans-serif',
              fontWeight: 600,
              fontSize: "20px",
              fontWeight: 600,
              lineHeight: 1.4, // Or '28px'
            },
            h4Large:{
              fontFamily: 'Public Sans, Arial, sans-serif',
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: 1.4, // Or '28px'
            },
            h4Small:{
              fontFamily: 'Public Sans, Arial, sans-serif',
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: 1.6, // Or '26px'
            },
            h5Large:{
              fontFamily: 'Public Sans, Arial, sans-serif',
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: 1.5, // Or '24px'
            },
            h5Small:{
              fontFamily: 'Public Sans, Arial, sans-serif',
              fontWeight: 600,
              fontSize: "16px",
              lineHeight: 1.5, // Or '24px'
            },

            subtitle1:{
                fontFamily: 'Public Sans, Arial, sans-serif',
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: 1.5, // Or '24px'
            },
            subtitle2:{
                fontFamily: 'Public Sans, Arial, sans-serif',
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: 1.57, // Or '22px'
            },
            body1:{
                fontFamily: 'Public Sans, Arial, sans-serif',
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: 1.5, // Or '24px'
            },
            body2:{
                fontFamily: 'Public Sans, Arial, sans-serif',
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: 1.57, // Or '22px'
            },
            placeholder:{
                fontFamily: 'Public Sans, Arial, sans-serif',
                fontSize:"14px",
                fontWeight: 400,
                lineHeight: 1.5, // Or '24px'
            },
            caption:{
                fontFamily: 'Public Sans, Arial, sans-serif',
                fontSize: "12px",
                fontWeight: 600,
                lineHeight: 1.67, // Or '20px'
            }, 
    },
    components:{
        MuiButton: {
            styleOverrides: {
              root: {
                // default styles here
                borderRadius: 4,
                textTransform: 'none',
                color: '#FFFFFF', 
                backgroundColor: '#FF7A58',
                '&:hover': {
                    // Hover state
                    backgroundColor: 'some-hover-color', 
                },
                '&:active': {
                    // Active state
                    backgroundColor: 'some-active-color', 
                },
                '&:disabled': {
                    // Disabled state
                    backgroundColor: 'some-disabled-color', 
                    color: 'some-disabled-text-color', 
                },
                // design includes a shadow
                boxShadow: 'none',
                '&:hover': {
                    boxShadow: 'some-hover-shadow', 
                },
              },
              sizeLarge: {
                // Large button styles
                padding: '12px 22px',
                fontSize: '1rem', // 16px
                fontWeight:600,
                lineHeight: 1.5, // Or '24px'
              },
              sizeMedium: {
                // Medium button styles
                padding: '8px 20px',
                fontSize: '.875rem', // 14px
                fontWeight:600,
                lineHeight:1.57 // Or '22px'
              },
              sizeSmall: {
                // Small button styles
                padding: '6px 18px',
                fontSize: '.75rem', // 12px
                fontWeight:600,
                lineHeight:1.67 // Or '20px'
              },
            },
        },
        MuiTextField:{
            styleOverrides:{
                root:{
                    '& .MuiInputBase-input':{
                        fontSize: 16,
                        fontWeight: 400,
                        lineHeight: 1.5, // Or '24px'
                    },
                    '& .MuiInputLabel-root':{
                        color:"grey.50"
                    },
                    '& .MuiFormHelperText-root':{
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1.67, // Or '20px'
                    }
                }
            }
        },
        MuiChartsAxis: {
            styleOverrides: {
              label: { 
                fill: "#F5F5F5",
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1.57, // Or '22px'
              },
              directionX: {
                color: "#F5F5F5",
              },
              directionY: {
                color: "#F5F5F5",
              }
            },
        },
        
    }

});

theme.typography.h1={
    fontWeight: 700,
    fontFamily: 'Public Sans, Arial, sans-serif',
   
    [theme.breakpoints.down('lg')]: {
      fontSize: 40,
      lineHeight: 1.2, // Or '48px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 32,
      lineHeight: 1.25,// Or '40px'
    },
},
theme.typography.h2={
    fontFamily: 'Public Sans, Arial, sans-serif',
    fontWeight: 700,
    [theme.breakpoints.down('lg')]: {
        fontSize: 32,
        lineHeight: 1.25, // Or '40px'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
      lineHeight: 1.33, // Or '32px'
    },
},
theme.typography.h3={
    fontWeight: 700,
    fontFamily: 'Public Sans, Arial, sans-serif',
    [theme.breakpoints.down('lg')]:{
        fontSize: 24,
        lineHeight: 1.33, // Or '32px'
    },
    [theme.breakpoints.down('sm')]:{
        fontSize: 20,
        fontWeight: 600,
        lineHeight: 1.4, // Or '28px'
    },
},
theme.typography.h4={
    fontFamily: 'Public Sans, Arial, sans-serif',
    fontWeight: 600,
    [theme.breakpoints.down('lg')]:{
        fontSize: 20,
        lineHeight: 1.4, // Or '28px'
    },
    [theme.breakpoints.down('sm')]:{
        fontSize: 18,
        lineHeight: 1.6, // Or '26px'
    }
},
theme.typography.h5={
    fontFamily: 'Public Sans, Arial, sans-serif',
    fontWeight: 600,
    [theme.breakpoints.down('lg')]:{
        fontSize: 18,
        lineHeight: 1.5, // Or '24px'
    },
    [theme.breakpoints.down('sm')]:{
        fontSize: 16,
        lineHeight: 1.5, // Or '24px'
    }
}

export default theme;