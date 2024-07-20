import {
  Typography,
  CircularProgress,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import { useGetProgramsQuery } from "../slices/programsApiSlice";
import ProgramList from "../components/lists/ProgramList";
import SearchInput from "../components/SearchInput";
import useDebounce from "../hooks/useDebounce";

const ProgramScreen = () => {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const limit = 10;
  const { data, error, isLoading } = useGetProgramsQuery({ page, limit });

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const programs = data?.programs || [];
  const totalPages = data?.totalPages || 1;

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredPrograms = useMemo(() => {
    return programs.filter(
      (program) =>
        debouncedSearchTerm === "" ||
        program.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [programs, debouncedSearchTerm]);

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

  if (error) {
    return <Alert severity="error">Error: {error.message}</Alert>;
  }

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
      <ProgramList programs={filteredPrograms} />
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
      <br />
      <br />
    </>
  );
};

export default ProgramScreen;
