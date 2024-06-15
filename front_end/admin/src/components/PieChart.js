import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
const PieCharts = () => {
  // const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   loadCategories();
  // }, []);

  // const loadCategories = async () => {
  //   try {
  //     const result = await axios.get(`https://dummyjson.com/carts`);
  //     setCategories(result.data);
  //   } catch (error) {
  //     console.error('Error loading categories:', error);
  //   }
  // };
  const categories = [
    {
      title: 'Category 1',
      quantity: 10,
    },
    {
      title: 'Category 2',
      quantity: 20,
    },
    {
      title: 'Category 3',
      quantity: 30,
    },
    {
      title: 'Category 4',
      quantity: 40,
    }
  ]
  const prepareDataForPieChart = () => {
    return categories.map((category, index) => ({
      id: index,
      value: category.quantity, 
      label: category.title, 
    }));
  };

  return (
    <div>
      <PieChart
        series={[
          {
            data: prepareDataForPieChart(),
          },
        ]}
        width={400}
        height={200}
      />
    </div>
  );
}

export default PieCharts;