/*-----WeBee Code ---------*/

// import React, { useState } from 'react';
// import { styled, Typography, Box, useTheme, Grid, Button, Table, TableHead,Input, TableBody, TableRow, TableCell,Dialog, DialogTitle,DialogActions, DialogContent } from '@mui/material';
// import DashboardCard from '../../../components/shared/DashboardCard';
// import { IconFileArrowRight, IconFileArrowLeft,IconPencil,IconEye } from '@tabler/icons-react';

// const ButtonStyled = styled(Button)(({ theme }) => ({
//     backgroundColor: theme.palette.primary.contrast,
//     border: '1px solid',
//     borderColor: theme.palette.primary.contrast,
//     color: theme.palette.primary.contrastText,
//     fontSize: '12px',
//     padding: '0',
//     fontWeight: '600',
//     transition: 'all ease 0.3s',
//     '&:hover': {
//         backgroundColor: theme.palette.primary.main,
//         color: theme.palette.primary.contrastText,
//         borderColor: theme.palette.primary.main
//     },
//     '& .btn-indicator': {
//         width: '1px',
//         backgroundColor: theme.palette.primary.main,
//         alignSelf: 'stretch',
//         marginLeft: '4px'
//     }
// }));

// const BoxStyled = styled(Box)(({ theme }) => ({
//     padding: '5px 12px',
//     fontWeight: '600',
// }));

// const TableCellStyled = styled(TableCell)(({ theme }) => ({
//     fontSize: '12px',
//     fontWeight: '600',
// }));
// const TableRowStyled = styled(TableRow)(({ theme, index }) => ({
//     borderBottom: '1px solid #eee',
//     backgroundColor: index % 2 === 0 ? theme.palette.secondary.contrastText : theme.palette.primary.extraLight
// }));

// const ShortageClaimTable = () => {
//     const theme = useTheme();
//     const [editableId, setEditableId] = useState(null);
//     const [editedValues, setEditedValues] = useState({});
//     const [editDialogOpen, setEditDialogOpen] = useState(false);
//     const [viewDialogOpen, setViewDialogOpen] = useState(false);
//     const [editedValue, setEditedValue] = useState('');
//     const [selectedRow, setSelectedRow] = useState(null);

//     const formatNumber = (number) => new Intl.NumberFormat().format(number);
//     const handleEdit = (id) => {
//         console.log("Edit clicked for id:", id);
//         setEditableId(id);
//         setEditedValue(editedValues[id] || (shortagetble.find(item => item.id === id)?.Active?.[0]) || '');
//         setEditDialogOpen(true);
//     };

//     const handleView = (row) => {
//         console.log("View clicked for row:", row);
//         setSelectedRow(row);
//         setViewDialogOpen(true);
//     };
//     const handleCloseEdit = () => {
//         setEditDialogOpen(false);
//     };

//     const handleCloseView = () => {
//         setViewDialogOpen(false);
//     };
//     const handleInputChange = (event) => {
//         setEditedValue(event.target.value);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

//     const handleSave = () => {
//         setEditedValues({ ...editedValues, [editableId]: editedValue });
//         setEditDialogOpen(false);
//     };

//     const shortagetble = [
//         {
//             id: 1,
//             Settlement: "Shortage Claim Finding",
//             Active: ["$ 1,843,291.52"],
// 			Archived: ['-'],
//             color: theme.palette.accent.main

//         },
//         {
//             id: 2,
//             Settlement: "Period Covered(Invoice Date)",
//             Active: ["11/19/20 to 11/20/23"],
// 			Archived: ['- & -'],

//         },
//         {
//             id: 3,
//             Settlement: "Period Covered(Invoice Due Date)",
//             Active: ["01/01/21 to 11/30/23"],
// 			Archived: ["- & -"],
//             color: theme.palette.error.main

//         },
//         {
//             id: 4,
//             Settlement: "Case ID & Creation Date",
//             Active: ['12296505531 & 03/21/23'],
// 			Archived: ['- & -'],

//         },
//         {
//             id: 5,
//             Settlement: "Open Balance & Confirmation Date",
//             Active: ['$ 202,212.18 & 04/04/23'],
// 			Archived: ['- & -'],
//             color: theme.palette.accent.main
//         },
//         {
//             id: 7,
//             Settlement: "Settlement Offer & Date",
//             Active: ['$ 700,450.78  & 12/16/23'],
// 			Archived: ['- & -'],
//         },
//         {
//             id: 8,
//             Settlement: "Counter Offer & Date",
//             Active: ['- & -'],
// 			Archived: ['- & -'],

//         },
//         {
//             id: 9,
//             Settlement: "Accepted Offer & Date",
//             Active: ['$ 70,774.26 & 01/18/24'],
// 			Archived: ['- & -'],

//         },
//         {
//             id: 10,
//             Settlement: "Settlement Amount & Date",
//             Active: ["$ 70,774.26 & 01/18/24"],
// 			Archived: ['- & -'],
//             color: theme.palette.success.main

//         },

//     ];

//     return (
//         <DashboardCard>
//              <Grid container spacing={3} marginBottom={3} alignItems='center' justifyContent='space-between'>
//                 <Grid item xs={5}><Typography variant='h4'>Shortage Claim Finding </Typography></Grid>
//                 <Grid item xs={7}>
//                     <Grid container spacing={2} justifyContent='end'>
//                         <Grid item><ButtonStyled><BoxStyled>Export</BoxStyled> <span className='btn-indicator'></span> <BoxStyled><IconFileArrowRight size="16" style={{ margin: 'auto', verticalAlign: 'middle' }} /></BoxStyled></ButtonStyled></Grid>
//                         <Grid item><ButtonStyled><BoxStyled>Import</BoxStyled> <span className='btn-indicator'></span> <BoxStyled><IconFileArrowLeft size="16" style={{ margin: 'auto', verticalAlign: 'middle' }} /></BoxStyled></ButtonStyled></Grid>
//                     </Grid>
//                 </Grid>
//             </Grid>
//             <Table>
//                 <TableHead>
//                     <TableRow style={{ backgroundColor: theme.palette.primary.light, }}>
//                         <TableCell style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>Settlement</TableCell>
//                         <TableCell style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>Active Cases($)</TableCell>
//                         <TableCell style={{ color: 'white', fontSize: '15px', fontWeight: '600' }}>Archived</TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {shortagetble.map((row,index) => (
//                         <TableRowStyled key={row.id}  index={index} theme={theme}>
//                             <TableCellStyled>{row.Settlement}</TableCellStyled>
//                             <TableCellStyled style={{ color: row.color }}>
//                                 {row.Active.map((value, index) => (
//                                     <Box my={1} style={{ display: 'flex', alignItems: 'center' }}>
//                                         {value}
//                                         <IconPencil key={index} size={16} style={{ cursor: 'pointer', margin: '0 5px' }} onClick={() => handleEdit(row.id,index)} />
//                                         <IconEye size={16} style={{ cursor: 'pointer', margin: '0 5px' }} onClick={() => handleView(row)} />
//                                         {/* {row.Settlement === "Shortage Claim Finding" && index === 0 && <Box sx={{ display: 'inline-block', margin: '0 5px' }}>Upload</Box>} */}
//                                     </Box>
//                                 ))}
//                             </TableCellStyled>
//                            <TableCellStyled style={{ color: row.color }}>
//                                 {row.Archived.map((value, index) => (
//                                     <Box my={1} style={{ display: 'flex', alignItems: 'center' }}>
//                                         {value}
//                                     </Box>
//                                 ))}
//                            </TableCellStyled>
//                         </TableRowStyled>
//                     ))}
//                 </TableBody>
//             </Table>
//             <Dialog open={editDialogOpen} onClose={handleCloseEdit}>
//                 <DialogTitle>Edit Value</DialogTitle>
//                 <DialogContent>
//                     <Input value={editedValue} onChange={handleInputChange} />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseEdit}>Cancel</Button>
//                     <Button onClick={handleSave}>Save</Button>
//                 </DialogActions>
//             </Dialog>
//             <Dialog open={viewDialogOpen} onClose={handleCloseView}>
//                 <DialogTitle>{selectedRow ? selectedRow.Settlement : ''}</DialogTitle>
//                 <DialogContent>
//                     <Table>
//                         <TableHead>
//                             <TableRow style={{ backgroundColor: theme.palette.primary.light, }}>
//                                 <TableCell style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>Settlement</TableCell>
//                                 <TableCell style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>Active Case($)</TableCell>
//                             </TableRow>
//                         </TableHead>
//                         <TableBody>
//                             {selectedRow && selectedRow.Active.map((value, index) => (
//                                 <TableRow key={index}>
//                                     <TableCell>{index === 0 ? selectedRow.Settlement : ''}</TableCell>
//                                     <TableCell>{value}</TableCell>
//                                 </TableRow>
//                             ))}
//                         </TableBody>
//                     </Table>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleCloseView}>Close</Button>
//                 </DialogActions>
//             </Dialog>
//         </DashboardCard>
//     );
// };

// export default ShortageClaimTable;

/*----------My code------------*/

// import React, { useState } from "react";
// import {
//   styled,
//   Typography,
//   Box,
//   useTheme,
//   Grid,
//   Button,
//   Table,
//   TableHead,
//   Input,
//   TableBody,
//   TableRow,
//   TableCell,
//   Dialog,
//   DialogTitle,
//   DialogActions,
//   DialogContent,
// } from "@mui/material";
// import DashboardCard from "../../../components/shared/DashboardCard";
// import {
//   IconFileArrowRight,
//   IconFileArrowLeft,
//   IconPencil,
//   IconEye,
// } from "@tabler/icons-react";

// const ButtonStyled = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.contrast,
//   border: "1px solid",
//   borderColor: theme.palette.primary.contrast,
//   color: theme.palette.primary.contrastText,
//   fontSize: "12px",
//   padding: "0",
//   fontWeight: "600",
//   transition: "all ease 0.3s",
//   "&:hover": {
//     backgroundColor: theme.palette.primary.main,
//     color: theme.palette.primary.contrastText,
//     borderColor: theme.palette.primary.main,
//   },
//   "& .btn-indicator": {
//     width: "1px",
//     backgroundColor: theme.palette.primary.main,
//     alignSelf: "stretch",
//     marginLeft: "4px",
//   },
// }));

// const BoxStyled = styled(Box)(({ theme }) => ({
//   padding: "5px 12px",
//   fontWeight: "600",
// }));

// const TableCellStyled = styled(TableCell)(({ theme }) => ({
//   fontSize: "12px",
//   fontWeight: "600",
// }));

// const TableRowStyled = styled(TableRow)(({ theme, index }) => ({
//   borderBottom: "1px solid #eee",
//   backgroundColor:
//     index % 2 === 0
//       ? theme.palette.secondary.contrastText
//       : theme.palette.primary.extraLight,
// }));

// const ShortageClaimTable = () => {
//   const theme = useTheme();
//   const [editableId, setEditableId] = useState(null);
//   const [editedValues, setEditedValues] = useState({});
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);
//   const [editedValue, setEditedValue] = useState("");
//   const [selectedRow, setSelectedRow] = useState(null);

//   const formatNumber = (number) => new Intl.NumberFormat().format(number);
//   const handleEdit = (id) => {
//     console.log("Edit clicked for id:", id);
//     setEditableId(id);
//     setEditedValue(
//       editedValues[id] ||
//         shortagetble.find((item) => item.id === id)?.Active?.[0] ||
//         ""
//     );
//     setEditDialogOpen(true);
//   };

//   const handleView = (row) => {
//     console.log("View clicked for row:", row);
//     setSelectedRow(row);
//     setViewDialogOpen(true);
//   };
//   const handleCloseEdit = () => {
//     setEditDialogOpen(false);
//   };

//   const handleCloseView = () => {
//     setViewDialogOpen(false);
//   };
//   const handleInputChange = (event) => {
//     setEditedValue(event.target.value);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleSave = () => {
//     setEditedValues({ ...editedValues, [editableId]: editedValue });
//     setEditDialogOpen(false);
//   };

//   const shortagetble = [
//     {
//       id: 1,
//       Settlement: "Shortage Claim Finding",
//       Active: ["$ 1,843,291.52"],
//       Archived: ["-"],
//       color: theme.palette.accent.main,
//     },
//     {
//       id: 2,
//       Settlement: "Period Covered(Invoice Date)",
//       Active: ["11/19/20 to 11/20/23"],
//       Archived: ["- & -"],
//     },
//     {
//       id: 3,
//       Settlement: "Period Covered(Invoice Due Date)",
//       Active: ["01/01/21 to 11/30/23"],
//       Archived: ["- & -"],
//       color: theme.palette.error.main,
//     },
//     {
//       id: 4,
//       Settlement: "Case ID & Creation Date",
//       Active: ["12296505531 & 03/21/23"],
//       Archived: ["- & -"],
//     },
//     {
//       id: 5,
//       Settlement: "Open Balance & Confirmation Date",
//       Active: ["$ 202,212.18 & 04/04/23"],
//       Archived: ["- & -"],
//       color: theme.palette.accent.main,
//     },
//     {
//       id: 7,
//       Settlement: "Settlement Offer & Date",
//       Active: ["$ 700,450.78  & 12/16/23"],
//       Archived: ["- & -"],
//     },
//     {
//       id: 8,
//       Settlement: "Counter Offer & Date",
//       Active: ["- & -"],
//       Archived: ["- & -"],
//     },
//     {
//       id: 9,
//       Settlement: "Accepted Offer & Date",
//       Active: ["$ 70,774.26 & 01/18/24"],
//       Archived: ["- & -"],
//     },
//     {
//       id: 10,
//       Settlement: "Settlement Amount & Date",
//       Active: ["$ 70,774.26 & 01/18/24"],
//       Archived: ["- & -"],
//       color: theme.palette.success.main,
//     },
//   ];

//   return (
//     <DashboardCard>
//       <Grid
//         container
//         spacing={3}
//         marginBottom={3}
//         alignItems="center"
//         justifyContent="space-between"
//       >
//         <Grid item xs={5}>
//           <Typography variant="h4">Shortage Claim Finding </Typography>
//         </Grid>
//         <Grid item xs={7}>
//           <Grid container spacing={2} justifyContent="end">
//             <Grid item>
//               <ButtonStyled>
//                 <BoxStyled>Export</BoxStyled>{" "}
//                 <span className="btn-indicator"></span>{" "}
//                 <BoxStyled>
//                   <IconFileArrowRight
//                     size="16"
//                     style={{ margin: "auto", verticalAlign: "middle" }}
//                   />
//                 </BoxStyled>
//               </ButtonStyled>
//             </Grid>
//             <Grid item>
//               <ButtonStyled>
//                 <BoxStyled>Import</BoxStyled>{" "}
//                 <span className="btn-indicator"></span>{" "}
//                 <BoxStyled>
//                   <IconFileArrowLeft
//                     size="16"
//                     style={{ margin: "auto", verticalAlign: "middle" }}
//                   />
//                 </BoxStyled>
//               </ButtonStyled>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//       <Table>
//         <TableHead>
//           <TableRow style={{ backgroundColor: theme.palette.primary.light }}>
//             <TableCell
//               style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
//             >
//               Settlement
//             </TableCell>
//             <TableCell
//               style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
//             >
//               Active Cases($)
//             </TableCell>
//             <TableCell
//               style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
//             >
//               Archived
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {shortagetble.map((row, index) => (
//             <TableRowStyled key={row.id} index={index} theme={theme}>
//               <TableCell>{row.Settlement}</TableCell>
//               <TableCellStyled style={{ color: row.color }}>
//   {row.Active.map((value, index) => (
//     <Box key={index} my={1} style={{ display: 'flex', alignItems: 'center' }}>
//       {index === 0 && ( // Check if it's the first item in the array
//         <IconEye
//           size={16}
//           style={{ cursor: 'pointer', marginRight: '10px' }}
//           onClick={() => handleView(row)}
//         />
//       )}
//       <div style={{ width: '120px' }}>{value}</div> {/* Fixed width container for value */}
//       {(index === 0 || index === 1) && ( // Check if it's the first or second item in the array
//         <IconPencil
//           key={index}
//           size={16}
//           style={{ cursor: 'pointer', marginLeft: '5px' }}
//           onClick={() => handleEdit(row.id, index)}
//         />
//       )}
//     </Box>
//   ))}
// </TableCellStyled>
//               <TableCell style={{ color: row.color }}>
//                 {row.Archived.map((value, index) => (
//                   <Box my={1} style={{ display: "flex", alignItems: "center" }}>
//                     {value}
//                   </Box>
//                 ))}
//               </TableCell>
//             </TableRowStyled>
//           ))}
//         </TableBody>
//       </Table>
//       <Dialog open={editDialogOpen} onClose={handleCloseEdit}>
//         <DialogTitle>Edit Value</DialogTitle>
//         <DialogContent>
//           <Input value={editedValue} onChange={handleInputChange} />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseEdit}>Cancel</Button>
//           <Button onClick={handleSave}>Save</Button>
//         </DialogActions>
//       </Dialog>
//       <Dialog open={viewDialogOpen} onClose={handleCloseView}>
//         <DialogTitle>{selectedRow ? selectedRow.Settlement : ""}</DialogTitle>
//         <DialogContent>
//           <Table>
//             <TableHead>
//               <TableRow
//                 style={{ backgroundColor: theme.palette.primary.light }}
//               >
//                 <TableCell
//                   style={{
//                     color: "white",
//                     fontSize: "12px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   Settlement
//                 </TableCell>
//                 <TableCell
//                   style={{
//                     color: "white",
//                     fontSize: "12px",
//                     fontWeight: "600",
//                   }}
//                 >
//                   Active Case($)
//                 </TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {selectedRow &&
//                 selectedRow.Active.map((value, index) => (
//                   <TableRow key={index}>
//                     <TableCell>
//                       {index === 0 ? selectedRow.Settlement : ""}
//                     </TableCell>
//                     <TableCell>{value}</TableCell>
//                   </TableRow>
//                 ))}
//             </TableBody>
//           </Table>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseView}>Close</Button>
//         </DialogActions>
//       </Dialog>
//     </DashboardCard>
//   );
// };

// export default ShortageClaimTable;




/*------------------------------------------------------------- Working Code -------------------------------------------------------------------*/



import React, { useState, useEffect } from "react";
import {
  styled,
  Typography,
  Box,
  useTheme,
  Grid,
  Button,
  Table,
  TableHead,
  Input,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";
import {
  IconFileArrowRight,
  IconFileArrowLeft,
  IconPencil,
  IconEye,
} from "@tabler/icons-react";
import axios from "axios";
import config from "../../../../config";
import eventEmitter from "../../../eventEmitter";

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrast,
  border: "1px solid",
  borderColor: theme.palette.primary.contrast,
  color: theme.palette.primary.contrastText,
  fontSize: "12px",
  padding: "0",
  fontWeight: "600",
  transition: "all ease 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.main,
  },
  "& .btn-indicator": {
    width: "1px",
    backgroundColor: theme.palette.primary.main,
    alignSelf: "stretch",
    marginLeft: "4px",
  },
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  padding: "5px 12px",
  fontWeight: "600",
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "600",
}));

const TableRowStyled = styled(TableRow)(({ theme, index }) => ({
  borderBottom: "1px solid #eee",
  backgroundColor:
    index % 2 === 0
      ? theme.palette.secondary.contrastText
      : theme.palette.primary.extraLight,
}));

const ShortageClaimTable = () => {
  const theme = useTheme();
  const [editableId, setEditableId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [shortagetble, setShortagetble] = useState([]);
  const [vendorId, setVendorId] = useState(
    sessionStorage.getItem("selectedVendorId")
  );
  // const [vendorId, setVendorId] = useState("");
  const BASE_URL = config.UniUrl;

  useEffect(() => {
    const storedVendorId = sessionStorage.getItem("selectedVendorId");
    const token = sessionStorage.getItem("token");
    if (storedVendorId) {
      setVendorId(storedVendorId);
    }

    const fetchData = async (vendorId) => {
      try {
        const response = await axios.get(
          `${BASE_URL}/shortage/getAggrShortageSummByuploadId?vendorId=${vendorId}&batchStatus=CURRENT`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        // Log the received data to inspect
        console.log("Received data from API:", data);

        if (!data || data.status === "FAILED" || response.status === 404) {
          // Handle case where API returns no data or failure
          setShortagetble([]); // Set shortage table to empty array
        } else {
          // Adjust sumUnsettledShortage to positive
          const sumUnsettledShortage = Math.abs(data.data.sumUnsettledShortage);

          // Format the number with commas and up to two decimal places
          const formattedSumUnsettledShortage =
            sumUnsettledShortage.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            });

          // Convert dates to mm/dd/yy format
          const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            return `${date.getMonth() + 1}/${date.getDate()}/${
              date.getFullYear() % 100
            }`;
          };

          // Map API response to table structure
          const mappedData = [
            {
              id: 1,
              Settlement: "Shortage Claim Finding",
              Active: [
                `${
                  sumUnsettledShortage >= 0
                    ? `$ ${formattedSumUnsettledShortage}`
                    : " - " 
                }`,
              ],
              Archived: [" - "],
              color: theme.palette.accent.main,
            },
            {
              id: 2,
              Settlement: "Period Covered (Invoice Date)",
              // Active: [
              //   `${
              //     data.data.minPeriodCoveredStartDate
              //       ? `${formatDate(data.data.minPeriodCoveredStartDate)}`
              //       : "-"
              //   } to ${
              //     data.data.maxPeriodCoveredEndDate
              //       ? `${formatDate(data.data.maxPeriodCoveredEndDate)}`
              //       : "-"
              //   }`,
              // ],
              Active: [
                data.data.minPeriodCoveredStartDate && data.data.maxPeriodCoveredEndDate
                  ? `${formatDate(data.data.minPeriodCoveredStartDate)} to ${formatDate(data.data.maxPeriodCoveredEndDate)}`
                  : "-"
              ],
              Archived: [" - "],
            },
            {
              id: 3,
              Settlement: "Period Covered (Due Date)",
              // Active: [
              //   `${
              //     data.data.minPaymentDueDate
              //       ? `${formatDate(data.data.minPaymentDueDate)}`
              //       : "-"
              //   } to ${
              //     data.data.maxPaymentDueDate
              //       ? `${formatDate(data.data.maxPaymentDueDate)}`
              //       : "-"
              //   }`,
              // ],
              Active: [
                data.data.minPaymentDueDate && data.data.maxPaymentDueDate
                  ? `${formatDate(data.data.minPaymentDueDate)} to ${formatDate(data.data.maxPaymentDueDate)}`
                  : "-"
              ],
              Archived: [" - "],
              color: theme.palette.success.main,
            },
            {
              id: 4,
              Settlement: "Case ID & Creation Date",
              // Active: [
              //   `${data.data.caseId ? `${data.data.caseId}` : "-"} & ${
              //     data.data.minCaseCreationDate
              //       ? `${formatDate(data.data.minCaseCreationDate)}`
              //       : "-"
              //   }`,
              // ],
              Active: [
                data.data.caseId && data.data.minCaseCreationDate
                  ? `${data.data.caseId} & ${formatDate(data.data.minCaseCreationDate)}`
                  : "-"
              ],
              Archived: [" - "],
              color: theme.palette.accent.main,
            },
            {
              id: 5,
              Settlement: "Open Balance & Confirmation Date",
              // Active: [
              //   `${
              //     data.data.sumOutstandingBalanceAmount
              //       ? `${data.data.sumOutstandingBalanceAmount}`
              //       : "-"
              //   } & ${
              //     data.data.minOutstandingBalanceConfrimedDate
              //       ? `${formatDate(
              //           data.data.minOutstandingBalanceConfrimedDate
              //         )}`
              //       : "-"
              //   }`,
              // ],
              Active: [
                data.data.sumOutstandingBalanceAmount && data.data.minOutstandingBalanceConfrimedDate
                  ? `$${data.data.sumOutstandingBalanceAmount} & ${formatDate(data.data.minOutstandingBalanceConfrimedDate)}`
                  : "-"
              ],
              Archived: [" - "],
            },
            // {
            //   id: 7,
            //   Settlement: "Settlement Offer & Date",
            //   // Active: [
            //   //   `${
            //   //     data.data.settlementOffer
            //   //       ? `${data.data.settlementOffer}`
            //   //       : "-"
            //   //   } & ${
            //   //     data.data.settlementOfferdate
            //   //       ? `${formatDate(data.data.settlementOfferdate)}`
            //   //       : "-"
            //   //   }`,
            //   // ],
            //   Active: [
            //     data.data.settlementOffer && data.data.settlementOfferdate
            //       ? `$${data.data.settlementOffer} & ${formatDate(data.data.settlementOfferdate)}`
            //       : "-"
            //   ],
            //   Archived: [" - "],
            //   color: theme.palette.success.main,
            // },
            {
              id: 8,
              Settlement: "Counter Offer & Date",
              Active: ["  - "],
              Archived: [" - "],
              color: theme.palette.accent.main,
            },
            {
              id: 9,
              Settlement: "Accepted Offer & Date",
              // Active: [
              //   `${
              //     data.data.accepatedDate ? `${data.data.accepatedDate}` : "-"
              //   } & ${
              //     data.data.accepatedAmount
              //       ? `${data.data.accepatedAmount}`
              //       : "-"
              //   }`,
              // ],
              Active: [
                data.data.accepatedDate && data.data.accepatedAmount
                  ? `${data.data.accepatedDate} & $${data.data.accepatedAmount}`
                  : "-"
              ],
              Archived: [" - "],
            },
            {
              id: 10,
              Settlement: "Settlement Amount & Date",
              // Active: [
              //   `${
              //     data.data.sumSettledAmount
              //       ? `${data.data.sumSettledAmount}`
              //       : "-"
              //   } & ${
              //     data.data.minResolvedDate
              //       ? `${formatDate(data.data.minResolvedDate)}`
              //       : "-"
              //   }`,
              // ],
              Active: [
                data.data.sumSettledAmount && data.data.minResolvedDate
                  ? `$${data.data.sumSettledAmount} & ${formatDate(data.data.minResolvedDate)}`
                  : "-"
              ],
              Archived: [" - "],
              color: theme.palette.success.main,
            },
          ];

          setShortagetble(mappedData);
        }
      } catch (error) {
        console.error("Error fetching shortage data:", error);
        setShortagetble([]); // Set shortage table to empty array in case of error
      }
    };

    if (storedVendorId) {
      fetchData(storedVendorId); // Call fetchData with initial storedVendorId
    }

    const handleVendorSelected = (vendorId) => {
      setVendorId(vendorId);
      fetchData(vendorId); // Call fetchData when vendorId changes
    };

    eventEmitter.on("vendorSelected", handleVendorSelected);

    return () => {
      eventEmitter.off("vendorSelected", handleVendorSelected);
    };
  }, [
    theme.palette.accent.main,
    theme.palette.error.main,
    theme.palette.success.main,
  ]);

  useEffect(() => {
    const storedVendorId = sessionStorage.getItem("selectedVendorId");
    if (storedVendorId) {
      setVendorId(storedVendorId);
    }
  }, []);

  const handleEdit = (id) => {
    console.log("Edit clicked for id:", id);
    setEditableId(id);
    setEditedValue(
      editedValues[id] ||
        shortagetble.find((item) => item.id === id)?.Active?.[0] ||
        ""
    );
    setEditDialogOpen(true);
  };

  const handleView = (row) => {
    console.log("View clicked for row:", row);
    setSelectedRow(row);
    setViewDialogOpen(true);
  };

  const handleCloseEdit = () => {
    setEditDialogOpen(false);
  };

  const handleCloseView = () => {
    setViewDialogOpen(false);
  };

  const handleInputChange = (event) => {
    setEditedValue(event.target.value);
  };

  const handleSave = () => {
    setEditedValues({ ...editedValues, [editableId]: editedValue });
    setEditDialogOpen(false);
  };

  return (
    <DashboardCard>
      <Grid
        container
        spacing={3}
        marginBottom={3}
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid item xs={5}>
          <Typography variant="h4">Shortage Claim Finding </Typography>
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={2} justifyContent="end">
            <Grid item>
              <ButtonStyled>
                <BoxStyled>Export</BoxStyled>{" "}
                <span className="btn-indicator"></span>{" "}
                <BoxStyled>
                  <IconFileArrowRight
                    size="16"
                    style={{ margin: "auto", verticalAlign: "middle" }}
                  />
                </BoxStyled>
              </ButtonStyled>
            </Grid>
            <Grid item>
              <ButtonStyled>
                <BoxStyled>Import</BoxStyled>{" "}
                <span className="btn-indicator"></span>{" "}
                <BoxStyled>
                  <IconFileArrowLeft
                    size="16"
                    style={{ margin: "auto", verticalAlign: "middle" }}
                  />
                </BoxStyled>
              </ButtonStyled>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: theme.palette.primary.light }}>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              Settlement
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              Active Cases($)
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              Archived
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {shortagetble !== null && shortagetble.length > 0 ? (
            shortagetble.map((row, index) => (
              <TableRowStyled key={row.id} index={index} theme={theme}>
                <TableCell>{row.Settlement}</TableCell>
                <TableCellStyled style={{ color: row.color }}>
                  {row.Active.map((value, idx) => (
                    <Box
                      key={idx}
                      my={1}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {idx === 0 && (
                        <IconEye
                          size={16}
                          style={{ cursor: "pointer", marginRight: "10px" }}
                          onClick={() => handleView(row)}
                        />
                      )}
                      <div style={{ width: "120px" }}>{value}</div>
                      {(idx === 0 || idx === 1) && (
                        <IconPencil
                          key={idx}
                          size={16}
                          style={{ cursor: "pointer", marginLeft: "5px" }}
                          onClick={() => handleEdit(row.id)}
                        />
                      )}
                    </Box>
                  ))}
                </TableCellStyled>
                <TableCell style={{ color: row.color }}>
                  {row.Archived.map((value, idx) => (
                    <Box
                      key={idx}
                      my={1}
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      {value}
                    </Box>
                  ))}
                </TableCell>
              </TableRowStyled>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} style={{ textAlign: "center" }}>
                {shortagetble === null
                  ? "Loading..."
                  : "No data available for this vendor."}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Dialog open={editDialogOpen} onClose={handleCloseEdit}>
        <DialogTitle>Edit Value</DialogTitle>
        <DialogContent>
          <Input value={editedValue} onChange={handleInputChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={viewDialogOpen} onClose={handleCloseView}>
        <DialogTitle>{selectedRow ? selectedRow.Settlement : ""}</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow
                style={{ backgroundColor: theme.palette.primary.light }}
              >
                <TableCell
                  style={{
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Settlement
                </TableCell>
                <TableCell
                  style={{
                    color: "white",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Active Case($)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedRow &&
                selectedRow.Active.map((value, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {index === 0 ? selectedRow.Settlement : ""}
                    </TableCell>
                    <TableCell>{value}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Close</Button>
        </DialogActions>
      </Dialog>
    </DashboardCard>
  );
};

export default ShortageClaimTable;
