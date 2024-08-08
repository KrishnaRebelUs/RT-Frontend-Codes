/*--------------------------------------------------------------- My Code 1 -------------------------------------------------------------------*/

import React, { useState, useEffect } from "react";
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
import config from "../../../../config";

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
  ;
  const BASE_URL = config.UniUrl;

  //  Inventory Sales
  const [inventorySaleJanToFeb, setInventorySaleJanToFeb] = useState("");
  const [inventorySaleTwentyTwo, setInventorySaleTwentyTwo] = useState("");
  const [inventorySaleTwentyOne, setInventorySaleTwentyOne] = useState("");
  
  const formatNumber = (num) => {
    return `$${num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

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

            // Fetch inventory sales data for each year
            fetchOCData(currentYear, 'currentYear');
            fetchOCData(currentYear - 1, 'year1');
            fetchOCData(currentYear - 2, 'year2');
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
        console.log(`Fetching Sales Invoice Payment data for year ${year}...`);

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
            const salesInvoice = data.data.find(
              (item) => item.invoiceType === "Sales Invoice Payment"
            );

            // Update state based on the year
            const value = salesInvoice ? formatNumber(Math.abs(salesInvoice.val)) : "In progress";
            if (yearKey === 'currentYear') {
              console.log(`Setting inventorySaleJanToFeb state: ${value}`);
              setInventorySaleJanToFeb(value);
            } else if (yearKey === 'year1') {
              console.log(`Setting inventorySaleTwentyTwo state: ${value}`);
              setInventorySaleTwentyTwo(value);
            } else if (yearKey === 'year2') {
              console.log(`Setting inventorySaleTwentyOne state: ${value}`);
              setInventorySaleTwentyOne(value);
            }
          } else {
            console.error(`Failed to fetch Sales Invoice Payment data for year ${year}:`, data.errorMessage);
          }
        } else {
          console.error(`Failed to fetch Sales Invoice Payment data for year ${year}:`, response.status);
        }
      } catch (error) {
        console.error(`Error fetching Sales Invoice Payment for year ${year}:`, error);
      }
    };

    fetchYears();
  }, []);


  



  const ComaprisionTable = [
    {
      id: 1,
      Settlement: { value: "PO's Placed" },
      JanToFeb: { value: "$6,886,952.60", color: theme.palette.primary.main },
      TwentyTwo: {
        value: "$960,220.47",
        color: theme.palette.primary.main,
      },
      TwentyOne: {
        value: "$5,357,878.71",
        color: theme.palette.primary.main,
      },
    },

    {
      id: 2,
      Settlement: { value: "PO's Accepted" },
      JanToFeb: { value: "$5,165,214.45", color: theme.palette.primary.main },
      TwentyTwo: { value: "$882,617.01", color: theme.palette.primary.main },
      TwentyOne: { value: "$3,400.765.76", color: theme.palette.primary.main },
    },
    {
      id: 3,
      Settlement: { value: "PO Acceptance Rate" },
      JanToFeb: { value: "75%", color: theme.palette.success.extraDark },
      TwentyTwo: { value: "91.92%", color: theme.palette.success.extraDark },
      TwentyOne: { value: "63.47%", color: theme.palette.success.extraDark },
    },
    {
      id: 4,
      Settlement: { value: "Payments Received - Inventory Sales" },
      JanToFeb: { value: "$1,404,672.22", color: theme.palette.primary.main },
      TwentyTwo: { value: "$4,401,697.46", color: theme.palette.primary.main },
      TwentyOne: { value: "$2,295,665.08", color: theme.palette.primary.main },
    },
    {
      id: 5,
      Settlement: { value: "Payments Received - Dropship Sales" },
      JanToFeb: { value: "$0.00", color: theme.palette.primary.main },
      TwentyTwo: { value: "$0.00", color: theme.palette.primary.main },
      TwentyOne: { value: "$0.00", color: theme.palette.primary.main },
    },
    {
      id: 6,
      Settlement: { value: "Total Payments Received" },
      JanToFeb: { value: "$1,404,672.22", color: theme.palette.primary.main },
      TwentyTwo: { value: "$4,401,697.46", color: theme.palette.primary.main },
      TwentyOne: { value: "$2,295,665.08", color: theme.palette.primary.main },
    },
    {
      id: 7,
      Settlement: { value: "% +/- (Previous Year)" },
      JanToFeb: "",
      TwentyTwo: { value: "91.74%", color: theme.palette.success.extraDark },
      TwentyOne: { value: "3.72%", color: theme.palette.success.extraDark },
    },
    {
      id: 8,
      Settlement: { value: "Payement Receipt Forecast " },
      JanToFeb: { value: "$4,214,016.66", color: theme.palette.primary.main },
      TwentyTwo: "",
      TwentyOne: "",
    },
    {
      id: 9,
      Settlement: { value: "% +/- (Previous Year)" },
      JanToFeb: { value: "-4.26%", color: theme.palette.error.main },
      TwentyTwo: "",
      TwentyOne: "",
    },
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
    {
      id: 11,
      Settlement: { value: "Gross Profit" },
      JanToFeb: { value: "$702,336.11", color: theme.palette.primary.main },
      TwentyTwo: { value: "$2,200,848.73", color: theme.palette.primary.main },
      TwentyOne: { value: "$1,147,832.54", color: theme.palette.primary.main },
    },
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
    {
      id: 13,
      Settlement: { value: "SG&A ($) " },
      JanToFeb: { value: "$280,934.44", color: theme.palette.primary.main },
      TwentyTwo: { value: "$880,339.49", color: theme.palette.primary.main },
      TwentyOne: { value: "$459,133.02", color: theme.palette.primary.main },
    },
  ];


  const ComaprisionTwoTable = [
    {
      id: 1,
      Settlement: "Deduction",
      JanToFeb: {
        value: "Amount",
        color: theme.palette.primary.main,
        value2: "IconExclamation",
      },
      TwentyTwo: {
        value: "Amount",
        color: theme.palette.primary.main,
        value2: "IconExclamation",
      },
      TwentyOne: {
        value: "Amount",
        color: theme.palette.primary.main,
        value2: "IconExclamation",
      },
    },
    {
      id: 2,
      Settlement: "AMS (Excl. Credit Card)",
      JanToFeb: {
        value: "$55,138.44",
        color: theme.palette.primary.main,
        value2: "3.93%",
      },
      TwentyTwo: {
        value: "$70,000.02",
        color: theme.palette.primary.main,
        value2: "1.59%",
      },
      TwentyOne: {
        value: "$0.00",
        color: theme.palette.primary.main,
        value2: "0.00%",
      },
    },
    {
      id: 3,
      Settlement: "AMS (Credit Card Spend)",
      JanToFeb: {
        value: "",
        color: theme.palette.primary.main,

        backgroundColor: "#e4e4e4",
        borderRadius: "20px",

        textAlign: "left",
        width: "120px",
        padding: "5px 7px",
        value2: "",
      },
      TwentyTwo: {
        value: "",
        color: theme.palette.primary.main,

        backgroundColor: "#e4e4e4",
        borderRadius: "20px",
        textAlign: "left",
        width: "120px",
        padding: "5px 7px",
        value2: "",
      },
      TwentyOne: {
        value: "",
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
        value: "$0.00",
        color: theme.palette.primary.main,
        value2: "0.00%",
      },
      TwentyTwo: {
        value: "$0.00",
        color: theme.palette.primary.main,
        value2: "0.00%",
      },
      TwentyOne: {
        value: "$0.00",
        color: theme.palette.primary.main,
        value2: "0.00%",
      },
    },
    {
      id: 5,
      Settlement: "CoOp ",
      JanToFeb: {
        value: "$267,502.73",
        color: theme.palette.primary.main,
        value2: "19.04%",
      },
      TwentyTwo: {
        value: "$457,183.87",
        color: theme.palette.primary.main,
        value2: "10.80%",
      },
      TwentyOne: {
        value: "$292,469.29",
        color: theme.palette.primary.main,
        value2: "12.74%",
      },
    },
    {
      id: 6,
      Settlement: "Accural",
      JanToFeb: {
        value: "$179,712.54",
        color: theme.palette.primary.main,
        value2: "67.18%",
      },
      TwentyTwo: {
        value: "$469,284.35",
        color: theme.palette.primary.main,
        value2: "37.82%",
      },
      TwentyOne: {
        value: "$270,119.09",
        color: theme.palette.primary.main,
        value2: "61.45%",
      },
    },
    {
      id: 18,
      Settlement: "Straight Payment",
      JanToFeb: {
        value: "$212.69",
        color: theme.palette.primary.main,
        value2: "0.08%",
      },
      TwentyTwo: {
        value: "$172.67",
        color: theme.palette.primary.main,
        value2: "0.04%",
      },
      TwentyOne: {
        value: "$18,403.88",
        color: theme.palette.primary.main,
        value2: "0.07%",
      },
    },
    {
      id: 19,
      Settlement: "Volume Incentive",
      JanToFeb: {
        value: "$87,577.50",
        color: theme.palette.primary.main,
        value2: "32.74%",
      },
      TwentyTwo: {
        value: "$",
        color: theme.palette.primary.main,
        value2: "18.43%",
      },
      TwentyOne: {
        value: "$",
        color: theme.palette.primary.main,
        value2: "29.94%",
      },
    },
    {
      id: 20,
      Settlement: "Disposed",
      JanToFeb: {
        value: "$",
        color: theme.palette.primary.main,
        value2: "%",
      },
      TwentyTwo: {
        value: "$3,554.43",
        color: theme.palette.primary.main,
        value2: "%",
      },
      TwentyOne: {
        value: "$3,946.32",
        color: theme.palette.primary.main,
        value2: "%",
      },
    },
    {
      id: 21,
      Settlement: "Vendor Funded Sales Discount",
      JanToFeb: {
        value: "$",
        color: theme.palette.primary.main,
        value2: "%",
      },
      TwentyTwo: {
        value: "$2,172.42",
        color: theme.palette.primary.main,
        value2: "%",
      },
      TwentyOne: {
        value: "$",
        color: theme.palette.primary.main,
        value2: "%",
      },
    },
    {
      id: 7,
      Settlement: "Operational Chargeback Total",
      JanToFeb: {
        value: "$14,194.30",
        color: theme.palette.primary.main,
        value2: "1.01%",
      },
      TwentyTwo: {
        value: "$37,316.17",
        color: theme.palette.primary.main,
        value2: "0.85%",
      },
      TwentyOne: {
        value: "$15,570.95",
        color: theme.palette.primary.main,
        value2: "0.68%",
      },
    },
    {
      id: 8,
      Settlement: "OC - ASN accuracy",
      JanToFeb: {
        value: "$3,294.60",
        color: theme.palette.primary.main,
        value2: "23.21%",
      },
      TwentyTwo: {
        value: "$18,548.50",
        color: theme.palette.primary.main,
        value2: "8.83%",
      },
      TwentyOne: {
        value: "$8,047.62",
        color: theme.palette.primary.main,
        value2: "21.16%",
      },
    },
    {
      id: 9,
      Settlement: "OC - No carton/package content label",
      JanToFeb: {
        value: "$895.00",
        color: theme.palette.primary.main,
        value2: "6.31%",
      },
      TwentyTwo: {
        value: "$5,455.00",
        color: theme.palette.primary.main,
        value2: "2.40%",
      },
      TwentyOne: {
        value: "$1,175.00",
        color: theme.palette.primary.main,
        value2: "5.75%",
      },
    },
    {
      id: 31,
      Settlement: "OC - Overage PO units",
      JanToFeb: {
        value: "$128.05",
        color: theme.palette.primary.main,
        value2: "0.90%",
      },
      TwentyTwo: {
        value: "$2,058.58",
        color: theme.palette.primary.main,
        value2: "0.34%",
      },
      TwentyOne: {
        value: "$35.44",
        color: theme.palette.primary.main,
        value2: "0.82%",
      },
    },
    {
      id: 22,
      Settlement: "OC - Overweight carton",
      JanToFeb: {
        value: "$3,850.00",
        color: theme.palette.primary.main,
        value2: "27.12%",
      },
      TwentyTwo: {
        value: "$7,275.00",
        color: theme.palette.primary.main,
        value2: "10.32%",
      },
      TwentyOne: {
        value: "$4,325.00",
        color: theme.palette.primary.main,
        value2: "24.73%",
      },
    },
    {
      id: 23,
      Settlement: "OC - PO on-time accuracy",
      JanToFeb: {
        value: "$5,240.40",
        color: theme.palette.primary.main,
        value2: "36.92%",
      },
      TwentyTwo: {
        value: "$303.89",
        color: theme.palette.primary.main,
        value2: "14.04%",
      },
      TwentyOne: {
        value: "$",
        color: theme.palette.primary.main,
        value2: "%",
      },
    },
    {
      id: 24,
      Settlement: "OC - Prep - External bubble wrapping",
      JanToFeb: {
        value: "$56.70",
        color: theme.palette.primary.main,
        value2: "0.40%",
      },
      TwentyTwo: {
        value: "$18.90",
        color: theme.palette.primary.main,
        value2: "0.15%",
      },
      TwentyOne: {
        value: "$",
        color: theme.palette.primary.main,
        value2: "%",
      },
    },
    {
      id: 25,
      Settlement: "OC - Ship In Own Container",
      JanToFeb: {
        value: "$729.55",
        color: theme.palette.primary.main,
        value2: "5.14%",
      },
      TwentyTwo: {
        value: "$3,395.75",
        color: theme.palette.primary.main,
        value2: "1.96%",
      },
      TwentyOne: {
        value: "$549.24",
        color: theme.palette.primary.main,
        value2: "4.69%",
      },
    },
    {
      id: 26,
      Settlement: "OC - Carton Content Accuracy",
      JanToFeb: { value: "$", color: theme.palette.primary.main, value2: "%" },
      TwentyTwo: {
        value: "$169.00",
        color: theme.palette.primary.main,
        value2: "%",
      },
      TwentyOne: {
        value: "$57.20",
        color: theme.palette.primary.main,
        value2: "%",
      },
    },
    {
      id: 27,
      Settlement: "OC - Oversized Carton",
      JanToFeb: { value: "$", color: theme.palette.primary.main, value2: "%" },
      TwentyTwo: {
        value: "$50.00",
        color: theme.palette.primary.main,
        value2: "%",
      },
      TwentyOne: {
        value: "$",
        color: theme.palette.primary.main,
        value2: "%",
      },
    },
    {
      id: 28,
      Settlement: "OC - Prep - Internal bubble wrap",
      JanToFeb: { value: "$", color: theme.palette.primary.main, value2: "%" },
      TwentyTwo: {
        value: "$41.58",
        color: theme.palette.primary.main,
        value2: "%",
      },
      TwentyOne: {
        value: "$",
        color: theme.palette.primary.main,
        value2: "%",
      },
    },
    {
      id: 29,
      Settlement: "OC - Prep - Bagging",
      JanToFeb: { value: "$", color: theme.palette.primary.main, value2: "%" },
      TwentyTwo: {
        value: "$",
        color: theme.palette.primary.main,
        value2: "%",
      },
      TwentyOne: {
        value: "$30.60",
        color: theme.palette.primary.main,
        value2: "%",
      },
    },
    {
      id: 30,
      Settlement: "OC - Unconfirmed PO units",
      JanToFeb: { value: "$", color: theme.palette.primary.main, value2: "%" },
      TwentyTwo: {
        value: "$",
        color: theme.palette.primary.main,
        value2: "%",
      },
      TwentyOne: {
        value: "$1,350.85",
        color: theme.palette.primary.main,
        value2: "%",
      },
    },
    {
      id: 10,
      Settlement: "Net Post Audit Deduction",
      JanToFeb: {
        value: "$0.00",
        color: theme.palette.primary.main,
        value2: "0.00%",
      },
      TwentyTwo: {
        value: "$0.00",
        color: theme.palette.primary.main,
        value2: "0.00%",
      },
      TwentyOne: {
        value: "$3,103.26",
        color: theme.palette.primary.main,
        value2: "0.14%",
      },
    },
    {
      id: 11,
      Settlement: "Net Price Claim",
      JanToFeb: {
        value: "$1,620.99",
        color: theme.palette.primary.main,
        value2: "0.12%",
      },
      TwentyTwo: {
        value: "$2,398.51",
        color: theme.palette.primary.main,
        value2: "0.05%",
      },
      TwentyOne: {
        value: "$1,108.56",
        color: theme.palette.primary.main,
        value2: "0.05%",
      },
    },
    {
      id: 12,
      Settlement: "Net Shortage",
      JanToFeb: {
        value: "$10,185.50",
        color: theme.palette.primary.main,
        value2: "0.73%",
      },
      TwentyTwo: {
        value: "$72,683.44",
        color: theme.palette.primary.main,
        value2: "1.65%",
      },
      TwentyOne: {
        value: "$19,753.79",
        color: theme.palette.primary.main,
        value2: "0.86%",
      },
    },
    {
      id: 13,
      Settlement: "Return Deduction",
      JanToFeb: {
        value: "$35,085.71",
        color: theme.palette.primary.main,
        value2: "2.50%",
      },
      TwentyTwo: {
        value: "$93,648.53",
        color: theme.palette.primary.main,
        value2: "2.13%",
      },
      TwentyOne: {
        value: "$66,665.78",
        color: theme.palette.primary.main,
        value2: "2.90%",
      },
    },
    {
      id: 14,
      Settlement: "Net Return Freight Charges",
      JanToFeb: {
        value: "$396.99",
        color: theme.palette.primary.main,
        value2: "0.03%",
      },
      TwentyTwo: {
        value: "$520.47",
        color: theme.palette.primary.main,
        value2: "0.01%",
      },
      TwentyOne: {
        value: "$426.87",
        color: theme.palette.primary.main,
        value2: "0.02%",
      },
    },
    {
      id: 15,
      Settlement: "Net Return Handling Charges",
      JanToFeb: {
        value: "$0.00",
        color: theme.palette.primary.main,
        value2: "0.00%",
      },
      TwentyTwo: {
        value: "$0.00",
        color: theme.palette.primary.main,
        value2: "0.00%",
      },
      TwentyOne: {
        value: "$0.00",
        color: theme.palette.primary.main,
        value2: "0.00%",
      },
    },
    {
      id: 16,
      Settlement: "Quick Pay Discount",
      JanToFeb: {
        value: "$28,093.61",
        color: theme.palette.primary.main,
        value2: "2.04%",
      },
      TwentyTwo: {
        value: "$88,033.81",
        color: theme.palette.primary.main,
        value2: "2.04%",
      },
      TwentyOne: {
        value: "$45,912.96",
        color: theme.palette.primary.main,
        value2: "2.04%",
      },
    },
    {
      id: 17,
      Settlement: "Total Deductions",
      JanToFeb: {
        value: "$412,218.27",
        color: theme.palette.primary.main,
        value2: "29.35%",
      },
      TwentyTwo: {
        value: "$839,784.82",
        color: theme.palette.primary.main,
        value2: "19.08%",
      },
      TwentyOne: {
        value: "$445,011.46",
        color: theme.palette.primary.main,
        value2: "19.38%",
      },
    },
  ];
  const ComparisonTwoNewTable = [
    {
      id: 1,
      Settlement: "Provision Deduction",
      JanToFeb: {
        value: "$2,035,146.42",
        color: theme.palette.primary.main,
        value2: "144.88%",
      },
      TwentyTwo: {
        value: "$4,387,439.41",
        color: theme.palette.primary.main,
        value2: "99.68%",
      },
      TwentyOne: {
        value: "$1,076,040.81",
        color: theme.palette.primary.main,
        value2: "46.87%",
      },
    },
  ];

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
      JanToFeb: { value: "$0.00", color: theme.palette.primary.main },
      TwentyTwo: { value: "$0.00", color: theme.palette.primary.main },
      TwentyOne: { value: "$0.00", color: theme.palette.primary.main },
    },
    {
      id: 2,
      Settlement: "CoOp Refund",
      JanToFeb: { value: "$87,577.50", color: theme.palette.primary.main },
      TwentyTwo: { value: "$19,182.99", color: theme.palette.primary.main },
      TwentyOne: { value: "$0.00", color: theme.palette.primary.main },
    },

    // {
    //   id: 3,
    //   Settlement: "Disposed",
    //   JanToFeb: { value: "$", color: theme.palette.primary.main },
    //   TwentyTwo: { value: "$11,682.24", color: theme.palette.primary.main },
    //   TwentyOne: {
    //     value: "$",
    //     color: theme.palette.primary.main,
    //     // value2: "",
    //   },
    // },
    // {
    //   id: 4,
    //   Settlement: "Accural",
    //   JanToFeb: { value: "$0.00", color: theme.palette.primary.main },
    //   TwentyTwo: { value: "$1,028.22", color: theme.palette.primary.main },
    //   TwentyOne: {
    //     value: "$737.63",
    //     color: theme.palette.primary.main,
    //     // value2: "",
    //   },
    // },
    {
      id: 5,
      Settlement: "Return Refund",
      JanToFeb: { value: "$0.00", color: theme.palette.primary.main },
      TwentyTwo: { value: "$1,028.22", color: theme.palette.primary.main },
      TwentyOne: { value: "$737.63", color: theme.palette.primary.main },
    },
    {
      id: 6,
      Settlement: "Provision Reversal",
      JanToFeb: { value: "$2,071,513.10", color: theme.palette.primary.main },
      TwentyTwo: { value: "$4,274,640.37", color: theme.palette.primary.main },
      TwentyOne: { value: "$1,095,080.56", color: theme.palette.primary.main },
    },
  ];

  // Default values
  const defaultSgaPercent = "20";
  const defaultGrossMarginPercent = "50";

  // State variables
  const [isEditingSga, setIsEditingSga] = useState(false);
  const [editedSgaPercent, setEditedSgaPercent] = useState(defaultSgaPercent);
  const [isEditingGrossMargin, setIsEditingGrossMargin] = useState(false);
  const [editedGrossMarginPercent, setEditedGrossMarginPercent] = useState(
    defaultGrossMarginPercent
  );
  const [comparisonTable, setComparisonTable] = useState(ComaprisionTable);
  const [comparisonNewTable, setComparisonNewTable] =
    useState(ComparisonNewTable);
  const [editedEbitdaPercent, setEditedEbitdaPercent] = useState(0); // State for EBITDA %
  // const [years, setYears] = useState({
  //   currentYear: "Jan To Feb-2024",
  //   year1: "2023",
  //   year2: "2022",
  // });




/*------------------------------------------------------------- API for Years -----------------------------------------------------------------*/ 

  // useEffect(() => {
  //   // Fetch years data from API
  //   const fetchYears = async () => {
  //     const token = sessionStorage.getItem("token");
  //     const vendorId = sessionStorage.getItem("selectedVendorId");

  //     try {
  //       const response = await fetch(
  //         `http://16.170.22.123:8082/financialDashboard/getYear?vendorId=${vendorId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         if (data.status === "SUCCESS") {
  //           setYears({
  //             currentYear: `Jan To Feb-${data.data.count}`,
  //             year1: `${data.data.count - 1}`,
  //             year2: `${data.data.count - 2}`,
  //           });
  //         } else {
  //           console.error("Failed to fetch years data:", data.errorMessage);
  //         }
  //       } else {
  //         console.error("Failed to fetch years data:", response.status);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching years data:", error);
  //     }
  //   };

  //   fetchYears();
  // }, [])

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
              Jan To Feb-2024
              {/* {years.currentYear} */}
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              2023
              {/* {years.year1} */}
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              2022
              {/* {years.year2} */}
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
              Categories
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              Jan To Feb-2024
              {/* {years.currentYear} */}
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              2023
              {/* {years.year1} */}
            </TableCell>
            <TableCell
              style={{ color: "white", fontSize: "15px", fontWeight: "600" }}
            >
              2022
              {/* {years.year2} */}
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
          <TableRow style={{ backgroundColor: "#e1e1e1" }}>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
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
