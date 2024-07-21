import {
  CircularProgress,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import TeamList from "../components/lists/TeamList";
import { useGetTeamsQuery } from "../slices/teamsApiSlice";
import { useState, useCallback, useMemo } from "react";
import SearchInput from "../components/SearchInput";
import useDebounce from "../hooks/useDebounce";
import Pagination from "../components/Pagination";

const TeamScreen = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const { data, error, isLoading } = useGetTeamsQuery({ page, limit });
  const teams = data?.teams || [];
  const totalPages = data?.totalPages || 1;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) =>
      team.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [teams, debouncedSearchTerm]);

  if (isLoading)
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
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <br />
      <br />
      <br />
    </>
  );
};

export default TeamScreen;
