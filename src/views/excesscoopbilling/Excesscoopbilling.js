import { Grid, Box, Typography, styled, Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import Disputed from './components/Disputed';
import EfficencyAssesment from './components/EfficencyAssesment';
import GranularAnalysis from './components/GranularAnalysis';
import Header from '../components/pages/Header';
import Breadcrumb from '../components/pages/Breadcrumb';
import Impactoverview from './components/Impactoverview';
import JobProgress from './components/JobProgress';
import RecentTransactions from './components/RecentTransactions';
import RecoupedAmount from './components/RecoupedAmount';
import WinRate from './components/WinRate';
import YearlyTrend from '../components/pages/YearlyTrend';
import DashboardCard from '../../components/shared/DashboardCard';
import piggy from "src/assets/images/piggy-bank.gif";
import { useTheme } from "@emotion/react";
import Update from './components/Update';
import eventEmitter from '../../eventEmitter';
import config from '../../../config';
import Chart from 'react-apexcharts';

const Excesscoopbilling = () => {
  const TypographyStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
  }));
  const theme = useTheme();
  const [totalNetOff, setTotalNetOff] = useState(null);
  const BASE_URL = config.UniUrl;
  const secondary = theme.palette.success.main;
  const success = theme.palette.success.exrtaDark;
  const errorlight = '#fdede8';

  // chart
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
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityTo: 0.2,
        stops: [50, 90, 100]
      }
    },
    marker: {
      show: false
    },
    tooltip: {
      enabled: false,
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };

  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [25, 66, 20, 40, 12, 58, 20],
    },
  ];

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        const vendorId = sessionStorage.getItem('selectedVendorId');
        if (token && vendorId) {
          // const response = await fetch(`http://16.170.22.123:8082/overbilling/getSummaryByVendorId/${vendorId}`, {
          const response = await fetch(`${BASE_URL}/overbilling/getSummaryByVendorId/${vendorId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await response.json();

      
    

          // Calculate total net off based on API response
          let totalOverbilling = 0;
          let totalRefund = 0;
          data.data.forEach(item => {
            totalOverbilling += parseFloat(item.overbillIdentified);
            totalRefund += item.previousRefund !== null ? parseFloat(item.previousRefund) : 0;
          });
          const totalNetOff = (totalOverbilling - totalRefund).toFixed(2);
          setTotalNetOff(totalNetOff);

          // Store the net-off value in session storage
          sessionStorage.setItem("totalNetOff", totalNetOff);
        } else {
          console.error('Token or vendorId not found in sessionStorage');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    // Add event listener for vendor selection change
    const vendorChangeListener = (vendorId) => {
      // console.log("Vendor ID changed:", vendorId);
      fetchData();
    };

    eventEmitter.on("vendorSelected", vendorChangeListener);

    // Cleanup function to remove event listener
    return () => {
      eventEmitter.off("vendorSelected", vendorChangeListener);
    };

  }, []);

  return (
    <PageContainer title="Excess Coop Billing">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumb titles={['Excess Coop Billing']} />
        </Grid>

        <Grid item xs={12}>
          <Header title='Excess Coop Billing' />
        </Grid>

        <Grid item xs={12} lg={8}>
          <Grid container spacing={2} marginBottom={2}>
            <Grid item xs={12} lg={6}>
              <Box style={{ position: 'relative', height: '100%', minHeight: '200px' }}>
                <DashboardCard title={
                  <TypographyStyled variant='h5' sx={{ color: "#f19c53" }}>Finding Amount</TypographyStyled>
                }>
                  <Grid container spacing={3}>
                    <Grid item>
                      <TypographyStyled variant='h2' sx={{ color: "#000000" }}>
                        ${new Intl.NumberFormat().format(totalNetOff)}
                      </TypographyStyled>
                    </Grid>
                    <Grid item>
                      <Chart options={optionscolumnchart} series={seriescolumnchart} type="area" style={{ position: 'absolute', right: '25px', maxWidth: '180px', top: "98px" }} className="static-chart" />
                    </Grid>
                  </Grid>
                </DashboardCard>
              </Box>
            </Grid>
            <Grid item xs={12} lg={6}>
              <YearlyTrend />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Disputed />
            </Grid>
            <Grid item xs={12} lg={6}>
              <RecoupedAmount />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={4} style={{ position: 'relative' }}>
          <Impactoverview />
        </Grid>
        <Grid item xs={12} lg={6}>
          <GranularAnalysis />
        </Grid>
        <Grid item xs={12} lg={6}>
          <EfficencyAssesment />
        </Grid>
        <Grid item xs={12} lg={60}>
          <WinRate />
        </Grid>
        {/* <Grid item xs={12} lg={6}>
          <Impactoverview />
        </Grid> */}
        {/* <Grid item xs={12} lg={6}>
          <DashboardCard>
            <Stack direction='row' spacing={1}>
              <RecentTransactions />
              <Update />
            </Stack>
          </DashboardCard>
        </Grid> */}

        <Grid item xs={12}>
          <JobProgress />
        </Grid>
      </Grid>
    </PageContainer>
  );
}

export default Excesscoopbilling;



