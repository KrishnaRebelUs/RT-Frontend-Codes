import React, { useState, useEffect } from "react";
import DashboardCard from "./Dashboard";
import {
  Box,
  styled,
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Divider,
} from "@mui/material";
import { IconChevronRight, IconX } from "@tabler/icons-react";
import { useTheme } from "@emotion/react";
import axios from "axios";
import eventEmitter from "../../../eventEmitter";
import config from "../../../../config";

const YearlyTrend = () => {
  const ButtonStyled = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.extraLight,
    border: "1px solid",
    borderColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
    fontSize: "12px",
    padding: "3px 8px",
    fontWeight: "600",
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
  }));

  const ButtonClose = styled(Button)(({ theme }) => ({
    minWidth: "30px",
    height: "30px",
    backgroundColor: "red",
    color: "white",
    right: "15px",
    top: "15px",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "white",
    },
  }));

  const CustomStack = styled(Stack)(({ theme, index }) => ({
    backgroundColor:
      index % 2 === 0
        ? theme.palette.primary.extraLight
        : theme.palette.secondary.extraLight,
    padding: theme.spacing(2),
  }));

  const TypographyStyled = styled(Typography)(({ theme, index }) => ({
    color: index === 0 ? "#2edd95" : index === 1 ? "#f89c53" : "#285a9e", 
  }));

  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [yearlyData, setYearlyData] = useState({});
  const BASE_URL = config.UniUrl;

  useEffect(() => {
    const fetchYearlyData = async () => {
      const token = sessionStorage.getItem("token");
      const selectedVendorId = sessionStorage.getItem("selectedVendorId");

      if (!token || !selectedVendorId) {
        console.error("Token or vendorId not found in sessionStorage");
        return;
      }

      // Fetch data from API using Axios with authentication headers
      try {
        const response = await axios.get(
          `${BASE_URL}/shortage/getYoyFindingAll?vendorId=${selectedVendorId}&pageName=Overbilling`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        if (data.status === "SUCCESS") {
          setYearlyData(data.data);
        } else {
          console.error("Error fetching data:", data.errorMessage);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchYearlyData();

    const vendorChangeListener = (vendorId) => {
      // console.log("Vendor ID changed:", vendorId);
      fetchYearlyData();
    };

    // Listen for vendor changes
    eventEmitter.on("vendorSelected", vendorChangeListener);

    // Cleanup function to remove event listener
    return () => {
      eventEmitter.off("vendorSelected", vendorChangeListener);
    };
  }, []);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getTopThreeYears = () => {
    const yearsWithData = Object.keys(yearlyData);

    if (yearsWithData.length <= 3) {
      return yearsWithData.sort((a, b) => parseInt(b) - parseInt(a));
    } else {
      const sortedYears = yearsWithData.sort(
        (a, b) => parseInt(b) - parseInt(a)
      );

      return sortedYears.slice(0, 3);
    }
  };

  return (
    <DashboardCard title={<Typography variant="h4">Yearly Trends</Typography>}>
      <TypographyStyled variant="h6" sx={{ color: "#2edd95" }}>
        {getTopThreeYears()[0]}
      </TypographyStyled>
      <Typography variant="h6">
        $
        {new Intl.NumberFormat(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(parseFloat(yearlyData[getTopThreeYears()[0]] || 0))}
      </Typography>

      <Box my={1}>
        <Divider />
      </Box>

      <Grid container spacing={3}>
        {getTopThreeYears()
          .slice(1)
          .map((year, index) => (
            <Grid key={year} item sm={6}>
              <TypographyStyled variant="h6" index={index + 1}>
                {year}
              </TypographyStyled>
              <Typography variant="h6">
                <b>
                  $
                  {new Intl.NumberFormat(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  }).format(parseFloat(yearlyData[year] || 0))}
                </b>
              </Typography>
            </Grid>
          ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <Stack direction="row" justifyContent="space-between">
          <DialogTitle variant="h3">YOY Split</DialogTitle>
          <ButtonClose>
            <IconX onClick={handleClose} size="16" />
          </ButtonClose>
        </Stack>
        <DialogContent>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item xs={12} alignItems="center" justifyContent="center">
              {Object.keys(yearlyData)
                .reverse()
                .map((year) => (
                  <CustomStack
                    key={year}
                    direction="row"
                    index={parseInt(year)} 
                    spacing={4}
                    justifyContent="space-between"
                  >
                    <TypographyStyled variant="h6">{year}</TypographyStyled>
                    <Typography variant="h6">
                      
                      $
                      {new Intl.NumberFormat(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      }).format(parseFloat(yearlyData[year] || 0))}
                    </Typography>
                  </CustomStack>
                ))}
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </DashboardCard>
  );
};

export default YearlyTrend;
