import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TopHeader from "../../components/TopHeader";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import {GridToolbarContainer, GridToolbarExport, GridToolbarColumnsButton, GridToolbarFilterButton, GridToolbarDensitySelector } from '@mui/x-data-grid';
import {toast, ToastContainer} from 'react-toastify'
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
  const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  const loadUsers = async () => {
      const result = await axios.get(`https://buckytank.shop/users`, config);
      const arr = result.data.filter(user => user.id !== 1);
      console.log(arr);
      setUsers(arr);
      
  }

  const handleLock = async(id) => {
    const formData = new FormData();
    formData.append('id', id);
    await axios.put(`https://buckytank.shop/users/lock`,formData, config)
    .then(() => {
      toast.info('Khóa tài khoản thành công!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
      loadUsers();
    })
    .catch(err => {console.log(err)})
  }

  const handleUnLock = async(id) => {
    const formData = new FormData();
    formData.append('id', id);
    await axios.put(`https://buckytank.shop/users/unlock`,formData, config)
    .then(() => {
      toast.info('Mở khóa tài khoản thành công!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
      loadUsers();
    })
    .catch(err => {console.log(err)})
  }

  useEffect(() => {
      loadUsers();
  },[]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "fullname",
      headerName: "Tên người dùng",
      flex: 1,
    },
    {
      field: "username",
      headerName: "Tên tài khoản",
      flex: 1,
      cellClassName: "username-column--cell",
    },
    {
      field: "phone",
      headerName: "Số điện thoại",
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
      headerName: "Trạng thái",
      flex: 1,
      renderCell: params => {
        const status = params.row.locked;
        // console.log(status);
        return (
          <Box>
            {status === 'true'
            ? 
              <p style={{color: 'red'}}>Locked</p>
            :
              <p style={{color: 'green'}}>Active</p>}
          </Box>
          
        )
      }
    },
    {
      flex: 1,
      cellClassName: "action-column--cell",
      renderCell: params => {
        const status = params.row.locked;
        // console.log(params.row.id, params.row.locked)
        return (
          <Button
              onClick={() => {
                const sta = params.row.locked;
                // console.log(sta);
                if (sta === 'true') {
                  handleUnLock(params.row.id);
                } else {
                  handleLock(params.row.id);
                }
              }}
          >
            <Box
            width="100px"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="left"
            boxShadow={5}
            {...(status === 'true') ? {backgroundColor : "#4cceac"} : {backgroundColor : "#E95153"}}
            borderRadius="4px"
            sx={{
              border: '1px solid white',
            }}
            >
                {status 
                ? <LockOutlinedIcon
                    color="#c2c2c2"
                  /> 
                : <LockOpenOutlinedIcon 
                    color="#E95153" 
                  />}
             
            <Typography color="#e0e0e0" sx={{ ml: "5px" }}>
              {status === 'false' ? "Lock" : "Unlock" }
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
        <ToastContainer/>
      </Box>
    </>
    
  );
};

export default UserPage;
