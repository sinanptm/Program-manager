import { CircularProgress, Typography, Button, Box } from "@mui/material";
import TeamList from "../components/lists/TeamList";
import { useGetTeamsQuery } from "../slices/teamsApiSlice";
import { useState, useCallback } from "react";

const TeamScreen = () => {
  const [page, setPage] = useState(1);
  const limit = 10; 

  const { data, error, isLoading } = useGetTeamsQuery({ page, limit });
  const teams = data?.teams || [];
  const totalPages = data?.totalPages || 1;

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

  if (isLoading) return <CircularProgress />;

  if (error) return <div>Error: {error.message}</div>;

  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Teams
      </Typography>
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
