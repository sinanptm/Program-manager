import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useAddParticipantMutation } from "../../slices/participantsApiSlice";
import { useGetTeamsQuery } from "../../slices/teamsApiSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const categories = ["lp", "up", "hs", "hss", "junior"];

const AddParticipantModal = ({ open, handleClose }) => {
  const { data, isLoading, isError } = useGetTeamsQuery();
  const [participantName, setParticipantName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});

  const [mutate] = useAddParticipantMutation();

  const validate = () => {
    const newErrors = {};
    if (!participantName)
      newErrors.participantName = "Participant name is required";
    if (!teamId) newErrors.teamId = "Team selection is required";
    if (!category) newErrors.category = "Category selection is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onAddParticipant = async () => {
    if (!validate()) return;
    try {
      await mutate({ name: participantName, team: teamId, category });
      setParticipantName("");
      setTeamId("");
      setCategory("");
      setErrors({});
      handleClose();
    } catch (error) {
      console.error("Error adding participant:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-participant-modal-title"
      aria-describedby="add-participant-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="add-participant-modal-title"
          variant="h6"
          component="h2"
        >
          Add New Participant
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="participantName"
          label="Participant Name"
          name="participantName"
          autoFocus
          value={participantName}
          onChange={(e) => setParticipantName(e.target.value)}
          error={!!errors.participantName}
          helperText={errors.participantName}
        />
        <FormControl fullWidth required margin="normal" error={!!errors.teamId}>
          <InputLabel id="team-label">Team</InputLabel>
          <Select
            labelId="team-label"
            id="teamId"
            value={teamId}
            onChange={(e) => setTeamId(e.target.value)}
            label="Team"
          >
            {isLoading ? (
              <MenuItem disabled>Loading teams...</MenuItem>
            ) : isError ? (
              <MenuItem disabled>Error loading teams</MenuItem>
            ) : (
              data.teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))
            )}
          </Select>
          {errors.teamId && (
            <Typography color="error" variant="caption">
              {errors.teamId}
            </Typography>
          )}
        </FormControl>
        <FormControl
          fullWidth
          required
          margin="normal"
          error={!!errors.category}
        >
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            label="Category"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
          {errors.category && (
            <Typography color="error" variant="caption">
              {errors.category}
            </Typography>
          )}
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={onAddParticipant}
          style={{ marginTop: "16px" }}
        >
          Add Participant
        </Button>
      </Box>
    </Modal>
  );
};

export default AddParticipantModal;