/*--------------------------------------------------------------- Code 1 ------------------------------------------------------------------*/


import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';

const AreaChart = () => {
  const [series, setSeries] = useState([]);
  const [options, setOptions] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch vendorId and token from session storage
        const vendorId = sessionStorage.getItem('selectedVendorId');
        const token = sessionStorage.getItem('token');

        if (!vendorId || !token) {
          throw new Error('Vendor ID or token is missing');
        }

        // Fetch data for all three years
        const years = [2024, 2023, 2022];
        const requests = years.map(year =>
          axios.get('http://35.153.186.247:8082/financialDashboard/getProvisionDeductionMonthly', {
            params: {
              vendorId,
              year,
              invoiceType: 'Provision Deduction'
            },
            headers: {
              Authorization: `Bearer ${token}`
            }
          })
        );

        // Wait for all requests to complete
        const responses = await Promise.all(requests);

        // Process responses and create series data
        const processedData = years.map((year, index) => {
          const fetchedData = responses[index].data.data;
          // Initialize with zeros for 12 months
          const chartData = Array(12).fill(0);

          // Fill in the data from API response
          fetchedData.forEach(item => {
            if (item.month >= 1 && item.month <= 12) {
              // Convert negative values to positive
              chartData[item.month - 1] = Math.abs(item.val);
            }
          });

          return {
            name: `${year}`,
            data: chartData
          };
        });

        // Flatten the data to find the maximum value
        const allData = processedData.flatMap(d => d.data);
        const maxValue = Math.max(...allData);

        // Set the chart series and options
        setSeries(processedData);
        setOptions({
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
            curve: 'smooth' 
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
            max: Math.ceil(maxValue / 100000) * 100000, // Set the upper ceiling
            tickAmount: 7,
            labels: {
              formatter: function (val) {
                if (val >= 1000000) {
                  return (val / 1000000).toFixed(1) + 'M';
                } else {
                  return (val / 1000).toFixed(0) + 'k';
                }
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
            show: true,
            position: 'bottom', 
            offsetY: 20,
            offsetX: -300, 
            horizontalAlign: 'center', 
            markers: {
              width: 10,
              height: 10,
              radius: 12
            },
            itemMargin: {
              horizontal: 10,
              vertical: 20
            }
          },
          fill: {
            opacity: 0.7,
          },
          colors: ['#FF5733', '#33FF57', '#3357FF'] 
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div id="chart" style={{ height: '350px', width: '350px', marginLeft: "-18px" }}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ReactApexChart options={options} series={series} type="area" height={350} width={540} />
      )}
    </div>
  );
};

export default AreaChart;


