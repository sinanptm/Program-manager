import React from 'react'
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


const TeamList = ({teams,isDelete=false}) => {
  return (
    <div>
        <TableContainer component={Paper}>
            <Table aria-label="teams table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Points</TableCell>
                        <TableCell align="right">Members</TableCell>
                        {isDelete&& <TableCell align="right">Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {teams.map((team, index) => (
                        <TableRow key={team.id}>
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell>{team.name}</TableCell>
                            <TableCell align="right">{team.points}</TableCell>
                            <TableCell align="right">{team.members.length}</TableCell>
                            {isDelete&&(
                                <TableCell align="right">
                                    <Button variant="contained" color="secondary" onClick={() => handleRemoveTeam(team.id)}>
                                      Remove
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </div>
  )
}

export default TeamList