import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TopHeader from "../../components/TopHeader";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputAdornment from '@mui/material/InputAdornment';

const ViewOrder = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [order, setOrder] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: ""
  });

  useEffect(() => {
    loadOrder();
  });

  const loadOrder = async () => {
    const result = await axios.get(`https://dummyjson.com/carts/${id}`);
    console.log(result.data);
    setOrder(result.data);
  };

  // const productsInfo = order.products.map(product => `${product.title} x ${product.quantity}`) ;

  return (
    
    <>
    <TopHeader title="ORDERS" subtitle="Viewing a order" />
    <Box sx={{display: 'flex', flexDirection: 'column'}} >
      <Grid container spacing={2} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
        <Grid item sm={8} >
          <TextField
            variant="standard"
            fullWidth={true}
            name="id"
            id="id"
            label="ID"
            value={order.id}
            InputLabelProps={{ style: { color: 'blue' } }}
            disabled
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="user"
            fullWidth
            id="user"
            label="user"
            value={order && order.userId}
            InputLabelProps={{ style: { color: 'blue' } }}
            multiline
            disabled
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="products"
            fullWidth
            id="products"
            label="Products"
            value={order && order.products ? order.products.map(product => `${product.title} x ${product.quantity}`).join('\n') : ''}
            InputLabelProps={{ style: { color: 'blue' } }}
            disabled
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="brand"
            fullWidth
            id="brand"
            label="Brand"
            value={order.brand}
            InputLabelProps={{ style: { color: 'blue' } }}
            disabled
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            variant="standard"
            fullWidth
            name="stock"
            label="Stock"
            id="stock"
            value={order.stock}
            InputLabelProps={{ style: { color: 'blue' } }}
            disabled
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            variant="standard"
            fullWidth
            name="price"
            label="Price (USD)"
            id="price"
            value={order.price}
            InputLabelProps={{ style: { color: 'blue' } }}
            disabled
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
        onClick={() => {navigate('/orders')}}
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