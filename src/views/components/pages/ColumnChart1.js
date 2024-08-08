/*------------------------------------------------------------------- My code 1 -----------------------------------------------------------------*/

// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const ColumnChart = () => {
//   const options = {
//     series: [
//       {
//         name: 'TYPE 1',
//         data: [27, 30, 30, null, null, null, null, null, null, null, null, null],
//       }
//     ],
//     chart: {
//       type: 'bar',
//       stacked: false,
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
//     plotOptions: {
//       bar: {
//         horizontal: false,
//         borderRadius: 7,
//         columnWidth: '80%',
//         distributed: false,
//       },
//     },
//     stroke: {
//       show: true,
//       width: 10,
//       colors: ["transparent"],
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
//       max: 30,
//       tickAmount: 4,
//       labels: {
//         formatter: function (val) {
//           return val === 0 ? '0' : val.toFixed(0);
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
//       opacity: 1,
//       colors: ['#245aa0'],
//     }
//   };

//   return (
//     <div id="chart" style={{ height: '300px', width: '350px', marginLeft: "-35px" }}>
//       <ReactApexChart options={options} series={options.series} type="bar" height={300} width={370} />
//     </div>
//   );
// };

// export default ColumnChart;








/*------------------------------------------------------------------- My code 2 -----------------------------------------------------------------*/





import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ColumnChart = () => {
  const options = {
    series: [
      {
        name: 'TYPE 1',
        data: [27, 30, 30, null, null, null, null, null, null, null, null, null],
      }
    ],
    chart: {
      type: 'bar',
      stacked: false,
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
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 7,
        columnWidth: '80%',
        distributed: false,
      },
    },
    stroke: {
      show: true,
      width: 10,
      colors: ["transparent"],
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
      max: 30,
      tickAmount: 4,
      labels: {
        formatter: function (val) {
          return val === 0 ? '0' : val.toFixed(0);
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
      opacity: 1,
      colors: ['#245aa0'],
    }
  };

  return (
    <div id="chart" style={{ height: '300px', width: '350px', marginLeft: "-18px" }}>
      <ReactApexChart options={options} series={options.series} type="bar" height={300} width={540} />
    </div>
  );
};

export default ColumnChart;
