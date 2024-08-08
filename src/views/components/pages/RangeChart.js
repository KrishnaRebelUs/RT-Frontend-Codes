// // import React from 'react';
// // import Chart from 'react-apexcharts'

// // const RangeChart= () => {
// //   function getRandomInRange(min, max) {
// //     return Math.floor(Math.random() * (max - min + 1)) + min;
// //   }
// //   const seriesData = [
// //     {
// //       type: 'rangeArea',
// //       name: 'Dispute Amount',
// //       data: Array.from({ length: 12 }, (_, i) => ({
// //         x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
// //         y: [getRandomInRange(500, 3000), getRandomInRange(2000, 6000)]
// //       }))
// //     },
// //     {
// //       type: 'rangeArea',
// //       name: 'Denied Amount',
// //       data: Array.from({ length: 12 }, (_, i) => ({
// //         x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
// //         y: [getRandomInRange(3000, 5000), getRandomInRange(4000, 7000)]
// //       }))
// //     },
// //     {
// //       type: 'rangeArea',
// //       name: 'Approved Amount',
// //       data: Array.from({ length: 12 }, (_, i) => ({
// //         x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
// //         y: [getRandomInRange(2000, 4000), getRandomInRange(3000, 6000)]
// //       }))
// //     },
// //     {
// //       type: 'line',
// //       name: 'Dispute Median',
// //       data: Array.from({ length: 12 }, (_, i) => ({
// //         x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
// //         y: getRandomInRange(1000, 3000)
// //       }))
// //     },
// //     {
// //       type: 'line',
// //       name: 'Denied Median',
// //       data: Array.from({ length: 12 }, (_, i) => ({
// //         x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
// //         y: getRandomInRange(3000, 6000)
// //       }))
// //     },
// //     {
// //       type: 'line',
// //       name: 'Approved Median',
// //       data: Array.from({ length: 12 }, (_, i) => ({
// //         x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
// //         y: getRandomInRange(2000, 5000)
// //       }))
// //     }
// //   ];
// //   const options = {
// //     chart: {
// //       height: 350,
// //       type: 'rangeArea',
// //       animations: {
// //         speed: 500
// //       },
// // 	  toolbar:{
// // 		show: false,
// // 	  }
// //     },
// //     colors: ['#d4526e', '#33b2df', '#d4526e', '#33b2df'],
// //     dataLabels: {
// //       enabled: false
// //     },
// //     fill: {
// //       opacity: [0.24, 0.24, 1, 1]
// //     },
// //     forecastDataPoints: {
// //       count: 2
// //     },
// //     stroke: {
// //       curve: 'straight',
// //       width: [0, 0, 2, 2]
// //     },
// //     legend: {
// //       show: true,
// //       customLegendItems: ['Dispute Amount', 'Denied Amount', 'Approved Amount'],
// //       inverseOrder: true
// //     },
// //     title: {
// //       text: ''
// //     },
// //     markers: {
// //       hover: {
// //         sizeOffset: 5
// //       }
// //     }
// //   };

// //   return (
// //     <div>
// //        <Chart options={options} series={seriesData} type="rangeArea" height={350} />
// //     </div>
// //   );
// // };

// // export default RangeChart;












// import React from 'react';
// import Chart from 'react-apexcharts';

// const RangeChart = () => {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   const seriesData = [
//     {
//       type: 'rangeArea',
//       name: 'Dispute Amount',
//       data: months.map(month => ({
//         x: month,
//         y: [0, 0]
//       }))
//     },
//     {
//       type: 'rangeArea',
//       name: 'Denied Amount',
//       data: months.map(month => ({
//         x: month,
//         y: [0, 0]
//       }))
//     },
//     {
//       type: 'rangeArea',
//       name: 'Approved Amount',
//       data: months.map(month => ({
//         x: month,
//         y: [0, 0]
//       }))
//     },
//     {
//       type: 'line',
//       name: 'Dispute Median',
//       data: months.map(month => ({
//         x: month,
//         y: 0
//       }))
//     },
//     {
//       type: 'line',
//       name: 'Denied Median',
//       data: months.map(month => ({
//         x: month,
//         y: 0
//       }))
//     },
//     {
//       type: 'line',
//       name: 'Approved Median',
//       data: months.map(month => ({
//         x: month,
//         y: 0
//       }))
//     }
//   ];

//   // const options = {
//   //   chart: {
//   //     height: 350,
//   //     type: 'rangeArea',
//   //     animations: {
//   //       speed: 500
//   //     },
//   //     toolbar: {
//   //       show: false
//   //     }
//   //   },
//   //   colors: ['#ed6c02', '#dc3545', '#28a745', '#3c5f96', '#7e2e84', '#55a1e8'],
//   //   dataLabels: {
//   //     enabled: false
//   //   },
//   //   fill: {
//   //     opacity: [0.24, 0.24, 1, 1]
//   //   },
//   //   forecastDataPoints: {
//   //     count: 2
//   //   },
//   //   stroke: {
//   //     curve: 'straight',
//   //     width: [0, 0, 2, 2]
//   //   },
//   //   legend: {
//   //     show: true,
//   //     customLegendItems: ['Dispute Amount', 'Denied Amount', 'Approved Amount'],
//   //     inverseOrder: true
//   //   },
//   //   title: {
//   //     text: ''
//   //   },
//   //   markers: {
//   //     hover: {
//   //       sizeOffset: 5
//   //     }
//   //   }
//   // };


  
//   // const options = {
//   //   chart: {
//   //     height: 350,
//   //     type: 'rangeArea',
//   //     animations: {
//   //       speed: 500
//   //     },
//   //     toolbar: {
//   //       show: false
//   //     }
//   //   },
//   //   colors: ['#ed6c02', '#dc3545', '#28a745', '#3c5f96', '#7e2e84', '#55a1e8'],
//   //   dataLabels: {
//   //     enabled: false
//   //   },
//   //   fill: {
//   //     opacity: [0.24, 0.24, 1, 1]
//   //   },
//   //   forecastDataPoints: {
//   //     count: 2
//   //   },
//   //   stroke: {
//   //     curve: 'straight',
//   //     width: [0, 0, 2, 2]
//   //   },
//   //   legend: {
//   //     show: true,
//   //     customLegendItems: ['Dispute Amount', 'Denied Amount', 'Approved Amount'],
//   //     inverseOrder: true
//   //   },
//   //   title: {
//   //     text: ''
//   //   },
//   //   markers: {
//   //     hover: {
//   //       sizeOffset: 5
//   //     }
//   //   },
//   //   yaxis: {
//   //     min: 0,
//   //     max: 1500,
//   //     tickAmount: 4,
//   //     labels: {
//   //       formatter: function (value) {
//   //         return (value / 1000).toFixed(1) + 'K';
//   //       }
//   //     }
//   //   }
//   // };
  
  
  

//   return (
//     <div>
//       <Chart options={options} series={seriesData} type="rangeArea" height={350} />
//     </div>
//   );
// };

// export default RangeChart;








// import React from 'react';
// import Chart from 'react-apexcharts';

// const RangeChart = () => {
//   const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

//   const seriesData = [
//     {
//       type: 'rangeArea',
//       name: 'Denied Amount',
//       data: months.map(month => ({
//         x: month,
//         y: 0
//       }))
//     },
//     {
//       type: 'rangeArea',
//       name: 'Approved Amount',
//       data: months.map(month => ({
//         x: month,
//         y: month === 'Oct' ? 781.52 : 0
//       }))
//     },
//     {
//       type: 'line',
//       name: 'Denied Median',
//       data: months.map(month => ({
//         x: month,
//         y: 0
//       }))
//     },
//     {
//       type: 'line',
//       name: 'Approved Median',
//       data: months.map(month => ({
//         x: month,
//         y: 0
//       }))
//     }
//   ];

//   const options = {
//     chart: {
//       height: 350,
//       type: 'rangeArea',
//       animations: {
//         speed: 500
//       },
//       toolbar: {
//         show: false
//       }
//     },
//     colors: ['#dc3545', '#28a745', '#7e2e84', '#55a1e8'],
//     dataLabels: {
//       enabled: false
//     },
//     fill: {
//       opacity: [0.24, 1, 1]
//     },
//     forecastDataPoints: {
//       count: 2
//     },
//     stroke: {
//       curve: 'straight',
//       width: [0, 2, 2]
//     },
//     legend: {
//       show: true,
//       customLegendItems: ['Denied Amount', 'Approved Amount'],
//       inverseOrder: true
//     },
//     title: {
//       text: ''
//     },
//     markers: {
//       hover: {
//         sizeOffset: 5
//       }
//     },
//     yaxis: {
//       min: 0,
//       max: 800,
//       tickAmount: 9,
//       labels: {
//         formatter: function (value) {
//           return '$' + value.toFixed(2);
//         }
//       }
//     }
//   };

//   return (
//     <div>
//       <Chart options={options} series={seriesData} type="rangeArea" height={350} />
//     </div>
//   );
// };

// export default RangeChart;





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
      y: month === 'Oct' ? 781.52 : 0
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
