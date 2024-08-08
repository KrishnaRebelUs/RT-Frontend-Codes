import React from 'react';
import {
    Typography,
    Box,
    TableContainer,
    styled,
    useTheme,
	Grid,Button, Stack
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { IconFileArrowRight } from '@tabler/icons-react';
import Search from './Search';
import DataTable from 'react-data-table-component';
import '../../../theme/TableStyle.css'
import moment from 'moment';


const ButtonStyled = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.primary.contrast,
    border: '1px solid',
    borderColor: theme.palette.primary.contrast,
    color: theme.palette.primary.contrastText,
    fontSize: '15px',
    padding: '0',
    fontWeight: '600',
    transition: 'all ease 0.3s',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color:theme.palette.primary.contrastText,
        borderColor:theme.palette.primary.main
    },
    '& .btn-indicator':{
        width: '1px',
        backgroundColor: theme.palette.primary.main,
        alignSelf: 'stretch',
        marginLeft: '4px'

    }
}));
const BoxStyled = styled(Box)(({ theme }) => ({
   
    padding: '5px 12px',
    fontWeight: '600',
}));
const ShortageLogTable = () => {
    const theme = useTheme();

    const columns = [
        {
            name: 'Vendor Name',
            selector: row => row.VendorName,
            sortable: true,
        },
        {
            name: 'Created Date',
            selector: row => row.CreatedDate,
            formatter: function (d) {
                return moment(d).format('MM/DD/YY');
            },
            sortable: true,
        },
        {
            name: 'Disputed',
            selector: row => row.Disputed,
            sortable: true,
        },
        {
            name: 'Not Disputed',
            selector: row => row.NotDisputed,
            sortable: true,
        },
        {
            name: 'Total',
            selector: row => row.Total,
            sortable: true,
        },
    ];

    const ShortageDisputeTable = [
        {
            VendorName: 'CA - Chefman – Canada',
            CreatedDate: '01/09/24',
            Disputed: '0',
            NotDisputed: '10',
            Total: '0'
        },
        {
            VendorName: 'GB - CHEFMAN UK LIMITED',
            CreatedDate: '01/09/24',
            Disputed: '2',
            NotDisputed: '0',
            Total: '0'
        },
        {
            VendorName: 'US - L Oreal/Cerave',
            CreatedDate: '01/09/24',
            Disputed: '0',
            NotDisputed: '12',
            Total: '10'
        },
        {
            VendorName: 'US - Hyper Pet LLC',
            CreatedDate: '01/09/24',
            Disputed: '0',
            NotDisputed: '13',
            Total: '11'
        },
        {
            VendorName: 'US - Aquasana Inc.',
            CreatedDate: '01/09/24',
            Disputed: '1',
            NotDisputed: '0',
            Total: '12'
        },
        {
            VendorName: 'US - Weiler Corporation',
            CreatedDate: '01/09/24',
            Disputed: '6',
            NotDisputed: '0',
            Total: '15'
        },
        {
            VendorName: 'US - Doskocil',
            CreatedDate: '01/09/24',
            Disputed: '0',
            NotDisputed: '0',
            Total: '8'
        },
        {
            VendorName: 'US - Force Factor Brands LLC',
            CreatedDate: '01/09/24',
            Disputed: '1',
            NotDisputed: '0',
            Total: '0'
        },
    ];

    return (
        <DashboardCard  title={
            <Typography variant='h5' sx={{ color: theme.palette.text.dark }}>Itemized Shortage Dipute Log</Typography>}>
            <Box>
				<Grid container spacing={3} alignItems='center' marginBottom={3}>
					<Grid item xs="5">
					    <Search />
					</Grid>
					<Grid item xs="5">
					   <Stack direction='row' spacing={2}>
					      <ButtonStyled>Reset</ButtonStyled>
                          <ButtonStyled><BoxStyled>Export</BoxStyled> <span className='btn-indicator'></span> <BoxStyled><IconFileArrowRight size="22" style={{margin:'auto', verticalAlign:'middle'}}/></BoxStyled></ButtonStyled>
					   </Stack>
					</Grid>
					
				</Grid>
                <TableContainer>
                   <DataTable
                        columns={columns}
                        data={ShortageDisputeTable}
                        pagination
                    />
                </TableContainer>
            </Box>
        </DashboardCard>
    );
};

export default ShortageLogTable;
