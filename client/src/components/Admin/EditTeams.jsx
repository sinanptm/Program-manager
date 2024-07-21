import {
  Alert,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import {
  useGetTeamsQuery,
  useDeleteTeamMutation,
} from "../../slices/teamsApiSlice";
import TeamList from "../lists/TeamList";
import useDebounce from "../../hooks/useDebounce";
import SearchInput from "../SearchInput";
import AddButton from "../AddButton";
import AddTeamModal from "../modals/AddTeamModal";
import Pagination from "../Pagination";  // Import Pagination component

const EditTeam = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, error, isLoading } = useGetTeamsQuery({ page, limit });
  const teams = data?.teams;
  const totalPages = data?.totalPages || 1;
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [deleteTeam, { isError, error: deleteError }] = useDeleteTeamMutation();

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleSearchChange = useCallback(
    (event) => setSearchTerm(event.target.value),
    []
  );

  const handleRemoveTeam = useCallback(
    async (teamId) => {
      try {
        await deleteTeam(teamId);
      } catch (error) {
        console.log(error);
      }
    },
    [deleteTeam]
  );

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  const filteredTeams = useMemo(() => {
    if (!teams) return [];
    return teams
      .filter((team) =>
        team.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      )
      .sort((a, b) => b.points - a.points);
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

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Teams
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="16px"
      >
        <AddButton onClick={handleOpen} label="Add" />
        <SearchInput
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Teams..."
        />
      </Box>
      {isError || (error && (
        <Alert severity="error">{deleteError?.data?.message || error.message}</Alert>
      ))}
      <TeamList
        teams={filteredTeams}
        isDelete={true}
        handleRemove={handleRemoveTeam}
        isAdmin={true}
      />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AddTeamModal open={open} handleClose={handleClose} />
    </>
  );
};

export default EditTeam;
