import React , {useEffect , useState} from "react";
import { Grid, Typography, styled, Box, Button, Stack } from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../components/pages/Breadcrumb";
import Header from "../components/pages/Header";
import DashboardCard from "../../components/shared/DashboardCard";
import {
  IconSearch,
  IconThumbUp,
  IconCoinOff,
  IconMessageExclamation,
  IconHourglassHigh
} from "@tabler/icons-react";
import { useTheme } from "@emotion/react";
import BarGraph from "./components/BarGraph";
import BarChart from "../components/pages/Barchart";
import SelectMonth from "../../layouts/full/header/SelectMonth";
import SelectYear from "../../layouts/full/header/SelectYear";
import SelectQtr from "../../layouts/full/header/SelectQtr";
import ChargesBackTable from "./components/ChargesBackTable";
import InfraTable from "./components/InfraTable";
import AsinTable from "./components/AsinTable";
import SelectStatus from "../../layouts/full/header/SelectStatus";
import AsniForm from "../../layouts/full/header/AsniForm";
import SelectIssue from "../../layouts/full/header/SelectIssue";
import SelectSubIssue from "../../layouts/full/header/SelectSubIssue";
import DonutChart from "../components/pages/DonutChart";
import eventEmitter from "../../eventEmitter";

const OpsChargeBack = () => {
  const theme = useTheme();
  const ClaimCard = styled(Box)(({ theme }) => ({
    position: "relative",
    minHeight: "200px",
    height: "100%",
  }));
  const priceSeries = [300200, 125220, 175000];

  const ButtonStyled = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.contrast,
    border: "1px solid",
    borderColor: theme.palette.primary.contrast,
    color: theme.palette.primary.contrastText,
    fontSize: "15px",
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

  const data3 = {
    series: [362356.00, 50000.00 , 30323.25 , 28687.78],
    labels: ['Incorrect Freight', 'Incorrect Code' , 'Incorrect Agreement' , 'Duplicate Agreement'],
    colors: ["#2edd95", "#f89c53" , "#5c84c3" , '#285a9e' ]
  };

  if (vendorId !== '5') {
    return (
      <PageContainer title="Dashboard Page">
        <Typography variant="h2" marginLeft={55} marginTop={30}>No data available</Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer title=" Opertaional Chargebacks">
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Operational Chargeback"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="Operational Chargeback" />
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={4}>
        <Grid item sm={6} md={3}>
          <ClaimCard>
            <DashboardCard
              title={<Typography variant="h4">Total Disputed</Typography>}
            >
              <Typography
                variant="h2"
                sx={{ color: theme.palette.primary.main }}
              >
                ${new Intl.NumberFormat().format(9765.65)}
              </Typography>
              <IconMessageExclamation
                size="60"
                style={{
                  position: "absolute",
                  right: "25px",
                  bottom: "30px",
                  color: theme.palette.primary.main,
                }}
              />
            </DashboardCard>
          </ClaimCard>
        </Grid>
        <Grid item sm={6} md={3}>
          <ClaimCard>
            <DashboardCard
              title={<Typography variant="h4">Total Approved</Typography>}
            >
              <Typography
                variant="h2"
                sx={{ color: "#2edd95" }}
              >
                ${new Intl.NumberFormat().format(2520.49)}
              </Typography>
              <IconThumbUp
                size="60"
                style={{
                  position: "absolute",
                  right: "25px",
                  bottom: "30px",
                  color: "#2edd95",
                }}
              />
            </DashboardCard>
          </ClaimCard>
        </Grid>
        <Grid item sm={6} md={3}>
          <ClaimCard>
            <DashboardCard
              title={<Typography variant="h4">Total Pending</Typography>}
            >
              <Typography
                variant="h2"
                sx={{ color: "#f19c53" }}
              >
                ${new Intl.NumberFormat().format(2532.49)}
              </Typography>
              <IconHourglassHigh
                size="60"
                style={{
                  position: "absolute",
                  right: "25px",
                  bottom: "30px",
                 color: "#f19c53",
                }}
              />
            </DashboardCard>
          </ClaimCard>
        </Grid>
        <Grid item sm={6} md={3}>
          <ClaimCard>
            <DashboardCard
              title={<Typography variant="h4">Total Denied</Typography>}
            >
              <Typography variant="h2" sx={{ color: "#bf422a" }}>
                ${new Intl.NumberFormat().format(4712.67)}
              </Typography>
              <IconCoinOff
                size="60"
                style={{
                  position: "absolute",
                  right: "25px",
                  bottom: "30px",
                  color: "#bf422a"
                }}
              />
            </DashboardCard>
          </ClaimCard>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="space-between" mb={4}>
        <Grid item xs={12} mt={1}>
          <ChargesBackTable />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="space-between" mb={4}>
        <Grid item xs={12} mt={1}>
          <InfraTable />
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="space-between">
        <Grid item xs={12} mb={3}>
          <Typography variant="h3">
            Operational Chargebacks - ASIN Level Split
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <DashboardCard>
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} lg={3}>
                <SelectYear />
              </Grid>
              <Grid item xs={12} lg={3}>
                <SelectMonth />
              </Grid>
              <Grid item xs={12} lg={3}>
                <SelectStatus />
              </Grid>
              <Grid item xs={12} lg={3}>
                <AsniForm />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={5}>
                <SelectIssue />
              </Grid>
              <Grid item xs={12} lg={5}>
                <SelectSubIssue />
              </Grid>
              <Grid item xs={12} lg={2}>
                <ButtonStyled>
                  <BoxStyled>search</BoxStyled>{" "}
                  <span className="btn-indicator"></span>{" "}
                  <BoxStyled>
                    <IconSearch
                      size="18"
                      style={{ margin: "auto", verticalAlign: "middle" }}
                    />
                  </BoxStyled>
                </ButtonStyled>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} mt={1}>
          <DashboardCard>
            <AsinTable />
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default OpsChargeBack;

