import {
    TableContainer,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    Skeleton
} from "@mui/material";

const ListSkeleton = ({ rows = 12, columns = 5 }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="loading skeleton">
                <TableHead>
                    <TableRow>
                        {[...Array(columns)].map((_, index) => (
                            <TableCell key={index}>
                                <Skeleton variant="text" />
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[...Array(rows)].map((_, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {[...Array(columns)].map((_, colIndex) => (
                                <TableCell key={colIndex}>
                                    <Skeleton variant="text" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ListSkeleton;
