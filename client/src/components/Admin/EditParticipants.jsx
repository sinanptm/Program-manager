import {
  Alert,
  Typography,
  Box,
} from "@mui/material";
import { useState, useCallback } from "react";
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
import Pagination from "../Pagination";
import ListSkeleton from '../ListSkeleton';

const EditParticipants = () => {
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, error, isLoading, isFetching } = useGetParticipantsQuery({
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

  const handleCategoryChange = useCallback((value) => {
    setCategoryFilter(value);
    setPage(1);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  }, []);

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

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

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
      {isLoading || isFetching ? (
        <ListSkeleton rows={10} columns={6} />
      ) : (
        <>
          <ParticipantsList
            participants={data.participants}
            actions={{ remove: true, edit: true, addProgram: true }}
            handleRemove={handleRemove}
            handleAddProgram={handleAddProgram}
          />
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
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
