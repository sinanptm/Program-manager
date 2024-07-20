import { useState } from "react";
import { CircularProgress, Typography, Button, Box } from "@mui/material";
import { useGetParticipantsQuery } from "../slices/participantsApiSlice";
import ParticipantsList from "../components/lists/ParticipantsList";

const ParticipantScreen = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, error, isLoading } = useGetParticipantsQuery({ page, limit });

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

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error: {error.message}</div>;

  const participants = [...data?.participants].sort(
    (a, b) => b.points - a.points
  );

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Participants
      </Typography>
      <ParticipantsList participants={participants} />
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
          Page {data.currentPage} of {data.totalPages}
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
      <br />
      <br /><br />
    </>
  );
};

export default ParticipantScreen;
