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

const ParticipantsList = ({  participants,  actions,  handleRemove,  handleAddProgram }) => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="participants table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Team</TableCell>
              <TableCell align="left">Points</TableCell>
              <TableCell>Category</TableCell>
              {actions && <TableCell align="right">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((participant, index) => (
              <TableRow key={participant.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{participant.name}</TableCell>
                <TableCell>{participant.teamName}</TableCell>
                <TableCell align="left">{participant.points}</TableCell>
                <TableCell>{participant.category}</TableCell>
                {actions && (
                  <TableCell align="right">
                    {actions.remove && (
                     participant.points<=1&&(
                      <Button
                     size="small"
                     variant="contained"
                     color="secondary"
                     onClick={() => handleRemove(participant.id)}
                   >
                     Remove
                   </Button>
                     )
                    )}
                    {actions.addProgram && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleAddProgram(participant.id)}
                        style={{ marginLeft: 10 }}
                      >
                        Add Program
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ParticipantsList;
