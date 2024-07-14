import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import AddProgramModal from '../modals/AddProgramModal';
import { useGetProgramsQuery } from '../../slices/programsApiSlice';
import { useState } from 'react';
import ProgramList from '../lists/ProgramList';

const EditPrograms = () => {
  const { data, error, isLoading } = useGetProgramsQuery();
  const programs = data?.programs;
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const filteredPrograms = programs?.filter((program) => {
    return (
      (statusFilter === '' || program.status === statusFilter) &&
      (categoryFilter === '' || program.category === categoryFilter)
    );
  });

  const sortedPrograms = filteredPrograms?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Programs
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
        <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '16px' }}>
          Add Program
        </Button>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select value={statusFilter} onChange={handleStatusChange} label="Status">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="done">Done</MenuItem>
              <MenuItem value="evaluating">Evaluating</MenuItem>
              <MenuItem value="waiting">Waiting</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select value={categoryFilter} onChange={handleCategoryChange} label="Category">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="lp">LP</MenuItem>
              <MenuItem value="up">UP</MenuItem>
              <MenuItem value="hs">HS</MenuItem>
              <MenuItem value="hss">HSS</MenuItem>
              <MenuItem value="junior">Junior</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
      <ProgramList programs={sortedPrograms} isAdmin={true} />
      <AddProgramModal open={open} handleClose={handleClose} />
    </>
  );
};

export default EditPrograms;
