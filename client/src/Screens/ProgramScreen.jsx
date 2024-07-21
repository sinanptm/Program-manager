import { Typography, Box, Alert } from "@mui/material";
import { useState, useCallback } from "react";
import { useGetProgramsQuery } from "../slices/programsApiSlice";
import ProgramList from "../components/lists/ProgramList";
import SearchInput from "../components/SearchInput";
import useDebounce from "../hooks/useDebounce";
import CustomPagination from "../components/Pagination";
import ListSkeleton from "../components/ListSkeleton";

const ProgramScreen = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, error, isLoading, isFetching } = useGetProgramsQuery({
    page,
    limit,
    search: debouncedSearchTerm,
  });

  const programs = data?.programs || [];
  const totalPages = data?.totalPages || 1;

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Programs
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
          placeholder="Search Programs..."
        />
      </Box>
      <Box>
        {(isLoading || !data) && <ListSkeleton />}
        {error && !isLoading && (
          <Alert severity="error">Error: {error.message}</Alert>
        )}
        {isLoading && isFetching ? (
          <ListSkeleton />
        ) : (
          <>
            <ProgramList programs={programs} />
            <CustomPagination
              page={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </Box>
      <br />
      <br />
      <br />
    </>
  );
};

export default ProgramScreen;
