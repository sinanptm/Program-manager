import { useState, useMemo, useCallback } from "react";
import { CircularProgress, Typography, Box, Alert } from "@mui/material";
import { useGetParticipantsQuery } from "../slices/participantsApiSlice";
import ParticipantsList from "../components/lists/ParticipantsList";
import SearchInput from '../components/SearchInput';
import useDebounce from "../hooks/useDebounce";
import Pagination from "../components/Pagination";

const ParticipantScreen = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, error, isLoading } = useGetParticipantsQuery({ page, limit, search: debouncedSearchTerm });

  const handlePageChange = (newPage) => {
    setPage(newPage);
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
      <Pagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default ParticipantScreen;
