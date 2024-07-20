import {
  Typography,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import { useState, useCallback } from "react";
import { useGetProgramsQuery } from "../slices/programsApiSlice";
import ProgramList from "../components/lists/ProgramList";

const ProgramScreen = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, error, isLoading } = useGetProgramsQuery({ page, limit });

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

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <div style={{ margin: "20px", color: "red" }}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Programs
      </Typography>
      <ProgramList programs={programs} />
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

export default ProgramScreen;
