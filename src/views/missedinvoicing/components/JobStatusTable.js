// import React, { useState, useMemo } from 'react';
// import {
//   Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
//   IconButton, Paper, TablePagination, Box, Select, MenuItem, Checkbox, Button, Typography
// } from '@mui/material';
// import { Visibility } from '@mui/icons-material';
// import { styled } from '@mui/system';
// import { Link } from 'react-router-dom';

// // Styling for the table cells
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   border: '1px solid #ddd',
//   padding: '8px',
//   color: 'black',
// }));

// // Customize the checkbox
// const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
//   color: "#ffff",
//   '&.Mui-checked': {
//     color: "#ffff",
//   },
// }));

// const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
//   border: '1px solid #ddd',
//   backgroundColor: '#285a9e',
//   color: 'white',
//   fontWeight: 'bold',
//   padding: '8px',
// }));

// const StyledFirstColumnHeaderCell = styled(TableCell)(({ theme }) => ({
//   border: '1px solid #ddd',
//   backgroundColor: '#285a9e',
//   color: 'white',
//   fontWeight: 'bold',
//   padding: '8px',
//   boxSizing: 'border-box',
//   overflow: 'hidden',
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(even)': {
//     backgroundColor: '#f0f5ff',
//   },
//   '&:nth-of-type(odd)': {
//     backgroundColor: 'white',
//   },
// }));

// // Randomize job priority data
// const jobPriorityOptions = [
//   "High",
//   "Medium",
//   "Low",
// ];

// // Sample data with randomized job status
// const demoData = Array.from({ length: 10 }, (_, index) => ({
//   serial: index + 1,
//   col1: `Business Unit ${String.fromCharCode(65 + index)}`,
//   col2: `Org ${String.fromCharCode(65 + index)}`,
//   col3: `Vendor ${String.fromCharCode(65 + index)}`,
//   col4: `2024-01-${String(index + 1).padStart(2, '0')}`,
//   col5: `2024-01-${String(index + 5).padStart(2, '0')}`,
//   col6: `$${(5000 - index * 100)}`,
//   col7: `$${(4500 - index * 100)}`,
//   col8: `2024-01-${String(index + 10).padStart(2, '0')}`,
//   col9: `2024-01-${String(index + 15).padStart(2, '0')}`,
//   col10: `2024-01-${String(index + 20).padStart(2, '0')}`,
//   col11: jobPriorityOptions[index % 3],
//   col12: ["Fetching POs", "Pending", "Fetching Vendor Invoices", "QA Completed - To be Published", "Completed", "Audit In Progress By Experts", "No Findings", "Waiting for Invoicing Trigger", "Invoice Creation In Progress", "Waiting for Batch Payment Due", "Payment Matching in Progress", "Find Payment Matching", "No Recoupment"][index % 13],
//   col13: jobPriorityOptions[index % 3],
// }));

// const JobStatusTable = React.memo(({ searchValue }) => {
//   const [state, setState] = useState({
//     page: 0,
//     rowsPerPage: 15,
//     rows: demoData,
//   });

//   const [selectedRows, setSelectedRows] = useState([]);
//   const [rowActions, setRowActions] = useState(demoData.reduce((acc, row) => {
//     acc[row.serial] = 'play';
//     return acc;
//   }, {}));

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

//   const handleSelectAll = (event) => {
//     if (event.target.checked) {
//       setSelectedRows(state.rows.map(row => row.serial));
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const handleSelectRow = (serial) => {
//     setSelectedRows(prevState => (
//       prevState.includes(serial)
//         ? prevState.filter(row => row !== serial)
//         : [...prevState, serial]
//     ));
//   };

//   const handleChangeAction = (serial) => {
//     setRowActions(prevState => ({
//       ...prevState,
//       [serial]: prevState[serial] === 'play' ? 'pause' : 'play'
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
//               <StyledFirstColumnHeaderCell sx={{ minWidth: 40 }}>
//                 <StyledCheckbox onChange={handleSelectAll} />
//               </StyledFirstColumnHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 150 }}>Business Unit</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 150 }}>Organization Name</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 150 }}>Vendor Central Name</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 120 }}>Audit Start Date</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 120 }}>Last Activity</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 120 }}>Need To Be Invoiced Amount</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 120 }}>Invoice Submitted ($)</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 120 }}>Invoice Creation Date</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 120 }}>Expected Payment Due Date</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 120 }}>Cron Trigger Date</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 120 }}>Job Priority</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 120 }}>Job Status</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 120 }}>Action</StyledTableHeaderCell>
//               <StyledTableHeaderCell sx={{ minWidth: 100 }}>History</StyledTableHeaderCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredRows.slice(state.page * state.rowsPerPage, state.page * state.rowsPerPage + state.rowsPerPage).map((row) => (
//               <StyledTableRow key={row.serial}>
//                 <StyledTableCell sx={{ minWidth: 40 }}>
//                   <Checkbox
//                     checked={selectedRows.includes(row.serial)}
//                     onChange={() => handleSelectRow(row.serial)}
//                   />
//                 </StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 150 }}>{row.col1}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 150 }}>{row.col2}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 150 }}>{row.col3}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 120 }}>{row.col4}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 120 }}>{row.col5}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 120 }}>{row.col6}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 120 }}>{row.col7}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 120 }}>{row.col8}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 120 }}>{row.col9}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 120 }}>{row.col10}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 120 }}>
//                   <Select
//                     value={row.col11}
//                     onChange={(event) => console.log('Handle job priority change')}
//                     sx={{ width: '100%' }}
//                   >
//                     {jobPriorityOptions.map((option) => (
//                       <MenuItem key={option} value={option}>
//                         {option}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 120 }}>{row.col12}</StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 120 }}>
//                   <Button
//                     variant="contained"
//                     size="small"
//                     color={rowActions[row.serial] === 'play' ? 'primary' : 'secondary'}
//                     onClick={() => handleChangeAction(row.serial)}
//                   >
//                     {rowActions[row.serial] === 'play' ? 'Play' : 'Pause'}
//                   </Button>
//                 </StyledTableCell>
//                 <StyledTableCell sx={{ minWidth: 100 }}>
//                   <IconButton component={Link} to={`/history/${row.serial}`} sx={{ color: 'black' }}>
//                     <Visibility />
//                   </IconButton>
//                 </StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//   <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
//     <TablePagination
//       rowsPerPageOptions={[15, 30, 50]}
//       component="div"
//       count={filteredRows.length}
//       rowsPerPage={state.rowsPerPage}
//       page={state.page}
//       onPageChange={handleChangePage}
//       onRowsPerPageChange={handleChangeRowsPerPage}
//     />
//   </Box>
//     </Box>
//   );
// });

// export default JobStatusTable;




/*--------------------------------------------------- New Code -----------------------------------------------------*/


import React, { useState, useMemo } from "react";
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
  Select,
  MenuItem,
  Checkbox,
  Button,
  Typography,
} from "@mui/material";
import { Visibility } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

// Styling for the table cells
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ddd",
  padding: "8px",
  color: "black",
}));

// Customize the checkbox
const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#ffff",
  "&.Mui-checked": {
    color: "#ffff",
  },
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ddd",
  backgroundColor: "#285a9e",
  color: "white",
  fontWeight: "bold",
  padding: "8px",
}));

const StyledFirstColumnHeaderCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ddd",
  backgroundColor: "#285a9e",
  color: "white",
  fontWeight: "bold",
  padding: "8px",
  boxSizing: "border-box",
  overflow: "hidden",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f0f5ff",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
}));

// Randomize job priority data
const jobPriorityOptions = ["High", "Medium", "Low"];

// Sample data with randomized job status
const demoData = Array.from({ length: 10 }, (_, index) => ({
  serial: index + 1,
  col1: `Business Unit ${String.fromCharCode(65 + index)}`,
  col2: `Org ${String.fromCharCode(65 + index)}`,
  col3: `Vendor ${String.fromCharCode(65 + index)}`,
  col4: `2024-01-${String(index + 1).padStart(2, "0")}`,
  col5: `2024-01-${String(index + 5).padStart(2, "0")}`,
  col6: `$${5000 - index * 100}`,
  col7: `$${4500 - index * 100}`,
  col8: `2024-01-${String(index + 10).padStart(2, "0")}`,
  col9: `2024-01-${String(index + 15).padStart(2, "0")}`,
  col10: `2024-01-${String(index + 20).padStart(2, "0")}`,
  col11: jobPriorityOptions[index % 3],
  col12: [
    "Fetching POs",
    "Pending",
    "Fetching Vendor Invoices",
    "QA Completed - To be Published",
    "Completed",
    "Audit In Progress By Experts",
    "No Findings",
    "Waiting for Invoicing Trigger",
    "Invoice Creation In Progress",
    "Waiting for Batch Payment Due",
    "Payment Matching in Progress",
    "Find Payment Matching",
    "No Recoupment",
  ][index % 13],
  col13: jobPriorityOptions[index % 3],
}));

const JobStatusTable = React.memo(({ searchValue }) => {
  const [state, setState] = useState({
    page: 0,
    rowsPerPage: 15,
    rows: demoData,
  });

  const [selectedRows, setSelectedRows] = useState([]);
  const [rowActions, setRowActions] = useState(
    demoData.reduce((acc, row) => {
      acc[row.serial] = "play";
      return acc;
    }, {})
  );

  const handleChangePage = (event, newPage) => {
    setState((prevState) => ({ ...prevState, page: newPage }));
  };

  const handleChangeRowsPerPage = (event) => {
    setState((prevState) => ({
      ...prevState,
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    }));
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(state.rows.map((row) => row.serial));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (serial) => {
    setSelectedRows((prevState) =>
      prevState.includes(serial)
        ? prevState.filter((row) => row !== serial)
        : [...prevState, serial]
    );
  };

  const handleChangeAction = (serial) => {
    setRowActions((prevState) => ({
      ...prevState,
      [serial]: prevState[serial] === "play" ? "pause" : "play",
    }));
  };

  const filteredRows = useMemo(() => {
    return state.rows.filter((row) => {
      return Object.values(row).some((val) =>
        String(val).toLowerCase().includes(searchValue.toLowerCase())
      );
    });
  }, [state.rows, searchValue]);

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
              <StyledFirstColumnHeaderCell sx={{ minWidth: 40 }}>
                <StyledCheckbox onChange={handleSelectAll} />
              </StyledFirstColumnHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 150 }}>
                Business Unit
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 150 }}>
                Organization Name
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 150 }}>
                Vendor Central Name
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>
                Audit Start Date
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>
                Last Activity
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>
                Need To Be Invoiced Amount
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>
                Invoice Submitted ($)
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>
                Invoice Creation Date
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>
                Expected Payment Due Date
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>
                Cron Trigger Date
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>
                Job Priority
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>
                Job Status
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 120 }}>
                Action
              </StyledTableHeaderCell>
              <StyledTableHeaderCell sx={{ minWidth: 100 }}>
                History
              </StyledTableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(
                state.page * state.rowsPerPage,
                state.page * state.rowsPerPage + state.rowsPerPage
              )
              .map((row) => (
                <StyledTableRow key={row.serial}>
                  <StyledTableCell sx={{ minWidth: 40 }}>
                    <Checkbox
                      checked={selectedRows.includes(row.serial)}
                      onChange={() => handleSelectRow(row.serial)}
                    />
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 150 }}>
                    {row.col1}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 150 }}>
                    {row.col2}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 150 }}>
                    {row.col3}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 120 }}>
                    {row.col4}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 120 }}>
                    {row.col5}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 120 }}>
                    {row.col6}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 120 }}>
                    {row.col7}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 120 }}>
                    {row.col8}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 120 }}>
                    {row.col9}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 120 }}>
                    {row.col10}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 120 }}>
                    <Select
                      value={row.col11}
                      onChange={(event) =>
                        console.log("Handle job priority change")
                      }
                      sx={{ width: "100%" }}
                    >
                      {jobPriorityOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 120 }}>
                    {row.col12}
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 100 }}>
                    <Button
                      onClick={() => handleChangeAction(row.serial)}
                      sx={{
                        color:
                          rowActions[row.serial] === "play"
                            ? "green"
                            : "#F4C430",
                        backgroundColor:
                          rowActions[row.serial] === "play"
                            ? "#e0f2f1"
                            : "#fffbf0",
                        "&:hover": {
                          backgroundColor:
                            rowActions[row.serial] === "play"
                              ? "#b9fbc0"
                              : "#ffebd8",
                        },
                      }}
                    >
                      {rowActions[row.serial] === "play" ? "Play" : "Pause"}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell sx={{ minWidth: 100 }}>
                    <Link to={`/job/${row.serial}`}>
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </Link>
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
          rowsPerPage={state.rowsPerPage}
          page={state.page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
});

export default JobStatusTable;
