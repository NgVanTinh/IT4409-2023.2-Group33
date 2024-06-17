import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const LineCharts = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>Không có dữ liệu</p>;
  }

  const barChartData = data.map(item => ({ name: item.title, rating: item.rating }));

  return (
    <ResponsiveContainer width={550} height={200}>
      <BarChart data={barChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" tick={false}/>
        <YAxis />
        <Tooltip />
        <Bar dataKey="rating" fill="#1896EA" barSize={30} /> {/* Fixed bar width */}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default LineCharts;
