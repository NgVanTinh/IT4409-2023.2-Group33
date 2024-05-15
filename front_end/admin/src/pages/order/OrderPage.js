import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid' 
import {IconButton} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import Header from '../../components/Header';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
const OrderPage = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [oders, setOrders] = useState([]);

  const loadOrder = async () => {
      const result = await axios.get(`http://localhost:8080/api/movie/`);
      setOrders(result.data);
  }

  useEffect(() => {
      loadOrder();
  }, []);

  // const deleteProduct = async (id) => {
  //   await axios.delete(`http://localhost:8080/api/movie/${id}`);
  //   loadOrder();

  // }
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
            <Link to={`/admin/view-order/${params.row.id}`}>
              <IconButton aria-label="view" color="primary">
                < VisibilityOutlinedIcon />
              </IconButton> 
            </Link>
            
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
      <Header title="ORDERS" subtitle="Managing all orders" />
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
                color: colors.greenAccent[300],
              },
              "& .phone-column--cell": {
                color: colors.blueAccent[400],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                display: "inline-block",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={oders}
              columns={columns}
            />
          </Box>
        </Box>
    </>
    
  )
}

export default OrderPage