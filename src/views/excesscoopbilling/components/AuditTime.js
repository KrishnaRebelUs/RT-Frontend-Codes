import React from 'react'
import DashboardCard from '../../../components/shared/DashboardCard';
import {Box, styled, Stack, Typography, Avatar, Grid, Divider } from '@mui/material';
import BarChart from '../../components/pages/Barchart';
import { useTheme } from '@emotion/react';
import NumberData from '../../components/pages/NumberData';
import moment from 'moment';


const AuditTime = () => {
  const theme= useTheme();
  const data = [
    { body: "Amount Saved", number: "$57,423", icon: "IconCurrencyDollar",avatarBackgroundColor: theme.palette.primary.light, numberColor: theme.palette.success.extrDark},
    { body: "Resources Saved", number: "496", icon: "IconBriefcase", avatarBackgroundColor: theme.palette.accent.main, numberColor: theme.palette.success.extrDark },
    { body: "Payroll Saved", number: "18", icon: "IconClock", avatarBackgroundColor: theme.palette.success.extrDark, numberColor: theme.palette.success.extrDark},
   
  
  ];
	const TypographyStyled = styled(Typography)(({ theme }) => ({
		color: theme.palette.text.white,
	}));
  const AvatarStyled = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light,
    borderRadius: '4px',
    width: '24px',
    height: '24px',
   '& svg':{
      color:theme.palette.primary.contrastText,
      width: '16px',
      height: '16px'
    }

  }));
  return (
    <DashboardCard 
      // title={
      //   <Typography variant='h6'>Audit Time Period</Typography>
      // }
      // action={
      //   <Typography variant='h6' fontSize='14px'>{ moment().format('MM/DD/YY')}</Typography>
       
      // }
      
    >
    <Grid container alignItems={'center'}>
      <Grid item xs={12} mb={1} style={{ fontWeight: 600 }}></Grid>
      <Grid item lg={6}>
        <TypographyStyled variant='body1' marginBottom={1} sx={{ color: theme.palette.accent.main}}>Contribution to Total Findings</TypographyStyled>
      </Grid>
      <Grid item lg={6}>
        <Box style={{ marginTop: '-25px', marginBottom: '-25px'}}><BarChart color={theme.palette.accent.main} percentage={77.5} chartWidth="130" chartHeight="130" chartLableFonrSize="16px" /></Box>
      </Grid>
    </Grid>
    <Box mt={4}></Box>
    <NumberData data={data} />
	</DashboardCard>
  )
}

export default AuditTime;
