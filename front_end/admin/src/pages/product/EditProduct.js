import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { UploadOutlined } from '@ant-design/icons';
import { Button } from "@mui/material";
import { Typography, Upload } from 'antd';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TopHeader from "../../components/TopHeader";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const EditProduct = () => {
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

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   loadProduct();
  // },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`https://dummyjson.com/products/${id}`, product);
    navigate(`/admin/view-product/${id}`);
  };

  const loadProduct = async () => {
    const result = await axios.get(`https://dummyjson.com/products/${id}`);
    setProduct(result.data);
  };

  return (
    
    <>
    <TopHeader title="PRODUCTS" subtitle="Updating product" />
    <Box component="form"  onSubmit={onSubmit} >
      <Grid container spacing={2} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
        <Grid item sm={8}>
          <TextField
            name="title"
            required
            fullWidth
            id="title"
            label="Tilte"
            autoFocus
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            required
            fullWidth
            id="description"
            label="Description"
            name="description"
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            required
            fullWidth
            id="category"
            label="Category"
            name="category"
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            required
            fullWidth
            id="brand"
            label="Brand"
            name="brand"
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            required
            fullWidth
            name="stock"
            label="Stock"
            id="stock"
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            required
            fullWidth
            name="price"
            label="Price (USD)"
            id="price"
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
          />
        </Grid>
      </Grid>
        
      <Button 
        type="submit"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',          
        }}
      >
        Submit
      </Button>
      
    </Box>
    </>
  );
}

export default EditProduct;