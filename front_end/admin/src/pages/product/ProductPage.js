import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { useEffect } from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid' 
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import TopHeader from "../../components/TopHeader";
import { Button, Modal } from 'antd';
import { Carousel } from 'antd';
import { Image } from 'antd';
import { Space, Typography } from 'antd';
const { Text } = Typography;

const OrderPage = () => {
  const [product, setProduct] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); 

  const loadProducts = async () => {
        const result = await axios.get(`https://dummyjson.com/products?limit=50`);
        const {products} = result.data;
        setProducts(products);
  };

  const loadProduct = async (id) => {
        const result = await axios.get(`https://dummyjson.com/products/${id}`);
        // const {dataProduct } = result.data;
        setProduct(result.data);
  }

  useEffect(() => {
      loadProducts();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`https://dummyjson.com/products/${id}`);
    loadProducts();
  }

  const columns = [
    { 
      field: "id",
      key: "id",
      headerName: "ID", 
      flex: 0.5 },
    {
      field: "title",
      key: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "brand",
      key: "brand",
      headerName: "Brand",
      flex: 1,
    },
    {
      field: "category",
      key: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "price",
      key: "price",
      headerName: "Price",
      headerAlign: "left",
      cellClassName: "price-column--cell",
      align: "left",
    },
    {
      headerName: "Action",
      key: "action",
      flex: 1,
      cellClassName: "action-column--cell",
      renderCell: params => {
        // console.log(params.row.id);
        return (
          <Box>
            <IconButton aria-label="view" color="primary"
              
              onClick={() => {
                // console.log(params.row.id);
                loadProduct(params.row.id);
                setModalVisible(true);
              }} 
            >
              < VisibilityIcon />
            </IconButton> 

            <Link to={`/edit-product/`}>
              <IconButton aria-label="edit" color="success">
              <EditIcon />
            </IconButton> 
            </Link>
            <IconButton aria-label="delete" color="error"
              onClick={() => {
                  deleteProduct(params.row.id);
                }} 
            >
              <DeleteIcon />
            </IconButton> 
          </Box>
        );
      },
      
    }
  ]
  return (
    <>
      <TopHeader title="PRODUCTS" subtitle="Managing all products " />
      <Box m="20px">
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: "#12509C",
            },
            "& .phone-column--cell": {
              color: "#868dfb",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#3e4396",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#f2f0f0",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              display: "inline-block",
              backgroundColor: "#1890ff",
            },
            "& .MuiCheckbox-root": {
              color: "#b7ebde !important",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `"#e0e0e0" !important`,
            },
          }}
        >
          <DataGrid
            rows={products}
            columns={columns}
          />
        </Box>
      </Box>

      <Modal
            // title="Product Information"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)} 
            footer={[ 
              <Button className="btn btn-primary py-1" key="back" onClick={() => setModalVisible(false)}>
                  Close
              </Button>
            ]}
          >
            {/* Nội dung của hộp thoại */}
            <Carousel arrows infinite={false} dotWidth={20}>
                {product.images && product.images.map((imageUrl, index) => (
                  <Image
                    key={index} 
                    width={476}
                    height={300}
                    src={imageUrl}
                    alt={`Product Image ${index + 1}`}
                  />
                ))}
            </Carousel>
            <br/>
            <Space direction="vertical">
              <Text type="secondary">ID: <Text strong>{product ? product.id : null}</Text></Text>
              <Text type="secondary">TITLE: <Text strong>{product ? product.title : null}</Text></Text>
              <Text type="secondary">BRAND: <Text strong>{product ? product.brand : null}</Text></Text>
              <Text type="secondary">CATEGORY: <Text strong>{product ? product.category : null}</Text></Text>
              <Text type="secondary">DESCRIPTION: <Text strong>{product ? product.description : null}</Text></Text>
              <Text type="secondary">STOCK: <Text strong>{product ? product.stock : null}</Text></Text>
              <Text type="secondary">PRICE: <Text strong>{product ? product.price : null} $</Text></Text>
            </Space>
          </Modal>
    </>
  )
}

export default OrderPage