import { JoinFullRounded } from '@mui/icons-material';
import React from 'react';
import Chart from 'react-apexcharts';

const BarGraph = () => {
  const options = {
    chart: {
      type: 'bar',
      height: 350,
	  stacked: true,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: true
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    
    },
	plotOptions: {
		bar: {
		  vertical: true,
		  borderRadius: 7,
		  barWidth: '',
		  barHeight: 150,  
		},
		
	  },
	  stroke: {
		show: true,
		lineCap: "butt",
		colors: ["transparent"],
   
	},
	options: {
        legend: {
          position: 'bottom',
        },
	},
	dataLabels: {
         enabled: false
    },
    xaxis: {
		categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May','June','July'],
    },
	legend: {
		show: false
    },
    fill: {
      opacity: 1
    },
    colors:['#f93131','#00A15D'],
    yaxis: {
      labels: {
        show: false
      }
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
	  show:false
    }
  };

  const series = [
{
		name: 'Bar Data',
		data: [65,59,80,81,56,55,40],
	  }, 
	   {
		  name: 'Line Data',
		  data: [28,48,40,19,86,27,90],
	  },
  ];

  return (
    <div id="chart">
      <Chart options={options} series={series} type="bar"  height={180} />
    </div>
  );
};

export default BarGraph;



// import { useTheme } from '@emotion/react';
// import React from 'react';
// import Chart from 'react-apexcharts';
// import PropTypes from 'prop-types';

// const DonutChart = ({ series }) => {
//   const theme = useTheme();
//   const primary = theme.palette.primary.main;
//   const accentlight = theme.palette.accent.main;
//   const successlight = theme.palette.secondary.main;
//   const secondarylight= theme.palette.success.main;

//   const total = series.reduce((a, b) => a + b, 0);

//   const options = {
//     chart: {
//       width: 180,
//       type: 'donut',
//     },
//     colors: [primary, accentlight, successlight, secondarylight],
//     dataLabels: {
//       enabled: false,
//     },
//     plotOptions: {
//       pie: {
//         donut: {
//           labels: {
//             show: true,
//             name: {
//               show: true,
//               color: '#fff',
//               offsetY: -10,
//               formatter: function (val) {
//                 return val;
//               }
//             },
//             value: {
//               show: true,
//               offsetY: 16,
//               formatter: function (val) {
//                 return `$${val.toLocaleString()}`;
//               }
//             },
//             total: {
//               show: true,
//               showAlways: true,
//               fontSize: '22px',
//               fontFamily: 'Helvetica, Arial, sans-serif',
//               fontWeight: 600,
//               color: '#373d3f',
//               formatter: function () {
//                 return `$${total.toLocaleString()}`;
//               }
//             }
//           },
//           stroke: {
//             curve: 'smooth',
//             width: 1,
//           },
//         }
//       }
//     },
//     labels: ['Findings', 'Outstanding Balance', 'Outstanding Balance','Final Settlement Offer'],
//     legend: {
//       show: false,
//     },
//     responsive: [{
//       breakpoint: 480,
//       options: {
//         chart: {
//           width: 100,
//         },
//         legend: {
//           show: false,
//         },
//       },
//     }],
//   };

//   return (
//     <div id="chart">
//       <Chart options={options} series={series} type="donut" height={250} />
//     </div>
//   );
// };

// DonutChart.propTypes = {
//   series: PropTypes.arrayOf(PropTypes.number).isRequired,
// };

// export default DonutChart;
