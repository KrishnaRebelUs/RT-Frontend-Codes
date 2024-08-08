/*---------------------------------------------------------------- My code 1 --------------------------------------------------------------------*/


// import React from 'react';
// import ReactApexChart from 'react-apexcharts';

// const LineChart = () => {
//   const series = [
//     {
//       name: "Series 1",
//       data: [55000, 165000, 120000, 57000, 125000, 195000, 245000, 40000, 95000, 145000, 0, 260000], // First dataset
//     },
//     {
//       name: "Series 2",
//       data: [205000, 290000, 310000, 150000, 125000, 195000, null, null, null, null, null, 0], // Second dataset
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
//       colors: ['#ee8129' , '#245aa0', ], 
//       // colors: ['#ed6c02', '#01579b'], 
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
//       max: 350000,
//       tickAmount: 7,
//       labels: {
//         formatter: function (val) {
//           return (val / 1000).toFixed(0) + 'k';
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







/*---------------------------------------------------------------- My code 2 --------------------------------------------------------------------*/







import React from 'react';
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
  const series = [
    {
      name: "2024",
      data: [55000, 165000, 120000, 57000, 125000, 195000, 245000, 40000, 95000, 145000, 0, 260000], // First dataset
    },
    {
      name: "2023",
      data: [205000, 290000, 310000, 150000, 125000, 195000, null, null, null, null, null, 0], // Second dataset
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
      colors: ['#ee8129' , '#245aa0', ], 
      // colors: ['#ed6c02', '#01579b'], 
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
      max: 350000,
      tickAmount: 7,
      labels: {
        formatter: function (val) {
          return (val / 1000).toFixed(0) + 'k';
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
