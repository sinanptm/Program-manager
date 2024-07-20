import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ErrorScreen = ({ isAdmin }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (isAdmin) navigate("/admin/teams");
    else navigate("/teams");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
      bgcolor="background.default"
      p={3}
    >
      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Go Home
      </Button>
    </Box>
  );
};

export default ErrorScreen;
