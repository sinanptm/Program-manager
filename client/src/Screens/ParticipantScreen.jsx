import React from 'react';
import { useGetParticipantsQuery } from '../slices/participantsApiSlice';
import CircularProgress from '@mui/material/CircularProgress';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

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
        <TableContainer component={Paper}>
            <Table aria-label="participants table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell> 
                        <TableCell>Name</TableCell>
                        <TableCell>Team</TableCell>
                        <TableCell align="left">Points</TableCell>
                        <TableCell>Programs</TableCell>
                        <TableCell>Category</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {participants.map((participant, index) => (
                        <TableRow key={participant.id}>
                            <TableCell>{index + 1}</TableCell> 
                            <TableCell>{participant.name}</TableCell>
                            <TableCell>{participant.teamName}</TableCell>
                            <TableCell align="left">{participant.points}</TableCell>
                            <TableCell>
                                {participant.programs.map(program => (
                                    <span key={program.id}>{program.name}</span>
                                ))}
                            </TableCell>
                            <TableCell>{participant.category}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    );
};

export default ParticipantScreen;
