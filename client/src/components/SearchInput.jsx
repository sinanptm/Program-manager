import { TextField, Box } from "@mui/material";

const SearchField = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <Box
      sx={{
        flexGrow: 1,
        marginLeft: { xs: "8px", sm: "16px" },
        marginRight: { xs: "8px", sm: "16px" },
        maxWidth: "500px",
        '@media (max-width: 600px)': {
          marginLeft: "8px",
          marginRight: "8px",
        },
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
          '& .MuiInputBase-input': {
            padding: '8px 12px',
          },
        }}
      />
    </Box>
  );
};

export default SearchField;
