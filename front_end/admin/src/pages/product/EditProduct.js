import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TopHeader from "../../components/TopHeader";
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';

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

  const onThumbnailChange = (e) => {
    setProduct({...product, thumbnail: e.target.files[0]});
  };

  const onImageChange = (e) => {
    const files = Array.from(e.target.files);
    setProduct(prevProduct => ({
      ...prevProduct,
      images: [...prevProduct.images, ...files]
    }));
  };

   const handleDeleteImage = (index) => {
    setProduct(prevProduct => ({
      ...prevProduct,
      images: prevProduct.images.filter((_, i) => i !== index)
    }));
  };

  const isString = (value) => typeof value === 'string';

  useEffect(() => {
    loadProduct();
  },[]);

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
          <p 
            style={{
              color: 'blue',
              width: '100px',
              marginLeft: '10px'
            }}
          >Thumbnail</p>
          <div>

            {isString(product.thumbnail) 
            ? (  
              <div
                style={{position: 'relative', display: 'inline-block'}}
              >

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

              </div>
              
            ) 
            : (  
              <div
                style={{position: 'relative', display: 'inline-block'}}
              >
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

              </div>
              )}
               
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              
            >
              Upload file
              <VisuallyHiddenInput type="file" accept="image/*"  onChange={onThumbnailChange} />
            </Button>
          </div>
          
        </Grid>

        <Grid item sm={8}>
          <p 
            style={{
              color: 'blue',
              width: '100px',
              marginLeft: '10px'
            }}
          >Images</p>

          <div>
           {product.images && product.images.map((image, index) => (
            isString(image) ? (
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
                  src={image}
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
              ) 
            : (  
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
            )
            ))}
            <br/>
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
          </div>
        </Grid>
        
        
      </Grid>
        
      <div
        style={{
            display: 'flex',
            justifyContent: 'flex-end',  
            marginTop: '20px',
            marginBottom: '20px',
            marginRight: '20px',
            marginLeft: '20px',
            width: '100px',        
          }}
      >
        <Button 
        type="submit"
        >
          Submit
        </Button>
      </div>
       
    </Box>
    </>
  );
}

export default EditProduct;