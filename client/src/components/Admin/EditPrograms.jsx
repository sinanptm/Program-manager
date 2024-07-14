import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AddProgramModal from './modals/AddProgramModal';
import { useGetProgramsQuery } from '../../slices/programsApiSlice';
import { useState } from 'react';
import ProgramList from '../lists/ProgramList';

const EditPrograms = () => {
  const { data, error, isLoading } = useGetProgramsQuery();
  const programs = data?.programs;
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Programs
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '16px' }}>
        Add Program
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
      <ProgramList programs={programs} isAdmin={true} />
      <AddProgramModal open={open} handleClose={handleClose} />
    </>
  );
};

export default EditPrograms;
