import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  TablePagination,
  Box,
} from "@mui/material";
import { Edit, Visibility } from "@mui/icons-material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { styled } from "@mui/system";
import { Link } from 'react-router-dom';

const createData = (serial, col1, col2, col3) => {
  return { serial, col1, col2, col3 };
};

const rows = Array.from({ length: 50 }, (_, index) =>
  createData(index + 1, "Data1", "Data2", "Data3")
);

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ddd",
  padding: "8px",
  color: "black",
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ddd",
  backgroundColor: "#285a9e",
  color: "white",
  fontWeight: "bold",
  padding: "8px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f0f5ff",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
}));

const TabThreeTable = ({ searchValue }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) => {
    return Object.values(row).some((val) =>
      String(val).toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <TableContainer
        component={Paper}
        sx={{ maxWidth: "100%", overflowX: "auto" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell sx={{ maxWidth: 30 }}>
                SL No.
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 150 }}>
                Group Name
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 130 }}>
                Group Type
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>
                Action
              </StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={row.serial}>
                  <StyledTableCell sx={{ maxWidth: 30 }}>
                    {row.serial}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 150 }}>
                    {row.col1}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 130 }}>
                    {row.col2}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 120 }}>
                   <IconButton aria-label="edit">
                     <Link to={`/group-access`} style={{ textDecoration: 'none' }}>
                       <Edit sx={{ color: 'grey', mt: "5px" }}/>
                    </Link>
                   </IconButton>

                    <IconButton aria-label="view">
                      <DeleteForeverOutlinedIcon />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        <TablePagination
          rowsPerPageOptions={[15, 30, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default TabThreeTable;