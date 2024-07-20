import { Alert, Button, Typography, CircularProgress, Box } from "@mui/material";
import { useState, useMemo, useCallback } from "react";
import { useGetProgramsQuery } from "../../slices/programsApiSlice";
import ProgramList from "../lists/ProgramList";
import AddProgramModal from "../modals/AddProgramModal";
import FilterButton from "../FilterButton";
import SearchInput from "../SearchInput";
import useDebounce from "../../hooks/useDebounce";
import AddButton from "../AddButton";

const EditPrograms = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const { data, error, isLoading } = useGetProgramsQuery({ page, limit });
  const programs = data?.programs;
  const totalPages = data?.totalPages || 1;
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  const handleStatusChange = useCallback((value) => setStatusFilter(value), []);
  const handleCategoryChange = useCallback((value) => setCategoryFilter(value), []);
  const handleSearchChange = useCallback((event) => setSearchTerm(event.target.value), []);

  const filteredPrograms = useMemo(() => {
    if (!programs) return [];
    return programs
      .filter(
        (program) =>
          (statusFilter === "" || program.status === statusFilter) &&
          (categoryFilter === "" || program.category === categoryFilter) &&
          (debouncedSearchTerm === "" || program.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [programs, statusFilter, categoryFilter, debouncedSearchTerm]);

  const handleNextPage = useCallback(() => {
    if (page < totalPages) setPage(page + 1);
  }, [page, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (page > 1) setPage(page - 1);
  }, [page]);

  if (isLoading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
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
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
        <AddButton onClick={handleOpen} label="Add" />
        <SearchInput
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search programs..."
        />
        <div style={{ display: "flex", gap: "16px" }}>
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
        </div>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
      <ProgramList programs={filteredPrograms} isAdmin={true} />
      <Box display="flex" justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          Previous
        </Button>
        <Typography variant="body1" mx={2}>
          Page {page} of {totalPages}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          Next
        </Button>
      </Box>
      <AddProgramModal open={open} handleClose={handleClose} />
    </>
  );
};

export default EditPrograms;
