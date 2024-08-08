
// import React, {useState , useEffect} from 'react'
// import DashboardCard from '../../../components/shared/DashboardCard';
// import {Box, styled,Button,  Stack, Typography } from '@mui/material';
// import {IconChevronRight , IconSettings2} from '@tabler/icons-react';
// import { Link } from 'react-router-dom'; 
// import { useTheme } from '@emotion/react';
// import axios from 'axios';
// import eventEmitter from '../../../eventEmitter';
// import config from '../../../../config';

// const Disputed = () => {


// 	const TypographyStyled = styled(Typography)(({ theme }) => ({
// 		color: theme.palette.secondary.main,
// 		lineHeight: '24px'
// 	  }));



// 	const ButtonStyled = styled(Button)(({ theme }) => ({
// 		backgroundColor: theme.palette.primary.contrast,
// 		border: '1px solid',
// 		borderColor: theme.palette.primary.contrast,
// 		color: theme.palette.primary.contrastText,
// 		fontSize: '10px',
// 		padding: '3px 6px',
// 		fontWeight: '600',
// 		'&:hover': {
// 			backgroundColor: theme.palette.primary.main,
// 			color:theme.palette.primary.contrastText,
// 			borderColor:theme.palette.primary.main
// 		},
// 	}));

// 	  const theme = useTheme();
// 	  const BASE_URL = config.UniUrl;
// 	  const [vendorId, setVendorId] = useState(null);
//       const [irClaimData, setIrClaimData] = useState(null); // State for IR_CLAIM data
//       const [loading, setLoading] = useState(true);

// 	  const updateVendorId = () => {
// 		const id = sessionStorage.getItem("selectedVendorId");
// 		setVendorId(id);
// 	  };
	
// 	  useEffect(() => {
// 		// Initial fetch
// 		updateVendorId();
	
// 		// Listen to the 'vendorSelected' event
// 		eventEmitter.on("vendorSelected", updateVendorId);
	
// 		// Cleanup function to remove event listener
// 		return () => {
// 		  eventEmitter.off("vendorSelected", updateVendorId);
// 		};
// 	  }, []);

// 	  useEffect(() => {
// 		const token = sessionStorage.getItem("token");
	
// 		if (vendorId) {
// 		  // Fetch IR_CLAIM data
// 		  setLoading(true);
// 		  axios
// 			.get(`http://16.170.22.123:8082/overbilling/getSummaryByType`, {
// 			  params: {
// 				type: "IR_CLAIM",
// 				vendorId: vendorId,
// 			  },
// 			  headers: {
// 				Authorization: `Bearer ${token}`,
// 			  },
// 			})
// 			.then((response) => {
// 			  const data = response.data;
// 			  if (data.status === "SUCCESS" && data.data.length > 0) {
	
// 				// Set IR_CLAIM data state
// 				setIrClaimData({
// 				  ...data.data[0],
// 				});
// 			  } else {
// 				setIrClaimData(null);
// 			  }
// 			})
// 			.catch((error) => console.error("Error fetching IR_CLAIM data:", error))
// 			.finally(() => setLoading(false));
// 		}
// 	  }, [vendorId]);

//   return (
//     <DashboardCard title={
// 		<Typography variant='h4' sx={{color: theme.palette.primary.light}}>Claim Submitted($)</Typography>
// 	}>
// 		<Typography variant='h3' sx={{ color: theme.palette.primary.light}}>
// 			{/* ${new Intl.NumberFormat().format(4942234.43)} */}
// 			{loading ? (
//                     <Typography
//                       variant="h3"
//                       sx={{ color: theme.palette.text.main }}
//                     >
//                       Loading data...
//                     </Typography>
//                   ) : (
//                     <TypographyStyled
//                       variant="h3"
//                       sx={{ color: theme.palette.text.main }}
//                     >
//                       {irClaimData
//                         ? `$${new Intl.NumberFormat().format(
//                             irClaimData.overbillIdentified
//                           )}`
//                         : "No data available"}
//                     </TypographyStyled>
//                   )}
// 				  <IconSettings2 size='70' style={{position: 'absolute', right:'380px', bottom: '280px', color: "#0285a9e"}}/>
// 			</Typography>

// 	</DashboardCard>
//   )
// }

// export default Disputed;





import React, {useState, useEffect} from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import {Box, styled, Button, Stack, Typography} from '@mui/material';
import {IconChevronRight, IconSettings2} from '@tabler/icons-react';
import {Link} from 'react-router-dom';
import {useTheme} from '@emotion/react';
import axios from 'axios';
import eventEmitter from '../../../eventEmitter';
import config from '../../../../config';

const Disputed = () => {

    const TypographyStyled = styled(Typography)(({theme}) => ({
        color: theme.palette.secondary.main,
        lineHeight: '24px'
    }));

    const ButtonStyled = styled(Button)(({theme}) => ({
        backgroundColor: theme.palette.primary.contrast,
        border: '1px solid',
        borderColor: theme.palette.primary.contrast,
        color: theme.palette.primary.contrastText,
        fontSize: '10px',
        padding: '3px 6px',
        fontWeight: '600',
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderColor: theme.palette.primary.main
        },
    }));

    const theme = useTheme();
    const BASE_URL = config.UniUrl;
    const [vendorId, setVendorId] = useState(null);
    const [irClaimData, setIrClaimData] = useState(null); // State for IR_CLAIM data
    const [loading, setLoading] = useState(true);

    const updateVendorId = () => {
        const id = sessionStorage.getItem("selectedVendorId");
        setVendorId(id);
    };

    useEffect(() => {
        // Initial fetch
        updateVendorId();

        // Listen to the 'vendorSelected' event
        eventEmitter.on("vendorSelected", updateVendorId);

        // Cleanup function to remove event listener
        return () => {
            eventEmitter.off("vendorSelected", updateVendorId);
        };
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem("token");

        if (vendorId) {
            // Fetch IR_CLAIM data
            setLoading(true);
            axios
                .get(`http://16.170.22.123:8082/overbilling/getSummaryByType`, {
                    params: {
                        type: "IR_CLAIM",
                        vendorId: vendorId,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const data = response.data;
                    if (data.status === "SUCCESS" && data.data.length > 0) {

                        // Set IR_CLAIM data state
                        setIrClaimData({
                            ...data.data[0],
                        });
                    } else {
                        setIrClaimData(null);
                    }
                })
                .catch((error) => console.error("Error fetching IR_CLAIM data:", error))
                .finally(() => setLoading(false));
        }
    }, [vendorId]);

    return (
        <DashboardCard title={
            <Typography variant='h4' sx={{color: theme.palette.primary.light}}>Claim Submitted($)</Typography>
        }>
            <Box sx={{position: 'relative'}}>
                <Typography variant='h3' sx={{color: theme.palette.primary.light}}>
                    {loading ? (
                        <Typography
                            variant="h3"
                            sx={{color: theme.palette.text.main}}
                        >
                            Loading data...
                        </Typography>
                    ) : (
                        <TypographyStyled
                            variant="h3"
                            sx={{color: theme.palette.text.main}}
                        >
                            {irClaimData
                                ? `$${new Intl.NumberFormat().format(
                                    irClaimData.overbillIdentified
                                )}`
                                : "No data available"}
                        </TypographyStyled>
                    )}
                    <IconSettings2 size='60' style={{
                        position: 'absolute',
                        right: '5px', 
                        bottom: '-110px',
                        color: "#0285a9e"
                    }}/>
                </Typography>
            </Box>
        </DashboardCard>
    );
}

export default Disputed;
