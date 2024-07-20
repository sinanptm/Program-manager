import { CircularProgress, Typography, Alert } from "@mui/material";
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
          justifyContent: "flex-start",
          marginBottom: "16px",
        }}
      >
        <AddButton onClick={handleOpen} label="Add" />
        <SearchInput
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search Teams..."
        />
      </div>
      {isError ||
        (error && (
          <Alert severity="error">{deleteError?.data?.message || error}</Alert>
        ))}
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
