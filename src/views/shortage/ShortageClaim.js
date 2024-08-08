/*----------------------------------------------------------------- My Code 2 ------------------------------------------------------------------*/




import {
  Grid,
  Typography,
  Box,
  styled,
  Button,
  Avatar,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DashboardCard from "../../components/shared/DashboardCard";
import Breadcrumb from "../components/pages/Breadcrumb";
import Header from "../components/pages/Header";
import YearlyTrend from "./components/YearlyTrend";
import PageContainer from "../../components/container/PageContainer";
import ShortageTable from "../components/pages/ShortageTable";
import FinopsTable from "../components/pages/FinopsTable";
import RangeChart from "./components/RangeChart";
import { useTheme } from "@emotion/react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import { Link } from "react-router-dom";
import {
  IconThumbUp,
  IconMessageExclamation,
  IconCoinOff,
} from "@tabler/icons-react";
import BarChart from "../components/pages/Barchart";
import axios from "axios";
import moment from "moment";
import CustomStepper from "../components/pages/CustomStepper";
import NumberData from "./components/NumberData";
import eventEmitter from "../../eventEmitter";
import config from "../../../config";
import RangeChart1 from "./components/RangeChart1";

const ShortageClaim = () => {
  const theme = useTheme();
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [totalDisputed, setTotalDisputed] = useState(0);
  const [pendingWithAmazon, setPendingWithAmazon] = useState(0);
  const [totalDisputedDeniedAmt, setTotalDisputedDeniedAmt] = useState(0);
  const [shortageClaim, setShortageClaim] = useState(0);
  const [hoursSaved, setHoursSaved] = useState("");
  const [resourcesSaved, setResourcesSaved] = useState("");
  const [amountSaved, setAmountSaved] = useState("");
  const BASE_URL = config.UniUrl;
  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const selectedVendorId = sessionStorage.getItem("selectedVendorId");
  const [selectedPayeecodeOption, setSelectedPayeecodeOption] = useState("");
  const [payeecodeOptions, setPayeecodeOptions] = useState([]);
  const [currentStage, setCurrentStage] = useState(null);
  const [selectedYear, setSelectedYear] = useState("2023");

  const [account, setAccount] = useState({ accountName: "", stage: "0" });
  const [minPaymentDueDate, setMinPaymentDueDate] = useState("");
  const [maxPaymentDueDate, setMaxPaymentDueDate] = useState("");
  const [pendingWithAmazonPercentage, setPendingWithAmazonPercentage] =
    useState(0);
  const [currentProgress, setCurrentProgress] = useState(null);

  const StyledSelect = styled(Select)(({ theme }) => ({
    width: '150px', // Adjust width as needed
    height: '40px', // Adjust height as needed
    marginLeft: '10px', // Adjust left margin
    marginTop: '12px',
    backgroundColor: "#5c84c3",
    color: "white", 
    marginRight: '10px', // Adjust right margin
    [theme.breakpoints.down('sm')]: {
        width: '150px', // Adjust width for smaller screens if necessary
    },
}));

  useEffect(() => {
    const fetchData = (vendorId) => {
      const token = sessionStorage.getItem("token");
      const selectedVendorId = sessionStorage.getItem("selectedVendorId");

      /*-----------------------------------------------------Approved Amount API----------------------------------------------------------------*/

      axios
        .get(
          //`http://16.170.22.123:8082/overbilling/getApprovedAmount?vendorIds=${selectedVendorId}&disputeType=Shortage`,
          `${BASE_URL}/overbilling/getApprovedAmount?vendorIds=${selectedVendorId}&disputeType=Shortage`,
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

      /*---------------------------------------------------------Total Disputed API-------------------------------------------------------------*/

      axios
        .get(
          //`http://16.170.22.123:8082/overbilling/getTotalDisputed?vendorIds=${selectedVendorId}&disputeType=Shortage`,
          `${BASE_URL}/overbilling/getTotalDisputed?vendorIds=${selectedVendorId}&disputeType=Shortage`,
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

      /*-------------------------------------------------Pending With Amazon API-----------------------------------------------------------------*/

      axios
        .get(
          //`http://16.170.22.123:8082/overbilling/getPendingWithAmazon?vendorIds=${selectedVendorId}&disputeType=Shortage`,
          `${BASE_URL}/overbilling/getPendingWithAmazon?vendorIds=${selectedVendorId}&disputeType=Shortage`,
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

          // Calculate percentage once both totalDisputed and pendingWithAmazon are available

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

      /*------------------------------------------------------Total Denied API-------------------------------------------------------------------*/

      axios
        .get(
          //`http://16.170.22.123:8082/shortage/getTotalDisputedDeniedAmt?vendorIds=${selectedVendorId}&disputeType=Shortage`,
          `${BASE_URL}/shortage/getTotalDisputedDeniedAmt?vendorIds=${selectedVendorId}&disputeType=Shortage`,
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

      /*---------------------------------------------------Impact OverView API------------------------------------------------------------------*/

      axios
        .get(
          //`http://16.170.22.123:8082/overbilling/getImpactOverview?vendorId=${selectedVendorId}&pageName=Shortage`,
          `${BASE_URL}/overbilling/getImpactOverview?vendorId=${selectedVendorId}&pageName=Shortage`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const impactData = response.data.data[0]; // Assuming only one data object is returned
          if (impactData) {
            setHoursSaved(impactData.hoursSaved);
            setResourcesSaved(impactData.resourceSaved);
            setAmountSaved(impactData.amountSaved);
          } else {
            // If no data available, set values to 0
            setHoursSaved("-");
            setResourcesSaved("-");
            setAmountSaved("-");
          }
        })

        .catch((error) => {
          console.error("Error fetching impact overview data:", error);
        });

     

      /*--------------------------------------------------Shortage Claim Findings API-----------------------------------------------------------*/

      axios
        .get(
          `${BASE_URL}/shortage/getShortageClaimFinding?vendorId=${selectedVendorId}&batchStatus=CURRENT`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const shortageClaimValue = response.data.data.value;

          // Check if the value is defined and not null
          if (shortageClaimValue !== undefined && shortageClaimValue !== null) {
            // Use the absolute value of the shortage claim value
            const absoluteShortageClaim = Math.abs(shortageClaimValue);

            // Format the absolute value to a string with two decimal places
            const shortageClaimString = absoluteShortageClaim.toFixed(2);

            // Set the shortage claim value as it is
            setShortageClaim(shortageClaimString);
          } else {
            // If the value is not defined or null, set the shortage claim as "0.00"
            setShortageClaim("0.00");
          }
        })
        .catch((error) => {
          console.error("Error fetching Shortage Claim Amount:", error);
        });

      /*--------------------------------------------------Payement Due Date API-----------------------------------------------------------*/

      axios
        .get(
          `${BASE_URL}/shortage/getAggrShortageSummByuploadId?vendorId=${selectedVendorId}&batchStatus=CURRENT`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const { minPaymentDueDate, maxPaymentDueDate } = response.data.data;

          const formatDate = (dateString) => {
            if (!dateString) return "N/A"; // Handle null or undefined values
            const date = new Date(dateString);
            return `${date.getMonth() + 1}/${date.getDate()}/${date
              .getFullYear()
              .toString()
              .slice(-2)}`;
          };

          setMinPaymentDueDate(formatDate(minPaymentDueDate));
          setMaxPaymentDueDate(formatDate(maxPaymentDueDate));
        })
        .catch((error) => {
          console.error("Error fetching Payment Due Dates:", error);
          setMinPaymentDueDate("N/A");
          setMaxPaymentDueDate("N/A");
        });
    };

    /*------------------------------------------------------Payee code API-------------------------------------------------------------------------*/




    const token = sessionStorage.getItem("token");

    axios
      .get(
        `${BASE_URL}/shortage/getPayeeCodeDD?vendorId=${selectedVendorId}&batchStatus=CURRENT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const payeecodeOptions = response.data.data || [];
        setPayeecodeOptions(payeecodeOptions);

        // Retrieve selected payee code from sessionStorage
        const initialSelectedPayeecode = sessionStorage.getItem("selectedPayeecodeOption");
        
        // Set selected payee code to the first option if it's not already set");
        // setSelectedPayeecodeOption(initialSelectedPayeecode || payeecodeOptions[0] || "

        // Always select the first payee code option if available
        setSelectedPayeecodeOption(payeecodeOptions.length > 0 ? payeecodeOptions[0] : "");

        console.log("Payee code options fetched:", payeecodeOptions);
      })
      .catch((error) => {
        console.error("Error fetching payeecode options:", error);
        setPayeecodeOptions([]);
      });


    fetchData();

    const handleVendorSelected = (vendorId) => {
      fetchData(vendorId);
    };

    const initialVendorId = sessionStorage.getItem("selectedVendorId");
    if (initialVendorId) {
      fetchData(initialVendorId);
    }

    eventEmitter.on("vendorSelected", handleVendorSelected);

    return () => {
      eventEmitter.off("vendorSelected", handleVendorSelected);
    };
  }, [selectedVendorId]);

  const handlePayeecodeOptionChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedPayeecodeOption(selectedOption);
    sessionStorage.setItem("selectedPayeecodeOption", selectedOption);

    // Fetch stages for the selected payee code
    fetchCurrentProgress(selectedOption);
  };

  /*-------------------------------------------------Current Progress & Stepper API------------------------------------------------------------*/

  const fetchCurrentProgress = (payeeCode) => {
    const token = sessionStorage.getItem("token");
    axios
      .get(
        `${BASE_URL}/shortage/getCurrentProgress?vendorId=${selectedVendorId}&batchStatus=CURRENT&payeeCode=${payeeCode}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("API Response:", response.data); // Log the entire response object

        const { status, data } = response.data;

        if (status === "SUCCESS") {
          if (selectedVendorId === "5") {
            setCurrentStage(8);
          } else if (
            !data ||
            data.length === 0 ||
            data[0] === null ||
            data[0] === 0
          ) {
            setCurrentStage(1); // Fallback to stage 1 if data is not available
          } else {
            const stageNumber = parseInt(data[0].split("_")[1]); // Extract the stage number from "Stage_X"
            setCurrentStage(stageNumber);
          }
        } else {
          console.error("Failed to fetch current progress");
          setCurrentStage(1); // Fallback to stage 1 in case of failure or empty data
        }
      })
      .catch((error) => {
        console.error("Error fetching current progress data:", error);
        setCurrentStage(1); // Fallback to stage 1 in case of error
      });
  };

  useEffect(() => {
    fetchCurrentProgress(selectedPayeecodeOption);
  }, [selectedVendorId, selectedPayeecodeOption]);

  useEffect(() => {
    const stage =
      selectedVendorId === "5"
        ? "8"
        : currentStage !== null
        ? currentStage.toString()
        : "0";
    const updatedAccount = {
      accountName: selectedVendorId,
      stage: stage,
    };
    setAccount(updatedAccount); 
    // console.log("Account object updated:", updatedAccount);
  }, [currentStage, selectedVendorId]);

  const data = [
    {
      body: "Total Hours",
      number: `${hoursSaved} Hrs`,
      icon: "IconClock",
      avatarBackgroundColor: theme.palette.success.extrDark,
      numberColor: "#000000",
    },
    {
      body: "Amount Saved",
      number: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amountSaved)}`,
      icon: "IconCurrencyDollar",
      avatarBackgroundColor: theme.palette.accent.main,
      numberColor: "#000000",
    },
    {
      body: "FTE Saved/week",
      number: `${resourcesSaved} ${resourcesSaved === 1 ? "FTE" : "FTE's"}`,
      icon: "IconRecords",
      avatarBackgroundColor: theme.palette.primary.light,
      numberColor: "#000000",
    },
  ];

  // Styled components
  const ButtonStyled = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.contrast,
    border: "1px solid",
    borderColor: theme.palette.primary.contrast,
    color: theme.palette.primary.contrastText,
    fontSize: "10px",
    padding: "2px 6px",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderColor: theme.palette.primary.main,
    },
  }));

  const TypographyPayment = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
    marginBottom: "10px",
  }));

  const ClaimCard = styled(Box)(({ theme }) => ({
    position: "relative",
    minHeight: "200px",
    height: "100%",
  }));

  const handlePayeeCodeButtonClick = () => {
    setUploadDialogOpen(true);
  };

  const handleCloseUploadDialog = () => {
    setUploadDialogOpen(false);
  };

  /*------------------------------------------------------Calculating the WinRate----------------------------------------------------------------*/

  const approvedClean = parseFloat(approvedAmount.toString().replace(/,/g, ""));
  const disputedClean = parseFloat(totalDisputed.toString().replace(/,/g, ""));
  const Rate = disputedClean > 0 ? (approvedClean / disputedClean) * 100 : 0;
  sessionStorage.setItem("winRate", Rate.toFixed(2));
  // console.log(`Win Rate: ${Rate.toFixed(2)}%`); // Debugging log
  
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
};

useEffect(() => {
    // Implement data fetching logic here based on selectedYear
}, [selectedYear]);

  return (
    <PageContainer title="Shortage Claim">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Shortage Claim"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="Shortage Claim" />
        </Grid>

        <Grid item xs={12} my={1}>
          <Typography variant="h3">
            Bulk Shortage Dispute - Historical
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3}>
              <DashboardCard
                title={
                  <Typography
                    variant="h4"
                    sx={{ color: "#1c3c70" }}
                  >
                    Shortage Claim Finding
                  </Typography>
                }
              >
                <Grid container spacing={4}>
                  <Grid item xs={12}>
                    {selectedVendorId === "5" ? (
                      <Typography variant="h3">
                        <b>
                          $
                          {new Intl.NumberFormat().format(
                            parseFloat(shortageClaim)
                          )}{" "}
                        </b>
                      </Typography>
                    ) : (
                      <Typography variant="h3">
                        <b>
                          $
                          {new Intl.NumberFormat().format(
                            parseFloat(shortageClaim)
                          )}{" "}
                        </b>
                      </Typography>
                    )}
                  </Grid>

                  <Grid item xs={12}>
                    <TypographyPayment variant="h6" color="#1c3c70">
                      Payment Due Date:
                    </TypographyPayment>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Typography
                          variant="body1"
                          style={{
                            color: "#000000",
                            fontWeight: 600,
                          }}
                        >
                          {selectedVendorId === "5"
                            ? moment("01 January 2021").format("MM/DD/YY")
                            : minPaymentDueDate}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          style={{
                            color: "#000000",
                            fontWeight: 600,
                          }}
                        >
                          To
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          style={{
                            color: "#000000",
                            fontWeight: 600,
                          }}
                        >
                          {selectedVendorId === "5"
                            ? moment("30 Nov 2023").format("MM/DD/YY")
                            : maxPaymentDueDate}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>
            <Grid item xs={12} lg={3.6}>
              <YearlyTrend />
            </Grid>

            <Grid item xs={12} lg={2}>
              <DashboardCard
                title={
                  <Typography
                    variant="h4"
                    sx={{
                      color: "#245aa0",
                      textAlign: "center",
                    }}
                  >
                    Current Stage
                  </Typography>
                }
              >
                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <Typography
                      variant="h3"
                      sx={{
                        color:
                          selectedVendorId === "5"
                            ? 
                            "#000000"
                            : "#000000",
                        textAlign: "center",
                      }}
                      marginBottom={1}
                    >
                      {selectedVendorId === "5"
                        ? "Stage: 8"
                        : currentStage !== null &&
                          currentStage >= 1 &&
                          currentStage <= 8
                        ? `Stage: ${currentStage}`
                        : "No Data available yet"}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Box style={{ marginTop: "-30px", marginLeft: "-13px" }}>
                      <BarChart
                        color= "#245aa0"
                        percentage={
                          selectedVendorId === "5"
                            ? 100
                            : currentStage !== null &&
                              currentStage >= 1 &&
                              currentStage <= 8
                            ? currentStage * 12.5
                            : 0
                        }
                        chartWidth="150"
                        chartHeight="130"
                        chartLableFonrSize="16px"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </DashboardCard>
            </Grid>

            <Grid item xs={12} lg={3.4}>
              <DashboardCard title={
          <Typography
            variant="h4"
            sx={{
              color: "#f19c53",
              lineHeight: "28px",
            }}
          >
            Impact Overview
          </Typography>
        } >

                <NumberData data={data} />
              </DashboardCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <ShortageTable />
            </Grid>



<Grid item xs={12} lg={6}>
      <DashboardCard>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4" mr={1}>
            Current Progress:
          </Typography>
          <Box ml={1}>
            <InputLabel htmlFor="payee-code-select">Select Payee Code</InputLabel>
            <Select
              value={selectedPayeecodeOption}
              onChange={handlePayeecodeOptionChange}
              variant="outlined"
              sx={{
                minWidth: "120px",
                width: "150px",
                height: "20px",
              }}
              inputProps={{
                name: "payee-code",
                id: "payee-code-select",
              }}
            >
              {payeecodeOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <CustomStepper account={account} />
      </DashboardCard>
    </Grid>



          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} my={2}>
              <Typography variant="h3">
                On Going Shortage Claim Dispute
              </Typography>
            </Grid>
            <Grid item sm={6} md={3}>
              <ClaimCard>
                <DashboardCard
                  title={<Typography variant="h4">Total Disputed</Typography>}
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
                  <Typography
                    variant="h2"
                    sx={{ color: "#2edd95" }}
                  >
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
                  title={
                    <Typography variant="h4">
                      Total Pending
                    </Typography>
                  }
                >
                  <Typography
                    variant="h2"
                    sx={{ color: "#f19c53" }}
                  >
                    ${pendingWithAmazon}
                  </Typography>
                  <Box
                    style={{
                      position: "absolute",
                      right: "10px",
                      bottom: "20px",
                    }}
                  >
                    <BarChart
                      color={"#f19c53"}
                      percentage={pendingWithAmazonPercentage}
                      // percentage={30}
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
                  <Typography
                    variant="h2"
                    sx={{ color: "#bf422a"  }}
                  >
                    ${totalDisputedDeniedAmt}
                  </Typography>
                  <IconCoinOff
                    size="60"
                    style={{
                      position: "absolute",
                      right: "25px",
                      bottom: "30px",
                      color: "#bf422a" ,
                    }}
                  />
                </DashboardCard>
              </ClaimCard>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <DashboardCard
            title={<Typography variant="h4">FinOps-Shortage Claim</Typography>}
          >
            <FinopsTable />
          </DashboardCard>
        </Grid>
      </Grid>
      <Dialog open={isUploadDialogOpen} onClose={handleCloseUploadDialog}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <input type="file" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUploadDialog}>Cancel</Button>
          <Button onClick={handleCloseUploadDialog}>Upload</Button>
        </DialogActions>
      </Dialog>

      
            <Grid item xs={12}>
					<Box display="flex" alignItems="center">
						<Typography variant='h6' marginLeft={109} marginTop={1}>Select period:</Typography>
						<StyledSelect
							value={selectedYear}
							onChange={handleYearChange}
							displayEmpty
							inputProps={{ 'aria-label': 'Select year or range' }}
						>
							<MenuItem value=""><b>All Years</b></MenuItem>
							<MenuItem value={2024}>2024</MenuItem>
							<MenuItem value={2023}>2023</MenuItem>
						</StyledSelect>
					</Box>
				</Grid>
      <Grid item xs={12} style={{ marginTop: "16px" }}>
                    <DashboardCard>
                        {selectedVendorId === "5" ? (
                            <RangeChart selectedYear={selectedYear} />
                        ) : (
                            <RangeChart1 selectedYear={selectedYear} />
                        )}
                    </DashboardCard>
                </Grid>
    </PageContainer>
  );
};

export default ShortageClaim;
