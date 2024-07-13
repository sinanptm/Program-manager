import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TeamList from '../components/lists/TeamList'
import Typography from '@mui/material/Typography';
import { useGetTeamsQuery } from '../slices/teamsApiSlice';


const TeamScreen = () => {
    const { data, error, isLoading } = useGetTeamsQuery();

    if (isLoading) return <CircularProgress />;

    if (error) return <div>Error: {error.message}</div>;

    const teams= [...data?.teams].sort((a, b) => b.points - a.points);

    return (
        <>
        <Typography variant="h4" align="center" gutterBottom>
              Teams
        </Typography>
         <TeamList teams={teams} />
        </>
    );
};

export default TeamScreen;
