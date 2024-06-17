import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineChart2 = ({ data }) => {
  const chartData = data;

  if (!data || data.length === 0) {
    return <p>Không có dữ liệu</p>;
  }
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart
        data={chartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="title" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="quantity" fill="#1896EA" barSize={30} /> 
      </BarChart>
    </ResponsiveContainer>
  );
}

export default LineChart2;
