import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { colors } from '@mui/material';

const LineCharts = ({data}) => {
  const chartData = data;
  const barChartData = [];
  const xAxisData = [];
  chartData && chartData.map(item => xAxisData.push(item.title))
  chartData && chartData.map(item => barChartData.push(item.id))
  return (
    <BarChart
      xAxis={[
        { 
          scaleType: 'band', 
          data: xAxisData,
          colorMap:
            {
              type: 'ordinal',
              colors: [
                '#ccebc5',
                '#a8ddb5',
                '#7bccc4',
                '#4eb3d3',
                '#2b8cbe',
                '#08589e',
              ],
            }
        }
      ]}
      series={[{ data: barChartData }]}
      width={600} 
      height={200}
    />
  );
}


export default LineCharts;


