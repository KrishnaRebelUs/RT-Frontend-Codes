import React, { useState, useEffect } from "react";
import {
  Box,
  styled,
  Typography,
  Avatar,
  Grid,
  Button,
  Divider,
  MenuItem,
  Select,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { Link } from "react-router-dom";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../components/pages/Breadcrumb";
import Header from "../components/pages/Header";
import DashboardCard from "../../components/shared/DashboardCard";
import {
  IconThumbUp,
  IconMessageExclamation,
  IconCoinOff,
} from "@tabler/icons-react";
import BarChart from "../components/pages/Barchart";
import FinopsTable from "./components/FinopsTable";
import axios from "axios";
import moment from "moment";
import RangeChart from "../components/pages/RangeChart";
import RangeChart1 from "../components/pages/RangeChart1";
import eventEmitter from "../../eventEmitter";
import config from "../../../config";

const PriceClaim = () => {
  const theme = useTheme();
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [totalDisputed, setTotalDisputed] = useState(0);
  const [pendingWithAmazon, setPendingWithAmazon] = useState(0);
  const [totalDisputedDeniedAmt, setTotalDisputedDeniedAmt] = useState(0);
  const [pendingWithAmazonPercentage, setPendingWithAmazonPercentage] =
    useState(0);
  const [selectedYear, setSelectedYear] = useState("2023");
  const selectedVendorId = sessionStorage.getItem("selectedVendorId");
  const BASE_URL = config.UniUrl;

  useEffect(() => {
    const fetchData = (vendorId) => {
      const token = sessionStorage.getItem("token");
      const selectedVendorId = sessionStorage.getItem("selectedVendorId");

/*-----------------------------------------------------------  API for Approved Amount ------------------------------------------------------*/
      axios
        .get(
          //`http://16.170.22.123:8082/overbilling/getApprovedAmount?vendorIds=${selectedVendorId}&disputeType=Price claim`,
          `${BASE_URL}/overbilling/getApprovedAmount?vendorIds=${selectedVendorId}&disputeType=Price claim`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setApprovedAmount(
            response.data.data.approvedAmount !== undefined
              ? parseFloat(response.data.data.approvedAmount)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "0"
          );
        })
        .catch((error) => {
          console.error("Error fetching approved amount:", error);
        });

/*-----------------------------------------------------------  API for Disputed Amount ------------------------------------------------------*/
      axios
        .get(
          //`http://16.170.22.123:8082/overbilling/getTotalDisputed?vendorIds=${selectedVendorId}&disputeType=Price claim`,
          `${BASE_URL}/overbilling/getTotalDisputed?vendorIds=${selectedVendorId}&disputeType=Price claim`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setTotalDisputed(
            response.data.data.totalDisputed !== undefined
              ? parseFloat(response.data.data.totalDisputed)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "0"
          );
          // response.data.data.totalDisputed.toLocaleString());
        })
        .catch((error) => {
          console.error("Error fetching total disputed amount:", error);
        });

/*-----------------------------------------------------------  API for Pending Amount  --------------------------------------------------------*/
      axios
        .get(
          //`http://16.170.22.123:8082/overbilling/getPendingWithAmazon?vendorIds=${selectedVendorId}&disputeType=Price claim`,
          `${BASE_URL}/overbilling/getPendingWithAmazon?vendorIds=${selectedVendorId}&disputeType=Price claim`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setPendingWithAmazon(
            response.data.data.pendingWithAmazon !== undefined
              ? parseFloat(response.data.data.pendingWithAmazon)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "0"
          );

          if (pendingWithAmazon !== null) {
            const percentage =
              totalDisputed > 0 ? (pendingWithAmazon / totalDisputed) * 100 : 0;
            // console.log("Percentage is " + percentage);
            setPendingWithAmazonPercentage(percentage);
          }
        })
        .catch((error) => {
          console.error("Error fetching amount pending with Amazon:", error);
        });

/*-----------------------------------------------------------  API for Denied Amount ------------------------------------------------------*/
      axios
        .get(
          //`http://16.170.22.123:8082/shortage/getTotalDisputedDeniedAmt?vendorIds=${selectedVendorId}&disputeType=Price claim`,
          `${BASE_URL}/shortage/getTotalDisputedDeniedAmt?vendorIds=${selectedVendorId}&disputeType=Price claim`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          setTotalDisputedDeniedAmt(
            response.data.data.deniedAmount !== undefined
              ? parseFloat(response.data.data.deniedAmount)
                  .toFixed(2)
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : "0.00"
          );
        })
        .catch((error) => {
          console.error("Error fetching total disputed denied amount:", error);
        });
    };

    // Update data when vendorId changes
    const handleVendorSelected = (vendorId) => {
      fetchData(vendorId);
    };

    // Initial data fetch
    const initialVendorId = sessionStorage.getItem("selectedVendorId");
    if (initialVendorId) {
      fetchData(initialVendorId);
    }

    eventEmitter.on("vendorSelected", handleVendorSelected);

    return () => {
      eventEmitter.off("vendorSelected", handleVendorSelected);
    };
  }, []);

  const ButtonStyled = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.extraLight,
    border: "1px solid",
    borderColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    fontSize: "13px",
    padding: "3px 8px",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  }));

  const StyledSelect = styled(Select)(({ theme }) => ({
    width: "150px", 
    height: "40px", 
    marginLeft: "10px", 
    backgroundColor: "#5c84c3",
    color: "white",
    marginRight: "10px", 
    [theme.breakpoints.down("sm")]: {
      width: "150px", 
    },
  }));

  const ClaimCard = styled(Box)(({ theme }) => ({
    position: "relative",
    minHeight: "200px",
    height: "100%",
  }));

  // Calculate and store win rate
  const approvedClean = parseFloat(approvedAmount.toString().replace(/,/g, ""));
  const disputedClean = parseFloat(totalDisputed.toString().replace(/,/g, ""));
  const winRate = disputedClean > 0 ? (approvedClean / disputedClean) * 100 : 0;
  sessionStorage.setItem("winRate", winRate.toFixed(2));
  // console.log(`Win Rate: ${winRate.toFixed(2)}%`); // Debugging log

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  useEffect(() => {
    // Implement data fetching logic here based on selectedYear
  }, [selectedYear]);

  return (
    <PageContainer title="Price Claim">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Price Claim"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="Price Claim" />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} my={2}>
              <Typography variant="h3">Price Claim Dispute</Typography>
            </Grid>
            <Grid item sm={6} md={3}>
              <ClaimCard>
                <DashboardCard
                  title={
                    <Typography variant="h4" color="#000000">
                      Total Disputed
                    </Typography>
                  }
                >
                  <Typography
                    variant="h2"
                    sx={{ color: theme.palette.primary.main }}
                  >
                    ${totalDisputed}
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
                  <Typography variant="h2" sx={{ color: "#2edd95" }}>
                    ${approvedAmount}
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
                  <Typography variant="h2" sx={{ color: "#f19c53" }}>
                    {/* ${new Intl.NumberFormat().format(538941)} */}$
                    {pendingWithAmazon}
                  </Typography>
                  <Box
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "20px",
                    }}
                  >
                    <BarChart
                      color={theme.palette.accent.main}
                      percentage={pendingWithAmazonPercentage}
                      chartWidth="130"
                      chartHeight="120"
                      chartLableFonrSize="16px"
                    />
                  </Box>
                </DashboardCard>
              </ClaimCard>
            </Grid>
            <Grid item sm={6} md={3}>
              <ClaimCard>
                <DashboardCard
                  title={<Typography variant="h4">Total Denied</Typography>}
                >
                  <Typography variant="h2" sx={{ color: "#bf422a" }}>
                    ${totalDisputedDeniedAmt}
                  </Typography>
                  <IconCoinOff
                    size="60"
                    style={{
                      position: "absolute",
                      right: "25px",
                      bottom: "30px",
                      color: "#bf422a",
                    }}
                  />
                </DashboardCard>
              </ClaimCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DashboardCard
            title={<Typography variant="h4">Price Claim</Typography>}
          >
            <FinopsTable />
          </DashboardCard>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" alignItems="center">
            <Typography variant="h6" marginLeft={109}>
              Select period:
            </Typography>
            <StyledSelect
              value={selectedYear}
              onChange={handleYearChange}
              displayEmpty
              inputProps={{ "aria-label": "Select year or range" }}
            >
              <MenuItem value="">
                <b>All Years</b>
              </MenuItem>
              <MenuItem value={2024}>2024</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
            </StyledSelect>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <DashboardCard>
            {selectedVendorId === "5" ? (
              <RangeChart selectedYear={selectedYear} />
            ) : (
              <RangeChart1 selectedYear={selectedYear} />
            )}
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default PriceClaim;
