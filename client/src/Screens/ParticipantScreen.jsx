import { useState, useMemo, useCallback } from "react";
import { CircularProgress, Typography, Button, Box, Alert } from "@mui/material";
import { useGetParticipantsQuery } from "../slices/participantsApiSlice";
import ParticipantsList from "../components/lists/ParticipantsList";
import SearchInput from '../components/SearchInput';
import useDebounce from "../hooks/useDebounce";

const ParticipantScreen = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, error, isLoading } = useGetParticipantsQuery({ page, limit, search:debouncedSearchTerm });
  
  const handleNextPage = () => {
    if (page < data.totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredParticipants = useMemo(() => {
    if (!data?.participants) return [];

    return data.participants
      .filter(
        (participant) =>
          debouncedSearchTerm === "" ||
          participant.name
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
      )
      .sort((a, b) => b.points - a.points);
  }, [data, debouncedSearchTerm]);

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Participants
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom="16px"
      >
        <SearchInput
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Participants..."
        />
      </Box>
      <ParticipantsList participants={filteredParticipants} />
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
    </>
  );
};

export default ParticipantScreen;
