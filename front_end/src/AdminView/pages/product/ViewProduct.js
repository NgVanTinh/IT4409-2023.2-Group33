import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const [productSpecs, setProductSpecs] = useState({});
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
    const result = await axios.get(`https://buckytank.shop/products/${id}`);
    result.data.price = result.data.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    setProduct(result.data);
    console.log(result.data);
    const obj = JSON.parse(result.data.spec)
    console.log(obj);
    setProductSpecs(obj)
  };

  return (
    
    <>
    <TopHeader title="SẢN PHẨM" subtitle="Xem chi tiết sản phẩm" />
    <Box sx={{display: 'flex', flexDirection: 'column'}} >
      <Grid container spacing={2} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
        <Grid item sm={8} >
          <TextField
            variant="standard"
            fullWidth={true}
            name="title"
            id="title"
            label="Tên sản phẩm"
            value={product.title}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
            
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="description"
            fullWidth
            id="description"
            label="Mô tả"
            value={product.description}
            InputLabelProps={{ style: { color: 'blue' } }}
            multiline
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="category"
            fullWidth
            id="category"
            label="Danh mục"
            value={product.category}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            variant="standard"
            name="brand"
            fullWidth
            id="brand"
            label="Hãng"
            value={product.brand}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>

         <Grid item sm={8}>
          <TextField
            variant="standard"
            name="rating"
            fullWidth
            id="rating"
            label="Đánh giá"
            value={String(product.rating)}
            InputLabelProps={{ style: { color: 'blue' } }}
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
            name="stock"
            label="Số lượng"
            id="stock"
            value={product.stock}
            InputLabelProps={{ style: { color: 'blue' } }}
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
            name="discountPercentage"
            label="Phần trăm giảm giá (%)"
            id="discountPercentage"
            value={product.discountPercentage}
            InputLabelProps={{ style: { color: 'blue' } }}
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
            name="price"
            label="Giá (VNĐ)"
            id="price"
            value={product.price}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
          />
        </Grid>
        
        <Grid item sm={8} >
          <TextField
            InputProps={{
              style: { color: 'black' }, 
              readOnly: true, 
            }}
            variant="standard"
            fullWidth={true}
            name="spec"
            id="spec"
            label="Thông số"
            value={productSpecs && Object.entries(productSpecs).map(([key, value]) => `${key}: ${value}`).join('\n')}
            InputLabelProps={{ style: { color: 'blue' } }}
            multiline
          />
          
        </Grid>

        <Grid item sm={8}>
           <TextField
              variant="standard"
              disabled
              fullWidth
              label="Ảnh đại diện"
              multiline
              rows={6}
              InputLabelProps={{ style: { color: 'blue' } }}
              InputProps={{
                style: { color: 'black' },
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
              label="Ảnh chi tiết"
              multiline
              rows={6}
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
        onClick={() => {navigate('/admin/products')}}
      >
        <ArrowBackIcon sx={{mr:1}}/>
        Quay lại trang sản phẩm
      </Button>

      <Button
        sx={{backgroundColor: '#1890ff', color: 'white', borderRadius: '10px', marginLeft: 'auto'}}
        onClick={() => {navigate(`/admin/edit-product/${id}`)}}
      >
        Chỉnh sửa sản phẩm
        <ArrowForwardIcon sx={{ml:1}}/>
        
      </Button>
    </div>
    </Box>
    
      
  </>
  );
}

export default ViewProduct;