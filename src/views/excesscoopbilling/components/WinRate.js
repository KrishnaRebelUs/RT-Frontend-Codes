/*---------------------------------------------------------------  My code 1 --------------------------------------------------------------------*/

// import React, { useState, useEffect } from "react";
// import { useTheme } from "@mui/material/styles";
// import {
//   Box,
//   Typography,
//   Grid,
//   Stack,
//   styled,
//   LinearProgress,
// } from "@mui/material";
// import DashboardCard from "../../../components/shared/DashboardCard";
// import astraunaut from "../../../assets/images/profile/astronaut.png";
// import track from "../../../assets/images/profile/track.jpeg";
// import running from "../../../assets/images/profile/running.gif";
// import { IconFlag3 } from "@tabler/icons-react";
// import axios from "axios";
// import config from "../../../../config";
// import eventEmitter from "../../../eventEmitter";

// const WinRate = () => {
//   const theme = useTheme();
//   const [progress, setProgress] = React.useState(0);
//   const [shipmentDisparityProgress, setShipmentDisparityProgress] = useState(0);
//   const [duplicateFreightProgress, setDuplicateFreightProgress] = useState(0);
//   const [nonCompliantFreightProgress, setNonCompliantFreightProgress] = useState(0);
//   const [duplicateBillingProgress, setDuplicateBillingProgress] = useState(0);
//   const vendorId = sessionStorage.getItem("selectedVendorId");
//   const token = sessionStorage.getItem("token");
//   const BASE_URL = config.UniUrl;

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((oldProgress) => {
//         if (oldProgress === 100) {
//           return 0;
//         }
//         const diff = Math.random() * 10;
//         return Math.min(oldProgress + diff, 100);
//       });
//     }, 500);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   const CustomProgressBar = styled(Box)(({ theme }) => ({
//     height: "5px",
//     display: "flex",
//     alignItems: "center",
//     gap: "5px",
//     position: "relative",
//   }));

//   const ProgressLight = styled(Box)(({ theme }) => ({
//     width: "65%",
//     height: "100%",
//     borderRadius: "7px",
//   }));

//   const ProgressDark = styled(Box)(({ theme }) => ({
//     width: "35%",
//     height: "100%",
//     borderRadius: "7px",
//   }));

//   const ProgressLabel = styled(Box)(({ theme }) => ({
//     width: "60px",
//     height: "22px",
//     textAlign: "center",
//     borderRadius: "7px",
//     position: "absolute",
//     right: "-20px",
//     bottom: "15px",
//     color: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "12px",
//     span: {
//       content: '""',
//       position: "absolute",
//       bottom: "-3px",
//       border: "3px solid",
//       transform: "rotate(45deg)",
//       right: "calc(50% - 3px)",
//     },
//   }));

  

//   useEffect(() => {
//     const vendorId = sessionStorage.getItem("selectedVendorId");
//     const fetchDisputeCount = async (disputeReason, setProgress, vendorId) => {
//       try {

//  /*-------------------------------------------------------------API for Count ------------------------------------------------------------------*/

//         const response = await fetch(
//           `${BASE_URL}/shortage/getApprovedDisputeCount?disputeType=coop&disputeReason=${encodeURIComponent(
//             disputeReason
//           )}&vendorIds=${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const jsonData = await response.json();
//         const count = jsonData.data.count;

//         if (count !== 0) {
//           await fetchAndCalculateProgress(disputeReason, setProgress, vendorId);
//         } else {
//           setProgress(0);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//   /*---------------------------------------------------------- API for Approved Amount --------------------------------------------------------*/  

//     const fetchAndCalculateProgress = async (disputeReason, setProgress, vendorId) => {
//       try {
//         const responseApprovedAmt = await fetch(
//           `${BASE_URL}/shortage/getSumApprovedAmt?disputeType=coop&disputeReason=${encodeURIComponent(
//             disputeReason
//           )}&vendorIds=${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             },
//           }
//         );


//   /*-----------------------------------------------------------API for Disputed Amount --------------------------------------------------------*/
//         const responseTotalDisputedAmt = await fetch(
//           `${BASE_URL}/shortage/getTotalDisputedAmt?disputeType=coop&disputeReason=${encodeURIComponent(
//             disputeReason
//           )}&vendorIds=${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (!responseApprovedAmt.ok || !responseTotalDisputedAmt.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const dataApprovedAmt = await responseApprovedAmt.json();
//         const totalApproved = dataApprovedAmt.data.value;

//         const dataTotalDisputedAmt = await responseTotalDisputedAmt.json();
//         const totalDisputed = dataTotalDisputedAmt.data.value;

//         if (
//           totalDisputed !== 0 &&
//           totalApproved !== undefined &&
//           totalDisputed !== undefined
//         ) {
//           const progress =
//             (parseFloat(totalApproved) / parseFloat(totalDisputed)) * 100;
//           setProgress(progress);
//         } else {
//           setProgress(0);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };


    
//     const handleVendorIdChange = (vendorId) => {
//       fetchDisputeCount("Shipment Disparity", setShipmentDisparityProgress, vendorId);
//       fetchDisputeCount("Duplicate Freight", setDuplicateFreightProgress, vendorId);
//       fetchDisputeCount("Non-compliant Freight", setNonCompliantFreightProgress, vendorId);
//       fetchDisputeCount("Duplicate Billing", setDuplicateBillingProgress, vendorId);
//     };

//     // Fetch initial data
//     if (vendorId) {
//       fetchDisputeCount("Shipment Disparity", setShipmentDisparityProgress, vendorId);
//       fetchDisputeCount("Duplicate Freight", setDuplicateFreightProgress, vendorId);
//       fetchDisputeCount("Non-compliant Freight", setNonCompliantFreightProgress, vendorId);
//       fetchDisputeCount("Duplicate Billing", setDuplicateBillingProgress, vendorId);
//     }

//     // Listen for vendorSelected event
//     eventEmitter.on("vendorSelected", handleVendorIdChange);

//     // Clean up event listener
//     return () => {
//       eventEmitter.off("vendorSelected", handleVendorIdChange);
//     };

//   }, []);


//   return (
//     <DashboardCard
//       title={
//         <Typography variant="h4" mb={2}>
//           Win Rate
//         </Typography>
//       }
//     >
//       <Box>
//         <Grid
//           container
//           style={{
//             borderBottom: "1px solid",
//             borderColor: theme.palette.divider,
//           }}
//           pb={3}
//         >
//           <Grid item xs={12} mb={3}>
//             <Grid container alignItems="center">
//               <Grid item sm={4}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 400,
//                     color: theme.palette.success.extraDark,
//                   }}
//                 >
//                   Duplicate Billing
//                 </Typography>
//               </Grid>
//               <Grid item sm={8} >
//                 {duplicateBillingProgress !== null &&
//                 duplicateBillingProgress !== 0 ? (
//                   <Box style={{ width: "calc(100% + 98px)" }} 
//                   mx={-20}
//                   // mx={"auto"}
//                   >
//                     <CustomProgressBar width={`${duplicateBillingProgress}%`}>
//                       <ProgressLight
//                         style={{ backgroundColor: theme.palette.success.light }}
//                       ></ProgressLight>
//                       <ProgressDark
//                         style={{ backgroundColor: theme.palette.success.main }}
//                       ></ProgressDark>
//                       <ProgressLabel
//                         style={{ backgroundColor: theme.palette.success.main }}
//                       >
//                         {duplicateBillingProgress.toFixed(2)}%{" "}
//                         <Box
//                           component="span"
//                           style={{ borderColor: theme.palette.success.main }}
//                         ></Box>
//                       </ProgressLabel>
//                     </CustomProgressBar>
//                   </Box>
//                 ) : (
//                   <Typography variant="body2">
//                     Dispute process is yet to begin for Duplicate Billing
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12} mb={3}>
//             <Grid container alignItems="center">
//               <Grid item sm={4}>
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: 400, color: theme.palette.accent.main }}
//                 >
//                   Shipment Disparity
//                 </Typography>
//               </Grid>
//               <Grid item sm={8}>
//                 {shipmentDisparityProgress !== null &&
//                 shipmentDisparityProgress !== 0 ? (
//                   <Box style={{ width: "calc(100% + 98px)" }} 
//                   mx={-20}
//                   // mx={"auto"}
//                   >
//                     <CustomProgressBar width={`${shipmentDisparityProgress}%`}>
//                       <ProgressLight
//                         style={{ backgroundColor: theme.palette.accent.light }}
//                       ></ProgressLight>
//                       <ProgressDark
//                         style={{ backgroundColor: theme.palette.accent.main }}
//                       ></ProgressDark>
//                       <ProgressLabel
//                         style={{ backgroundColor: theme.palette.accent.main }}
//                       >
//                         {shipmentDisparityProgress.toFixed(2)}%
//                         <Box
//                           component="span"
//                           style={{ borderColor: theme.palette.accent.main }}
//                         ></Box>
//                       </ProgressLabel>
//                     </CustomProgressBar>
//                   </Box>
//                 ) : (
//                   <Typography variant="body2">
//                     Dispute process is yet to begin for Shipment Disparity
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12} mb={3}>
//             <Grid container alignItems="center">
//               <Grid item sm={4}>
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: 400, color: theme.palette.primary.main }}
//                 >
//                   Duplicate Freight
//                 </Typography>
//               </Grid>
//               <Grid item sm={8}>
//                 {duplicateFreightProgress !== null &&
//                 duplicateFreightProgress !== 0 ? (
//                   <Box style={{ width: "calc(100% + 98px)" }} 
//                   mx={-20}
//                   // mx={"auto"}
//                   >
//                     <CustomProgressBar width={`${duplicateFreightProgress}%`}>
//                       <ProgressLight
//                         style={{
//                           backgroundColor: theme.palette.primary.extraLight,
//                         }}
//                       ></ProgressLight>
//                       <ProgressDark
//                         style={{ backgroundColor: theme.palette.primary.main }}
//                       ></ProgressDark>
//                       <ProgressLabel
//                         style={{ backgroundColor: theme.palette.primary.main }}
//                       >
//                         {duplicateFreightProgress.toFixed(2)}%{" "}
//                         <Box
//                           component="span"
//                           style={{ borderColor: theme.palette.primary.main }}
//                         ></Box>
//                       </ProgressLabel>
//                     </CustomProgressBar>
//                   </Box>
//                 ) : (
//                   <Typography variant="body2">
//                     Dispute process is yet to begin for Duplicate Freight
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12}>
//             <Grid container alignItems="center">
//               <Grid item sm={4}>
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: 400, color: "#f19c53" }}
//                 >
//                   Non-compliant Freight
//                 </Typography>
//               </Grid>
//               <Grid item sm={8}>
//                 {nonCompliantFreightProgress !== null &&
//                 nonCompliantFreightProgress !== 0 ? (
//                   <Box style={{ width: "calc(100% + 98px)" }} 
//                   mx={-20}
//                   // mx={"auto"}
//                   >
//                     <CustomProgressBar
//                       width={`${nonCompliantFreightProgress}%`}
//                     >
//                       <ProgressLight
//                         style={{ backgroundColor: theme.palette.warning.light }}
//                       ></ProgressLight>
//                       <ProgressDark
//                         style={{ backgroundColor: "#f19c53" }}
//                       ></ProgressDark>
//                       <ProgressLabel
//                         style={{ backgroundColor: "#f19c53" }}
//                       >
//                         {nonCompliantFreightProgress.toFixed(2)}%{" "}
//                         <Box
//                           component="span"
//                           style={{ borderColor: "#f19c53" }}
//                         ></Box>
//                       </ProgressLabel>
//                     </CustomProgressBar>
//                   </Box>
//                 ) : (
//                   <Typography variant="body2">
//                     Dispute process is yet to begin for Non-compliant Freight
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid container pt={2}>
//           <Grid item xs={4}></Grid>
//           <Grid item xs={8}>
//             <Grid container textAlign="center">
//               <Grid item xs={1.3} ml={-24}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   0%
//                 </Typography>
//               </Grid>
//               <Grid item xs={1.3}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   10%
//                 </Typography>
//               </Grid>
//               <Grid item xs={1.3}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   20%
//                 </Typography>
//               </Grid>
//               <Grid item xs={1.3}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   30%
//                 </Typography>
//               </Grid>
//               <Grid item xs={1.3}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   40%
//                 </Typography>
//               </Grid>
//               <Grid item xs={1.3}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   50%
//                 </Typography>
//               </Grid>
//               <Grid item xs={1.3}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   60%
//                 </Typography>
//               </Grid>
//               <Grid item xs={1.5}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   70%
//                 </Typography>
//               </Grid>
//               <Grid item xs={1.5}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   80%
//                 </Typography>
//               </Grid>
//               <Grid item xs={1.5}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   90%
//                 </Typography>
//               </Grid>
//               <Grid item xs={1.0}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   100%
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>
//     </DashboardCard>
//   );
// };

// export default WinRate;


/*---------------------------------------------------------------- Try 1 ---------------------------------------------------------------------*/


import React, { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, Typography, Grid, Stack, styled } from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";
import axios from "axios";
import config from "../../../../config";
import eventEmitter from "../../../eventEmitter";

const WinRate = () => {
  const theme = useTheme();
  const [shipmentDisparityProgress, setShipmentDisparityProgress] = useState(0);
  const [duplicateFreightProgress, setDuplicateFreightProgress] = useState(0);
  const [nonCompliantFreightProgress, setNonCompliantFreightProgress] = useState(0);
  const [duplicateBillingProgress, setDuplicateBillingProgress] = useState(0);
  const vendorId = sessionStorage.getItem("selectedVendorId");
  const token = sessionStorage.getItem("token");
  const BASE_URL = config.UniUrl;

  useEffect(() => {
    const fetchDisputeCount = async (disputeReason, setProgress, vendorId) => {
      try {
        const response = await fetch(
          `${BASE_URL}/shortage/getApprovedDisputeCount?disputeType=coop&disputeReason=${encodeURIComponent(disputeReason)}&vendorIds=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const jsonData = await response.json();
        const count = jsonData.data.count;

        if (count !== 0) {
          await fetchAndCalculateProgress(disputeReason, setProgress, vendorId);
        } else {
          setProgress(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchAndCalculateProgress = async (disputeReason, setProgress, vendorId) => {
      try {
        const responseApprovedAmt = await fetch(
          `${BASE_URL}/shortage/getSumApprovedAmt?disputeType=coop&disputeReason=${encodeURIComponent(disputeReason)}&vendorIds=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        const responseTotalDisputedAmt = await fetch(
          `${BASE_URL}/shortage/getTotalDisputedAmt?disputeType=coop&disputeReason=${encodeURIComponent(disputeReason)}&vendorIds=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );

        if (!responseApprovedAmt.ok || !responseTotalDisputedAmt.ok) {
          throw new Error("Network response was not ok");
        }

        const dataApprovedAmt = await responseApprovedAmt.json();
        const totalApproved = dataApprovedAmt.data.value;

        const dataTotalDisputedAmt = await responseTotalDisputedAmt.json();
        const totalDisputed = dataTotalDisputedAmt.data.value;

        if (
          totalDisputed !== 0 &&
          totalApproved !== undefined &&
          totalDisputed !== undefined
        ) {
          const progress =
            (parseFloat(totalApproved) / parseFloat(totalDisputed)) * 100;
          setProgress(progress);
        } else {
          setProgress(0);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const handleVendorIdChange = (vendorId) => {
      fetchDisputeCount("Shipment Disparity", setShipmentDisparityProgress, vendorId);
      fetchDisputeCount("Duplicate Freight", setDuplicateFreightProgress, vendorId);
      fetchDisputeCount("Non-compliant Freight", setNonCompliantFreightProgress, vendorId);
      fetchDisputeCount("Duplicate Billing", setDuplicateBillingProgress, vendorId);
    };

    if (vendorId) {
      fetchDisputeCount("Shipment Disparity", setShipmentDisparityProgress, vendorId);
      fetchDisputeCount("Duplicate Freight", setDuplicateFreightProgress, vendorId);
      fetchDisputeCount("Non-compliant Freight", setNonCompliantFreightProgress, vendorId);
      fetchDisputeCount("Duplicate Billing", setDuplicateBillingProgress, vendorId);
    }

    eventEmitter.on("vendorSelected", handleVendorIdChange);

    return () => {
      eventEmitter.off("vendorSelected", handleVendorIdChange);
    };
  }, [BASE_URL, vendorId, token]);

  const CustomProgressBar = styled(Box)(({ theme }) => ({
    height: "5px",
    width: "106%",
    display: "flex",
    alignItems: "center",
    position: "relative",
    borderRadius: "7px",
    backgroundColor: theme.palette.grey[200],
  }));

  const ProgressFill = styled(Box)(({ theme, progressColor }) => ({
    height: "100%",
    borderRadius: "7px",
    backgroundColor: progressColor,
  }));

  const ProgressLabel = styled(Box)(({ theme, progress }) => ({
    width: "60px",
    height: "22px",
    textAlign: "center",
    borderRadius: "7px",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    position: "absolute",
    left: `calc(${progress}% - 30px)`,
    bottom: "15px",
    span: {
      content: '""',
      position: "absolute",
      bottom: "-3px",
      border: "3px solid",
      transform: "rotate(45deg)",
      right: "calc(50% - 3px)",
    },
  }));

  const ProgressLabelsContainer = styled(Box)(({ theme, gap }) => ({
    display: "flex",
    marginTop: theme.spacing(2),
    gap: gap || theme.spacing(1),
    position: "relative",
  }));

  const renderProgressBar = (progress, color) => (
    <CustomProgressBar>
      <ProgressFill style={{ width: `${progress}%` }} progressColor={color} />
      <ProgressLabel style={{ backgroundColor: color }} progress={progress}>
        {progress.toFixed(2)}%
        <Box component="span" style={{ borderColor: color }} />
      </ProgressLabel>
    </CustomProgressBar>
  );

  return (
    <DashboardCard
      title={
        <Typography variant="h4" mb={2}>
          Win Rate
        </Typography>
      }
    >
      <Box>
        <Grid
          container
          style={{
            borderBottom: "1px solid",
            borderColor: theme.palette.divider,
          }}
          pb={3}
        >
          <Grid item xs={12} mb={3}>
            <Grid container alignItems="center">
              <Grid item sm={4}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 400,
                    color: "#f19c53",
                  }}
                >
                  Duplicate Billing
                </Typography>
              </Grid>
              <Grid item sm={8} ml={-20}>
                {duplicateBillingProgress !== null &&
                duplicateBillingProgress !== 0 ? (
                  renderProgressBar(duplicateBillingProgress, "#f19c53")
                ) : (
                  <Typography variant="body2">
                    Dispute process is yet to begin for Duplicate Billing
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={3}>
            <Grid container alignItems="center">
              <Grid item sm={4}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 400, color: theme.palette.success.main }}
                >
                  Shipment Disparity
                </Typography>
              </Grid>
              <Grid item sm={8} ml={-20}>
                {shipmentDisparityProgress !== null &&
                shipmentDisparityProgress !== 0 ? (
                  renderProgressBar(shipmentDisparityProgress,  theme.palette.success.main)
                ) : (
                  <Typography variant="body2">
                    Dispute process is yet to begin for Shipment Disparity
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={3}>
            <Grid container alignItems="center">
              <Grid item sm={4}>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 400, color: theme.palette.accent.main }}
                  
                >
                  Duplicate Freight
                </Typography>
              </Grid>
              <Grid item sm={8} ml={-20}>
                {duplicateFreightProgress !== null &&
                duplicateFreightProgress !== 0 ? (
                  renderProgressBar(duplicateFreightProgress, theme.palette.accent.main)
                  
                ) : (
                  <Typography variant="body2">
                    Dispute process is yet to begin for Duplicate Freight
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} mb={3}>
            <Grid container alignItems="center">
              <Grid item sm={4}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 400,
                    color: theme.palette.primary.main
                  }}
                >
                  Non-Compliant Freight
                </Typography>
              </Grid>
              <Grid item sm={8} ml={-20}>
                {nonCompliantFreightProgress !== null &&
                nonCompliantFreightProgress !== 0 ? (
                  renderProgressBar(nonCompliantFreightProgress, theme.palette.primary.main)
                ) : (
                  <Typography variant="body2">
                    Dispute process is yet to begin for Non-Compliant Freight
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <ProgressLabelsContainer gap="50px" marginLeft={26}>
          <Typography variant="body2">0%</Typography>
          <Typography variant="body2">10%</Typography>
          <Typography variant="body2">20%</Typography>
          <Typography variant="body2">30%</Typography>
          <Typography variant="body2">40%</Typography>
          <Typography variant="body2">50%</Typography>
          <Typography variant="body2">60%</Typography>
          <Typography variant="body2">70%</Typography>
          <Typography variant="body2">80%</Typography>
          <Typography variant="body2">90%</Typography>
          <Typography variant="body2">100%</Typography>
        </ProgressLabelsContainer>
      </Box>
    </DashboardCard>
  );
};

export default WinRate;


/*---------------------------------------------------------------  My code 1 --------------------------------------------------------------------*/



// import React, { useState, useEffect } from "react";
// import { useTheme } from "@mui/material/styles";
// import {
//   Box,
//   Typography,
//   Grid,
//   Stack,
//   styled,
//   LinearProgress,
// } from "@mui/material";
// import DashboardCard from "../../../components/shared/DashboardCard";
// import astraunaut from "../../../assets/images/profile/astronaut.png";
// import track from "../../../assets/images/profile/track.jpeg";
// import running from "../../../assets/images/profile/running.gif";
// import { IconFlag3 } from "@tabler/icons-react";
// import axios from "axios";
// import config from "../../../../config";
// import eventEmitter from "../../../eventEmitter";

// const WinRate = () => {
//   const theme = useTheme();
//   const [progress, setProgress] = React.useState(0);
//   const [shipmentDisparityProgress, setShipmentDisparityProgress] = useState(0);
//   const [duplicateFreightProgress, setDuplicateFreightProgress] = useState(0);
//   const [nonCompliantFreightProgress, setNonCompliantFreightProgress] = useState(0);
//   const [duplicateBillingProgress, setDuplicateBillingProgress] = useState(0);
//   const vendorId = sessionStorage.getItem("selectedVendorId");
//   const token = sessionStorage.getItem("token");
//   const BASE_URL = config.UniUrl;

//   React.useEffect(() => {
//     const timer = setInterval(() => {
//       setProgress((oldProgress) => {
//         if (oldProgress === 100) {
//           return 0;
//         }
//         const diff = Math.random() * 10;
//         return Math.min(oldProgress + diff, 100);
//       });
//     }, 500);

//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   const CustomProgressBar = styled(Box)(({ theme }) => ({
//     height: "5px",
//     display: "flex",
//     alignItems: "center",
//     gap: "5px",
//     position: "relative",
//   }));

//   const ProgressLight = styled(Box)(({ theme }) => ({
//     width: "65%",
//     height: "100%",
//     borderRadius: "7px",
//   }));

//   const ProgressDark = styled(Box)(({ theme }) => ({
//     width: "35%",
//     height: "100%",
//     borderRadius: "7px",
//   }));

//   const ProgressLabel = styled(Box)(({ theme }) => ({
//     width: "60px",
//     height: "22px",
//     textAlign: "center",
//     borderRadius: "7px",
//     position: "absolute",
//     right: "-20px",
//     bottom: "15px",
//     color: "#fff",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "12px",
//     span: {
//       content: '""',
//       position: "absolute",
//       bottom: "-3px",
//       border: "3px solid",
//       transform: "rotate(45deg)",
//       right: "calc(50% - 3px)",
//     },
//   }));

  

//   useEffect(() => {
//     const vendorId = sessionStorage.getItem("selectedVendorId");
//     const fetchDisputeCount = async (disputeReason, setProgress, vendorId) => {
//       try {

//  /*-------------------------------------------------------------API for Count ------------------------------------------------------------------*/

//         const response = await fetch(
//           `${BASE_URL}/shortage/getApprovedDisputeCount?disputeType=coop&disputeReason=${encodeURIComponent(
//             disputeReason
//           )}&vendorIds=${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const jsonData = await response.json();
//         const count = jsonData.data.count;

//         if (count !== 0) {
//           await fetchAndCalculateProgress(disputeReason, setProgress, vendorId);
//         } else {
//           setProgress(0);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//   /*---------------------------------------------------------- API for Approved Amount --------------------------------------------------------*/  

//     const fetchAndCalculateProgress = async (disputeReason, setProgress, vendorId) => {
//       try {
//         const responseApprovedAmt = await fetch(
//           `${BASE_URL}/shortage/getSumApprovedAmt?disputeType=coop&disputeReason=${encodeURIComponent(
//             disputeReason
//           )}&vendorIds=${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             },
//           }
//         );


//   /*-----------------------------------------------------------API for Disputed Amount --------------------------------------------------------*/
//         const responseTotalDisputedAmt = await fetch(
//           `${BASE_URL}/shortage/getTotalDisputedAmt?disputeType=coop&disputeReason=${encodeURIComponent(
//             disputeReason
//           )}&vendorIds=${vendorId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${sessionStorage.getItem("token")}`,
//             },
//           }
//         );

//         if (!responseApprovedAmt.ok || !responseTotalDisputedAmt.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const dataApprovedAmt = await responseApprovedAmt.json();
//         const totalApproved = dataApprovedAmt.data.value;

//         const dataTotalDisputedAmt = await responseTotalDisputedAmt.json();
//         const totalDisputed = dataTotalDisputedAmt.data.value;

//         if (
//           totalDisputed !== 0 &&
//           totalApproved !== undefined &&
//           totalDisputed !== undefined
//         ) {
//           const progress =
//             (parseFloat(totalApproved) / parseFloat(totalDisputed)) * 100;
//           setProgress(progress);
//         } else {
//           setProgress(0);
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };


    
//     const handleVendorIdChange = (vendorId) => {
//       fetchDisputeCount("Shipment Disparity", setShipmentDisparityProgress, vendorId);
//       fetchDisputeCount("Duplicate Freight", setDuplicateFreightProgress, vendorId);
//       fetchDisputeCount("Non-compliant Freight", setNonCompliantFreightProgress, vendorId);
//       fetchDisputeCount("Duplicate Billing", setDuplicateBillingProgress, vendorId);
//     };

//     // Fetch initial data
//     if (vendorId) {
//       fetchDisputeCount("Shipment Disparity", setShipmentDisparityProgress, vendorId);
//       fetchDisputeCount("Duplicate Freight", setDuplicateFreightProgress, vendorId);
//       fetchDisputeCount("Non-compliant Freight", setNonCompliantFreightProgress, vendorId);
//       fetchDisputeCount("Duplicate Billing", setDuplicateBillingProgress, vendorId);
//     }

//     // Listen for vendorSelected event
//     eventEmitter.on("vendorSelected", handleVendorIdChange);

//     // Clean up event listener
//     return () => {
//       eventEmitter.off("vendorSelected", handleVendorIdChange);
//     };

//   }, []);


//   return (
//     <DashboardCard
//       title={
//         <Typography variant="h4" mb={2}>
//           Win Rate
//         </Typography>
//       }
//     >
//       <Box>
//         <Grid
//           container
//           style={{
//             borderBottom: "1px solid",
//             borderColor: theme.palette.divider,
//           }}
//           pb={3}
//         >
//           <Grid item xs={12} mb={3}>
//             <Grid container alignItems="center">
//               <Grid item sm={4}>
//                 <Typography
//                   variant="h6"
//                   sx={{
//                     fontWeight: 400,
//                     color: theme.palette.success.extraDark,
//                   }}
//                 >
//                   Duplicate Billing
//                 </Typography>
//               </Grid>
//               <Grid item sm={8} px={1}>
//                 {duplicateBillingProgress !== null &&
//                 duplicateBillingProgress !== 0 ? (
//                   <Box style={{ width: "calc(100% - 45px)" }} mx={"auto"}>
//                     <CustomProgressBar width={`${duplicateBillingProgress}%`}>
//                       <ProgressLight
//                         style={{ backgroundColor: theme.palette.success.light }}
//                       ></ProgressLight>
//                       <ProgressDark
//                         style={{ backgroundColor: theme.palette.success.main }}
//                       ></ProgressDark>
//                       <ProgressLabel
//                         style={{ backgroundColor: theme.palette.success.main }}
//                       >
//                         {duplicateBillingProgress.toFixed(2)}%{" "}
//                         <Box
//                           component="span"
//                           style={{ borderColor: theme.palette.success.main }}
//                         ></Box>
//                       </ProgressLabel>
//                     </CustomProgressBar>
//                   </Box>
//                 ) : (
//                   <Typography variant="body2">
//                     Dispute process is yet to begin for Duplicate Billing
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12} mb={3}>
//             <Grid container alignItems="center">
//               <Grid item sm={4}>
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: 400, color: theme.palette.accent.main }}
//                 >
//                   Shipment Disparity
//                 </Typography>
//               </Grid>
//               <Grid item sm={8}>
//                 {shipmentDisparityProgress !== null &&
//                 shipmentDisparityProgress !== 0 ? (
//                   <Box style={{ width: "calc(100% - 45px)" }} mx={"auto"}>
//                     <CustomProgressBar width={`${shipmentDisparityProgress}%`}>
//                       <ProgressLight
//                         style={{ backgroundColor: theme.palette.accent.light }}
//                       ></ProgressLight>
//                       <ProgressDark
//                         style={{ backgroundColor: theme.palette.accent.main }}
//                       ></ProgressDark>
//                       <ProgressLabel
//                         style={{ backgroundColor: theme.palette.accent.main }}
//                       >
//                         {shipmentDisparityProgress.toFixed(2)}%
//                         <Box
//                           component="span"
//                           style={{ borderColor: theme.palette.accent.main }}
//                         ></Box>
//                       </ProgressLabel>
//                     </CustomProgressBar>
//                   </Box>
//                 ) : (
//                   <Typography variant="body2">
//                     Dispute process is yet to begin for Shipment Disparity
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12} mb={3}>
//             <Grid container alignItems="center">
//               <Grid item sm={4}>
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: 400, color: theme.palette.primary.main }}
//                 >
//                   Duplicate Freight
//                 </Typography>
//               </Grid>
//               <Grid item sm={8}>
//                 {duplicateFreightProgress !== null &&
//                 duplicateFreightProgress !== 0 ? (
//                   <Box style={{ width: "calc(100% - 45px)" }} mx={"auto"}>
//                     <CustomProgressBar width={`${duplicateFreightProgress}%`}>
//                       <ProgressLight
//                         style={{
//                           backgroundColor: theme.palette.primary.extraLight,
//                         }}
//                       ></ProgressLight>
//                       <ProgressDark
//                         style={{ backgroundColor: theme.palette.primary.main }}
//                       ></ProgressDark>
//                       <ProgressLabel
//                         style={{ backgroundColor: theme.palette.primary.main }}
//                       >
//                         {duplicateFreightProgress.toFixed(2)}%{" "}
//                         <Box
//                           component="span"
//                           style={{ borderColor: theme.palette.primary.main }}
//                         ></Box>
//                       </ProgressLabel>
//                     </CustomProgressBar>
//                   </Box>
//                 ) : (
//                   <Typography variant="body2">
//                     Dispute process is yet to begin for Duplicate Freight
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid item xs={12}>
//             <Grid container alignItems="center">
//               <Grid item sm={4}>
//                 <Typography
//                   variant="h6"
//                   sx={{ fontWeight: 400, color: "#f19c53" }}
//                 >
//                   Non-compliant Freight
//                 </Typography>
//               </Grid>
//               <Grid item sm={8}>
//                 {nonCompliantFreightProgress !== null &&
//                 nonCompliantFreightProgress !== 0 ? (
//                   <Box style={{ width: "calc(100% - 45px)" }} mx={"auto"}>
//                     <CustomProgressBar
//                       width={`${nonCompliantFreightProgress}%`}
//                     >
//                       <ProgressLight
//                         style={{ backgroundColor: theme.palette.warning.light }}
//                       ></ProgressLight>
//                       <ProgressDark
//                         style={{ backgroundColor: "#f19c53" }}
//                       ></ProgressDark>
//                       <ProgressLabel
//                         style={{ backgroundColor: "#f19c53" }}
//                       >
//                         {nonCompliantFreightProgress.toFixed(2)}%{" "}
//                         <Box
//                           component="span"
//                           style={{ borderColor: "#f19c53" }}
//                         ></Box>
//                       </ProgressLabel>
//                     </CustomProgressBar>
//                   </Box>
//                 ) : (
//                   <Typography variant="body2">
//                     Dispute process is yet to begin for Non-compliant Freight
//                   </Typography>
//                 )}
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//         <Grid container pt={2}>
//           <Grid item xs={4}></Grid>
//           <Grid item xs={8}>
//             <Grid container textAlign="center">
//               <Grid item xs={2}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   0%
//                 </Typography>
//               </Grid>
//               <Grid item xs={2}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   20%
//                 </Typography>
//               </Grid>
//               <Grid item xs={2}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   40%
//                 </Typography>
//               </Grid>
//               <Grid item xs={2}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   60%
//                 </Typography>
//               </Grid>
//               <Grid item xs={2}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   80%
//                 </Typography>
//               </Grid>
//               <Grid item xs={2}>
//                 <Typography variant="body2" style={{ fontWeight: 600 }}>
//                   100%
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Box>
//     </DashboardCard>
//   );
// };

// export default WinRate;