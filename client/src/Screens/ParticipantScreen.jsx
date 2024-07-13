import React from 'react';
import { useGetParticipantsQuery } from '../slices/participantsApiSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import ParticipantsList from '../components/lists/ParticipantsList';

const ParticipantScreen = () => {
    const { data, error, isLoading } = useGetParticipantsQuery();
    
    if (isLoading) return <CircularProgress />; 
    if (error) return <div>Error: {error.message}</div>;
    
    const participants = [...data?.participants].sort((a, b) => b.points - a.points);

    return (
        <>
            <Typography variant="h4" align="center" gutterBottom>
                Participants
            </Typography>
            <ParticipantsList participants={participants} />
        </>
    );
};

export default ParticipantScreen;
