import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { useGetProgramsQuery } from '../slices/programsApiSlice';
import ProgramList from '../components/lists/ProgramList'

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
        <ProgramList programs={programs} />
       </>
    );
};

export default ProgramScreen;
