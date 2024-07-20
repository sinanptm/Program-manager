import {
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
  Typography,
  Alert,
  CircularProgress,
  TextField,
  Box,
} from "@mui/material";
import AddProgramModal from "../modals/AddProgramModal";
import { useGetProgramsQuery } from "../../slices/programsApiSlice";
import { useState, useMemo, useCallback } from "react";
import ProgramList from "../lists/ProgramList";
import useDebounce from "../../hooks/useDebounce";

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

  const handleStatusChange = useCallback((event) => {
    setStatusFilter(event.target.value);
  }, []);

  const handleCategoryChange = useCallback((event) => {
    setCategoryFilter(event.target.value);
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, []);

  const filteredPrograms = useMemo(() => {
    if (!programs) return [];

    return programs
      .filter(
        (program) =>
          (statusFilter === "" || program.status === statusFilter) &&
          (categoryFilter === "" || program.category === categoryFilter) &&
          (debouncedSearchTerm === "" ||
            program.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      )
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [programs, statusFilter, categoryFilter, debouncedSearchTerm]);

  const handleNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  }, [page, totalPages]);

  const handlePreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Programs
      </Typography>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Add Program
        </Button>
        <TextField
          variant="outlined"
          label="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ flexGrow: 1, marginLeft: "16px", marginRight: "16px" }}
        />
        <div style={{ display: "flex", gap: "16px" }}>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusChange}
              label="Status"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="done">Done</MenuItem>
              <MenuItem value="evaluating">Evaluating</MenuItem>
              <MenuItem value="waiting">Waiting</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" style={{ minWidth: 120 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={handleCategoryChange}
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="lp">LP</MenuItem>
              <MenuItem value="up">UP</MenuItem>
              <MenuItem value="hs">HS</MenuItem>
              <MenuItem value="hss">HSS</MenuItem>
              <MenuItem value="junior">Junior</MenuItem>
            </Select>
          </FormControl>
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
