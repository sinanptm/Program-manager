import {
  CircularProgress,
  Typography,
  Button,
  Alert,
  TextField,
} from "@mui/material";
import AddTeamModal from "../modals/AddTeamModal";
import {
  useGetTeamsQuery,
  useDeleteTeamMutation,
} from "../../slices/teamsApiSlice";
import { useState, useMemo, useCallback } from "react";
import TeamList from "../lists/TeamList";
import useDebounce from "../../hooks/useDebounce";

const EditTeam = () => {
  const { data, error, isLoading } = useGetTeamsQuery();
  const teams = data?.teams;
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Teams
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Team
        </Button>
        <TextField
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ flexGrow: 1, marginLeft: "16px", marginRight: "16px" }}
        />
      </div>
      {isError && <Alert severity="error">{deleteError?.data?.message}</Alert>}
      <TeamList
        teams={filteredTeams}
        isDelete={true}
        handleRemove={handleRemoveTeam}
        isAdmin={true}
      />
      <AddTeamModal open={open} handleClose={handleClose} />
    </>
  );
};

export default EditTeam;
