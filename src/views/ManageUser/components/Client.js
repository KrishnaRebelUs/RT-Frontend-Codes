/*--------------------------------------------------------------------- API Client ------------------------------------------------------------*/


import React, { useState, useEffect, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper, TablePagination, Box
} from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

const TabOneTable = React.memo(({ searchValue }) => {
  const [state, setState] = useState({
    page: 0,
    rowsPerPage: 15,
    rows: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token'); // assuming the token is stored in sessionStorage
        const { data } = await axios.get('http://16.170.22.123:8082/manageAccess/getActiveMarketPlaceDetails', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const fetchedData = data.data.map((item, index) => ({
          serial: index + 1,
          col1: item['marketPlace'] || '-',
          col2: item.OrganizationName || '-',
          col3: item.compnayName || '-',
          col4: item.poc || '-',
          col5: item.PL || '-',
          col6: item.ExcessCoop || '-',
          col7: item.pl || '-',
          col8: item.missedInvoice || '-',
          col9: item.isRerun || '-',
        }));

        setState(prevState => ({ ...prevState, rows: fetchedData }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setState(prevState => ({ ...prevState, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    setState(prevState => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0
    }));
  };

  const filteredRows = useMemo(() => {
    return state.rows.filter(row => {
      return Object.values(row).some(val =>
        String(val).toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }, [state.rows, searchValue]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell sx={{ minWidth: 80 }}>SL No.</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 110 }}>Market Place</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 150 }}>Organization Name</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 150 }}>Amazon VC Account</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 150 }}>Point of Contact</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 100 }}>P&L Monthly Cron Job</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 100 }}>Excess CoOp</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 100 }}>P&L Analysis</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 100 }}>Missed Invoicing</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 100 }}>Quarterly Audits</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>Action</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage).map((row) => (
              <StyledTableRow key={row.serial}>
                <StyledTableCell sx={{ minWidth: 80 }}>{row.serial}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 110 }}>{row.col1}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 150 }}>{row.col2}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 150 }}>{row.col3}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 150 }}>{row.col4}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 100 }}>{row.col5}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 100 }}>{row.col6}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 100 }}>{row.col7}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 100 }}>{row.col8}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 100 }}>{row.col9}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 120 }}>
                  <IconButton aria-label="view">
                    <Visibility />
                  </IconButton>
                  <IconButton aria-label="edit">
                    <Link to={`/client-access`} style={{ textDecoration: 'none' }}>
                      <Edit sx={{ color: 'grey', mt: "5px" }}/>
                    </Link>
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <TablePagination
          rowsPerPageOptions={[15, 30, 50]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={state.rowsPerPage}
          page={state.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
});

export default TabOneTable;

