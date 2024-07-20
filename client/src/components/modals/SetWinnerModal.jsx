import { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useSetWinnersMutation } from "../../slices/programsApiSlice";

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

const SetWinnerModal = ({
  open,
  handleClose,
  participants,
  currentWinners,
  onSave,
}) => {
  const [selectedParticipants, setSelectedParticipants] = useState({
    firstPlace: currentWinners?.firstPlace?.participant?.id || "",
    secondPlace: currentWinners?.secondPlace?.participant?.id || "",
    thirdPlace: currentWinners?.thirdPlace?.participant?.id || "",
  });
  const [points, setPoints] = useState({
    firstPlace: currentWinners?.firstPlace?.points || 0,
    secondPlace: currentWinners?.secondPlace?.points || 0,
    thirdPlace: currentWinners?.thirdPlace?.points || 0,
  });
  const [setWinners] = useSetWinnersMutation();

  const handleSave = async () => {
    const winnersData = {
      firstPlace: {
        participant: selectedParticipants.firstPlace,
        points: points.firstPlace,
      },
      secondPlace: {
        participant: selectedParticipants.secondPlace,
        points: points.secondPlace,
      },
      thirdPlace: {
        participant: selectedParticipants.thirdPlace,
        points: points.thirdPlace,
      },
    };

    await setWinners(winnersData);
    onSave(winnersData); // Pass data back to parent after save
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="set-winner-modal-title"
      aria-describedby="set-winner-modal-description"
    >
      <Box sx={style}>
        <Typography id="set-winner-modal-title" variant="h6" component="h2">
          Set Winners
        </Typography>

        {["firstPlace", "secondPlace", "thirdPlace"].map((place) => (
          <div key={place}>
            <Typography variant="subtitle1">{`${place
              .charAt(0)
              .toUpperCase()}${place.slice(1)}:`}</Typography>
            <FormControl fullWidth required margin="normal">
              <InputLabel id={`${place}-participant-label`}>
                Participant
              </InputLabel>
              <Select
                labelId={`${place}-participant-label`}
                id={`${place}-participant`}
                value={selectedParticipants[place]}
                onChange={(e) =>
                  setSelectedParticipants((prev) => ({
                    ...prev,
                    [place]: e.target.value,
                  }))
                }
                label="Participant"
              >
                {participants.map((participant, i) => (
                  <MenuItem key={participant?.id ?? i} value={participant?.id}>
                    {participant?.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required margin="normal">
              <InputLabel id={`${place}-points-label`}>Points</InputLabel>
              <Select
                labelId={`${place}-points-label`}
                id={`${place}-points`}
                value={points[place]}
                onChange={(e) =>
                  setPoints((prev) => ({ ...prev, [place]: e.target.value }))
                }
                label="Points"
              >
                {[...Array(101).keys()].map((point) => (
                  <MenuItem key={point} value={point}>
                    {point}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          style={{ marginTop: "16px" }}
        >
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default SetWinnerModal;
