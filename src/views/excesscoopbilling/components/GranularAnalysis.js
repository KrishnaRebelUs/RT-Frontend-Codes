/*--------------------------------------------------------------- My code 2 ---------------------------------------------------------------------*/


import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  styled,
  useTheme,
} from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";
import eventEmitter from "../../../eventEmitter";
import config from "../../../../config";

const TableHeadStyled = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
}));
const TableTypography = styled(TableCell)(({ theme }) => ({
  color: "white",
  fontWeight: "600",
  fontSize: "12px",
  padding: "9px"
}));

const CustomTableTypography = styled(TableCell)(({ theme }) => ({
  color: 'white',
  fontWeight: '600',
  fontSize: '12px',
  whiteSpace: 'nowrap',
  paddingLeft: "18px", 
}));

const TableRowStyled = styled(TableRow)(({ theme, index }) => ({
  borderBottom: "1px solid #eee",
  backgroundColor:
    index % 2 === 0
      ? theme.palette.secondary.contrastText
      : theme.palette.primary.extraLight,
}));

const CenteredBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  paddingTop: "80px"
}));

const GranularAnalysis = () => {
  const theme = useTheme();
  const [apiData, setApiData] = useState([]);
  const BASE_URL = config.UniUrl;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const vendorId = sessionStorage.getItem("selectedVendorId");
      if (token && vendorId) {
        const response = await fetch(
          `${BASE_URL}/overbilling/getSummaryByVendorId/${vendorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setApiData(data.data);
        setLoading(false);
        setError(null); // Reset error state if fetch is successful
      } else {
        console.error("Token or vendorId not found in sessionStorage");
        setLoading(false);
        setError('Authentication error: Please log in again.');
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setError('Failed to fetch data. Please try again later.');
    }
  }, [BASE_URL]);

  useEffect(() => {
    fetchData();

    const vendorChangeListener = (vendorId) => {
      fetchData();
    };

    eventEmitter.on("vendorSelected", vendorChangeListener);

    return () => {
      eventEmitter.off("vendorSelected", vendorChangeListener);
    };
  }, [fetchData]);

  const calculateTotalNetOff = useCallback(() => {
    let totalNetOff = 0;
    apiData.forEach((item) => {
      totalNetOff +=
        parseFloat(item.overbillIdentified) -
        (item.previousRefund !== null ? parseFloat(item.previousRefund) : 0);
    });
    return totalNetOff.toFixed(2);
  }, [apiData]);

  useEffect(() => {
    const totalNetOff = calculateTotalNetOff();
    sessionStorage.setItem("totalNetOff", totalNetOff);
  }, [apiData, calculateTotalNetOff]);


  const mapDataToProducts = useMemo(() => {
    const subtypes = ["QTY_MISMATCH", "FRIEGHT_CHECK", "DROPSHIP", "DUPLICATE_BILLING"];
    const colors = ["#2edd95", "#ed6c02", "#281E5D", "#f19c53"]; 
    const subtypeMappings = {
      "QTY_MISMATCH": "Shipment Disparity",
      "FRIEGHT_CHECK": "Duplicate Freight",
      "DROPSHIP": "Non-compliant Freight",
      "DUPLICATE_BILLING": "Duplicate Billing",
    };
  
    // Create a mapping of subtypes to their data
    const apiDataByType = {};
    apiData.forEach((item) => {
      apiDataByType[item.TYPE] = item;
    });
  
    // Iterate over all subtypes and create data entries
    return subtypes.map((type, index) => {
      const item = apiDataByType[type];
      const color = colors[index];
      
      // Check if item exists for the subtype
      if (!item) {
        return {
          Subtype: subtypeMappings[type],
          Findings$: "0.00",
          PriorAdjustments$: "0.00",
          NetOff: "0.00",
          color: color,
        };
      }
  
      // Calculate findings, prior adjustments, and net off
      const findings = item.overbillIdentified || "0.00";
      const priorAdjustments = item.previousRefund !== null ? item.previousRefund : "0.00";
      const netOff = parseFloat(findings) - parseFloat(priorAdjustments);
  
      return {
        Subtype: subtypeMappings[type],
        Findings$: findings,
        PriorAdjustments$: priorAdjustments,
        NetOff: netOff.toFixed(2),
        color: color,
      };
    });
  }, [apiData]);

  return (
    <DashboardCard
      title={
        <Typography variant="h5" sx={{ color: theme.palette.text.dark }}>
          Granular Analysis
        </Typography>
      }
    >
      {loading ? ( 
        <Typography>Loading...</Typography>
      ) : error ? ( 
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {apiData.length === 0 ? ( 
            <CenteredBox>
              <Typography><h3>No data available for this vendor.</h3></Typography>
            </CenteredBox>
          ) : (
            <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
              <Table aria-label="simple table" sx={{ whiteSpace: "nowrap" }}>
                <TableHeadStyled theme={theme}>
                  <TableRow>
                    <CustomTableTypography variant="subtitle2" fontWeight={600}>
                      Sub-type
                    </CustomTableTypography>
                    <CustomTableTypography variant="subtitle2" fontWeight={600}>
                      Findings
                    </CustomTableTypography>
                    <TableTypography variant="subtitle2" fontWeight={600}>
                      Prior Adjustments
                    </TableTypography>
                    <CustomTableTypography variant="subtitle2" fontWeight={600}>
                      Net Off
                    </CustomTableTypography>
                  </TableRow>
                </TableHeadStyled>
                <TableBody>
                  {mapDataToProducts.map((product, index) => (
                    <TableRowStyled key={index} index={index} theme={theme}>
                      <TableCell index={index} style={{ color: product.color }}>
                        <Typography
                          style={{ fontSize: "12px", fontWeight: "500" }}
                          variant="tableData"
                        >
                          {product.Subtype}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="tableData" style={{ fontSize: "12px" }}>
                          {product.Findings$ === "No data available" ? (
                            product.Findings$
                          ) : (
                            `$${new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(product.Findings$)}`
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="tableData" style={{ fontSize: "12px" }}>
                          {product.PriorAdjustments$ === "No data available" ? (
                            product.PriorAdjustments$
                          ) : (
                            `$${new Intl.NumberFormat().format(
                              parseFloat(product.PriorAdjustments$).toFixed(2)
                            )}`
                          )}
                        </Typography>
                      </TableCell>
                      {/* <TableCell style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="tableData" style={{ fontSize: "12px" }}>
                          {product.NetOff === "No data available" ? (
                            product.NetOff
                          ) : (
                            `$`
                          )}
                        </Typography>
                        {product.NetOff !== "No data available" && (
                          <Typography
                            variant="tableData"
                            style={{
                              fontSize: "12px",
                              marginLeft: "4px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(product.NetOff)}
                          </Typography>
                        )}
                      </TableCell> */}
                      <TableCell style={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="tableData" style={{ fontSize: "12px" }}>
                          {product.NetOff === "No data available" ? (
                            product.NetOff
                          ) : (
                            `$${new Intl.NumberFormat("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            }).format(product.NetOff)}`
                          )}
                        </Typography>
                      </TableCell>
                    </TableRowStyled>
                  ))}
                </TableBody>
              </Table>
            </Box>
          )}
        </>
      )}
    </DashboardCard>
  );
};

export default GranularAnalysis;


