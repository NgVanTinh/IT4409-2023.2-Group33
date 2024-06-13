import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const LineCharts = ({data}) => {
  console.log("data in line chart: ", data)
  const chartData = data;
  return (
    <BarChart
      xAxis={[{ scaleType: 'band', data: chartData.map(item => item.title) }]}
      series={[{ data:chartData.map(item => item.rating) }]}
      width={600}
      height={200}
    />
  );
}


export default LineCharts;

