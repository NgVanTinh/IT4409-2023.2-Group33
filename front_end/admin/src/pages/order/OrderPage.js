import React, { useState } from 'react'
import axios from 'axios'
import { Modal } from "antd"; 
import {Button} from '@mui/material/Button'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid' 
import {IconButton} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Space, Typography } from 'antd';
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

const { Text } = Typography;

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); 

  const loadOrders = async () => {
      const result = await axios.get(``);
      setOrders(result.data);
  }

  const loadOrder = async (id) => {
      const result = await axios.get(``);
      setOrder(result.data);
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
      field: "user",
      id:"user",
      headerName: "User",
      cellClassName: "user-column--cell",
      flex: 1,
    },
    {
      field: "totalPrice",
      id:"totalPrice",
      headerName: "Total Price",
      headerAlign: "left",
      cellClassName: "price-column--cell",
      flex: 1,
    },
    {
      headerName: "Status",
      id:"status",
      flex: 1,
      cellClassName: "status-column--cell",
      renderCell: params => {
        return (
          <Box>
            <IconButton aria-label="view" color="primary"
              onClick={() => {
                // let id = params.row.id ? params.row.id : null;
                
                loadOrder(params.row.id);
                setModalVisible(true);
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
              "& .price-column--cell": {
                color:  "#94e2cd",
              },
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

        <Modal
            title="Order Information"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)} 
            footer={[  ]}
          >
            <Space direction="vertical">
              <Text type="secondary">ID: <Text strong>{order ? order.id : null}</Text></Text>
              <Text type="secondary">CREATED TIME: <Text strong>{order ? order.title : null}</Text></Text>
              <Text type="secondary">USER: <Text strong>{order ? order.brand : null}</Text></Text>
              <Text type="secondary">TOTAL PRICE: <Text strong>{order ? order.category : null}</Text></Text>
              
              <Text type="secondary">STOCK: <Text strong>{order ? order.stock : null}</Text></Text>
              <Text type="secondary">TOTAL PRICE: <Text strong>{order ? order.price : null} $</Text></Text>
              <Text type="secondary">STATUS: <Text strong>{order ? order.description : null}</Text></Text>
            </Space>
          </Modal>
    </>
    
  )
}

export default OrderPage