import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid' 
import {IconButton, Button} from '@mui/material';
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
  const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  const loadOrders = async () => {
    const result = await axios.get(`https://buckytank.shop/api/orders`, config);
    const ordersData = result.data;
    
    // console.log(ordersData);
    ordersData.map((order) => {
      // console.log(user);
      const formattedDateTime = new Date(`${order.orderDate}`).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false });
      order.createdDate = formattedDateTime;
      order.total = order.total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      order.discountedPrice = order.discountedPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
    })
    // console.log(ordersData);
    

    setOrders(ordersData);
    // console.log(orders);
  }

  const Confirm = async (orderId) => {
    const formData = new FormData();
    formData.append("id", orderId);
    await axios.put(`https://buckytank.shop/api/orders/${orderId}/confirm`,formData, config)
    .then(() => {
      toast.info('Cập nhật trạng thái thành công!', {
        position: "top-right",
        autoClose:1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      loadOrders();
    })
    .catch(err =>{console.error(err)})
  }

  const Delivered = async (orderId) => {
    const formData = new FormData();
    formData.append("id", orderId);
    await axios.put(`https://buckytank.shop/api/orders/${orderId}/deliver`,formData, config)
    .then(() => {
      toast.info('Cập nhật trạng thái thành công!', {
        position: "top-right",
        autoClose:1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
      loadOrders();
    })
    .catch(err =>{console.error(err)})
  }

  useEffect(() => {
      loadOrders();
  });

  
  const columns = [
    { field: "id", id:"id", headerName: "ID", flex: 0.5 },
    {
      field: "createdDate",
      id:"createdDate",
      headerName: "Thời gian tạo",
      flex: 1,
    },
    {
      field: "userId",
      id:"userId",
      headerName: "ID người dùng",
      cellClassName: "user-column--cell",
      flex: 1,
    },
    {
      field: "totalQuantity",
      id: "totalQuantity",
      headerName: "Tổng số lượng sản phẩm",
      headerAlign: "left",
      cellClassName: "price-column--cell",
      flex: 1,
    },
    {
      field: "discountedPrice",
      id: "discountedPrice",
      headerName: "Tổng tiền sau giảm",
      headerAlign: "left",
      cellClassName: "price-column--cell",
      flex: 1,
    },
    {
      field: "status",
      id:"status",
      headerName: "Trạng thái",
      headerAlign: "left",
      cellClassName: "price-column--cell",
      flex: 1,
    },
    {
      field: "update",
      id: "update",
      headerName: "Cập nhật trạng thái",
      flex: 1,
      renderCell: (params) => {
        const status = params.row.status;
        let buttonText;
        let textColor;

        if (status === 'COMPLETED'){
          buttonText = 'Hoàn thành';
          textColor = '#11E80A';
        }
        else if( status === 'DELIVERED') {
          buttonText = 'Chờ xác nhận';
          textColor = '#F0C61E';
        } else if (status === 'SHIPPING') {
          buttonText = 'Đã giao';
          textColor = '#0EAB08';
        } else if (status === 'CREATED') {
          buttonText = 'Xác nhận';
          textColor = 'blue';
        } else {
          buttonText = 'UNKNOWN';
          textColor = 'red';
        }

        return (
          <Box>
            <Button
              aria-label="view"
              color="primary"
              disabled={status === 'COMPLETED' || status === 'DELIVERED'}
              onClick={() => {
                const id = params.row.id ? params.row.id : null;
                if (status === 'SHIPPING') {
                  Delivered(id);
                } else if (status === 'CREATED') {
                  Confirm(id);
                }
              }}
              style={{ color: textColor }}  
            >
              {buttonText}
            </Button>
          </Box>
        );
      },
    },
    {
      id:"action",
      flex: 1,
      cellClassName: "status-column--cell",
      renderCell: params => {
        return (
          <Box>
            <IconButton aria-label="view" color="primary"
              onClick={() => {
                let id = params.row.id ? params.row.id : null;
                
                navigate(`/admin/view-order/${id}`)
              }}
            >
              < VisibilityOutlinedIcon />
            </IconButton> 
          </Box>
        );
      },
      
    }
  ]
  return (
    <>
      <TopHeader title="ĐƠN HÀNG" subtitle="Quản lý thông tin các đơn hàng" />
        <Box m="20px">
          <Box
            m="40px 0 0 0"
            height="90vh"
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
            sx={{
              '& .MuiTablePagination-root': {
                color: 'white',
              },
            }}  
            pageSizeOptions={[5, 10, 20]}
            disableRowSelectionOnClick
            slots={{ toolbar: CustomGridToolbar }}
            />
          </Box>
          <ToastContainer/>
        </Box>
    </>
    
  )
}

export default OrderPage