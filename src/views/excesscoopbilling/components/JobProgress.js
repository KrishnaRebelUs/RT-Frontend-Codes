import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Button,
  Grid,
  LinearProgress,
  styled,
  useTheme,
} from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";
import { IconFileArrowRight } from "@tabler/icons-react";
import moment from "moment";
import DataTable from "react-data-table-component";
import axios from "axios";
import config from "../../../../config";
import eventEmitter from "../../../eventEmitter";

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrast,
  border: "1px solid",
  borderColor: theme.palette.primary.contrast,
  color: theme.palette.primary.contrastText,
  fontSize: "12px",
  padding: "0",
  fontWeight: "600",
  transition: "all ease 0.3s",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderColor: theme.palette.primary.main,
  },
  "& .btn-indicator": {
    width: "1px",
    backgroundColor: theme.palette.primary.main,
    alignSelf: "stretch",
    marginLeft: "4px",
  },
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  padding: "5px 12px",
  fontWeight: "600",
}));

const JobProgress = () => {
  const theme = useTheme();
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = config.UniUrl;

  useEffect(() => {
    const fetchJobData = async () => {
      const selectedVendorId = sessionStorage.getItem("selectedVendorId");
      // console.log("Selected Vendor ID:", selectedVendorId);
      try {
        const token = sessionStorage.getItem("token");
        let apiUrl = `${BASE_URL}/overbilling/getOverBillingDataByVendorId?vendorId=${selectedVendorId}`;

        if (!selectedVendorId) {
          console.warn("No selectedVendorId found, cannot fetch data.");
          return;
        }

        const response = await axios.get(apiUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setLoading(false);
      }
    };

    fetchJobData();

    eventEmitter.on("vendorSelected", (vendorId) => {
      fetchJobData();
    });

    // Cleanup function to remove event listener
    return () => {
      eventEmitter.events = {}; 
    };
  }, []);

  const columns = [
    {
      name: "Vendor Name",
      selector: (row) => row.vendorName,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.createdDate,
      format: (row) => row.createdDate ? moment(row.createdDate).format("MM/DD/YY HH:mm") : '-',
      sortable: true,
    },
    {
      name: "Type",
      selector: (row) => row.requestType,
      sortable: true,
      cell: (row, index, column, id) => (
        <Box>
          <Typography
            variant="body1"
            fontWeight="500"
            style={{ textAlign: "left", color: theme.palette.accent.main }}
          >
            {row.requestType}
          </Typography>
        </Box>
      ),
    },
    {
      name: "Agreement Id / Disputed Id",
      selector: (row) => row.requestId,
      sortable: true,
    },
    {
      name: "Pending Task",
      selector: (row) => row.processStatus,
      sortable: true,
      cell: (row) => {
        if (row.requestStatus === "COMPLETED") {
          return <Typography variant="body1" style={{ padding: "8px 0" }}></Typography>;
        } else {
          return (
            <Typography
              variant="body1"
              fontWeight="500"
              style={{ padding: "8px 0" }}
            >
              {row.processStatus}
            </Typography>
          );
        }
      },
    },
    {
      name: "Progress",
      selector: (row) => row.progress,
      cell: (row, index, column, id) => {
        if (row.requestStatus === "COMPLETED") {
          return (
            <Typography variant="body2" style={{ textAlign: "right" }}>
              <b>
                <h3>Completed</h3>
              </b>
            </Typography>
          );
        } else {
          return (
            <Box
              style={{
                display: "flex",
                flexDirection: "column-reverse",
                width: "100%",
              }}
            >
              <LinearProgress
                variant="determinate"
                color="success"
                value={row.progress}
                style={{ color: "#eee", height: "10px", borderRadius: "4px" }}
              />
              <Typography variant="body2" style={{ textAlign: "right" }}>
                {parseFloat(row.progress).toFixed(2)}%
              </Typography>
            </Box>
          );
        }
      },
      sortable: true,
    },
  ];

  return (
    <DashboardCard>
      <Grid container spacing={3} marginBottom={3} alignItems="center">
        <Grid item>
          <Typography variant="h5">Jobs in Progress</Typography>
        </Grid>
        <Grid item></Grid>
      </Grid>
      <Box>
        <DataTable columns={columns} data={jobData} pagination />
      </Box>
    </DashboardCard>
  );
};

export default JobProgress;
