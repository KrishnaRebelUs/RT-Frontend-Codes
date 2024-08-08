/*------------------------------------------------------------- Main Code ----------------------------------------------------------------------*/


import React, { useEffect, useState } from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import { styled, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';
import eventEmitter from '../../../eventEmitter';

const RecoupedAmount = () => {
  const [recoveryAmount, setRecoveryAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchRecoveryAmount = async (vendorId) => {
    const token = sessionStorage.getItem('token');

    if (token && vendorId) {
      try {
        const response = await fetch(`http://16.170.22.123:8082/missedInvoice/getMissedInvoiceRecoveryAmount?vendorId=${vendorId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.status === 'SUCCESS' && data.data) {
          setRecoveryAmount(data.data.recoveryAmount);
        } else {
          setRecoveryAmount(null);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching recovery amount:', error);
        setError(true);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const vendorId = sessionStorage.getItem('selectedVendorId');
    fetchRecoveryAmount(vendorId);

    eventEmitter.on('vendorSelected', (vendorId) => {
      setLoading(true); // Set loading to true while fetching new data
      fetchRecoveryAmount(vendorId);
    });

    // Cleanup function to remove event listener
    return () => {
      eventEmitter.off('vendorSelected'); 
    };
  }, []);

  const TypographyStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
  }));

  const theme = useTheme();
  const secondary = theme.palette.success.main;
  const success = theme.palette.success.extraDark;

  // Chart options
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      stacked: true,
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 5,
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityTo: 0.1,
        stops: [30, 80, 100],
      },
    },
    marker: {
      show: false,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      enabled: false,
    },
  };

  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  return (
    <DashboardCard
      title={
        <TypographyStyled variant='h5' sx={{ color: "#2edd95" }}>
          Recouped Amount
        </TypographyStyled>
      }
      footer={
        <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="100px" width="200px" className="recoupend-amount" color="#2edd95"/>
      }
    >
      {loading ? (
        <TypographyStyled variant='h6' sx={{ color: theme.palette.text.primary }}>
          Loading...
        </TypographyStyled>
      ) : error ? (
        <TypographyStyled variant='h6' sx={{ color: theme.palette.error.main }}>
          Error loading data
        </TypographyStyled>
      ) : recoveryAmount !== null ? (
        <TypographyStyled variant='h3' >
          ${new Intl.NumberFormat().format(recoveryAmount)}
        </TypographyStyled>
      ) : (
        <TypographyStyled variant='h6' sx={{ color: theme.palette.text.secondary }}>
          No data available
        </TypographyStyled>
      )}
    </DashboardCard>
  );
};

export default RecoupedAmount;



/*----------------------------------------------------------- My code 2 ------------------------------------------------------------------------*/



// import React, { useEffect, useState } from 'react';
// import DashboardCard from '../../../components/shared/DashboardCard';
// import { styled, Typography } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import Chart from 'react-apexcharts';
// import eventEmitter from '../../../eventEmitter';

// const RecoupedAmount = () => {
//   const [recoveryAmount, setRecoveryAmount] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(false);

//   const fetchRecoveryAmount = (vendorId) => {
//     const token = sessionStorage.getItem('token');

//     if (token && vendorId) {
//       fetch(`http://16.170.22.123:8082/missedInvoice/getMissedInvoiceRecoveryAmount?vendorId=${vendorId}`, {
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       })
//         .then(response => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then(data => {
//           if (data.status === 'SUCCESS' && data.data) {
//             setRecoveryAmount(data.data.recoveryAmount);
//           } else {
//             setRecoveryAmount(null);
//           }
//           setLoading(false);
//         })
//         .catch(error => {
//           console.error('Error fetching recovery amount:', error);
//           setError(true);
//           setLoading(false);
//         });
//     }
//   };

//   useEffect(() => {
//     const vendorId = sessionStorage.getItem('selectedVendorId');
//     fetchRecoveryAmount(vendorId);

//     const handleVendorSelected = (vendorId) => {
//       setLoading(true); // Set loading to true while fetching new data
//       fetchRecoveryAmount(vendorId);
//     };

//     eventEmitter.on('vendorSelected', handleVendorSelected);

//     // Cleanup function to remove event listener
//     return () => {
//       eventEmitter.off('vendorSelected', handleVendorSelected);
//     };
//   }, []);

//   const TypographyStyled = styled(Typography)(({ theme }) => ({
//     color: theme.palette.secondary.main,
//   }));

//   const theme = useTheme();
//   const secondary = theme.palette.success.main;
//   const success = theme.palette.success.extraDark;

//   // Chart options
//   const optionscolumnchart = {
//     chart: {
//       type: 'area',
//       fontFamily: "'Plus Jakarta Sans', sans-serif;",
//       foreColor: '#adb0bb',
//       stacked: true,
//       toolbar: {
//         show: false,
//       },
//       height: 60,
//       sparkline: {
//         enabled: true,
//       },
//       group: 'sparklines',
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 5,
//     },
//     fill: {
//       type: 'gradient',
//       gradient: {
//         shadeIntensity: 1,
//         opacityTo: 0.1,
//         stops: [30, 80, 100],
//       },
//     },
//     marker: {
//       show: false,
//     },
//     tooltip: {
//       theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
//       enabled: false,
//     },
//   };

//   const seriescolumnchart = [
//     {
//       name: '',
//       color: secondary,
//       data: [25, 66, 20, 40, 12, 58, 20],
//     },
//   ];

//   return (
//     <DashboardCard
//       title={
//         <TypographyStyled variant='h5' sx={{ color: theme.palette.success.extraDark }}>
//           Recouped Amount
//         </TypographyStyled>
//       }
//       footer={
//         <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="100px" width="200px" className="recoupend-amount" />
//       }
//     >
//       {loading ? (
//         <TypographyStyled variant='h6' sx={{ color: theme.palette.text.primary }}>
//           Loading...
//         </TypographyStyled>
//       ) : error ? (
//         <TypographyStyled variant='h6' sx={{ color: theme.palette.error.main }}>
//           Error loading data
//         </TypographyStyled>
//       ) : recoveryAmount !== null ? (
//         <TypographyStyled variant='h3' sx={{ color: theme.palette.success.extraDark }}>
//           ${new Intl.NumberFormat().format(recoveryAmount)}
//         </TypographyStyled>
//       ) : (
//         <TypographyStyled variant='h6' sx={{ color: theme.palette.text.secondary }}>
//           No data available
//         </TypographyStyled>
//       )}
//     </DashboardCard>
//   );
// };

// export default RecoupedAmount;
