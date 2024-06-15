import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

import IconButton from '@mui/material/IconButton';
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
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


const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productSpecs, setProductSpecs] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(1);
  const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };
  const [categories, setCategories] = useState([]);
  const Category = [
      {
          id: 'phone',
          name: 'Điện thoại',
          specs: [
              { name: 'Màn hình', type: 'text' },
              { name: 'Hệ điều hành', type: 'text' },
              { name: 'Camera sau', type: 'text' },
              { name: 'Camera trước', type: 'text' },
              { name: 'Chip', type: 'text' },
              { name: 'RAM', type: 'text' },
              { name: 'Dung lượng lưu trữ', type: 'text' },
              { name: 'Sim', type: 'text' },
              { name: 'Pin, Sạc', type: 'text' },
          ],
      },
      {
          id: 'tablet',
          name: 'Máy tính bảng',
          specs: [
              { name: 'Màn hình', type: 'text' },
              { name: 'Hệ điều hành', type: 'text' },
              { name: 'Camera sau', type: 'text' },
              { name: 'Camera trước', type: 'text' },
              { name: 'Chip', type: 'text' },
              { name: 'RAM', type: 'text' },
              { name: 'Dung lượng lưu trữ', type: 'text' },
              { name: 'Pin, Sạc', type: 'text' },
          ],
      },
      {
          id: 'power',
          name: 'Sạc dự phòng',
          specs: [
              { name: 'Hiệu suất sạc', type: 'text' },
              { name: 'Dung lượng pin', type: 'text' },
              { name: 'Thời gian sạc đầy pin', type: 'text' },
              { name: 'Nguồn vào', type: 'text' },
              { name: 'Nguồn ra', type: 'text' },
              { name: 'Lõi pin', type: 'text' },
              { name: 'Công nghệ/Tiện ích', type: 'text' },
              { name: 'Kích thước', type: 'text' },
              { name: 'Khối lượng', type: 'text' },
          ],
      },
      {
          id: 'airphone',
          name: 'Tai nghe',
          specs: [
              { name: 'Thời gian tai nghe', type: 'text' },
              { name: 'Thời gian hộp sạc', type: 'text' },
              { name: 'Cổng sạc', type: 'text' },
              { name: 'Công nghệ âm thanh', type: 'text' },
              { name: 'Tương thích', type: 'text' },
              { name: 'Tiện ích', type: 'text' },
              { name: 'Hỗ trợ kết nối', type: 'text' },
              { name: 'Điều khiển bằng', type: 'text' },
          ],
      },
      {
          id: 'adapter',
          name: 'Củ sạc',
          specs: [
              { name: 'Model', type: 'text' },
              { name: 'Chức năng', type: 'text' },
              { name: 'Đầu vào', type: 'text' },
              { name: 'Đầu ra', type: 'text' },
              { name: 'Dòng sạc tối đa', type: 'text' },
              { name: 'Kích thước', type: 'text' },
              { name: 'Công nghệ/Tiện ích', type: 'text' },
          ],
      },
      {
          id: 'bao-da',
          name: 'Bao dao',
          specs: [
              
          ],
      },
      {
          id: 'gia-do',
          name: 'Giá đỡ',
          specs: [
              
          ],
      },
      {
          id: 'line',
          name: 'Dây sạc',
          specs: [
              { name: 'Công suất tối đa', type: 'text' },
              { name: 'Chức năng', type: 'text' },
              { name: 'Đầu vào', type: 'text' },
              { name: 'Đầu ra', type: 'text' },
              { name: 'Jack kết nối', type: 'text' },
              { name: 'Độ dài dây', type: 'text' },
          ],
      }, 
  ];
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    image: "",
    rating: "",
    spec: ""
  });

  const loadCategores = async () => {
    const result = await axios.get('https://buckytank.shop/products/categories', config);
    setCategories(result.data);
    // console.log(result.data);
  }

  const loadProduct = async () => {
      const result = await axios.get(`https://buckytank.shop/products/${id}`);
      setProduct(result.data);
      console.log("load product: ", result.data.category);
      categories && categories.map((category) => {
        console.log("category: ", category.name)
        if(category.name === result.data.category) {
          setSelectedCategory(category.id);
        }
      })
      // console.log(selectedCategory);
    };
  
  const handleCategoryChange = (event) => {
    
    const categoryId = event.target.value;
    // const obj = Category[categoryId-1];
    // console.log("name: ", obj.name);
    // setCategories(obj.name)
    setSelectedCategory(categoryId);
    setProductSpecs({});
  };

  const handleSpecChange = (specName, value) => {
    setProductSpecs((prevSpecs) => ({
      ...prevSpecs,
      [specName]: value,
    }));
  };

  let numRow = 1;
  const currentCategory = Category[selectedCategory - 1];
  if(currentCategory.name === 'Điện thoại') numRow = 21;
  else if(currentCategory.name === 'Máy tính bảng') numRow = 19;
  else if(currentCategory.name === 'Sạc dự phòng') numRow = 21;
  else if(currentCategory.name === 'Tai nghe') numRow = 19;
  else if(currentCategory.name === 'Củ sạc') numRow = 16;
  else if(currentCategory.name === 'Bao da') numRow = 1;
  else if(currentCategory.name === 'Giá đỡ') numRow = 1;
  else if(currentCategory.name === 'Dây sạc') numRow = 14; 

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

  const onSubmit = async (e) => {
    // console.log(product)
    e.preventDefault();
    const str =  JSON.stringify(productSpecs)
    // console.log(str)
    const updatedProduct = {...product, spec: str, category: currentCategory.name };
    // setProduct({...product, spec: str})
    console.log(updatedProduct);
    console.log(product);
    const formData = new FormData();
    formData.append('title', updatedProduct.title);
    formData.append('price', updatedProduct.price);
    formData.append('description', updatedProduct.description);
    formData.append('discountPercentage', updatedProduct.discountPercentage);
    formData.append('stock', updatedProduct.stock);
    formData.append('brand', updatedProduct.brand);
    formData.append('category', updatedProduct.category);
    formData.append('rating', updatedProduct.rating);
    formData.append('spec', updatedProduct.spec);
    formData.append('thumbnail', updatedProduct.thumbnail);
    // formData.append('image', updatedProduct.image[0]);
    // for (let i = 1; i < updatedProduct.image.length; i++) {
    //   formData.append('image', updatedProduct.image[i]);
    // }
    
    // await axios.put(`https://buckytank.shop/products/${id}`, formData, config)
    // .then(res => {
    //   toast.info('Cập nhật thành công!', {
    //     position: "top-center",
    //     autoClose: 1000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "dark",
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    // })
    // navigate(`/admin/view-product/${id}`);
  };

  const isString = (value) => typeof value === 'string';

  useEffect(() => {
    loadCategores();
    loadProduct();
  },[]);

  return (
    
    <>
    <TopHeader title="SẢN PHẨM" subtitle="Cập nhật thông tin sản phẩm" />
    <Box component="form"  onSubmit={onSubmit} sx={{display: 'flex', flexDirection: 'column',  justifyContent: 'center', alignItems: 'center'}} >
      <Grid container spacing={2} sx={{display: 'flex',  justifyContent: 'center', alignItems: 'center'}}>
        <Grid item sm={8} >
          <TextField
            fullWidth={true}
            name="title"
            required
            id="title"
            label="Tên sản phẩm"
            autoFocus
            value={product.title}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'black' } }}
            onChange={onInputChange}
          />
        </Grid>

        <Grid item sm={8}>
          <TextField
            name="description"
            required
            fullWidth
            id="description"
            label="Mô tả"
            value={product.description}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'black' } }}
            multiline
            onChange={onInputChange}
          />
        </Grid>

        <Grid item sm={8}>
          <FormControl required fullWidth>
            <InputLabel id="category-label" style={{ color: 'blue' }}>Danh mục</InputLabel>
            <Select
              labelId="category-label"
              id="category"
              name="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              label="Danh mục"
              InputLabelProps={{ style: { color: 'blue' } }}
              InputProps={{ style: { color: 'red' } }}
            >
              {categories && categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item sm={8}>
          <TextField
            name="brand"
            required
            fullWidth
            id="brand"
            label="Hãng"
            value={product.brand}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'black' } }}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            required
            fullWidth
            name="stock"
            label="Số lượng"
            id="stock"
            value={product.stock}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'black' } }}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            fullWidth
            name="discountPercentage"
            label="Phần trăm giảm giá(%)"
            id="discountPercentage"
            value={product.discountPercentage}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'black' } }}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item sm={8}>
          <TextField
            required
            fullWidth
            name="price"
            label="Giá (VNĐ)"
            id="price"
            value={product.price}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'black' } }}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item sm={8} >
          <TextField
            fullWidth={true}
            name="rating"
            required
            id="rating"
            label="Đánh giá"
            autoFocus
            value={product.rating}
            InputLabelProps={{ style: { color: 'blue' } }}
            InputProps={{ style: { color: 'black' } }}
            onChange={onInputChange}
          />
        </Grid>
        <Grid item sm={8} >
          <TextField
            fullWidth={true}
            name="spec"
            id="spec"
            label="Thông số"
            autoFocus
            InputLabelProps={{ style: { color: 'blue' } }}
            multiline
            rows={numRow}
            InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {currentCategory && (
                      <div>
                        {currentCategory.specs && currentCategory.specs.map((spec) => (
                          // <div key={spec.name}>
                          //   <label>
                          //     {spec.name}:
                          //     <input
                          //       type={spec.type}
                          //       value={productSpecs[spec.name] || ''}
                          //       onChange={(e) =>
                          //         handleSpecChange(spec.name, e.target.value)
                          //       }
                          //     />
                          //   </label>
                          // </div>
                          <div>
                          <TextField
                          variant="standard"
                          // fullWidth={true}
                          width="800px"
                          multiline
                          name={spec.name}
                          required
                          id={spec.name}
                          label={spec.name}
                          autoFocus
                          value={productSpecs[spec.name] || ''}
                          InputLabelProps={{ style: { color: 'blue' } }}
                          InputProps={{ style: { color: 'black' } }}
                          onChange={(e) =>
                            handleSpecChange(spec.name, e.target.value)
                          }
                          /> 
                          </div>                         
                        ))}
                      </div>
                    )}
                  </InputAdornment>
                ),
              }}
          />
          
        </Grid>
        <Grid item sm={8}>
           <TextField
              disabled
              fullWidth
              label="Ảnh đại diện"
              multiline
              rows={5}
              InputLabelProps={{ style: { color: 'blue' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {isString(product.thumbnail) ? (
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
                    ) : (
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
                    )}
                    <Button
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                    >
                      Tải tệp 
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
              label="Hình ảnh chi tiết"
              multiline
              rows={5}
              InputLabelProps={{ style: { color: 'blue' } }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
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
                                borderRadius: '10px',
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
                              borderRadius: '10px',
                              border: '1px solid blue',
                              marginRight: '10px',
                            }}
                          />
                        </div>
                      )
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
        {/* <ToastContainer/> */}
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
        sx={{backgroundColor: 'red', color: 'white', borderRadius: '10px', mr:1, padding: '10px'}}
        onClick={() => {navigate('/admin/products')}}
      >
        <CancelPresentationOutlinedIcon sx={{mr:1}}/>
        Hủy bỏ
      </Button>
      <Button 
        type="submit"
        sx={{backgroundColor: '#2686CB', color: 'white', borderRadius: '10px', marginLeft: 'auto', padding: '10px'}}
      >
        <SendOutlinedIcon sx={{mr:1}} />
        Tạo mới
      </Button>
    </div>
       <ToastContainer/>
    </Box>
    </>
  );
}

export default EditProduct;

