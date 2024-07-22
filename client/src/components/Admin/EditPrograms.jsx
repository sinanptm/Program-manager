import { Alert, Typography } from "@mui/material";
import { useState, useCallback } from "react";
import { useGetProgramsQuery } from "../../slices/programsApiSlice";
import ProgramList from "../lists/ProgramList";
import AddProgramModal from "../modals/AddProgramModal";
import useDebounce from "../../hooks/useDebounce";
import Pagination from "../utils/Pagination";
import ListSkeleton from "../utils/ListSkeleton";
import ResponsiveToolbar from "../utils/ResponsiveToolbar";

const EditPrograms = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const { data, error, isLoading, isFetching } = useGetProgramsQuery({
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
      <ResponsiveToolbar
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        handleOpen={handleOpen}
        statusOptions={statusOptions}
        statusFilter={statusFilter}
        handleStatusChange={handleStatusChange}
        categoryOptions={categoryOptions}
        categoryFilter={categoryFilter}
        handleCategoryChange={handleCategoryChange}
      />
      {error && <Alert severity="error">{error.message}</Alert>}
      {isLoading || isFetching ? (
        <ListSkeleton rows={10} columns={5} />
      ) : (
        <>
          <ProgramList programs={programs} isAdmin={true} />
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
      <AddProgramModal open={open} handleClose={handleClose} />
    </>
  );
};

export default EditPrograms;
