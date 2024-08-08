import React, {useState}from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, styled, useTheme, Button, Stack, TableContainer, Dialog,DialogTitle, DialogContent,  Grid, 
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import {IconPencil, IconTrash ,IconX} from '@tabler/icons-react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import SelectCurrency from '../../../layouts/full/header/SelectCurrency';
import DataTable from 'react-data-table-component';
import moment from 'moment';


const TableHeadStyled = styled(TableHead)(({ }) => ({
    backgroundColor: '#00A15D',
    borderRadius:'7px',
   
}));
const TypographyStyled = styled(Typography)(({ theme }) => ({
   color: theme.palette.primary.main,
   marginBottom:'10px'
   
}));

const TableTypography = styled(TableCell)(({ theme, index }) => ({
    color: theme.palette.primary.contrastText,

}));
const TableRowStyled = styled(TableRow)(({ theme, index }) => ({
    backgroundColor: index % 2 === 0 ? theme.palette.primary.contrastText: theme.palette.secondary.light,

}));


const InvoiceTable = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);


    
const columns = [
    {
        name : 'S.No',
        selector: row => row.Sno,
        sortable: true,
        cell: (row, index, column, id) => {
            return (
                <Box>
                    <Typography variant='body1' fontWeight='500' style={{ color:theme.palette.primary.main }}>{row.Sno}</Typography>
                </Box>
            );
        }
    },
    {
        name : 'Batch Number',
        selector: row => row.BatchNumber,
        sortable: true,
        cell: (row, index, column, id) => {
            return (
                <Box>
                     <Typography variant='body1' fontWeight='500' style={{ color:theme.palette.primary.main }}>{row.BatchNumber}</Typography>
                </Box>
            );
        }
    },
    {
        name : 'Po Period',
        selector: row => row.PoiPeriod,
        sortable: true,
        cell: (row, index, column, id) => {
            return (
				<Box>
				  <Typography variant='body1' fontWeight='500' style={{ color:theme.palette.primary.main }}>{row.PoiPeriod}</Typography>
		        </Box>
            );
        }
    },
    {
        name : 'Po Period',
        selector: row => row.PoPeriod,
        sortable: true,
        formatter: row => moment(row.Payment).format('DD/MM/YY'),
        cell: (row, index, column, id) => {
            return (
				<Box>
				  <Typography variant='body1' fontWeight='500' style={{ color:theme.palette.primary.main }}>{row.PoPeriod}</Typography>
			    </Box>
            );
        }
        
    },
    {
        name : 'Need to be Invoiced Amount',
        selector: row => row.InvoicedAmount,
        sortable: true,
        cell: (row, index, column, id) => {
            return (
                <Box>
                    <Typography variant='body1' fontWeight='500' style={{ color:theme.palette.primary.main }}>{row.InvoicedAmount}</Typography>
                </Box>
            );
        }
    },
    {
        name : 'Invoice Creation Date',
        selector: row => row.InvoiceCreationDate,
        sortable: true,
        cell: (row, index, column, id) => {
            return (
                <Box>
                    <Typography variant='body1'  fontWeight='500' style={{ color:theme.palette.primary.main }}>{row.InvoiceCreationDate}</Typography>
                </Box>
            );
        }
    },
    {
        name : 'Invoice Submitted($)',
        selector: row => row.InvoiceSubmitted,
        sortable: true,
        cell: (row, index, column, id) => {
            return (
				<Box>
				  <Typography variant='body1'  fontWeight='500' style={{ color:theme.palette.primary.main }}>{row.InvoiceSubmitted}</Typography>
			    </Box>
            );
        }
    },
	{
        name : 'Payment Date',
        selector: row => row.PaymentDate,
        sortable: true,
        cell: (row, index, column, id) => {
            return (
				<Box>
				  <Typography variant='body1'  fontWeight='500' style={{ color:theme.palette.primary.main }}>{row.PaymentDate}</Typography>
			    </Box>
            );
        }
    },
	{
        name : 'Net Payment Received ($)',
        selector: row => row.NetPaymentReceived,
        sortable: true,
        cell: (row, index, column, id) => {
            return (
				<Box>
				  <Typography variant='body1'  fontWeight='500' style={{ color:theme.palette.primary.main }}>{row.NetPaymentReceived}</Typography>
			    </Box>
            );
        }
    },

];

const disputeTable = [
    {
	  Sno: '1',
	  BatchNumber: 'VN11062020115444_01122',
	  PoiPeriod: '01/01/22-04/30/23',
	  PoPeriod: '06/14/23',
	  InvoicedAmount: '$137,217.67',
	  InvoiceCreationDate: '07/04/23',
	  CountOfInvoiceCreated: '332',
	  InvoiceSubmitted:'$133,616.45',
	  PaymentDate: 'Multiple',
	  PaymentNumber: 'Multiple',
	  NetPaymentReceived: '$54,261.23',
	  RecoveryRate: '60.82%' ,
	  ExpectedPaymentDueDate:'08/07/23',
	  CronJobTriggerDate: '08/04/23',
	  FindingCompletion: 'NA',
	  InvoiceCompletion: 'NA',
	  Status: 'Complete',
	  Progress: 'Completed',

    },
	{
		Sno: '2',
		BatchNumber: 'VN11062020115444_01122',
		PoiPeriod: '01/01/22-04/30/23',
		PoPeriod: '06/14/23',
		InvoicedAmount: '$137,217.67',
		InvoiceCreationDate: '07/04/23',
		CountOfInvoiceCreated: '332',
		InvoiceSubmitted:'$133,616.45',
		PaymentDate: 'Multiple',
		PaymentNumber: 'Multiple',
		NetPaymentReceived: '$54,261.23',
		RecoveryRate: '60.82%' ,
		ExpectedPaymentDueDate:'08/07/23',
		CronJobTriggerDate: '08/04/23',
		FindingCompletion: 'NA',
		InvoiceCompletion: 'NA',
		Status: 'Complete',
		Progress: 'Completed',
  
	},
	{
		Sno: '3',
		BatchNumber: 'VN11062020115444_01122',
		PoiPeriod: '01/01/22-04/30/23',
		PoPeriod: '06/14/23',
		InvoicedAmount: '$137,217.67',
		InvoiceCreationDate: '07/04/23',
		CountOfInvoiceCreated: '332',
		InvoiceSubmitted:'$133,616.45',
		PaymentDate: 'Multiple',
		PaymentNumber: 'Multiple',
		NetPaymentReceived: '$54,261.23',
		RecoveryRate: '60.82%' ,
		ExpectedPaymentDueDate:'08/07/23',
		CronJobTriggerDate: '08/04/23',
		FindingCompletion: 'NA',
		InvoiceCompletion: 'NA',
		Status: 'Complete',
		Progress: 'Completed',
  
	},
	{
		Sno: '4',
		BatchNumber: 'VN11062020115444_01122',
		PoiPeriod: '01/01/22-04/30/23',
		PoPeriod: '06/14/23',
		InvoicedAmount: '$137,217.67',
		InvoiceCreationDate: '07/04/23',
		CountOfInvoiceCreated: '332',
		InvoiceSubmitted:'$133,616.45',
		PaymentDate: 'Multiple',
		PaymentNumber: 'Multiple',
		NetPaymentReceived: '$54,261.23',
		RecoveryRate: '60.82%' ,
		ExpectedPaymentDueDate:'08/07/23',
		CronJobTriggerDate: '08/04/23',
		FindingCompletion: 'NA',
		InvoiceCompletion: 'NA',
		Status: 'Complete',
		Progress: 'Completed',
  
	},
	{
		Sno: '5',
		BatchNumber: 'VN11062020115444_01122',
		PoiPeriod: '01/01/22-04/30/23',
		PoPeriod: '06/14/23',
		InvoicedAmount: '$137,217.67',
		InvoiceCreationDate: '07/04/23',
		CountOfInvoiceCreated: '332',
		InvoiceSubmitted:'$133,616.45',
		PaymentDate: 'Multiple',
		PaymentNumber: 'Multiple',
		NetPaymentReceived: '$54,261.23',
		RecoveryRate: '60.82%' ,
		ExpectedPaymentDueDate:'08/07/23',
		CronJobTriggerDate: '08/04/23',
		FindingCompletion: 'NA',
		InvoiceCompletion: 'NA',
		Status: 'Complete',
		Progress: 'Completed',
  
	},
	{
		Sno: '6',
		BatchNumber: 'VN11062020115444_01122',
		PoiPeriod: '01/01/22-04/30/23',
		PoPeriod: '06/14/23',
		InvoicedAmount: '$137,217.67',
		InvoiceCreationDate: '07/04/23',
		CountOfInvoiceCreated: '332',
		InvoiceSubmitted:'$133,616.45',
		PaymentDate: 'Multiple',
		PaymentNumber: 'Multiple',
		NetPaymentReceived: '$54,261.23',
		RecoveryRate: '60.82%' ,
		ExpectedPaymentDueDate:'08/07/23',
		CronJobTriggerDate: '08/04/23',
		FindingCompletion: 'NA',
		InvoiceCompletion: 'NA',
		Status: 'Complete',
		Progress: 'Completed',
  
	},
	{
		Sno: '7',
		BatchNumber: 'VN11062020115444_01122',
		PoiPeriod: '01/01/22-04/30/23',
		PoPeriod: '06/14/23',
		InvoicedAmount: '$137,217.67',
		InvoiceCreationDate: '07/04/23',
		CountOfInvoiceCreated: '332',
		InvoiceSubmitted:'$133,616.45',
		PaymentDate: 'Multiple',
		PaymentNumber: 'Multiple',
		NetPaymentReceived: '$54,261.23',
		RecoveryRate: '60.82%' ,
		ExpectedPaymentDueDate:'08/07/23',
		CronJobTriggerDate: '08/04/23',
		FindingCompletion: 'NA',
		InvoiceCompletion: 'NA',
		Status: 'Complete',
		Progress: 'Completed',

	},
	{
		Sno: '8',
		BatchNumber: 'VN11062020115444_01122',
		PoiPeriod: '01/01/22-04/30/23',
		PoPeriod: '06/14/23',
		InvoicedAmount: '$137,217.67',
		InvoiceCreationDate: '07/04/23',
		CountOfInvoiceCreated: '332',
		InvoiceSubmitted:'$133,616.45',
		PaymentDate: 'Multiple',
		PaymentNumber: 'Multiple',
		NetPaymentReceived: '$54,261.23',
		RecoveryRate: '60.82%' ,
		ExpectedPaymentDueDate:'08/07/23',
		CronJobTriggerDate: '08/04/23',
		FindingCompletion: 'NA',
		InvoiceCompletion: 'NA',
		Status: 'Complete',
		Progress: 'Completed',

	},
	{
		Sno: '9',
		BatchNumber: 'VN11062020115444_01122',
		PoiPeriod: '01/01/22-04/30/23',
		PoPeriod: '06/14/23',
		InvoicedAmount: '$137,217.67',
		InvoiceCreationDate: '07/04/23',
		CountOfInvoiceCreated: '332',
		InvoiceSubmitted:'$133,616.45',
		PaymentDate: 'Multiple',
		PaymentNumber: 'Multiple',
		NetPaymentReceived: '$54,261.23',
		RecoveryRate: '60.82%' ,
		ExpectedPaymentDueDate:'08/07/23',
		CronJobTriggerDate: '08/04/23',
		FindingCompletion: 'NA',
		InvoiceCompletion: 'NA',
		Status: 'Complete',
		Progress: 'Completed',

	},
	{
		Sno: '10',
		BatchNumber: 'VN11062020115444_01122',
		PoiPeriod: '01/01/22-04/30/23',
		PoPeriod: '06/14/23',
		InvoicedAmount: '$137,217.67',
		InvoiceCreationDate: '07/04/23',
		CountOfInvoiceCreated: '332',
		InvoiceSubmitted:'$133,616.45',
		PaymentDate: 'Multiple',
		PaymentNumber: 'Multiple',
		NetPaymentReceived: '$54,261.23',
		RecoveryRate: '60.82%' ,
		ExpectedPaymentDueDate:'08/07/23',
		CronJobTriggerDate: '08/04/23',
		FindingCompletion: 'NA',
		InvoiceCompletion: 'NA',
		Status: 'Complete',
		Progress: 'Completed',

	},
];


    const ExpandedComponent = ({ data }) => {
        return (
            <Box>
                <TableContainer>
                    <Table>
                        <TableHeadStyled>
                            <TableRow>

                                <TableTypography fontWeight={600} style={{color:'#fff', fontSize:'14px'}}>Recovery Rate (%)</TableTypography>
                                <TableTypography fontWeight={600} style={{color:'#fff', fontSize:'14px'}}>Expected Payment Due Date</TableTypography>
                                <TableTypography fontWeight={600} style={{color:'#fff', fontSize:'14px'}}>Cron Job Trigger Date</TableTypography>
                                <TableTypography fontWeight={600} style={{color:'#fff', fontSize:'14px'}}>Finding Completion</TableTypography>
                                <TableTypography fontWeight={600} style={{color:'#fff', fontSize:'14px'}}>Invoice Completion</TableTypography>
								<TableTypography fontWeight={600} style={{color:'#fff', fontSize:'14px'}}>Status</TableTypography>
                                <TableTypography fontWeight={600} style={{color:'#fff', fontSize:'14px'}}>Progress Bar</TableTypography>
                            </TableRow>
                        </TableHeadStyled>
                        <TableBody>
                            <TableRowStyled>
                                <TableCell variant='body1' fontWeight={500} style={{ color:theme.palette.primary.main, fontSize:'14px' }}>{data.Created}</TableCell>
                                <TableCell variant='body1' fontWeight={500} style={{ color:theme.palette.primary.main, fontSize:'14px' }}>{moment(data.ExpectedPaymentDueDate).format('DD/MM/YY') }</TableCell>
                                <TableCell variant='body1' fontWeight={500} style={{ color:theme.palette.primary.main, fontSize:'14px' }}>{moment(data.CronJobTriggerDate).format('DD/MM/YY') }</TableCell>
                                <TableCell variant='body1' fontWeight={500} style={{ color:theme.palette.primary.main, fontSize:'14px' }}>{data.FindingCompletion}</TableCell>
                                <TableCell variant='body1' fontWeight={500} style={{ color:theme.palette.primary.main, fontSize:'14px' }}>{data.InvoiceCompletion}</TableCell>
								<TableCell variant='body1' fontWeight={500} style={{ color:theme.palette.primary.main, fontSize:'14px' }}>{data.Status}</TableCell>
                                <TableCell variant='body1' fontWeight={500} style={{ color:theme.palette.primary.main, fontSize:'14px' }}>{data.Progress}</TableCell>
                               
                            </TableRowStyled>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }


    return (
		<Box marginTop={4}>
			<DataTable
				columns={columns}
				data={disputeTable}
				pagination
				expandableRows
				expandableRowsComponent={ExpandedComponent}
				className='invoice-table'

			/>
		</Box>
    );
};

export default InvoiceTable;
