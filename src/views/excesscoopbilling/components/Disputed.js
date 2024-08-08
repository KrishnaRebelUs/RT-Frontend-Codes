import React, { useState, useEffect } from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import { Box, styled, Button, Stack, Typography } from "@mui/material";
import { IconChevronRight } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import axios from "axios";
import eventEmitter from "../../../eventEmitter";
import config from "../../../../config";

const Disputed = () => {
  const TypographyStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.secondary.main,
    fontSize: "16px",
  }));
  const ButtonStyled = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.contrast,
    border: "1px solid",
    borderColor: theme.palette.primary.contrast,
    color: theme.palette.primary.contrastText,
    fontSize: "12px",
    padding: "3px 8px",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
      borderColor: theme.palette.primary.main,
    },
  }));
  const theme = useTheme();
  const [totalDisputedAmount, setTotalDisputedAmount] = useState(null);
  const BASE_URL = config.UniUrl;

  // Function to format numbers in US format
  const formatNumberToUS = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };

  useEffect(() => {
    const fetchTotalDisputedAmount = () => {
      try {
        const token = sessionStorage.getItem("token");
        const vendorId = sessionStorage.getItem("selectedVendorId");

        if (!token || !vendorId) {
          throw new Error("Token or vendorId not found in sessionStorage");
        }

        // const apiUrl = `http://16.170.22.123:8082/overbilling/getTotalDisputed?vendorIds=${vendorId}&disputeType=Coop`;

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
      // console.log("Vendor ID changed:", vendorId);
      fetchTotalDisputedAmount();
    };

    eventEmitter.on("vendorSelected", handleVendorSelected);

    // Cleanup function to remove event listener
    return () => {
      eventEmitter.events = {};
    };
  }, []);

  return (
    <DashboardCard
      title={
        <Typography variant="h5" sx={{ color: theme.palette.primary.main }}>
          Disputed Amount
        </Typography>
      }
    >
      <Typography variant="h2" sx={{ color: "#000000" }}>
        $
        {totalDisputedAmount !== null
          ? parseFloat(totalDisputedAmount).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
          : "Loading..."}
      </Typography>
      <TypographyStyled
        variant="body1"
        marginTop={3}
        sx={{ color: theme.palette.text.dark }}
        fontWeight={500}
      >
        View all raised disputes till date
        {
          <ButtonStyled
            component={Link}
            to="/manage-dispute"
            sx={{ marginTop: "8px" }}
          >
            View Details <IconChevronRight size="15" />
          </ButtonStyled>
        }
      </TypographyStyled>
    </DashboardCard>
  );
};

export default Disputed;
