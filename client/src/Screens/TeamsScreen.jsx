import { CircularProgress, Typography, Button, Box, Alert } from "@mui/material";
import TeamList from "../components/lists/TeamList";
import { useGetTeamsQuery } from "../slices/teamsApiSlice";
import { useState, useCallback, useMemo } from "react";
import SearchInput from '../components/SearchInput';
import useDebounce from "../hooks/useDebounce";

const TeamScreen = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const { data, error, isLoading } = useGetTeamsQuery({ page, limit });
  const teams = data?.teams || [];
  const totalPages = data?.totalPages || 1;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [page, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  }, [page]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) =>
      team.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [teams, debouncedSearchTerm]);

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );

  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const sortedTeams = [...filteredTeams].sort((a, b) => b.points - a.points);

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Teams
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
          placeholder="Search teams..."
        />
      </Box>
      <TeamList teams={sortedTeams} />
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
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Box>
      <br />
      <br /><br />
    </>
  );
};

export default TeamScreen;
