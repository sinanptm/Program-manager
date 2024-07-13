import React, { useState } from "react";
import ParticipantsList from "../lists/ParticipantsList";
import { useGetParticipantsQuery, useDeleteParticipantMutation } from "../../slices/participantsApiSlice";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import { Alert, Button } from "@mui/material";
import AddParticipantModal from "./modals/AddParticipantModal";
import AddProgramToParticipantModal from "./modals/AddProgramToParticipantModal";

const EditParticipants = () => {
  const { data, error, isLoading } = useGetParticipantsQuery();
  const [deleteParticipant, { isError }] = useDeleteParticipantMutation();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);

  const handleCloseAddModal = () => setOpenAddModal(false);
  const handleCloseProgramModal = () => setOpenProgramModal(false);

  if (isLoading) return <CircularProgress />;

  const participants = [...data?.participants].sort(
    (a, b) => b.points - a.points
  );

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
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenAddModal}
        style={{ marginBottom: "16px" }}
      >
        Add Participant
      </Button>
      {isError || error && <Alert severity="error">{deleteError?.data?.message ?? error}</Alert>}
      <ParticipantsList
        participants={participants}
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
