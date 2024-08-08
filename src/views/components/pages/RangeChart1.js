import React from 'react';
import Chart from 'react-apexcharts';

const RangeChart = ({ selectedYear }) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const data2023 = {
    deniedAmount: months.map(month => ({
      x: month,
      y: 0
    })),
    approvedAmount: months.map(month => ({
      x: month,
      y: 0
    })),
    deniedMedian: months.map(month => ({
      x: month,
      y: 0
    })),
    approvedMedian: months.map(month => ({
      x: month,
      y: 0
    }))
  };

  const data2024 = {
    deniedAmount: months.map(month => ({
      x: month,
      y: 0
    })),
    approvedAmount: months.map(month => ({
      x: month,
      y: 0
    })),
    deniedMedian: months.map(month => ({
      x: month,
      y: 0
    })),
    approvedMedian: months.map(month => ({
      x: month,
      y: 0
    }))
  };

  const seriesData = selectedYear === 2024 ? [
    {
      type: 'rangeArea',
      name: 'Denied Amount',
      data: data2024.deniedAmount
    },
    {
      type: 'rangeArea',
      name: 'Approved Amount',
      data: data2024.approvedAmount
    },
    {
      type: 'line',
      name: 'Denied Median',
      data: data2024.deniedMedian
    },
    {
      type: 'line',
      name: 'Approved Median',
      data: data2024.approvedMedian
    }
  ] : [
    {
      type: 'rangeArea',
      name: 'Denied Amount',
      data: data2023.deniedAmount
    },
    {
      type: 'rangeArea',
      name: 'Approved Amount',
      data: data2023.approvedAmount
    },
    {
      type: 'line',
      name: 'Denied Median',
      data: data2023.deniedMedian
    },
    {
      type: 'line',
      name: 'Approved Median',
      data: data2023.approvedMedian
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'rangeArea',
      animations: {
        speed: 500
      },
      toolbar: {
        show: false
      }
    },
    colors: ['#dc3545', '#2edd95', '#7e2e84', '#55a1e8'],
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: [0.24, 1, 1]
    },
    forecastDataPoints: {
      count: 2
    },
    stroke: {
      curve: 'straight',
      width: [0, 2, 2]
    },
    legend: {
      show: true,
      customLegendItems: ['Denied Amount', 'Approved Amount'],
      inverseOrder: true
    },
    title: {
      text: ''
    },
    markers: {
      hover: {
        sizeOffset: 5
      }
    },
    yaxis: {
      min: 0,
      max: 800,
      tickAmount: 9,
      labels: {
        formatter: function (value) {
          return '$' + value.toFixed(2);
        }
      }
    }
  };

  return (
    <div>
      <Chart options={options} series={seriesData} type="rangeArea" height={350} />
    </div>
  );
};

export default RangeChart;