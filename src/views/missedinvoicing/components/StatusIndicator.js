import React from 'react';
import { Box, Typography } from '@mui/material';

const StatusIndicator = ({ status }) => {
  // Define colors based on status
  const statusStyles = {
    Completed: { containerColor: '#e0f5e0', dotColor: '#4caf50' },
    Pending: { containerColor: '#fff3e0', dotColor: '#ff9800' },
    'In Progress': { containerColor: '#e0f0ff', dotColor: '#2196f3' },
    Error: { containerColor: '#fbe0e0', dotColor: '#f44336' },
    Default: { containerColor: '#f0f0f0', dotColor: '#9e9e9e' }
  };

  const { containerColor, dotColor } = statusStyles[status] || statusStyles.Default;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: containerColor, borderRadius: '4px', padding: '4px 8px' }}>
      <Box
        sx={{
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: dotColor,
          marginRight: '8px',
          display: 'inline-block',
        }}
      />
      <Typography variant="body2">{status}</Typography>
    </Box>
  );
};

export default StatusIndicator;
