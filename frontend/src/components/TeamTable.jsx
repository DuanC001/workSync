import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TeamTable = ({ employees }) => {
  return (
    <Container sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      bgcolor: '#f4f5f7', 
      height: '500px', 
      maxWidth: 'lg',
      borderRadius: '8px'
    }}>
      <Box sx={{ overflowX: 'auto' }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 400 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Manager</TableCell>
                <TableCell align="right">Department</TableCell>
                <TableCell align="right">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow
                  key={employee.id} 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={`/employee/${employee._id}`}>{employee.name}</Link>
                  </TableCell>
                  <TableCell align="right">{employee.jobTitle}</TableCell>
                  <TableCell align="right">{employee.managerName}</TableCell>
                  <TableCell align="right">{employee.department}</TableCell>
                  <TableCell align="right">{employee.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
}

export default TeamTable;