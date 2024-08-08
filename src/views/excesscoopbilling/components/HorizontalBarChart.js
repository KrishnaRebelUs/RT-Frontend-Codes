import React from 'react';
import { useTheme } from '@mui/material/styles';
import Chart from 'react-apexcharts';

const HorizontalBarChart = () => {
	const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
  const options = {
    chart: {
      type: 'bar',
      height: 350,
      horizontalAlign: 'left',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: ['Incorrect Freight', 'Incorrect Code', 'Incorrect Agreement', 'Duplicate Agreement'],
    },
  };

  const series = [
    {
      name: 'Win Rate (%)',
      data: [0, 20, 40, 60],
    },
  ];

  return (
    <div>
      <Chart options={options} series={series} type="bar" height={250} />
    </div>
  );
};

export default HorizontalBarChart;
