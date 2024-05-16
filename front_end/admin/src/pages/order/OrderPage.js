import React, { useState } from 'react'
import axios from 'axios'

import { Button, Modal } from "antd"; // import Modal from antd

import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid' 
import {IconButton} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import TopHeader from '../../components/TopHeader';
const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState([]);
  const [modalVisible, setModalVisible] = useState(false); // state để điều khiển việc hiển thị của hộp thoại

  const loadOrders = async () => {
      const result = await axios.get(`http://localhost:8080/api/movie/`);
      setOrders(result.data);
  }

  const loadOrder = async (id) => {
      const result = await axios.get(`http://localhost:8080/api/movie/${id}`);
      setOrder(result.data);
  }

  useEffect(() => {
      loadOrders();
  }, []);

  
  const columns = [
    { field: "id", id:"id", headerName: "ID", flex: 0.5 },
    {
      field: "movieName",
      id:"movieName",
      headerName: "Movie Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "categories",
      id:"categories",
      headerName: "Categories",
      flex: 1,
    },
    {
      field: "directors",
      id:"directors",
      headerName: "Directors",
      headerAlign: "left",
      cellClassName: "director-column--cell",
      align: "left",
    },
    {
      field: "description",
      id:"description",
      headerName: "Description",
      flex: 1,
    },
    {
      headerName: "Action",
      id:"action",
      flex: 1,
      cellClassName: "action-column--cell",
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
              onClick={() => deleteProduct(params.row.id)}
            >
              <DeleteOutlinedIcon />
            </IconButton> 
            <Link to={`/edit-product/`}>
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
              "& .name-column--cell": {
                color:  "#94e2cd",
              },
              "& .phone-column--cell": {
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
            />
          </Box>
        </Box>

        <Modal
            title="Order Information"
            visible={modalVisible}
            onCancel={() => setModalVisible(false)} 
            footer={[ 
              <Button className="btn btn-primary py-1" key="back" onClick={() => setModalVisible(false)}>
                  Close
              </Button>
            ]}
          >
            {/* Nội dung của hộp thoại */}
            <p><b>Name:</b> {order ? order.movieName : null}</p>
            <p><b>Directors:</b> {order ? order.directors : null}</p>
            <p><b>Actors:</b> {order ? order.actors : null}</p>
          </Modal>
    </>
    
  )
}

export default OrderPage