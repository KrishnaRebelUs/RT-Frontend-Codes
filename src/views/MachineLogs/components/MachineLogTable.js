import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Select,
  MenuItem,
  IconButton,
  Box,
  TablePagination,
  Tooltip
} from '@mui/material';
import { IconEye, IconRefresh, IconPlugConnected } from '@tabler/icons-react';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: '1px solid #ddd',
  padding: '8px',
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

const TableCellMachineName = styled(StyledTableCell)({
  width: '200px', 
});

const TableCellBusinessUnit = styled(StyledTableCell)({
  width: '150px', 
});

const TableCellVc = styled(StyledTableCell)({
  width: '200px', 
});

const TableCellJobPriority = styled(StyledTableCell)({
  width: '150px', 
});

const TableCellAction = styled(StyledTableCell)({
  width: '150px', 
});

const rows = [
  {
    id: 1,
    machineName: 'Machine 1',
    businessUnit: 'Unit A',
    vendorCentralName: 'Vendor X',
    processName: 'Process Y',
    transName: 'Trans Z',
    modifiedDateTime: '2024-07-22 12:34',
    jobPriority: 'High',
    botProcess: 'Process 1',
    action: 'edit',
    history: 'view',
  },
  {
    id: 2,
    machineName: 'Machine 2',
    businessUnit: 'Unit B',
    vendorCentralName: 'Vendor Y',
    processName: 'Process Z',
    transName: 'Trans Z1',
    modifiedDateTime: '2024-02-22 01:05',
    jobPriority: 'Medium',
    botProcess: 'Process 2',
    action: 'edit',
    history: 'view',
  },
  {
    id: 3,
    machineName: 'Machine 3',
    businessUnit: 'Unit A',
    vendorCentralName: 'Vendor 4',
    processName: 'Process Y2',
    transName: 'Trans Z7',
    modifiedDateTime: '2024-04-04 05:38',
    jobPriority: 'Low',
    botProcess: 'Process 3',
    action: 'edit',
    history: 'view',
  },
  {
    id: 1,
    machineName: 'Machine 4',
    businessUnit: 'Unit AB',
    vendorCentralName: 'Vendor 1',
    processName: 'Process YY',
    transName: 'Trans G',
    modifiedDateTime: '2023-12-22 10:14',
    jobPriority: 'High',
    botProcess: 'Process 12',
    action: 'edit',
    history: 'view',
  },
  {
    id: 1,
    machineName: 'Machine 5',
    businessUnit: 'Unit AC',
    vendorCentralName: 'Vendor XY',
    processName: 'Process YA',
    transName: 'Trans Z3',
    modifiedDateTime: '2024-04-22 12:00',
    jobPriority: 'High',
    botProcess: 'Process 1',
    action: 'edit',
    history: 'view',
  },
  {
    id: 1,
    machineName: 'Machine 6',
    businessUnit: 'Unit AZ',
    vendorCentralName: 'Vendor XA',
    processName: 'Process AY',
    transName: 'Trans HZ',
    modifiedDateTime: '2024-07-22 08:44',
    jobPriority: 'Low',
    botProcess: 'Process 22',
    action: 'edit',
    history: 'view',
  },
  {
    id: 1,
    machineName: 'Machine 7',
    businessUnit: 'Unit HG',
    vendorCentralName: 'Vendor OP',
    processName: 'Process OY',
    transName: 'Trans KZ',
    modifiedDateTime: '2024-07-22 11:11',
    jobPriority: 'Medium',
    botProcess: 'Process 0',
    action: 'edit',
    history: 'view',
  },
];

const MachineLogTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
        <Table aria-label="machine log table">
          <TableHead>
            <TableRow>
              <StyledTableHeaderCell sx={{ width: '200px' }}>Machine Name</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ width: '150px' }}>Business Unit</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ width: '230px' }}>Vendor Central Name</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ width: '150px' }}>Process Name</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ width: '150px' }}>Trans Name</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ width: '230px' }}>Modified Date & Time</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ width: '150px' }}>Job Priority</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ width: '150px' }}>Bot Process</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ width: '150px' }}>Action</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ width: '100px' }}>History</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <StyledTableRow key={row.id}>
                <TableCellMachineName>{row.machineName}</TableCellMachineName>
                <TableCellBusinessUnit>{row.businessUnit}</TableCellBusinessUnit>
                <TableCellVc>{row.vendorCentralName}</TableCellVc>
                <StyledTableCell>{row.processName}</StyledTableCell>
                <StyledTableCell>{row.transName}</StyledTableCell>
                <StyledTableCell>{row.modifiedDateTime}</StyledTableCell>
                <StyledTableCell>
                  <Select
                    value={row.jobPriority}
                    onChange={(e) => console.log(e.target.value)}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Job Priority' }}
                    sx={{ width: '120px' }}
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </Select>
                </StyledTableCell>
                <StyledTableCell>{row.botProcess}</StyledTableCell>
                <TableCellAction>
                  <Tooltip title="Retry">
                    <IconButton>
                      <IconRefresh />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Connect">
                    <IconButton>
                      <IconPlugConnected />
                    </IconButton>
                  </Tooltip>
                </TableCellAction>
                <StyledTableCell>
                  <IconButton>
                    <IconEye />
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default MachineLogTable;
