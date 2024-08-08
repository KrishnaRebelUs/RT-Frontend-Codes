import React, { useState, useEffect } from "react";
import {
  styled,
  Stack,
  Typography,
  Box,
  Grid,
  Avatar,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
} from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import user from "../../assets/images/profile/male3.png";
import { useTheme } from "@emotion/react";
import DonutChart from "../components/pages/DonutChart";
import {
  IconTimeDuration5,
  IconPercentage,
  IconCurrencyDollar,
  IconSectionSign,
  IconTrendingDown3,
  IconCircleDashed,
  IconCheck,
  IconExclamationCircle,
  IconSearch,
  IconGridDots,
  IconOctagon,
  IconMoneybag,
  IconZoomMoney,
  IconRotate2,
  IconTruckDelivery,
  IconSpeakerphone,
  IconCoins,
  IconHourglassHigh,
  IconBrandCakephp,
  IconMessageExclamation,
  IconSettings2,
  IconX,
} from "@tabler/icons-react";
import NumberData from "../dashboard/components/NumberData";
import WinrateChart from "../components/pages/WinrateChart";
import eventEmitter from "../../eventEmitter";
import YearlyTrend from "../dashboard/components/YearlyTrend";
import RecentTransactions from "./components/RecentTransactions";
import Update from "./components/Update";
import axios from "axios";
import config from "../../../config";

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  backgroundColor: "#ecf2ff",
  borderRadius: "7px",
  "& svg": {
    color: theme.palette.primary.main,
  },
}));

const AvatarImgStyled = styled(Avatar)(({ theme }) => ({
  height: "100px",
  width: "100px",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ddd",
  padding: "8px",
  color: "black",
}));

const StyledTableHeaderCell = styled(TableCell)(({ theme }) => ({
  border: "1px solid #ddd",
  backgroundColor: "#285a9e",
  color: "white",
  fontWeight: "bold",
  padding: "8px",
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: "#f0f5ff",
  },
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
}));


const createData = (serial, detail) => {
  return { serial, detail };
};

const rows = [
  createData(1, "US-Demo Account"),
  createData(2, "US-Demo Account"),
  createData(3, "US-Demo Account"),
];

const BarChartStyled = styled(Box)(({ theme }) => ({
  marginTop: "-25px",
  marginBottom: "-25px",
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "red",
  color: "white",
  '&:hover': {
    backgroundColor: "darkred",
  },
  borderRadius: '4px', 
  padding: '4px', 
  width: '24px',
  height: '24px',
}));

const Dashboard = () => {
  const theme = useTheme();
  const BASE_URL = config.UniUrl;

  /*----------------- Impact OverView -----------------*/
  const [hoursSaved, setHoursSaved] = useState("");
  const [resourcesSaved, setResourcesSaved] = useState("");
  const [amountSaved, setAmountSaved] = useState("");


  /*------------------- Excess CoOp -------------------*/

  const [totalNetOff, setTotalNetOff] = useState(null);
  const [totalDisputedAmount, setTotalDisputedAmount] = useState(null);
  const [recoupedAmount, setRecoupedAmount] = useState(0.0);

  /*-------------  Shortage Claim ---------------------*/
  const [shortageClaim, setShortageClaim] = useState(0);
  const [sumOutstandingBalanceAmount, setSumOutstandingBalanceAmount] = useState(0);
  const [counterOfferAmount, setCounterOfferAmount] = useState(0);
  const [settlementOffer, setSettlementOffer] = useState(0);
  const [settlementOfferRate, setSettlementOfferRate] = useState(0);

  /*-------- Price Claim -------------*/
  const [approvedAmount, setApprovedAmount] = useState(0);
  const [totalDisputed, setTotalDisputed] = useState(0);
  const [pendingWithAmazon, setPendingWithAmazon] = useState(0);
  const [approvedRate, setApprovedRate] = useState(0);
  

  /*---------- Missed Invoicing -------------------*/

  const [irFindingData, setIrFindingData] = useState(null);
  const [irClaimData, setIrClaimData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recoveryAmount, setRecoveryAmount] = useState(null);
  const [recoupedRate, setRecoupedRate] = useState(null);
  const [error, setError] = useState(false); 
  
 /*--------------------------------------------------*/


  const [userName, setUserName] = useState(""); 
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };




  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const selectedVendorId = sessionStorage.getItem("selectedVendorId");

        if (!token || !selectedVendorId) {
          throw new Error("Token or vendorId not found in sessionStorage");
        }



      /*---------------------------------------------------------- Impact Overview API  --------------------------------------------------------*/

      axios
      .get(
        `http://35.153.186.247:8082/dashboard/getDashboardImpactOverview?vendorId=${selectedVendorId}`,
        // `${BASE_URL}/overbilling/getImpactOverview?vendorId=${selectedVendorId}&pageName=Overbilling`,
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
      } catch (error) {
        console.error("Error fetching impact data:", error);
      }
      
    };

    fetchImpactData();

    const handleVendorSelected = (vendorId) => {
      fetchImpactData(vendorId);
    };

    eventEmitter.on("vendorSelected", handleVendorSelected);

    return () => {
      eventEmitter.events = {};
    };
  }, []);


/*---------------------------------------------------------- Excess Coop  --------------------------------------------------------*/

// 1. Findings 


useEffect(() => {
  // Fetch data from API
  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem('token');
      const vendorId = sessionStorage.getItem('selectedVendorId');
      if (token && vendorId) {
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
    fetchData();
  };

  eventEmitter.on("vendorSelected", vendorChangeListener);

  // Cleanup function to remove event listener
  return () => {
    eventEmitter.off("vendorSelected", vendorChangeListener);
  };

}, []);


// 2. Disputed 

useEffect(() => {
  const fetchTotalDisputedAmount = () => {
    try {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      if (!token || !vendorId) {
        throw new Error("Token or vendorId not found in sessionStorage");
      }

      const apiUrl = `${BASE_URL}/overbilling/getTotalDisputed?vendorIds=${vendorId}&disputeType=Coop`;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      axios
        .get(apiUrl, config)
        .then((response) => {
          setTotalDisputedAmount(response.data.data.totalDisputed);
        })
        .catch((error) => {
          console.error("Error fetching total disputed amount:", error);
        });
    } catch (error) {
      console.error("Error fetching total disputed amount:", error);
    }
  };

  fetchTotalDisputedAmount();

  const handleVendorSelected = (vendorId) => {
    fetchTotalDisputedAmount();
  };

  eventEmitter.on("vendorSelected", handleVendorSelected);

  // Cleanup function to remove event listener
  return () => {
    eventEmitter.events = {};
  };
}, []);


// 3. Recouped Amount 

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
}, []);



/*--------------------------------------------------------- Price Claim API -----------------------------------------------------------*/

useEffect(() => {
  const fetchData = (vendorId) => {
    const token = sessionStorage.getItem("token");
    const selectedVendorId = sessionStorage.getItem("selectedVendorId");

/*-----------------------------------------------------------  API for Approved Amount ------------------------------------------------------*/
axios
      .get(
        `${BASE_URL}/overbilling/getApprovedAmount?vendorIds=${selectedVendorId}&disputeType=Price claim`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const amount = response.data.data.approvedAmount !== undefined
          ? parseFloat(response.data.data.approvedAmount)
          : 0;
        setApprovedAmount(amount.toFixed(2));
      })
      .catch((error) => {
        console.error("Error fetching approved amount:", error);
      });

/*-----------------------------------------------------------  API for Disputed Amount ------------------------------------------------------*/
axios
      .get(
        `${BASE_URL}/overbilling/getTotalDisputed?vendorIds=${selectedVendorId}&disputeType=Price claim`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const amount = response.data.data.totalDisputed !== undefined
          ? parseFloat(response.data.data.totalDisputed)
          : 0;
        setTotalDisputed(amount.toFixed(2));
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
      })
      .catch((error) => {
        console.error("Error fetching amount pending with Amazon:", error);
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

/*---------------------------------------------- Useeffect for Price Claim Approved Rate % -----------------------------------------------------*/

useEffect(() => {
  const approvedAmountNumber = parseFloat(approvedAmount);
  const totalDisputedNumber = parseFloat(totalDisputed);

  if (totalDisputedNumber > 0) {
    const rate = (approvedAmountNumber / totalDisputedNumber) * 100;
    setApprovedRate(rate.toFixed(2));
  } else {
    setApprovedRate(0);
  }
}, [approvedAmount, totalDisputed]);




/*--------------------------------------------------Shortage Claim Findings API-----------------------------------------------------------*/


useEffect(() => {
  const fetchData = (vendorId) => {
    const token = sessionStorage.getItem("token");
    const selectedVendorId = sessionStorage.getItem("selectedVendorId");

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

        
        if (shortageClaimValue !== undefined && shortageClaimValue !== null) {
          
          const absoluteShortageClaim = Math.abs(shortageClaimValue);

          
          const shortageClaimString = absoluteShortageClaim.toFixed(2);

          
          setShortageClaim(shortageClaimString);
        } else {
          
          setShortageClaim("0.00");
        }
      })
      .catch((error) => {
        console.error("Error fetching Shortage Claim Amount:", error);
      });
  };

  const initialVendorId = sessionStorage.getItem("selectedVendorId");
  if (initialVendorId) {
    fetchData(initialVendorId);
  }

  const handleVendorSelected = (vendorId) => {
    fetchData(vendorId);
  };

  eventEmitter.on("vendorSelected", handleVendorSelected);

  return () => {
    eventEmitter.off("vendorSelected", handleVendorSelected);
  };
}, []);


  useEffect(() => {
    const nameFromStorage = sessionStorage.getItem('userName');
    if (nameFromStorage) {
      setUserName(nameFromStorage);
    }
  }, []);

/*-------------------------------------------------------- Shortage Claim Findings --------------------------------------------------------*/

useEffect(() => {
  const fetchData = (vendorId) => {
    const token = sessionStorage.getItem("token");
    const selectedVendorId = sessionStorage.getItem("selectedVendorId");

    if (!token || !selectedVendorId) {
      throw new Error("Token or vendorId not found in sessionStorage");
    }

    axios
      .get(
        `http://35.153.186.247:8082/shortage/getAggrShortageSummByuploadId?vendorId=${selectedVendorId}&batchStatus=CURRENT`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.data;

        setSumOutstandingBalanceAmount(data.sumOutstandingBalanceAmount !== null
          ? parseFloat(data.sumOutstandingBalanceAmount)
          : 0
        );

        setCounterOfferAmount(data.counterOfferAmount !== null
          ? parseFloat(data.counterOfferAmount)
          : 0
        );

        setSettlementOffer(data.settlementOffer !== null
          ? parseFloat(data.settlementOffer)
          : 0
        );
      })
      .catch((error) => {
        console.error("Error fetching shortage summary:", error);
      });
  };

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
}, []); 



/*--------------------------------------------- Settlement Acceptance Offer Rate ------------------------------------------------------*/

useEffect(() => {
  const shortageClaimNumber = parseFloat(shortageClaim);
  if (shortageClaimNumber > 0) {
    const rate = (settlementOffer / shortageClaimNumber) * 100;
    setSettlementOfferRate(rate.toFixed(2));
  } else {
    setSettlementOfferRate(0);
  }
}, [settlementOffer, shortageClaim]);


/*------------------------------------------------------  API for Missed Invoicing  ----------------------------------------------------------*/

/* 1. Shipped but not invoiced
   2. Claim Submitted
*/   

useEffect(() => {
  const token = sessionStorage.getItem("token");
  const vendorId = sessionStorage.getItem("selectedVendorId")

  if (vendorId) {
    // Fetch IR_FINDING data
    setLoading(true);
    axios
      .get(`http://16.170.22.123:8082/overbilling/getSummaryByType`, {
        params: {
          type: "IR_FINDING",
          vendorId: vendorId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const data = response.data;
        if (data.status === "SUCCESS" && data.data.length > 0) {


          // Set IR_FINDING data state
          setIrFindingData({ ...data.data[0]});
        } else {
          setIrFindingData(null);
        }
      })
      .catch((error) =>
        console.error("Error fetching IR_FINDING data:", error)
      )
      .finally(() => setLoading(false));
  }
}, []);

/*---------------------------------------------------------------------------------------------------------------------------------------------*/

useEffect(() => {
  const token = sessionStorage.getItem("token");
  const vendorId = sessionStorage.getItem("selectedVendorId")

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
}, []);


/*-------------------------------------------- Recouped Amount Missed Invoicing --------------------------------------------------------------*/


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
    setLoading(true); 
    fetchRecoveryAmount(vendorId);
  });

  
  return () => {
    eventEmitter.off('vendorSelected'); 
  };
}, [])

/*---------------------------------------------------------------- Recouped Rate -------------------------------------------------------------*/

useEffect(() => {
  if (recoveryAmount && irClaimData && irClaimData.overbillIdentified) {
    const rate = (recoveryAmount / irClaimData.overbillIdentified) * 100;
    setRecoupedRate(rate.toFixed(2));  // Round to 2 decimal places
  } else {
    setRecoupedRate(null);
  }
}, [recoveryAmount, irClaimData]);


  const data1 = {
    series: [202212.18, 1843291.52, 0, 700450.78],
    labels: [
      "Outstanding Balance",
      "Findings",
      "Counter Offer",
      "Final Settlement Offer",
    ],
    colors: ["#f89c53", "#285a9e", "#FFBB02", "#2edd95"], 
  };

  const data2 = {
    series: [1869.28, 781.52, 0],
    labels: ["Disputed", "Approved", "Pending"],
    colors: ["#285a9e", "#2edd95", "#f89c53"],
  };

  const data3 = {
    series: [137217.67, 133616.45, 81261.23],
    labels: ["Shipped but not invoiced", "Claim Submitted", "Recouped Amount"],
    colors: ["#f89c53", "#2edd95", "#285a9e"],
  };

  const data = [
    {
      body: "Total Hours saved",
      number: `${hoursSaved} Hrs`,
      icon: "IconClock",
      avatarBackgroundColor: "#2edd95",
      numberColor: "#000000",
    },
    {
      body: "Total Amount saved",
      number: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amountSaved)}`,
      icon: "IconCurrencyDollar",
      avatarBackgroundColor: "#245aa0",
      numberColor: "#000000",
    },
    {
      body: "Total FTE Saved/week",
      number: `${resourcesSaved} ${resourcesSaved === 1 ? "FTE" : "FTE's"}`,
      icon: "IconRecords",
      avatarBackgroundColor: "#ee8129",
      numberColor: "#000000",
    },
  ];

  const [vendorId, setVendorId] = useState(null);
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const updateVendorId = () => {
    const id = sessionStorage.getItem("selectedVendorId");
    setVendorId(id);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    
    updateVendorId();

    
    eventEmitter.on("vendorSelected", updateVendorId);

    
    return () => {
      eventEmitter.off("vendorSelected", updateVendorId);
    };
  }, []);

  if (vendorId !== "5") {
    return (
      <PageContainer title="Dashboard Page">
        <Typography variant="h2" marginLeft={55} marginTop={30}>
          No data available
        </Typography>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Dashboard Page">
      <Grid container spacing={2} mb={3}>
        <Grid item lg={5} xs={19} sx={{ height: "410px" }}>
          <DashboardCard>
            <Grid container justifyContent="space-between">
              <Grid item lg={12}>
                <Box>
                  <Stack direction="row" spacing={3} mb={5}>
                    <AvatarImgStyled>
                      <img
                        src={user}
                        alt="user-profile"
                        style={{ width: "100%" }}
                      />
                    </AvatarImgStyled>
                    <Box>
                      <Typography
                        variant="h4"
                        style={{ marginBottom: "2px", marginTop: "12px" }}
                      >
                        Welcome, {capitalizeFirstLetter(userName)}!
                        {/* Welcome, Pat Cummins! */}
                      </Typography>
                      <Typography
                        variant="body1"
                        style={{ marginTop: "12px", marginBottom: "2px" }}
                      >
                        US- Demo Account | US- Demo Account
                      </Typography>
                      <Typography
                        variant="h8"
                        style={{
                          marginBottom: "3px",
                          marginTop: "12px",
                          cursor: "pointer",
                          textDecoration: "underline",
                          color: "blue",
                        }}
                        onClick={handleClickOpen}
                      >
                        View Account Details
                      </Typography>
                    </Box>
                  </Stack>
                  <Divider style={{ marginTop: "-7px" }} />
                  <Box
                    sx={{
                      marginLeft: "22px",
                      width: "fit-content",
                      marginTop: 1.5,
                      marginBottom: 2,
                      color: theme.palette.accent.main,
                    }}
                  >
                    <Typography variant="h5">Total Impact Overview</Typography>
                  </Box>
                  <NumberData data={data} />
                </Box>
              </Grid>
            </Grid>
          </DashboardCard>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              Account Details
              <CloseButton onClick={handleClose}>
                <IconX />
              </CloseButton>
            </DialogTitle>
            <DialogContent sx={{  width: "400px" }}>
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <StyledTableHeaderCell sx={{ maxWidth: 25 }}>SL No.</StyledTableHeaderCell>
                      <StyledTableHeaderCell>Account Details</StyledTableHeaderCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <StyledTableRow key={row.serial}>
                        <StyledTableCell>{row.serial}</StyledTableCell>
                        <StyledTableCell>{row.detail}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </Dialog>
        </Grid>

        <Grid item xs={12} lg={7} sx={{ height: "410px" }}>
          <DashboardCard>
            <Stack direction="row" spacing={1}>
              <RecentTransactions />
              <Update />
            </Stack>
          </DashboardCard>
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={13} lg={4}>
          <DashboardCard
            title={<Typography variant="h3">Excess Coop</Typography>}
          >
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Grid item xs={12} lg={12}>
                <div style={{ marginTop: "34px", marginLeft: "100px" }}>
                  <BarChartStyled>
                    <WinrateChart
                      color="#2edd95"
                      // percentage={95.15}
                      percentage={
                        totalDisputedAmount !== null && totalDisputedAmount !== 0
                          ? (recoupedAmount / totalDisputedAmount * 100).toFixed(2)
                          : 0
                      }
                      chartHeight={150}
                      chartWidth={120}
                      chartLableFonrSize="20px"
                      transitionDuration="1.2s"
                    />
                  </BarChartStyled>
                </div>

                <Typography
                  variant="h3"
                  style={{
                    textAlign: "center",
                    marginTop: "12px",
                    fontWeight: "700",
                  }}
                  sx={{ color: theme.palette.primary.main }}
                >
                  Win Rate
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={2}
              mt={3}
            >
              <Grid item>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  mt={-1.3}
                >
                  <AvatarStyled variant="square">
                    <IconZoomMoney />
                  </AvatarStyled>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.accent.main }}
                  >
                    Findings
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h6" mt={-1.3}>
                  {/* ${new Intl.NumberFormat().format(7434163.06)} */}
                  ${new Intl.NumberFormat().format(totalNetOff)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={2}
            >
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconMessageExclamation />
                  </AvatarStyled>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.secondary.main }}
                  >
                    Disputed
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  $
        {totalDisputedAmount !== null
          ? parseFloat(totalDisputedAmount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "Loading..."}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconMoneybag />
                  </AvatarStyled>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.success.main }}
                  >
                    Recouped
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  ${new Intl.NumberFormat().format(recoupedAmount)}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <YearlyTrend />
          </DashboardCard>
        </Grid>

        <Grid item xs={12} lg={4}>
          <DashboardCard
            title={<Typography variant="h3">Shortage Claim</Typography>}
          >
            <DonutChart
              // series={dataSeries}
              series={data1.series}
              labels={data1.labels}
              colors={data1.colors}
            />
            <Divider />
            <Grid container mt={2} justifyContent="space-between">
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <AvatarStyled variant="square">
                    <IconZoomMoney />
                  </AvatarStyled>
                  <Box>
                    <Typography variant="h6" sx={{ color: "#285a9e" }}>
                      Findings
                    </Typography>
                    <Typography variant="h6">
                      {/* ${new Intl.NumberFormat().format(1856543291.52)} */}
                      ${new Intl.NumberFormat().format(parseFloat(shortageClaim))}{" "}

                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2} mt={3}>
                  <AvatarStyled variant="square">
                    <IconCoins />
                  </AvatarStyled>
                  <Box>
                    <Typography variant="h6" sx={{ color: "#f89c53" }}>
                      Outstanding Balance
                    </Typography>
                    <Typography variant="h6">
                      {/* ${new Intl.NumberFormat().format(1842191.96)} */}
                      ${sumOutstandingBalanceAmount.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2} mt={3}>
                  <AvatarStyled variant="square">
                    <IconRotate2 />
                  </AvatarStyled>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: theme.palette.secondary.main }}
                    >
                      Counteroffer
                    </Typography>
                    <Typography variant="h6">
                      {/* ${new Intl.NumberFormat().format(0)} */}
                      ${counterOfferAmount.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item mt={2}>
                <Stack direction="row" spacing={2} mt={1}>
                  <AvatarStyled variant="square">
                    <IconBrandCakephp />
                  </AvatarStyled>
                  <Box>
                    <Typography variant="h6" sx={{ color: "#f19c53" }}>
                      Final Settlement Offer
                    </Typography>
                    <Typography variant="h6">
                      {/* ${new Intl.NumberFormat().format(700450.78)} */}
                      ${settlementOffer.toFixed(2)}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item mt={2}>
                <Stack direction="row" spacing={2} mt={1}>
                  <AvatarStyled variant="square">
                    <IconPercentage />
                  </AvatarStyled>
                  <Box>
                    <Typography variant="h6" sx={{ color: "#2edd95" }}>
                      Settlement Offer Rate
                    </Typography>
                    <Typography variant="h6">
                      {/* {new Intl.NumberFormat().format(38.02)}% */}
                      {new Intl.NumberFormat().format(parseFloat(settlementOfferRate))}%
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} lg={4}>
          <DashboardCard
            title={<Typography variant="h3">P&L Analysis</Typography>}
          >
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
              marginTop={3}
            >
              <Grid
                item
                xs={12}
                lg={5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <AvatarStyled variant="square">
                  <IconPercentage />
                </AvatarStyled>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.accent.main,
                    textAlign: "center",
                    marginTop: "15px",
                    marginBottom: "10px",
                  }}
                >
                  EBITA %
                </Typography>
                <Typography variant="h4">9.48%</Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid
                item
                xs={12}
                lg={5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <AvatarStyled variant="square">
                  <IconCurrencyDollar />
                </AvatarStyled>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.accent.main,
                    textAlign: "center",
                    marginTop: "15px",
                    marginBottom: "10px",
                  }}
                >
                  EBITA $
                </Typography>
                <Typography variant="h6">
                  ${new Intl.NumberFormat().format(133127.58)}
                </Typography>
              </Grid>
            </Grid>
            <Divider />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
              mt={3}
            >
              <Grid item>
                <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                  Top 3 Deductions
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconGridDots />
                  </AvatarStyled>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.accent.main }}
                  >
                    Coop
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginTop: "40px" }}>
                  ${new Intl.NumberFormat().format(267502.73)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconSpeakerphone />
                  </AvatarStyled>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.secondary.main }}
                  >
                    AMS
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  ${new Intl.NumberFormat().format(55138.44)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconOctagon />
                  </AvatarStyled>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.success.main }}
                  >
                    Ops Chargeback
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  ${new Intl.NumberFormat().format(14194.3)}
                </Typography>
              </Grid>
            </Grid>
            <Divider />

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Grid item>
                <br />
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconTimeDuration5 />
                  </AvatarStyled>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.accent.main }}
                  >
                    PO Acceptance Rate
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginTop: "20px" }}>
                  75%
                </Typography>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
      </Grid>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} lg={4}>
          <DashboardCard
            title={<Typography variant="h3">Price Claim</Typography>}
          >
            <Grid container>
              <Grid item>
                <DonutChart
                  // series={priceSeries}
                  series={data2.series}
                  labels={data2.labels}
                  colors={data2.colors}
                />
                <Divider />
              </Grid>
            </Grid>
            <br></br>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={5}
            >
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconMessageExclamation />
                  </AvatarStyled>
                  <Typography variant="h5" sx={{ color: "#285a9e" }}>
                    Disputed
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {/* ${new Intl.NumberFormat().format(1984989.28)} */}
                  ${totalDisputed}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={5}
            >
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconCheck />
                  </AvatarStyled>
                  <Typography variant="h5" sx={{ color: "#2edd95" }}>
                    Approved
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h4">
                  {/* ${new Intl.NumberFormat().format(781.52)} */}
                  ${approvedAmount}
                  
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconHourglassHigh />
                  </AvatarStyled>
                  <Typography variant="h5" sx={{ color: "#f89c53" }}>
                    Pending
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h4" sx={{ marginTop: "10px" }}>
                  {/* ${new Intl.NumberFormat().format(0)} */}
                  {pendingWithAmazon}
                </Typography>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  marginTop={4.5}
                >
                  <AvatarStyled variant="square">
                    <IconPercentage />
                  </AvatarStyled>
                  <Typography variant="h5" sx={{ color: "#2edd95" }}>
                    Approved Rate
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h4" sx={{ marginTop: "45px" }}>
                  {/* {new Intl.NumberFormat().format(41.8)}% */}
                  {approvedRate}%
                </Typography>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>
        <Grid item xs={12} lg={4}>
          <DashboardCard
            title={<Typography variant="h3">Missed Invoicing</Typography>}
          >
            <DonutChart
              series={data3.series}
              labels={data3.labels}
              colors={data3.colors}
            />
            <Divider />
            <Grid container mt={2.8} justifyContent="space-between">
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <AvatarStyled variant="square">
                    <IconZoomMoney />
                  </AvatarStyled>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: theme.palette.accent.main }}
                    >
                      Shipped but not invoiced
                    </Typography>
                    <Typography variant="h6">
                      {/* ${new Intl.NumberFormat().format(137217.67)} */}
                      {irFindingData
                          ? `$${new Intl.NumberFormat().format(
                              irFindingData.overbillIdentified
                            )}`
                          : "No data available"}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2} mt={3.5}>
                  <AvatarStyled variant="square">
                    <IconSettings2 />
                  </AvatarStyled>
                  <Box>
                    <Typography
                      variant="h6"
                      sx={{ color: theme.palette.success.main }}
                    >
                      Claim Submitted
                    </Typography>
                    <Typography variant="h6">
                      {/* ${new Intl.NumberFormat().format(133616.45)} */}
                      {irClaimData
                        ? `$${new Intl.NumberFormat().format(
                            irClaimData.overbillIdentified
                          )}`
                        : "No data available"}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2} mt={3.5}>
                  <AvatarStyled variant="square">
                    <IconMoneybag />
                  </AvatarStyled>
                  <Box>
                    <Typography variant="h6" sx={{ color: "#285a9e" }}>
                      Recouped Amount
                    </Typography>
                    <Typography variant="h6">
                      {/* ${new Intl.NumberFormat().format(81261.23)} */}
                      ${new Intl.NumberFormat().format(recoveryAmount)}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item marginTop={3.5}>
                <Stack direction="row" spacing={2}>
                  <AvatarStyled variant="square">
                    <IconPercentage />
                  </AvatarStyled>
                  <Box>
                    <Typography variant="h6" sx={{ color: "#2edd95" }}>
                      Recouped Rate
                    </Typography>
                    <Typography variant="h6">
                      {/* {new Intl.NumberFormat().format(60.81)}% */}
                      {recoupedRate !== null
                ? `${new Intl.NumberFormat().format(recoupedRate)}%`
                : "No data available"}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>

        <Grid item xs={12} lg={4}>
          <DashboardCard
            title={<Typography variant="h3">Operational Chargeback</Typography>}
          >

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
              marginTop={3}
            >
              <Grid
                item
                xs={12}
                lg={5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <AvatarStyled variant="square">
                  <IconMessageExclamation />
                </AvatarStyled>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.accent.main,
                    textAlign: "center",
                    marginTop: "15px",
                    marginBottom: "10px",
                  }}
                >
                  Disputed
                </Typography>
                <Typography variant="h4">
                  ${new Intl.NumberFormat().format(8847.91)}
                </Typography>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid
                item
                xs={12}
                lg={5}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <AvatarStyled variant="square">
                  <IconCurrencyDollar />
                </AvatarStyled>
                <Typography
                  variant="h5"
                  sx={{
                    color: theme.palette.secondary.main,
                    textAlign: "center",
                    marginTop: "15px",
                    marginBottom: "10px",
                  }}
                >
                  Approved
                </Typography>
                <Typography variant="h4">
                  ${new Intl.NumberFormat().format(2520.49)}
                </Typography>
              </Grid>
            </Grid>

            <Divider />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
              mt={3}
            >
              <Grid item>
                <Typography variant="h4" sx={{ marginBottom: "20px" }}>
                  Top 3 Infractions
                </Typography>

                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconSearch />
                  </AvatarStyled>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.accent.main }}
                  >
                    Post Audit Deduction
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginTop: "48px" }}>
                  ${new Intl.NumberFormat().format(818206.81)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconGridDots />
                  </AvatarStyled>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.secondary.main }}
                  >
                    Net Price Claim{" "}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  ${new Intl.NumberFormat().format(2363710.6)}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Grid item>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconTruckDelivery />
                  </AvatarStyled>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.success.main }}
                  >
                    Return Freight Charge{" "}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  ${new Intl.NumberFormat().format(818206.81)}
                </Typography>
              </Grid>
            </Grid>

            <Divider />

            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={3}
            >
              <Grid item>
                <br />

                <Stack direction="row" alignItems="center" spacing={1}>
                  <AvatarStyled variant="square">
                    <IconPercentage />
                  </AvatarStyled>
                  <Typography
                    variant="h6"
                    sx={{ color: theme.palette.accent.main }}
                  >
                    Win Rate
                  </Typography>
                </Stack>
              </Grid>
              <Grid item>
                <Typography variant="h6" sx={{ marginTop: "20px" }}>
                  28.40%
                </Typography>
              </Grid>
            </Grid>
          </DashboardCard>
        </Grid>   
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;
