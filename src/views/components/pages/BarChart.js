import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { useTheme } from "@emotion/react";

const BarChart = ({ color, percentage, chartWidth, chartHeight, chartLableFonrSize }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const theme = useTheme();
  
  useEffect(() => {
    const options = {
      chart: {
        width: [chartWidth],
        height: [chartHeight],
        type: "radialBar"
      },
      
      series: [percentage],
      
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "60%"
          },
         
          dataLabels: {
            showOn: "always",
            name: {
              show: false
            },
            value: {
              color: theme.palette.accent.main,
              fontSize: [chartLableFonrSize],
              fontFamily: "'Plus Jakarta Sans', sans-serif;",
              show: true,
              offsetY: 5, 
              textAlign: 'center',
              textAnchor: 'middle',
              fontWeight: 600
            },
          },
          strokeWidth: 1
        }
      },
    
      stroke: {
        lineCap: "round",
      },
      labels: ["Progress"]
    };

    const chart = new ApexCharts(chartRef.current, options);
    chart.render();
    chartInstance.current = chart;

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [percentage]); 

  useEffect(() => {
    // console.log('Color changed:', color);
    if (chartInstance.current) {
      chartInstance.current.updateOptions({
        colors: [color]
      });
    }
  }, [color]);

  return <div ref={chartRef} />;
};

export default BarChart;
