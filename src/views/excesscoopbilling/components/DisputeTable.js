// import React, { useState , useEffect } from 'react';
// import {
//     Typography, Box,
//     Table,
//     TableBody,
//     TableCell,
//     TableHead,
//     TableRow, styled, useTheme, Button, Stack, TableContainer, Dialog, DialogTitle, DialogContent, Grid,
// } from '@mui/material';
// import DashboardCard from '../../../components/shared/DashboardCard';
// import { IconPencil, IconTrash, IconX } from '@tabler/icons-react';
// import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
// import SelectCurrency from '../../../layouts/full/header/SelectCurrency';
// import DataTable from 'react-data-table-component';
// import eventEmitter from '../../../eventEmitter';
// import config from '../../../../config';
// import axios from "axios"; 
// import moment from 'moment';



// const TypographyStyled = styled(Typography)(({ theme }) => ({
//     color: theme.palette.primary.main,
//     marginBottom: '10px',

// }));


// const ButtonClose = styled(Button)(({ theme }) => ({
//     minWidth: '30px',
//     height: '30px',
//     backgroundColor: 'red',
//     color: 'white',
//     right: '15px',
//     top: '15px',
//     '&:hover': {
//         backgroundColor: theme.palette.secondary.main,
//         color: 'white'
//     }
// }));

// const DisputeTable = () => {
//     const theme = useTheme();
//     const [open, setOpen] = useState(false);
//     const [disputeTable, setDisputeTable] = useState([]);
//     const BASE_URL = config.UniUrl;



//     const columns = [
//         {
//             name: 'Dispute ID',
//             selector: row => row.Id,
//             sortable: true,
//             cell: (row, index, column, id) => {
//                 return (
//                     <Box style={{ width: '850px' }}>
//                         <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.primary.main }}>{row.Id}</Typography>
//                     </Box>
//                 );
//             }
//         },
//         {
//             name: 'Amount ($)',
//             selector: row => row.Amount,
//             sortable: true,
//             cell: (row, index, column, id) => {
//                 return (
//                     <Box>
//                         <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.Amount}</Typography>
//                     </Box>
//                 );
//             }
//         },
//         {
//             name: 'Refund ($)',
//             selector: row => row.Refund,
//             sortable: true,
//             cell: (row, index, column, id) => {
//                 return (
//                     <Box>
//                         <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.Refund}</Typography>
//                     </Box>
//                 );
//             }
//         },
//         {
//             name: 'Created By',
//             selector: row => row.Created,
//             sortable: true,
//             cell: (row, index, column, id) => {
//                 return (
//                     <Box>
//                         <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.Created}</Typography>
//                     </Box>
//                 );
//             }
//         },
//         {
//             name: 'Create Date',
//             selector: row => row.Date,
//             sortable: true,
//             formatter: row => moment(row.Date).format('MM/DD/YY'),
//             cell: (row, index, column, id) => {
//                 return (
//                     <Box>
//                         <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{moment(row.Date).format('MM/DD/YY')}</Typography>
//                     </Box>
//                 );
//             }

//         },
//         {
//             name: 'Payment Date',
//             selector: row => row.Payment,
//             sortable: true,
//             formatter: row => moment(row.Payment).format('MM/DD/YY'),
//             cell: (row, index, column, id) => {
//                 return (
//                     <Box>
//                         <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>
//                             {moment(row.Payment).format('MM/DD/YY')}
//                             </Typography>
//                     </Box>
//                 );
//             }
//         },

//         {
//             name: 'Payment ID',
//             selector: row => row.PaymentId,
//             sortable: true,
//             cell: (row, index, column, id) => {
//                 return (
//                     <Box>
//                         <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.PaymentId}</Typography>
//                     </Box>
//                 );
//             }
//         },
//         {
//             name: 'Resolve Date',
//             selector: row => row.ResolveDate,
//             sortable: true,
//             formatter: row => moment(row.ResolveDate).format('MM/DD/YY'),
//             cell: (row, index, column, id) => {
//                 return (
//                     <Box>
//                         <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{moment(row.ResolveDate).format('MM/DD/YY')}</Typography>
//                     </Box>
//                 );
//             }
//         },
//         {
//             name: 'Reason',
//             selector: row => row.Reason,
//             sortable: true,
//             cell: (row, index, column, id) => {
//                 return (
//                     <Box style={{ width: '400px' }}>
//                         <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.Reason}</Typography>
//                     </Box>
//                 );
//             }
//         },
//         {
//             name: 'TAT',
//             selector: row => row.Tat,
//             sortable: true,
//             cell: (row, index, column, id) => {
//                 return (
//                     <Box>
//                         <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.Tat}</Typography>
//                     </Box>
//                 );
//             }
//         },
//         {
//             name: 'Status',
//             selector: row => row.Status,
//             sortable: true,
//             cell: (row, index, column, id) => {
//                 return (
//                     <Box>
//                         <Typography variant='body2' style={{ textAlign: 'center', color: 'green' }}>{row.Status}</Typography>
//                     </Box>
//                 );
//             }
//         },
//         {
//             name: 'Action',
//             selector: row => row.Action,
//             sortable: true,
//             cell: (row, index, column, id) => {
//                 return (
//                     <Stack direction='row' alignItems='center'>
//                         <Button size="small" startIcon={<IconPencil size='16' />} onClick={handleEditClick} style={{ minWidth: '0' }} ></Button>
//                         <Button size="small" startIcon={<IconTrash size='16' />} style={{ minWidth: '0' }} ></Button>
//                     </Stack>
//                 );
//             }
//         },
//     ];


// const fetchDisputeData = async () => {
//   const selectedVendorId = sessionStorage.getItem('selectedVendorId');
//   try {
//       const token = sessionStorage.getItem('token');
//       const apiUrl = `${BASE_URL}/shortage/getManageDisputedData?vendorId=${selectedVendorId}&disputeType=Coop`;

//       if (!selectedVendorId) {
//           console.warn('No selectedVendorId found, cannot fetch data.');
//           return;
//       }

//       const response = await axios.get(apiUrl, {
//           headers: {
//               'Authorization': `Bearer ${token}`
//           }
//       });

//       const transformedData = response.data.data.map(item => ({
//           Id: item.disputeId,
//           Amount: parseFloat(item.totalDisputedAmount).toFixed(2).toLocaleString('en-US', { maximumFractionDigits: 2 }),
//           Refund: parseFloat(item.approvedAmount).toFixed(2).toLocaleString('en-US', { maximumFractionDigits: 2 }),
//           Created: "DJ",
//           Date: moment(item.disputeDate).format('MM/DD/YY'),
//           Payment: moment(item.paymentDate).format('MM/DD/YY'),
        
//           PaymentId: item.paymentId,
//           ResolveDate: moment(item.resolvedDate).format('MM/DD/YY'),
//           Reason: item.disputeReason,
//           Tat: moment(item.resolvedDate).diff(moment(item.disputeDate), 'days'),
//           Status: item.disputeStatus.charAt(0).toUpperCase() + item.disputeStatus.slice(1).toLowerCase(),
//           Action: ""
//       }));

//       setDisputeTable(transformedData);
//   } catch (error) {
//       console.error('Error fetching data:', error);
//   }
// };


// useEffect(() => {
//   fetchDisputeData();

//   eventEmitter.on('vendorSelected', () => {
//       fetchDisputeData();
//   });

//   return () => {
//       eventEmitter.events = {};
//   };
// }, []);

    

//     const handleEditClick = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//     };

    

//     return (
//         <DashboardCard className="dispute-table" title={<Typography variant="h4" mb={2}>Dispute Table</Typography>}>

//             <Box>
//                 <DataTable
//                     columns={columns}
//                     data={disputeTable}
//                     pagination
//                 />
//             </Box>
//             <Dialog open={open} onClose={handleClose} maxWidth='xs' style={{ padding: '30px' }}>
//                 <Stack direction='row' justifyContent="space-between" borderBottom={1} borderColor="#eee">
//                     <DialogTitle variant='h3'>Manage Client Dispute</DialogTitle>
//                     <ButtonClose><IconX onClick={handleClose} size='16' /></ButtonClose>
//                 </Stack>
//                 <DialogContent>
//                     <Grid container spacing={2} className="dispute-form">
//                         <Grid item xs={12} marginBottom={1}>
//                             <TypographyStyled variant="subtitle1" fontWeight={600} component="label" htmlFor='name'>
//                                 Dispute Id
//                             </TypographyStyled>
//                             <CustomTextField id="name" variant="outlined" fullWidth />
//                         </Grid>
//                         <Grid item xs={12} marginBottom={1}>
//                             <TypographyStyled variant="subtitle1" fontWeight={600} component="label" htmlFor='name'>
//                                 Dispute Amount
//                             </TypographyStyled>
//                             <CustomTextField id="name" variant="outlined" fullWidth />
//                         </Grid>
//                         <Grid item xs={12} marginBottom={1}>
//                             <TypographyStyled variant="subtitle1" fontWeight={600} component="label" htmlFor='name'>
//                                 Refund Amount
//                             </TypographyStyled>
//                             <Stack direction='row' spacing={2}>
//                                 <SelectCurrency fullWidth />
//                                 <CustomTextField id="name" variant="outlined" fullWidth />

//                             </Stack>
//                         </Grid>

//                         <Grid item xs={12} marginBottom={1}>
//                             <TypographyStyled variant="subtitle1" fontWeight={600} component="label" htmlFor='name'>
//                                 Payment Unique Id
//                             </TypographyStyled>
//                             <CustomTextField id="name" variant="outlined" fullWidth />
//                         </Grid>
//                         <Grid item xs={12} marginBottom={1}>
//                             <TypographyStyled variant="subtitle1" fontWeight={600} component="label" htmlFor='name'>
//                                 Payment Receive Date
//                             </TypographyStyled>
//                             <CustomTextField id="name" variant="outlined" type="date" fullWidth />
//                         </Grid>
//                         <Grid item container justifyContent="center" gap={1}>
//                             <Button variant="contained" color="secondary">
//                                 Update
//                             </Button>
//                             <Button variant="contained" style={{ backgroundColor: theme.palette.primary.light }}>
//                                 Cancel
//                             </Button>

//                         </Grid>
//                     </Grid>
//                 </DialogContent>

//             </Dialog>
//         </DashboardCard>
//     );
// };

// export default DisputeTable;










import React, { useState, useEffect } from 'react';
import {
    Typography, Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, styled, useTheme, Button, Stack, TableContainer, Dialog, DialogTitle, DialogContent, Grid,
} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import SelectCurrency from '../../../layouts/full/header/SelectCurrency';
import DataTable from 'react-data-table-component';
import eventEmitter from '../../../eventEmitter';
import config from '../../../../config';
import axios from "axios";
import moment from 'moment';
import { Padding } from '@mui/icons-material';

const TypographyStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    marginBottom: '10px',
}));

const ButtonClose = styled(Button)(({ theme }) => ({
    minWidth: '30px',
    height: '30px',
    backgroundColor: 'red',
    color: 'white',
    right: '15px',
    top: '15px',
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: 'white'
    }
}));


const customStyles = {
    headRow: {
        style: {
            backgroundColor: '#285a9e', 
        },
    },
    headCells: {
        style: {
            padding: '10px 15px', 
            backgroundColor: '#285a9e', 
            color: 'white',
            fontWeight: 'bold', 
        },
    },
    cells: {
        style: {
            padding: '10px 15px', 
        },
    },
};


const DisputeTable = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [disputeTable, setDisputeTable] = useState([]);
    const BASE_URL = config.UniUrl;

    const columns = [
        {
            name: 'Dispute ID',
            selector: row => row.Id,
            sortable: true,
            cell: (row, index, column, id) => {
                return (
                    <Box style={{ width: '850px' }}>
                        <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.primary.main }}>{row.Id}</Typography>
                    </Box>
                );
            }
        },
        {
            name: 'Amount ($)',
            selector: row => row.Amount,
            sortable: true,
            cell: (row, index, column, id) => {
                return (
                    <Box>
                        <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.Amount}</Typography>
                    </Box>
                );
            }
        },
        {
            name: 'Refund ($)',
            selector: row => row.Refund,
            sortable: true,
            cell: (row, index, column, id) => {
                return (
                    <Box>
                        <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.Refund}</Typography>
                    </Box>
                );
            }
        },
        {
            name: 'Created By',
            selector: row => row.Created,
            sortable: true,
            cell: (row, index, column, id) => {
                return (
                    <Box>
                        <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.Created}</Typography>
                    </Box>
                );
            }
        },
        {
            name: 'Create Date',
            selector: row => row.Date,
            sortable: true,
            formatter: row => moment(row.Date).format('MM/DD/YY'),
            cell: (row, index, column, id) => {
                return (
                    <Box>
                        <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{moment(row.Date).format('MM/DD/YY')}</Typography>
                    </Box>
                );
            }
        },
        {
            name: 'Payment Date',
            selector: row => row.Payment,
            sortable: true,
            formatter: row => moment(row.Payment).format('MM/DD/YY'),
            cell: (row, index, column, id) => {
                return (
                    <Box>
                        <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>
                            {moment(row.Payment).format('MM/DD/YY')}
                        </Typography>
                    </Box>
                );
            }
        },
        {
            name: 'Payment ID',
            selector: row => row.PaymentId,
            sortable: true,
            cell: (row, index, column, id) => {
                return (
                    <Box>
                        <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.PaymentId}</Typography>
                    </Box>
                );
            }
        },
        {
            name: 'Resolve Date',
            selector: row => row.ResolveDate,
            sortable: true,
            formatter: row => moment(row.ResolveDate).format('MM/DD/YY'),
            cell: (row, index, column, id) => {
                return (
                    <Box>
                        <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{moment(row.ResolveDate).format('MM/DD/YY')}</Typography>
                    </Box>
                );
            }
        },
        {
            name: 'Reason',
            selector: row => row.Reason,
            sortable: true,
            cell: (row, index, column, id) => {
                return (
                    <Box style={{ width: '400px' }}>
                        <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.Reason}</Typography>
                    </Box>
                );
            }
        },
        {
            name: 'TAT',
            selector: row => row.Tat,
            sortable: true,
            cell: (row, index, column, id) => {
                return (
                    <Box>
                        <Typography variant='body1' fontWeight='500' style={{ color: theme.palette.text.dark }}>{row.Tat}</Typography>
                    </Box>
                );
            }
        },
        {
            name: 'Status',
            selector: row => row.Status,
            sortable: true,
            cell: (row, index, column, id) => {
                return (
                    <Box>
                        <Typography variant='body2' style={{ textAlign: 'center', color: '#2edd95' }}>{row.Status}</Typography>
                    </Box>
                );
            }
        },
        {
            name: 'Action',
            selector: row => row.Action,
            sortable: true,
            cell: (row, index, column, id) => {
                return (
                    <Stack direction='row' alignItems='center'>
                        <Button size="small" startIcon={<IconPencil size='16' />} onClick={handleEditClick} style={{ minWidth: '0' }} ></Button>
                        <Button size="small" startIcon={<IconTrash size='16' />} style={{ minWidth: '0' }} ></Button>
                    </Stack>
                );
            }
        },
    ];

    const fetchDisputeData = async () => {
        const selectedVendorId = sessionStorage.getItem('selectedVendorId');
        try {
            const token = sessionStorage.getItem('token');
            const apiUrl = `${BASE_URL}/shortage/getManageDisputedData?vendorId=${selectedVendorId}&disputeType=Coop`;

            if (!selectedVendorId) {
                console.warn('No selectedVendorId found, cannot fetch data.');
                return;
            }

            const response = await axios.get(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const transformedData = response.data.data.map(item => ({
                Id: item.disputeId,
                Amount: parseFloat(item.totalDisputedAmount).toFixed(2).toLocaleString('en-US', { maximumFractionDigits: 2 }),
                Refund: parseFloat(item.approvedAmount).toFixed(2).toLocaleString('en-US', { maximumFractionDigits: 2 }),
                Created: "DJ",
                Date: moment(item.disputeDate).format('MM/DD/YY'),
                Payment: moment(item.paymentDate).format('MM/DD/YY'),
                PaymentId: item.paymentId,
                ResolveDate: moment(item.resolvedDate).format('MM/DD/YY'),
                Reason: item.disputeReason,
                Tat: moment(item.resolvedDate).diff(moment(item.disputeDate), 'days'),
                Status: item.disputeStatus.charAt(0).toUpperCase() + item.disputeStatus.slice(1).toLowerCase(),
                Action: ""
            }));

            setDisputeTable(transformedData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchDisputeData();

        eventEmitter.on('vendorSelected', () => {
            fetchDisputeData();
        });

        return () => {
            eventEmitter.off('vendorSelected', fetchDisputeData);
        };
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleEditClick = () => {
        setOpen(true);
    };

    return (
        <DashboardCard className="dispute-table" title={<Typography variant="h4" mb={2}>Dispute Table</Typography>}>
            <Box>
                <DataTable
                    columns={columns}
                    data={disputeTable}
                    customStyles={customStyles}
                    pagination
                    />
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            <Box display="flex" alignItems="center" justifyContent="space-between">
                                <Typography variant="h6">Edit Dispute</Typography>
                                <ButtonClose onClick={handleClose}>
                                    <IconX />
                                </ButtonClose>
                            </Box>
                        </DialogTitle>
                        <DialogContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="dispute-id"
                                        label="Dispute ID"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="amount"
                                        label="Amount"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="refund"
                                        label="Refund"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="created-by"
                                        label="Created By"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="create-date"
                                        label="Create Date"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="payment-date"
                                        label="Payment Date"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="payment-id"
                                        label="Payment ID"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="resolve-date"
                                        label="Resolve Date"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="reason"
                                        label="Reason"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="tat"
                                        label="TAT"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <CustomTextField
                                        id="status"
                                        label="Status"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                </Box>
            </DashboardCard>
        );
    };
    
    export default DisputeTable;
    
