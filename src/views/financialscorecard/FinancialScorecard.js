/*------------------------------------------------------------- Code 1 ------------------------------------------------------------------------*/

// import React, { useState, useEffect } from "react";
// import { Box, Typography, Grid, Stack, useTheme } from "@mui/material";
// import PageContainer from "../../components/container/PageContainer";
// import Breadcrumb from "../components/pages/Breadcrumb";
// import LineChart from '../components/pages/LineChart';
// import ColumnChart from '../components/pages/ColumnChart';
// import AreaChart from "../components/pages/AreaChart";
// import AreaChart1 from "../components/pages/AreaChart1";
// import LineChart1 from "../components/pages/LineChart1";
// import ColumnChart1 from "../components/pages/ColumnChart1";
// import Header from "../components/pages/Header";
// import DashboardCard from "../../components/shared/DashboardCard";
// import { IconArrowUpRight } from '@tabler/icons-react';
// import ComaprisionTable from "../components/pages/ComaprisionTable";
// import ComaprisionTable1 from "./ComparisionTable1";
// import PoGraph from "./components/PoGraph";
// import eventEmitter from "../../eventEmitter";

// const FinancialScorecard = () => {
//     const [vendorId, setVendorId] = useState(null);
//     const theme = useTheme();

//     useEffect(() => {
//         const fetchVendorId = () => {
//             const storedVendorId = sessionStorage.getItem("selectedVendorId");
//             setVendorId(storedVendorId);
//         };

//         fetchVendorId();

//         eventEmitter.on("vendorSelected", fetchVendorId);

//         return () => {
//             eventEmitter.off("vendorSelected", fetchVendorId);
//         };
//     }, []);

//     const renderTotalProduct = () => {
//         return (
//             <Typography variant="subtitle2" sx={{ color: theme.palette.text.dark }}>
//                 <Box style={{ height: '10px', width: '10px', borderRadius: '50px', backgroundColor: "#245aa0", marginRight: '5px', display: 'inline-flex' }} />
//                 2024
//             </Typography>
//         );
//     };

//     const renderTotalUser = () => {
//         return (
//             <Typography variant="subtitle2" sx={{ color: theme.palette.text.dark }}>
//                 <Box style={{ height: '10px', width: '10px', borderRadius: '50px', backgroundColor: "#2edd95", marginRight: '5px', display: 'inline-flex' }} />
//                 2023
//             </Typography>
//         );
//     };

//     const renderTotalCategories = () => {
//         return (
//             <Typography variant="subtitle2" sx={{ color: theme.palette.text.dark }}>
//                 <Box style={{ height: '10px', width: '10px', borderRadius: '50px', backgroundColor: "#ee8129", marginRight: '5px', display: 'inline-flex' }} />
//                 2022
//             </Typography>
//         );
//     };

//     const renderLatest = () => {
//         return (
//             <Typography variant="subtitle2" sx={{ color: theme.palette.text.dark }}>
//                 <Box style={{ height: '10px', width: '10px', borderRadius: '50px', backgroundColor: "#245aa0", marginRight: '5px', display: 'inline-flex' }} />
//                 2024
//             </Typography>
//         );
//     };

//     const renderPast = () => {
//         return (
//             <Typography variant="subtitle2" sx={{ color: theme.palette.text.dark }}>
//                 <Box style={{ height: '10px', width: '10px', borderRadius: '50px', backgroundColor: "#ee8129", marginRight: '5px', display: 'inline-flex' }} />
//                 2023
//             </Typography>
//         );
//     };
//     return (
//         <PageContainer title="Financial Scorecard">
//             <Grid container spacing={3}>
//                 <Grid item xs={12}>
//                     <Breadcrumb titles={['P&L Analysis']} />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Header title='P&L Analysis' />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} my={2}>
//                             <Typography variant='h3'>Overview</Typography>
//                         </Grid>
//                         <Grid item sm={6} md={6}>
//                             <DashboardCard title={<Typography variant='h6' sx={{ color: theme.palette.success.main }}>
//                                 {vendorId === '5' ? '9.48%' : (vendorId === '4' ? '9.48%' : 'No data available for this vendor')}
//                                 <IconArrowUpRight size='16' />
//                             </Typography>}>
//                                 <Typography variant='h4'>EBITDA % </Typography>
//                                 <Stack direction='row' spacing={1} marginTop={2}>
//                                     {renderTotalProduct()}
//                                     {renderTotalUser()}
//                                     {renderTotalCategories()}
//                                 </Stack>
//                                 {vendorId === '5' ? <ColumnChart /> : (vendorId === '4' ? <ColumnChart /> : <Typography variant='body2'>
//                                     No data available for this vendor
//                                     </Typography>)}
//                             </DashboardCard>
//                         </Grid>
//                         <Grid item sm={6} md={6}>
//                             <DashboardCard title={<Typography variant='h6' sx={{ color: theme.palette.success.main }}>
//                                 {vendorId === '5' ? '$133,128' : (vendorId === '4' ? '$133,128' : 'No data available for this vendor')}
//                                 <IconArrowUpRight size='16' />
//                             </Typography>}>
//                                 <Typography variant='h4'>EBITDA ($) </Typography>
//                                 <Stack direction='row' spacing={2} marginTop={2}>
//                                     {renderLatest()}
//                                     {renderPast()}
//                                 </Stack>
//                                 {vendorId === '5' ? <LineChart /> : (vendorId === '4' ? <LineChart /> : <Typography variant='body2'>No data available for this vendor</Typography>)}
//                             </DashboardCard>
//                         </Grid>
//                         <Grid item sm={6} md={6}>
//                             <DashboardCard title={<Typography variant='h6' sx={{ color: theme.palette.success.main }}>
//                                 {vendorId === '5' ? '$2,035,146' : (vendorId === '4' ? '$2,035,146' : 'No data available for this vendor')}
//                                 <IconArrowUpRight size='16' />
//                             </Typography>}>
//                                 <Typography variant='h4'>Provision Deduction </Typography>
//                                 {vendorId === '5' ? <AreaChart /> : (vendorId === '4' ? <AreaChart /> : <Typography variant='body2'>No data available for this vendor</Typography>)}
//                             </DashboardCard>
//                         </Grid>
//                         <Grid item sm={6} md={6}>
//                             <DashboardCard title={<Typography variant='h6' sx={{ color: theme.palette.success.main }}>
//                                 {vendorId === '5' ? '$5,165,214.45' : (vendorId === '4' ? '$5,165,214.45' : 'No data available for this vendor')}
//                                 <IconArrowUpRight size='16' />
//                             </Typography>}>
//                                 <Typography variant='h4'>PO Accepted </Typography>
//                                 {vendorId === '5' ? <PoGraph /> : (vendorId === '4' ? <PoGraph /> : <Typography variant='body2'>No data available for this vendor</Typography>)}
//                             </DashboardCard>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <DashboardCard>
//                         <Grid container spacing={2}>
//                             <Grid item>
//                                 <Typography variant="h3">Yearly Comparison</Typography>
//                             </Grid>
//                             <Grid item xs={12}>
//                                 {vendorId === '4' && <ComaprisionTable />}
//                                 {vendorId === '5' && <ComaprisionTable1 />}
//                                 {!['4', '5'].includes(vendorId) && <Typography variant='body2'>No data available for this vendor</Typography>}
//                             </Grid>
//                         </Grid>
//                     </DashboardCard>
//                 </Grid>
//             </Grid>
//         </PageContainer>
//     );
// };

// export default FinancialScorecard;



/*------------------------------------------------------------- Code 1 ------------------------------------------------------------------------*/



import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Stack, useTheme } from "@mui/material";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../components/pages/Breadcrumb";
import LineChart from '../components/pages/LineChart';
import ColumnChart from '../components/pages/ColumnChart';
import AreaChart from "../components/pages/AreaChart";
import AreaChart1 from "../components/pages/AreaChart1";
import LineChart1 from "../components/pages/LineChart1";
import ColumnChart1 from "../components/pages/ColumnChart1";
import Header from "../components/pages/Header";
import DashboardCard from "../../components/shared/DashboardCard";
import { IconArrowUpRight } from '@tabler/icons-react';
import ComaprisionTable1 from "./ComparisionTable1";
import PoGraph from "./components/PoGraph";
import eventEmitter from "../../eventEmitter";

const FinancialScorecard = () => {
    const [vendorId, setVendorId] = useState(null);
    const [dataChanged, setDataChanged] = useState(false); 
    const theme = useTheme();

    useEffect(() => {
        const fetchVendorId = () => {
            const storedVendorId = sessionStorage.getItem("selectedVendorId");
            setVendorId(storedVendorId);
            setDataChanged(true); 
        };

        fetchVendorId();

        const handleVendorChange = () => {
            fetchVendorId();
        };

        eventEmitter.on("vendorSelected", handleVendorChange);

        return () => {
            eventEmitter.off("vendorSelected", handleVendorChange);
        };
    }, []);

    useEffect(() => {
        if (dataChanged) {
            setDataChanged(false); 
        }
    }, [dataChanged]);

    const renderTotalProduct = () => {
        return (
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.dark }}>
                <Box style={{ height: '10px', width: '10px', borderRadius: '50px', backgroundColor: "#245aa0", marginRight: '5px', display: 'inline-flex' }} />
                2024
            </Typography>
        );
    };

    const renderTotalUser = () => {
        return (
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.dark }}>
                <Box style={{ height: '10px', width: '10px', borderRadius: '50px', backgroundColor: "#2edd95", marginRight: '5px', display: 'inline-flex' }} />
                2023
            </Typography>
        );
    };

    const renderTotalCategories = () => {
        return (
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.dark }}>
                <Box style={{ height: '10px', width: '10px', borderRadius: '50px', backgroundColor: "#ee8129", marginRight: '5px', display: 'inline-flex' }} />
                2022
            </Typography>
        );
    };

    const renderLatest = () => {
        return (
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.dark }}>
                <Box style={{ height: '10px', width: '10px', borderRadius: '50px', backgroundColor: "#245aa0", marginRight: '5px', display: 'inline-flex' }} />
                2024
            </Typography>
        );
    };

    const renderPast = () => {
        return (
            <Typography variant="subtitle2" sx={{ color: theme.palette.text.dark }}>
                <Box style={{ height: '10px', width: '10px', borderRadius: '50px', backgroundColor: "#ee8129", marginRight: '5px', display: 'inline-flex' }} />
                2023
            </Typography>
        );
    };

    return (
        <PageContainer title="Financial Scorecard">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Breadcrumb titles={['P&L Analysis']} />
                </Grid>
                <Grid item xs={12}>
                    <Header title='P&L Analysis' />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} my={2}>
                            <Typography variant='h3'>Overview</Typography>
                        </Grid>
                        <Grid item sm={6} md={6}>
                            <DashboardCard title={<Typography variant='h6' sx={{ color: theme.palette.success.main }}>
                                
                            </Typography>}>
                                <Typography variant='h4'>EBITDA % </Typography>
                                <Stack direction='row' spacing={1} marginTop={2}>
                                    {renderTotalProduct()}
                                    {renderTotalUser()}
                                    {renderTotalCategories()}
                                </Stack>
                                {vendorId === '5' ? <ColumnChart /> : (vendorId === '4' ? <ColumnChart /> : <Typography variant='body2'>
                                    No data available for this vendor
                                    </Typography>)}
                            </DashboardCard>
                        </Grid>
                        <Grid item sm={6} md={6}>
                            <DashboardCard title={<Typography variant='h6' sx={{ color: theme.palette.success.main }}>
                                
                            </Typography>}>
                                <Typography variant='h4'>EBITDA ($) </Typography>
                                <Stack direction='row' spacing={2} marginTop={2}>
                                    {renderLatest()}
                                    {renderPast()}
                                </Stack>
                                {vendorId === '5' ? <LineChart /> : (vendorId === '4' ? <LineChart /> : <Typography variant='body2'>No data available for this vendor</Typography>)}
                            </DashboardCard>
                        </Grid>
                        <Grid item sm={6} md={6}>
                            <DashboardCard title={<Typography variant='h6' sx={{ color: theme.palette.success.main }}>
                            </Typography>}>
                                <Typography variant='h4'>Provision Deduction </Typography>
                                {vendorId === '5' ? <AreaChart /> : (vendorId === '4' ? <AreaChart /> : <Typography variant='body2'>No data available for this vendor</Typography>)}
                            </DashboardCard>
                        </Grid>
                        <Grid item sm={6} md={6}>
                            <DashboardCard title={<Typography variant='h6' sx={{ color: theme.palette.success.main }}>
                                
                            </Typography>}>
                                <Typography variant='h4'>PO Accepted </Typography>
                                {vendorId === '5' ? <PoGraph /> : (vendorId === '4' ? <PoGraph /> : <Typography variant='body2'>No data available for this vendor</Typography>)}
                            </DashboardCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <DashboardCard>
                        <Grid container spacing={2}>
                            <Grid item>
                                <Typography variant="h3">Yearly Comparison</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ComaprisionTable1 key={vendorId} /> 
                                {
                                // !['4', '5'].includes(vendorId) && <Typography variant='body2'>No data available for this vendor</Typography>
                                }
                            </Grid>
                        </Grid>
                    </DashboardCard>
                </Grid>
            </Grid>
        </PageContainer>
    );
};

export default FinancialScorecard;
