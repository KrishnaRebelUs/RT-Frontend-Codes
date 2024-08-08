/*------------------------------------------------------------------- My code 1 -----------------------------------------------------------------*/


// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const ColumnChart = () => {
//   const options = {
//     series: [
//       {
//         name: 'TYPE 1',
//         data: [79, 32, 42, 21, 42, 34, 50, 18, 38, 38, 1, 52],
//       },
//       {
//         name: 'TYPE 2',
//         data: [30, 45, 49, 22, 0, 0, 0, 0, 0, 0, 0, 0], // Padding with 0s for missing data
//       },
//       {
//         name: 'TYPE 3',
//         data: [79, 32, 42, 21, 0, 0, 0, 0, 0, 0, 0, 0], // Padding with 0s for missing data
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
//         distributed: false, // Ensure bars are grouped together per category
//       },
//     },
//     stroke: {
//       show: true,
//       width: 1,
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
//       max: 100,
//       tickAmount: 10,
//       labels: {
//         formatter: function (val) {
//           return val.toFixed(0);
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
//       colors: ['#2edd95', '#245aa0', '#ee8129'],
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
        name: '2024',
        data: [79, 32, 42, 21, 42, 34, 50, 18, 38, 38, 1, 52],
      },
      {
        name: '2023',
        data: [30, 45, 49, 22, 0, 0, 0, 0, 0, 0, 0, 0], 
      },
      {
        name: '2022',
        data: [79, 32, 42, 21, 0, 0, 0, 0, 0, 0, 0, 0], 
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
      width: 0.1,
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
      max: 100,
      tickAmount: 10,
      labels: {
        formatter: function (val) {
          return val.toFixed(0);
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
      show: false 
    },
    fill: {
      opacity: 1,
      colors: ['#2edd95', '#245aa0', '#ee8129'],
    }
  };

  return (
    <div id="chart" style={{ height: '300px', width: '350px', marginLeft: "-18px" }}>
      <ReactApexChart options={options} series={options.series} type="bar" height={300} width={540} />
    </div>
  );
};

export default ColumnChart;


