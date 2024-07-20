import {
  Alert,
  Typography,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import {
  useGetParticipantsQuery,
  useDeleteParticipantMutation,
} from "../../slices/participantsApiSlice";
import ParticipantsList from "../lists/ParticipantsList";
import AddParticipantModal from "../modals/AddParticipantModal";
import AddProgramToParticipantModal from "../modals/AddProgramToParticipantModal";
import FilterButton from "../FilterButton";
import SearchInput from "../SearchInput";
import useDebounce from "../../hooks/useDebounce";
import AddButton from "../AddButton";

const EditParticipants = () => {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, error, isLoading } = useGetParticipantsQuery({
    page,
    limit,
    category: categoryFilter,
    search: debouncedSearchTerm,
  });

  const [deleteParticipant, { isError, error: deleteError }] =
    useDeleteParticipantMutation();
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const [selectedParticipantId, setSelectedParticipantId] = useState(null);

  const handleCloseAddModal = useCallback(() => setOpenAddModal(false), []);
  const handleCloseProgramModal = useCallback(
    () => setOpenProgramModal(false),
    []
  );

  const handleCategoryChange = useCallback(
    (value) => {
      setCategoryFilter(value);
      setPage(1); 
    },
    []
  );

  const handleSearchChange = useCallback(
    (event) => {
      setSearchTerm(event.target.value);
      setPage(1); 
    },
    []
  );

  const handleRemove = useCallback(
    async (id) => {
      try {
        await deleteParticipant(id).unwrap();
      } catch (error) {
        console.error("Error deleting participant:", error);
      }
    },
    [deleteParticipant]
  );

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
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const categoryOptions = [
    { label: "All", value: "" },
    { label: "LP", value: "lp" },
    { label: "UP", value: "up" },
    { label: "HS", value: "hs" },
    { label: "HSS", value: "hss" },
    { label: "Junior", value: "junior" },
  ];

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
        <AddButton onClick={handleOpenAddModal} label="Add" />
        <SearchInput
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search participants..."
        />
        <FilterButton
          label="Category"
          options={categoryOptions}
          selectedValue={categoryFilter}
          onChange={handleCategoryChange}
        />
      </Box>
      {(isError || error) && (
        <Alert severity="error">
          {deleteError?.data?.message ?? error.message}
        </Alert>
      )}
      <ParticipantsList
        participants={data.participants}
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
      <AddParticipantModal
        open={openAddModal}
        handleClose={handleCloseAddModal}
      />
      <AddProgramToParticipantModal
        open={openProgramModal}
        handleClose={handleCloseProgramModal}
        participantId={selectedParticipantId}
      />
    </>
  );
};

export default EditParticipants;
