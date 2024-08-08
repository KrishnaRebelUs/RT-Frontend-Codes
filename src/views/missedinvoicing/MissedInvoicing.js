import React, { useState, useEffect } from "react";
import {
  styled,
  Grid,
  Button,
  Typography,
  Box,
  Stack,
  Divider,
  Modal,
  TextField,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../components/pages/Breadcrumb";
import Header from "../components/pages/Header";
import DashboardCard from "../../components/shared/DashboardCard";
import YearlyTrend from "./components/YearlyTrend";
import { Link } from "react-router-dom";
import Disputed from "./components/Disputed";
import RecoupedAmount from "./components/RecoupedAmount";
import Export from "../components/pages/Export";
import NumberData from "./components/NumberData";
import eventEmitter from "../../eventEmitter";
import axios from "axios";
import config from "../../../config";


const MissedInvoicing = () => {
  const theme = useTheme();
  const BASE_URL = config.UniUrl;
  const [vendorId, setVendorId] = useState(null);
  const [irFindingData, setIrFindingData] = useState(null);
  const [irClaimData, setIrClaimData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [hoursSaved, setHoursSaved] = useState("");
  const [resourcesSaved, setResourcesSaved] = useState("");
  const [amountSaved, setAmountSaved] = useState("");

  const [hoursClaim, setHoursClaimSaved] = useState("");
  const [resourcesClaimSaved, setResourcesClaimSaved] = useState("");
  const [amountClaimSaved, setAmountClaimSaved] = useState("");

  const [modalOpen, setModalOpen] = useState(false);
  const [poStartDate, setPoStartDate] = useState(null);
  const [poEndDate, setPoEndDate] = useState(null);
 

  // Define the styles for the modal
const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #ffff',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(4),
}));

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);
  const handleRun = () => {
    // Implement your run logic here
    handleCloseModal();
  };

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

  /*------------------------------------------------- API for Scope for Additional Invoice($) -------------------------------------------------*/

  useEffect(() => {
    const token = sessionStorage.getItem("token");

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
            // Parse poScanned and aggrement for IR_FINDING
            const poLinedScanned = parsePoScanned(data.data[0].poScanned);
            const invoiceScanned = parseInvoiceScanned(
              data.data[0].invoiceScanned
            );

            // Set IR_FINDING data state
            setIrFindingData({
              ...data.data[0],
              poLinedScanned,
              invoiceScanned,
            });
          } else {
            setIrFindingData(null);
          }
        })
        .catch((error) =>
          console.error("Error fetching IR_FINDING data:", error)
        )
        .finally(() => setLoading(false));
    }
  }, [vendorId]);

  /*-------------------------------------------------- API for Claim Submitted($) --------------------------------------------------------------*/

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
            // Parse poScanned and agreement scanned for IR_CLAIM
            const poLinedScanned = parsePoScanned(data.data[0].poScanned);
            const invoiceScanned = parseInvoiceScanned(
              data.data[0].invoiceScanned
            );

            // Format period covered for IR_CLAIM
            const periodCoveredFrom = formatDate(
              data.data[0].periodCoveredFrom
            );
            const periodCoveredTo = formatDate(data.data[0].periodCoveredTo);

            // Set IR_CLAIM data state
            setIrClaimData({
              ...data.data[0],
              poLinedScanned,
              invoiceScanned,
              periodCoveredFrom,
              periodCoveredTo,
            });
          } else {
            setIrClaimData(null);
          }
        })
        .catch((error) => console.error("Error fetching IR_CLAIM data:", error))
        .finally(() => setLoading(false));
    }
  }, [vendorId]);

  /*-------------------------------------------------- API for Impact Overview IR_FINDING  -------------------------------------------------------*/

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (vendorId) {
      // Fetch IR_FINDING data
      setLoading(true);
      axios
        .get(
          `${BASE_URL}/overbilling/getImpactOverview?vendorId=${vendorId}&pageName=IR_FINDING`,
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
        .catch((error) =>
          console.error("Error fetching impact overview data:", error)
        )
        .finally(() => setLoading(false));
    }
  }, [vendorId]);

  /*-------------------------------------------------- API for Impact Overview IR_CLAIM  -------------------------------------------------------*/

  useEffect(() => {
    const token = sessionStorage.getItem("token");

    if (vendorId) {
      // Fetch IR_FINDING data
      setLoading(true);
      axios
        .get(
          `${BASE_URL}/overbilling/getImpactOverview?vendorId=${vendorId}&pageName=IR_CLAIM`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          const impactData = response.data.data[0]; // Assuming only one data object is returned
          if (impactData) {
            setHoursClaimSaved(impactData.hoursSaved);
            setResourcesClaimSaved(impactData.resourceSaved);
            setAmountClaimSaved(impactData.amountSaved);
          } else {
            // If no data available, set values to 0
            setHoursClaimSaved("-");
            setResourcesClaimSaved("-");
            setAmountClaimSaved("-");
          }
        })
        .catch((error) =>
          console.error("Error fetching impact overview data:", error)
        )
        .finally(() => setLoading(false));
    }
  }, [vendorId]);

  /*----------------------------------------------------------------------------------------------------------------------------------------*/

  const formatDate = (dateString) => {
    if (!dateString) return "No date available"; // Return a default value if dateString is null or undefined
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to parse and compute poScanned value
  const parsePoScanned = (poScannedString) => {
    if (!poScannedString) return 0;
    // Split by newlines and sum up parsed integers
    const lines = poScannedString.trim().split("\r\n");
    let total = 0;
    lines.forEach((line) => {
      const num = parseInt(line.trim(), 10);
      if (!isNaN(num)) {
        total += num;
      }
    });
    return total;
  };

  // Function to parse and compute invoiceScanned value
  const parseInvoiceScanned = (invoiceScannedString) => {
    if (!invoiceScannedString) return 0;
    // Split by newlines and sum up parsed integers
    const lines = invoiceScannedString.trim().split("\r\n");
    let total = 0;
    lines.forEach((line) => {
      const num = parseInt(line.trim(), 10);
      if (!isNaN(num)) {
        total += num;
      }
    });
    return total;
  };

  const data = [
    {
      body: "Hours Saved",
      number: `${hoursSaved} Hrs`,
      icon: "IconClock",
      avatarBackgroundColor: theme.palette.success.extrDark,
      numberColor: "#000000",
      avatarWidth: "35px",
      avatarHeight: "35px",
      listTitleSize: "18px",
    },
    {
      body: "Amount Saved To Audit",
      number: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amountSaved)}`,
      icon: "IconCurrencyDollar",
      avatarBackgroundColor: "#245aa0",
      numberColor: "#000000",
      avatarWidth: "35px",
      avatarHeight: "35px",
      listTitleSize: "18px",
    },
    {
      body: "FTE Saved/week",
      number: `${resourcesSaved} ${resourcesSaved === 1 ? "FTE" : "FTE's"}`,
      icon: "IconRecords",
      avatarBackgroundColor: theme.palette.accent.main,
      numberColor: "#000000",
      avatarWidth: "35px",
      avatarHeight: "35px",
      listTitleSize: "18px",
    },
  ];

  const NewData = [
    {
      body: "Hours Saved",
      number: `${hoursClaim} Hrs`,
      icon: "IconClock",
      avatarBackgroundColor: theme.palette.success.extrDark,
      numberColor: "#000000",
      avatarWidth: "35px",
      avatarHeight: "35px",
      listTitleSize: "18px",
    },
    {
      body: "Amount Saved To Submit",
      number: `${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amountClaimSaved)}`,
      icon: "IconCurrencyDollar",
      avatarBackgroundColor: "#245aa0",
      numberColor: "#000000",
      avatarWidth: "35px",
      avatarHeight: "35px",
      listTitleSize: "18px",
    },
    {
      body: "FTE Saved",
      number: `${resourcesClaimSaved} ${
        resourcesClaimSaved === 1 ? "FTE" : "FTE's"
      }`,
      icon: "IconRecords",
      avatarBackgroundColor: theme.palette.accent.main,
      numberColor: "#000000",
      avatarWidth: "35px",
      avatarHeight: "35px",
      listTitleSize: "18px",
    },
  ];
  const TypographyStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
  }));

  const BaseButtonStyled = styled(Button)(({ theme }) => ({
    color: theme.palette.primary.contrastText,
    fontSize: "13px",
    padding: "5px 12px",
    fontWeight: "600",
    border: "1px solid",
    "&:hover": {
      opacity: "0.8",
    },
  }));

  const ButtonStyledGreen = styled(BaseButtonStyled)(({ theme }) => ({
    backgroundColor: theme.palette.success.extraDark,
    borderColor: theme.palette.success.extraDark,
    "&:hover": {
      backgroundColor: theme.palette.success.light,
      color: theme.palette.success.extraDark,
      borderColor: theme.palette.success.extraDark,
    },
  }));

  const ButtonStyledAction = styled(BaseButtonStyled)(({ theme }) => ({
    backgroundColor: theme.palette.accent.main,
    borderColor: theme.palette.accent.main,
    "&:hover": {
      backgroundColor: theme.palette.accent.light,
      color: theme.palette.accent.main,
    },
  }));

  const ButtonStyledSecondary = styled(BaseButtonStyled)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.secondary.main,
    },
  }));

  return (
    <PageContainer title="Missed Invoicing">
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Missed Invoicing"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="Missed Invoicing" />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <ButtonStyledSecondary onClick={handleOpenModal}>
                New Request
              </ButtonStyledSecondary>
            </Grid>
            <Grid item>
              <Link to="/upload-log" style={{ textDecoration: "none" }}>
                <ButtonStyledAction>Upload Log</ButtonStyledAction>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/job-status" style={{ textDecoration: "none" }}>
                <ButtonStyledGreen>Job Status</ButtonStyledGreen>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
       {/* Modal for date selection */}
       <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalContent>
          <Typography id="modal-title" variant="h6" component="h2">
            New Request
          </Typography>
          <Stack spacing={2} mt={2}>
            <TextField
              label="PO Start Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={poStartDate}
              onChange={(e) => setPoStartDate(e.target.value)}
            />
            <TextField
              label="PO End Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              value={poEndDate}
              onChange={(e) => setPoEndDate(e.target.value)}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleRun}>
                Run
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Stack>
          </Stack>
        </ModalContent>
      </Modal>
      <Grid container spacing={3} mb={4}>
        <Grid item xs={2.7}>
          <Box style={{ position: "relative", height: "100%" }}>
            <DashboardCard>
              <Grid container spacing={3}>
                <Grid item>
                  <Typography
                    variant="h5"
                    sx={{ color: "#1c3c70" }}
                    marginBottom={3}
                  >
                    Shipped But Not Invoiced
                  </Typography>
                  <Typography variant="h6" mb={1} sx={{ color: "#f19c53" }}>
                    Finding Amount($)
                  </Typography>
                  <TypographyStyled
                    variant="h3"
                    sx={{ color: theme.palette.accent.main }}
                  >
                    {loading ? (
                      <Typography
                        variant="h6"
                        sx={{ color: theme.palette.accent.main }}
                      >
                        Loading data...
                      </Typography>
                    ) : (
                      <TypographyStyled variant="h3" sx={{ color: "#000000" }}>
                        {irFindingData
                          ? `$${new Intl.NumberFormat().format(
                              irFindingData.overbillIdentified
                            )}`
                          : "No data available"}
                      </TypographyStyled>
                    )}
                  </TypographyStyled>
                </Grid>
              </Grid>
            </DashboardCard>
          </Box>
        </Grid>
        <Grid item xs={3.5}>
          <YearlyTrend />
        </Grid>
        <Grid item xs={2.8}>
          <Disputed />
        </Grid>
        <Grid item xs={3}>
          <RecoupedAmount />
        </Grid>
      </Grid>
      <Grid container spacing={3} mb={3}>
        <Grid item xs={8}>
          <Typography variant="h3">Efficiency Assesment</Typography>
        </Grid>
        <Grid item xs={4} textAlign="end">
          <Export />
        </Grid>
        <Grid></Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <DashboardCard>
            <Grid container spacing={2}>
              <Grid item xs={12} mb={1}>
                <Typography variant="h3" mb={1} sx={{ color: "#1c3c70" }}>
                  Scope for Additional Invoice($)
                </Typography>
                <TypographyStyled
                  variant="h3"
                  sx={{ color: theme.palette.text.main }}
                >
                  {loading ? (
                    <Typography
                      variant="h6"
                      sx={{ color: theme.palette.text.main }}
                    >
                      Loading data...
                    </Typography>
                  ) : (
                    <TypographyStyled
                      variant="h3"
                      sx={{ color: theme.palette.text.main }}
                    >
                      {irFindingData
                        ? `$${new Intl.NumberFormat().format(
                            irFindingData.overbillIdentified
                          )}`
                        : "No data available"}
                    </TypographyStyled>
                  )}
                </TypographyStyled>
              </Grid>
              <Grid item xs={5} mb={1}>
                <Typography variant="h6" mb={1} sx={{ color: "#f19c53" }}>
                  PO Lines Scanned
                </Typography>
                <TypographyStyled
                  variant="h3"
                  sx={{ color: theme.palette.text.main }}
                >
                  {irFindingData
                    ? `${new Intl.NumberFormat().format(
                        irFindingData.poLinedScanned
                      )}`
                    : "No data available"}
                </TypographyStyled>
              </Grid>
              <Grid item xs={7} mb={1}>
                <Typography variant="h6" mb={1} sx={{ color: "#18244d" }}>
                  Total Invoice Lines Scope Identified
                </Typography>
                <TypographyStyled
                  variant="h3"
                  sx={{ color: theme.palette.text.main }}
                >
                  {irFindingData
                    ? `${new Intl.NumberFormat().format(
                        irFindingData.invoiceScanned
                      )}`
                    : "No data available"}
                </TypographyStyled>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} mb={2}>
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="space-between"
                >
                  <Typography variant="h6" mb={1} sx={{ color: "#2edd95" }}>
                    PO Period Audited
                  </Typography>
                  <TypographyStyled
                    variant="h6"
                    sx={{ color: theme.palette.text.main }}
                  >
                    {irFindingData
                      ? `${formatDate(
                          irFindingData.periodCoveredFrom
                        )} to ${formatDate(irFindingData.periodCoveredTo)}`
                      : "No data available"}
                  </TypographyStyled>
                </Stack>
              </Grid>
            </Grid>
            <Box mb={2}>
              <Divider />
            </Box>
            <Box>
              <Typography variant="h4" marginBottom={3}>
                {" "}
                Efforts to Audit
              </Typography>
              <NumberData data={data} />
            </Box>
          </DashboardCard>
        </Grid>
        <Grid item xs={6}>
          <DashboardCard>
            <Grid container spacing={2}>
              <Grid item xs={12} mb={1}>
                <Typography variant="h3" mb={1} sx={{ color: "#1c3c70" }}>
                  Claim Submitted($)
                </Typography>
                <Typography
                  variant="h3"
                  sx={{ color: theme.palette.text.main }}
                >
                  {loading ? (
                    <Typography
                      variant="h6"
                      sx={{ color: theme.palette.text.main }}
                    >
                      Loading data...
                    </Typography>
                  ) : (
                    <TypographyStyled
                      variant="h3"
                      sx={{ color: theme.palette.text.main }}
                    >
                      {irClaimData
                        ? `$${new Intl.NumberFormat().format(
                            irClaimData.overbillIdentified
                          )}`
                        : "No data available"}
                    </TypographyStyled>
                  )}
                </Typography>
              </Grid>
              <Grid item xs={6} mb={1}>
                <Typography variant="h6" mb={1} sx={{ color: "#f19c53" }}>
                  PO Lines Submitted
                </Typography>
                <TypographyStyled
                  variant="h3"
                  sx={{ color: theme.palette.text.main }}
                >
                  {irClaimData
                    ? `${new Intl.NumberFormat().format(
                        irClaimData.poLinedScanned
                      )}`
                    : "No data available"}
                </TypographyStyled>
              </Grid>
              <Grid item xs={6} mb={1}>
                <Typography variant="h6" mb={1} sx={{ color: "#18244d" }}>
                  Invoice Lines Submitted
                </Typography>
                <TypographyStyled
                  variant="h3"
                  sx={{ color: theme.palette.text.main }}
                >
                  {/* ${new Intl.NumberFormat().format(98442)} */}
                  {irClaimData
                    ? `${new Intl.NumberFormat().format(
                        irClaimData.invoiceScanned
                      )}`
                    : "No data available"}
                </TypographyStyled>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} mb={2}>
                <Stack
                  direction="row"
                  spacing={3}
                  justifyContent="space-between"
                >
                  <Typography variant="h6" mb={1} sx={{ color: "#2edd95" }}>
                    PO Period Submitted
                  </Typography>
                  <TypographyStyled
                    variant="h6"
                    sx={{ color: theme.palette.text.main }}
                  >
                    {irClaimData
                      ? `${formatDate(
                          irClaimData.periodCoveredFrom
                        )} to ${formatDate(irClaimData.periodCoveredTo)}`
                      : "No data available"}
                  </TypographyStyled>
                </Stack>
              </Grid>
            </Grid>
            <Box mb={2}>
              <Divider />
            </Box>
            <Box>
              <Typography variant="h4" marginBottom={3}>
                {" "}
                Efforts to Submit Invoicing
              </Typography>
              <NumberData data={NewData} />
            </Box>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default MissedInvoicing;
