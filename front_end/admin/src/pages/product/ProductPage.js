import React, { useState } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { useEffect } from 'react'
import { Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid' 
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import IconButton from '@mui/material/IconButton';
import Header from "../../components/Header";

import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
const OrderPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [product, setProduct] = useState([]);

  // const loadProduct = async () => {
  //     const result = await axios.get(`https://dummyjson.com/products`);
  //     setProduct(result.data);
  // }

  const loadProduct = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products?limit=10');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  useEffect(() => {
      loadProduct();
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/api/movie/${id}`);
    loadProduct();

  }

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      headerAlign: "left",
      cellClassName: "price-column--cell",
      align: "left",
    },
    {
      field: "description",
      headerName: "Description",
      
      flex: 1,
    },
    {
      headerName: "Action",
      flex: 1,
      cellClassName: "action-column--cell",
      renderCell: params => {
        return (
          <Box>
            <IconButton aria-label="delete" color="error"
              onClick={() => deleteProduct(params.row.id)}
            >
              <DeleteOutlinedIcon />
            </IconButton> 

            <Link to={`/admin/view-product/${params.row.id}`}>
              <IconButton aria-label="view" color="primary">
                < VisibilityOutlinedIcon />
              </IconButton> 
            </Link>

            <Link to={`/edit-product/`}>
              <IconButton aria-label="edit" color="success">
              <EditOutlinedIcon />
            </IconButton> 
            </Link>

          </Box>
        );
      },
      
    }
  ]
  return (
    <>
      <Header title="PRODUCTS" subtitle="Managing all products " />
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
            rows={product}
            columns={columns}
          />
        </Box>
      </Box>
    </>
  )
}

export default OrderPage