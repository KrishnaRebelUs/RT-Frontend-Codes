import React, { useState } from 'react';
import { Box, Grid, Tab, Typography, Stack,styled, Button } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import DataTable from 'react-data-table-component';
import { IconFileArrowRight, IconFileArrowLeft } from '@tabler/icons-react';
import '../../../theme/TableStyle.css'
import moment from 'moment';
import {useTheme} from '@mui/material';

const TabStyled = styled(Tab)(({ theme }) => ({
    fontWeight: '600',
    fontSize: '16px',
    padding: 0
}));
const TabListStyled = styled(TabList)(({ theme }) => ({
    '.MuiTabs-flexContainer':{
		columnGap:'15px',
	}
}));

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
        color: theme.palette.primary.contrastText,
        borderColor: theme.palette.primary.main
    },
    '& .btn-indicator': {
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

export const ExportCSVBTN = () => {
    return (
        <ButtonStyled variant="contained" color="primary">Export <Box style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}><IconFileArrowRight width="20" /></Box></ButtonStyled>
    );
};

const AsinTable = () => {
    const [value, setValue] = useState('1');
    const theme = useTheme();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const winRate = 66;

    const columns = [
        {
            name: 'ASIN',
            selector: row => row.ASIN,
            sortable: true,
            cell: (row) => (
                <Box>
                    <Typography variant='body1' fontWeight='500' fontSize='14px' style={{ color: theme.palette.secondary.main }}>{row.ASIN}</Typography>
                </Box>
            )
        },
        {
            name: 'Issue',
            selector: row => row.Issue,
            sortable: true,
            cell: (row) => (
                <Box>
                    <Typography variant='body1' fontWeight='500' fontSize='14px' style={{ color: theme.palette.accent.main }}>{row.Issue}</Typography>
                </Box>
            )
        },
        {
            name: 'Sub Issue',
            selector: row => row.SubIssue,
            sortable: true,
            cell: (row) => (
                <Box>
                    <Typography variant='body1' fontWeight='500' fontSize='14px' style={{ color: theme.palette.secondary.main }}>
                        {row.SubIssue}
                    </Typography>
                </Box>
            )
        },
        {
            name: 'Infraction',
            selector: row => row.Infraction,
            sortable: true,
            cell: (row) => (
                <Box>
                    <Typography variant='body1' fontWeight='500' fontSize='14px' style={{ color: theme.palette.success.main }}>
                        {row.Infraction}
                    </Typography>
                </Box>
            )
        }
    ];

    const data = [
        { ASIN: "B0787FVC2Q", Issue: "Prep-Bagging", SubIssue: "asn_otnc", Infraction: "$ 625.60" },
        { ASIN: "B0787FVB1Q", Issue: "Prep-Set Creation", SubIssue: "asn_otnc", Infraction: "$ 255.60" },
        { ASIN: "B0787FVB2Z", Issue: "ASN Accuracy", SubIssue: "asn_imia_invalid_or_missing_arn", Infraction: "$ 605.60" },
        { ASIN: "B0754GVC2Q", Issue: "Overage PO Units", SubIssue: "asn_otnc", Infraction: "$ 255.60" },
        { ASIN: "Z9787FVC2Q", Issue: "Prep-Bagging", SubIssue: "asn_imia_invalid_or_missing_arn", Infraction: "$ 705.60" },
        { ASIN: "G0327FVC2Q", Issue: "Overage PO Units", SubIssue: "asn_imia_invalid_or_missing_arn", Infraction: "$ 425.60" },
        { ASIN: "B0787GJH2Q", Issue: "Prep-Set Creation", SubIssue: "asn_otnc", Infraction: "$ 605.60" },
        { ASIN: "B0788LOC2Q", Issue: "Prep-Set Creation", SubIssue: "asn_imia_invalid_or_missing_arn", Infraction: "$ 825.60" },
        { ASIN: "B0787FVC6O", Issue: "ASN Accuracy", SubIssue: "asn_otnc", Infraction: "$ 905.60" },
        { ASIN: "B0787FVT2Q", Issue: "Overage PO Units", SubIssue: "asn_imia_invalid_or_missing_arn", Infraction: "$ 325.14" },
        { ASIN: "J0787GVC2Z", Issue: "Prep-Bagging", SubIssue: "asn_otnc", Infraction: "$ 488.88" },
        { ASIN: "B0787FVC2Q", Issue: "Prep-Bagging", SubIssue: "asn_otnc", Infraction: "$ 625.60" },
        { ASIN: "B0514FVC2Q", Issue: "Prep-Bagging", SubIssue: "asn_otnc", Infraction: "$ 115.60" },
        { ASIN: "B0787FVC2Q", Issue: "Dispute - Needs More Info", SubIssue: "asn_imia_invalid_or_missing_arn", Infraction: "$ 265.60" },
        { ASIN: "B0787FVC9P", Issue: "Prep-Bagging", SubIssue: "asn_otnc", Infraction: "$ 625.60" },
        { ASIN: "B0787FVC2Q", Issue: "Overage PO Units", SubIssue: "asn_otnc", Infraction: "$ 589.90" },
        { ASIN: "A0587FVC2Z", Issue: "ASN Accuracy", SubIssue: "asn_imia_invalid_or_missing_arn", Infraction: "$ 666.60" },
        { ASIN: "B0787FBC2Q", Issue: "ASN Accuracy", SubIssue: "asn_otnc", Infraction: "$ 544.60" },
        { ASIN: "C0787GVC2Q", Issue: "Prep-Set Creation", SubIssue: "asn_imia_invalid_or_missing_arn", Infraction: "$ 105.60" },
        { ASIN: "B0787FVE6P", Issue: "Prep-Set Creation", SubIssue: "asn_otnc", Infraction: "$ 625.60" }
    ];

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value} >
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ display: 'flex', columnGap:'10px', justifyContent: "space-between", marginBottom: '20px', alignItems: 'center', borderBottom: '0' }}>
                                <TabListStyled onChange={handleChange} indicatorColor="secondary" className='finops-tab' sx={{columnGap:'10px', display:'flex', width: '100%'}}>
                                    <TabStyled label="Infraction ($)" value="1" style={{ color: theme.palette.text.dark }} />
                                    <TabStyled label="Infraction (Units)" value="2" />
                                </TabListStyled>
                                <Grid container spacing={1} justifyContent='end' alignItems="end">
                                    <Grid item style={{ paddingTop: '0' }}>
                                        <Stack direction='row' spacing={2} style={{ marginTop: '16px' }}>
                                            <ButtonStyled><BoxStyled>Import</BoxStyled> <span className='btn-indicator'></span> <BoxStyled><IconFileArrowLeft size="18" style={{ margin: 'auto', verticalAlign: 'middle' }} /></BoxStyled></ButtonStyled>
                                            <ButtonStyled><BoxStyled>Export</BoxStyled> <span className='btn-indicator'></span> <BoxStyled><IconFileArrowRight size="18" style={{ margin: 'auto', verticalAlign: 'middle' }} /></BoxStyled></ButtonStyled>
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Box>
                            <TabPanel value="1" style={{ padding: 0 }}>
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination
                                />
                            </TabPanel>
                            <TabPanel value="2" style={{ padding: 0 }}>
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    pagination
                                />
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AsinTable;
