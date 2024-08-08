import React from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, styled, useTheme, Grid
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import SelectYear from '../../../layouts/full/header/SelectYear';
import SelectMonth from '../../../layouts/full/header/SelectMonth';

const TableHeadStyled = styled(TableHead)(({ theme }) => ({
    backgroundColor: theme.palette.primary.light
}));
const TableTypography = styled(TableCell)(({ theme }) => ({
    color: 'white',
    fontWeight: '600',
    fontSize: '12px',
    whiteSpace: 'nowrap'
}));
const TableRowStyled = styled(TableRow)(({ theme, index }) => ({
    borderBottom: '1px solid #eee',
    backgroundColor: index % 2 === 0 ? theme.palette.secondary.contrastText : theme.palette.primary.extraLight
 
}));

const ChargesBackTable = () => {
    const theme = useTheme(); 
    const products = [
        {
            Subtype: "ASN Accuracy",
			TotalDeduction: "362356.00",
            TotalDisputed: "34250.10",
            DisputeApproved: "30230.46",
			DisputeDenied: '12658.20',
			PendingDisputed:'520',
            color: "#1c3c70"
            // color: theme.palette.success.extraDark
        },
        {
            Subtype: "No carton/package content label",
			TotalDeduction: "362356.00",
            TotalDisputed: "34250.10",
            DisputeApproved: "30230.46",
			DisputeDenied: '12658.20',
			PendingDisputed:'520',
            color: "#1c3c70"
            // color: theme.palette.success.extraDark
        },
        {
            Subtype: "Overage PO units",
            TotalDeduction: "50000.00",
            TotalDisputed: "36000.00",
            DisputeApproved: "23852.90",
			DisputeDenied: '3800.52',
			PendingDisputed:'850',
            color: "#1c3c70"
        },
        {
            Subtype: "Oversized Carton",
			TotalDeduction: "30323.25",
            TotalDisputed: "29230.20",
            DisputeApproved: "26450.80",
			DisputeDenied: '1123.20',
			PendingDisputed:'3210',
            color: "#1c3c70"
            // color: theme.palette.primary.main
        },
        {
            Subtype: "Pickup Accuracy",
			TotalDeduction: "28687.78",
            TotalDisputed: "25148.30",
            DisputeApproved: "25468.00",
			DisputeDenied: '21452.00',
			PendingDisputed:'980',
           color: "#1c3c70"
        },
        {
            Subtype: "PO On-Time Accuracy",
			TotalDeduction: "362356.00",
            TotalDisputed: "34250.10",
            DisputeApproved: "30230.46",
			DisputeDenied: '12658.20',
			PendingDisputed:'520',
            color: "#1c3c70"
            // color: theme.palette.success.extraDark
        },
        {
            Subtype: "Prep-Bagging",
            TotalDeduction: "50000.00",
            TotalDisputed: "36000.00",
            DisputeApproved: "23852.90",
			DisputeDenied: '3800.52',
			PendingDisputed:'850',
           color: "#1c3c70"
        },
        {
            Subtype: "Prep-Barcode labeling",
			TotalDeduction: "30323.25",
            TotalDisputed: "29230.20",
            DisputeApproved: "26450.80",
			DisputeDenied: '1123.20',
			PendingDisputed:'3210',
            color: "#1c3c70"
            // color: theme.palette.primary.main
        },
        {
            Subtype: "Prep-Set creation",
			TotalDeduction: "28687.78",
            TotalDisputed: "25148.30",
            DisputeApproved: "25468.00",
			DisputeDenied: '21452.00',
			PendingDisputed:'980',
            color: "#1c3c70"
        },
        {
            Subtype: "Rejected PO Rate",
			TotalDeduction: "30323.25",
            TotalDisputed: "29230.20",
            DisputeApproved: "26450.80",
			DisputeDenied: '1123.20',
			PendingDisputed:'3210',
           color: "#1c3c70"
            // color: theme.palette.primary.main
        },
        {
            Subtype: "Unconfirmed PO units",
			TotalDeduction: "28687.78",
            TotalDisputed: "25148.30",
            DisputeApproved: "25468.00",
			DisputeDenied: '21452.00',
			PendingDisputed:'980',
            color: "#1c3c70"
        },
    ];
    return (
        <DashboardCard>
            <Grid container spacing={2}  mb={3} alignItems='center'>
               <Grid item xs={12} lg={6}>
					<Typography variant='h3'>Infraction Split</Typography>
				</Grid>
                <Grid item xs={12} lg={3}>
                    <SelectMonth />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SelectYear />
                </Grid>

			</Grid>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table aria-label="simple table" sx={{ whiteSpace: "wrap" }}>
                    <TableHeadStyled theme={theme}>
                        <TableRow>
                            <TableTypography fontWeight={600}>Infraction/Issue Type</TableTypography>
                            <TableTypography variant="subtitle2" fontWeight={600}>Total Deduction</TableTypography>
                            <TableTypography variant="subtitle2" fontWeight={600}>Total Disputed</TableTypography>
                            <TableTypography variant="subtitle2" fontWeight={600}>Dispute Approved</TableTypography>
							<TableTypography variant="subtitle2" fontWeight={600}>Dispute Denied</TableTypography>
                            <TableTypography variant="subtitle2" fontWeight={600}>Pending Disputed Line Items</TableTypography>
                        </TableRow>
                    </TableHeadStyled>
                    <TableBody>
                        {products.map((product, index) => (
                            <TableRowStyled key={index} index={index} theme={theme}>
                                <TableCell index={index} style={{ color: product.color, width: '165px'}}>
                                    <Typography style={{ fontSize: '12px', fontWeight: '500' }} variant="tableData">
                                        {product.Subtype}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="tableData">
                                       ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product.TotalDeduction)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="tableData">
                                    ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product.TotalDisputed)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="tableData">
                                    ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product. DisputeApproved)}
                                       
                                    </Typography>
                                </TableCell>
								<TableCell>
                                    <Typography variant="tableData">
									   
                                       ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product. DisputeDenied)}
                                    </Typography>
                                </TableCell>
								<TableCell>
                                    <Typography variant="tableData">
							            {product. PendingDisputed}       
                                    </Typography>
                                </TableCell>
                            </TableRowStyled>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </DashboardCard>
    );
};

export default ChargesBackTable;









