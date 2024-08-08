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
import SelectQtr from '../../../layouts/full/header/SelectQtr';
import SelectMonth from '../../../layouts/full/header/SelectMonth';
import SelectYear from '../../../layouts/full/header/SelectYear';

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

const InfraTable = () => {
    const theme = useTheme(); 
    const products = [
        {
            Subtype: "ASN Accuracy",
			QTR1: "3725.45",
            QTR2: "2610.47",
            QTR3: "13813",
			QTR4: '0.00',
            color: "#1c3c70"
        },
        {
            Subtype: "No carton/package content label",
			QTR1: "0.00",
			QTR2: "15020.00",
			QTR3: "0.00",
			QTR4: '0.00',
            color: "#1c3c70"
        },
        {
            Subtype: "Overage PO units",
			QTR1: "10825.50",
			QTR2: "678.57",
			QTR3: "0.00",
			QTR4: '0.00',
            color: "#1c3c70"
        },
        {
            Subtype: "Oversized Carton",
			QTR1: "50.00",
			QTR2: "0.00",
			QTR3: "0.00",
			QTR4: '0.00',
            color: "#1c3c70"
        },
        {
            Subtype: "Pickup Accuracy",
			QTR1: "2900.00",
            QTR2: "2000.00",
            QTR3: "1000.00",
			QTR4: '0.00',
            color: "#1c3c70"
        },
        {
            Subtype: "PO On-Time Accuracy",
			QTR1: "75210.86",
			QTR2: "54265.64",
			QTR3: "37358.21",
			QTR4: '0.00',
            color: "#1c3c70"
        },
        {
            Subtype: "Prep-Bagging",
			QTR1: "0.85",
			QTR2: "0.00",
			QTR3: "0.00",
			QTR4: '0.00',
            color: "#1c3c70"
        },
        {
            Subtype: "Prep-Barcode labeling",
			QTR1: "113.16",
			QTR2: "0.00",
			QTR3: "0.00",
			QTR4: '0.00',
            color: "#1c3c70"
        },
        {
            Subtype: "Prep-Set creation",
			QTR1: "8.24",
			QTR2: "0.00",
			QTR3: "0.00",
			QTR4: '0.00',
            color: "#1c3c70"
        },
        {
            Subtype: "Rejected PO Rate",
			QTR1: "25205.19",
			QTR2: "10630.56",
			QTR3: "0.00",
			QTR4: '0.00',
            color: "#1c3c70"
        },
        {
            Subtype: "Unconfirmed PO units",
			QTR1: "518.03",
			QTR2: "809.37",
			QTR3: "572.21",
			QTR4: '0.00',
            color: "#1c3c70"
        }
    ];
    return (
        <DashboardCard>
            <Grid container spacing={2}  mb={3} alignItems='center'>
                <Grid item xs={12} lg={6}>
					<Typography variant='h3'>Infraction Type</Typography>
				</Grid>
                <Grid item xs={12} lg={3}>
                    <SelectYear />
                </Grid>
                <Grid item xs={12} lg={3}>
                    <SelectQtr />
                </Grid>

            </Grid>
            <Box sx={{ overflow: 'auto', width: { xs: '280px', sm: 'auto' } }}>
                <Table aria-label="simple table" sx={{ whiteSpace: "wrap" }}>
                    <TableHeadStyled theme={theme}>
                        <TableRow>
                            <TableTypography variant="subtitle2" fontWeight={600}>Infraction/Issue Type</TableTypography>
                            <TableTypography variant="subtitle2" fontWeight={600}>QTR 1</TableTypography>
                            <TableTypography variant="subtitle2" fontWeight={600}>QTR 2</TableTypography>
                            <TableTypography variant="subtitle2" fontWeight={600}>QTR 3</TableTypography>
							<TableTypography variant="subtitle2" fontWeight={600}>QTR 4</TableTypography>
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
                                       ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product.QTR1)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="tableData">
                                    ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product.QTR2)}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography variant="tableData">
                                    ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product. QTR3
)}
                                       
                                    </Typography>
                                </TableCell>
								<TableCell>
                                    <Typography variant="tableData">
									   {/* {product. QTR4} */}
                                       ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(product.QTR4)}
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

export default InfraTable;
