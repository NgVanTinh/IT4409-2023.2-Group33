import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TopHeader from "../../components/TopHeader";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
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

const UserPage = () => {
  const [users, setUsers] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
  const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  const loadUsers = async () => {
      const result = await axios.get(`https://buckytank.shop/users`, config);
      const arr = result.data.filter(user => user.role !== 'admin');
      // console.log(arr);
      setUsers(arr);
      
  }

  const handleLock = async(id) => {
      await axios.put(`https://buckytank.shop/users/lock?id=${id}`);
  }

  const handleUnLock = async(id) => {
      await axios.put(`https://buckytank.shop/users/unlock?id=${id}`);
  }

  useEffect(() => {
      // if (localStorage.getItem('token') == null) {
      //     navigate("/login");
      // }
      loadUsers();
  });

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "username",
      headerName: "UserName",
      flex: 1,
      cellClassName: "username-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      cellClassName: "name-column--cell",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
     {
      field: "status",
      cellClassName: "status-column--cell",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "action",
      flex: 1,
      cellClassName: "action-column--cell",
      renderCell: params => {
        const id = params.row.id;
        const status = params.row.status;

        console.log(status);
        return (
          <Button
            // onClick={() => handleLock(params.row.id)}
            // onClick={() => setIsLocked(!isLocked)}
            onClick={() => console.log(params.row.id)}
          >
            <Box
            width="100px"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="left"
            boxShadow={5}
            {...!isLocked ? {backgroundColor : "#4cceac"} : {backgroundColor : "#E95153"}}
            borderRadius="4px"
            sx={{
              border: '1px solid white',
            }}
            >
                {isLocked 
                ? <LockOutlinedIcon
                    color="#c2c2c2"
                  /> 
                : <LockOpenOutlinedIcon 
                    color="#E95153" 
                  />}
             
            <Typography color="#e0e0e0" sx={{ ml: "5px" }}>
              {isLocked ? "Lock" : "Unlock" }
            </Typography>
            </Box>
          </Button>
          
        );
      },
    }
  ];

  return (
    <>
      <TopHeader title="NGƯỜI DÙNG" subtitle="Quản lý thông tin người dùng" />
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
            rows={users}
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
      </Box>
    </>
    
  );
};

export default UserPage;