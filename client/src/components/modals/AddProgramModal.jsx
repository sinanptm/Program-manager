import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { useAddProgramMutation } from '../../slices/programsApiSlice';

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

const AddProgramModal = ({ open, handleClose }) => {
  const [programName, setProgramName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [errors, setErrors] = useState({});

  const [mutate] = useAddProgramMutation();

  const validate = () => {
    const newErrors = {};
    if (!programName) newErrors.programName = 'Program name is required';
    if (!category) newErrors.category = 'Category selection is required';
    if (!type) newErrors.type = 'Type selection is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onAddProgram = async () => {
    if (!validate()) return;
    try {
      await mutate({ name: programName, category, type });
      setProgramName('');
      setCategory('');
      setType('');
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
          Add New Program
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="programName"
          label="Program Name"
          name="programName"
          autoFocus
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          error={!!errors.programName}
          helperText={errors.programName}
        />
        <FormControl fullWidth margin="normal" required error={!!errors.category}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            label="Category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="lp">LP</MenuItem>
            <MenuItem value="up">UP</MenuItem>
            <MenuItem value="hs">HS</MenuItem>
            <MenuItem value="hss">HSS</MenuItem>
            <MenuItem value="junior">Junior</MenuItem>
          </Select>
          {errors.category && (
            <Typography color="error" variant="caption">
              {errors.category}
            </Typography>
          )}
        </FormControl>
        <FormControl fullWidth margin="normal" required error={!!errors.type}>
          <InputLabel id="type-label">Type</InputLabel>
          <Select
            labelId="type-label"
            id="type"
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="on-stage">On-Stage</MenuItem>
            <MenuItem value="off-stage">Off-Stage</MenuItem>
            <MenuItem value="online">Online</MenuItem>
          </Select>
          {errors.type && (
            <Typography color="error" variant="caption">
              {errors.type}
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

export default AddProgramModal;
