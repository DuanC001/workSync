import React , {useState,useEffect} from 'react';
import {Box, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Snackbar, Alert, Typography, IconButton } from '@mui/material';
import { PrimaryButton } from '../theme/buttons';
import CloseIcon from '@mui/icons-material/Close'; 
import { useTheme, useMediaQuery } from '@mui/material';
import { AlertStyled } from '../theme/alert';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMore from '@mui/icons-material/ExpandMore';


function ReportExportDialog({ open, setOpen, captureDashboard, snackbarOpen,setSnackbarOpen,snackbarMessage, setSnackbarMessage}) {
    const [month, setMonth] = React.useState('');
    const [fileFormat, setFileFormat] = React.useState('');
    const [loading, setLoading] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    /* useEffect(() => {
      if (reportExported) {
          setSnackbarOpen(true);
          setReportExported(false); 
      }
  }, [reportExported]); */
    
  
    

  
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    const handleMonthChange = (event) => {
        setMonth(event.target.value);
    };
    
    const handleFormatChange = (event) => {
        setFileFormat(event.target.value);
    };

    const handleCloseDialog = () => {
      // setSnackbarOpen(false);
      setMonth('');
      setFileFormat('');
      setOpen(false); 
    };



    const handleDownloadReport = async () => {
        if (!fileFormat) {
            setSnackbarMessage({ message: 'Please select a file format', severity: 'error' });
            setSnackbarOpen(true);
            return;
        }
    
        setLoading(true);
    
        try {
            await captureDashboard();
            setTimeout(() => {
                setOpen(false);
                setSnackbarMessage({ message: 'Report downloaded successfully', severity: 'success' });
                setSnackbarOpen(true); 
            }, 3000); 
        } catch (error) {
            console.error('Error during report generation:', error);
            setSnackbarMessage({ message: 'Error during report generation', severity: 'error' });
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    };
    
    


    return (
        <Box sx={{margin:"auto", padding:"3rem"}}>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <Box sx={{ textAlign:"center", padding:"1rem"}}>
                    <DialogTitle variant={isMobile?'h3Small': 'h3Large'} sx={{paddingBottom:"0"}}>
                        Download Employee Report
                        <IconButton
                            aria-label="close"
                            onClick={handleCloseDialog}
                            sx={{
                                position: 'absolute',
                                right: theme.spacing(1),
                                top: theme.spacing(1),
                                color: theme.palette.grey[500],
                            }}
                        >
                        <CloseIcon />
                        </IconButton>  
                    </DialogTitle>
                    <Typography color={theme.palette.grey[200]} variant={isMobile?'body2': 'body1'}>Access detailed employee insights with one click for informed decision-making.</Typography>
                </Box>
                <DialogContent sx={{display:"grid" , gap:"1rem"}}>
                  <Select
                      value={month}
                      onChange={handleMonthChange}
                      displayEmpty
                      fullWidth
                    placeholder="Select Month"
                    IconComponent={ExpandMore}
                    sx={{color:theme.palette.grey[200]}}
                  >
                      <MenuItem value="">
                          Select Month
                      </MenuItem>
                      <MenuItem value={'january'}>January</MenuItem>
                      <MenuItem value={'february'}>February</MenuItem>
                      <MenuItem value={'march'}>March</MenuItem>
                      <MenuItem value={'april'}>April</MenuItem>
                      <MenuItem value={'may'}>May</MenuItem>
                      <MenuItem value={'june'}>June</MenuItem>
                      <MenuItem value={'july'}>July</MenuItem>
                      <MenuItem value={'august'}>August</MenuItem>
                      <MenuItem value={'september'}>September</MenuItem>
                      <MenuItem value={'october'}>October</MenuItem>
                      <MenuItem value={'november'}>November</MenuItem>
                      <MenuItem value={'december'}>December</MenuItem>
              
                  </Select>
                  <Select
                    value={fileFormat}
                    onChange={handleFormatChange}
                    displayEmpty
                    fullWidth
                    placeholder="Select File Format"
                    IconComponent={ExpandMore}
                    sx={{color:theme.palette.grey[200]}}
                  >
                   
                   <MenuItem value=''>Select File Format</MenuItem>
                    <MenuItem value='pdf'>PDF</MenuItem>
                    <MenuItem value='docx'>Docx</MenuItem>
                  </Select>
                </DialogContent>
                <DialogActions sx={{margin:"1rem"}}>
                    <PrimaryButton
                    onClick={handleDownloadReport}
                     sx={{margin:"auto"}} disabled={!month || !fileFormat} hover>
                        Download Report {loading && <CircularProgress size={24} sx={{color:'white', marginLeft:"1rem"}}/>}
                    </PrimaryButton>
                   
                </DialogActions>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} anchorOrigin={{ 
                    vertical: 'top',
                    horizontal: isMobile ? 'center' : 'right',
                }}>
                    <AlertStyled onClose={handleSnackbarClose} severity="success">
                        Report exported successfully
                    </AlertStyled>
                </Snackbar>
            </Dialog>
        </Box>
    );
}

export default ReportExportDialog;
