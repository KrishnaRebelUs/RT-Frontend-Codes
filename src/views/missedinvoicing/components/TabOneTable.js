// import React, { useState, useMemo } from 'react';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   IconButton, Paper, TablePagination, Box
// } from '@mui/material';
// import { Edit, Visibility } from '@mui/icons-material';
// import { styled } from '@mui/system';
// import { Link } from 'react-router-dom';

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   border: '1px solid #ddd',
//   padding: '8px',
//   color: 'black',
// }));

// const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
//   border: '1px solid #ddd',
//   backgroundColor: '#285a9e',
//   color: 'white',
//   fontWeight: 'bold',
//   padding: '8px',
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(even)': {
//     backgroundColor: '#f0f5ff',
//   },
//   '&:nth-of-type(odd)': {
//     backgroundColor: 'white',
//   },
// }));

// const TabOneTable = React.memo(({ searchValue }) => {
//   const [state, setState] = useState({
//     page: 0,
//     rowsPerPage: 15,
//     rows: [
//         { serial: 1, vendor: 'Vendor A', batch: 'VN20230627123418_01122', fileType: 'IR Findings Upload', uploadedBy: 'User A', uploadedDate: '2024-08-01', status: 'Completed' },
//         { serial: 2, vendor: 'Vendor B', batch: 'VN20230627123419_01123', fileType: 'IR Findings Upload', uploadedBy: 'User B', uploadedDate: '2024-08-02', status: 'Pending' },
//         { serial: 3, vendor: 'Vendor C', batch: 'VN20230627123420_01124', fileType: 'IR Findings Upload', uploadedBy: 'User C', uploadedDate: '2024-08-03', status: 'Completed' },
//         { serial: 4, vendor: 'Vendor D', batch: 'VN20230627123421_01125', fileType: 'IR Findings Upload', uploadedBy: 'User D', uploadedDate: '2024-08-04', status: 'In Progress' },
//         { serial: 5, vendor: 'Vendor E', batch: 'VN20230627123422_01126', fileType: 'IR Findings Upload', uploadedBy: 'User E', uploadedDate: '2024-08-05', status: 'Completed' },
//         { serial: 6, vendor: 'Vendor F', batch: 'VN20230627123423_01127', fileType: 'IR Findings Upload', uploadedBy: 'User F', uploadedDate: '2024-08-06', status: 'Pending' },
//         { serial: 7, vendor: 'Vendor G', batch: 'VN20230627123424_01128', fileType: 'IR Findings Upload', uploadedBy: 'User G', uploadedDate: '2024-08-07', status: 'Completed' },
//         { serial: 8, vendor: 'Vendor H', batch: 'VN20230627123425_01129', fileType: 'IR Findings Upload', uploadedBy: 'User H', uploadedDate: '2024-08-08', status: 'In Progress' },
//         { serial: 9, vendor: 'Vendor I', batch: 'VN20230627123426_01130', fileType: 'IR Findings Upload', uploadedBy: 'User I', uploadedDate: '2024-08-09', status: 'Completed' },
//         { serial: 10, vendor: 'Vendor J', batch: 'VN20230627123427_01131', fileType: 'IR Findings Upload', uploadedBy: 'User J', uploadedDate: '2024-08-10', status: 'Pending' },
//     ],
//   });

//   const handleChangePage = (event, newPage) => {
//     setState(prevState => ({ ...prevState, page: newPage }));
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setState(prevState => ({
//       ...prevState,
//       rowsPerPage: parseInt(event.target.value, 10),
//       page: 0
//     }));
//   };

//   const filteredRows = useMemo(() => {
//     return state.rows.filter(row => {
//       return Object.values(row).some(val =>
//         String(val).toLowerCase().includes(searchValue.toLowerCase())
//       );
//     });
//   }, [state.rows, searchValue]);

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <TableContainer component={Paper} sx={{ maxWidth: '100%', overflowX: 'auto' }}>
//         <Table aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <StyledTableHeaderCell sx={{ minWidth: 60 }}>SL No.</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 150 }}>Vendor Name</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 180 }}>Batch Number</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 150 }}>File Type</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 150 }}>Uploaded By</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 150 }}>Uploaded Date</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 100 }}>Status</StyledTableHeaderCell>
//               {/* <StyledTableHeaderCell sx={{ minWidth: 120 }}>Action</StyledTableHeaderCell> */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredRows.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage).map((row) => (
//               <StyledTableRow key={row.serial}>
//                 <StyledTableCell sx={{ minWidth: 60 }}>{row.serial}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 150 }}>{row.vendor}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 180 }}>{row.batch}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 150 }}>{row.fileType}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 150 }}>{row.uploadedBy}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 150 }}>{row.uploadedDate}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 100 }}>{row.status}</StyledTableCell>
//                 {/* <StyledTableCell sx={{ minWidth: 120 }}>
//                   <IconButton aria-label="view">
//                     <Visibility />
//                   </IconButton>
//                   <IconButton aria-label="edit">
//                     <Link to={`/client-access`} style={{ textDecoration: 'none' }}>
//                       <Edit sx={{ color: 'grey', mt: "5px" }}/>
//                     </Link>
//                   </IconButton>
//                 </StyledTableCell> */}
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
//         <TablePagination
//           rowsPerPageOptions={[15, 30, 50]}
//           component="div"
//           count={filteredRows.length}
//           rowsPerPage={state.rowsPerPage}
//           page={state.page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Box>
//     </Box>
//   );
// });

// export default TabOneTable;





import React, { useState, useEffect, useMemo } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, Paper, TablePagination, Box
} from '@mui/material';
import { Edit, Visibility } from '@mui/icons-material';
import { styled } from '@mui/system';
import StatusIndicator from './StatusIndicator'; // Import the StatusIndicator component

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
    rows: [
      { serial: 1, vendor: 'Vendor A', batch: 'VN20230627123418_01122', fileType: 'IR Findings Upload', uploadedBy: 'User A', uploadedDate: '2024-08-01', status: 'Completed' },
      { serial: 2, vendor: 'Vendor B', batch: 'VN20230627123419_01123', fileType: 'Data Extraction Upload', uploadedBy: 'User B', uploadedDate: '2024-08-02', status: 'Pending' },
      { serial: 3, vendor: 'Vendor C', batch: 'VN20230627123420_01124', fileType: 'Report Upload', uploadedBy: 'User C', uploadedDate: '2024-08-03', status: 'In Progress' },
      { serial: 4, vendor: 'Vendor D', batch: 'VN20230627123421_01125', fileType: 'Audit Upload', uploadedBy: 'User D', uploadedDate: '2024-08-04', status: 'Error' },
      { serial: 5, vendor: 'Vendor E', batch: 'VN20230627123422_01126', fileType: 'Compliance Upload', uploadedBy: 'User E', uploadedDate: '2024-08-05', status: 'Completed' },
      { serial: 6, vendor: 'Vendor F', batch: 'VN20230627123423_01127', fileType: 'Verification Upload', uploadedBy: 'User F', uploadedDate: '2024-08-06', status: 'Pending' },
      { serial: 7, vendor: 'Vendor G', batch: 'VN20230627123424_01128', fileType: 'Validation Upload', uploadedBy: 'User G', uploadedDate: '2024-08-07', status: 'In Progress' },
      { serial: 8, vendor: 'Vendor H', batch: 'VN20230627123425_01129', fileType: 'Adjustment Upload', uploadedBy: 'User H', uploadedDate: '2024-08-08', status: 'Error' },
      { serial: 9, vendor: 'Vendor I', batch: 'VN20230627123426_01130', fileType: 'Correction Upload', uploadedBy: 'User I', uploadedDate: '2024-08-09', status: 'Completed' },
      { serial: 10, vendor: 'Vendor J', batch: 'VN20230627123427_01131', fileType: 'Final Upload', uploadedBy: 'User J', uploadedDate: '2024-08-10', status: 'Pending' },
    ],
  });

  useEffect(() => {
    // Fetch data from API if needed
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
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>Vendor Name</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 200 }}>Batch Number</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 150 }}>File Type</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 150 }}>Uploaded By</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 150 }}>Uploaded Date</StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 150 }}>Status</StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage).map((row) => (
              <StyledTableRow key={row.serial}>
                <StyledTableCell sx={{ minWidth: 80 }}>{row.serial}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 120 }}>{row.vendor}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 200 }}>{row.batch}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 150 }}>{row.fileType}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 150 }}>{row.uploadedBy}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 150 }}>{row.uploadedDate}</StyledTableCell>
                <StyledTableCell sx={{ minWidth: 150 }}>
                  <StatusIndicator status={row.status} />
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

