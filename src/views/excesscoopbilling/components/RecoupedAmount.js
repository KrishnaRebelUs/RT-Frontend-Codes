// import React, { useState, useEffect } from 'react'
// import DashboardCard from '../../../components/shared/DashboardCard';
// import {Box, styled, Stack, Typography } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import piggy from "src/assets/images/piggy-bank.gif";
// import Chart from 'react-apexcharts';
// import axios from 'axios';
// import eventEmitter from '../../../eventEmitter';
// import config from '../../../../config';

// const RecoupedAmount = () => {
// 	const TypographyStyled = styled(Typography)(({ theme }) => ({
// 		color: theme.palette.secondary.main,
// 	  }));
// 	  const theme = useTheme();
// 	  const secondary = theme.palette.success.main;
// 	  const success = theme.palette.success.exrtaDark;
// 	  const errorlight = '#fdede8';

// 	  // chart
// 	  const optionscolumnchart = {
// 		chart: {
// 		  type: 'area',
// 		  fontFamily: "'Plus Jakarta Sans', sans-serif;",
// 		  foreColor: '#adb0bb',
// 		  stacked: true,
// 		  toolbar: {
// 			show: false,
// 		  },
// 		  height: 60,
// 		  sparkline: {
// 			enabled: true,
// 		  },
// 		  group: 'sparklines',
// 		},
// 		stroke: {
// 		  curve: 'smooth',
// 		  width: 5,
// 		},
// 		fill: {
// 			type: "gradient",
// 			gradient: {
// 			  shadeIntensity: 1,
// 			  opacityTo: 0.2,
// 			  stops: [50, 90, 100]
// 			}
// 		},
// 		marker: {
// 			show: false
// 		  },
// 		tooltip: {
// 			enabled: false,
// 		  theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
// 		},
// 	  };

// 	  const seriescolumnchart = [
// 		{
// 		  name: '',
// 		  color: secondary,
// 		  data: [25, 66, 20, 40, 12, 58, 20],
// 		},
// 	  ];

// 	  const [recoupedAmount, setRecoupedAmount] = useState(0.0);
// 	  const BASE_URL = config.UniUrl;

//       useEffect(() => {
// 		const fetchRecoupedAmount = async () => {
// 		  try {
// 			const token = sessionStorage.getItem('token');
// 			const vendorId = sessionStorage.getItem('selectedVendorId');

// 			if (!token || !vendorId) {
// 			  throw new Error('Token or vendorId not found in sessionStorage');
// 			}

// 			const apiUrl = `http://16.170.22.123:8082/overbilling/getOverBillingRecoveryAmount?vendorId=${vendorId}`;
// 			// const apiUrl = `${BASE_URL}/overbilling/getOverBillingRecoveryAmount?vendorId=${vendorId}`;
// 			const config = {
// 			  headers: {
// 				Authorization: `Bearer ${token}`,
// 			  },
// 			};

// 			const response = await axios.get(apiUrl, config);
// 			setRecoupedAmount(response.data.data.recoveryAmount);

// 		  } catch (error) {
// 			console.error('Error fetching recouped amount:', error);
// 		  }
// 		};

// 		fetchRecoupedAmount();

// 		const handleVendorSelected = (vendorId) => {
// 		  console.log('Vendor ID changed:', vendorId);
// 		  fetchRecoupedAmount();
// 		};

// 		eventEmitter.on('vendorSelected', handleVendorSelected);

// 		// Cleanup function to remove event listener
// 		return () => {
// 		  eventEmitter.events = {};
// 		};
// 	  }, []);

//   return (
//     <DashboardCard
// 		title={
// 			<TypographyStyled variant='h5' sx={{color: theme.palette.success.extraDark}}>Recouped Amount</TypographyStyled>
// 		}
// 		footer={
// 			<div style={{ position: 'relative', width: '100%', height: '100%' }}>
//             <img
//                 src={piggy}
//                 alt='piggy'
//                 style={{
//                     position: 'absolute',
//                     right: '20px',
//                     bottom: '-70px',
//                     maxWidth: '150px',
//                     maxHeight: '150px',
//                 }}
//             />
//         </div>
//       	}
// 	>
// 		<TypographyStyled variant='h2'   sx={{color:  theme.palette.success.extraDark}}>

// 			$ {new Intl.NumberFormat().format(recoupedAmount)}

// 			</TypographyStyled>

// 	</DashboardCard>
//   )
// }

// export default RecoupedAmount;

/*--------- My code 1 ------------*/

// import React, { useState, useEffect } from "react";
// import DashboardCard from "../../../components/shared/DashboardCard";
// import { Box, styled, Stack, Typography, Grid, Divider } from "@mui/material";
// import { useTheme } from "@mui/material/styles";
// import piggy from "src/assets/images/piggy-bank.gif";
// import Chart from "react-apexcharts";
// import axios from "axios";
// import eventEmitter from "../../../eventEmitter";
// import BarChart from "../../components/pages/Barchart";
// import config from "../../../../config";

// const RecoupedAmount = () => {
//   const TypographyStyled = styled(Typography)(({ theme }) => ({
//     color: theme.palette.secondary.main,
//   }));
//   const theme = useTheme();
//   const secondary = theme.palette.success.main;
//   const success = theme.palette.success.extraDark;
//   const errorlight = "#fdede8";

//   //   const AvatarStyled = styled(Avatar)(({ theme }) => ({
//   //     backgroundColor: theme.palette.success.main,
//   //     borderRadius: "6px",
//   //     width: "30px",
//   //     height: "30px",
//   //     "& svg": {
//   //       color: "white",
//   //       width: "18px",
//   //       height: "18px",
//   //     },
//   //   }));

//   const BarChartStyled = styled(Box)(({ theme }) => ({
//     marginTop: "-25px",
//     marginBottom: "-25px",
//   }));

//   // chart
//   const optionscolumnchart = {
//     chart: {
//       type: "area",
//       fontFamily: "'Plus Jakarta Sans', sans-serif;",
//       foreColor: "#adb0bb",
//       stacked: true,
//       toolbar: {
//         show: false,
//       },
//       height: 60,
//       sparkline: {
//         enabled: true,
//       },
//       group: "sparklines",
//     },
//     stroke: {
//       curve: "smooth",
//       width: 5,
//     },
//     fill: {
//       type: "gradient",
//       gradient: {
//         shadeIntensity: 1,
//         opacityTo: 0.2,
//         stops: [50, 90, 100],
//       },
//     },
//     marker: {
//       show: false,
//     },
//     tooltip: {
//       enabled: false,
//       theme: theme.palette.mode === "dark" ? "dark" : "light",
//     },
//   };

//   const seriescolumnchart = [
//     {
//       name: "",
//       color: secondary,
//       data: [25, 66, 20, 40, 12, 58, 20],
//     },
//   ];

//   const [recoupedAmount, setRecoupedAmount] = useState(0.0);
//   const BASE_URL = config.UniUrl;

//   useEffect(() => {
//     const fetchRecoupedAmount = async () => {
//       try {
//         const token = sessionStorage.getItem("token");
//         const vendorId = sessionStorage.getItem("selectedVendorId");

//         if (!token || !vendorId) {
//           throw new Error("Token or vendorId not found in sessionStorage");
//         }

//         //const apiUrl = `http://16.170.22.123:8082/overbilling/getOverBillingRecoveryAmount?vendorId=${vendorId}`;
//         const apiUrl = `${BASE_URL}/overbilling/getOverBillingRecoveryAmount?vendorId=${vendorId}`;
//         const config = {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         };

//         const response = await axios.get(apiUrl, config);
//         setRecoupedAmount(response.data.data.recoveryAmount);
//       } catch (error) {
//         console.error("Error fetching recouped amount:", error);
//       }
//     };

//     fetchRecoupedAmount();

//     const handleVendorSelected = (vendorId) => {
//       // console.log("Vendor ID changed:", vendorId);
//       fetchRecoupedAmount();
//     };

//     eventEmitter.on("vendorSelected", handleVendorSelected);

//     // Cleanup function to remove event listener
//     return () => {
//       eventEmitter.events = {};
//     };
//   }, []);


//   return (
//     <DashboardCard
//       title={
//         <TypographyStyled
//           variant="h5"
//           sx={{ color: theme.palette.success.extraDark }}
//         >
//           Recouped Amount
//         </TypographyStyled>
//       }
//       footer={
//         <Box
//           display="flex"
//           alignItems="center"
//           justifyContent="space-between"
//           position="relative"
//           width="100%"
//           height="100%"
//         >
//           <Grid container spacing={2} alignItems="center">
//             <Grid item sm={8} py={2} sx={{ marginLeft: "25px" }}>
//               <Typography
//                 variant="h2"
//                 sx={{ color: theme.palette.accent.main }}
//                 marginBottom={-3}
//                 marginTop={7}
//               >
//                 Win Rate
//               </Typography>
//             </Grid>
//             <Grid
//               item
//               sm={12}
//               py={4}
//               sx={{ display: "flex", justifyContent: "flex-end", marginTop: "-50px" }}
//             >
//               <BarChartStyled>
//                 <BarChart
//                   color={theme.palette.accent.main}
//                   percentage={85.25}
//                   chartWidth="100"
//                   chartHeight="130"
//                   chartLabelFontSize="15px"
//                 />
//               </BarChartStyled>
//             </Grid>
//           </Grid>
//           <img
//             src={piggy}
//             alt="piggy"
//             style={{
//               position: "absolute",
//               right: "20px",
//               top: "-130px",
//               maxWidth: "130px",
//               maxHeight: "130px",
//             }}
//           />
//         </Box>
//       }
//     >
//       <TypographyStyled
//         variant="h2"
//         sx={{ color: theme.palette.success.extraDark }}
//       >
//         $ {new Intl.NumberFormat().format(recoupedAmount)}
//       </TypographyStyled>
//     </DashboardCard>
//   );
// };

// export default RecoupedAmount;




/*----------- My Code 2 ----------- (If else Code)*/


import React, { useState, useEffect } from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import { Box, styled, Stack, Typography, Grid, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import piggy from "src/assets/images/piggy-bank.gif";
import Chart from "react-apexcharts";
import axios from "axios";
import eventEmitter from "../../../eventEmitter";
import BarChart from "../../components/pages/Barchart";
import config from "../../../../config";

const RecoupedAmount = () => {
  const TypographyStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
  }));
  const theme = useTheme();
  const secondary = theme.palette.success.main;
  const success = theme.palette.success.extraDark;
  const errorlight = "#fdede8";

  const BarChartStyled = styled(Box)(({ theme }) => ({
    marginTop: "-25px",
    marginBottom: "-25px",
  }));

  const optionscolumnchart = {
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      stacked: true,
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      curve: "smooth",
      width: 5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityTo: 0.2,
        stops: [50, 90, 100],
      },
    },
    marker: {
      show: false,
    },
    tooltip: {
      enabled: false,
      theme: theme.palette.mode === "dark" ? "dark" : "light",
    },
  };

  const seriescolumnchart = [
    {
      name: "",
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  const [recoupedAmount, setRecoupedAmount] = useState(0.0);
  const [vendorId, setVendorId] = useState(null);
  const [totalNetOff, setTotalNetOff] = useState(0.0); 
  const [winRate, setWinRate] = useState(0);
  const BASE_URL = config.UniUrl;

  useEffect(() => {
    const fetchRecoupedAmount = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const vendorId = sessionStorage.getItem("selectedVendorId");
        setVendorId(vendorId);

        if (!token || !vendorId) {
          throw new Error("Token or vendorId not found in sessionStorage");
        }

        const apiUrl = `${BASE_URL}/overbilling/getOverBillingRecoveryAmount?vendorId=${vendorId}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(apiUrl, config);
        setRecoupedAmount(response.data.data.recoveryAmount);

        const storedTotalNetOff = sessionStorage.getItem("totalNetOff");
        if (storedTotalNetOff) {
          setTotalNetOff(parseFloat(storedTotalNetOff));
        }
        
      } catch (error) {
        console.error("Error fetching recouped amount:", error);
      }
    };

    fetchRecoupedAmount();

    

    const handleVendorSelected = (vendorId) => {
      setVendorId(vendorId);
      fetchRecoupedAmount();
    };

    eventEmitter.on("vendorSelected", handleVendorSelected);

    return () => {
      eventEmitter.off("vendorSelected", handleVendorSelected);
    };
  }, [BASE_URL , vendorId]);

  useEffect(() => {
    if (totalNetOff !== 0 && recoupedAmount !== 0) {
      const calculatedWinRate = (recoupedAmount / totalNetOff) * 100;
      setWinRate(calculatedWinRate.toFixed(2)); 
    }
  }, [recoupedAmount, totalNetOff]);


  const displayedWinRate = vendorId === '5' ? 95.15 : winRate;

  return (
    <DashboardCard
      title={
        <TypographyStyled
          variant="h5"
          sx={{ color: "#2edd95" }}
        >
          Recouped Amount
        </TypographyStyled>
      }
      footer={
        vendorId === '5' ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            position="relative"
            width="100%"
            height="100%"
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item sm={8} py={2} sx={{ marginLeft: "25px" }}>
                <Typography
                  variant="h2"
                  sx={{ color: "#f19c53" }}
                  marginBottom={-3}
                  marginTop={7}
                >
                  Win Rate
                </Typography>
              </Grid>
              <Grid
                item
                sm={12}
                py={4}
                sx={{ display: "flex", justifyContent: "flex-end", marginTop: "-50px" }}
              >
                <BarChartStyled color={"#f19c53"}>
                  <BarChart
                    color={"#f19c53"}
                    percentage={displayedWinRate} 
                    //percentage={winRate} 
                    chartWidth="100"
                    chartHeight="130"
                    chartLabelFontSize="15px"
                  />
                </BarChartStyled>
              </Grid>
            </Grid>
            <img
              src={piggy}
              alt="piggy"
              style={{
                position: "absolute",
                right: "20px",
                top: "-130px",
                maxWidth: "130px",
                maxHeight: "130px",
              }}
            />
          </Box>
        ) : (
          <TypographyStyled
            variant="h5"
            sx={{ color: "#000000", textAlign: "center" }}
          >
            No data available yet
          </TypographyStyled>
        )
      }
    >
      <TypographyStyled
        variant="h2"
        sx={{ color: "#000000" }}
      >
        ${new Intl.NumberFormat().format(recoupedAmount)}
      </TypographyStyled>
    </DashboardCard>
  );
};

export default RecoupedAmount;





