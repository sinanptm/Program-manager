import { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useAddTeamMutation } from "../../slices/teamsApiSlice";

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

const AddTeamModal = ({ open, handleClose }) => {
  const [teamName, setTeamName] = useState("");
  const [errors, setErrors] = useState({});
  const [mutate] = useAddTeamMutation();

  const validate = () => {
    const newErrors = {};
    if (!teamName) newErrors.teamName = "Team name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onAddTeam = async () => {
    if (!validate()) return;
    try {
      await mutate({ name: teamName });
      setTeamName("");
      setErrors({});
      handleClose();
    } catch (error) {
      console.error("Error adding team:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-team-modal-title"
      aria-describedby="add-team-modal-description"
    >
      <Box sx={style}>
        <Typography id="add-team-modal-title" variant="h6" component="h2">
          Add New Team
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="teamName"
          label="Team Name"
          name="teamName"
          autoFocus
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          error={!!errors.teamName}
          helperText={errors.teamName}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={onAddTeam}
          style={{ marginTop: "16px" }}
        >
          Add Team
        </Button>
      </Box>
    </Modal>
  );
};

export default AddTeamModal;
