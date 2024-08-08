 
 /*-------------------------------------------------------- My code 1 -------------------------------------------------------------------*/ 

import React, { useState, useEffect } from "react";
import DashboardCard from "../../../components/shared/DashboardCard";
import { Box, styled, Typography, Avatar, Grid, Divider } from "@mui/material";
import BarChart from "../../components/pages/Barchart";
import { useTheme } from "@emotion/react";
import NumberData from "../../components/pages/NumberData";
import axios from "axios";
import eventEmitter from "../../../eventEmitter";
import config from "../../../../config";

const Impactoverview = () => {
  const theme = useTheme();

  const AvatarStyled = styled(Avatar)(({ theme }) => ({
    backgroundColor: theme.palette.success.main,
    borderRadius: "6px",
    width: "30px",
    height: "30px",
    "& svg": {
      color: "white",
      width: "18px",
      height: "18px",
    },
  }));

  const BarChartStyled = styled(Box)(({ theme }) => ({
    marginTop: "-25px",
    marginBottom: "-25px",
  }));
 
  const [hoursSaved, setHoursSaved] = useState("");
  const [resourcesSaved, setResourcesSaved] = useState("");
  const [amountSaved, setAmountSaved] = useState("");
  const [totalRecordsScanned, setTotalRecordsScanned] = useState(""); 
  const BASE_URL = config.UniUrl;
  const selectedVendorId = sessionStorage.getItem("selectedVendorId");

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
        // `http://16.170.22.123:8082/overbilling/getImpactOverview?vendorId=${selectedVendorId}&pageName=Overbilling`,
        `${BASE_URL}/overbilling/getImpactOverview?vendorId=${selectedVendorId}&pageName=Overbilling`,
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


      /*-------------------------------------------------------- Total Lines Scanned API -------------------------------------------------------*/

      axios
      .get(
        // `http://16.170.22.123:8082/overbilling/getImpactOverview?vendorId=${selectedVendorId}&pageName=Overbilling`,
        `${BASE_URL}/shortage/getTotalLineScanned?vendorId=${selectedVendorId}&pageName=Overbilling`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const count = response.data.data.count; 
        if (count) {
          setTotalRecordsScanned(count); 
        } else {
          
          setTotalRecordsScanned("-");
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


  const data = [
    {
      body: "Total Records Scanned", 
      number: `${totalRecordsScanned}`, 
      icon: "IconBriefcase", 
      avatarBackgroundColor: "#5c85c3", 
      numberColor: "#000000", 
    },
    {
      body: "Hours Saved",
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
      avatarBackgroundColor: "#245aa0",
      numberColor: "#000000",
    },
    {
      body: "FTE Saved/week",
      number: `${resourcesSaved} ${resourcesSaved === 1 ? "FTE" : "FTE's"}`,
      icon: "IconRecords",
      avatarBackgroundColor: theme.palette.accent.main,
      numberColor: "#000000",
    },
  ];

  return (
    <DashboardCard action>
      <Grid container alignItems="center">
        <Grid item sm={15} py={2}>
          <Typography
            variant="h3"
            sx={{ color: "#f19c53" }}
            marginBottom={3} marginLeft={6}
          >
            
            Impact Overview
          </Typography>
        </Grid>
      </Grid>
      <Box mt={4}></Box>
      <NumberData data={data}/>
    </DashboardCard>
  );
};

export default Impactoverview;







