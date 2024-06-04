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
  },[]);

  const loadOrder = async () => {
    const result = await axios.get(`https://dummyjson.com/carts/${id}`);
    setOrder(result.data);
  };

  return (
    
    <>
    <TopHeader title="ORDERS" subtitle="Viewing a order" />
    <Box sx={{display: 'flex', flexDirection: 'column'}} >
      <Grid container spacing={2} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
        <Grid item sm={8} >
          <TextField
            variant="standard"
            fullWidth={true}
            name="user"
            id="user"
            label="User"
            value={order.userId}
            InputLabelProps={{ style: { color: 'blue' } }}
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
            value={order.products}
            InputLabelProps={{ style: { color: 'blue' } }}
            multiline
            disabled
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="total"
            fullWidth
            id="total"
            label="Total"
            value={order.total}
            InputLabelProps={{ style: { color: 'blue' } }}
            disabled
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="discountedTotal"
            fullWidth
            id="discountedTotal"
            label="Discounted Total"
            value={order.discountedTotal}
            InputLabelProps={{ style: { color: 'blue' } }}
            disabled
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            variant="standard"
            fullWidth
            name="totalProducts"
            label="Total Products"
            id="totalProducts"
            value={order.stock}
            InputLabelProps={{ style: { color: 'blue' } }}
            disabled
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            variant="standard"
            fullWidth
            name="totalQuantity"
            label="Total Quantity"
            id="totalQuantity"
            value={order.price}
            InputLabelProps={{ style: { color: 'blue' } }}
            disabled
          />
        </Grid>
        <Grid item sm={8}>
           <TextField
              variant="standard"
              disabled
              fullWidth
              label="Thumbnail"
              multiline
              rows={5}
              InputLabelProps={{ style: { color: 'blue' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                      <img
                        src={order.thumbnail}
                        alt="order Thumbnail"
                        style={{
                          width: '100px',
                          height: '100px',
                          borderRadius: '10px',
                          border: '1px solid blue',
                          marginRight: '10px',
                          marginBottom: '10px',
                        }}
                      /> 
                  </InputAdornment>
                ),
              }}
            />
        </Grid>

        <Grid item sm={8}>
           <TextField
              variant="standard"
              disabled
              fullWidth
              label="Images"
              multiline
              rows={5}
              InputLabelProps={{ style: { color: 'blue' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {order.images && order.images.map((image, index) => (
                        <div
                            style={{position: 'relative', display: 'inline-block'}}
                        >
                      
                          <img
                            src={image}
                            alt="order Thumbnail"
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '10px',
                                border: '1px solid blue',
                                marginRight: '10px',
                              }}
                            />
                          
                        </div>
                      ))}
                
                  </InputAdornment>
                ),
              }}
            />
        </Grid>
        <ToastContainer/>
        
        
    </Grid>
    <div
      style={{
          display: 'flex',
          justifyContent: 'flex-end',  
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