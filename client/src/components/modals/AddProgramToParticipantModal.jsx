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
import { useAddProgramToParticipantMutation } from '../../slices/participantsApiSlice';
import { useGetProgramsQuery } from '../../slices/programsApiSlice';

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
  const [errors, setErrors] = useState({});
  const [mutate, { isError, error }] = useAddProgramToParticipantMutation();
  const { data, isLoading, isError: isProgramsError, error: programsError } = useGetProgramsQuery();

  const validate = () => {
    const newErrors = {};
    if (!programId) newErrors.programId = 'Program selection is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onAddProgram = async () => {
    if (!validate()) return;
    try {
      await mutate({ id: participantId, programId });
      setProgramId('');
      setErrors({});
      handleClose();
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
        <FormControl fullWidth required margin="normal" error={!!errors.programId}>
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
            ) : isProgramsError ? (
              <MenuItem disabled>Error loading programs</MenuItem>
            ) : (
              data.programs.map((program) => (
                <MenuItem key={program.id} value={program.id}>
                  {program.name}
                </MenuItem>
              ))
            )}
          </Select>
          {errors.programId && (
            <Typography color="error" variant="caption">
              {errors.programId}
            </Typography>
          )}
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
