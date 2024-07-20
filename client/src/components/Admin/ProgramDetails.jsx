import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  useGetProgramQuery,
  useSetWinnersMutation,
} from "../../slices/programsApiSlice";
import {
  CircularProgress,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
} from "@mui/material";
import SetWinnerModal from "../modals/SetWinnerModal";

const ProgramDetails = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProgramQuery({ id });
  const [openModal, setOpenModal] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [currentWinners, setCurrentWinners] = useState({
    firstPlace: null,
    secondPlace: null,
    thirdPlace: null,
  });
  const [setWinners] = useSetWinnersMutation();

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error: {error.message}</div>;
  if (!data?.program) return <div>No program data available</div>;

  const { name, category, status, type } = data.program;

  const handleOpenModal = () => {
    setOpenModal(true);
    setParticipants(data.program.participants);
    setCurrentWinners({
      firstPlace: data.program.firstPlace || null,
      secondPlace: data.program.secondPlace || null,
      thirdPlace: data.program.thirdPlace || null,
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSaveWinners = async (winnersData) => {
    try {
      await setWinners({ id, winners: winnersData });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenModal}
        className="mb-6"
      >
        Set Winners
      </Button>
      <Typography variant="h4" gutterBottom className="text-center">
        {name}
      </Typography>
      <Divider className="mb-6" />
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card className="bg-gray-100 shadow-md">
            <CardContent>
              <Typography variant="h6" className="text-gray-700">
                Program Details
              </Typography>
              <Typography variant="subtitle1" className="text-gray-600">
                Category: {category}
              </Typography>
              <Typography variant="subtitle1" className="text-gray-600">
                Status: {status}
              </Typography>
              <Typography variant="subtitle1" className="text-gray-600">
                Type: {type}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="bg-gray-100 shadow-md">
            <CardContent>
              <Typography variant="h6" className="text-gray-700">
                Participants
              </Typography>
              <List>
                {data.program.participants.map((participant, index) => (
                  <ListItem key={participant?.id ?? index}>
                    <ListItemText
                      primary={participant?.name}
                      secondary={`ID: ${participant?.id}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Divider className="my-6" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card className="bg-gray-100 shadow-md">
            <CardContent>
              <Typography variant="h6" className="text-gray-700">
                Winners
              </Typography>
              <List>
                {renderWinnerListItem("1st Place", data.program.firstPlace)}
                {renderWinnerListItem("2nd Place", data.program.secondPlace)}
                {renderWinnerListItem("3rd Place", data.program.thirdPlace)}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <SetWinnerModal
        open={openModal}
        handleClose={handleCloseModal}
        participants={participants}
        currentWinners={currentWinners}
        onSave={handleSaveWinners}
      />
    </Box>
  );
};

const renderWinnerListItem = (place, placeData) => {
  if (placeData?.participant) {
    return (
      <ListItem key={`winner-${place}`}>
        <ListItemText
          primary={`${place}: ${placeData.participant.name} - ${placeData.participant.team} (Points: ${placeData.points})`}
        />
      </ListItem>
    );
  }
  return null;
};

export default ProgramDetails;
