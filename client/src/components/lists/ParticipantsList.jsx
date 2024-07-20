import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

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
              {/* <TableCell>Programs</TableCell> */}
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
                {/* <TableCell>
                  {participant.programs.map((program, idx) => (
                    <span key={program.id}>
                      {program.name}
                      {idx < participant.programs.length - 1 && ", "}
                    </span>
                  ))}
                </TableCell> */}
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
