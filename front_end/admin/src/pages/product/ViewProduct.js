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

const ViewProduct = () => {
  const navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState({
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
    loadProduct();
  },[]);

  const loadProduct = async () => {
    const result = await axios.get(`https://dummyjson.com/products/${id}`);
    setProduct(result.data);
  };

  return (
    
    <>
    <TopHeader title="PRODUCTS" subtitle="Viewing a product" />
    <Box sx={{display: 'flex', flexDirection: 'column'}} >
      <Grid container spacing={2} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
        <Grid item sm={8} >
          <TextField
            variant="standard"
            fullWidth={true}
            name="title"
            id="title"
            label="Tilte"
            value={product.title}
            InputLabelProps={{ style: { color: 'blue' } }}
            disabled
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="description"
            fullWidth
            id="description"
            label="Description"
            value={product.description}
            InputLabelProps={{ style: { color: 'blue' } }}
            multiline
            disabled
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="category"
            fullWidth
            id="category"
            label="Category"
            value={product.category}
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
            value={product.brand}
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
            value={product.stock}
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
            value={product.price}
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
                        src={product.thumbnail}
                        alt="Product Thumbnail"
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
                    {product.images && product.images.map((image, index) => (
                        <div
                            style={{position: 'relative', display: 'inline-block'}}
                        >
                      
                          <img
                            src={image}
                            alt="Product Thumbnail"
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
        onClick={() => {navigate('/products')}}
      >
        <ArrowBackIcon sx={{mr:1}}/>
        Navigate to product page
      </Button>

      <Button
        sx={{backgroundColor: '#1890ff', color: 'white', borderRadius: '10px', marginLeft: 'auto'}}
        onClick={() => {navigate(`/edit-product/${id}`)}}
      >
        Edit product
        <ArrowForwardIcon sx={{ml:1}}/>
        
      </Button>
    </div>
    </Box>
    
      
  </>
  );
}

export default ViewProduct;