import {
  Alert,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { useState, useCallback } from "react";
import { useGetProgramsQuery } from "../../slices/programsApiSlice";
import ProgramList from "../lists/ProgramList";
import AddProgramModal from "../modals/AddProgramModal";
import FilterButton from "../FilterButton";
import SearchInput from "../SearchInput";
import useDebounce from "../../hooks/useDebounce";
import AddButton from "../AddButton";
import Pagination from "../Pagination"; 

const EditPrograms = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, error, isLoading } = useGetProgramsQuery({
    page,
    limit,
    status: statusFilter,
    category: categoryFilter,
    search: debouncedSearchTerm,
  });

  const programs = data?.programs;
  const totalPages = data?.totalPages || 1;
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleStatusChange = useCallback((value) => setStatusFilter(value), []);
  const handleCategoryChange = useCallback(
    (value) => setCategoryFilter(value),
    []
  );
  const handleSearchChange = useCallback(
    (event) => setSearchTerm(event.target.value),
    []
  );

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  const statusOptions = [
    { label: "None", value: "" },
    { label: "Done", value: "done" },
    { label: "Evaluating", value: "evaluating" },
    { label: "Waiting", value: "waiting" },
  ];

  const categoryOptions = [
    { label: "None", value: "" },
    { label: "LP", value: "lp" },
    { label: "UP", value: "up" },
    { label: "HS", value: "hs" },
    { label: "HSS", value: "hss" },
    { label: "Junior", value: "junior" },
  ];

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Programs
      </Typography>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBottom="16px"
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
      {error && <Alert severity="error">{error.message}</Alert>}
      <ProgramList programs={programs} isAdmin={true} />
      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <AddProgramModal open={open} handleClose={handleClose} />
    </>
  );
};

export default EditPrograms;
