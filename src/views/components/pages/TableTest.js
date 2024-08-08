import React from 'react';
import { Typography, Box,useTheme,IconButton} from '@mui/material';
import DashboardCard from '../../../components/shared/DashboardCard';
import { DataGrid } from '@mui/x-data-grid';
import { IconPencil} from '@tabler/icons-react';
import { Stack } from '@mui/system';


const ShortageTable = () => {
    const theme = useTheme();
    const formatNumber = (number) => new Intl.NumberFormat().format(number);
    const shortagetble = [
        {
            id:1,
           Settlement: "Shortage Claim Finding",
           Active: ["$ 36,230.20"],
           Archieved: ["$ 36,230.20"],
           color: theme.palette.accent.main
        
        },
        {
            id:2,
            Settlement: " Start Audit Period",
            Active: ["11/24/23"],
            Archieved: ["9/04/22"],
            
         
         },
         {
            id:3,
            Settlement: "End Audit Period",
            Active:["11/24/23"],
            Archieved: ["11/24/23"],
            color: theme.palette.error.main
            
         
         },
         {
            id:4,
            Settlement: "Case ID and Creation Date",
            Active: ['1423658', '11/24/23'],
            Archieved: ['1423658', '11/24/23'],
         
         },
         {
            id:5,
            Settlement: "Open Balance",
            Active:["$ 36,230.20"],
            Archieved: ["$ 36,230.20"],
            color: theme.palette.accent.main
         },
        
          {
            id:6,
            Settlement: "Confirmation Date",
            Active:["06/16/23"],
            Archieved: ["09/09/23"],
         
         },
         {
            id:7,
             Settlement: "Settlement Offer",
             Active: ['$ 36,230.20', '08/04/23'],
             Archieved: ['$ 36,230.20', '08/04/23'],
          
          },
          {
            id:8,
            Settlement: "Counter Offer",
            Active: ['$ 36,230.20', '08/04/23'],
            Archieved: ['$ 36,230.20', '08/04/23'],
         
         },
         {
            id:9,
            Settlement: "Accepted Offer",
            Active: ['$ 36,230.20', '08/04/23'],
            Archieved: ['$ 36,230.20', '08/04/23'],
         
         },
          {
            id:10,
            Settlement: "Settlement Amount",
            Active:["$ 36,230.20"],
            Archieved: ["$ 36,230.20"],
            color:theme.palette.success.main
         
         },
     
    ];


    const columns = [
        {
            field: 'Settlement',
            headerName: 'Settlement',
            width: 220,
            renderCell: (params) => {
                return (
                    <Typography variant="subtitle2" fontWeight={600}  sx={{display:'flex', alignItems:'cem'}}>
                        {params.value}
                    </Typography>
                );
            }
        },
        {
            field: 'Active',
            editable: true,
            headerName: 'Activity Cases($)',
            width: 220,
            renderCell: (params) => {
                return (
                    <Stack direction='row' spacing={3}  alignItems='center'>
                        <Typography variant="subtitle2" fontWeight={600} style={{ color: params.row.color }}>
                            {params.value[0]}
                            {params.value[1] ? <Box>{params.value[1]}</Box> : null}
                        </Typography>
                        <IconButton aria-label="edit" size="small" style={{ marginLeft: 'auto' }}>
                            <IconPencil size='16' />
                        </IconButton>
                    </Stack>

                );
            }
        },
        {
            field: 'Archieved',
            editable:true,
            headerName: 'Archived',
            width: 220,
            renderCell: (params) => {
                return (
                   <Stack direction='row' spacing={3}  alignItems='center'>
                        <Typography variant="subtitle2" fontWeight={600} style={{ color: params.row.color }}>
                            { params.value[0] }
                            { params.value[1] ? <Box>{params.value[1]}</Box> : null}
                        </Typography>
                        <IconButton aria-label="edit" size="small" style={{ marginLeft: 'auto' }}>
                            <IconPencil size='16' />
                        </IconButton>
                   </Stack>
                );
            }
        }
    ];

    return (
        <DashboardCard title={<Typography variant='h4'> Shortage Claim Finding </Typography>}>
            <DataGrid
                    rows={shortagetble}
                    columns={columns}
                />
        </DashboardCard>
    );
};

export default ShortageTable;
