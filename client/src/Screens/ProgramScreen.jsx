import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useGetProgramsQuery } from '../slices/programsApiSlice';

const ProgramScreen = () => {
    const { data, error, isLoading } = useGetProgramsQuery();
    const programs = data?.programs || []; 
    
    if (isLoading) return <CircularProgress />;

    if (error) return <div style={{ margin: '20px', color: 'red' }}>Error: {error.message}</div>;

    return (
       <>
        <Typography variant="h4" align="center" gutterBottom>
                Programs
        </Typography>
        <TableContainer component={Paper}>
            <Table aria-label="programs table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Type</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {programs.map((program, i) => (
                        <TableRow key={program.id || i}>
                            <TableCell component="th" scope="row">
                                {i + 1}
                            </TableCell>
                            <TableCell>{program.name}</TableCell>
                            <TableCell>{program.category}</TableCell>
                            <TableCell>{program.status}</TableCell>
                            <TableCell>{program.type}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
       </>
    );
};

export default ProgramScreen;
