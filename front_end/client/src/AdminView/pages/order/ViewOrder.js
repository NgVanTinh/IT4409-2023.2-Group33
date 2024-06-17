import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TopHeader from "../../components/TopHeader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ViewOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [order, setOrder] = useState({
    id: "",
    products: "",
    total: "",
    discountedTotal: "",
    userId: "",
    totalProducts: "",
    totalQuantity: "",
    address: "",
    status: ""
  });

  const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  useEffect(() => {
    loadOrder();
  });

  const loadOrder = async () => {
    const result = await axios.get(`https://buckytank.shop/api/orders/${id}`, config);
    console.log("order: ", result.data);
    const order = result.data;
    const formattedDateTime = new Date(`${order.orderDate}`).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });
    order.createdTime = formattedDateTime;
    const products = JSON.parse(order.productJsonArray);
    const res = await axios.get(`https://buckytank.shop/user/${order.userId}`, config);
    const user = res.data;
    const addressObj = JSON.parse(order.addressJSON);
    const orderedKeys = ["number", "street", "ward", "district", "city"];
    const orderedValues = orderedKeys.map(key => addressObj[key]);
    const addressValuesString = orderedValues.join(", ");    
    order.products = products;
    order.address = addressValuesString;
    order.user = user.fullname;
    order.total = order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    order.discountedPrice = order.discountedPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    setOrder(order);
  };

  return (
    <>
    <TopHeader title="ĐƠN HÀNG" subtitle="Xem chi tiết đơn hàng" />
    <Box sx={{display: 'flex', flexDirection: 'column'}} >
      <Grid container spacing={2} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
        

        <Grid item sm={8} >
          <TextField
            variant="standard"
            fullWidth={true}
            name="createdTime"
            id="createdTime"
            label="Thời gian tạo"
            value={order.createdTime && order.createdTime}
            InputLabelProps={{ style: { color: 'blue'}, shrink: true }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="products"
            fullWidth
            id="products"
            label="Sản phẩm"
            value={order.products && order.products.map((product) => `${product.title} x ${product.quantity} `).join('\n')}
            InputLabelProps={{ style: { color: 'blue' } }}
            multiline
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>

        {/* <Grid item sm={8}>
          <TextField
            variant="standard"
            name="products"
            fullWidth
            id="products"
            label="Sản phẩm"
            InputLabelProps={{ style: { color: 'blue' } }}
            multiline
            InputProps={{
                style: { color: 'black' },
                startAdornment: (
                  <InputAdornment position="start">
                      <img
                        src={order.products.thumbnail}
                        alt="Product Thumbnail"
                        style={{
                          width: '100px',
                          height: '70px',
                          borderRadius: '10px',
                          border: '1px solid blue',
                        }}
                      /> 
                  </InputAdornment>
                ),
              }}
          />
        </Grid> */}


        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="totalProducts"
            fullWidth
            id="totalProducts"
            label="Tổng số sản phẩm"
            value={order.totalProducts && order.totalProducts}
            InputLabelProps={{ style: { color: 'blue' }, shrink: true }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            variant="standard"
            fullWidth
            name="totalQuantity"
            label="Tổng số lượng"
            id="totalQuantity"
            value={order.totalQuantity && order.totalQuantity}
            InputLabelProps={{ style: { color: 'blue' }, shrink: true }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            variant="standard"
            fullWidth
            name="total"
            label="Tổng tiền"
            id="total"
            value={order.total && order.total}
            InputLabelProps={{ style: { color: 'blue' }, shrink: true }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            variant="standard"
            fullWidth
            name="discountedPrice"
            label="Tổng tiền sau khi giảm"
            id="discountedPrice"
            value={order.discountedPrice && order.discountedPrice}
            InputLabelProps={{ style: { color: 'blue' }, shrink: true }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="user"
            fullWidth
            id="user"
            label="Người đặt"
            value={order.user && order.user}
            InputLabelProps={{ style: { color: 'blue' }, shrink: true }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>
        
        <Grid item sm={8}>
          <TextField
            variant="standard"
            fullWidth
            name="address"
            label="Địa chỉ"
            id="address"
            value={order.address && order.address}
            InputLabelProps={{ style: { color: 'blue' }, shrink: true }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            fullWidth
            name="status"
            label="Trạng thái"
            id="status"
            value={order.status}
            InputLabelProps={{ style: { color: 'blue' }, shrink: true }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>
  
    </Grid>
    <div
      style={{
          display: 'flex',
          justifyContent: 'flex-start',  
          marginTop: '20px',
        }}
    >
      <Button
        sx={{backgroundColor: '#1890ff', color: 'white', borderRadius: '10px', mr:1}}
        onClick={() => {navigate('/admin/orders')}}
      >
        <ArrowBackIcon sx={{mr:1}}/>
        Navigate to order page
      </Button>
    </div>
    </Box>
  </>
  );
}

export default ViewOrder;