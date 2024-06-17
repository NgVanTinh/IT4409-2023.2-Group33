import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from "@mui/material";
import TopHeader from '../../components/TopHeader'
import LineChart from "../../components/linechart2";
import LineChart3 from "../../components/linechart3";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';

const Chart = () => {
  const [value, setValue] = useState('1');
  const [categories, setCategories] = useState([]);
  const [categories3, setCategories3] = useState([]);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  const [category, setCategory] = useState([]);

  useEffect(() => {
    loadCategories();
    loadCategories3();
    loadData(value);
  }, []);

  const loadCategories3 = async () => {
    try {
      const result = await axios.get(`https://buckytank.shop/api/orders/quantity-sold-by-category`, config);
      setCategories3(result.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadCategories = async () => {
    try {
      const result = await axios.get(`https://buckytank.shop/products/categories`, config);
      setCategories(result.data);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const loadData = async (categoryId) => {
      const result = await axios.get(`https://buckytank.shop/api/orders/list-product-sold-by-category?categoryId=${categoryId}`, config);
      setCategory(result.data);
  }

  const handleChange = (event, newValue) => {
    // console.log(newValue)
    setValue(newValue);
    loadData(newValue);
  };
  return (
    <div>
      <TopHeader title="THỐNG KÊ" subtitle="Thống kê sản phẩm, doanh thu,...." />

      {/* <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      > */}
          <Box
            gridColumn="span 5"
            gridRow="span 2"
            // backgroundColor='#9C9C9C'
            p="30px"
          >
            <Typography variant="h5" fontWeight="600">
              Thống kê số lượng sản phẩm đã bán
            </Typography>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mt="25px"
            >
              <LineChart3 data={categories3} length={600}/> 
            </Box>
          </Box>

          <Box 
             gridColumn="span 5"
            gridRow="span 2"
            // backgroundColor='#9C9C9C'
            p="30px">
            <Typography variant="h5" fontWeight="600">
              Thống kê số lượng sản phẩm đã bán theo từng danh mục
            </Typography>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  {categories.map((category, index) => (
                    <Tab key={index} label={category.name} value={String(index + 1)} />
                  ))}
                </TabList >
              </Box>
              {categories.map((item, index) => (
                <TabPanel key={index} value={String(index + 1)}>
                  <LineChart data={category} length={600}/> 
                </TabPanel>
              ))}
            </TabContext>
          </Box>
    </div>
  )
}

export default Chart