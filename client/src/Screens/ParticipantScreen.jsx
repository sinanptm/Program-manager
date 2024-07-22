import { useState, useMemo, useCallback } from "react";
import { Typography, Box, Alert } from "@mui/material";
import { useGetParticipantsQuery } from "../slices/participantsApiSlice";
import ParticipantsList from "../components/lists/ParticipantsList";
import SearchInput from "../components/utils/SearchInput";
import useDebounce from "../hooks/useDebounce";
import Pagination from "../components/utils/Pagination";
import ListSkeleton from "../components/utils/ListSkeleton";

const ParticipantScreen = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { data, error, isLoading, isFetching } = useGetParticipantsQuery({
    page,
    limit,
    search: debouncedSearchTerm,
  });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredParticipants = useMemo(() => {
    if (!data?.participants) return [];
    return [...data.participants].sort((a, b) => b.points - a.points);
  }, [data]);

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
      {isLoading || isFetching ? (
        <ListSkeleton rows={10} columns={4} />
      ) : error ? (
        <Alert severity="error">Error: {error.message}</Alert>
      ) : (
        <>
          <ParticipantsList participants={filteredParticipants} />
          <Pagination
            page={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </>
  );
};

export default ParticipantScreen;
