import { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const useErrorBoundary = () => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error) => {
      console.error("Caught an error:", error);
      setHasError(true);
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);

  return hasError;
};

const ErrorBoundary = ({ children }) => {
  const hasError = useErrorBoundary();

  if (hasError) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        bgcolor="background.default"
        p={3}
      >
        <Typography variant="h1" color="error" gutterBottom>
          Something went wrong.
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          An unexpected error has occurred. Please try again later.
        </Typography>
        <Button variant="contained" color="primary" component={Link} to="/">
          Go Home
        </Button>
      </Box>
    );
  }

  return children;
};

export default ErrorBoundary;