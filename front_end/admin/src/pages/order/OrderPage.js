import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid' 
import {IconButton} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TopHeader from '../../components/TopHeader';
import {GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';

const CustomGridToolbar = () => {
  return (
    <GridToolbarContainer
      sx={{ backgroundColor: '#1890ff'}}
    >
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const OrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
      const result = await axios.get(`https://dummyjson.com/carts`);
      console.log(result.data.carts);
      setOrders(result.data.carts);
  }

  useEffect(() => {
      loadOrders();
  }, []);

  
  const columns = [
    { field: "id", id:"id", headerName: "ID", flex: 0.5 },
    {
      field: "createdTime",
      id:"createdTime",
      headerName: "Created Time",
      flex: 1,
    },
    {
      field: "userId",
      id:"user",
      headerName: "User",
      cellClassName: "user-column--cell",
      flex: 1,
    },
    {
      field: "totalQuantity",
      id: "totalQuantity",
      headerName: "Total Quantity",
      headerAlign: "left",
      cellClassName: "price-column--cell",
      flex: 1,
    },
    {
      field: "total",
      id: "total",
      headerName: "Total Price ($)",
      headerAlign: "left",
      cellClassName: "price-column--cell",
      flex: 1,
    },
    {
      field: "discountedTotal",
      id: "discountedTotal",
      headerName: "Discounted Total ($)",
      headerAlign: "left",
      cellClassName: "price-column--cell",
      flex: 1,
    },
    {
      field: "status",
      id:"status",
      headerName: "Status",
      headerAlign: "left",
      cellClassName: "price-column--cell",
      flex: 1,
    },
    {
      headerName: "Action",
      id:"action",
      flex: 1,
      cellClassName: "status-column--cell",
      renderCell: params => {
        return (
          <Box>
            <IconButton aria-label="view" color="primary"
              onClick={() => {
                let id = params.row.id ? params.row.id : null;
                
                navigate(`/view-order/${id}`)
              }}
            >
              < VisibilityOutlinedIcon />
            </IconButton> 
            
            {/* <IconButton aria-label="delete" color="error"
              onClick={() => deleteorder(params.row.id)}
            >
              <DeleteOutlinedIcon />
            </IconButton> 
            <Link to={`/edit-order/`}>
              <IconButton aria-label="edit" color="success">
              <EditOutlinedIcon/>
            </IconButton> 
            </Link> */}
          </Box>
        );
      },
      
    }
  ]
  return (
    <>
      <TopHeader title="ORDERS" subtitle="Managing all orders" />
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
              // "& .price-column--cell": {
              //   color:  "#94e2cd",
              // },
              "& .user-column--cell": {
                color:  "#868dfb",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#3e4396",
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#fff",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                display: "inline-block",
                backgroundColor: "#1890ff",
              },
              "& .MuiCheckbox-root": {
                color: `#b7ebde !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#e0e0e0 !important`,
              },
            }}
          >
            <DataGrid
              rows={orders}
              columns={columns}
              initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            // pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            slots={{ toolbar: CustomGridToolbar }}
            />
          </Box>
        </Box>

        {/* <Modal
            title="Order Information"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)} 
            footer={[  ]}
          >
            <Space direction="vertical">
              <Text type="secondary">ID: <Text strong>{order ? order.id : null}</Text></Text>
              <Text type="secondary">CREATED TIME: <Text strong>{order ? order.orderDate : null}</Text></Text>
              <Text type="secondary">USER: <Text strong>{order ? order.userId : null}</Text></Text>
              <Text type="secondary">TOTAL PRODUCTS: <Text strong>{order ? order.totalProducts : null}</Text></Text>
              <Text type="secondary">PRODUCTS:</Text>
              <Space direction="vertical" > 
                {order.products && order.products.map((product,id) => (
                    <Text strong style={{marginLeft: '30px'}}> {product.quantity} x {product.title} </Text>
                ))}
              </Space>
              <Text type="secondary">TOTAL QUANTITY: <Text strong>{order ? order.totalQuantity : null}</Text></Text>
              <Text type="secondary">TOTAL PRICE: <Text strong>{order ? order.total : null} $</Text></Text>
              <Text type="secondary">DISCOUNTED PRICE: <Text strong>{order ? order.discountedPrice : null}</Text></Text>
              <Text type="secondary">STATUS: <Text strong>{order ? order.status : null}</Text></Text>
            </Space>
          </Modal> */}
    </>
    
  )
}

export default OrderPage