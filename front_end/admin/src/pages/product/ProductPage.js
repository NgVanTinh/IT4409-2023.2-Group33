import { useState, useEffect } from "react";
import axios from "axios";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";

import IconButton from '@mui/material/IconButton';

import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';

import Header from "../../components/Header";

const ProductPage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
    const [movies, setMovies] = useState([]);

    const loadMovies = async () => {
        const result = await axios.get(`http://localhost:8080/api/movie/`);
        setMovies(result.data);
    }

    useEffect(() => {
        loadMovies();
    }, []);

    const deleteProduct = async (id) => {
      await axios.delete(`http://localhost:8080/api/movie/${id}`);
      loadMovies();

    }
     
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "movieName",
      headerName: "Movie Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "categories",
      headerName: "Categories",
      flex: 1,
    },
    {
      field: "directors",
      headerName: "Directors",
      headerAlign: "left",
      cellClassName: "director-column--cell",
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
      renderCell: () => {
        return (
          <Box>
            <IconButton aria-label="view" color="primary">
              < VisibilityIcon />
            </IconButton> 
            <IconButton aria-label="delete" color="error"
              onClick={() => deleteProduct()}
            >
              <DeleteIcon />
            </IconButton> 
            <IconButton aria-label="edit" color="success">
              <EditOutlinedIcon />
            </IconButton> 
          </Box>
        );
      },
      
    }
  ];

  return (
  <>
    <Header title="PRODUCTS" subtitle="Managing all products of the shop" />
      <Box m="10px">
        <Box
          m="25px 0 0 0"
          height="80vh"
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
            "& .director-column--cell": {
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
              // display: "inline-block",
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
            rows={movies}
            columns={columns} 
            components={{ Toolbar: GridToolbar }} 
          />
        </Box>
      </Box>
  </>
    
  );
};

export default ProductPage;
