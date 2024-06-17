import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart } from '@mui/x-charts/PieChart';
const PieCharts = () => {
  const [products, setProducts] = useState([]);

  const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
        const result = await axios.get(`https://buckytank.shop/products?limit=100`, config);
        const {products} = result.data;
        console.log(products);
        setProducts(products.filter(product => product.isDeleted === false)); 
  };

  const prepareDataForPieChart = () => {
    const data = [
      { id: 0, value: 0, label: 'Điện thoại' },
      { id: 1, value: 0, label: 'Máy tính bảng' },
      { id: 2, value: 0, label: 'Sạc dự phòng' },
      { id: 3, value: 0, label: 'Tai nghe' },
      { id: 4, value: 0, label: 'Củ sạc' },
      { id: 5, value: 0, label: 'Bao da' },
      { id: 6, value: 0, label: 'Giá đỡ' },
      { id: 7, value: 0, label: 'Dây sạc' },
    ];
    products.forEach((product) => {
      for(let i = 0; i < data.length; i++){
        if(data[i].label === product.category) data[i].value ++;
      }
    })
    
    console.log(data);
    return data;
  };
  return (
    <div>
      <PieChart
        series={[
          {
            data: prepareDataForPieChart(),

          },
        ]}
        width={500}
        height={250}
      />
    </div>
  );
}

export default PieCharts;
