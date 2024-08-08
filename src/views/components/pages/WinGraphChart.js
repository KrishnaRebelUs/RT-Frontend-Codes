import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';

const WinGraphChart = () => {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const secondary = theme.palette.secondary.main;

  const optionscolumnchart = {
    chart: {
      type: 'bar',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
      height: 70,
    },
    colors: [primary],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: [6],
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'all',
      },
      dataLabels:{
        show: false,
      },
      toolbar: {
        show: false,
      },
  
    },
    stroke: {
      show: true,
      width: 5,
      lineCap: 'butt',
      colors: ['transparent'],
    },
    dataLabels: {
      enabled: false,
	    show: false,
    },
    legend: {
      show: false,
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
    },
    yaxis: {
      show: false,
    },
    xaxis: {
     
      axisBorder: {
        show: false,
      },
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
      fillSeriesColor: false,
    },
  };

  const seriescolumnchart = [
    {
      name: 'Earnings this month',
      data: [10, 15, 10],
    },
    
  ];

  return (
    <div>
      <Chart
        options={optionscolumnchart}
        series={seriescolumnchart}
        type="bar"
        height={70}
      
      />
    </div>
  );
};

export default WinGraphChart;
