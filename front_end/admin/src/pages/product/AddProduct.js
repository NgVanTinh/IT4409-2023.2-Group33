import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import IconButton from '@mui/material/IconButton';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TopHeader from "../../components/TopHeader";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import CancelPresentationOutlinedIcon from '@mui/icons-material/CancelPresentationOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import InputAdornment from '@mui/material/InputAdornment';

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


const AddProduct = () => {
  const navigate = useNavigate();

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

  const onThumbnailChange = (e) => {
    setProduct({...product, thumbnail: e.target.files[0]});
  };

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (product.images.length < 5) {
    setProduct(prevProduct => ({
      ...prevProduct,
      images: [...prevProduct.images, ...files]
    }));
    } else {
      toast.warn('Can not upload more than 5 images!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  };

   const handleDeleteImage = (index) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index)
    }));
  };

  const isString = (value) => typeof value === 'string';

  // useEffect(() => {
  //   loadProduct();
  // },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`https://dummyjson.com/products/`, product);
    navigate(`/admin/products`);
  };

  // const loadProduct = async () => {
  //   const result = await axios.get(`https://dummyjson.com/products/${id}`);
  //   setProduct(result.data);
  // };

  return (
    
    <>
    <TopHeader title="PRODUCTS" subtitle="Create new product" />
    <Box component="form"  onSubmit={onSubmit} sx={{display: 'flex', flexDirection: 'column',  justifyContent: 'center', alignItems: 'center'}} >
      <Grid container spacing={2} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
        <Grid item sm={8} >
          <TextField
            fullWidth={true}
            name="title"
            required
            id="title"
            label="Tilte"
            autoFocus
            value={product.title}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
            onChange={onInputChange}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            name="description"
            required
            fullWidth
            id="description"
            label="Description"
            autoFocus
            value={product.description}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
            multiline
            rows={3}
            onChange={onInputChange}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            name="category"
            required
            fullWidth
            id="category"
            label="Category"
            value={product.category}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
            onChange={onInputChange}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            name="brand"
            required
            fullWidth
            id="brand"
            label="Brand"
            value={product.brand}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            required
            fullWidth
            name="stock"
            label="Stock"
            id="stock"
            value={product.stock}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            required
            fullWidth
            name="price"
            label="Price (USD)"
            id="price"
            value={product.price}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'grey' } }}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item sm={8}>
           <TextField
              disabled
              fullWidth
              label="Thumbnail"
              multiline
              rows={5}
              InputLabelProps={{ style: { color: 'blue' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {product.thumbnail && 
                      
                        <img
                          src={URL.createObjectURL(product.thumbnail)}
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
                    }
                    

                     <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload file
                      <input type="file" accept="image/*" onChange={onThumbnailChange} style={{ display: 'none' }} />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
        </Grid>

        <Grid item sm={8}>
           <TextField
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
                        <IconButton
                          size="small"
                          onClick={() => handleDeleteImage(index)}
                          style={{
                            position: 'absolute',
                            bottom: '80%',
                            right: '0',
                            color: 'grey',
                          }}
                        >
                          <CancelSharpIcon />
                        </IconButton>
                        <img
                          src={URL.createObjectURL(image)}
                          alt="Product Thumbnail"
                          style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '20px',
                            border: '1px solid blue',
                            marginRight: '10px',
                          }}
                        />
                      </div>
                      ))}
                      <Button
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                        sx={{mt:2}}
                        
                      >
                        Upload file
                        <VisuallyHiddenInput type="file" accept="image/*" onChange={onImageChange} />
                      </Button>
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
          marginBottom: '20px',
          marginRight: '20px',
          marginLeft: '600px',
        }}
    >
      <Button
        sx={{backgroundColor: 'red', color: 'white', borderRadius: '10px', mr:1}}
        onClick={() => {navigate('/admin/products')}}
      >
        <CancelPresentationOutlinedIcon sx={{mr:1}}/>
        Cancel
      </Button>
      <Button 
        type="submit"
        sx={{backgroundColor: '#2686CB', color: 'white', borderRadius: '10px', marginLeft: 'auto'}}
      >
        <SendOutlinedIcon sx={{mr:1}} />
        Submit
      </Button>
    </div>
       
    </Box>
    </>
  );
}

export default AddProduct;