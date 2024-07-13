import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Alert from '@mui/material/Alert';
import { useAddProgramToParticipantMutation } from '../../../slices/participantsApiSlice'; // Update with your actual slice import
import { useGetProgramsQuery } from '../../../slices/programsApiSlice'; // Update with your actual slice import

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const AddProgramToParticipantModal = ({ open, handleClose, participantId }) => {
  const [programId, setProgramId] = useState('');
  const [mutate, { isError, error }] = useAddProgramToParticipantMutation();
  const { data, isLoading, isError: isError2, error: programsError } = useGetProgramsQuery();

  const onAddProgram = async () => {
    try {
      await mutate({ id: participantId, programId });
      setProgramId('');
      handleClose(); // Close modal only on successful addition
    } catch (error) {
      console.error('Error adding program:', error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-program-modal-title"
      aria-describedby="add-program-modal-description"
    >
      <Box sx={style}>
        <Typography id="add-program-modal-title" variant="h6" component="h2">
          Add Program to Participant
        </Typography>
        {isError && (
          <Alert severity="error" style={{ marginBottom: '16px' }}>
            {error.data.message}
          </Alert>
        )}
        <FormControl fullWidth required margin="normal">
          <InputLabel id="program-label">Program Name</InputLabel>
          <Select
            labelId="program-label"
            id="programId"
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            label="Program Name"
          >
            {isLoading ? (
              <MenuItem disabled>Loading programs...</MenuItem>
            ) : programsError ? (
              <MenuItem disabled>Error loading programs</MenuItem>
            ) : (
              data.programs.map((program) => (
                <MenuItem key={program.id} value={program.id}>
                  {program.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddProgram}
          style={{ marginTop: '16px' }}
        >
          Add Program
        </Button>
      </Box>
    </Modal>
  );
};

export default AddProgramToParticipantModal;
