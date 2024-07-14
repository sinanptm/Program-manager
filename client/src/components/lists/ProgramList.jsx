import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';

const ProgramList = ({ programs, isAdmin }) => {
  const navigate = useNavigate();

  const handleRowClick = (id) => {
    if (isAdmin) {
      navigate(`/admin/program-details/${id}`);
    }
  };

  return (
    <div>
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
              <TableRow
                key={program.id || i}
                onClick={() => handleRowClick(program.id)}
                style={{ cursor: isAdmin ? 'pointer' : 'default' }}
              >
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
    </div>
  );
};

export default ProgramList;
