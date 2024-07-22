import { Box } from "@mui/material";
import AddButton from "../utils/AddButton";
import FilterButton from "../utils/FilterButton";
import SearchInput from "../utils/SearchInput";
import { useThrottledResize } from "../../hooks/useThrottling";

const ResponsiveToolbar = ({
  handleCategoryChange,
  handleOpen,
  handleSearchChange,
  handleStatusChange,
  searchTerm,
  statusFilter,
  statusOptions,
  categoryFilter,
  categoryOptions,
}) => {
  const width = useThrottledResize(300);

  return (
    <Box marginBottom="16px">
      {width > 400 ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <AddButton onClick={handleOpen} label="Add" />
          <SearchInput
            label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search programs..."
          />
          <Box display="flex" gap="16px">
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
          </Box>
        </Box>
      ) : (
        <>
          <Box marginBottom="8px">
            <SearchInput
              label="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search programs..."
              fullWidth
            />
          </Box>
          <Box display="flex" justifyContent="space-between">
            <AddButton onClick={handleOpen} label="Add" />
            <Box display="flex" gap="8px">
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
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ResponsiveToolbar;
