/* ---------- WeBee Code ------------*/

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   styled,
//   Typography,
//   Box,
//   useTheme,
//   IconButton,
//   Grid,
//   Button,
//   Table,
//   TableHead,
//   TableBody,
//   TableRow,
//   TableCell,
//   Input,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import DashboardCard from "../../../components/shared/DashboardCard";
// import {
//   IconFileArrowRight,
//   IconFileArrowLeft,
//   IconEye,
//   IconPencil,
// } from "@tabler/icons-react";
// import { Link } from "react-router-dom";
// import eventEmitter from "../../../eventEmitter";
// import config from "../../../../config";

// const ButtonStyled = styled(Button)(({ theme }) => ({
//   backgroundColor: theme.palette.primary.contrast,
//   border: "1px solid",
//   borderColor: theme.palette.primary.contrast,
//   color: theme.palette.primary.contrastText,
//   fontSize: "11px",
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
// const TableRowStyled = styled(TableRow)(({ theme, index }) => ({
//   borderBottom: "1px solid #eee",
//   backgroundColor:
//     index % 2 === 0
//       ? theme.palette.secondary.contrastText
//       : theme.palette.primary.extraLight,
// }));
// const BoxStyled = styled(Box)(({ theme }) => ({
//   padding: "3px 8px",
//   fontWeight: "600",
// }));

// const TableCellStyled = styled(TableCell)(({ theme }) => ({
//   fontSize: "12px",
//   fontWeight: "600",
//   padding: "7px 16px",
// }));

// const ShortageTable = () => {
//   const theme = useTheme();
//   const [editableId, setEditableId] = useState(null);
//   const [editedValues, setEditedValues] = useState({});
//   const [editDialogOpen, setEditDialogOpen] = useState(false);
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);
//   const [editedValue, setEditedValue] = useState("");
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [tableData, setTableData] = useState([]);
//   const BASE_URL = config.UniUrl;
//   // const [vendorId, setVendorId] = useState(null);
//   const vendorId = sessionStorage.getItem("selectedVendorId");
//   const [noDataAvailable, setNoDataAvailable] = useState(false);

//   const formatNumber = (number) => new Intl.NumberFormat().format(number);

//   const formatPositiveNumber = (number) => {
//     // If the number is negative, make it positive
//     const positiveNumber = Math.abs(number);
//     // Format the positive number
//     const formattedNumber = formatNumber(positiveNumber);
//     return formattedNumber;
//   };

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

//   const formatDate = (dateString) => {
//     if (!dateString) return null; // Handle null or undefined values

//     const date = new Date(dateString);
//     const mm = date.getMonth() + 1; // Months are zero indexed
//     const dd = date.getDate();
//     const yy = date.getFullYear().toString().slice(-2); // Get last two digits of the year

//     return `${mm}/${dd}/${yy}`;
//   };

//   useEffect(() => {
//     const vendorId = sessionStorage.getItem("selectedVendorId");
//     const token = sessionStorage.getItem("token");
//     if (vendorId !== "5") {
//       axios
//         .get(
//           `${BASE_URL}/shortage/getAggrShortageSummByuploadId?vendorId=${vendorId}&batchStatus=CURRENT`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         )
//         .then((response) => {
//           if (
//             response.data.status === "FAILED" ||
//             response.data.data === null
//           ) {
//             setNoDataAvailable(true);
//           } else {
//             setNoDataAvailable(false);
//             const apiData = response.data.data;
//             const newData = [
//               {
//                 Settlement: "Shortage Claim Finding",
//                 value: `$ ${
//                   formatPositiveNumber(apiData.sumUnsettledShortage) || 0
//                 }`,
//                 color: theme.palette.accent.main,
//               },
//               {
//                 Settlement: "Period Covered (Invoice Date)",
//                 value: `${
//                   formatDate(apiData.minPeriodCoveredStartDate) || "-"
//                 } to ${formatDate(apiData.maxPeriodCoveredEndDate) || "-"}`,
//               },
//               {
//                 Settlement: "Period Covered (Due Date)",
//                 value: `${formatDate(apiData.minPaymentDueDate) || "-"} to ${
//                   formatDate(apiData.maxPaymentDueDate) || "-"
//                 }`,
//                 color: theme.palette.error.main,
//               },
//               {
//                 Settlement: "Case ID & Creation Date",
//                 value: `${apiData.caseId || "-"} & ${
//                   formatDate(apiData.minCaseCreationDate) || "-"
//                 }`,
//               },
//               {
//                 Settlement: "Open Balance & Confirmation Date",
//                 value: `${
//                   formatNumber(apiData.sumOutstandingBalanceAmount) || 0
//                 } & ${
//                   formatDate(apiData.minOutstandingBalanceConfrimedDate) || "-"
//                 }`,
//                 color: theme.palette.accent.main,
//               },
//               {
//                 Settlement: "Settlement Offer & Date",
//                 value: `${formatNumber(apiData.settlementOffer) || 0} & ${
//                   formatDate(apiData.settlementOfferdate) || "-"
//                 }`,
//               },
//               {
//                 Settlement: "Counter Offer & Date",
//                 value: `${formatNumber(apiData.counterOfferAmount) || 0} & ${
//                   formatDate(apiData.counterofferDate) || "-"
//                 }`,
//               },
//               {
//                 Settlement: "Accepted Offer & Date",
//                 value: `${formatNumber(apiData.accepatedAmount) || 0} & ${
//                   formatDate(apiData.accepatedDate) || "-"
//                 }`,
//               },
//               {
//                 Settlement: "Settlement Amount & Date",
//                 value: `${formatNumber(apiData.sumSettledAmount) || 0} & ${
//                   formatDate(apiData.minResolvedDate) || "-"
//                 }`,
//                 color: theme.palette.success.main,
//               },
//             ];
//             setTableData(newData);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching data from API:", error);
//           setNoDataAvailable(true);
//         });
//     }
//   }, [vendorId]);

//   const shortagetble = [
//     {
//       id: 1,
//       Settlement: "Shortage Claim Finding",
//       Active: ["$ 1,843,291.52"],
//       color: theme.palette.accent.main,
//     },
//     {
//       id: 2,
//       Settlement: "Period Covered (Invoice Date)",
//       Active: ["11/19/20 to 11/20/23"],
//     },
//     {
//       id: 3,
//       Settlement: "Period Covered (Due Date)",
//       Active: ["01/01/21 to 11/30/23"],
//       color: theme.palette.error.main,
//     },
//     {
//       id: 4,
//       Settlement: "Case ID & Creation Date",
//       Active: ["12296505531 & 03/21/23"],
//     },
//     {
//       id: 5,
//       Settlement: "Open Balance & Confirmation Date",
//       Active: ["$ 202,212.18 & 04/04/23"],
//       color: theme.palette.accent.main,
//     },
//     {
//       id: 7,
//       Settlement: "Settlement Offer & Date",
//       Active: ["$ 700,450.78  & 12/16/23"],
//     },
//     {
//       id: 8,
//       Settlement: "Counter Offer & Date",
//       Active: [" -  & - "],
//     },
//     {
//       id: 9,
//       Settlement: "Accepted Offer & Date",
//       Active: ["$ 70,774.26 & 01/18/24"],
//     },
//     {
//       id: 10,
//       Settlement: "Settlement Amount & Date",
//       Active: ["$ 70,774.26 & 01/18/24"],
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
//           <Grid container spacing={1}>
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
//             <Grid item>
//               <ButtonStyled component={Link} to="/shortage-claim-finding">
//                 <BoxStyled>View Details</BoxStyled>
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
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {vendorId !== "5" && noDataAvailable ? (
//             <TableRow>
//               <TableCell colSpan={3} align="center">
//                 No data available
//               </TableCell>
//             </TableRow>
//           ) : (
//             (vendorId === "5" ? shortagetble : tableData).map((row, index) => (
//               <TableRowStyled
//                 key={index}
//                 index={index}
//                 theme={theme}
//                 style={{ height: vendorId !== "5" ? "55px" : "auto" }}
//               >
//                 <TableCellStyled style={{ fontWeight: 600 }}>
//                   {row.Settlement || row.settlement}
//                 </TableCellStyled>
//                 <TableCellStyled>
//                   {(row.Active || [row.value]).map((value, idx) => (
//                     <Box
//                       key={idx}
//                       my={1}
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         flexDirection: "column",
//                         color: row.color || theme.palette.text.primary,
//                       }}
//                     >
//                       <div
//                         style={{
//                           display: "flex",
//                           flexDirection: "row",
//                           alignItems: "center",
//                         }}
//                       >
//                         {idx === 0 && (
//                           <IconEye
//                             size={16}
//                             style={{ cursor: "pointer", marginRight: "10px" }}
//                             onClick={() => handleView(row)}
//                           />
//                         )}
//                         <div style={{ width: "120px", whiteSpace: "pre-wrap" }}>
//                           {typeof value === "number"
//                             ? `$ ${formatNumber(value)}`
//                             : value}
//                         </div>
//                         {(idx === 0 || idx === 1) && (
//                           <IconPencil
//                             size={16}
//                             style={{ cursor: "pointer", marginLeft: "5px" }}
//                             onClick={() => handleEdit(row.id || index, idx)}
//                           />
//                         )}
//                       </div>
//                     </Box>
//                   ))}
//                 </TableCellStyled>
//               </TableRowStyled>
//             ))
//           )}
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

// export default ShortageTable;

/* ------------------------------------------------------------------ My Code - 1 --------------------------------------------------------------*/

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  styled,
  Typography,
  Box,
  useTheme,
  IconButton,
  Grid,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";
import {
  IconFileArrowRight,
  IconFileArrowLeft,
  IconEye,
  IconPencil,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import eventEmitter from "../../../eventEmitter";
import config from "../../../../config";

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrast,
  border: "1px solid",
  borderColor: theme.palette.primary.contrast,
  color: theme.palette.primary.contrastText,
  fontSize: "11px",
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
const TableRowStyled = styled(TableRow)(({ theme, index }) => ({
  borderBottom: "1px solid #eee",
  backgroundColor:
    index % 2 === 0
      ? theme.palette.secondary.contrastText
      : theme.palette.primary.extraLight,
}));
const BoxStyled = styled(Box)(({ theme }) => ({
  padding: "3px 8px",
  fontWeight: "600",
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  fontSize: "12px",
  fontWeight: "600",
  padding: "7px 16px",
}));

const ShortageTable = () => {
  const theme = useTheme();
  const [editableId, setEditableId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editedValue, setEditedValue] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const BASE_URL = config.UniUrl;

  // const [vendorId, setVendorId] = useState(null);
  const vendorId = sessionStorage.getItem("selectedVendorId");
  const [noDataAvailable, setNoDataAvailable] = useState(false);

  // State to manage selected file and upload success message
  const [uploadSuccess, setUploadSuccess] = useState("");

  const formatNumber = (number) => new Intl.NumberFormat().format(number);

  const formatPositiveNumber = (number) => {
    // If the number is negative, make it positive
    const positiveNumber = Math.abs(number);
    // Format the positive number
    const formattedNumber = formatNumber(positiveNumber);
    return formattedNumber;
  };

  // State to manage selected file
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.post(
        `${BASE_URL}/api/excel/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("File upload response:", response.data);
      setUploadSuccess(`File uploaded successfully: ${response.data.message}`);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadSuccess("File upload failed. Please try again.");
    }
  };

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

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setEditedValues({ ...editedValues, [editableId]: editedValue });
    setEditDialogOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null; // Handle null or undefined values

    const date = new Date(dateString);
    const mm = date.getMonth() + 1; // Months are zero indexed
    const dd = date.getDate();
    const yy = date.getFullYear().toString().slice(-2); // Get last two digits of the year

    return `${mm}/${dd}/${yy}`;
  };

  useEffect(() => {
    const vendorId = sessionStorage.getItem("selectedVendorId");
    const token = sessionStorage.getItem("token");
    if (vendorId !== "5") {
      axios
        .get(
          `${BASE_URL}/shortage/getAggrShortageSummByuploadId?vendorId=${vendorId}&batchStatus=CURRENT`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          if (
            response.data.status === "FAILED" ||
            response.data.data === null
          ) {
            setNoDataAvailable(true);
          } else {
            setNoDataAvailable(false);
            const apiData = response.data.data;

            const newData = [
              {
                Settlement: "Shortage Claim Finding",
                value: `$${
                  formatPositiveNumber(apiData.sumUnsettledShortage) || 0
                }`,
                color: theme.palette.accent.main,
              },
              {
                Settlement: "Period Covered (Invoice Date)",
                value: `${
                  formatDate(apiData.minPeriodCoveredStartDate) || "-"
                } to ${formatDate(apiData.maxPeriodCoveredEndDate) || "-"}`,
              },
              {
                Settlement: "Period Covered (Due Date)",
                value: `${formatDate(apiData.minPaymentDueDate) || "-"} to ${
                  formatDate(apiData.maxPaymentDueDate) || "-"
                }`,
                // value: apiData.minPaymentDueDate
                // ? `${formatNumber(apiData.minPaymentDueDate)} & ${formatDate(apiData.maxPaymentDueDate) || "-"}`
                // : "-",
                color: theme.palette.success.extraDark,
              },
              {
                Settlement: "Case ID & Creation Date",
                // value: `${apiData.caseId || "-"} & ${
                //   formatDate(apiData.minCaseCreationDate) || "-"
                // }`,

                value: apiData.caseId
                  ? `${formatNumber(apiData.caseId)} & ${
                      formatDate(apiData.minCaseCreationDate) || "-"
                    }`
                  : "-",
                color: theme.palette.accent.main,
              },
              {
                Settlement: "Open Balance & Confirmation Date",
                // value: `${
                //   formatNumber(apiData.sumOutstandingBalanceAmount) || 0
                // } & ${
                //   formatDate(apiData.minOutstandingBalanceConfrimedDate) || "-"
                // }`,
                value: apiData.sumOutstandingBalanceAmount
                  ? `${formatNumber(apiData.sumOutstandingBalanceAmount)} & ${
                      formatDate(apiData.minOutstandingBalanceConfrimedDate) ||
                      "-"
                    }`
                  : "-",
              },
              // {
              //   Settlement: "Settlement Offer & Date",
              //   value: apiData.settlementOffer
              //     ? `${formatNumber(apiData.settlementOffer)} & ${formatDate(apiData.settlementOffer) || "-"}`
              //     : "-",
              //     color: theme.palette.success.extraDark,
              // },
              {
                Settlement: "Counter Offer & Date",
                value: apiData.counterOfferAmount
                  ? `${formatNumber(apiData.counterOfferAmount)} & ${
                      formatDate(apiData.counterofferDate) || "-"
                    }`
                  : "-",
                color: theme.palette.accent.main,
              },
              {
                Settlement: "Accepted Offer & Date",
                value: apiData.accepatedAmount
                  ? `${formatNumber(apiData.accepatedAmount)} & ${
                      formatDate(apiData.accepatedDate) || "-"
                    }`
                  : "-",
              },
              {
                Settlement: "Settlement Amount & Date",
                value: apiData.sumSettledAmount
                  ? `${formatNumber(apiData.sumSettledAmount)} & ${
                      formatDate(apiData.minResolvedDate) || "-"
                    }`
                  : "-",
                color: theme.palette.success.main,
              },
            ];

            setTableData(newData);
          }
        })
        .catch((error) => {
          console.error("Error fetching data from API:", error);
          setNoDataAvailable(true);
        });
    }
  }, [vendorId]);

  const shortagetble = [
    {
      id: 1,
      Settlement: "Shortage Claim Finding",
      Active: ["$1,843,291.52"],
      color: theme.palette.accent.main,
    },
    {
      id: 2,
      Settlement: "Period Covered (Invoice Date)",
      Active: ["11/19/20 to 11/20/23"],
    },
    {
      id: 3,
      Settlement: "Period Covered (Due Date)",
      Active: ["01/01/21 to 11/30/23"],
      color: theme.palette.success.extraDark,
    },
    {
      id: 4,
      Settlement: "Case ID & Creation Date",
      Active: ["12296505531 & 03/21/23"],
      color: theme.palette.accent.main,
    },
    {
      id: 5,
      Settlement: "Open Balance & Confirmation Date",
      Active: ["$1,842,191.96 & 04/04/23"],
    },
    // {
    //   id: 7,
    //   Settlement: "Settlement Offer & Date",
    //   Active: ["$700,450.78  & 12/16/23"],
    //   color: theme.palette.success.extraDark,
    // },
    {
      id: 8,
      Settlement: "Counter Offer & Date",
      Active: [" - "],
      color: theme.palette.accent.main,
    },
    {
      id: 9,
      Settlement: "Accepted Offer & Date",
      Active: ["$70,774.26 & 01/18/24"],
    },
    {
      id: 10,
      Settlement: "Settlement Amount & Date",
      Active: ["$70,774.26 & 01/18/24"],
      color: theme.palette.success.main,
    },
  ];

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
          <Grid container spacing={1}>
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

            {/* <Grid item>
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
            </Grid> */}

            <Grid item>
              <label htmlFor="file-upload">
                <ButtonStyled component="span">
                  <BoxStyled>Import</BoxStyled>{" "}
                  <span className="btn-indicator"></span>{" "}
                  <BoxStyled>
                    <IconFileArrowLeft
                      size="16"
                      style={{ margin: "auto", verticalAlign: "middle" }}
                    />
                  </BoxStyled>
                </ButtonStyled>
              </label>
              <input
                id="file-upload"
                type="file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Grid>

            <Grid item>
              <ButtonStyled component={Link} to="/shortage-claim-finding">
                <BoxStyled>View Details</BoxStyled>
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
          </TableRow>
        </TableHead>

        <TableBody>
          {vendorId !== "5" && noDataAvailable ? (
            <TableRow>
              <TableCell colSpan={3} align="center">
                No data available
              </TableCell>
            </TableRow>
          ) : (
            (vendorId === "5" ? shortagetble : tableData).map((row, index) => (
              <TableRowStyled
                key={index}
                index={index}
                theme={theme}
                style={{ height: vendorId !== "5" ? "65px" : "65px" }}
              >
                <TableCellStyled style={{ fontWeight: 600 }}>
                  {row.Settlement || row.settlement}
                </TableCellStyled>
                <TableCellStyled>
                  {(row.Active || [row.value]).map((value, idx) => (
                    <Box
                      key={idx}
                      my={1}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        color: row.color || theme.palette.text.primary,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        {idx === 0 && (
                          <IconEye
                            size={16}
                            style={{ cursor: "pointer", marginRight: "10px" }}
                            onClick={() => handleView(row)}
                          />
                        )}
                        <div style={{ width: "120px", whiteSpace: "pre-wrap" }}>
                          {typeof value === "number"
                            ? `$ ${formatNumber(value)}`
                            : value}
                        </div>
                        {(idx === 0 || idx === 1) && (
                          <IconPencil
                            size={16}
                            style={{ cursor: "pointer", marginLeft: "5px" }}
                            onClick={() => handleEdit(row.id || index, idx)}
                          />
                        )}
                      </div>
                    </Box>
                  ))}
                </TableCellStyled>
              </TableRowStyled>
            ))
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

export default ShortageTable;
