import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';

const Chart = () => {

  const [categories, setCategories] = useState()
  const loadCategories = async() =>{
    const result = await axios.get(`https://dummyjson.com/carts`)
    setCategories(result.data)
  }
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'series A' },
            { id: 1, value: 15, label: 'series B' },
            { id: 2, value: 20, label: 'series C' },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}

export default Chart;