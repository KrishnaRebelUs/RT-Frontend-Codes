import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  TextField,
  Card,
  CardContent,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  FormHelperText,
  FormLabel,
} from "@mui/material";
import PageContainer from "../../../components/container/PageContainer";
import Breadcrumb from "../../components/pages/Breadcrumb";
import Header from "../../components/pages/Header";

const ClientAccess = () => {
  const [orgName, setOrgName] = useState("");
  const [amazonVCAccount, setAmazonVCAccount] = useState("");
  const [marketPlace, setMarketPlace] = useState("");
  const [businessUnit, setBusinessUnit] = useState("");
  const [feePercent, setFeePercent] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [customerPOC, setCustomerPOC] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [contractStartDate, setContractStartDate] = useState("");
  const [contractEndDate, setContractEndDate] = useState("");
  const [moduleAccess, setModuleAccess] = useState([]);
  const [cronJob, setCronJob] = useState("No");
  const [opsChargeback, setOpsChargeback] = useState("No");
  const [itemizedShortage, setItemizedShortage] = useState("No");
  const [itemizedPriceClaim, setItemizedPriceClaim] = useState("No");
  const [agencyReferralClicked, setAgencyReferralClicked] = useState(false);
  const [referredBy, setReferredBy] = useState("");
  const [serviceFee, setServiceFee] = useState("");

  const [orgNameError, setOrgNameError] = useState(false);
  const [amazonVCAccountError, setAmazonVCAccountError] = useState(false);
  const [marketPlaceError, setMarketPlaceError] = useState(false);
  const [businessUnitError, setBusinessUnitError] = useState(false);

  const marketPlaces = ["US", "CA", "EU", "NA"];
  const businessUnits = ["RT", "SamhCard"];
  const dummyPaymentTerms = ["Term1", "Term2", "Term3"];
  const modules = [
    "Excess CoOp Billing",
    "Shortage Claim",
    "P&L Analysis",
    "Price Claim",
    "Missed Invoicing",
    "Ops Chargeback",
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    let isValid = true;

    if (orgName.trim() === "") {
      setOrgNameError(true);
      isValid = false;
    } else {
      setOrgNameError(false);
    }

    if (amazonVCAccount === "") {
      setAmazonVCAccountError(true);
      isValid = false;
    } else {
      setAmazonVCAccountError(false);
    }

    if (marketPlace === "") {
      setMarketPlaceError(true);
      isValid = false;
    } else {
      setMarketPlaceError(false);
    }

    if (businessUnit === "") {
      setBusinessUnitError(true);
      isValid = false;
    } else {
      setBusinessUnitError(false);
    }

    if (isValid) {
      console.log("Form submitted:", {
        orgName,
        amazonVCAccount,
        marketPlace,
        businessUnit,
        feePercent,
        paymentTerms,
        customerPOC,
        customerEmail,
        contractStartDate,
        contractEndDate,
        moduleAccess,
        cronJob,
        opsChargeback,
        itemizedShortage,
        itemizedPriceClaim,
        referredBy,
        serviceFee,
      });
    }
  };

  const handleModuleAccessChange = (event) => {
    const selectedModules = event.target.value;
    setModuleAccess(selectedModules);
  };

  const isPLAnalysisDisabled = marketPlace !== "US" && marketPlace !== "CA";

  const handleAgencyReferralClick = () => {
    setAgencyReferralClicked(true);
  };

  const handleSaveAndClose = () => {
    setAgencyReferralClicked(false);
  };

  return (
    <PageContainer title="Client Access">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Breadcrumb titles={["Manage Access", "Client Access"]} />
        </Grid>
        <Grid item xs={12}>
          <Header title="Client Access" />
        </Grid>
        <Grid item xs={12}>
          <Card sx={{ backgroundColor: "white", padding: 3 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Client Access Details
              </Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      required
                      fullWidth
                      label="Org Name"
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      error={orgNameError}
                    />
                    {orgNameError && (
                      <FormHelperText error>
                        Please enter Org Name.
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      required
                      fullWidth
                      label="Amazon VC Account"
                      value={amazonVCAccount}
                      onChange={(e) => setAmazonVCAccount(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      error={amazonVCAccountError}
                    >
                      {["Account1", "Account2", "Account3"].map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    {amazonVCAccountError && (
                      <FormHelperText error>
                        Please select Amazon VC Account.
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      select
                      required
                      fullWidth
                      label="Market Place"
                      value={marketPlace}
                      onChange={(e) => setMarketPlace(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      error={marketPlaceError}
                    >
                      {marketPlaces.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    {marketPlaceError && (
                      <FormHelperText error>
                        Please select Market Place.
                      </FormHelperText>
                    )}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      required
                      fullWidth
                      label="Business Unit"
                      value={businessUnit}
                      onChange={(e) => setBusinessUnit(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      error={businessUnitError}
                    >
                      {businessUnits.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                    {businessUnitError && (
                      <FormHelperText error>
                        Please select Business Unit.
                      </FormHelperText>
                    )}
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Contract Start Date"
                      type="date"
                      value={contractStartDate}
                      onChange={(e) => setContractStartDate(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Contract End Date"
                      type="date"
                      value={contractEndDate}
                      onChange={(e) => setContractEndDate(e.target.value)}
                      margin="normal"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                </Grid>

                <FormControl
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  sx={{ mt: 2 }}
                >
                  <InputLabel>Module Access</InputLabel>
                  <Select
                    multiple
                    value={moduleAccess}
                    onChange={handleModuleAccessChange}
                    renderValue={(selected) => selected.join(", ")}
                    inputProps={{
                      label: "Module Access",
                    }}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                        },
                      },
                    }}
                  >
                    {moduleAccess.map((selectedModule) => (
                      <MenuItem key={selectedModule} value={selectedModule}>
                        <Checkbox checked />
                        <ListItemText primary={selectedModule} />
                      </MenuItem>
                    ))}
                    {modules
                      .filter((module) => !moduleAccess.includes(module))
                      .map((module) => (
                        <MenuItem
                          key={module}
                          value={module}
                          disabled={module === "P&L Analysis" && isPLAnalysisDisabled}
                        >
                          <Checkbox
                            checked={moduleAccess.indexOf(module) > -1}
                            disabled={module === "P&L Analysis" && isPLAnalysisDisabled}
                          />
                          <ListItemText primary={module} />
                        </MenuItem>
                      ))}
                  </Select>
                  {isPLAnalysisDisabled && (
                    <FormHelperText error>
                      P&L Analysis is only available for US and CA market places.
                    </FormHelperText>
                  )}
                </FormControl>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Customer POC"
                      value={customerPOC}
                      onChange={(e) => setCustomerPOC(e.target.value)}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Customer Email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Fee Percent"
                      value={feePercent}
                      onChange={(e) => setFeePercent(e.target.value)}
                      margin="normal"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Payment Terms"
                      select
                      value={paymentTerms}
                      onChange={(e) => setPaymentTerms(e.target.value)}
                      margin="normal"
                      variant="outlined"
                    >
                      {dummyPaymentTerms.map((term) => (
                        <MenuItem key={term} value={term}>
                          {term}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>

                {/* Flags for additional options */}
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                      <FormLabel component="legend">Cron Job</FormLabel>
                      <RadioGroup
                        row
                        value={cronJob}
                        onChange={(e) => setCronJob(e.target.value)}
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                      <FormLabel component="legend">OPS Chargeback</FormLabel>
                      <RadioGroup
                        row
                        value={opsChargeback}
                        onChange={(e) => setOpsChargeback(e.target.value)}
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                      <FormLabel component="legend">Itemized Shortage</FormLabel>
                      <RadioGroup
                        row
                        value={itemizedShortage}
                        onChange={(e) => setItemizedShortage(e.target.value)}
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <FormControl component="fieldset" sx={{ mt: 2 }}>
                      <FormLabel component="legend">Itemized Price Claim</FormLabel>
                      <RadioGroup
                        row
                        value={itemizedPriceClaim}
                        onChange={(e) => setItemizedPriceClaim(e.target.value)}
                      >
                        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio />} label="No" />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                </Grid>

                {/* Agency Referral */}
                {!agencyReferralClicked ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleAgencyReferralClick}
                    sx={{ mt: 2 }}
                  >
                    Agency Referral
                  </Button>
                ) : (
                  <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Referred By"
                        value={referredBy}
                        onChange={(e) => setReferredBy(e.target.value)}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        label="Service Fee"
                        value={serviceFee}
                        onChange={(e) => setServiceFee(e.target.value)}
                        margin="normal"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSaveAndClose}
                        sx={{ mt: 2 }}
                      >
                        Save and Close
                      </Button>
                    </Grid>
                  </Grid>
                )}

                <Box mt={2} ml={60}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ClientAccess;
