import { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';

const FilterButton = ({ label, options, selectedValue, onChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (value) => {
    if (value !== undefined) {
      onChange(value);
    }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="filter-menu"
        aria-haspopup="true"
        variant="outlined"
        onClick={handleClick}
        sx={{
          textTransform: 'none',
          minWidth: '120px',
        }}
      >
        {label}
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleClose()}
        slotProps={{
          paper: {
            sx: {
              maxHeight: 200,
              width: '200px',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === selectedValue}
            onClick={() => handleClose(option.value)}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default FilterButton;
