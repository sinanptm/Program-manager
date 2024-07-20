import { Button } from "@mui/material";

const AddButton = ({ onClick, label }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      sx={{
        textTransform: 'none',
        padding: '8px 16px',
        fontSize: {
          xs: '0.75rem', 
          sm: '0.875rem', 
        },
        '@media (max-width: 600px)': {
          padding: '6px 12px',
        },
      }}
    >
      {label}
    </Button>
  );
};

export default AddButton;
