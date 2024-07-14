import React, { useState } from "react";
import ParticipantsList from "../lists/ParticipantsList";
import { useGetParticipantsQuery, useDeleteParticipantMutation } from "../../slices/participantsApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Alert, Button, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import AddParticipantModal from "../modals/AddParticipantModal";
import AddProgramToParticipantModal from "../modals/AddProgramToParticipantModal";

const EditParticipants = () => {
  const { data, error, isLoading } = useGetParticipantsQuery();
  const [deleteParticipant, { isError }] = useDeleteParticipantMutation();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");

  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleCloseProgramModal = () => setOpenProgramModal(false);
  const handleCategoryChange = (event) => setCategoryFilter(event.target.value);

  if (isLoading) return <CircularProgress />;

  const filteredParticipants = data?.participants.filter(
    (participant) => categoryFilter === "" || participant.category === categoryFilter
  ).sort((a, b) => b.points - a.points);

  const handleRemove = async (id) => {
    try {
      await deleteParticipant(id);
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };

  const handleAddProgram = (id) => {
    setSelectedParticipantId(id);
    setOpenProgramModal(true);
  };

  const handleOpenAddModal = () => setOpenAddModal(true);

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Participants
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '16px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddModal}
          style={{ marginBottom: "16px" }}
        >
          Add Participant
        </Button>
        <FormControl variant="outlined" style={{ minWidth: 200, marginBottom: '16px' }}>
          <InputLabel>Category</InputLabel>
          <Select value={categoryFilter} onChange={handleCategoryChange} label="Category">
            <MenuItem value="">
              <em>All</em>
            </MenuItem>
            <MenuItem value="lp">LP</MenuItem>
            <MenuItem value="up">UP</MenuItem>
            <MenuItem value="hs">HS</MenuItem>
            <MenuItem value="hss">HSS</MenuItem>
            <MenuItem value="junior">Junior</MenuItem>
          </Select>
        </FormControl>
      </div>
      {isError || error && <Alert severity="error">{deleteError?.data?.message ?? error}</Alert>}
      <ParticipantsList
        participants={filteredParticipants}
        actions={{ remove: true, edit: true, addProgram: true }}
        handleRemove={handleRemove}
        handleAddProgram={handleAddProgram}
      />
      <AddParticipantModal open={openAddModal} handleClose={handleCloseAddModal} />
      <AddProgramToParticipantModal
        open={openProgramModal}
        handleClose={handleCloseProgramModal}
        participantId={selectedParticipantId}
      />
    </>
  );
};

export default EditParticipants;
