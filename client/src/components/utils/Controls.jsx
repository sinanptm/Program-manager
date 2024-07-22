import { Box, Grid } from "@mui/material";
import AddButton from "../utils/AddButton";
import SearchInput from "../utils/SearchInput";
import FilterButton from "../utils/FilterButton";

const Controls = ({
  searchTerm,
  handleSearchChange,
  handleOpen,
  statusOptions,
  statusFilter,
  handleStatusChange,
  categoryOptions,
  categoryFilter,
  handleCategoryChange,
}) => {
  return (
    <Box marginBottom="16px">
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={8} md={6} display="flex" justifyContent="space-between">
          <AddButton onClick={handleOpen} label="Add" />
          <SearchInput
            label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search programs..."
          />
        </Grid>
        <Grid item xs={12} sm={4} md={6} display="flex" justifyContent="space-between">
          <FilterButton
            label="Status"
            options={statusOptions}
            selectedValue={statusFilter}
            onChange={handleStatusChange}
          />
          <FilterButton
            label="Category"
            options={categoryOptions}
            selectedValue={categoryFilter}
            onChange={handleCategoryChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Controls;
