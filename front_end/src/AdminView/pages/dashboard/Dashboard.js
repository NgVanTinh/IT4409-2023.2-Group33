import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";
import TopHeader from "../../components/TopHeader";
import StatBox from "../../components/StartBox";
import { ProductOutlined, UserOutlined, OrderedListOutlined } from '@ant-design/icons'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const [countUser, setCountUser] = useState(0);
  const [countProduct, setCountProduct] = useState(0);
  const [countOrder, setCountOrder] = useState(0); 
  const [revenue, setRevenue] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
    loadCountUser();
    loadCountProduct();
    loadCountOrder(); 
    loadRevenue();
  }, []);

  const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  const loadRevenue = async() =>{
    const result = await axios.get(`https://buckytank.shop/api/orders/sum`, config);
    const sum = Number(result.data.sum)
    const data = sum.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
    setRevenue(data);
  }
  const loadCountUser = async() =>{
    const result = await axios.get(`https://buckytank.shop/users/number-users`, config);
    setCountUser(result.data.users - 1);
  }

  const loadCountProduct = async() =>{
    const result = await axios.get(`https://buckytank.shop/products`, config);
    setCountProduct(result.data.total);
  }

  const loadCountOrder = async() =>{
    const result = await axios.get(`https://buckytank.shop/api/orders/number-orders`, config);
    setCountOrder(result.data.orders);
  }

  const loadData = async () => {
    const result = await axios.get(`https://buckytank.shop/products`, config);
    const {products} = result.data;
    products.sort((a, b) => b.rating - a.rating);
    const arr = products.slice(0, 5);
    console.log(arr);
    setData(arr);
  };

  return (
    <Box m="5px" padding={0}>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <TopHeader title="TỔNG QUAN" subtitle="Chào mừng tới bảng điều khiển của quản trị viên" />
      </Box>

      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        
      >
        <Box
          gridColumn="span 3"
          backgroundColor='white'
          borderRadius={5}
          boxShadow={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => navigate(`/admin/users`)}
          sx={{
            cursor: 'pointer', 
            '&:hover': {
              boxShadow: 20, 
            }
          }}
        >
          <StatBox
            title={countUser}
            subtitle="Người dùng"
            icon={
              <UserOutlined
                style={{ color: 'blue', fontSize: "26px" }}
              />
            }
            
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor='white'
          borderRadius={5}
          boxShadow={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => navigate(`/admin/products`)}
          sx={{
            cursor: 'pointer', 
            '&:hover': {
              boxShadow: 20, 
            }
          }}
        >
          <StatBox
            title={countProduct}
            subtitle="Sản phẩm"
            icon={
              <ProductOutlined
                style={{ color: 'blue', fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor='white'
          borderRadius={5}
          boxShadow={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => navigate(`/admin/orders`)}
          sx={{
            cursor: 'pointer', 
            '&:hover': {
              boxShadow: 20, 
            }
          }}
        >
          <StatBox
            
            title={countOrder}
            subtitle="Đơn hàng"
            icon={
              <OrderedListOutlined
                style={{ color: 'blue', fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          backgroundColor='white'
          borderRadius={5}
          boxShadow={10}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            
            title={revenue}
            subtitle="Doanh thu"
            icon={
              <MonetizationOnOutlinedIcon
                style={{ color: 'blue', fontSize: "30px" }}
              />
            }
          />
        </Box>

        
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor='white'
          borderRadius={5}
          boxShadow={5}
          p="30px"
          height={"340px"}
        >
          <Typography variant="h5" fontWeight="600">
            Thống kê sản phẩm
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <PieChart/>
          </Box>
        </Box>
        <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor='white'
          borderRadius={5}
          boxShadow={10}
          height={"340px"}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Top 5 sản phẩm được đánh giá cao nhất
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
            ml={0}
          >
            <LineChart data={data}/>
          </Box>
        </Box>
      </Box> 
    </Box>
  );
};

export default Dashboard;