// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const AreaChart = () => {
//   const series = [
//     {
//       name: 'TYPE 1',
//       data: [118000, 38000, 0, 18000, 0, 0, 0, 0, 0, 0, 0, 0],
//     }
//   ];

//   const options = {
//     chart: {
//       type: 'area',
//       stacked: true,
//       toolbar: {
//         show: false
//       },
//       zoom: {
//         enabled: true
//       },
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         legend: {
//           position: 'bottom',
//           offsetX: 20,
//           offsetY: 60
//         }
//       }
//     }],
//     stroke: {
//       show: true,
//       width: 2,
//       colors: ["#2edd95"],
//     },
//     dataLabels: {
//       enabled: false
//     },
//     xaxis: {
//       type: 'category',
//       categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
//       tickPlacement: 'on',
//     },
//     yaxis: {
//       min: 0,
//       max: 120000,
//       tickAmount: 6,
//       labels: {
//         formatter: function (val) {
//           return val === 0 ? '0' : (val / 1000).toFixed(0) + 'k';
//         }
//       },
//       title: {
//         offsetX: 0,
//         offsetY: 0,
//         style: {
//           fontSize: '12px',
//           fontWeight: 400,
//           color: '#666'
//         }
//       },
//     },
//     grid: {
//       yaxis: {
//         lines: {
//           show: true,
//         }
//       },
//       xaxis: {
//         lines: {
//           show: true,
//         }
//       },
//     },
//     legend: {
//       show: false // Hide the legend
//     },
//     fill: {
//       opacity: 0.7,
//       colors: ['#2edd95'],
//     }
//   };

  
//   return (
//     <div id="chart" style={{ height: '300px', width: '350px', marginLeft: "-35px" }}>
//       <ReactApexChart options={options} series={series} type="area" height={350} width={370} />
//     </div>
//   );
// };

// export default AreaChart;





/*-------------------------------------------------------------- Code 1 -----------------------------------------------------------------------*/

import React from 'react';
import ReactApexChart from 'react-apexcharts';

const AreaChart = () => {
  const series = [
    {
      name: 'TYPE 1',
      data: [118000, 38000, 0, 18000, 0, 0, 0, 0, 0, 0, 0, 0],
    }
  ];

  const options = {
    chart: {
      type: 'area',
      stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: 20,
          offsetY: 60
        }
      }
    }],
    stroke: {
      show: true,
      width: 2,
      colors: ["#2edd95"],
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      tickPlacement: 'on',
    },
    yaxis: {
      min: 0,
      max: 120000,
      tickAmount: 6,
      labels: {
        formatter: function (val) {
          return val === 0 ? '0' : (val / 1000).toFixed(0) + 'k';
        }
      },
      title: {
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: '12px',
          fontWeight: 400,
          color: '#666'
        }
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        }
      },
      xaxis: {
        lines: {
          show: true,
        }
      },
    },
    legend: {
      show: false // Hide the legend
    },
    fill: {
      opacity: 0.7,
      colors: ['#2edd95'],
    }
  };

  
  return (
    <div id="chart" style={{ height: '350px', width: '350px', marginLeft: "-18px" }}>
      <ReactApexChart options={options} series={series} type="area" height={350} width={540} />
    </div>
  );
};

export default AreaChart;


