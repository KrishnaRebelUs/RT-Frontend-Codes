// import { useTheme } from '@emotion/react';
// import { Typography, Grid, styled,Box,List, ListItem} from '@mui/material'
// import React from 'react'
// import "./Update.css";

// const TypographyStyled = styled(Typography)(({ theme }) => ({
// 	color: theme.palette.primary.main,
// 	borderBottom: '1px solid',
// 	borderColor: '#ccc', 
// 	paddingBottom: '10px'
// }));
// const BoxStyled = styled(Box)(({ theme }) => ({
// 	border: '1px solid',
// 	borderColor: "white",
// 	// borderColor: theme.palette.primary.main,
// 	borderRadius: '7px',
// 	padding: '10px 20px',
//   }));

//   const ListStyled = styled(ListItem)(({ theme }) => ({
// 	borderBottom: '2px solid',
// 	borderColor: '#ccc', 
// 	padding:'5px 0',
// 	color: theme.palette.primary.main,
// 	fontWeight: '600'
//   }));



  
  

// const Update = () => {
// 	const theme = useTheme();
//   return (
// 	<BoxStyled className='actual-updates' height='330px' style={{overflow:'hidden'}}>
// 	    <TypographyStyled variant='h5' sx={{color: theme.palette.accent.main , marginTop: "-12px"}}>Updates</TypographyStyled>
// 	    <marquee direction='up' scrollamount='4.2' height='100%' style={{ marginTop: '15px' }}>
		  
// 		  <List>
// 				  <ListStyled>The Shortage case was resolved within 3 days</ListStyled>
// 				  <ListStyled>The Overbilling case was resolved within 7 days</ListStyled>
// 				  <ListStyled>The audit has been completed, and we are now awaiting the contract signing.</ListStyled>
// 				  <ListStyled>Successfully recovered in Batch 1  $  20,000</ListStyled>
// 				  <ListStyled>Amazon hosts over 100 categories of overbillings, chargebacks, and deductions</ListStyled>
// 				  <ListStyled>Successfully recovered in Batch 1 $ 20,000</ListStyled>
// 				  <ListStyled>Awaiting to hear from Amazon on Batch 2</ListStyled>
// 				  <ListStyled>Amazon hosts over 100 categories of overbillings, chargebacks, and deductions</ListStyled>
// 				  <ListStyled>Amazon hosts over 100 categories of overbillings, chargebacks, and deductions</ListStyled>
// 				  <ListStyled>Successfully recovered in Batch 1 $ 20,000</ListStyled>
// 				  <ListStyled>Awaiting to hear from Amazon on Batch 2</ListStyled>
// 				  <ListStyled>Amazon hosts over 100 categories of overbillings, chargebacks, and deductions</ListStyled>
		  
// 		  </List>
// 		  <List>
// 				  <ListStyled>The Shortage case was resolved within 3 days</ListStyled>
// 				  <ListStyled>The Overbilling case was resolved within 7 days</ListStyled>
// 				  <ListStyled>The audit has been completed, and we are now awaiting the contract signing.</ListStyled>
// 				  <ListStyled>Successfully recovered in Batch 1  $  20,000</ListStyled>
// 				  <ListStyled>Amazon hosts over 100 categories of overbillings, chargebacks, and deductions</ListStyled>
// 				  <ListStyled>Successfully recovered in Batch 1 $ 20,000</ListStyled>
// 				  <ListStyled>Awaiting to hear from Amazon on Batch 2</ListStyled>
// 				  <ListStyled>Amazon hosts over 100 categories of overbillings, chargebacks, and deductions</ListStyled>
// 				  <ListStyled>Amazon hosts over 100 categories of overbillings, chargebacks, and deductions</ListStyled>
// 				  <ListStyled>Successfully recovered in Batch 1 $ 20,000</ListStyled>
// 				  <ListStyled>Awaiting to hear from Amazon on Batch 2</ListStyled>
// 				  <ListStyled>Amazon hosts over 100 categories of overbillings, chargebacks, and deductions</ListStyled>
		  
// 		  </List>
// 	    </marquee>
//    </BoxStyled>
//   )
// }

// export default Update;




/*--------------------------------------------------------------- My Code ----------------------------------------------------------------------*/


import { useTheme } from '@emotion/react';
import { Typography, Box, List, ListItem, styled } from '@mui/material';
import React , {useState , useEffect} from 'react';
import "./Update.css";
import eventEmitter from '../../../eventEmitter';

const TypographyStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  borderBottom: '1px solid',
  borderColor: '#ccc',
  paddingBottom: '10px'
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  border: '1px solid',
  borderColor: "white",
  borderRadius: '7px',
  padding: '10px 20px',
}));

const ListStyled = styled(ListItem)(({ theme }) => ({
  borderBottom: '2px solid',
  borderColor: '#ccc',
  padding: '5px 0',
  color: theme.palette.primary.main,
  fontWeight: '600'
}));

const Update = () => {
  const theme = useTheme();
  const [vendorId, setVendorId] = useState(null);

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

  if (vendorId !== '5') {
    return (
      <Box>
        <Typography variant="h4" marginLeft={20} marginTop={13}>No data available</Typography>
      </Box>
       
    );
  }

  return (
    <BoxStyled className='actual-updates' height='330px' style={{ overflow: 'hidden' }}>
      <TypographyStyled variant='h5' sx={{ color: theme.palette.accent.main, marginTop: "-12px" }}>Updates</TypographyStyled>
      <Box className='scroll-container'>
        <Box className='scroll-content'>
        <List>
            <ListStyled>$397,688.63 ( Refund Amount as per VC ) approved on 2/20/2024 ( Resolve Date ) under Shipment Disparity</ListStyled>
            <ListStyled>$871,605.40 approved on 3/9/2023 under Duplicate Billing</ListStyled>
            <ListStyled>$67,550.80 approved on 04/30/2023 under Duplicate Freight</ListStyled>
            <ListStyled>$386,199.20 approved on 12/30/2022 under Non-compliant Freight</ListStyled>
            <ListStyled>$397,688.63 received on 2/19/2024 for Shipment Disparity</ListStyled>
            <ListStyled>$871,605.40 received on 2/7/2023 for Duplicate Billing</ListStyled>
            <ListStyled>$67,550.80 received on 12/23/2022 for Duplicate Freight</ListStyled>
            <ListStyled>$10,477.44 received on 12/30/2022 for Non-compliant Freight</ListStyled>
          </List>
          <List>
            <ListStyled>$397,688.63 ( Refund Amount as per VC ) approved on 2/20/2024 ( Resolve Date ) under Shipment Disparity</ListStyled>
            <ListStyled>$871,605.40 approved on 3/9/2023 under Duplicate Billing</ListStyled>
            <ListStyled>$67,550.80 approved on 04/30/2023 under Duplicate Freight</ListStyled>
            <ListStyled>$386,199.20 approved on 12/30/2022 under Non-compliant Freight</ListStyled>
            <ListStyled>$397,688.63 received on 2/19/2024 for Shipment Disparity</ListStyled>
            <ListStyled>$871,605.40 received on 2/7/2023 for Duplicate Billing</ListStyled>
            <ListStyled>$67,550.80 received on 12/23/2022 for Duplicate Freight</ListStyled>
            <ListStyled>$10,477.44 received on 12/30/2022 for Non-compliant Freight</ListStyled>
          </List>
        </Box>
      </Box>
    </BoxStyled>
  );
}

export default Update;









