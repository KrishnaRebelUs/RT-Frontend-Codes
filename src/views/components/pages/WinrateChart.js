// import React, { useEffect, useRef } from 'react';
// import ApexCharts from 'apexcharts';
// import { useTheme } from "@emotion/react";

// const WinrateChart = ({ color, percentage, chartWidth, chartHeight, chartLableFonrSize }) => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);
//   const theme = useTheme();
  
//   useEffect(() => {
//     const options = {
//       chart: {
//         width: [chartWidth],
//         height: [chartHeight],
//         type: "radialBar"
//       },
      
//       series: [percentage],
      
//       plotOptions: {
//         radialBar: {
//           hollow: {
//             margin: 0,
//             size: "60%"
//           },
         
//           dataLabels: {
//             showOn: "always",
//             name: {
//               show: false
//             },
//             value: {
//               color: theme.palette.primary.main,
//               fontSize: [chartLableFonrSize],
//               fontFamily: "'Plus Jakarta Sans', sans-serif;",
//               show: true,
//               offsetY: 5, 
//               textAlign: 'center',
//               textAnchor: 'middle',
//               fontWeight: 600
//             },
//           },
//           strokeWidth: 1
//         }
//       },
    
//       stroke: {
//         lineCap: "round",
//       },
//       labels: ["Progress"]
//     };

//     const chart = new ApexCharts(chartRef.current, options);
//     chart.render();
//     chartInstance.current = chart;

//     return () => {
//       if (chartInstance.current) {
//         chartInstance.current.destroy();
//       }
//     };
//   }, [percentage]); 

//   useEffect(() => {
//     console.log('Color changed:', color);
//     if (chartInstance.current) {
//       chartInstance.current.updateOptions({
//         colors: [color]
//       });
//     }
//   }, [color]);

//   return <div ref={chartRef} />;
// };

// export default WinrateChart;






/*-------------------------------------------------------------- New One --------------------------------------------------------------------*/


import React, { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useTheme } from "@emotion/react";

const WinrateChart = ({ color, percentage, chartWidth, chartHeight, chartLabelFontSize, transitionDuration = '1s' }) => {
  const theme = useTheme();
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    setAnimatedPercentage(percentage);
  }, [percentage]);

  return (
    <div style={{ width: chartWidth, height: chartHeight }}>
      <CircularProgressbar
        value={animatedPercentage}
        text={`${animatedPercentage}%`}
        styles={buildStyles({
          pathColor: color,
          textColor: "#000000",
          textSize: chartLabelFontSize,
          trailColor: '#d6d6d6',
          backgroundColor: '#f88',
          // backgroundColor: '#f88',
          pathTransition: `stroke-dashoffset ${transitionDuration} ease 0s`,
        })}
      />
    </div>
  );
};

export default WinrateChart;














