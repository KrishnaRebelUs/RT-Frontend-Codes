/*--------------------------------------------------------------- My Code 1 -------------------------------------------------------------------*/

import React, { useState, useEffect, useRef } from "react";
import {
  styled,
  Typography,
  Box,
  Stack,
  useTheme,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
} from "@mui/material";
import { IconExclamationMark } from "@tabler/icons-react";
import { height } from "@mui/system";
import axios from "axios";
import config from "../../../config";

const BoxStyled = styled(Box)(({ theme }) => ({
  height: "600px",
  overflowY: "auto",
}));
const TableRowStyled = styled(TableRow)(({ theme, index }) => ({
  borderBottom: "1px solid #eee",
  backgroundColor:
    index % 2 === 0
      ? theme.palette.secondary.contrastText
      : theme.palette.primary.extraLight,
}));

const TableCellStyled = styled(TableCell)(({ theme }) => ({
  fontSize: "15px",
  fontWeight: "600",
}));

const ComaprisionTable = () => {
  const theme = useTheme();
  const BASE_URL = config.UniUrl;

  const [years, setYears] = useState({
    currentYear: "",
    year1: "",
    year2: "",
  });

  const formatNumber = (num) => {
    return `$${num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  

  // Function to format numbers with commas and two decimal places
  const formatPercentage = (num) => {
    if (isNaN(num)) return "In progress";
    return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + "%";
  };

// Function to parse dollar values (assumes you have this function to convert your values to numbers)
const parseDollarValue = (value) => {
  if (typeof value === 'string') {
    return parseFloat(value.replace(/[^0-9.-]+/g, ""));
  }
  return value;
};


  

  // PO Placed
  const [poPlacedJanToFeb, setPoPlacedJanToFeb] = useState(null);
  const [poPlacedTwentyTwo, setPoPlacedTwentyTwo] = useState(null);
  const [poPlacedTwentyOne, setPoPlacedTwentyOne] = useState(null);


  // PO Accepted
  const [poAcceptedJanToFeb, setPoAcceptedJanToFeb] = useState(null);
  const [poAcceptedTwentyTwo, setPoAcceptedTwentyTwo] = useState(null);
  const [poAcceptedTwentyOne, setPoAcceptedTwentyOne] = useState(null);



  // PO Acceptance Rate
  const [acceptanceRateJanToFeb, setAcceptanceRateJanToFeb] = useState("-");
  const [acceptanceRateTwentyTwo, setAcceptanceRateTwentyTwo] = useState("-");
  const [acceptanceRateTwentyOne, setAcceptanceRateTwentyOne] = useState("-");


  const [loading, setLoading] = useState(true); // Loading state




  // Inventory Sales
  const [inventorySaleJanToFeb, setInventorySaleJanToFeb] = useState(null);
  const [inventorySaleTwentyTwo, setInventorySaleTwentyTwo] = useState(null);
  const [inventorySaleTwentyOne, setInventorySaleTwentyOne] = useState(null);
  const [inventorySaleTwenty, setInventorySaleTwenty] = useState(null);

  // DropShip Sales
  const [dropshipSaleJanToFeb, setDropshipSaleJanToFeb] = useState(null);
  const [dropshipSaleTwentyTwo, setDropshipSaleTwentyTwo] = useState(null);
  const [dropshipSaleTwentyOne, setDropshipSaleTwentyOne] = useState(null);
  const [dropshipSaleTwenty, setDropshipSaleTwenty] = useState(null);

  // Total Payments Received
  const [totalPaymentsReceivedJanToFeb, setTotalPaymentsReceivedJanToFeb] = useState("In progress");
  const [totalPaymentsReceivedTwentyTwo, setTotalPaymentsReceivedTwentyTwo] = useState("In progress");
  const [totalPaymentsReceivedTwentyOne, setTotalPaymentsReceivedTwentyOne] = useState("In progress");
  const [totalPaymentsReceivedTwenty, setTotalPaymentsReceivedTwenty] = useState("In progress");

  // % +/- (Previous Year)
  const [percentChangeJanToFeb, setPercentChangeJanToFeb] = useState("In progress");
  const [percentChangeTwentyTwo, setPercentChangeTwentyTwo] = useState("In progress");
  const [percentChangeTwentyOne, setPercentChangeTwentyOne] = useState("In progress");


  const [paymentReceiptForecast, setPaymentReceiptForecast] = useState({ JanToFeb: "In progress", TwentyTwo: "-", TwentyOne: "-" });


  /*------------------------------------------------------ Ops Chargeback Deduction ----------------------------------------------------------*/

  // Ops Chargeback
  const [operationalChargebackDeductionJanToFeb,setOperationalChargebackDeductionJanToFeb] = useState({});
  const [operationalChargebackDeductionTwentyTwo,setOperationalChargebackDeductionTwentyTwo] = useState({});
  const [operationalChargebackDeductionTwentyOne,setOperationalChargebackDeductionTwentyOne] = useState({});

  // OC- ASN Accuracy
  const [ocDataJanToFeb, setOcDataJanToFeb] = useState("In progress");
  const [ocDataTwentyTwo, setOcDataTwentyTwo] = useState("In progress");
  const [ocDataTwentyOne, setOcDataTwentyOne] = useState("In progress");

  // OC - No Label Carton
  const [ocNoLabelDataJanToFeb, setOcNoLabelDataJanToFeb] = useState({});
  const [ocNoLabelDataTwentyTwo, setOcNoLabelDataTwentyTwo] = useState({});
  const [ocNoLabelDataTwentyOne, setOcNoLabelDataTwentyOne] = useState({});

  // OC - Overweight
  const [ocOverweightDataJanToFeb, setOcOverweightDataJanToFeb] = useState({});
  const [ocOverweightDataTwentyTwo, setOcOverweightDataTwentyTwo] = useState({});
  const [ocOverweightDataTwentyOne, setOcOverweightDataTwentyOne] = useState({});

  // OC - Prep - External bubble wrapping data for different periods
  const [ocPrepBubbleDataJanToFeb, setOcPrepBubbleDataJanToFeb] = useState({});
  const [ocPrepBubbleDataTwentyTwo, setOcPrepBubbleDataTwentyTwo] = useState({});
  const [ocPrepBubbleDataTwentyOne, setOcPrepBubbleDataTwentyOne] = useState({});

  // OC - PO - on- time Accuaracy
  const [ocPOOnTimeDataJanToFeb, setOcPOOnTimeDataJanToFeb] = useState({});
  const [ocPOOnTimeDataTwentyTwo, setOcPOOnTimeDataTwentyTwo] = useState({});
  const [ocPOOnTimeDataTwentyOne, setOcPOOnTimeDataTwentyOne] = useState({});

  // OC - Overage - PO units
  const [ocOveragePOUnitsJanToFeb, setOcOveragePOUnitsJanToFeb] = useState({});
  const [ocOveragePOUnitsTwentyTwo, setOcOveragePOUnitsTwentyTwo] = useState({});
  const [ocOveragePOUnitsTwentyOne, setOcOveragePOUnitsTwentyOne] = useState({});

  // OC - Prep - Internal bubble wrap
  const [ocPrepInternalBubbleWrapJanToFeb,setOcPrepInternalBubbleWrapJanToFeb] = useState({});
  const [ocPrepInternalBubbleWrapTwentyTwo,setOcPrepInternalBubbleWrapTwentyTwo] = useState({});
  const [ocPrepInternalBubbleWrapTwentyOne,setOcPrepInternalBubbleWrapTwentyOne] = useState({});

  // OC - Prep - Bagging
  const [ocPrepBaggingJanToFeb, setOcPrepBaggingJanToFeb] = useState({});
  const [ocPrepBaggingTwentyTwo, setOcPrepBaggingTwentyTwo] = useState({});
  const [ocPrepBaggingTwentyOne, setOcPrepBaggingTwentyOne] = useState({});

  // OC - Ship In Own Container
  const [ocShipOwnContainerJanToFeb, setOcShipOwnContainerJanToFeb] = useState({});
  const [ocShipOwnContainerTwentyTwo, setOcShipOwnContainerTwentyTwo] = useState({});
  const [ocShipOwnContainerTwentyOne, setOcShipOwnContainerTwentyOne] = useState({});

  // OC - Carton Content Accuracy
  const [ocCartonContentAccuracyJanToFeb, setOcCartonContentAccuracyJanToFeb] = useState({});
  const [ocCartonContentAccuracyTwentyTwo,setOcCartonContentAccuracyTwentyTwo] = useState({});
  const [ocCartonContentAccuracyTwentyOne,setOcCartonContentAccuracyTwentyOne] = useState({});

  // OC - Overweight Carton
  const [ocOverweightCartonJanToFeb, setOcOverweightCartonJanToFeb] = useState({});
  const [ocOverweightCartonTwentyTwo, setOcOverweightCartonTwentyTwo] = useState({});
  const [ocOverweightCartonTwentyOne, setOcOverweightCartonTwentyOne] = useState({});

  // OC - Unconfirmed PO units
  const [ocUnconfirmedPOUnitsJanToFeb, setOcUnconfirmedPOUnitsJanToFeb] = useState({});
  const [ocUnconfirmedPOUnitsTwentyTwo, setOcUnconfirmedPOUnitsTwentyTwo] = useState({});
  const [ocUnconfirmedPOUnitsTwentyOne, setOcUnconfirmedPOUnitsTwentyOne] = useState({});
  

  /*------------------------------------------------------ CoOp and its Subtype-----------------------------------------------------------------*/

  // CoOp
  const [coopJanToFeb, setCoopJanToFeb] = useState({});
  const [coopTwentyTwo, setCoopTwentyTwo] = useState({});
  const [coopTwentyOne, setCoopTwentyOne] = useState({});

  // CoOp Accural
  const [coopAccrualJanToFeb, setCoopAccrualJanToFeb] = useState({});
  const [coopAccrualTwentyTwo, setCoopAccrualTwentyTwo] = useState({});
  const [coopAccrualTwentyOne, setCoopAccrualTwentyOne] = useState({});

  // CoOp Straight Payement
  const [coopStraightPaymentJanToFeb, setCoopStraightPaymentJanToFeb] = useState({});
  const [coopStraightPaymentTwentyTwo, setCoopStraightPaymentTwentyTwo] = useState({});
  const [coopStraightPaymentTwentyOne, setCoopStraightPaymentTwentyOne] = useState({});

  // CoOp Disposed
  const [coopDisposedJanToFeb, setCoopDisposedJanToFeb] = useState({});
  const [coopDisposedTwentyTwo, setCoopDisposedTwentyTwo] = useState({});
  const [coopDisposedTwentyOne, setCoopDisposedTwentyOne] = useState({});

  // Volume Incentive
  const [coopVolumeIncentiveJanToFeb, setCoopVolumeIncentiveJanToFeb] = useState({});
  const [coopVolumeIncentiveTwentyTwo, setCoopVolumeIncentiveTwentyTwo] = useState({});
  const [coopVolumeIncentiveTwentyOne, setCoopVolumeIncentiveTwentyOne] = useState({});

  // Vendor Funded Sales Discount
  const [coopVendorFundedJanToFeb, setCoopVendorFundedJanToFeb] = useState({});
  const [coopVendorFundedTwentyTwo, setCoopVendorFundedTwentyTwo] = useState({});
  const [coopVendorFundedTwentyOne, setCoopVendorFundedTwentyOne] = useState({});

  /*-------------------------------------------------------------------------------------------------------------------------------------------*/
  
  // C2FO Credit Memo
  const [creditJanToFeb, setCreditJanToFeb] = useState({});
  const [creditTwentyTwo, setCreditTwentyTwo] = useState({});
  const [creditTwentyOne, setCreditTwentyOne] = useState({});

  // Post Audit Deduction
  const [postJanToFeb, setPostJanToFeb] = useState({});
  const [postTwentyTwo, setPostTwentyTwo] = useState({});
  const [postTwentyOne, setPostTwentyOne] = useState({});

  // Net Shoratges
  const [netShortagesJanToFeb, setNetShortagesJanToFeb] = useState({});
  const [netShortagesTwentyTwo, setNetShortagesTwentyTwo] = useState({});
  const [netShortagesTwentyOne, setNetShortagesTwentyOne] = useState({});

  // Net Price Claim
  const [netPriceClaimJanToFeb, setNetPriceClaimJanToFeb] = useState({});
  const [netPriceClaimTwentyTwo, setNetPriceClaimTwentyTwo] = useState({});
  const [netPriceClaimTwentyOne, setNetPriceClaimTwentyOne] = useState({});

  // Returns Deduction
  const [returnsDeductionJanToFeb, setReturnsDeductionJanToFeb] = useState({});
  const [returnsDeductionTwentyTwo, setReturnsDeductionTwentyTwo] = useState({});
  const [returnsDeductionTwentyOne, setReturnsDeductionTwentyOne] = useState({});

  // Net Return Freight Charges
  const [netReturnFreightChargesJanToFeb, setNetReturnFreightChargesJanToFeb] = useState({});
  const [netReturnFreightChargesTwentyTwo,setNetReturnFreightChargesTwentyTwo] = useState({});
  const [netReturnFreightChargesTwentyOne,setNetReturnFreightChargesTwentyOne] = useState({});

  // Net Return Handling Charges
  const [handleJanToFeb, setHandleJanToFeb] = useState({});
  const [handleTwentyTwo, setHandleTwentyTwo] = useState({});
  const [handleTwentyOne, setHandleTwentyOne] = useState({});

  
  // Quick Pay Discount
  const [qpdJanToFeb, setQpdJanToFeb] = useState({});
  const [qpdTwentyTwo, setQpdTwentyTwo] = useState({});
  const [qpdTwentyOne, setQpdTwentyOne] = useState({});

  // Total deductions
  const [totalDeductionsJanToFeb, setTotalDeductionsJanToFeb] = useState({ JanToFeb: "In progress" });
  const [totalDeductionsTwentyTwo, setTotalDeductionsTwentyTwo] = useState({ TwentyTwo: "In progress" });
  const [totalDeductionsTwentyOne, setTotalDeductionsTwentyOne] = useState({ TwentyOne: "In progress" });

  // AMS
  const [amsJanToFeb, setAmsJanToFeb] = useState({});
  const [amsTwentyTwo, setAmsTwentyTwo] = useState({});
  const [amsTwentyOne, setAmsTwentyOne] = useState({});

  // Provision Reversal
  const [provisionReversalJanToFeb, setProvisionReversalJanToFeb] = useState({});
  const [provisionReversalTwentyTwo, setProvisionReversalTwentyTwo] = useState({});
  const [provisionReversalTwentyOne, setProvisionReversalTwentyOne] = useState({});

  // Provision Deductionl
  const [provisionDeductionJanToFeb, setProvisionDeductionJanToFeb] = useState({});
  const [provisionDeductionTwentyTwo, setProvisionDeductionTwentyTwo] = useState({});
  const [provisionDeductionTwentyOne, setProvisionDeductionTwentyOne] = useState({});

  // CoOp Refund
  const [refuJanToFeb, setRefuJanToFeb] = useState({});
  const [refuTwentyTwo, setRefuTwentyTwo] = useState({});
  const [refuTwentyOne, setRefuTwentyOne] = useState({});

  // OC - SIOC Incentive
  const [osiJanToFeb, setOSIJanToFeb] = useState({});
  const [osiTwentyTwo, setOSITwentyTwo] = useState({});
  const [osiTwentyOne, setOSITwentyOne] = useState({});

  // Return Refund
  const [rrefuJanToFeb, setRRefuJanToFeb] = useState({});
  const [rrefuTwentyTwo, setRRefuTwentyTwo] = useState({});
  const [rrefuTwentyOne, setRRefuTwentyOne] = useState({});


  /*---------------------------------------------------- API for Payement Receipt Forecast --------------------------------------------------*/

const fetchForecastData = async () => {
  const vendorId = sessionStorage.getItem('selectedVendorId');
  const token = sessionStorage.getItem('token');

  if (!vendorId || !token) {
    console.error("Missing vendorId or token");
    return;
  }

  try {
    const response = await axios.get(`http://35.153.186.247:8082/financialDashboard/getMonthYear`, {
      params: { vendorId },
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error("API call error", error);
    return null;
  }
};

useEffect(() => {
  const updateForecastData = async () => {
    const data = await fetchForecastData();
    if (data && data.month && data.year) {
      const month = data.month;
      const totalPaymentsReceived = parseDollarValue(totalPaymentsReceivedJanToFeb);

      if (!isNaN(totalPaymentsReceived) && month) {
        const janToFebValue = (totalPaymentsReceived / month) * 12;
        setPaymentReceiptForecast(prev => ({
          ...prev,
          JanToFeb: formatNumber(janToFebValue)
        }));
      }
    }
  };

  updateForecastData();
}, [totalPaymentsReceivedJanToFeb]);

// Update the ComparisonTable
useEffect(() => {
  setComparisonTable(prevTable => {
    const updatedTable = [...prevTable];
    
    // Update Payment Receipt Forecast row
    const updateRow = (rowName, values) => {
      const row = updatedTable.find(row => row.Settlement.value === rowName);
      if (row) {
        row.JanToFeb.value = values.JanToFeb;
        row.TwentyTwo.value = values.TwentyTwo;
        row.TwentyOne.value = values.TwentyOne;
      } else {
        updatedTable.push({
          id: updatedTable.length + 1,
          Settlement: { value: rowName },
          JanToFeb: { value: values.JanToFeb, color: theme.palette.primary.main },
          TwentyTwo: { value: values.TwentyTwo, color: theme.palette.primary.main },
          TwentyOne: { value: values.TwentyOne, color: theme.palette.primary.main },
        });
      }
    };

    updateRow("Payment Receipt Forecast", paymentReceiptForecast);

    return updatedTable;
  });
}, [paymentReceiptForecast])

  /*--------------------------------------------------- OPS ChargeBack SubType ------------------------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getSubtypeData?vendorId=${vendorId}&year=${year}&invoiceType=Operational Chargeback Deduction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            // Extract the values for OC types
            const ocASNAccuracy = data.data.find(
              (item) =>
                item.invoiceTypeDetailed === "OC - ASN accuracy" ||
                item.invoiceTypeDetailed === "OC - ASN Accuracy"
            );




            const ocNoLabel = data.data.find(
              (item) =>
                item.invoiceTypeDetailed ===
                "OC - No carton/package content label"
            );
            const ocOverweight = data.data.find(
              (item) => item.invoiceTypeDetailed === "OC - Overweight Carton"
            );
            const ocPrepBubble = data.data.find(
              (item) =>
                item.invoiceTypeDetailed ===
                "OC - Prep - External bubble wrapping"
            );
            const ocPOOnTime = data.data.find(
              (item) => item.invoiceTypeDetailed === "OC - PO on-time accuracy"
            );
            const ocPOOverage = data.data.find(
              (item) => item.invoiceTypeDetailed === "OC - Overage PO units"
            );
            const ocIntBubble = data.data.find(
              (item) =>
                item.invoiceTypeDetailed === "OC - Prep - Internal bubble wrap"
            );
            const ocPrepBagg = data.data.find(
              (item) => item.invoiceTypeDetailed === "OC - Prep - Bagging"
            );
            const ocShip = data.data.find(
              (item) =>
                item.invoiceTypeDetailed === "OC - Ship In Own Container"
            );
            const ocCartonAcc = data.data.find(
              (item) =>
                item.invoiceTypeDetailed === "OC - Carton Content Accuracy"
            );
            const ocOverWeightCarton = data.data.find(
              (item) => item.invoiceTypeDetailed === "OC - Overweight Carton"
            );
            const ocUnPo = data.data.find(
              (item) => item.invoiceTypeDetailed === "OC - Unconfirmed PO units"
            );

            // Format the values
            let ocASNValue = ocASNAccuracy
              ? formatNumber(Math.abs(ocASNAccuracy.val))
              : "In progress";
            let ocNoLabelValue = ocNoLabel
              ? formatNumber(Math.abs(ocNoLabel.val))
              : "In progress";
            let ocOverweightValue = ocOverweight
              ? formatNumber(Math.abs(ocOverweight.val))
              : "In progress";
            let ocPrepBubbleValue = ocPrepBubble
              ? formatNumber(Math.abs(ocPrepBubble.val))
              : "In progress";

            // Update state based on the year
            if (yearKey === "currentYear") {
              setOcDataJanToFeb({ JanToFeb: ocASNValue });             
              setOcNoLabelDataJanToFeb({ JanToFeb: ocNoLabelValue });
              setOcOverweightDataJanToFeb({ JanToFeb: ocOverweightValue });
              setOcPrepBubbleDataJanToFeb({ JanToFeb: ocPrepBubbleValue });
              setOcPOOnTimeDataJanToFeb({
                JanToFeb: ocPOOnTime
                  ? formatNumber(Math.abs(ocPOOnTime.val))
                  : "In progress",
              });
              setOcOveragePOUnitsJanToFeb({
                JanToFeb: ocPOOverage
                  ? formatNumber(Math.abs(ocPOOverage.val))
                  : "In progress",
              });
              setOcPrepInternalBubbleWrapJanToFeb({
                JanToFeb: ocIntBubble
                  ? formatNumber(Math.abs(ocIntBubble.val))
                  : "In progress",
              });
              setOcPrepBaggingJanToFeb({
                JanToFeb: ocPrepBagg
                  ? formatNumber(Math.abs(ocPrepBagg.val))
                  : "In progress",
              });
              setOcShipOwnContainerJanToFeb({
                JanToFeb: ocShip
                  ? formatNumber(Math.abs(ocShip.val))
                  : "In progress",
              });
              setOcCartonContentAccuracyJanToFeb({
                JanToFeb: ocCartonAcc
                  ? formatNumber(Math.abs(ocCartonAcc.val))
                  : "In progress",
              });
              setOcOverweightCartonJanToFeb({
                JanToFeb: ocOverWeightCarton
                  ? formatNumber(Math.abs(ocOverWeightCarton.val))
                  : "In progress",
              });
              setOcUnconfirmedPOUnitsJanToFeb({
                JanToFeb: ocUnPo
                  ? formatNumber(Math.abs(ocUnPo.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setOcDataTwentyTwo({ TwentyTwo: ocASNValue });
              setOcNoLabelDataTwentyTwo({ TwentyTwo: ocNoLabelValue });
              setOcOverweightDataTwentyTwo({ TwentyTwo: ocOverweightValue });
              setOcPrepBubbleDataTwentyTwo({ TwentyTwo: ocPrepBubbleValue });
              setOcPOOnTimeDataTwentyTwo({
                TwentyTwo: ocPOOnTime
                  ? formatNumber(Math.abs(ocPOOnTime.val))
                  : "In progress",
              });
              setOcOveragePOUnitsTwentyTwo({
                TwentyTwo: ocPOOverage
                  ? formatNumber(Math.abs(ocPOOverage.val))
                  : "In progress",
              });
              setOcPrepInternalBubbleWrapTwentyTwo({
                TwentyTwo: ocIntBubble
                  ? formatNumber(Math.abs(ocIntBubble.val))
                  : "In progress",
              });
              setOcPrepBaggingTwentyTwo({
                TwentyTwo: ocPrepBagg
                  ? formatNumber(Math.abs(ocPrepBagg.val))
                  : "In progress",
              });
              setOcShipOwnContainerTwentyTwo({
                TwentyTwo: ocShip
                  ? formatNumber(Math.abs(ocShip.val))
                  : "In progress",
              });
              setOcCartonContentAccuracyTwentyTwo({
                TwentyTwo: ocCartonAcc
                  ? formatNumber(Math.abs(ocCartonAcc.val))
                  : "In progress",
              });
              setOcOverweightCartonTwentyTwo({
                TwentyTwo: ocOverWeightCarton
                  ? formatNumber(Math.abs(ocOverWeightCarton.val))
                  : "In progress",
              });
              setOcUnconfirmedPOUnitsTwentyTwo({
                TwentyTwo: ocUnPo
                  ? formatNumber(Math.abs(ocUnPo.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setOcDataTwentyOne({ TwentyOne: ocASNValue });
              setOcNoLabelDataTwentyOne({ TwentyOne: ocNoLabelValue });
              setOcOverweightDataTwentyOne({ TwentyOne: ocOverweightValue });
              setOcPrepBubbleDataTwentyOne({ TwentyOne: ocPrepBubbleValue });
              setOcPOOnTimeDataTwentyOne({
                TwentyOne: ocPOOnTime
                  ? formatNumber(Math.abs(ocPOOnTime.val))
                  : "In progress",
              });
              setOcOveragePOUnitsTwentyOne({
                TwentyOne: ocPOOverage
                  ? formatNumber(Math.abs(ocPOOverage.val))
                  : "In progress",
              });
              setOcPrepInternalBubbleWrapTwentyOne({
                TwentyOne: ocIntBubble
                  ? formatNumber(Math.abs(ocIntBubble.val))
                  : "In progress",
              });
              setOcPrepBaggingTwentyOne({
                TwentyOne: ocPrepBagg
                  ? formatNumber(Math.abs(ocPrepBagg.val))
                  : "In progress",
              });
              setOcShipOwnContainerTwentyOne({
                TwentyOne: ocShip
                  ? formatNumber(Math.abs(ocShip.val))
                  : "In progress",
              });
              setOcCartonContentAccuracyTwentyOne({
                TwentyOne: ocCartonAcc
                  ? formatNumber(Math.abs(ocCartonAcc.val))
                  : "In progress",
              });
              setOcOverweightCartonTwentyOne({
                TwentyOne: ocOverWeightCarton
                  ? formatNumber(Math.abs(ocOverWeightCarton.val))
                  : "In progress",
              });
              setOcUnconfirmedPOUnitsTwentyOne({
                TwentyOne: ocUnPo
                  ? formatNumber(Math.abs(ocUnPo.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch OC data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch OC data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(`Error fetching OC data for year ${year}:`, error);
      }
    };

    fetchYears();
  }, []);

  

  /*--------------------------------------------------- CoOp Sub Type  --------------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getSubtypeData?vendorId=${vendorId}&year=${year}&invoiceType=coop Deduction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const coopAccural = data.data.find(
              (item) => item.invoiceTypeDetailed === "Accrual"
            );
            const coopStraightPayement = data.data.find(
              (item) => item.invoiceTypeDetailed === "Straight Payment"
            );
            const coopDisposed = data.data.find(
              (item) => item.invoiceTypeDetailed === "Disposed"
            );
            const coopVolumeIncentive = data.data.find(
              (item) => item.invoiceTypeDetailed === "Volume Incentive"
            );
            const coopVfsd = data.data.find(
              (item) =>
                item.invoiceTypeDetailed === "Vendor Funded Sales Discount"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setCoopAccrualJanToFeb({
                JanToFeb: coopAccural
                  ? formatNumber(Math.abs(coopAccural.val))
                  : "In progress",
              });
              setCoopStraightPaymentJanToFeb({
                JanToFeb: coopStraightPayement
                  ? formatNumber(Math.abs(coopStraightPayement.val))
                  : "In progress",
              });
              setCoopDisposedJanToFeb({
                JanToFeb: coopDisposed
                  ? formatNumber(Math.abs(coopDisposed.val))
                  : "In progress",
              });
              setCoopVolumeIncentiveJanToFeb({
                JanToFeb: coopVolumeIncentive
                  ? formatNumber(Math.abs(coopVolumeIncentive.val))
                  : "In progress",
              });
              setCoopVendorFundedJanToFeb({
                JanToFeb: coopVfsd
                  ? formatNumber(Math.abs(coopVfsd.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setCoopAccrualTwentyTwo({
                TwentyTwo: coopAccural
                  ? formatNumber(Math.abs(coopAccural.val))
                  : "In progress",
              });
              setCoopStraightPaymentTwentyTwo({
                TwentyTwo: coopStraightPayement
                  ? formatNumber(Math.abs(coopStraightPayement.val))
                  : "In progress",
              });
              setCoopDisposedTwentyTwo({
                TwentyTwo: coopDisposed
                  ? formatNumber(Math.abs(coopDisposed.val))
                  : "In progress",
              });
              setCoopVolumeIncentiveTwentyTwo({
                TwentyTwo: coopVolumeIncentive
                  ? formatNumber(Math.abs(coopVolumeIncentive.val))
                  : "In progresss",
              });
              setCoopVendorFundedTwentyTwo({
                TwentyTwo: coopVfsd
                  ? formatNumber(Math.abs(coopVfsd.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setCoopAccrualTwentyOne({
                TwentyOne: coopAccural
                  ? formatNumber(Math.abs(coopAccural.val))
                  : "In progress",
              });
              setCoopStraightPaymentTwentyOne({
                TwentyOne: coopStraightPayement
                  ? formatNumber(Math.abs(coopStraightPayement.val))
                  : "In progress",
              });
              setCoopDisposedTwentyOne({
                TwentyOne: coopDisposed
                  ? formatNumber(Math.abs(coopDisposed.val))
                  : "In progress",
              });
              setCoopVolumeIncentiveTwentyOne({
                TwentyOne: coopVolumeIncentive
                  ? formatNumber(Math.abs(coopVolumeIncentive.val))
                  : "In progress",
              });
              setCoopVendorFundedTwentyOne({
                TwentyOne: coopVfsd
                  ? formatNumber(Math.abs(coopVfsd.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch CoOp data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch CoOp data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(`Error fetching OC data for year ${year}:`, error);
      }
    };

    fetchYears();
  }, []);

  /*----------------------------------------------------------- CoOp  -------------------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");
      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=CoOp deduction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const coOp = data.data.find(
              (item) => item.invoiceType === "CoOp deduction"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setCoopJanToFeb({
                JanToFeb: coOp
                  ? formatNumber(Math.abs(coOp.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setCoopTwentyTwo({
                TwentyTwo: coOp
                  ? formatNumber(Math.abs(coOp.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setCoopTwentyOne({
                TwentyOne: coOp
                  ? formatNumber(Math.abs(coOp.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch CoOp data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch CoOp data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(`Error fetching OC data for year ${year}:`, error);
      }
    };

    fetchYears();
  }, []);

  /*------------------------------------------------------------- Net Shortages  -----------------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceTypeDetailed?vendorId=${vendorId}&year=${year}&invoiceTypeDetailed=Net Shortages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const netShortages = data.data.find(
              (item) => item.invoiceTypeDetailed === "Net Shortages"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setNetShortagesJanToFeb({
                JanToFeb: netShortages
                  ? formatNumber(Math.abs(netShortages.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setNetShortagesTwentyTwo({
                TwentyTwo: netShortages
                  ? formatNumber(Math.abs(netShortages.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setNetShortagesTwentyOne({
                TwentyOne: netShortages
                  ? formatNumber(Math.abs(netShortages.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch Net Shortage data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch Net Shortage data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(`Error fetching Net Shortage for year ${year}:`, error);
      }
    };

    fetchYears();
  }, []);

  /*----------------------------------------------------------Net Price Claim  -------------------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceTypeDetailed?vendorId=${vendorId}&year=${year}&invoiceTypeDetailed=Net Price Claim`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const netPriceClaim = data.data.find(
              (item) => item.invoiceTypeDetailed === "Net Price Claim"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setNetPriceClaimJanToFeb({
                JanToFeb: netPriceClaim
                  ? formatNumber(Math.abs(netPriceClaim.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setNetPriceClaimTwentyTwo({
                TwentyTwo: netPriceClaim
                  ? formatNumber(Math.abs(netPriceClaim.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setNetPriceClaimTwentyOne({
                TwentyOne: netPriceClaim
                  ? formatNumber(Math.abs(netPriceClaim.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch Net Price Claim data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch Net Price Claim data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching Net Price Claim for year ${year}:`,
          error
        );
      }
    };

    fetchYears();
  }, []);

  /*---------------------------------------------------   Returns Deduction  ---------------------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=Returns Deduction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const returnDeduction = data.data.find(
              (item) => item.invoiceType === "Returns Deduction"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setReturnsDeductionJanToFeb({
                JanToFeb: returnDeduction
                  ? formatNumber(Math.abs(returnDeduction.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setReturnsDeductionTwentyTwo({
                TwentyTwo: returnDeduction
                  ? formatNumber(Math.abs(returnDeduction.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setReturnsDeductionTwentyOne({
                TwentyOne: returnDeduction
                  ? formatNumber(Math.abs(returnDeduction.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch Returns Deduction data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch Returns Deduction data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching Returns Deduction for year ${year}:`,
          error
        );
      }
    };

    fetchYears();
  }, []);

/*------------------------------------------------------- Net Post Audit Deduction   --------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=Post Audit Deduction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const postDeduction = data.data.find(
              (item) => item.invoiceType === "Post Audit Deduction"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setPostJanToFeb({
                JanToFeb: postDeduction
                  ? formatNumber(Math.abs(postDeduction.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setPostTwentyTwo({
                TwentyTwo: postDeduction
                  ? formatNumber(Math.abs(postDeduction.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setPostTwentyOne({
                TwentyOne: returnDeduction
                  ? formatNumber(Math.abs(postDeduction.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch Post Deduction data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch Post Deduction data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching Post Deduction for year ${year}:`,
          error
        );
      }
    };

    fetchYears();
  }, []);




  /*------------------------------------------------------- Net Return Handling Charges -----------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=Returns Handling Charges Deduction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const rhDeduction = data.data.find(
              (item) => item.invoiceType === "Returns Handling Charges Deduction"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setHandleJanToFeb({
                JanToFeb: rhDeduction
                  ? formatNumber(Math.abs(rhDeduction.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setHandleTwentyTwo({
                TwentyTwo: rhDeduction
                  ? formatNumber(Math.abs(rhDeduction.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setHandleTwentyOne({
                TwentyOne: rhDeduction
                  ? formatNumber(Math.abs(rhDeduction.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch Returns Handling Charges Deduction data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch Returns Handling Charges Deduction data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching Returns Handling Charges Deduction for year ${year}:`,
          error
        );
      }
    };

    fetchYears();
  }, []);

  /*------------------------------------------------------- Net Return Freight Charges   -----------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceTypeDetailed?vendorId=${vendorId}&year=${year}&invoiceTypeDetailed=Net Return Freight Charges`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const netFreight = data.data.find(
              (item) =>
                item.invoiceTypeDetailed === "Net Return Freight Charges"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setNetReturnFreightChargesJanToFeb({
                JanToFeb: netFreight
                  ? formatNumber(Math.abs(netFreight.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setNetReturnFreightChargesTwentyTwo({
                TwentyTwo: netFreight
                  ? formatNumber(Math.abs(netFreight.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setNetReturnFreightChargesTwentyOne({
                TwentyOne: netFreight
                  ? formatNumber(Math.abs(netFreight.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch Net Return Freight Charges data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch Net Return Freight Charges data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching Net Return Freight Charges for year ${year}:`,
          error
        );
      }
    };

    
    fetchYears();
  }, []);

  /*----------------------------------------------------------- Total Deduction API --------------------------------------------------------*/

   
useEffect(() => {
  const fetchYears = async () => {
    const token = sessionStorage.getItem("token");
    const vendorId = sessionStorage.getItem("selectedVendorId");

    try {
      const response = await fetch(
        `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.status === "SUCCESS") {
          const currentYear = data.data.count;
          const fetchedYears = {
            currentYear: currentYear.toString(),
            year1: (currentYear - 1).toString(),
            year2: (currentYear - 2).toString(),
          };
          setYears(fetchedYears);

          // Fetch OC data if years are valid (not zero or null)
          if (currentYear !== 0 && currentYear !== null) {
            fetchOCData(currentYear, "currentYear");
            fetchOCData(currentYear - 1, "year1");
            fetchOCData(currentYear - 2, "year2");
          }
        } else {
          console.error("Failed to fetch years data:", data.errorMessage);
        }
      } else {
        console.error("Failed to fetch years data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching years data:", error);
    }
  };

const fetchOCData = async (year, yearKey) => {
    const token = sessionStorage.getItem("token");
    const vendorId = sessionStorage.getItem("selectedVendorId");

    try {
      const response = await fetch(
        `${BASE_URL}/financialDashboard/getTotalDeduction?vendorId=${vendorId}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status === "SUCCESS") {
          const totalDeduction = data.data[year];

          if (yearKey === "currentYear") {
            setTotalDeductionsJanToFeb({
              JanToFeb: totalDeduction ? formatNumber(Math.abs(totalDeduction)) : "In progress",
            });
          } else if (yearKey === "year1") {
            setTotalDeductionsTwentyTwo({
              TwentyTwo: totalDeduction ? formatNumber(Math.abs(totalDeduction)) : "In progress",
            });
          } else if (yearKey === "year2") {
            setTotalDeductionsTwentyOne({
              TwentyOne: totalDeduction ? formatNumber(Math.abs(totalDeduction)) : "In progress",
            });
          }
        } else {
          console.error(`Failed to fetch total deductions data for year ${year}:`, data.errorMessage);
        }
      } else {
        console.error(`Failed to fetch total deductions data for year ${year}:`, response.status);
      }
    } catch (error) {
      console.error(`Error fetching total deductions for year ${year}:`, error);
    }
  };
  
  
  fetchYears();
}, []);

  /*--------------------------------------------------  Operational Chargeback Deduction   -------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=Operational Chargeback Deduction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const opsBack = data.data.find(
              (item) => item.invoiceType === "Operational Chargeback Deduction"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setOperationalChargebackDeductionJanToFeb({
                JanToFeb: opsBack
                  ? formatNumber(Math.abs(opsBack.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setOperationalChargebackDeductionTwentyTwo({
                TwentyTwo: opsBack
                  ? formatNumber(Math.abs(opsBack.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setOperationalChargebackDeductionTwentyOne({
                TwentyOne: opsBack
                  ? formatNumber(Math.abs(opsBack.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch Operational Chargeback Deduction data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch Operational Chargeback Deduction data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching Operational Chargeback Deduction for year ${year}:`,
          error
        );
      }
    };

    fetchYears();
  }, []);

  /*--------------------------------------------------------------  AMS  ------------------------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceTypeDetailed?vendorId=${vendorId}&year=${year}&invoiceTypeDetailed=AMS`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const aMs = data.data.find(
              (item) => item.invoiceTypeDetailed === "AMS"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setAmsJanToFeb({
                JanToFeb: aMs ? formatNumber(Math.abs(aMs.val)) : "In progress",
              });
            } else if (yearKey === "year1") {
              setAmsTwentyTwo({
                TwentyTwo: aMs
                  ? formatNumber(Math.abs(aMs.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setAmsTwentyOne({
                TwentyOne: aMs
                  ? formatNumber(Math.abs(aMs.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch AMS data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch AMS data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(`Error fetching AMS for year ${year}:`, error);
      }
    };

    fetchYears();
  }, []);

  /*------------------------------------------------------------ Provision Reversal  --------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=Provision Reversal`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const proRev = data.data.find(
              (item) => item.invoiceType === "Provision Reversal"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setProvisionReversalJanToFeb({
                JanToFeb: proRev
                  ? formatNumber(Math.abs(proRev.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setProvisionReversalTwentyTwo({
                TwentyTwo: proRev
                  ? formatNumber(Math.abs(proRev.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setProvisionReversalTwentyOne({
                TwentyOne: proRev
                  ? formatNumber(Math.abs(proRev.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch Provision Reversal data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch Provision Reversal data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching Provision Reversal for year ${year}:`,
          error
        );
      }
    };

    fetchYears();
  }, []);

  /*------------------------------------------------------  Provision Deduction    -------------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=Provision Deduction`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const proDed = data.data.find(
              (item) => item.invoiceType === "Provision Deduction"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setProvisionDeductionJanToFeb({
                JanToFeb: proDed
                  ? formatNumber(Math.abs(proDed.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setProvisionDeductionTwentyTwo({
                TwentyTwo: proDed
                  ? formatNumber(Math.abs(proDed.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setProvisionDeductionTwentyOne({
                TwentyOne: proDed
                  ? formatNumber(Math.abs(proDed.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch Provision Deduction data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch Provision Deductionl data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching Provision Deduction for year ${year}:`,
          error
        );
      }
    };

    fetchYears();
  }, []);


/*---------------------------------------------------------    CoOp refund    ------------------------------------------------------------------*/

useEffect(() => {
  const fetchYears = async () => {
    const token = sessionStorage.getItem("token");
    const vendorId = sessionStorage.getItem("selectedVendorId");

    try {
      const response = await fetch(
        `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.status === "SUCCESS") {
          const currentYear = data.data.count;
          const fetchedYears = {
            currentYear: currentYear.toString(),
            year1: (currentYear - 1).toString(),
            year2: (currentYear - 2).toString(),
          };
          setYears(fetchedYears);

          // Fetch OC data if years are valid (not zero or null)
          if (currentYear !== 0 && currentYear !== null) {
            fetchOCData(currentYear, "currentYear");
            fetchOCData(currentYear - 1, "year1");
            fetchOCData(currentYear - 2, "year2");
          }
        } else {
          console.error("Failed to fetch years data:", data.errorMessage);
        }
      } else {
        console.error("Failed to fetch years data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching years data:", error);
    }
  };

  const fetchOCData = async (year, yearKey) => {
    const token = sessionStorage.getItem("token");
    const vendorId = sessionStorage.getItem("selectedVendorId");

    try {
      const response = await fetch(
        `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=CoOp Refund`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.status === "SUCCESS") {
          const cRefu = data.data.find(
            (item) => item.invoiceType === "CoOp Refund"
          );

          // Update state based on the year
          if (yearKey === "currentYear") {
            setRefuJanToFeb({
              JanToFeb: cRefu
                ? formatNumber(Math.abs(cRefu.val))
                : "In progress",
            });
          } else if (yearKey === "year1") {
            setRefuTwentyTwo({
              TwentyTwo: cRefu
                ? formatNumber(Math.abs(cRefu.val))
                : "In progress",
            });
          } else if (yearKey === "year2") {
            setRefuTwentyOne({
              TwentyOne: cRefu
                ? formatNumber(Math.abs(cRefu.val))
                : "In progress",
            });
          }
        } else {
          console.error(
            `Failed to fetch CoOp Refund data for year ${year}:`,
            data.errorMessage
          );
        }
      } else {
        console.error(
          `Failed to fetch CoOp Refund data for year ${year}:`,
          response.status
        );
      }
    } catch (error) {
      console.error(
        `Error fetching CoOp Refund for year ${year}:`,
        error
      );
    }
  };

  fetchYears();
}, []);



/*--------------------------------------------------------- Return Refund  ------------------------------------------------------------------*/

useEffect(() => {
  const fetchYears = async () => {
    const token = sessionStorage.getItem("token");
    const vendorId = sessionStorage.getItem("selectedVendorId");

    try {
      const response = await fetch(
        `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.status === "SUCCESS") {
          const currentYear = data.data.count;
          const fetchedYears = {
            currentYear: currentYear.toString(),
            year1: (currentYear - 1).toString(),
            year2: (currentYear - 2).toString(),
          };
          setYears(fetchedYears);

          // Fetch OC data if years are valid (not zero or null)
          if (currentYear !== 0 && currentYear !== null) {
            fetchOCData(currentYear, "currentYear");
            fetchOCData(currentYear - 1, "year1");
            fetchOCData(currentYear - 2, "year2");
          }
        } else {
          console.error("Failed to fetch years data:", data.errorMessage);
        }
      } else {
        console.error("Failed to fetch years data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching years data:", error);
    }
  };

  const fetchOCData = async (year, yearKey) => {
    const token = sessionStorage.getItem("token");
    const vendorId = sessionStorage.getItem("selectedVendorId");

    try {
      const response = await fetch(
        `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=Return Refund`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.status === "SUCCESS") {
          const rRefu = data.data.find(
            (item) => item.invoiceType === "Return Refund"
          );

          // Update state based on the year
          if (yearKey === "currentYear") {
            setRRefuJanToFeb({
              JanToFeb: rRefu
                ? formatNumber(Math.abs(rRefu.val))
                : "In progress",
            });
          } else if (yearKey === "year1") {
            setRRefuTwentyTwo({
              TwentyTwo: rRefu
                ? formatNumber(Math.abs(rRefu.val))
                : "In progress",
            });
          } else if (yearKey === "year2") {
            setRRefuTwentyOne({
              TwentyOne: rRefu
                ? formatNumber(Math.abs(rRefu.val))
                : "In progress",
            });
          }
        } else {
          console.error(
            `Failed to fetch Return Refund data for year ${year}:`,
            data.errorMessage
          );
        }
      } else {
        console.error(
          `Failed to fetch Return Refund data for year ${year}:`,
          response.status
        );
      }
    } catch (error) {
      console.error(
        `Error fetching Return Refund for year ${year}:`,
        error
      );
    }
  };

  fetchYears();
}, []);



/*---------------------------------------------------------   OC - SIOC Incentive  -----------------------------------------------------------*/

useEffect(() => {
  const fetchYears = async () => {
    const token = sessionStorage.getItem("token");
    const vendorId = sessionStorage.getItem("selectedVendorId");

    try {
      const response = await fetch(
        `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.status === "SUCCESS") {
          const currentYear = data.data.count;
          const fetchedYears = {
            currentYear: currentYear.toString(),
            year1: (currentYear - 1).toString(),
            year2: (currentYear - 2).toString(),
          };
          setYears(fetchedYears);

          // Fetch OC data if years are valid (not zero or null)
          if (currentYear !== 0 && currentYear !== null) {
            fetchOCData(currentYear, "currentYear");
            fetchOCData(currentYear - 1, "year1");
            fetchOCData(currentYear - 2, "year2");
          }
        } else {
          console.error("Failed to fetch years data:", data.errorMessage);
        }
      } else {
        console.error("Failed to fetch years data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching years data:", error);
    }
  };

  const fetchOCData = async (year, yearKey) => {
    const token = sessionStorage.getItem("token");
    const vendorId = sessionStorage.getItem("selectedVendorId");

    try {
      const response = await fetch(
        `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=OC - SIOC Incentive`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();

        if (data.status === "SUCCESS") {
          const oSI = data.data.find(
            (item) => item.invoiceType === "OC - SIOC Incentive"
          );

          // Update state based on the year
          if (yearKey === "currentYear") {
            setOSIJanToFeb({
              JanToFeb: oSI
                ? formatNumber(Math.abs(oSI.val))
                : "In progress",
            });
          } else if (yearKey === "year1") {
            setOSITwentyTwo({
              TwentyTwo: oSI
                ? formatNumber(Math.abs(oSI.val))
                : "In progress",
            });
          } else if (yearKey === "year2") {
            setOSITwentyOne({
              TwentyOne: oSI
                ? formatNumber(Math.abs(oSI.val))
                : "In progress",
            });
          }
        } else {
          console.error(
            `Failed to fetch OC - SIOC Incentive data for year ${year}:`,
            data.errorMessage
          );
        }
      } else {
        console.error(
          `Failed to fetch OC - SIOC Incentive data for year ${year}:`,
          response.status
        );
      }
    } catch (error) {
      console.error(
        `Error fetching OC - SIOC Incentive for year ${year}:`,
        error
      );
    }
  };

  fetchYears();
}, []);



/*----------------------------------------------------------- C2FO Credit Memo ---------------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=C2FO Credit Memo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const proCred = data.data.find(
              (item) => item.invoiceType === "C2FO Credit Memo"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setCreditJanToFeb({
                JanToFeb: proCred
                  ? formatNumber(Math.abs(proCred.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setCreditTwentyTwo({
                TwentyTwo: proCred
                  ? formatNumber(Math.abs(proCred.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setCreditTwentyOne({
                TwentyOne: proCred
                  ? formatNumber(Math.abs(proCred.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch C2FO Credit Memo data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch C2FO Credit Memo data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching C2FO Credit Memo for year ${year}:`,
          error
        );
      }
    };

    fetchYears();
  }, []);



  /*------------------------------------------------------ Quick Pay Discount ---------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };
            setYears(fetchedYears);

            // Fetch OC data if years are valid (not zero or null)
            if (currentYear !== 0 && currentYear !== null) {
              fetchOCData(currentYear, "currentYear");
              fetchOCData(currentYear - 1, "year1");
              fetchOCData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchOCData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=Quick Pay Discount`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          if (data.status === "SUCCESS") {
            const qPd = data.data.find(
              (item) => item.invoiceType === "Quick Pay Discount"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setQpdJanToFeb({
                JanToFeb: qPd
                  ? formatNumber(Math.abs(qPd.val))
                  : "In progress",
              });
            } else if (yearKey === "year1") {
              setQpdTwentyTwo({
                TwentyTwo: qPd
                  ? formatNumber(Math.abs(qPd.val))
                  : "In progress",
              });
            } else if (yearKey === "year2") {
              setQpdTwentyOne({
                TwentyOne: qPd
                  ? formatNumber(Math.abs(qPd.val))
                  : "In progress",
              });
            }
          } else {
            console.error(
              `Failed to fetch C2FO Credit Memo data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch C2FO Credit Memo data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching C2FO Credit Memo for year ${year}:`,
          error
        );
      }
    };

    fetchYears();
  }, []);


  /*------------------------------------------------------ PO Placed And PO Accepted ---------------------------------------------------------*/

  const calculateAcceptanceRate = (accepted, placed) => {
    if (accepted && placed && placed !== "In progress" && placed !== "No data available" && placed !== 0) {
      return ((accepted / placed) * 100).toFixed(2) + '%';
    }
    return "-";
  };
  

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await axios.get(
          `${BASE_URL}/financialDashboard/getYear`,
          {
            params: { vendorId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
            };

            sessionStorage.setItem(
              "fetchedYears",
              JSON.stringify(fetchedYears)
            );

            if (currentYear !== 0 && currentYear !== null) {
              fetchPOData(currentYear, "currentYear");
              fetchPOData(currentYear - 1, "year1");
              fetchPOData(currentYear - 2, "year2");
            }
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    const fetchPOData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await axios.get(
          `${BASE_URL}/financialDashboard/getPOdata`,
          {
            params: { vendorId, year },
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          if (data.status === "SUCCESS" && data.data.length > 0) {
            const poData = data.data[0];
            if (poData) {
              const formattedPoPlaced = formatNumber(poData.poPlaced);
              const formattedPoAccepted = formatNumber(poData.poAccepated);
              let acceptanceRate = calculateAcceptanceRate(poData.poAccepated, poData.poPlaced);

              if (yearKey === "currentYear") {
                setPoPlacedJanToFeb(formattedPoPlaced);
                
                setPoAcceptedJanToFeb(formattedPoAccepted);
                setAcceptanceRateJanToFeb(acceptanceRate);
            
              } else if (yearKey === "year1") {
                setPoPlacedTwentyTwo(formattedPoPlaced);
                
                setPoAcceptedTwentyTwo(formattedPoAccepted);
                setAcceptanceRateTwentyTwo(acceptanceRate);
                
              } else if (yearKey === "year2") {
                setPoPlacedTwentyOne(formattedPoPlaced);
                
                setPoAcceptedTwentyOne(formattedPoAccepted);
                setAcceptanceRateTwentyOne(acceptanceRate);
                
              }
            }
          } else {
            console.error("No data found for POs or data.data is empty:", data);
            const noDataMessage = "No data available";

            if (yearKey === "currentYear") {
              setPoPlacedJanToFeb(noDataMessage);
              
              setPoAcceptedJanToFeb(noDataMessage);
              setAcceptanceRateJanToFeb("-");
              
            } else if (yearKey === "year1") {
              setPoPlacedTwentyTwo(noDataMessage);
              
              setPoAcceptedTwentyTwo(noDataMessage);
              setAcceptanceRateTwentyTwo("-");
              
            } else if (yearKey === "year2") {
              setPoPlacedTwentyOne(noDataMessage);
             
              setPoAcceptedTwentyOne(noDataMessage);
              setAcceptanceRateTwentyOne("-");
              
            }
          }
        } else {
          console.error(
            `Failed to fetch PO data for year ${year}:`,
            response.status
          );
          const errorMessage = "In progress";

          if (yearKey === "currentYear") {
            setPoPlacedJanToFeb(errorMessage);
            
            setPoAcceptedJanToFeb(errorMessage);
            setAcceptanceRateJanToFeb("-");
            
          } else if (yearKey === "year1") {
            setPoPlacedTwentyTwo(errorMessage);
            
            setPoAcceptedTwentyTwo(errorMessage);
            setAcceptanceRateTwentyTwo("-");
            
          } else if (yearKey === "year2") {
            setPoPlacedTwentyOne(errorMessage);
            
            setPoAcceptedTwentyOne(errorMessage);
            setAcceptanceRateTwentyOne("-");
            
          }
        }
      } catch (error) {
        console.error(`Error fetching PO data for year ${year}:`, error);
        const errorMessage = "In progress";

        if (yearKey === "currentYear") {
          setPoPlacedJanToFeb(errorMessage);
          
          setPoAcceptedJanToFeb(errorMessage);
          setAcceptanceRateJanToFeb("-");
          
        } else if (yearKey === "year1") {
          setPoPlacedTwentyTwo(errorMessage);
          
          setPoAcceptedTwentyTwo(errorMessage);
          setAcceptanceRateTwentyTwo("-");
          
        } else if (yearKey === "year2") {
          setPoPlacedTwentyOne(errorMessage);
          setPoAcceptedTwentyOne(errorMessage);
          setAcceptanceRateTwentyOne("-");
        }
      }
    };

    fetchYears();
  }, []);



  useEffect(() => {
    const fetchPOData = async (year, yearKey) => {
      const token = sessionStorage.getItem('token');
      const vendorId = sessionStorage.getItem('selectedVendorId');
  
      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getPOdata?vendorId=${vendorId}&year=${year}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'SUCCESS') {
            const poData = data.data[0];
            
            // Update state based on the year
            if (yearKey === 'currentYear') {
              
              setPoPlacedJanToFeb(poData ? formatNumber(poData.poPlaced) : 'In progress');
              setPoAcceptedJanToFeb(poData ? formatNumber(poData.poAccepated) : 'In progress');
            } else if (yearKey === 'year1') {
              
              setPoPlacedTwentyTwo(poData ? formatNumber(poData.poPlaced) : 'In progress');
                setPoAcceptedTwentyTwo(poData ? formatNumber(poData.poAccepated) : 'In progress');
            } else if (yearKey === 'year2') {
              
              setPoPlacedTwentyOne(poData ? formatNumber(poData.poPlaced) : 'In progress');
                setPoAcceptedTwentyOne(poData ? formatNumber(poData.poAccepated) : 'In progress');
            }
          } else {
            console.error(`Failed to fetch PO data for year ${year}:`, data.errorMessage);
          }
        } else {
          console.error(`Failed to fetch PO data for year ${year}:`, response.status);
        }
      } catch (error) {
        console.error(`Error fetching PO data for year ${year}:`, error);
      }
    };
  
    const fetchYears = async () => {
      const token = sessionStorage.getItem('token');
      const vendorId = sessionStorage.getItem('selectedVendorId');
  
      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'SUCCESS') {
            const currentYear = data.data.count;
            await fetchPOData(currentYear, 'currentYear');
            await fetchPOData(currentYear - 1, 'year1');
            await fetchPOData(currentYear - 2, 'year2');
          } else {
            console.error('Failed to fetch years data:', data.errorMessage);
          }
        } else {
          console.error('Failed to fetch years data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching years data:', error);
      }
    };
  
    fetchYears();
  }, []);
  
  
  
  
  // Update ComparisonTable with fetched data
  useEffect(() => {
    if (
      poPlacedJanToFeb !== null &&
      poPlacedTwentyTwo !== null &&
      poPlacedTwentyOne !== null &&
      poAcceptedJanToFeb !== null &&
      poAcceptedTwentyTwo !== null &&
      poAcceptedTwentyOne !== null
    ) {
      setComparisonTable((prevTable) => {
        const updatedTable = [...prevTable];
  
        const poPlacedRow = updatedTable.find(row => row.Settlement.value === "PO's Placed");
        if (poPlacedRow) {
          poPlacedRow.JanToFeb.value = poPlacedJanToFeb;
          poPlacedRow.TwentyTwo.value = poPlacedTwentyTwo;
          poPlacedRow.TwentyOne.value = poPlacedTwentyOne;
        }
  
        const poAcceptedRow = updatedTable.find(row => row.Settlement.value === "PO's Accepted");
        if (poAcceptedRow) {
          poAcceptedRow.JanToFeb.value = poAcceptedJanToFeb;
          poAcceptedRow.TwentyTwo.value = poAcceptedTwentyTwo;
          poAcceptedRow.TwentyOne.value = poAcceptedTwentyOne;
        }

        const poAcceptanceRateRow = updatedTable.find(row => row.Settlement.value === "PO Acceptance Rate");
        if (poAcceptanceRateRow) {
         poAcceptanceRateRow.JanToFeb.value = acceptanceRateJanToFeb;
         poAcceptanceRateRow.TwentyTwo.value = acceptanceRateTwentyTwo;
         poAcceptanceRateRow.TwentyOne.value = acceptanceRateTwentyOne;
       }
  
        return updatedTable;
      });
  
    }
  }, [poPlacedJanToFeb, poPlacedTwentyTwo, poPlacedTwentyOne, poAcceptedJanToFeb, poAcceptedTwentyTwo, poAcceptedTwentyOne, acceptanceRateJanToFeb, acceptanceRateTwentyTwo, acceptanceRateTwentyOne]);




  

  /*-------------------------------------------------------- Inventory Sales ------------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
              year3: (currentYear - 3).toString(),
              
            };

            await fetchInventorySaleData(currentYear, "currentYear");
            await fetchInventorySaleData(currentYear - 1, "year1");
            await fetchInventorySaleData(currentYear - 2, "year2");
            await fetchInventorySaleData(currentYear - 3, "year3");
            
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      } finally {
        setLoading(false); 
      }
    };

    const fetchInventorySaleData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=Sales Invoice Payment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const invSale = data.data.find(
              (item) => item.invoiceType === "Sales Invoice Payment"
            );

            
            if (yearKey === "currentYear") {
              setInventorySaleJanToFeb(
                invSale ? formatNumber(Math.abs(invSale.val)) : "In progress"
              );
            } else if (yearKey === "year1") {
              setInventorySaleTwentyTwo(
                invSale ? formatNumber(Math.abs(invSale.val)) : "In progress"
              );
            } else if (yearKey === "year2") {
              setInventorySaleTwentyOne(
                invSale ? formatNumber(Math.abs(invSale.val)) : "In progress"
              );
            } else if (yearKey === "year3") {
              setInventorySaleTwenty(
                invSale ? formatNumber(Math.abs(invSale.val)) : "In progress"
              );
            }
          } else {
            console.error(
              `Failed to fetch Inventory Sales data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch Inventory Sales data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching Inventory Sales for year ${year}:`,
          error
        );
      }
    };

    fetchYears();
  }, []);



  // Log state values for debugging
  useEffect(() => {
  }, [inventorySaleJanToFeb, inventorySaleTwentyTwo, inventorySaleTwentyOne]);

  // Update comparisonTable with fetched data
  useEffect(() => {
    if (
      inventorySaleJanToFeb !== null &&
      inventorySaleTwentyTwo !== null &&
      inventorySaleTwentyOne !== null 
    ) {
      setComparisonTable((prevTable) => {
        const updatedTable = [...prevTable];

        // Find the row with Payments Received - Inventory Sales
        const inventorySalesRow = updatedTable.find(
          (row) =>
            row.Settlement.value === "Payments Received - Inventory Sales"
        );
        if (inventorySalesRow) {
          inventorySalesRow.JanToFeb.value = inventorySaleJanToFeb;
          inventorySalesRow.TwentyTwo.value = inventorySaleTwentyTwo;
          inventorySalesRow.TwentyOne.value = inventorySaleTwentyOne;
        }
        return updatedTable;
      });
    }
  }, [inventorySaleJanToFeb, inventorySaleTwentyTwo, inventorySaleTwentyOne]);



  /*-----------------------------------------------------------  DropShip Sales -----------------------------------------------------------*/

  useEffect(() => {
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const currentYear = data.data.count;
            const fetchedYears = {
              currentYear: currentYear.toString(),
              year1: (currentYear - 1).toString(),
              year2: (currentYear - 2).toString(),
              year3: (currentYear - 3).toString(),
            };

            await fetchInventorySaleData(currentYear, "currentYear");
            await fetchInventorySaleData(currentYear - 1, "year1");
            await fetchInventorySaleData(currentYear - 2, "year2");
            await fetchInventorySaleData(currentYear - 3, "year3");
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      } finally {
        setLoading(false); 
      }
    };

    const fetchInventorySaleData = async (year, yearKey) => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `${BASE_URL}/financialDashboard/getInvoiceType?vendorId=${vendorId}&year=${year}&invoiceType=Dropship Sales Payment`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            const invSale = data.data.find(
              (item) => item.invoiceType === "Dropship Sales Payment"
            );

            // Update state based on the year
            if (yearKey === "currentYear") {
              setDropshipSaleJanToFeb(
                invSale ? formatNumber(Math.abs(invSale.val)) : "In progress"
              );
            } else if (yearKey === "year1") {
              setDropshipSaleTwentyTwo(
                invSale ? formatNumber(Math.abs(invSale.val)) : "In progress"
              );
            } else if (yearKey === "year2") {
              setDropshipSaleTwentyOne(
                invSale ? formatNumber(Math.abs(invSale.val)) : "In progress"
              );
            }  else if (yearKey === "year3") {
              setDropshipSaleTwenty(
                invSale ? formatNumber(Math.abs(invSale.val)) : "In progress"
              );
            }
          } else {
            console.error(
              `Failed to fetch DropShip Sales data for year ${year}:`,
              data.errorMessage
            );
          }
        } else {
          console.error(
            `Failed to fetch DropShip Sales data for year ${year}:`,
            response.status
          );
        }
      } catch (error) {
        console.error(
          `Error fetching DropShip Sales for year ${year}:`,
          error
        );
      }
    };

    fetchYears();
  }, []);

  // Log state values for debugging
  useEffect(() => {
  }, [dropshipSaleJanToFeb, dropshipSaleTwentyTwo, dropshipSaleTwentyOne]);

  // Update comparisonTable with fetched data
  useEffect(() => {
    if (
      dropshipSaleJanToFeb !== null &&
      dropshipSaleTwentyTwo !== null &&
      dropshipSaleTwentyOne !== null 
    ) {
      setComparisonTable((prevTable) => {
        const updatedTable = [...prevTable];

        // Find the row with Payments Received - Dropship Sales
        const dropShipSalesRow = updatedTable.find(
          (row) =>
            row.Settlement.value === "Payments Received - Dropship Sales"
        );
        if (dropShipSalesRow) {
          dropShipSalesRow.JanToFeb.value = dropshipSaleJanToFeb;
          dropShipSalesRow.TwentyTwo.value = dropshipSaleTwentyTwo;
          dropShipSalesRow.TwentyOne.value = dropshipSaleTwentyOne;
        }
        return updatedTable;
      });
    }
  }, [dropshipSaleJanToFeb, dropshipSaleTwentyTwo, dropshipSaleTwentyOne]);

 

  /*-------------------------------------------  Total Payement Received / Gross Profit / SG&A  ----------------------------------------------*/

 
  useEffect(() => {
  if (inventorySaleJanToFeb !== null && dropshipSaleJanToFeb !== null) {
    const total = parseDollarValue(inventorySaleJanToFeb) + parseDollarValue(dropshipSaleJanToFeb);
    setTotalPaymentsReceivedJanToFeb(formatNumber(total));
  }

  if (inventorySaleTwentyTwo !== null && dropshipSaleTwentyTwo !== null) {
    const total = parseDollarValue(inventorySaleTwentyTwo) + parseDollarValue(dropshipSaleTwentyTwo);
    setTotalPaymentsReceivedTwentyTwo(formatNumber(total));
  }

  if (inventorySaleTwentyOne !== null && dropshipSaleTwentyOne !== null) {
    const total = parseDollarValue(inventorySaleTwentyOne) + parseDollarValue(dropshipSaleTwentyOne);
    setTotalPaymentsReceivedTwentyOne(formatNumber(total));
  }

  if (inventorySaleTwenty !== null && dropshipSaleTwenty !== null) {
    const total = parseDollarValue(inventorySaleTwenty) + parseDollarValue(dropshipSaleTwenty);
    setTotalPaymentsReceivedTwenty(formatNumber(total));
  }

}, [inventorySaleJanToFeb, dropshipSaleJanToFeb, inventorySaleTwentyTwo, dropshipSaleTwentyTwo, inventorySaleTwentyOne, dropshipSaleTwentyOne , inventorySaleTwenty, dropshipSaleTwenty]);



/*-------------------------------------------- % +/- Previous year --------------------------------------------------------*/


useEffect(() => {
  if (
    totalPaymentsReceivedJanToFeb !== null &&
    totalPaymentsReceivedTwentyTwo !== null &&
    totalPaymentsReceivedTwentyOne !== null 
  ) {
    setComparisonTable((prevTable) => {
      const updatedTable = [...prevTable];

      // Calculate Gross Profit and SG&A based on totalPaymentsReceived
      const grossMarginPercent = 0.5; // 50%
      const sgaPercent = 0.2; // 20%

      const grossProfitJanToFeb = grossMarginPercent * parseDollarValue(totalPaymentsReceivedJanToFeb);
      const grossProfitTwentyTwo = grossMarginPercent * parseDollarValue(totalPaymentsReceivedTwentyTwo);
      const grossProfitTwentyOne = grossMarginPercent * parseDollarValue(totalPaymentsReceivedTwentyOne);

      const sgaJanToFeb = sgaPercent * parseDollarValue(totalPaymentsReceivedJanToFeb);
      const sgaTwentyTwo = sgaPercent * parseDollarValue(totalPaymentsReceivedTwentyTwo);
      const sgaTwentyOne = sgaPercent * parseDollarValue(totalPaymentsReceivedTwentyOne);

      // Find the row with Total Payments Received
      const totalPaymentsRow = updatedTable.find(
        (row) => row.Settlement.value === "Total Payments Received"
      );
      if (totalPaymentsRow) {
        totalPaymentsRow.JanToFeb.value = totalPaymentsReceivedJanToFeb;
        totalPaymentsRow.TwentyTwo.value = totalPaymentsReceivedTwentyTwo;
        totalPaymentsRow.TwentyOne.value = totalPaymentsReceivedTwentyOne;
      } else {
        // Add the row if it doesn't exist
        updatedTable.push({
          id: updatedTable.length + 1,
          Settlement: { value: "Total Payments Received" },
          JanToFeb: { value: totalPaymentsReceivedJanToFeb, color: theme.palette.primary.main },
          TwentyTwo: { value: totalPaymentsReceivedTwentyTwo, color: theme.palette.primary.main },
          TwentyOne: { value: totalPaymentsReceivedTwentyOne, color: theme.palette.primary.main },
        });
      }

      const updateRow = (rowName, values, isPercentage = false) => {
        const row = updatedTable.find(row => row.Settlement.value === rowName);
        if (row) {
          row.JanToFeb.value = isPercentage ? values.JanToFeb : formatNumber(values.JanToFeb);
          row.TwentyTwo.value = isPercentage ? values.TwentyTwo : formatNumber(values.TwentyTwo);
          row.TwentyOne.value = isPercentage ? values.TwentyOne : formatNumber(values.TwentyOne);
        } else {
          updatedTable.push({
            id: updatedTable.length + 1,
            Settlement: { value: rowName },
            JanToFeb: { value: isPercentage ? values.JanToFeb : formatNumber(values.JanToFeb), color: theme.palette.primary.main },
            TwentyTwo: { value: isPercentage ? values.TwentyTwo : formatNumber(values.TwentyTwo), color: theme.palette.primary.main },
            TwentyOne: { value: isPercentage ? values.TwentyOne : formatNumber(values.TwentyOne), color: theme.palette.primary.main },
          });
        }
      };

      updateRow("Gross Profit", { JanToFeb: grossProfitJanToFeb, TwentyTwo: grossProfitTwentyTwo, TwentyOne: grossProfitTwentyOne });
      updateRow("SG&A ($)", { JanToFeb: sgaJanToFeb, TwentyTwo: sgaTwentyTwo, TwentyOne: sgaTwentyOne });
      updateRow("% +/- (Previous Year)", {
        JanToFeb: percentChangeJanToFeb || "In progress",
        TwentyTwo: percentChangeTwentyTwo || "In progress",
        TwentyOne: percentChangeTwentyOne || "No Data"
      }, true);
      
      return updatedTable;
    });
  }
}, [totalPaymentsReceivedJanToFeb, totalPaymentsReceivedTwentyTwo, totalPaymentsReceivedTwentyOne , percentChangeJanToFeb, percentChangeTwentyTwo, percentChangeTwentyOne]);



// Calculate percentage changes
useEffect(() => {
  const calculatePercentChange = (currentYearValue, previousYearValue) => {
    if (currentYearValue !== "In progress" && previousYearValue !== "In progress") {
      const currentValue = parseDollarValue(currentYearValue);
      const previousValue = parseDollarValue(previousYearValue);

      if (previousValue === 0) {
        return "N/A";
      }

      const percentChange = ((currentValue - previousValue) / previousValue) * 100;
      return formatPercentage(percentChange);
    }
    return "No Data";
  };

  const janToFebPercentChange = calculatePercentChange(totalPaymentsReceivedJanToFeb, totalPaymentsReceivedTwentyTwo);
  const twentyTwoPercentChange = calculatePercentChange(totalPaymentsReceivedTwentyTwo, totalPaymentsReceivedTwentyOne);
  const twentyOnePercentChange = calculatePercentChange(totalPaymentsReceivedTwentyOne, totalPaymentsReceivedTwenty);

  setPercentChangeJanToFeb(janToFebPercentChange);
  setPercentChangeTwentyTwo(twentyTwoPercentChange);
  setPercentChangeTwentyOne(twentyOnePercentChange);

}, [totalPaymentsReceivedJanToFeb, totalPaymentsReceivedTwentyTwo, totalPaymentsReceivedTwentyOne, totalPaymentsReceivedTwenty]);


  /*---------------------------------------------------------------------------------------------------------------------------------------*/

  const ComaprisionTable = [
    {
      id: 1,
      Settlement: { value: "PO's Placed" },
      JanToFeb: {
        value: poPlacedJanToFeb || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyTwo: {
        value: poPlacedTwentyTwo || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyOne: {
        value: poPlacedTwentyOne || "In progress",
        color: theme.palette.primary.main,
      },
    },
    {
      id: 2,
      Settlement: { value: "PO's Accepted" },
      JanToFeb: {
        value: poAcceptedJanToFeb || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyTwo: {
        value: poAcceptedTwentyTwo || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyOne: {
        value: poAcceptedTwentyOne || "In progress",
        color: theme.palette.primary.main,
      },
    },
    {
      id: 3,
      Settlement: { value: "PO Acceptance Rate" },
      JanToFeb: {
        value: acceptanceRateJanToFeb !== null ? acceptanceRateJanToFeb : "-",
        color: theme.palette.success.extraDark,
      },
      TwentyTwo: {
        value: acceptanceRateTwentyTwo !== null ? acceptanceRateTwentyTwo : "-",
        color: theme.palette.success.extraDark,
      },
      TwentyOne: {
        value: acceptanceRateTwentyOne !== null ? acceptanceRateTwentyOne : "-",
        color: theme.palette.success.extraDark,
      },
    },
    {
      id: 4,
      Settlement: { value: "Payments Received - Inventory Sales" },
      JanToFeb: {
        value: inventorySaleJanToFeb || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyTwo: {
        value: inventorySaleTwentyTwo || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyOne: {
        value: inventorySaleTwentyOne || "In progress",
        color: theme.palette.primary.main,
      },
    },
    {
      id: 5,
      Settlement: { value: "Payments Received - Dropship Sales" },
      JanToFeb: {
        value: dropshipSaleJanToFeb || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyTwo: {
        value: dropshipSaleTwentyTwo || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyOne: {
        value: dropshipSaleTwentyOne || "In progress",
        color: theme.palette.primary.main,
      },
    },
    {
      id: 6,
      Settlement: { value: "Total Payments Received" },
      JanToFeb: {
        value: totalPaymentsReceivedJanToFeb || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyTwo: {
        value: totalPaymentsReceivedTwentyTwo || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyOne: {
        value: totalPaymentsReceivedTwentyOne || "In progress",
        color: theme.palette.primary.main,
      },
    },
    {
      id: 7,
      Settlement: { value: "% +/- (Previous Year)" },
      JanToFeb: {
        value: percentChangeJanToFeb || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyTwo: {
        value: percentChangeTwentyTwo || "In progress",
        color: theme.palette.primary.main,
      },
      TwentyOne: {
        value: percentChangeTwentyOne || "No Data",
        color: theme.palette.primary.main,
      },
    },
    // {
    //   id: 8,
    //   Settlement: { value: "Payement Receipt Forecast " },
    //   JanToFeb: { value: paymentReceiptForecast.JanToFeb, color: theme.palette.primary.main },
    //   TwentyTwo: { value: "-", color: theme.palette.primary.main },
    //   TwentyOne: { value: "-", color: theme.palette.primary.main },
    // },
    {
      id: 10,
      Settlement: { value: "Gross Margin %" },
      JanToFeb: {
        value: "50",
        color: theme.palette.primary.main,

        backgroundColor: "#e4e4e4",
        borderRadius: "20px",

        textAlign: "left",
        width: "120px",
        padding: "5px 7px",
      },
      TwentyTwo: {
        value: "50",
        color: theme.palette.primary.main,

        backgroundColor: "#e4e4e4",
        borderRadius: "20px",

        textAlign: "left",
        width: "120px",
        padding: "5px 7px",
      },
      TwentyOne: {
        value: "50",
        color: theme.palette.primary.main,

        backgroundColor: "#e4e4e4",
        borderRadius: "20px",

        textAlign: "left",
        width: "120px",
        padding: "5px 7px",
      },
    },
    // {
    //   id: 11,
    //   Settlement: { value: "Gross Profit" },
    //   JanToFeb: { value: "In progress", color: theme.palette.primary.main },
    //   TwentyTwo: { value: "In progress", color: theme.palette.primary.main },
    //   TwentyOne: { value: "In progress", color: theme.palette.primary.main },
    // },

    {
      id: 12,
      Settlement: { value: "SG&A % ", value2: "IconExclamation" },
      JanToFeb: {
        value: "20",
        color: theme.palette.primary.main,
        backgroundColor: "#e4e4e4",
        borderRadius: "20px",
        textAlign: "left",
        width: "120px",
        padding: "5px 7px",
      },
      TwentyTwo: {
        value: "20",
        color: theme.palette.primary.main,

        backgroundColor: "#e4e4e4",
        borderRadius: "20px",

        textAlign: "left",
        width: "120px",
        padding: "5px 7px",
      },
      TwentyOne: {
        value: "20",
        color: theme.palette.primary.main,

        backgroundColor: "#e4e4e4",
        borderRadius: "20px",

        textAlign: "left",
        width: "120px",
        padding: "5px 7px",
      },
    },
    // {
    //   id: 13,
    //   Settlement: { value: "SG&A ($) " },
    //   JanToFeb: { value: "$280,934.44", color: theme.palette.primary.main },
    //   TwentyTwo: { value: "$880,339.49", color: theme.palette.primary.main },
    //   TwentyOne: { value: "$459,133.02", color: theme.palette.primary.main },
    // },
  ];

  const ComaprisionTwoTable = [
    {
      id: 2,
      Settlement: "AMS (Excl. Credit Card)",
      JanToFeb: {
        value: amsJanToFeb.JanToFeb ? amsJanToFeb.JanToFeb : "In progress",
        color: theme.palette.primary.main,
        value2: 
        amsJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb!== "In progress"
        ? formatPercentage((parseDollarValue(amsJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: amsTwentyTwo.TwentyTwo ? amsTwentyTwo.TwentyTwo : "In progress",
        color: theme.palette.primary.main,
        value2: amsTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
          ? formatPercentage((parseDollarValue(amsTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
          : "%",
      },
      TwentyOne: {
        value: amsTwentyOne.TwentyOne ? amsTwentyOne.TwentyOne : "In progress",
        color: theme.palette.primary.main,
        value2: amsTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(amsTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },

    // To Do This
    {
      id: 3,
      Settlement: "AMS (Credit Card Spend)",
      JanToFeb: {
        value: "50",
        color: theme.palette.primary.main,

        backgroundColor: "#e4e4e4",
        borderRadius: "20px",

        textAlign: "left",
        width: "120px",
        padding: "5px 7px",
        value2: "",
      },
      TwentyTwo: {
        value: "50",
        color: theme.palette.primary.main,

        backgroundColor: "#e4e4e4",
        borderRadius: "20px",
        textAlign: "left",
        width: "120px",
        padding: "5px 7px",
        value2: "",
      },
      TwentyOne: {
        value: "50",
        color: theme.palette.primary.main,

        backgroundColor: "#e4e4e4",
        borderRadius: "20px",
        textAlign: "left",
        width: "120px",
        padding: "5px 7px",
        value2: "0.00%",
      },
    },
    {
      id: 4,
      Settlement: "C2FO Credit Memo",
      JanToFeb: {
        value: creditJanToFeb.JanToFeb
          ? creditJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        creditJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb!== "In progress"
        ? formatPercentage((parseDollarValue(creditJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: creditTwentyTwo.TwentyTwo
          ? creditTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: creditTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(creditTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: creditTwentyOne.TwentyOne
          ? creditTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: creditTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(creditTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },
    
    {
      id: 5,
      Settlement: "CoOp ",
      JanToFeb: {
        value: coopJanToFeb.JanToFeb ? coopJanToFeb.JanToFeb : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb!== "In progress"
        ? formatPercentage((parseDollarValue(coopJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: coopTwentyTwo.TwentyTwo
          ? coopTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: coopTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(coopTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: coopTwentyOne.TwentyOne
          ? coopTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: coopTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(coopTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },

    {
      id: 6,
      Settlement: "Accural",
      JanToFeb: {
        value: coopAccrualJanToFeb.JanToFeb
          ? coopAccrualJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopAccrualJanToFeb.JanToFeb !== "In progress" && coopJanToFeb.JanToFeb!== "In progress"
        ? formatPercentage((parseDollarValue(coopAccrualJanToFeb.JanToFeb) / parseDollarValue(coopJanToFeb.JanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: coopAccrualTwentyTwo.TwentyTwo
          ? coopAccrualTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopAccrualTwentyTwo.TwentyTwo !== "In progress" && coopTwentyTwo.TwentyTwo!== "In progress"
        ? formatPercentage((parseDollarValue(coopAccrualTwentyTwo.TwentyTwo) / parseDollarValue(coopTwentyTwo.TwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: coopAccrualTwentyOne.TwentyOne
          ? coopAccrualTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopAccrualTwentyOne.TwentyOne !== "In progress" && coopTwentyTwo.TwentyOne!== "In progress"
        ? formatPercentage((parseDollarValue(coopAccrualTwentyOne.TwentyOne) / parseDollarValue(coopTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },
    {
      id: 18,
      Settlement: "Straight Payment",
      JanToFeb: {
        value: coopStraightPaymentJanToFeb.JanToFeb
          ? coopStraightPaymentJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopStraightPaymentJanToFeb.JanToFeb !== "In progress" && coopJanToFeb.JanToFeb!== "In progress"
        ? formatPercentage((parseDollarValue(coopStraightPaymentJanToFeb.JanToFeb) / parseDollarValue(coopJanToFeb.JanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: coopStraightPaymentTwentyTwo.TwentyTwo
          ? coopStraightPaymentTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopStraightPaymentTwentyTwo.TwentyTwo !== "In progress" && coopTwentyTwo.TwentyTwo!== "In progress"
        ? formatPercentage((parseDollarValue(coopStraightPaymentTwentyTwo.TwentyTwo) / parseDollarValue(coopTwentyTwo.TwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: coopStraightPaymentTwentyOne.TwentyOne
          ? coopStraightPaymentTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopStraightPaymentTwentyOne.TwentyOne !== "In progress" && coopTwentyTwo.TwentyOne!== "In progress"
        ? formatPercentage((parseDollarValue(coopStraightPaymentTwentyOne.TwentyOne) / parseDollarValue(coopTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },
    {
      id: 19,
      Settlement: "Volume Incentive",
      JanToFeb: {
        value: coopVolumeIncentiveJanToFeb.JanToFeb
          ? coopVolumeIncentiveJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopVolumeIncentiveJanToFeb.JanToFeb !== "In progress" && coopJanToFeb.JanToFeb!== "In progress"
        ? formatPercentage((parseDollarValue(coopVolumeIncentiveJanToFeb.JanToFeb) / parseDollarValue(coopJanToFeb.JanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: coopVolumeIncentiveTwentyTwo.TwentyTwo
          ? coopVolumeIncentiveTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
      coopVolumeIncentiveTwentyTwo.TwentyTwo !== "In progress" && coopTwentyTwo.TwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(coopVolumeIncentiveTwentyTwo.TwentyTwo) / parseDollarValue(coopTwentyTwo.TwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: coopVolumeIncentiveTwentyOne.TwentyOne
          ? coopVolumeIncentiveTwentyOne.TwentyOne
          : "In progresss",
        color: theme.palette.primary.main,
        value2: 
        coopVolumeIncentiveTwentyOne.TwentyOne !== "In progress" && coopTwentyTwo.TwentyOne!== "In progress"
        ? formatPercentage((parseDollarValue(coopVolumeIncentiveTwentyOne.TwentyOne) / parseDollarValue(coopTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },

    {
      id: 20,
      Settlement: "Disposed",
      JanToFeb: {
        value: coopDisposedJanToFeb.JanToFeb
          ? coopDisposedJanToFeb.JanToFeb
          : "In progresss",
        color: theme.palette.primary.main,
        value2: 
        coopDisposedJanToFeb.JanToFeb !== "In progress" && coopJanToFeb.JanToFeb!== "In progress"
        ? formatPercentage((parseDollarValue(coopDisposedJanToFeb.JanToFeb) / parseDollarValue(coopJanToFeb.JanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: coopDisposedTwentyTwo.TwentyTwo
          ? coopDisposedTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopDisposedTwentyTwo.TwentyTwo !== "In progress" && coopTwentyTwo.TwentyTwo!== "In progress"
        ? formatPercentage((parseDollarValue(coopDisposedTwentyTwo.TwentyTwo) / parseDollarValue(coopTwentyTwo.TwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: coopDisposedTwentyOne.TwentyOne
          ? coopDisposedTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopDisposedTwentyOne.TwentyOne !== "In progress" && coopTwentyTwo.TwentyOne!== "In progress"
        ? formatPercentage((parseDollarValue(coopDisposedTwentyOne.TwentyOne) / parseDollarValue(coopTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },
    {
      id: 21,
      Settlement: "Vendor Funded Sales Discount",
      JanToFeb: {
        value: coopVendorFundedJanToFeb.JanToFeb
          ? coopVendorFundedJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopVendorFundedJanToFeb.JanToFeb !== "In progress" && coopJanToFeb.JanToFeb!== "In progress"
        ? formatPercentage((parseDollarValue(coopVendorFundedJanToFeb.JanToFeb) / parseDollarValue(coopJanToFeb.JanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: coopVendorFundedTwentyTwo.TwentyTwo
          ? coopVendorFundedTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopVendorFundedTwentyTwo.TwentyTwo !== "In progress" && coopTwentyTwo.TwentyTwo!== "In progress"
        ? formatPercentage((parseDollarValue(coopVendorFundedTwentyTwo.TwentyTwo) / parseDollarValue(coopTwentyTwo.TwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: coopVendorFundedTwentyOne.TwentyOne
          ? coopVendorFundedTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        coopVendorFundedTwentyOne.TwentyOne !== "In progress" && coopTwentyTwo.TwentyOne!== "In progress"
        ? formatPercentage((parseDollarValue(coopVendorFundedTwentyOne.TwentyOne) / parseDollarValue(coopTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },

    {
      id: 7,
      Settlement: "Operational Chargeback Total",
      JanToFeb: {
        value: operationalChargebackDeductionJanToFeb.JanToFeb
          ? operationalChargebackDeductionJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        operationalChargebackDeductionJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb!== "In progress"
        ? formatPercentage((parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: operationalChargebackDeductionTwentyTwo.TwentyTwo
          ? operationalChargebackDeductionTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: operationalChargebackDeductionTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
        : "%",

      },
      TwentyOne: {
        value: operationalChargebackDeductionTwentyOne.TwentyOne
          ? operationalChargebackDeductionTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: operationalChargebackDeductionTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },
    {
      id: 8,
      Settlement: "OC - ASN accuracy",
      JanToFeb: {
        value: ocDataJanToFeb.JanToFeb,
        color: theme.palette.primary.main,
      value2: 
      ocDataJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb !== "In progress"
        ? formatPercentage((parseDollarValue(ocDataJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocDataTwentyTwo.TwentyTwo,
        color: theme.palette.primary.main,
        value2: 
        ocDataTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(ocDataTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo)) * 100)
        : "%",
        
      },
      TwentyOne: {
        value: ocDataTwentyOne.TwentyOne,
        color: theme.palette.primary.main,
        value2: 
        ocDataTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(ocDataTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },

    {
      id: 9,
      Settlement: "OC - No carton/package content label",
      JanToFeb: {
        value: ocNoLabelDataJanToFeb.JanToFeb,
        color: theme.palette.primary.main,
        value2: 
        ocNoLabelDataJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb !== "In progress"
        ? formatPercentage((parseDollarValue(ocNoLabelDataJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocNoLabelDataTwentyTwo.TwentyTwo,
        color: theme.palette.primary.main,
        value2: 
        ocNoLabelDataTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(ocNoLabelDataTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: ocNoLabelDataTwentyOne.TwentyOne,
        color: theme.palette.primary.main,
        value2: 
        ocNoLabelDataTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(ocNoLabelDataTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },

    {
      id: 31,
      Settlement: "OC - Overage PO units",
      JanToFeb: {
        value: ocOveragePOUnitsJanToFeb.JanToFeb
          ? ocOveragePOUnitsJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        ocOveragePOUnitsJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb !== "In progress"
        ? formatPercentage((parseDollarValue(ocOveragePOUnitsJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocOveragePOUnitsTwentyTwo.TwentyTwo
          ? ocOveragePOUnitsTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        ocOveragePOUnitsTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(ocOveragePOUnitsTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: ocOveragePOUnitsTwentyOne.TwentyOne
          ? ocOveragePOUnitsTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        ocOveragePOUnitsTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(ocOveragePOUnitsTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },

    {
      id: 22,
      Settlement: "OC - Overweight Carton",
      JanToFeb: {
        value: ocOverweightDataJanToFeb.JanToFeb,
        color: theme.palette.primary.main,
        value2: 
        ocOverweightDataJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb !== "In progress"
        ? formatPercentage((parseDollarValue(ocOverweightDataJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocOverweightDataTwentyTwo.TwentyTwo,
        color: theme.palette.primary.main,
        value2: 
        ocOverweightDataTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(ocOverweightDataTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: ocOverweightDataTwentyOne.TwentyOne,
        color: theme.palette.primary.main,
        value2: 
        ocOverweightDataTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(ocOverweightDataTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },
    {
      id: 23,
      Settlement: "OC - PO on-time accuracy",
      JanToFeb: {
        value: ocPOOnTimeDataJanToFeb.JanToFeb
          ? ocPOOnTimeDataJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        ocPOOnTimeDataJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb !== "In progress"
        ? formatPercentage((parseDollarValue(ocPOOnTimeDataJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocPOOnTimeDataTwentyTwo.TwentyTwo
          ? ocPOOnTimeDataTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        ocPOOnTimeDataTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(ocPOOnTimeDataTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: ocPOOnTimeDataTwentyOne.TwentyOne
          ? ocPOOnTimeDataTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        ocPOOnTimeDataTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(ocPOOnTimeDataTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },
    {
      id: 24,
      Settlement: "OC - Prep - External bubble wrapping",
      JanToFeb: {
        value: ocPrepBubbleDataJanToFeb.JanToFeb || "In progress",
        color: theme.palette.primary.main,
        value2: 
        ocPrepBubbleDataJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb !== "In progress"
        ? formatPercentage((parseDollarValue(ocPrepBubbleDataJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocPrepBubbleDataTwentyTwo.TwentyTwo || "In progress",
        color: theme.palette.primary.main,
        value2: ocPrepBubbleDataTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(ocPrepBubbleDataTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: ocPrepBubbleDataTwentyOne.TwentyOne || "In progress",
        color: theme.palette.primary.main,
        value2: ocPrepBubbleDataTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(ocPrepBubbleDataTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },
    {
      id: 25,
      Settlement: "OC - Ship In Own Container",
      JanToFeb: {
        value: ocShipOwnContainerJanToFeb.JanToFeb
          ? ocShipOwnContainerJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocShipOwnContainerJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocShipOwnContainerJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb
        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocShipOwnContainerTwentyTwo.TwentyTwo
          ? ocShipOwnContainerTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocShipOwnContainerTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(ocShipOwnContainerTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: ocShipOwnContainerTwentyOne.TwentyOne
          ? ocShipOwnContainerTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocShipOwnContainerTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(ocShipOwnContainerTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne)) * 100)
        : "%",
      },
    },
    {
      id: 26,
      Settlement: "OC - Carton Content Accuracy",
      JanToFeb: {
        value: ocCartonContentAccuracyJanToFeb.JanToFeb
          ? ocCartonContentAccuracyJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocCartonContentAccuracyJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocCartonContentAccuracyJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb
        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocCartonContentAccuracyTwentyTwo.TwentyTwo
          ? ocCartonContentAccuracyTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocCartonContentAccuracyTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyTwo
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocCartonContentAccuracyTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo
        )) * 100)
        : "%",
      },
      TwentyOne: {
        value: ocCartonContentAccuracyTwentyOne.TwentyOne
          ? ocCartonContentAccuracyTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocCartonContentAccuracyTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocCartonContentAccuracyTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne
        )) * 100)
        : "%",
      },
    },
    {
      id: 27,
      Settlement: "OC - Overweight Carton",
      JanToFeb: {
        value: ocOverweightCartonJanToFeb.JanToFeb
          ? ocOverweightCartonJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocOverweightCartonJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocOverweightCartonJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb
        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocOverweightCartonTwentyTwo.TwentyTwo
          ? ocOverweightCartonTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocOverweightCartonTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyTwo
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocOverweightCartonTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo
        )) * 100)
        : "%",
      },
      TwentyOne: {
        value: ocOverweightCartonTwentyOne.TwentyOne
          ? ocOverweightCartonTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocOverweightCartonTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocOverweightCartonTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne
        )) * 100)
        : "%",
      },
    },
    {
      id: 28,
      Settlement: "OC - Prep - Internal bubble wrap",
      JanToFeb: {
        value: ocPrepInternalBubbleWrapJanToFeb.JanToFeb
          ? ocPrepInternalBubbleWrapJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocPrepInternalBubbleWrapJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocPrepInternalBubbleWrapJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb

        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocPrepInternalBubbleWrapTwentyTwo.TwentyTwo
          ? ocPrepInternalBubbleWrapTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocPrepInternalBubbleWrapTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyTwo
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocPrepInternalBubbleWrapTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo
        )) * 100)
        : "%",
      },
      TwentyOne: {
        value: ocPrepInternalBubbleWrapTwentyOne.TwentyOne
          ? ocPrepInternalBubbleWrapTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocPrepInternalBubbleWrapTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocPrepInternalBubbleWrapTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne
        )) * 100)
        : "%",
      },
    },
    {
      id: 29,
      Settlement: "OC - Prep - Bagging",
      JanToFeb: {
        value: ocPrepBaggingJanToFeb.JanToFeb
          ? ocPrepBaggingJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocPrepBaggingJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocPrepBaggingJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb

        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocPrepBaggingTwentyTwo.TwentyTwo
          ? ocPrepBaggingTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocPrepBaggingTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyTwo
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocPrepBaggingTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo
        )) * 100)
        : "%",
      },
      TwentyOne: {
        value: ocPrepBaggingTwentyOne.TwentyOne
          ? ocPrepBaggingTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocPrepBaggingTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocPrepBaggingTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne
        )) * 100)
        : "%",
      },
    },
    {
      id: 30,
      Settlement: "OC - Unconfirmed PO units",
      JanToFeb: {
        value: ocUnconfirmedPOUnitsJanToFeb.JanToFeb
          ? ocUnconfirmedPOUnitsJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocUnconfirmedPOUnitsJanToFeb.JanToFeb !== "In progress" && operationalChargebackDeductionJanToFeb.JanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocUnconfirmedPOUnitsJanToFeb.JanToFeb) / parseDollarValue(operationalChargebackDeductionJanToFeb.JanToFeb

        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: ocUnconfirmedPOUnitsTwentyTwo.TwentyTwo
          ? ocUnconfirmedPOUnitsTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocUnconfirmedPOUnitsTwentyTwo.TwentyTwo !== "In progress" && operationalChargebackDeductionTwentyTwo.TwentyTwo
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocUnconfirmedPOUnitsTwentyTwo.TwentyTwo) / parseDollarValue(operationalChargebackDeductionTwentyTwo.TwentyTwo
        )) * 100)
        : "%",
      },
      TwentyOne: {
        value: ocUnconfirmedPOUnitsTwentyOne.TwentyOne
          ? ocUnconfirmedPOUnitsTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: ocUnconfirmedPOUnitsTwentyOne.TwentyOne !== "In progress" && operationalChargebackDeductionTwentyOne.TwentyOne
        !== "In progress"
        ? formatPercentage((parseDollarValue(ocUnconfirmedPOUnitsTwentyOne.TwentyOne) / parseDollarValue(operationalChargebackDeductionTwentyOne.TwentyOne
        )) * 100)
        : "%",
      },
    },

    {
      id: 10,
      Settlement: "Net Post Audit Deduction",
      JanToFeb: {
        value: postJanToFeb.JanToFeb
          ? postJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: 
        postJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb!== "In progress"
        ? formatPercentage((parseDollarValue(postJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb)) * 100)
        : "%",
      },
      TwentyTwo: {
        value: postTwentyTwo.TwentyTwo
        ? postTwentyTwo.TwentyTwo
        : "In progress",
        color: theme.palette.primary.main,
        value2: postTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(postTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
        : "%",

      },
      TwentyOne: {
        value: postTwentyOne.TwentyOne
          ? postTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: postTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(postTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },
    {
      id: 11,
      Settlement: "Net Price Claim",
      JanToFeb: {
        value: netPriceClaimJanToFeb.JanToFeb
          ? netPriceClaimJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: netPriceClaimJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(netPriceClaimJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb
        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: netPriceClaimTwentyTwo.TwentyTwo
          ? netPriceClaimTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: netPriceClaimTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(netPriceClaimTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: netPriceClaimTwentyOne.TwentyOne
          ? netPriceClaimTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: netPriceClaimTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(netPriceClaimTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },

    {
      id: 12,
      Settlement: "Net Shortage",
      JanToFeb: {
        value: netShortagesJanToFeb.JanToFeb
          ? netShortagesJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: netShortagesJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(netShortagesJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb
        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: netShortagesTwentyTwo.TwentyTwo
          ? netShortagesTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: netShortagesTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(netShortagesTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: netShortagesTwentyOne.TwentyOne
          ? netShortagesTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: netShortagesTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(netShortagesTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },

    {
      id: 13,
      Settlement: "Return Deduction",
      JanToFeb: {
        value: returnsDeductionJanToFeb.JanToFeb
          ? returnsDeductionJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: returnsDeductionJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(returnsDeductionJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb
        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: returnsDeductionTwentyTwo.TwentyTwo
          ? returnsDeductionTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: returnsDeductionTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(returnsDeductionTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: returnsDeductionTwentyOne.TwentyOne
          ? returnsDeductionTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: returnsDeductionTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(returnsDeductionTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },

    {
      id: 14,
      Settlement: "Net Return Freight Charges",
      JanToFeb: {
        value: netReturnFreightChargesJanToFeb.JanToFeb
          ? netReturnFreightChargesJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: netReturnFreightChargesJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(netReturnFreightChargesJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb
        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: netReturnFreightChargesTwentyTwo.TwentyTwo
          ? netReturnFreightChargesTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: netReturnFreightChargesTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(netReturnFreightChargesTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: netReturnFreightChargesTwentyOne.TwentyOne
          ? netReturnFreightChargesTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: netReturnFreightChargesTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(netReturnFreightChargesTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },
    {
      id: 15,
      Settlement: "Net Return Handling Charges",
      JanToFeb: {
        value: handleJanToFeb.JanToFeb
          ? handleJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: handleJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(handleJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb
        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: handleTwentyTwo.TwentyTwo
        ? handleTwentyTwo.TwentyTwo
        : "In progress",
        color: theme.palette.primary.main,
        value2: handleTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(handleTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: handleTwentyOne.TwentyOne
          ? postTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: handleTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(handleTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },
    {
      id: 16,
      Settlement: "Quick Pay Discount",
      JanToFeb: {
        value: qpdJanToFeb.JanToFeb
          ? qpdJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: qpdJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(qpdJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb
        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: qpdTwentyTwo.TwentyTwo
        ? qpdTwentyTwo.TwentyTwo
        : "In progress",
        color: theme.palette.primary.main,
        value2: qpdTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(qpdTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: qpdTwentyOne.TwentyOne
        ? qpdTwentyOne.TwentyOne
        : "In progress",
        color: theme.palette.primary.main,
        value2: qpdTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(qpdTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },
    // {
    //   id: 17,
    //   Settlement: "Total Deductions",
    //   JanToFeb: {
    //     value: "$412,218.27",
    //     color: theme.palette.primary.main,
    //     value2: "29.35%",
    //   },
    //   TwentyTwo: {
    //     value: "$839,784.82",
    //     color: theme.palette.primary.main,
    //     value2: "19.08%",
    //   },
    //   TwentyOne: {
    //     value: "$445,011.46",
    //     color: theme.palette.primary.main,
    //     value2: "19.38%",
    //   },
    // },
    {
      id: 17,
      Settlement: "Total Deductions",
      JanToFeb: {
        value: totalDeductionsJanToFeb.JanToFeb ? totalDeductionsJanToFeb.JanToFeb : "In progress",
        color: theme.palette.primary.main,
        value2: totalDeductionsJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb !== "In progress"
          ? formatPercentage((parseDollarValue(totalDeductionsJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb)) * 100)
          : "%",
      },
      TwentyTwo: {
        value: totalDeductionsTwentyTwo.TwentyTwo ? totalDeductionsTwentyTwo.TwentyTwo : "In progress",
        color: theme.palette.primary.main,
        value2: totalDeductionsTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
          ? formatPercentage((parseDollarValue(totalDeductionsTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
          : "%",
      },
      TwentyOne: {
        value: totalDeductionsTwentyOne.TwentyOne ? totalDeductionsTwentyOne.TwentyOne : "In progress",
        color: theme.palette.primary.main,
        value2: totalDeductionsTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
          ? formatPercentage((parseDollarValue(totalDeductionsTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
          : "%",
      },
    },
  ];
  const ComparisonTwoNewTable = [
    {
      id: 1,
      Settlement: "Provision Deduction",
      JanToFeb: {
        value: provisionDeductionJanToFeb.JanToFeb
          ? provisionDeductionJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
        value2: provisionDeductionJanToFeb.JanToFeb !== "In progress" && totalPaymentsReceivedJanToFeb
        !== "In progress"
        ? formatPercentage((parseDollarValue(provisionDeductionJanToFeb.JanToFeb) / parseDollarValue(totalPaymentsReceivedJanToFeb
        )) * 100)
        : "%",
      },
      TwentyTwo: {
        value: provisionDeductionTwentyTwo.TwentyTwo
          ? provisionDeductionTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
        value2: provisionDeductionTwentyTwo.TwentyTwo !== "In progress" && totalPaymentsReceivedTwentyTwo !== "In progress"
        ? formatPercentage((parseDollarValue(provisionDeductionTwentyTwo.TwentyTwo) / parseDollarValue(totalPaymentsReceivedTwentyTwo)) * 100)
        : "%",
      },
      TwentyOne: {
        value: provisionDeductionTwentyOne.TwentyOne
          ? provisionDeductionTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
        value2: provisionDeductionTwentyOne.TwentyOne !== "In progress" && totalPaymentsReceivedTwentyOne !== "In progress"
        ? formatPercentage((parseDollarValue(provisionDeductionTwentyOne.TwentyOne) / parseDollarValue(totalPaymentsReceivedTwentyOne)) * 100)
        : "%",
      },
    },
  ];

  // To Do This

  const ComparisonNewTable = [
    {
      id: 1,
      Settlement: {
        value: "EBITDA%",
        color: theme.palette.primary.main,
        value2: "IconExclamation",
      },
      JanToFeb: { value: "9.48%", color: theme.palette.primary.main },
      TwentyTwo: { value: "8.82%", color: theme.palette.primary.main },
      TwentyOne: { value: "11.48%", color: theme.palette.primary.main },
    },
    {
      id: 2,
      Settlement: {
        value: "EBITDA",
        color: theme.palette.primary.main,
        // value2: "IconExclamation",
      },
      JanToFeb: { value: "$133,127.58", color: theme.palette.primary.main },
      TwentyTwo: { value: "$388,136.59", color: theme.palette.primary.main },
      TwentyOne: { value: "$263,465.44", color: theme.palette.primary.main },
    },
    {
      id: 3,
      Settlement: {
        value: "% +/- Against Previous Year",
        color: theme.palette.primary.main,
      },
      JanToFeb: { value: "-65.70%", color: theme.palette.error.main },
      TwentyTwo: { value: "47.32%", color: theme.palette.success.extraDark },
      TwentyOne: { value: "-61.06%", color: theme.palette.error.main },
    },
  ];

  const Comparisontable = [
    {
      id: 1,
      Settlement: "OC - SIOC Incentive",
      JanToFeb: { value: osiJanToFeb.JanToFeb
        ? osiJanToFeb.JanToFeb
        : "In progress", color: theme.palette.primary.main },


      TwentyTwo: { value: osiTwentyTwo.TwentyTwo
          ? osiTwentyTwo.TwentyTwo
          : "In progress", color: theme.palette.primary.main },


      TwentyOne: { value: osiTwentyOne.TwentyOne
        ? osiTwentyOne.TwentyOne
        : "In progress", color: theme.palette.primary.main },
    },
    {
      id: 2,
      Settlement: "CoOp Refund",
      JanToFeb: { value: refuJanToFeb.JanToFeb
        ? refuJanToFeb.JanToFeb
        : "In progress", color: theme.palette.primary.main },

      TwentyTwo: { value: refuTwentyTwo.TwentyTwo
        ? refuTwentyTwo.TwentyTwo
        : "In progress", color: theme.palette.primary.main },

      TwentyOne: { value: refuTwentyOne.TwentyOne
        ? refuTwentyOne.TwentyOne
        : "In progress", color: theme.palette.primary.main },
    },
    {
      id: 5,
      Settlement: "Return Refund",
      JanToFeb: { value: rrefuJanToFeb.JanToFeb
        ? rrefuJanToFeb.JanToFeb
        : "In progress", color: theme.palette.primary.main },

      TwentyTwo: { value: rrefuTwentyTwo.TwentyTwo
        ? rrefuTwentyTwo.TwentyTwo
        : "In progress", color: theme.palette.primary.main },


      TwentyOne: { value: rrefuTwentyOne.TwentyOne
        ? rrefuTwentyOne.TwentyOne
        : "In progress", color: theme.palette.primary.main },
    },
    
    {
      id: 6,
      Settlement: "Provision Reversal",
      JanToFeb: {
        value: provisionReversalJanToFeb.JanToFeb
          ? provisionReversalJanToFeb.JanToFeb
          : "In progress",
        color: theme.palette.primary.main,
      },
      TwentyTwo: {
        value: provisionReversalTwentyTwo.TwentyTwo
          ? provisionReversalTwentyTwo.TwentyTwo
          : "In progress",
        color: theme.palette.primary.main,
      },
      TwentyOne: {
        value: provisionReversalTwentyOne.TwentyOne
          ? provisionReversalTwentyOne.TwentyOne
          : "In progress",
        color: theme.palette.primary.main,
      },
    },
  ];

  // Default values
  const defaultSgaPercent = "20";
  const defaultGrossMarginPercent = "50";
  // const defaultAmsCreditPercent = "50";

  // State variables
  const [isEditingSga, setIsEditingSga] = useState(false);
  const [editedSgaPercent, setEditedSgaPercent] = useState(defaultSgaPercent);
  const [isEditingGrossMargin, setIsEditingGrossMargin] = useState(false);
  const [editedGrossMarginPercent, setEditedGrossMarginPercent] = useState(
    defaultGrossMarginPercent
  );
  // const [editedAmsPercent, setEditedAmsPercent] = useState(defaultAmsCreditPercent);
  const [comparisonTable, setComparisonTable] = useState(ComaprisionTable);
  const [comparisonNewTable, setComparisonNewTable] =
    useState(ComparisonNewTable);
  const [editedEbitdaPercent, setEditedEbitdaPercent] = useState(0); // State for EBITDA %

  /*------------------------------------------------------------- API for Years -----------------------------------------------------------------*/

  useEffect(() => {
    // Fetch years data from API
    const fetchYears = async () => {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");

      try {
        const response = await fetch(
          `http://16.170.22.123:8082/financialDashboard/getYear?vendorId=${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.status === "SUCCESS") {
            setYears({
              currentYear: `${data.data.count}`,
              year1: `${data.data.count - 1}`,
              year2: `${data.data.count - 2}`,
            });
          } else {
            console.error("Failed to fetch years data:", data.errorMessage);
          }
        } else {
          console.error("Failed to fetch years data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching years data:", error);
      }
    };

    fetchYears();
  }, []);

  /*------------------------------------------------------------- API for Table ---------------------------------------------------------------*/

  // Handlers for SG&A %
  const handleSgaValueClick = (value) => {
    if (value === defaultSgaPercent) {
      setEditedSgaPercent(value);
      setIsEditingSga(true);
    }
  };

  const handleSgaPercentChange = (event) => {
    setEditedSgaPercent(event.target.value);
  };

  const handleSgaSave = () => {
    setIsEditingSga(false);
    // Update the SG&A ($) values based on the new SG&A %
    const updatedTable = comparisonTable.map((row) => {
      if (row.Settlement.value === "SG&A ($) ") {
        const totalPaymentsReceived = comparisonTable.find(
          (item) => item.Settlement.value === "Total Payments Received"
        ).JanToFeb.value;
        const sgaValue =
          (parseFloat(editedSgaPercent) / 100) *
          parseFloat(totalPaymentsReceived.replace(/[^0-9.-]+/g, ""));
        console.log("Updated SG&A value:", sgaValue);
        return {
          ...row,
          JanToFeb: {
            ...row.JanToFeb,
            value: `$${sgaValue.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
          },
        };
      }
      return row;
    });

    setComparisonTable(updatedTable);

    // Log the updated state for verification
    console.log("Updated Comparison Table:", updatedTable);

    calculateEbitda(updatedTable);
  };

  const handleSgaCancel = () => {
    setEditedSgaPercent(defaultSgaPercent);
    setIsEditingSga(false);
  };

  // Handlers for Gross Margin %
  const handleGrossMarginValueClick = (value) => {
    if (value === defaultGrossMarginPercent) {
      setEditedGrossMarginPercent(value);
      setIsEditingGrossMargin(true);
    }
  };

  const handleGrossMarginPercentChange = (event) => {
    setEditedGrossMarginPercent(event.target.value);
  };

  const handleGrossMarginSave = () => {
    setIsEditingGrossMargin(false);
    // Update the Gross Profit values based on the new Gross Margin %
    const updatedTable = comparisonTable.map((row) => {
      if (row.Settlement.value === "Gross Profit") {
        const totalPaymentsReceived = comparisonTable.find(
          (item) => item.Settlement.value === "Total Payments Received"
        ).JanToFeb.value;
        const grossProfit =
          (parseFloat(editedGrossMarginPercent) / 100) *
          parseFloat(totalPaymentsReceived.replace(/[^0-9.-]+/g, ""));
        return {
          ...row,
          // JanToFeb: { ...row.JanToFeb, value: `$${grossProfit.toFixed(2)}` }
          JanToFeb: {
            ...row.JanToFeb,
            value: `$${grossProfit.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
          },
        };
      }
      return row;
    });

    setComparisonTable(updatedTable);
    calculateEbitda(updatedTable);
  };

  const handleGrossMarginCancel = () => {
    setEditedGrossMarginPercent(defaultGrossMarginPercent);
    setIsEditingGrossMargin(false);
  };

  // Reset state on unmount/navigate away
  useEffect(() => {
    return () => {
      setEditedSgaPercent(defaultSgaPercent);
      setEditedGrossMarginPercent(defaultGrossMarginPercent);
    };
  }, [defaultSgaPercent, defaultGrossMarginPercent]);

  const calculateEbitda = (updatedComparisonTable) => {
    const grossProfitRow = updatedComparisonTable.find(
      (row) => row.Settlement.value === "Gross Profit"
    );
    const sgaRow = updatedComparisonTable.find(
      (row) => row.Settlement.value === "SG&A ($) "
    );
    const totalDeductionRow = ComaprisionTwoTable.find(
      (row) => row.Settlement === "Total Deductions"
    ) || { JanToFeb: { value: "0" } };
    const totalPaymentsReceivedRow = updatedComparisonTable.find(
      (row) => row.Settlement.value === "Total Payments Received"
    );
    const provisionalDeductionRow = ComparisonTwoNewTable.find(
      (row) => row.Settlement === "Provision Deduction"
    ) || { JanToFeb: { value: "0" } };
    const ocRow = Comparisontable.find(
      (row) => row.Settlement === "OC - SIOC Incentive"
    );
    const coOpRefundRow = Comparisontable.find(
      (row) =>
        row.Settlement ===
        "CoOp Refund (Incl.Accruals,Promotions,PP,StraightPays,etc)"
    );
    const returnRefundRow = Comparisontable.find(
      (row) => row.Settlement === "Return Refund"
    );
    const provisionalReversalRow = Comparisontable.find(
      (row) => row.Settlement === "Provision Reversal"
    );

    const grossProfit = grossProfitRow
      ? parseFloat(grossProfitRow.JanToFeb.value.replace(/[^0-9.-]+/g, ""))
      : 0;
    const sga = sgaRow
      ? parseFloat(sgaRow.JanToFeb.value.replace(/[^0-9.-]+/g, ""))
      : 0;
    const totalDeduction = totalDeductionRow
      ? parseFloat(totalDeductionRow.JanToFeb.value.replace(/[^0-9.-]+/g, ""))
      : 0;
    const totalPaymentsReceived = totalPaymentsReceivedRow
      ? parseFloat(
          totalPaymentsReceivedRow.JanToFeb.value.replace(/[^0-9.-]+/g, "")
        )
      : 0;
    const provisionalDeduction = provisionalDeductionRow
      ? parseFloat(
          provisionalDeductionRow.JanToFeb.value.replace(/[^0-9.-]+/g, "")
        )
      : 0;
    const provisionalReversal = provisionalReversalRow
      ? parseFloat(
          provisionalReversalRow.JanToFeb.value.replace(/[^0-9.-]+/g, "")
        )
      : 0;
    const returnRefund = returnRefundRow
      ? parseFloat(returnRefundRow.JanToFeb.value.replace(/[^0-9.-]+/g, ""))
      : 0;
    const coopRefund = coOpRefundRow
      ? parseFloat(coOpRefundRow.JanToFeb.value.replace(/[^\d.-]/g, ""))
      : 0;
    const oc = ocRow
      ? parseFloat(ocRow.JanToFeb.value.replace(/[^0-9.-]+/g, ""))
      : 0;

    const ebitda =
      grossProfit -
      sga -
      totalDeduction -
      provisionalDeduction +
      provisionalReversal +
      returnRefund +
      coopRefund +
      oc;
    const ebitdaPercent = (ebitda / totalPaymentsReceived) * 100;

    console.log("Gross Profit:", grossProfit);
    console.log("SG&A:", sga);
    console.log("Total Deduction:", totalDeduction);
    console.log("Total Payments Received:", totalPaymentsReceived);
    console.log("Provisional Deduction:", provisionalDeduction);
    console.log("Provisional Reversal:", provisionalReversal);
    console.log("Return Refund:", returnRefund);
    console.log("CoOp Refund:", coopRefund);
    console.log("OC:", oc);
    console.log("EBITDA:", ebitda);
    console.log("EBITDA %:", ebitdaPercent);

    setEditedEbitdaPercent(ebitdaPercent);

    // Update ComparisonNewTable with calculated EBITDA and EBITDA%
    const updatedComparisonNewTable = comparisonNewTable.map((row) => {
      if (row.Settlement.value === "EBITDA%") {
        return {
          ...row,
          JanToFeb: { ...row.JanToFeb, value: `${ebitdaPercent.toFixed(2)}%` },
        };
      } else if (row.Settlement.value === "EBITDA") {
        return {
          ...row,
          JanToFeb: {
            ...row.JanToFeb,
            value: `$${ebitda.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`,
          },
        };
      }
      return row;
    });

    setComparisonNewTable(updatedComparisonNewTable);
  };

  return (
    <BoxStyled>
      <Table>
        <TableHead>
          <TableRow style={{ backgroundColor: theme.palette.primary.light }}>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              Categories
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              {/* Jan To Feb-2024 */}
              {years.currentYear}
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              {/* 2023 */}
              {years.year1}
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              {/* 2022 */}
              {years.year2}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {comparisonTable.map((row, index) => (
            <TableRowStyled key={row.id} index={index} theme={theme}>
              <TableCellStyled>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Typography
                    variant="body2"
                    style={{
                      color: row.Settlement.color,
                      fontWeight: "500",
                      fontSize: "15px",
                    }}
                  >
                    {row.Settlement.value}
                  </Typography>
                  {row.Settlement.value2 && (
                    <Tooltip title="Selling, General and Administrative Expenses">
                      <div
                        style={{
                          backgroundColor: theme.palette.success.extraDark,
                          borderRadius: "50%",
                          padding: "2px",
                          height: "15px",
                          width: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconExclamationMark
                          size={16}
                          strokeWidth={1.5}
                          style={{ color: "white" }}
                        />
                      </div>
                    </Tooltip>
                  )}
                </Stack>
              </TableCellStyled>
              <TableCellStyled>
                {row.Settlement.value === "SG&A % " && isEditingSga ? (
                  <TextField
                    value={editedSgaPercent}
                    onChange={handleSgaPercentChange}
                    variant="outlined"
                    size="small"
                    autoFocus
                    fullWidth
                  />
                ) : row.Settlement.value === "Gross Margin %" &&
                  isEditingGrossMargin ? (
                  <TextField
                    value={editedGrossMarginPercent}
                    onChange={handleGrossMarginPercentChange}
                    variant="outlined"
                    size="small"
                    autoFocus
                    fullWidth
                  />
                ) : (
                  <Typography
                    variant="body2"
                    onClick={() => {
                      if (row.Settlement.value === "SG&A % ") {
                        handleSgaValueClick(row.JanToFeb.value);
                      } else if (row.Settlement.value === "Gross Margin %") {
                        handleGrossMarginValueClick(row.JanToFeb.value);
                      }
                    }}
                    style={{
                      color: row.JanToFeb.color,
                      backgroundColor: row.JanToFeb.backgroundColor,
                      borderRadius: row.JanToFeb.borderRadius,
                      textAlign: row.JanToFeb.textAlign,
                      fontWeight: "500",
                      fontSize: "15px",
                      width: row.JanToFeb.width,
                      padding: row.JanToFeb.padding,
                      cursor: "pointer",
                    }}
                  >
                    {row.Settlement.value === "SG&A % " &&
                    row.JanToFeb.value === defaultSgaPercent
                      ? editedSgaPercent
                      : row.Settlement.value === "Gross Margin %" &&
                        row.JanToFeb.value === defaultGrossMarginPercent
                      ? editedGrossMarginPercent
                      : row.JanToFeb.value}
                  </Typography>
                )}
              </TableCellStyled>
              <TableCellStyled>
                <Typography
                  variant="body2"
                  style={{
                    color: row.TwentyTwo.color,
                    backgroundColor: row.TwentyTwo.backgroundColor,
                    borderRadius: row.TwentyTwo.borderRadius,
                    textAlign: row.JanToFeb.textAlign,
                    fontWeight: "500",
                    fontSize: "14px",
                    width: row.TwentyTwo.width,
                    padding: row.TwentyTwo.padding,
                  }}
                >
                  {row.TwentyTwo.value}
                </Typography>
              </TableCellStyled>
              <TableCellStyled>
                <Typography
                  variant="body2"
                  style={{
                    color: row.TwentyOne.color,
                    backgroundColor: row.TwentyOne.backgroundColor,
                    borderRadius: row.TwentyOne.borderRadius,
                    textAlign: row.TwentyOne.textAlign,
                    fontWeight: "500",
                    fontSize: "14px",
                    width: row.TwentyOne.width,
                    padding: row.TwentyOne.padding,
                  }}
                >
                  {row.TwentyOne.value}
                </Typography>
              </TableCellStyled>
            </TableRowStyled>
          ))}
        </TableBody>

        {/* Pop-up or Modal for Editing SG&A */}
        <Dialog open={isEditingSga} onClose={handleSgaCancel}>
          <DialogTitle>Edit SG&A % Value</DialogTitle>
          <DialogContent>
            <TextField
              value={editedSgaPercent}
              onChange={handleSgaPercentChange}
              variant="outlined"
              size="small"
              autoFocus
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSgaCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSgaSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        {/* Pop-up or Modal for Editing Gross Margin */}
        <Dialog open={isEditingGrossMargin} onClose={handleGrossMarginCancel}>
          <DialogTitle>Edit Gross Margin % Value</DialogTitle>
          <DialogContent>
            <TextField
              value={editedGrossMarginPercent}
              onChange={handleGrossMarginPercentChange}
              variant="outlined"
              size="small"
              autoFocus
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleGrossMarginCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={handleGrossMarginSave} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <TableHead>
          <TableRow style={{ backgroundColor: theme.palette.primary.light }}>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              Deductions
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              
              {years.currentYear}
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              
              {years.year1}
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              {/* 2022 */}
              {years.year2}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ComaprisionTwoTable.map((row, index) => (
            <TableRowStyled key={row.id} index={index} theme={theme}>
              <TableCellStyled>
                <Typography
                  variant="body2"
                  style={{ fontWeight: "500", fontSize: "15px" }}
                >
                  {row.Settlement}
                </Typography>
              </TableCellStyled>
              <TableCellStyled>
                {row.Settlement === "Deduction" ? (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.JanToFeb.color,
                        backgroundColor: row.JanToFeb.backgroundColor,
                        borderRadius: row.JanToFeb.borderRadius,
                        textAlign: row.JanToFeb.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.JanToFeb.width,
                        padding: row.JanToFeb.padding,
                      }}
                    >
                      {row.JanToFeb.value}
                    </Typography>
                    {row.JanToFeb.value2 && (
                      <Tooltip title="% of Total Payement Received">
                        <div
                          style={{
                            backgroundColor: theme.palette.success.extraDark,
                            borderRadius: "50%",
                            padding: "2px",
                            height: "15px",
                            width: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconExclamationMark
                            size={16}
                            strokeWidth={1.5}
                            style={{ color: "white" }}
                          />
                        </div>
                      </Tooltip>
                    )}
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.JanToFeb.color,
                        backgroundColor: row.JanToFeb.backgroundColor,
                        borderRadius: row.JanToFeb.borderRadius,
                        textAlign: row.JanToFeb.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.JanToFeb.width,
                        padding: row.JanToFeb.padding,
                      }}
                    >
                      {row.JanToFeb.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.success.extraDark,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.JanToFeb.value2}
                    </Typography>
                  </Stack>
                )}
              </TableCellStyled>
              <TableCellStyled>
                {row.Settlement === "Deduction" ? (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.TwentyTwo.color,
                        backgroundColor: row.TwentyTwo.backgroundColor,
                        borderRadius: row.TwentyTwo.borderRadius,
                        textAlign: row.TwentyTwo.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.TwentyTwo.width,
                        padding: row.TwentyTwo.padding,
                      }}
                    >
                      {row.TwentyTwo.value}
                    </Typography>
                    {row.TwentyTwo.value2 && (
                      <Tooltip title="% of Total Payement Received">
                        <div
                          style={{
                            backgroundColor: theme.palette.success.extraDark,
                            borderRadius: "50%",
                            padding: "2px",
                            height: "15px",
                            width: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconExclamationMark
                            size={16}
                            strokeWidth={1.5}
                            style={{ color: "white" }}
                          />
                        </div>
                      </Tooltip>
                    )}
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.TwentyTwo.color,
                        backgroundColor: row.TwentyTwo.backgroundColor,
                        borderRadius: row.TwentyTwo.borderRadius,
                        textAlign: row.JanToFeb.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.TwentyTwo.width,
                        padding: row.TwentyTwo.padding,
                      }}
                    >
                      {row.TwentyTwo.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.success.extraDark,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.TwentyTwo.value2}
                    </Typography>
                  </Stack>
                )}
              </TableCellStyled>
              <TableCellStyled>
                {row.Settlement === "Deduction" ? (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.TwentyOne.color,
                        backgroundColor: row.TwentyOne.backgroundColor,
                        borderRadius: row.TwentyOne.borderRadius,
                        textAlign: row.TwentyOne.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.TwentyOne.width,
                        padding: row.TwentyOne.padding,
                      }}
                    >
                      {row.TwentyOne.value}
                    </Typography>
                    {row.TwentyOne.value2 && (
                      <Tooltip title="% of Total Payement Received">
                        <div
                          style={{
                            backgroundColor: theme.palette.success.extraDark,
                            borderRadius: "50%",
                            padding: "2px",
                            height: "15px",
                            width: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconExclamationMark
                            size={16}
                            strokeWidth={1.5}
                            style={{ color: "white" }}
                          />
                        </div>
                      </Tooltip>
                    )}
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.TwentyOne.color,
                        backgroundColor: row.TwentyOne.backgroundColor,
                        borderRadius: row.TwentyOne.borderRadius,
                        textAlign: row.TwentyOne.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.TwentyOne.width,
                        padding: row.TwentyOne.padding,
                      }}
                    >
                      {row.TwentyOne.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.success.extraDark,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.TwentyOne.value2}
                    </Typography>
                  </Stack>
                )}
              </TableCellStyled>
            </TableRowStyled>
          ))}
        </TableBody>
        <TableHead>
          <TableRow style={{ backgroundColor: theme.palette.primary.light }}>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              EBITDA ( $ / % )
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              {years.currentYear}
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              {years.year1}
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              {years.year2}
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {comparisonNewTable.map((row, index) => (
            <TableRowStyled key={row.id} index={index} theme={theme}>
              {row.Settlement.value === "EBITDA%" ? (
                <TableCellStyled>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      variant="body2"
                      style={{
                        color: row.Settlement.color,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.Settlement.value}
                    </Typography>
                    {row.Settlement.value2 && (
                      <Tooltip title="% of Earning Before Interest, Taxes, Depreciation, and Amortization">
                        <div
                          style={{
                            backgroundColor: theme.palette.success.extraDark,
                            borderRadius: "50%",
                            padding: "2px",
                            height: "15px",
                            width: "15px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IconExclamationMark
                            size={16}
                            strokeWidth={1.5}
                            style={{ color: "white" }}
                          />
                        </div>
                      </Tooltip>
                    )}
                  </Stack>
                </TableCellStyled>
              ) : (
                <TableCellStyled>
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.Settlement.color,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.Settlement.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.success.extraDark,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.Settlement.value2}
                    </Typography>
                  </Stack>
                </TableCellStyled>
              )}

              <TableCellStyled>
                <Typography
                  variant="body2"
                  style={{
                    color: row.JanToFeb.color,
                    fontWeight: "500",
                    fontSize: "15px",
                  }}
                >
                  {row.JanToFeb.value}
                </Typography>
              </TableCellStyled>
              <TableCellStyled>
                <Typography
                  variant="body2"
                  style={{
                    color: row.TwentyTwo.color,
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  {row.TwentyTwo.value}
                </Typography>
              </TableCellStyled>
              <TableCellStyled>
                <Typography
                  variant="body2"
                  style={{
                    color: row.TwentyOne.color,
                    fontWeight: "500",
                    fontSize: "14px",
                  }}
                >
                  {row.TwentyOne.value}
                </Typography>
              </TableCellStyled>
            </TableRowStyled>
          ))}
        </TableBody>

        <TableHead>
          <TableRow style={{ backgroundColor: "#e1e1e1" }}>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ComparisonTwoNewTable.map((row, index) => (
            <TableRowStyled key={row.id} index={index} theme={theme}>
              <TableCellStyled>
                <Typography
                  variant="body2"
                  style={{
                    fontWeight: "500",
                    fontSize: "15px",
                    color: theme.palette.primary.main,
                  }}
                >
                  {row.Settlement}
                </Typography>
              </TableCellStyled>
              <TableCellStyled>
                {row.Settlement !== "Provision Deduction" ? (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.JanToFeb.color,
                        backgroundColor: row.JanToFeb.backgroundColor,
                        borderRadius: row.JanToFeb.borderRadius,
                        textAlign: row.JanToFeb.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.JanToFeb.width,
                      }}
                    >
                      {row.JanToFeb.value}
                    </Typography>
                    {row.JanToFeb.value2 && (
                      <div
                        style={{
                          backgroundColor: theme.palette.primary.main,
                          borderRadius: "50%",
                          padding: "2px",
                          height: "15px",
                          width: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconExclamationMark
                          size={16}
                          strokeWidth={1.5}
                          style={{ color: "white" }}
                        />
                      </div>
                    )}
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.JanToFeb.color,
                        backgroundColor: row.JanToFeb.backgroundColor,
                        borderRadius: row.JanToFeb.borderRadius,
                        textAlign: row.JanToFeb.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.JanToFeb.width,
                      }}
                    >
                      {row.JanToFeb.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.primary.main,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.JanToFeb.value2}
                    </Typography>
                  </Stack>
                )}
              </TableCellStyled>
              <TableCellStyled>
                {row.Settlement !== "Provision Deduction" ? (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.JanToFeb.color,
                        backgroundColor: row.JanToFeb.backgroundColor,
                        borderRadius: row.JanToFeb.borderRadius,
                        textAlign: row.JanToFeb.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.JanToFeb.width,
                      }}
                    >
                      {row.JanToFeb.value}
                    </Typography>
                    {row.JanToFeb.value2 && (
                      <div
                        style={{
                          backgroundColor: theme.palette.success.extraDark,
                          borderRadius: "50%",
                          padding: "2px",
                          height: "15px",
                          width: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconExclamationMark
                          size={16}
                          strokeWidth={1.5}
                          style={{ color: "white" }}
                        />
                      </div>
                    )}
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.TwentyTwo.color,
                        backgroundColor: row.TwentyTwo.backgroundColor,
                        borderRadius: row.TwentyTwo.borderRadius,
                        textAlign: row.JanToFeb.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.TwentyTwo.width,
                        padding: row.TwentyTwo.padding,
                      }}
                    >
                      {row.TwentyTwo.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.primary.main,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.TwentyTwo.value2}
                    </Typography>
                  </Stack>
                )}
              </TableCellStyled>
              <TableCellStyled>
                {row.Settlement !== "Provision Deduction" ? (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.TwentyOne.color,
                        backgroundColor: row.TwentyOne.backgroundColor,
                        borderRadius: row.TwentyOne.borderRadius,
                        textAlign: row.TwentyOne.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.TwentyOne.width,
                        padding: row.TwentyOne.padding,
                      }}
                    >
                      {row.TwentyOne.value}
                    </Typography>
                    {row.TwentyOne.value2 && (
                      <div
                        style={{
                          backgroundColor: theme.palette.success.extraDark,
                          borderRadius: "50%",
                          padding: "2px",
                          height: "15px",
                          width: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconExclamationMark
                          size={16}
                          strokeWidth={1.5}
                          style={{ color: "white" }}
                        />
                      </div>
                    )}
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.TwentyOne.color,
                        backgroundColor: row.TwentyOne.backgroundColor,
                        borderRadius: row.TwentyOne.borderRadius,
                        textAlign: row.TwentyOne.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.TwentyOne.width,
                        padding: row.TwentyOne.padding,
                      }}
                    >
                      {row.TwentyOne.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.primary.main,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.TwentyOne.value2}
                    </Typography>
                  </Stack>
                )}
              </TableCellStyled>
            </TableRowStyled>
          ))}
        </TableBody>
        <TableHead>
          <TableRow style={{ backgroundColor: "#e1e1e1" }}>
            <TableCell>
              <Typography
                variant="body2"
                style={{
                  color: theme.palette.primary.main,
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                Refunds & Reversals
              </Typography>
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Comparisontable.map((row, index) => (
            <TableRowStyled key={row.id} index={index} theme={theme}>
              <TableCellStyled>
                <Typography
                  variant="body2"
                  style={{ fontWeight: "500", fontSize: "15px" }}
                >
                  {row.Settlement}
                </Typography>
              </TableCellStyled>
              <TableCellStyled>
                {row.Settlement === "Deduction" ? (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.JanToFeb.color,
                        backgroundColor: row.JanToFeb.backgroundColor,
                        borderRadius: row.JanToFeb.borderRadius,
                        textAlign: row.JanToFeb.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.JanToFeb.width,
                        padding: row.JanToFeb.padding,
                      }}
                    >
                      {row.JanToFeb.value}
                    </Typography>
                    {row.JanToFeb.value2 && (
                      <div
                        style={{
                          backgroundColor: theme.palette.success.extraDark,
                          borderRadius: "50%",
                          padding: "2px",
                          height: "15px",
                          width: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconExclamationMark
                          size={16}
                          strokeWidth={1.5}
                          style={{ color: "white" }}
                        />
                      </div>
                    )}
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.JanToFeb.color,
                        backgroundColor: row.JanToFeb.backgroundColor,
                        borderRadius: row.JanToFeb.borderRadius,
                        textAlign: row.JanToFeb.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.JanToFeb.width,
                      }}
                    >
                      {row.JanToFeb.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.primary.main,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.JanToFeb.value2}
                    </Typography>
                  </Stack>
                )}
              </TableCellStyled>
              <TableCellStyled>
                {row.Settlement === "Deduction" ? (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.TwentyTwo.color,
                        backgroundColor: row.TwentyTwo.backgroundColor,
                        borderRadius: row.TwentyTwo.borderRadius,
                        textAlign: row.TwentyTwo.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.TwentyTwo.width,
                        padding: row.TwentyTwo.padding,
                      }}
                    >
                      {row.TwentyTwo.value}
                    </Typography>
                    {row.JanToFeb.value2 && (
                      <div
                        style={{
                          backgroundColor: theme.palette.success.extraDark,
                          borderRadius: "50%",
                          padding: "2px",
                          height: "15px",
                          width: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconExclamationMark
                          size={16}
                          strokeWidth={1.5}
                          style={{ color: "white" }}
                        />
                      </div>
                    )}
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.TwentyTwo.color,
                        backgroundColor: row.TwentyTwo.backgroundColor,
                        borderRadius: row.TwentyTwo.borderRadius,
                        textAlign: row.JanToFeb.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.TwentyTwo.width,
                        padding: row.TwentyTwo.padding,
                      }}
                    >
                      {row.TwentyTwo.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.primary.main,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.TwentyTwo.value2}
                    </Typography>
                  </Stack>
                )}
              </TableCellStyled>
              <TableCellStyled>
                {row.Settlement === "Deduction" ? (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.TwentyOne.color,
                        backgroundColor: row.TwentyOne.backgroundColor,
                        borderRadius: row.TwentyOne.borderRadius,
                        textAlign: row.TwentyOne.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.TwentyOne.width,
                        padding: row.TwentyOne.padding,
                      }}
                    >
                      {row.TwentyOne.value}
                    </Typography>
                    {row.TwentyOne.value2 && (
                      <div
                        style={{
                          backgroundColor: theme.palette.success.extraDark,
                          borderRadius: "50%",
                          padding: "2px",
                          height: "15px",
                          width: "15px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <IconExclamationMark
                          size={16}
                          strokeWidth={1.5}
                          style={{ color: "white" }}
                        />
                      </div>
                    )}
                  </Stack>
                ) : (
                  <Stack
                    direction="row"
                    spacing={4}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="body2"
                      style={{
                        color: row.TwentyOne.color,
                        backgroundColor: row.TwentyOne.backgroundColor,
                        borderRadius: row.TwentyOne.borderRadius,
                        textAlign: row.TwentyOne.textAlign,
                        fontWeight: "500",
                        fontSize: "15px",
                        width: row.TwentyOne.width,
                        padding: row.TwentyOne.padding,
                      }}
                    >
                      {row.TwentyOne.value}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        color: theme.palette.primary.main,
                        fontWeight: "500",
                        fontSize: "15px",
                      }}
                    >
                      {row.TwentyOne.value2}
                    </Typography>
                  </Stack>
                )}
              </TableCellStyled>
            </TableRowStyled>
          ))}
        </TableBody>
      </Table>
    </BoxStyled>
  );
};

export default ComaprisionTable;
