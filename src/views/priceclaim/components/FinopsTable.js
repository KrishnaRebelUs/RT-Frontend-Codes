import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Tab,
  Typography,
  Stack,
  useTheme,
  styled,
  Button,
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import DataTable from "react-data-table-component";
import { IconFileArrowRight, IconFileArrowLeft } from "@tabler/icons-react";
import "../../../theme/TableStyle.css";
import moment from "moment";
import axios from "axios";
import config from "../../../../config";
import eventEmitter from "../../../eventEmitter";

const TabStyled = styled(Tab)(({ theme }) => ({
  fontWeight: "600",
  fontSize: "16px",
  padding: 0,
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.contrast,
  border: "1px solid",
  borderColor: theme.palette.primary.contrast,
  color: theme.palette.primary.contrastText,
  fontSize: "15px",
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

const CustomProgressBarContainer = styled(Box)(({ theme }) => ({
  height: "5px",
  display: "flex",
  alignItems: "center",
  position: "relative",
  backgroundColor: theme.palette.success.light,
  borderRadius: "7px",
}));

const ProgressDark = styled(Box)(({ theme, value }) => ({
  width: `${value}%`,
  height: "100%",
  backgroundColor: theme.palette.success.main,
  borderRadius: "7px",
}));

const ProgressLabel = styled(Box)(({ theme, value }) => ({
  width: "50px",
  height: "22px",
  textAlign: "center",
  borderRadius: "7px",
  position: "absolute",
  left: `calc(${value}% - 21px)`,
  bottom: "15px",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  backgroundColor: theme.palette.success.main,
  "& span": {
    content: '""',
    position: "absolute",
    bottom: "-3px",
    border: "3px solid",
    transform: "rotate(45deg)",
    right: "calc(50% - 3px)",
    borderColor: theme.palette.success.main,
  },
}));

const ProgressText = styled(Box)(({ theme }) => ({
  fontSize: "20px",
  fontWeight: "500",
  color: theme.palette.success.main,
}));

const BoxStyled = styled(Box)(({ theme }) => ({
  padding: "5px 12px",
  fontWeight: "600",
}));

export const ExportCSVBTN = () => {
  return (
    <ButtonStyled variant="contained" color="primary">
      Export{" "}
      <Box style={{ display: "flex", alignItems: "center", marginLeft: "5px" }}>
        <IconFileArrowRight width="20" />
      </Box>
    </ButtonStyled>
  );
};

const handleExport = async () => {
  const token = sessionStorage.getItem("token");
  const vendorId = sessionStorage.getItem("selectedVendorId");
  // console.log("Vendor ID:", vendorId); 
  const BASE_URL = config.UniUrl;

  try {
    const response = await axios.get(
      `${BASE_URL}/api/excel/download?disputeType=Price claim&vendorId=${vendorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: "blob", 
      }
    );

    // Create a URL for the file and trigger the download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "disputes.xlsx"); 
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

const FinopsTable = () => {
  const [value, setValue] = useState("1");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const theme = useTheme();
  const BASE_URL = config.UniUrl;

  const fetchData = async (vendorId) => {
    try {
      const token = sessionStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/shortage/getDisputeData?disputeType=Price claim&vendorId=${vendorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
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
    filterData(data, value);
  }, [data, value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const filterData = (data, filter) => {
    let filtered;
    switch (filter) {
      case "1":
        filtered = data.filter((row) => row.disputeStatus === "Resolved");
        break;
      case "2":
        filtered = data.filter((row) => row.disputeStatus === "Denied");
        break;
      case "3":
        filtered = data.filter(
          (row) => row.disputeStatus === null || row.disputeStatus === "Pending"
        );
        break;
      case "4":
      default:
        filtered = data;
        break;
    }
    setFilteredData(filtered);
  };

  const winRate = parseFloat(sessionStorage.getItem("winRate")).toFixed(2); // Retrieve win rate from session storage

  const columns = [
    {
      name: "Dispute ID",
      selector: (row) => row.disputeId,
      sortable: true,
      cell: (row) => (
        <Box>
          <Typography
            variant="body1"
            fontWeight="500"
            fontSize="14px"
            style={{ color: theme.palette.secondary.main }}
          >
            {row.disputeId}
          </Typography>
        </Box>
      ),
    },
    {
      name: "Dispute Type",
      selector: (row) => row.disputeType,
      sortable: true,
      cell: (row) => (
        <Box>
          <Typography
            variant="body1"
            fontWeight="500"
            fontSize="14px"
            style={{ color: theme.palette.accent.main }}
          >
            {row.disputeType}
          </Typography>
        </Box>
      ),
    },
    {
      name: "Dispute Date",
      selector: (row) => row.disputeDate,
      sortable: true,
      cell: (row) => (
        <Box>
          <Typography
            variant="body1"
            fontWeight="500"
            fontSize="14px"
            style={{ color: theme.palette.secondary.main }}
          >
            {moment(row.disputeDate).format("MM/DD/YY")}
          </Typography>
        </Box>
      ),
    },
    {
      name: "Dispute Status",
      selector: (row) => row.disputeStatus,
      sortable: true,
      cell: (row) => {
        if (row.disputeStatus === "Resolved") {
          return (
            <Box>
              <Typography
                variant="body1"
                fontWeight="500"
                fontSize="14px"
                style={{ color: theme.palette.success.main }}
              >
                {row.disputeStatus}
              </Typography>
            </Box>
          );
        } else if (row.disputeStatus === "Denied") {
          return (
            <Box>
              <Typography
                variant="body1"
                fontWeight="500"
                fontSize="14px"
                style={{ color: "red" }}
              >
                {row.disputeStatus}
              </Typography>
            </Box>
          );
        } else {
          return (
            <Box>
              <Typography
                variant="body1"
                fontWeight="500"
                fontSize="14px"
                style={{ color: "orange" }}
              >
                Pending
              </Typography>
            </Box>
          );
        }
      },
    },
    // {
    //     name: 'DisputeAmount',
    //     selector: row => row.totalDisputedAmount,
    //     sortable: true,
    // },
    {
      name: "Dispute Amount",
      selector: (row) => row.totalDisputedAmount,
      sortable: true,
      cell: (row) => (
        <Box>
          <Typography
            variant="body1"
            fontWeight="500"
            fontSize="14px"
            style={{ color: theme.palette.secondary.main }}
          >
            {/* {row.totalDisputedAmount.toFixed(2)} */}
            ${row.totalDisputedAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            
          </Typography>
        </Box>
      ),
    },
    {
      name: "Approved Amount (As Per Vc)",
      selector: (row) => row.approvedAmount,
      sortable: true,
      cell: (row) => (
        <Box>
          <Typography
            variant="body1"
            fontWeight="500"
            fontSize="14px"
            style={{ color: theme.palette.secondary.main }}
          >
            {/* {row.approvedAmount !== null
              ? `$${row.approvedAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
              : "N/A"} */}
              {row.approvedAmount !== null
          ? `$${row.approvedAmount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
          : "N/A"}
            {/* {row.approvedAmount} */}
          </Typography>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={value} className="table-tabs">
              <Box
                sx={{ borderBottom: 1, borderColor: "divider" }}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                  alignItems: "center",
                  borderBottom: "0",
                }}
              >
                <TabList
                  onChange={handleChange}
                  indicatorColor="secondary"
                  className="finops-tab"
                  style={{ overflow: "visible" }}
                >
                  <TabStyled
                    label="Approved"
                    value="1"
                    style={{ color: theme.palette.text.dark }}
                  />
                  <TabStyled label="Denied" value="2" />
                  <TabStyled label="Pending" value="3" />
                  <TabStyled label="All" value="4" />
                </TabList>

                <Grid
                  container
                  spacing={1}
                  justifyContent="end"
                  alignItems="end"
                >
                  <Grid>
                    <ProgressText style={{ color: theme.palette.success.main }}>
                      Win Rate
                    </ProgressText>
                  </Grid>
                  <Grid item xs={4} style={{ paddingTop: "0" }}>
                    <Box style={{ width: "calc(100% - 30px)" }} mx={"auto"}>
                      <CustomProgressBarContainer>
                        <ProgressDark value={winRate} />
                        <ProgressLabel value={winRate}>
                          {winRate}% <Box component="span"></Box>
                        </ProgressLabel>
                      </CustomProgressBarContainer>
                    </Box>
                  </Grid>
                  <Grid item style={{ paddingTop: "0" }}>
                    <Stack
                      direction="row"
                      spacing={2}
                      style={{ marginTop: "16px" }}
                    >
                      <ButtonStyled>
                        <BoxStyled>Import</BoxStyled>{" "}
                        <span className="btn-indicator"></span>{" "}
                        <BoxStyled>
                          <IconFileArrowLeft
                            size="18"
                            style={{ margin: "auto", verticalAlign: "middle" }}
                          />
                        </BoxStyled>
                      </ButtonStyled>
                      <ButtonStyled onClick={handleExport}>
                        <BoxStyled>Export</BoxStyled>{" "}
                        <span className="btn-indicator"></span>{" "}
                        <BoxStyled>
                          <IconFileArrowRight
                            size="18"
                            style={{ margin: "auto", verticalAlign: "middle" }}
                          />
                        </BoxStyled>
                      </ButtonStyled>
                    </Stack>
                  </Grid>
                </Grid>
              </Box>
              <TabPanel value="1" style={{ padding: 0 }}>
                <DataTable columns={columns} data={filteredData} pagination />
              </TabPanel>
              <TabPanel value="2" style={{ padding: 0 }}>
                <DataTable columns={columns} data={filteredData} pagination />
              </TabPanel>
              <TabPanel value="3" style={{ padding: 0 }}>
                <DataTable columns={columns} data={filteredData} pagination />
              </TabPanel>
              <TabPanel value="4" style={{ padding: 0 }}>
                <DataTable columns={columns} data={filteredData} pagination />
              </TabPanel>
            </TabContext>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FinopsTable;
