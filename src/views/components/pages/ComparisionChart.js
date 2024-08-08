import React from 'react'
import Chart from 'react-apexcharts';
import { useTheme, Box } from '@mui/material';

const ComparisionChart = () => {
  const theme = useTheme();
  const secondary = theme.palette.primary.extraLight;
  const secondarylight = '#f5fcff';
  const errorlight = '#fdede8';

  // chart
  const optionscolumnchart = {
    chart: {
      type: 'area',
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: '#adb0bb',
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: 'sparklines',
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    fill: {
		type: "gradient",
		gradient: {
		  shadeIntensity: 1,
		  opacityTo: 0.1,
		  stops: [10, 80, 100]
		}
	},
    markers: {
      size: 0,
    },
    tooltip: {
      theme: theme.palette.mode === 'dark' ? 'dark' : 'light',
    },
  };
  const seriescolumnchart = [
    {
      name: '',
      color: secondary,
      data: [5, 15, 5, 10, 5],
    },
  ];
  return (
	<Box>
		<Chart options={optionscolumnchart} series={seriescolumnchart} type="area" height="200px" />
	</Box>
  )
}

export default ComparisionChart;
