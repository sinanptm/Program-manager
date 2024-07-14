import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import AddTeamModal from './modals/AddTeamModal';
import { useGetTeamsQuery, useDeleteTeamMutation } from '../../slices/teamsApiSlice';
import { useState } from 'react';
import TeamList from '../lists/TeamList'

const EditTeam = () => {
  const { data, error, isLoading } = useGetTeamsQuery();
  const teams = data?.teams;
  const [open, setOpen] = useState(false);
  const [deleteTeam, { isError, error: deleteError }] = useDeleteTeamMutation();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleRemoveTeam = async (teamId) => {
    try {
      await deleteTeam(teamId);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) return <CircularProgress />;

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Teams
      </Typography>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '16px' }}>
        Add Team
      </Button>
      {isError && <Alert severity="error">{deleteError.data.message}</Alert>}
      <TeamList teams={teams} isDelete={true} handleRemove={handleRemoveTeam} />
      <AddTeamModal open={open} handleClose={handleClose} />
    </>
  );
};

export default EditTeam;