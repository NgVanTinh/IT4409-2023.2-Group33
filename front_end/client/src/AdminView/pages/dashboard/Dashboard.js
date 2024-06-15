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
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
    loadCountUser();
    loadCountProduct();
    loadCountOrder(); 
  }, []);

  const loadCountUser = async() =>{
    const result = await axios.get(`https://buckytank.shop/users/number-users`);
    setCountUser(result.data.users - 1);
  }

  const loadCountProduct = async() =>{
    const result = await axios.get(`https://buckytank.shop/products`);
    setCountProduct(result.data.total);
  }

  const loadCountOrder = async() =>{
    const result = await axios.get(`https://buckytank.shop/api/orders/number-orders`);
    setCountOrder(result.data.orders);
  }

  const loadData = async () => {
    const result = await axios.get(`https://buckytank.shop/products`);
    const {products} = result.data;
    products.sort((a, b) => a.rating - b.rating);
    const arr = products.slice(0, 5);
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
            
            title="32,441 VNĐ"
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
            Sales Quantity
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <LineChart data={data}/>
          </Box>
        </Box>
      </Box> 
    </Box>
  );
};

export default Dashboard;