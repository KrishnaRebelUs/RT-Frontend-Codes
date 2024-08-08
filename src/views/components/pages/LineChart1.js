// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const LineChart = () => {
//   const series = [
//     {
//       name: "Series 1",
//       data: [600000, 1550000, 580000, 390000, 0, 0, 0, 0, 0, 0, 0, 0], // Updated data for Series 1
//     }
//   ];

//   const options = {
//     chart: {
//       height: 350,
//       type: 'line',
//       zoom: {
//         enabled: false
//       },
//       toolbar: {
//         show: false,
//       },
//     },
//     dataLabels: {
//       enabled: false
//     },
//     stroke: {
//       curve: 'smooth',
//       // colors: ['#00A15D'], // Color for the line
//       colors: ['#ee8129'], // Color for the line
//     },
//     title: {
//       show: false,
//     },
//     grid: {
//       row: {
//         colors: ['#fff', 'transparent'], 
//         opacity: 0.5
//       },
//     },
//     xaxis: {
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//       tickPlacement: 'on',
//       labels: {
//         show: true,
//         rotate: -45,
//         rotateAlways: true,
//         hideOverlappingLabels: false,
//         trim: false,
//         maxHeight: 100,
//         offsetY: 5,
//       }
//     },
//     yaxis: {
//       min: 0,
//       max: 1600000, // Extend maximum value to 1.6M
//       tickAmount: 7,
//       labels: {
//         formatter: function (val) {
//           if (val >= 1000000) {
//             return (val / 1000000).toFixed(1) + 'M'; // Format values in millions
//           } else {
//             return (val / 1000).toFixed(0) + 'k';
//           }
//         }
//       }
//     },
//     legend: {
//       show: false // Hide the legend
//     }
//   };

//   return (
//     <div>
//       <div id="chart" style={{ height: '300px', width: '400px', marginLeft: "-35px" }}>
//         <ReactApexChart options={options} series={series} type="line" height={300} width={350} />
//       </div>
//     </div>
//   );
// };

// export default LineChart;




/*--------------------------------------------------------------- Line Chart --------------------------------------------------------------*/









import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
  const series = [
    {
      name: "Series 1",
      data: [600000, 1550000, 580000, 390000, 0, 0, 0, 0, 0, 0, 0, 0], // Updated data for Series 1
    }
  ];

  const options = {
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      colors: ['#ee8129'], // Color for the line
    },
    title: {
      show: false,
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
          borderWidth: 1, // Adjust the width of the grid lines
        }
      },
      xaxis: {
        lines: {
          show: true,
          borderWidth: 1, // Adjust the width of the grid lines
        }
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      tickPlacement: 'on',
      labels: {
        show: true,
        rotate: -45,
        rotateAlways: true,
        hideOverlappingLabels: false,
        trim: false,
        maxHeight: 100,
        offsetY: 5,
      }
    },
    yaxis: {
      min: 0,
      max: 1600000, // Extend maximum value to 1.6M
      tickAmount: 7,
      labels: {
        formatter: function (val) {
          if (val >= 1000000) {
            return (val / 1000000).toFixed(1) + 'M'; // Format values in millions
          } else {
            return (val / 1000).toFixed(0) + 'k';
          }
        }
      }
    },
    legend: {
      show: false // Hide the legend
    }
  };

  return (
    <div>
      <div id="chart" style={{ height: '300px', width: '400px', marginLeft: "-18px" }}>
        <ReactApexChart options={options} series={series} type="line" height={300} width={540} />
      </div>
    </div>
  );
};

export default LineChart;
