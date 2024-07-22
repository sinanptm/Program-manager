import {Pagination as Page,Stack} from '@mui/material';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <Stack spacing={2} alignItems="center" mt={2}>
      <Page
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
      />
    </Stack>
  );
};

export default Pagination;
