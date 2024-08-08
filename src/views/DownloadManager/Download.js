import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
  styled,
  Link as MuiLink,
  Grid
} from '@mui/material';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../components/pages/Breadcrumb';
import Header from '../components/pages/Header';

const rows = [
  { slNo: 1, vendorName: "Multiple Vendor", sourcePage: "Excess CooP", subFunction: "-", requestedDate: "07/01/23 10:00 AM", status: "Completed" },
  { slNo: 2, vendorName: "Multiple Vendor", sourcePage: "Missed Invoicing", subFunction: "-", requestedDate: "07/02/23 11:00 AM", status: "Completed" },
  { slNo: 3, vendorName: "Multiple Vendor", sourcePage: "P&L Analysis", subFunction: "-", requestedDate: "07/03/23 12:00 PM", status: "Completed" },
  { slNo: 4, vendorName: "Multiple Vendor", sourcePage: "Shortage Claim", subFunction: "-", requestedDate: "07/04/23 01:00 PM", status: "Completed" },
  { slNo: 5, vendorName: "NA", sourcePage: "Price Claim", subFunction: "-", requestedDate: "07/05/23 02:00 PM", status: "Completed" }
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #ddd',
  padding: '8px',
  color: 'black',
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #ddd',
  backgroundColor: '#285a9e',
  color: 'white',
  fontWeight: 'bold',
  padding: '8px',
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(even)': {
    backgroundColor: '#f0f5ff',
  },
  '&:nth-of-type(odd)': {
    backgroundColor: 'white',
  },
}));

const DownloadManager = () => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('slNo');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedRows = rows.slice().sort((a, b) => {
    if (orderBy === 'slNo') {
      return order === 'asc' ? a.slNo - b.slNo : b.slNo - a.slNo;
    } else {
      return order === 'asc'
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  return (
    <PageContainer title="Download Manager">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Download Manager"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="Download Manager" />
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
              <Table aria-label="download manager table">
                <TableHead>
                  <TableRow>
                    {['Sl No', 'Vendor Name', 'Source Page', 'Sub Function', 'Requested Date', 'Status', 'Action'].map((headCell, index) => (
                      <StyledTableHeaderCell
                        key={headCell}
                        sortDirection={orderBy === headCell.toLowerCase().replace(' ', '') ? order : false}
                      >
                        <TableSortLabel
                          active={orderBy === headCell.toLowerCase().replace(' ', '')}
                          direction={orderBy === headCell.toLowerCase().replace(' ', '') ? order : 'asc'}
                          onClick={createSortHandler(headCell.toLowerCase().replace(' ', ''))}
                        >
                          {headCell}
                        </TableSortLabel>
                      </StyledTableHeaderCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <StyledTableRow key={row.slNo}>
                      <StyledTableCell>{row.slNo}</StyledTableCell>
                      <StyledTableCell>{row.vendorName}</StyledTableCell>
                      <StyledTableCell>{row.sourcePage}</StyledTableCell>
                      <StyledTableCell align="center">{row.subFunction}</StyledTableCell>
                      <StyledTableCell>{row.requestedDate}</StyledTableCell>
                      <StyledTableCell>{row.status}</StyledTableCell>
                      <StyledTableCell>
                        <MuiLink href="#" underline="hover">
                          Download Now
                        </MuiLink>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
              <TablePagination
                rowsPerPageOptions={[10, 15, 30, 50]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DownloadManager;
