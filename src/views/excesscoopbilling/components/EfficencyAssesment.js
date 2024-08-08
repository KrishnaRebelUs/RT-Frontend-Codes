// import React, { useState, useEffect } from "react";
// import {
//   Typography,
//   Box,
//   Tabs,
//   Tab,
//   styled,
//   Grid,
//   Divider,
//   Button,
//   Modal,
//   Backdrop,
//   Fade,
//   TextField,
//   MenuItem,
//   IconButton,
//   Menu ,
//   ListItemIcon,
//   ListItemText,
// } from "@mui/material";
// import PropTypes from "prop-types";
// import DashboardCard from "../../../components/shared/DashboardCard";
// import { useTheme } from "@emotion/react";
// import CloseIcon from "@mui/icons-material/Close";
// import moment from "moment";
// import axios from "axios";
// import config from "../../../../config";
// import eventEmitter from "../../../eventEmitter";
// import { bgcolor, borderRadius } from "@mui/system";

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`vertical-tabpanel-${index}`}
//       aria-labelledby={`vertical-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ px: 3 }}>
//           <Typography>{children}</Typography>
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

// const TabStyled = styled(Tab)(({ theme }) => ({
//   color: theme.palette.text.main,
//   fontSize: "14px",
//   alignItems: "start",
//   padding: "5px 8px",
//   fontWeight: "600",
//   minHeight: "inherit",
//   marginBottom: "5px",
//   marginTop: "18px",
//   textAlign: "left",
//   transition: "all 0.3s ease",
//   "&.Mui-selected, &:hover": {
//     color: theme.palette.accent.main,
//   },
// }));

// const style = {
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 450,
//   bgcolor: "background.paper",
//   border: "none",
//   borderRadius: "10px",
//   boxShadow: 24,
//   p: 4,
// };

// const EfficencyAssesment = () => {
//   const theme = useTheme();
//   const [value, setValue] = useState(0);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const BASE_URL = config.UniUrl;
//   // Modal
//   const [open, setOpen] = useState(false);
//   const [requestType, setRequestType] = useState(null);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setStartDate("");
//     setEndDate("");
//     setShowOverlappingBilling(false);
//     setOpen(false);
//   };

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [overlappingYears, setOverlappingYears] = useState([]);
//   const [showOverlappingBilling, setShowOverlappingBilling] = useState(false);

//   const currencies = ["USD", "EUR", "GBP"];

//   // Define states for Duplicate Freight data, loading, and error
//   const [duplicateFreightData, setDuplicateFreightData] = useState(null);
//   const [duplicateFreightLoading, setDuplicateFreightLoading] = useState(true);
//   const [duplicateFreightError, setDuplicateFreightError] = useState(null);

//   // Define states for Dropship data, loading, and error
//   const [dropshipData, setDropshipData] = useState(null);
//   const [dropshipLoading, setDropshipLoading] = useState(true);
//   const [dropshipError, setDropshipError] = useState(null);

//   // Define states for Dropship data, loading, and error
//   const [duplicateData, setDuplicateData] = useState(null);
//   const [duplicateLoading, setDuplicateLoading] = useState(true);
//   const [duplicateError, setDuplicateError] = useState(null);

//   // Define states for  ShipmentDisparitydata, loading, and error
//   const [shipmentDisparityData, setShipmentDisparityData] = useState(null);
//   const [shipmentDisparityLoading, setShipmentDisparityLoading] =
//     useState(true);
//   const [shipmentDisparityError, setShipmentDisparityError] = useState(null);
//   let vendorIdFromStorage = sessionStorage.getItem("selectedVendorId");

//   useEffect(() => {
//     const tokenFromStorage = sessionStorage.getItem("token");

//     if (!tokenFromStorage) {
//       console.log("Token not found");
//       return;
//     }

//     const fetchData = async (url, setData, setLoading, setError) => {
//       try {
//         const config = {
//           headers: {
//             Authorization: `Bearer ${tokenFromStorage}`,
//           },
//         };

//         const response = await axios.get(url, config);

//         if (!response.data || !response.data.data) {
//           throw new Error("Failed to fetch data");
//         }

//         setData(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         setError(error.message);
//         setLoading(false);
//       }
//     };

//     const handleVendorSelected = (vendorId) => {
//       vendorIdFromStorage = vendorId;

//       fetchData(
//         `${BASE_URL}/overbilling/getSummaryByType?type=FRIEGHT_CHECK&vendorId=${vendorId}`,
//         setDuplicateFreightData,
//         setDuplicateFreightLoading,
//         setDuplicateFreightError
//       );

//       fetchData(
//         `${BASE_URL}/overbilling/getSummaryByType?type=DROPSHIP&vendorId=${vendorId}`,
//         setDropshipData,
//         setDropshipLoading,
//         setDropshipError
//       );

//       fetchData(
//         `${BASE_URL}/overbilling/getSummaryByType?type=QTY_MISMATCH&vendorId=${vendorId}`,
//         setShipmentDisparityData,
//         setShipmentDisparityLoading,
//         setShipmentDisparityError
//       );

//       fetchData(
//         `${BASE_URL}/overbilling/getSummaryByType?type=DUPLICATE_BILLING&vendorId=${vendorId}`,
//         setData,
//         setLoading,
//         setError
//       );
//     };

//     // Subscribe to the "vendorSelected" event
//     eventEmitter.on("vendorSelected", handleVendorSelected);

//     // Fetch initial data
//     fetchData(
//       `${BASE_URL}/overbilling/getSummaryByType?type=FRIEGHT_CHECK&vendorId=${vendorIdFromStorage}`,

//       setDuplicateFreightData,
//       setDuplicateFreightLoading,
//       setDuplicateFreightError
//     );

//     fetchData(
//       `${BASE_URL}/overbilling/getSummaryByType?type=DROPSHIP&vendorId=${vendorIdFromStorage}`,

//       setDropshipData,
//       setDropshipLoading,
//       setDropshipError
//     );

//     fetchData(
//       `${BASE_URL}/overbilling/getSummaryByType?type=QTY_MISMATCH&vendorId=${vendorIdFromStorage}`,

//       setShipmentDisparityData,
//       setShipmentDisparityLoading,
//       setShipmentDisparityError
//     );

//     fetchData(
//       `${BASE_URL}/overbilling/getSummaryByType?type=DUPLICATE_BILLING&vendorId=${vendorIdFromStorage}`,

//       setData,
//       setLoading,
//       setError
//     );

//     return () => {
//       // Unsubscribe from the event when the component unmounts
//       eventEmitter.events = {};
//     };
//   }, []);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const handleDateChange = () => {
//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const years = [];

//     for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
//       years.push(year);
//     }

//     setOverlappingYears(years);
//     setShowOverlappingBilling(startDate !== "" && endDate !== "");
//   };

//   useEffect(() => {
//     if (startDate && endDate) {
//       handleDateChange();
//     } else {
//       setShowOverlappingBilling(false);
//     }
//   }, [startDate, endDate]);

//   const handleSave = () => {
//     // Handle save logic
//     console.log("Save button clicked");
//   };

//   return (
//     <DashboardCard
//       title={
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         >
//           <Typography variant="h5" sx={{ color: theme.palette.text.dark }}>
//             Efficiency Assessment
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleOpen}
//             sx={{ ml: 19, width: "160px", height: "25px" }}
//           >
//             New Request
//           </Button>
//         </Box>
//       }
//     >
//       <Modal
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="modal-modal-title"
//         aria-describedby="modal-modal-description"
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//           sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
//         }}
//       >
//         <Fade in={open}>
//           <Box sx={style}>
//             <IconButton
//               aria-label="close"
//               onClick={handleClose}
//               sx={{
//                 position: "absolute",
//                 right: 8,
//                 top: 8,
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//             <Typography id="modal-modal-title" variant="h5" component="h2">
//               Potential CoOp Duplicate
//             </Typography>
//             <Divider sx={{ mt: 2, mb: 2, width: "100%" }} />
//             <TextField
//               label="Start Date"
//               type="date"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//               fullWidth
//               sx={{ mt: 2 }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//             <TextField
//               label="End Date"
//               type="date"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//               fullWidth
//               sx={{ mt: 2 }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//             <TextField
//               label="Vendor Code"
//               value="Vendor Code"
//               fullWidth
//               sx={{ mt: 2 }}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//             <TextField
//               label="Product Group"
//               value="Product Group"
//               fullWidth
//               sx={{ mt: 2 }}
//               InputProps={{
//                 readOnly: true,
//               }}
//             />
//             {showOverlappingBilling && (
//               <>
//                 <Typography id="modal-modal-description" sx={{ mt: 2 }}>
//                   Overlapping Billing
//                 </Typography>
//                 <Box
//                   sx={{
//                     maxHeight: "200px", // Adjust height as needed
//                     overflowY: "auto",
//                     width: "100%",
//                   }}
//                 >
//                   {overlappingYears.map((year, index) => (
//                     <Box
//                       key={index}
//                       sx={{ display: "flex", alignItems: "center", mt: 2 }}
//                     >
//                       <TextField
//                         label={year.toString()}
//                         value={year}
//                         fullWidth
//                         sx={{ mr: 1 }}
//                         InputProps={{
//                           readOnly: true,
//                         }}
//                       />
//                       <TextField
//                         label="Amount"
//                         value={0}
//                         fullWidth
//                         sx={{ mr: 1 }}
//                       />
//                       <TextField
//                         select
//                         label="Currency"
//                         value={currencies[0]}
//                         fullWidth
//                       >
//                         {currencies.map((option) => (
//                           <MenuItem key={option} value={option}>
//                             {option}
//                           </MenuItem>
//                         ))}
//                       </TextField>
//                     </Box>
//                   ))}
//                 </Box>
//               </>
//             )}
//             <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
//               <Button
//                 onClick={handleSave}
//                 sx={{
//                   backgroundColor: "#285a9e",
//                   color: "white",
//                   "&:hover": { backgroundColor: "#285a9e" },
//                   mr: 1,
//                 }}
//               >
//                 Save
//               </Button>
//               <Button
//                 onClick={handleClose}
//                 sx={{
//                   backgroundColor: "#285a9e",
//                   color: "white",
//                   "&:hover": { backgroundColor: "#285a9e" },
//                 }}
//               >
//                 Close
//               </Button>
//             </Box>
//           </Box>
//         </Fade>
//       </Modal>

//       <Grid container spacing={1}>
//         <Grid item md={6}>
//           <Tabs
//             orientation="vertical"
//             value={value}
//             onChange={handleChange}
//             className="assesment-tab"
//             sx={{
//               borderColor: "#eee",
//               "& .MuiTabs-indicator": {
//                 backgroundColor: theme.palette.accent.main,
//                 borderWidth: 3,
//                 left: 0,
//               },
//             }}
//           >
//             <TabStyled label="Shipment Disparity" {...a11yProps(0)} />
//             <TabStyled label="Duplicate Freight" {...a11yProps(1)} />
//             <TabStyled label="Non-Compliment Freight" {...a11yProps(2)} />
//             <TabStyled label="Duplicate Billing" {...a11yProps(3)} />
//           </Tabs>
//         </Grid>
//         <Grid item md={6} mt={3}>
//           <TabPanel value={value} index={0}>
//             {loading && <Typography>Loading...</Typography>}
//             {error && <Typography>{error}</Typography>}
//             {data && (
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <Typography
//                     variant="body2"
//                     style={{ color: theme.palette.text.dark, fontSize: "12px" }}
//                     fontWeight={600}
//                   >
//                     {shipmentDisparityData &&
//                       shipmentDisparityData[0]?.periodCoveredFrom &&
//                       moment(shipmentDisparityData[0].periodCoveredFrom).format(
//                         "D-MMM-YYYY"
//                       )}{" "}
//                     to{" "}
//                     {shipmentDisparityData &&
//                       shipmentDisparityData[0]?.periodCoveredTo &&
//                       moment(shipmentDisparityData[0].periodCoveredTo).format(
//                         "D-MMM-YYYY"
//                       )}
//                   </Typography>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container spacing={3}>
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.success.extraDark }}
//                         fontWeight={600}
//                       >
//                         Agreements Scanned
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{ textAlign: "right", fontWeight: "600" }}
//                       >
//                         {(shipmentDisparityData &&
//                           shipmentDisparityData[0]?.agreementScanned) ||
//                           "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container justifyContent={"space-between"} spacing="3">
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.accent.main }}
//                         fontWeight={600}
//                       >
//                         CoOp Invoices Scanned
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{ textAlign: "right", fontWeight: "600" }}
//                       >
//                         {(shipmentDisparityData &&
//                           shipmentDisparityData[0]?.invoiceScanned) ||
//                           "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container justifyContent={"space-between"} spacing={3}>
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.primary.main }}
//                         fontWeight={600}
//                       >
//                         PO's Scanned
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{ textAlign: "right", fontWeight: "600" }}
//                       >
//                         {shipmentDisparityData &&
//                         shipmentDisparityData[0]?.poScanned
//                           ? Number(
//                               shipmentDisparityData[0].poScanned
//                             ).toLocaleString(undefined, {})
//                           : "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container justifyContent={"space-between"} spacing={1}>
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.secondary.main }}
//                         fontWeight={600}
//                       >
//                         Sum Identified
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{
//                           textAlign: "right",
//                           fontWeight: "600",
//                           marginLeft: "-200px",
//                         }}
//                       >
//                         {(shipmentDisparityData &&
//                           `$${parseFloat(
//                             shipmentDisparityData[0]?.overbillIdentified || 0
//                           )
//                             .toFixed(2)
//                             .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`) ||
//                           "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             )}
//           </TabPanel>

//           <TabPanel value={value} index={1}>
//             {duplicateFreightLoading && <Typography>Loading...</Typography>}
//             {duplicateFreightError && (
//               <Typography>{duplicateFreightError}</Typography>
//             )}
//             {duplicateFreightData && (
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <Typography
//                     variant="body2"
//                     style={{ color: theme.palette.text.dark, fontSize: "12px" }}
//                     fontWeight={600}
//                   >
//                     {duplicateFreightData[0]?.periodCoveredFrom &&
//                       moment(duplicateFreightData[0].periodCoveredFrom).format(
//                         "D-MMM-YYYY"
//                       )}{" "}
//                     to{" "}
//                     {duplicateFreightData[0]?.periodCoveredTo &&
//                       moment(duplicateFreightData[0].periodCoveredTo).format(
//                         "D-MMM-YYYY"
//                       )}
//                   </Typography>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container spacing={3}>
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.success.extraDark }}
//                         fontWeight={600}
//                       >
//                         Agreements Scanned
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{ textAlign: "right", fontWeight: "600" }}
//                       >
//                         {duplicateFreightData[0]?.agreementScanned || "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container justifyContent={"space-between"} spacing="3">
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.accent.main }}
//                         fontWeight={600}
//                       >
//                         CoOp Invoices Scanned
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{ textAlign: "right", fontWeight: "600" }}
//                       >
//                         {duplicateFreightData[0]?.invoiceScanned || "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>

//                   <Grid container justifyContent={"space-between"} spacing={3}>
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.primary.main }}
//                         fontWeight={600}
//                       >
//                         PO's Scanned
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{ textAlign: "right", fontWeight: "600" }}
//                       >
//                         {duplicateFreightData[0]?.poScanned
//                           ? Number(
//                               duplicateFreightData[0].poScanned
//                             ).toLocaleString(undefined, {})
//                           : "N/A"}
//                       </Typography>
//                     </Grid>
//                   </Grid>

//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container justifyContent={"space-between"} spacing={1}>
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.secondary.main }}
//                         fontWeight={600}
//                       >
//                         Sum Identified
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{
//                           textAlign: "right",
//                           fontWeight: "600",
//                           marginLeft: "-200px",
//                         }}
//                       >
//                         {`$${parseFloat(
//                           duplicateFreightData[0]?.overbillIdentified || 0
//                         )
//                           .toFixed(2)
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             )}
//           </TabPanel>

//           <TabPanel value={value} index={2}>
//             {dropshipLoading && <Typography>Loading...</Typography>}
//             {dropshipError && <Typography>{dropshipError}</Typography>}
//             {dropshipData && (
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <Typography
//                     variant="body2"
//                     style={{ color: theme.palette.text.dark, fontSize: "12px" }}
//                     fontWeight={600}
//                   >
//                     {dropshipData[0]?.periodCoveredFrom &&
//                       moment(dropshipData[0].periodCoveredFrom).format(
//                         "D-MMM-YYYY"
//                       )}{" "}
//                     to{" "}
//                     {dropshipData[0]?.periodCoveredTo &&
//                       moment(dropshipData[0].periodCoveredTo).format(
//                         "D-MMM-YYYY"
//                       )}
//                   </Typography>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container spacing={3}>
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.success.extraDark }}
//                         fontWeight={600}
//                       >
//                         Agreements Scanned
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{ textAlign: "right", fontWeight: "600" }}
//                       >
//                         {dropshipData[0]?.agreementScanned || "0"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container justifyContent={"space-between"} spacing="3">
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.accent.main }}
//                         fontWeight={600}
//                       >
//                         CoOp Invoices Scanned
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{ textAlign: "right", fontWeight: "600" }}
//                       >
//                         {dropshipData[0]?.invoiceScanned || "0"}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>

//                   <Grid container justifyContent={"space-between"} spacing={3}>
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.primary.main }}
//                         fontWeight={600}
//                       >
//                         PO's Scanned
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{ textAlign: "right", fontWeight: "600" }}
//                       >
//                         {dropshipData[0]?.poScanned
//                           ? Number(dropshipData[0].poScanned).toLocaleString(
//                               undefined,
//                               {}
//                             )
//                           : "0"}
//                       </Typography>
//                     </Grid>
//                   </Grid>

//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container justifyContent={"space-between"} spacing={1}>
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.secondary.main }}
//                         fontWeight={600}
//                       >
//                         Sum Identified
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{
//                           textAlign: "right",
//                           fontWeight: "600",
//                           marginLeft: "-200px",
//                         }}
//                       >
//                         {`$${parseFloat(
//                           dropshipData[0]?.overbillIdentified || 0
//                         )
//                           .toFixed(2)
//                           .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             )}
//           </TabPanel>

//           <TabPanel value={value} index={3}>
//             {vendorIdFromStorage === "5" ? (
//               <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                   <Typography
//                     variant="body2"
//                     style={{ color: theme.palette.text.dark, fontSize: "12px" }}
//                     fontWeight={600}
//                   >
//                     {" "}
//                     1-Jan-2021 to 30-Sept-2023
//                   </Typography>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container spacing={3}>
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.success.extraDark }}
//                         fontWeight={600}
//                       >
//                         Duplicate/Overlapping Product Group
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{ textAlign: "right", fontWeight: "600" }}
//                       >
//                         Multiple
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container justifyContent={"space-between"} spacing="3">
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.accent.main }}
//                         fontWeight={600}
//                       >
//                         Duplicate/Overlapping Vendor Code
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{ textAlign: "right", fontWeight: "600" }}
//                       >
//                         Multiple
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid item xs={12} my={2}>
//                     <Divider />
//                   </Grid>
//                   <Grid container justifyContent={"space-between"} spacing={1}>
//                     <Grid item xs={8}>
//                       <Typography
//                         variant="body2"
//                         sx={{ color: theme.palette.secondary.main }}
//                         fontWeight={600}
//                       >
//                         Sum Identified
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={4}>
//                       <Typography
//                         variant="body2"
//                         style={{
//                           textAlign: "right",
//                           fontWeight: "590",
//                           marginLeft: "-200px",
//                         }}
//                       >
//                         {" "}
//                         $1,122,407.02
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             ) : (
//               <Typography>No data available</Typography>
//             )}

//             {value === 5 && (
//               <Button
//                 variant="contained"
//                 color="primary"
//                 style={{ marginTop: 20 }}
//               >
//                 New Request
//               </Button>
//             )}
//           </TabPanel>
//         </Grid>
//       </Grid>
//     </DashboardCard>
//   );
// };

// export default EfficencyAssesment;





/*------------------------------------------------------------ Trial Code ---------------------------------------------------------------*/




import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Tabs,
  Tab,
  styled,
  Grid,
  Divider,
  Button,
  Modal,
  Backdrop,
  Fade,
  TextField,
  MenuItem,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
  Select,
} from "@mui/material";
import PropTypes from "prop-types";
import DashboardCard from "../../../components/shared/DashboardCard";
import { useTheme } from "@emotion/react";
import CloseIcon from "@mui/icons-material/Close";
import moment from "moment";
import axios from "axios";
import config from "../../../../config";
import eventEmitter from "../../../eventEmitter";
import ExcelJS from "exceljs";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ px: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const TabStyled = styled(Tab)(({ theme }) => ({
  color: theme.palette.text.main,
  fontSize: "14px",
  alignItems: "start",
  padding: "5px 8px",
  fontWeight: "600",
  minHeight: "inherit",
  marginBottom: "5px",
  marginTop: "18px",
  textAlign: "left",
  transition: "all 0.3s ease",
  "&.Mui-selected, &:hover": {
    color: theme.palette.accent.main,
  },
}));

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};

const EfficencyAssesment = () => {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = config.UniUrl;
  const [file, setFile] = useState(null);
  const [sampleFileLink, setSampleFileLink] = useState("");
  const [requestType, setRequestType] = useState("");

// Generate sample file link with dropdown list for vendors

const generateSampleFileLink = async () => {
  const fetchVendors = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return [];
    }

    try {
      const response = await axios.get(
        "http://16.170.22.123:8082/overbilling/getAllOverBillingVendors?userId=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data.map((vendor) => vendor.companyName);
      } else {
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch vendors:", error);
    }
    return [];
  };

  const fetchTypes = async () => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      return [];
    }

    try {
      const response = await axios.get(
        "http://16.170.22.123:8082/overbilling/getSummaryByVendorId/5",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data
          .map((item) => item.TYPE)
          .filter((type, index, self) => self.indexOf(type) === index); // Remove duplicates
      } else {
        console.error("Invalid response data:", response.data);
      }
    } catch (error) {
      console.error("Failed to fetch types:", error);
    }
    return [];
  };

  const vendors = await fetchVendors();
  const types = await fetchTypes();

  // Mapping from API type to display name
  const typeMapping = {
    "QTY_MISMATCH": "Shipment Disparity",
    "FRIEGHT_CHECK": "Duplicate Freight",
    "DROPSHIP": "Non-compliant Freight",
    "DUPLICATE_BILLING": "Duplicate Billing",
  };

  // Filter and map types to their display names
  const mappedTypes = types
    .filter(type => typeMapping[type]) // Filter out types not in the mapping
    .map(type => typeMapping[type]); // Map types to display names

  // Determine the default values
  const defaultVendor = vendors.length > 0 ? vendors[0] : "Sample Vendor";
  const defaultJobType = mappedTypes.length > 0 ? mappedTypes[0] : "Type A";

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sample");

  worksheet.columns = [
    { header: "Vendor Name (Identical to VC Name)", key: "vendor", width: 30 },
    { header: "Agreement id", key: "agreementId", width: 15 },
    { header: "Percentage", key: "percentage", width: 15 },
    { header: "Job Type", key: "jobType", width: 15 },
    { header: "Job Priority", key: "jobPriority", width: 15 },
  ];

  worksheet.addRow({
    vendor: defaultVendor,
    agreementId: "123456",
    percentage: "10%",
    jobType: defaultJobType, // Set default value dynamically
    jobPriority: "High",
  });

  // Create hidden sheets for dropdown lists
  const hiddenVendorSheet = workbook.addWorksheet("Vendors");
  hiddenVendorSheet.state = 'hidden';
  hiddenVendorSheet.getCell('A1').value = 'VendorList';
  vendors.forEach((vendor, index) => {
    hiddenVendorSheet.getCell(`A${index + 2}`).value = vendor;
  });

  const hiddenTypeSheet = workbook.addWorksheet("Types");
  hiddenTypeSheet.state = 'hidden';
  hiddenTypeSheet.getCell('A1').value = 'TypeList';
  mappedTypes.forEach((type, index) => {
    hiddenTypeSheet.getCell(`A${index + 2}`).value = type;
  });

  // Define ranges for dropdown lists
  const vendorListRange = `Vendors!$A$2:$A$${vendors.length + 1}`;
  const typeListRange = `Types!$A$2:$A$${mappedTypes.length + 1}`;

  // Apply data validation for Vendor Name
  for (let i = 2; i <= 10; i++) {
    const vendorCell = worksheet.getCell(`A${i}`);
    vendorCell.dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: [`=${vendorListRange}`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a vendor from the list.",
    };
  }

  // Apply data validation for Job Type
  for (let i = 2; i <= 10; i++) {
    const typeCell = worksheet.getCell(`D${i}`);
    typeCell.dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: [`=${typeListRange}`],
      showErrorMessage: true,
      errorTitle: "Invalid input",
      error: "Please select a valid job type from the list.",
    };
  }

  try {
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const url = URL.createObjectURL(blob);

    // Update state with the URL
    setSampleFileLink(url);
  } catch (error) {
    console.error("Failed to generate sample file:", error);
  }
};

useEffect(() => {
  if (requestType === "bulkUpload") {
    generateSampleFileLink();
  }
}, [requestType]);

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setStartDate("");
    setEndDate("");
    setShowOverlappingBilling(false);
    setOpen(false);
  };

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [overlappingYears, setOverlappingYears] = useState([]);
  const [showOverlappingBilling, setShowOverlappingBilling] = useState(false);

  const currencies = ["USD", "EUR", "GBP"];

  // Define states for Duplicate Freight data, loading, and error
  const [duplicateFreightData, setDuplicateFreightData] = useState(null);
  const [duplicateFreightLoading, setDuplicateFreightLoading] = useState(true);
  const [duplicateFreightError, setDuplicateFreightError] = useState(null);

  // Define states for Dropship data, loading, and error
  const [dropshipData, setDropshipData] = useState(null);
  const [dropshipLoading, setDropshipLoading] = useState(true);
  const [dropshipError, setDropshipError] = useState(null);

  // Define states for Dropship data, loading, and error
  const [duplicateData, setDuplicateData] = useState(null);
  const [duplicateLoading, setDuplicateLoading] = useState(true);
  const [duplicateError, setDuplicateError] = useState(null);

  // Define states for  ShipmentDisparitydata, loading, and error
  const [shipmentDisparityData, setShipmentDisparityData] = useState(null);
  const [shipmentDisparityLoading, setShipmentDisparityLoading] =
    useState(true);
  const [shipmentDisparityError, setShipmentDisparityError] = useState(null);
  let vendorIdFromStorage = sessionStorage.getItem("selectedVendorId");

  useEffect(() => {
    const tokenFromStorage = sessionStorage.getItem("token");

    if (!tokenFromStorage) {
      console.log("Token not found");
      return;
    }

    const fetchData = async (url, setData, setLoading, setError) => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${tokenFromStorage}`,
          },
        };

        const response = await axios.get(url, config);

        if (!response.data || !response.data.data) {
          throw new Error("Failed to fetch data");
        }

        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const handleVendorSelected = (vendorId) => {
      vendorIdFromStorage = vendorId;

      fetchData(
        `${BASE_URL}/overbilling/getSummaryByType?type=FRIEGHT_CHECK&vendorId=${vendorId}`,
        setDuplicateFreightData,
        setDuplicateFreightLoading,
        setDuplicateFreightError
      );

      fetchData(
        `${BASE_URL}/overbilling/getSummaryByType?type=DROPSHIP&vendorId=${vendorId}`,
        setDropshipData,
        setDropshipLoading,
        setDropshipError
      );

      fetchData(
        `${BASE_URL}/overbilling/getSummaryByType?type=QTY_MISMATCH&vendorId=${vendorId}`,
        setShipmentDisparityData,
        setShipmentDisparityLoading,
        setShipmentDisparityError
      );

      fetchData(
        `${BASE_URL}/overbilling/getSummaryByType?type=DUPLICATE_BILLING&vendorId=${vendorId}`,
        setData,
        setLoading,
        setError
      );
    };

    // Subscribe to the "vendorSelected" event
    eventEmitter.on("vendorSelected", handleVendorSelected);

    // Fetch initial data
    fetchData(
      `${BASE_URL}/overbilling/getSummaryByType?type=FRIEGHT_CHECK&vendorId=${vendorIdFromStorage}`,

      setDuplicateFreightData,
      setDuplicateFreightLoading,
      setDuplicateFreightError
    );

    fetchData(
      `${BASE_URL}/overbilling/getSummaryByType?type=DROPSHIP&vendorId=${vendorIdFromStorage}`,

      setDropshipData,
      setDropshipLoading,
      setDropshipError
    );

    fetchData(
      `${BASE_URL}/overbilling/getSummaryByType?type=QTY_MISMATCH&vendorId=${vendorIdFromStorage}`,

      setShipmentDisparityData,
      setShipmentDisparityLoading,
      setShipmentDisparityError
    );

    fetchData(
      `${BASE_URL}/overbilling/getSummaryByType?type=DUPLICATE_BILLING&vendorId=${vendorIdFromStorage}`,

      setData,
      setLoading,
      setError
    );

    return () => {
      // Unsubscribe from the event when the component unmounts
      eventEmitter.events = {};
    };
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateChange = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const years = [];

    for (let year = start.getFullYear(); year <= end.getFullYear(); year++) {
      years.push(year);
    }

    setOverlappingYears(years);
    setShowOverlappingBilling(startDate !== "" && endDate !== "");
  };

  useEffect(() => {
    if (startDate && endDate) {
      handleDateChange();
    } else {
      setShowOverlappingBilling(false);
    }
  }, [startDate, endDate]);

  const handleSave = () => {
    // Handle save logic
    console.log("Save button clicked");
  };

  const handleRequestTypeChange = (event) => {
    console.log("Request Type Changed:", event.target.value); // Log the selected value
    setRequestType(event.target.value);
    setOpen(true);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <DashboardCard
      title={
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" sx={{ color: theme.palette.text.dark }}>
            Efficiency Assessment
          </Typography>
          <Select
            value={requestType}
            onChange={handleRequestTypeChange}
            displayEmpty
            sx={{ ml: 19, width: "160px", height: "35px" }}
          >
            <MenuItem value="" disabled>
              New Request
            </MenuItem>
            <MenuItem value="duplicateBilling">Duplicate Billing</MenuItem>
            <MenuItem value="bulkUpload">Bulk Upload</MenuItem>
          </Select>
        </Box>
      }
    >
      <Modal
        open={open && requestType === "duplicateBilling"}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <Fade in={open && requestType === "duplicateBilling"}>
          <Box sx={style}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Potential CoOp Duplicate
            </Typography>
            <Divider sx={{ mt: 2, mb: 2, width: "100%" }} />
            <TextField
              label="Start Date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="End Date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              fullWidth
              sx={{ mt: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Vendor Code"
              value="Vendor Code"
              fullWidth
              sx={{ mt: 2 }}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              label="Product Group"
              value="Product Group"
              fullWidth
              sx={{ mt: 2 }}
              InputProps={{
                readOnly: true,
              }}
            />
            {showOverlappingBilling && (
              <>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Overlapping Billing
                </Typography>
                <Box
                  sx={{
                    maxHeight: "200px", 
                    overflowY: "auto",
                    width: "100%",
                  }}
                >
                  {overlappingYears.map((year, index) => (
                    <Box
                      key={index}
                      sx={{ display: "flex", alignItems: "center", mt: 2 }}
                    >
                      <TextField
                        label={year.toString()}
                        value={year}
                        fullWidth
                        sx={{ mr: 1 }}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                      <TextField
                        label="Amount"
                        value={0}
                        fullWidth
                        sx={{ mr: 1 }}
                      />
                      <TextField
                        select
                        label="Currency"
                        value={currencies[0]}
                        fullWidth
                      >
                        {currencies.map((option) => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>
                  ))}
                </Box>
              </>
            )}
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button
                onClick={handleSave}
                sx={{
                  backgroundColor: "#285a9e",
                  color: "white",
                  "&:hover": { backgroundColor: "#285a9e" },
                  mr: 1,
                }}
              >
                Save
              </Button>
              <Button
                onClick={handleClose}
                sx={{
                  backgroundColor: "#285a9e",
                  color: "white",
                  "&:hover": { backgroundColor: "#285a9e" },
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Modal
        open={open && requestType === "bulkUpload"}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          sx: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
        }}
      >
        <Fade in={open && requestType === "bulkUpload"}>
          <Box sx={style}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: "black",
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h5" component="h2">
              Upload File
            </Typography>
            <Divider sx={{ mt: 2, mb: 2, width: "100%" }} />
            <Typography
              variant="body1"
              component="p"
              sx={{ mb: 1 }}
              color="primary"
            >
              <a href={sampleFileLink} download="SampleFile.xlsx">
                Download Sample File
              </a>
            </Typography>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: "25px",
                width: "100%",
                height: "50px",
                mb: 2,
                cursor: "pointer",
              }}
              onClick={() => document.getElementById("fileInput").click()}
            >
              {file ? (
                <Typography variant="body2" color="textSecondary">
                  {file.name}
                </Typography>
              ) : (
                <Typography variant="body2" color="textSecondary">
                  Choose an excel file to upload
                </Typography>
              )}
              <input
                id="fileInput"
                type="file"
                hidden
                onChange={handleFileChange}
                accept=".xls,.xlsx"
              />
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              mt={2}
              width="100%"
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ width: "15%", ml: 16 }}
                onClick={handleSave}
              >
                Upload
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ width: "15%" , backgroundColor: "#285a9e" , mr: 15 }}
                onClick={handleClose}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      <Grid container spacing={1}>
        <Grid item md={6}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            className="assesment-tab"
            sx={{
              borderColor: "#eee",
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.accent.main,
                borderWidth: 3,
                left: 0,
              },
            }}
          >
            <TabStyled label="Shipment Disparity" {...a11yProps(0)} />
            <TabStyled label="Duplicate Freight" {...a11yProps(1)} />
            <TabStyled label="Non-Compliment Freight" {...a11yProps(2)} />
            <TabStyled label="Duplicate Billing" {...a11yProps(3)} />
          </Tabs>
        </Grid>
        <Grid item md={6} mt={3}>
          <TabPanel value={value} index={0}>
            {loading && <Typography>Loading...</Typography>}
            {error && <Typography>{error}</Typography>}
            {data && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    style={{ color: theme.palette.text.dark, fontSize: "12px" }}
                    fontWeight={600}
                  >
                    {shipmentDisparityData &&
                      shipmentDisparityData[0]?.periodCoveredFrom &&
                      moment(shipmentDisparityData[0].periodCoveredFrom).format(
                        "D-MMM-YYYY"
                      )}{" "}
                    to{" "}
                    {shipmentDisparityData &&
                      shipmentDisparityData[0]?.periodCoveredTo &&
                      moment(shipmentDisparityData[0].periodCoveredTo).format(
                        "D-MMM-YYYY"
                      )}
                  </Typography>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.success.extraDark }}
                        fontWeight={600}
                      >
                        Agreements Scanned
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right", fontWeight: "600" }}
                      >
                        {(shipmentDisparityData &&
                          shipmentDisparityData[0]?.agreementScanned) ||
                          "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container justifyContent={"space-between"} spacing="3">
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.accent.main }}
                        fontWeight={600}
                      >
                        CoOp Invoices Scanned
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right", fontWeight: "600" }}
                      >
                        {(shipmentDisparityData &&
                          shipmentDisparityData[0]?.invoiceScanned) ||
                          "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container justifyContent={"space-between"} spacing={3}>
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.primary.main }}
                        fontWeight={600}
                      >
                        PO's Scanned
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right", fontWeight: "600" }}
                      >
                        {shipmentDisparityData &&
                        shipmentDisparityData[0]?.poScanned
                          ? Number(
                              shipmentDisparityData[0].poScanned
                            ).toLocaleString(undefined, {})
                          : "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container justifyContent={"space-between"} spacing={1}>
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.secondary.main }}
                        fontWeight={600}
                      >
                        Sum Identified
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{
                          textAlign: "right",
                          fontWeight: "600",
                          marginLeft: "-200px",
                        }}
                      >
                        {(shipmentDisparityData &&
                          `$${parseFloat(
                            shipmentDisparityData[0]?.overbillIdentified || 0
                          )
                            .toFixed(2)
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`) ||
                          "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={value} index={1}>
            {duplicateFreightLoading && <Typography>Loading...</Typography>}
            {duplicateFreightError && (
              <Typography>{duplicateFreightError}</Typography>
            )}
            {duplicateFreightData && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    style={{ color: theme.palette.text.dark, fontSize: "12px" }}
                    fontWeight={600}
                  >
                    {duplicateFreightData[0]?.periodCoveredFrom &&
                      moment(duplicateFreightData[0].periodCoveredFrom).format(
                        "D-MMM-YYYY"
                      )}{" "}
                    to{" "}
                    {duplicateFreightData[0]?.periodCoveredTo &&
                      moment(duplicateFreightData[0].periodCoveredTo).format(
                        "D-MMM-YYYY"
                      )}
                  </Typography>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.success.extraDark }}
                        fontWeight={600}
                      >
                        Agreements Scanned
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right", fontWeight: "600" }}
                      >
                        {duplicateFreightData[0]?.agreementScanned || "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container justifyContent={"space-between"} spacing="3">
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.accent.main }}
                        fontWeight={600}
                      >
                        CoOp Invoices Scanned
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right", fontWeight: "600" }}
                      >
                        {duplicateFreightData[0]?.invoiceScanned || "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>

                  <Grid container justifyContent={"space-between"} spacing={3}>
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.primary.main }}
                        fontWeight={600}
                      >
                        PO's Scanned
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right", fontWeight: "600" }}
                      >
                        {duplicateFreightData[0]?.poScanned
                          ? Number(
                              duplicateFreightData[0].poScanned
                            ).toLocaleString(undefined, {})
                          : "N/A"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container justifyContent={"space-between"} spacing={1}>
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.secondary.main }}
                        fontWeight={600}
                      >
                        Sum Identified
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{
                          textAlign: "right",
                          fontWeight: "600",
                          marginLeft: "-200px",
                        }}
                      >
                        {`$${parseFloat(
                          duplicateFreightData[0]?.overbillIdentified || 0
                        )
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={value} index={2}>
            {dropshipLoading && <Typography>Loading...</Typography>}
            {dropshipError && <Typography>{dropshipError}</Typography>}
            {dropshipData && (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    style={{ color: theme.palette.text.dark, fontSize: "12px" }}
                    fontWeight={600}
                  >
                    {dropshipData[0]?.periodCoveredFrom &&
                      moment(dropshipData[0].periodCoveredFrom).format(
                        "D-MMM-YYYY"
                      )}{" "}
                    to{" "}
                    {dropshipData[0]?.periodCoveredTo &&
                      moment(dropshipData[0].periodCoveredTo).format(
                        "D-MMM-YYYY"
                      )}
                  </Typography>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.success.extraDark }}
                        fontWeight={600}
                      >
                        Agreements Scanned
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right", fontWeight: "600" }}
                      >
                        {dropshipData[0]?.agreementScanned || "0"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container justifyContent={"space-between"} spacing="3">
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.accent.main }}
                        fontWeight={600}
                      >
                        CoOp Invoices Scanned
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right", fontWeight: "600" }}
                      >
                        {dropshipData[0]?.invoiceScanned || "0"}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>

                  <Grid container justifyContent={"space-between"} spacing={3}>
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.primary.main }}
                        fontWeight={600}
                      >
                        PO's Scanned
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right", fontWeight: "600" }}
                      >
                        {dropshipData[0]?.poScanned
                          ? Number(dropshipData[0].poScanned).toLocaleString(
                              undefined,
                              {}
                            )
                          : "0"}
                      </Typography>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container justifyContent={"space-between"} spacing={1}>
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.secondary.main }}
                        fontWeight={600}
                      >
                        Sum Identified
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{
                          textAlign: "right",
                          fontWeight: "600",
                          marginLeft: "-200px",
                        }}
                      >
                        {`$${parseFloat(
                          dropshipData[0]?.overbillIdentified || 0
                        )
                          .toFixed(2)
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </TabPanel>

          <TabPanel value={value} index={3}>
            {vendorIdFromStorage === "5" ? (
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant="body2"
                    style={{ color: theme.palette.text.dark, fontSize: "12px" }}
                    fontWeight={600}
                  >
                    {" "}
                    1-Jan-2021 to 30-Sept-2023
                  </Typography>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container spacing={3}>
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.success.extraDark }}
                        fontWeight={600}
                      >
                        Duplicate/Overlapping Product Group
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right", fontWeight: "600" }}
                      >
                        Multiple
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container justifyContent={"space-between"} spacing="3">
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.accent.main }}
                        fontWeight={600}
                      >
                        Duplicate/Overlapping Vendor Code
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{ textAlign: "right", fontWeight: "600" }}
                      >
                        Multiple
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item xs={12} my={2}>
                    <Divider />
                  </Grid>
                  <Grid container justifyContent={"space-between"} spacing={1}>
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        sx={{ color: theme.palette.secondary.main }}
                        fontWeight={600}
                      >
                        Sum Identified
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="body2"
                        style={{
                          textAlign: "right",
                          fontWeight: "590",
                          marginLeft: "-200px",
                        }}
                      >
                        {" "}
                        $1,122,407.02
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <Typography>No data available</Typography>
            )}

            {value === 5 && (
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: 20 }}
              >
                New Request
              </Button>
            )}
          </TabPanel>
        </Grid>
      </Grid>
    </DashboardCard>
  );
};

export default EfficencyAssesment;
