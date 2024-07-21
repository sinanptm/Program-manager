import { Typography, Box, Alert } from "@mui/material";
import TeamList from "../components/lists/TeamList";
import { useGetTeamsQuery } from "../slices/teamsApiSlice";
import { useState, useCallback, useMemo } from "react";
import SearchInput from "../components/SearchInput";
import useDebounce from "../hooks/useDebounce";
import Pagination from "../components/Pagination";
import ListSkeleton from "../components/ListSkeleton";

const TeamScreen = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, error, isLoading, isFetching } = useGetTeamsQuery({
    page,
    limit,
    search: debouncedSearchTerm,
  });
  const teams = data?.teams || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const sortedTeams = useMemo(() => {
    return [...teams].sort((a, b) => b.points - a.points);
  }, [teams]);

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
      <Box>
        {isLoading && <ListSkeleton />}
        {error && !isLoading && (
          <Alert severity="error">Error: {error.message}</Alert>
        )}
        {isLoading && isFetching ? (
          <ListSkeleton />
        ) : (
          <>
            <TeamList teams={sortedTeams} />
            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {!isLoading && !error && teams.length === 0 && (
          <Typography align="center" variant="body1">
            No teams found.
          </Typography>
        )}
      </Box>
      <br />
      <br />
      <br />
    </>
  );
};

export default TeamScreen;
