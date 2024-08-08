
import React ,{useState , useEffect} from 'react';
import DashboardCard from '../../../components/shared/DashboardCard';
import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  timelineOppositeContentClasses
} from '@mui/lab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Link, Typography ,styled ,Grid,Tabs,Tab} from '@mui/material';
import { useTheme } from '@emotion/react';
import { Box } from '@mui/system';
import eventEmitter from '../../../eventEmitter';


const RecentTransactions = () => {
  const [value, setValue] = useState('1');
	const handleChange = (event, newValue) => {
        setValue(newValue);
    };

  
  const theme = useTheme();

  const TypographyParaStyled = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    position: 'relative',
    marginBottom: '5px',
    '&::before': {
      content: '""',
      position: 'absolute',
      display: 'inline-block',
      width: '12px',
      height: '12px',
      borderRadius: '50%',
      backgroundColor: theme.palette.accent.main,
      marginRight: '8px',
      bottom: '7px',
      left: '-25px', 
    },
    }));
    const GridStyled = styled(Grid)(({ theme }) => ({
    marginLeft:'26px',
      marginTop: '10px'
  
  }));
  const TypographyStyled = styled(Typography)(({ theme }) => ({
		color: theme.palette.text.dark,
	}));
  const TimelineStyled = styled(Box)(({ theme }) => ({
		minHeight: '300px',
    overflowY: 'auto',
    marginTop: '15px', 
	}));
  const GridTopStyled = styled(Grid)(({ theme }) => ({
		minHeight: '300px',
    height: '300px',
    overflow:'hidden'
	}));

  const [vendorId, setVendorId] = useState(null);

  const updateVendorId = () => {
    const id = sessionStorage.getItem("selectedVendorId");
    setVendorId(id);
  };

  useEffect(() => {
    // Initial fetch
    updateVendorId();

    // Listen to the 'vendorSelected' event
    eventEmitter.on("vendorSelected", updateVendorId);

    // Cleanup function to remove event listener
    return () => {
      eventEmitter.off("vendorSelected", updateVendorId);
    };
  }, []);

  if (vendorId !== '5') {
    return (
      
        <Typography variant="h4" marginLeft={55} marginTop={30}></Typography>
    );
  }
  

  return (
    <Box className='transcaction' width={600}>
        <Typography variant='h5' sx={{color: theme.palette.primary.main }}>Hits & Misses</Typography>
          <TimelineStyled style={{overflow:'auto', height:'270px'}}>
          <Timeline
            className="theme-timeline"
            nonce={undefined}
            onResize={undefined}
            onResizeCapture={undefined}
            sx={{
              p: 0,
              mb: '-40px',
              '& .MuiTimelineConnector-root': {
                width: '1px',
                backgroundColor: '#efefef',
              },
              [`& .${timelineOppositeContentClasses.root}`]: {
                flex: 0.4,
                paddingLeft: 0,
                fontSize: '12px',
                fontWeight: '600',
                color: theme.palette.primary.main
              },
            }}
          >
            <TimelineItem>
              
              <TimelineSeparator>
                <TimelineDot color="success" variant="outlined" style={{ marginLeft: "-240px"}} />
                {/* <TimelineDot color="success" variant="outlined" style={{ marginLeft: "-250px"}} /> */}
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent style={{padding: '6px' , marginLeft: "-220px"}}>
                <Typography fontWeight="400" fontSize='12px'>OC - ASN accuracy Chargeback rate has dropped by 33.33% in Feb’24 in comparison to Jan’24</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              
              <TimelineSeparator>
                <TimelineDot color="accent" variant="outlined" style={{ marginLeft: "-240px"}} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent style={{padding: '6px' , marginLeft: "-220px"}}>
                <Typography  fontWeight="400" fontSize='12px'>PO acceptance rate in Week 25 is tending at 62%, -12% lower than week 24</Typography>{' '}
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
              
              <TimelineSeparator>
                <TimelineDot color="success" variant="outlined" style={{ marginLeft: "-240px"}} />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent style={{padding: '6px' , marginLeft: "-220px"}}>
                <Typography fontWeight="400" fontSize='12px'>Net shortage rate in Week 25 is tending at $1,225.00 -12.25% lower than week 24</Typography>
              </TimelineContent>
            </TimelineItem>
            <TimelineItem>
            
              <TimelineSeparator>
                <TimelineDot color="accent" variant="outlined" style={{ marginLeft: "-240px"}} />
              </TimelineSeparator>
              <TimelineContent style={{padding: '6px' , marginLeft: "-220px" }}>
                 <Typography fontWeight="400" fontSize='12px'>PO On-Time Accuracy Rate in OC has increased by 25.96% in Feb’24 compared to Jan’24</Typography>
              </TimelineContent>
            </TimelineItem>
          </Timeline>
        </TimelineStyled>
    </Box> 
  );
};

export default RecentTransactions;