import {
  Alert,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import ParticipantsList from "../lists/ParticipantsList";
import {
  useGetParticipantsQuery,
  useDeleteParticipantMutation,
} from "../../slices/participantsApiSlice";
import AddParticipantModal from "../modals/AddParticipantModal";
import AddProgramToParticipantModal from "../modals/AddProgramToParticipantModal";
import useDebounce from "../../hooks/useDebounce";

const EditParticipants = () => {
  const [page, setPage] = useState(1);
  const limit = 10; // Number of participants per page
  const { data, error, isLoading } = useGetParticipantsQuery({ page, limit });
  const [deleteParticipant, { isError, error: deleteError }] =
    useDeleteParticipantMutation();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleCloseAddModal = useCallback(() => setOpenAddModal(false), []);
  const handleCloseProgramModal = useCallback(() => setOpenProgramModal(false), []);
  const handleCategoryChange = useCallback((event) => setCategoryFilter(event.target.value), []);
  const handleSearchChange = useCallback((event) => setSearchTerm(event.target.value), []);

  const filteredParticipants = useMemo(() => {
    if (!data?.participants) return [];

    return data.participants
      .filter(
        (participant) =>
          categoryFilter === "" || participant.category === categoryFilter
      )
      .filter(
        (participant) =>
          debouncedSearchTerm === "" ||
          participant.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      .sort((a, b) => b.points - a.points);
  }, [data, categoryFilter, debouncedSearchTerm]);

  const handleRemove = useCallback(async (id) => {
    try {
      await deleteParticipant(id).unwrap();
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  }, [deleteParticipant]);

  const handleAddProgram = useCallback((id) => {
    setSelectedParticipantId(id);
    setOpenProgramModal(true);
  }, []);

  const handleOpenAddModal = useCallback(() => setOpenAddModal(true), []);

  const handleNextPage = useCallback(() => {
    if (page < data.totalPages) {
      setPage(page + 1);
    }
  }, [page, data]);

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Participants
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="16px"
      >
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAddModal}
        >
          Add Participant
        </Button>
        <TextField
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ flexGrow: 1, marginLeft: "16px", marginRight: "16px" }}
        />
        <FormControl variant="outlined" style={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={categoryFilter}
            onChange={handleCategoryChange}
            label="Category"
          >
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
      </Box>
      {(isError || error) && (
        <Alert severity="error">
          {deleteError?.data?.message ?? error.message}
        </Alert>
      )}
      <ParticipantsList
        participants={filteredParticipants}
        actions={{ remove: true, edit: true, addProgram: true }}
        handleRemove={handleRemove}
        handleAddProgram={handleAddProgram}
      />
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Typography variant="body1" mx={2}>
          Page {page} of {data.totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={page === data.totalPages}
        >
          Next
        </Button>
      </Box>
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
