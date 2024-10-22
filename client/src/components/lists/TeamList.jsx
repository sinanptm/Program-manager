import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    Button
  } from "@mui/material";

const TeamList = ({teams,isDelete=false, handleRemove,isAdmin=false}) => {
  return (
    <div>
        <TableContainer component={Paper}>
            <Table aria-label="teams table">
                <TableHead>
                    <TableRow>
                        <TableCell>#</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Points</TableCell>
                         <TableCell align="right">{isAdmin&&'Members'}</TableCell>
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
                            <TableCell align="right">{isAdmin&& team.members.length}</TableCell>
                            {isDelete&&(
                                <TableCell align="right">
                                    <Button variant="contained" color="secondary" onClick={() => handleRemove(team.id)}>
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
