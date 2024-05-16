import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TopHeader from "../../components/TopHeader";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';

// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import IconButton from '@mui/material/IconButton';

const UserPage = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
    // const config = {
    //     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    // };

    const loadUsers = async () => {
        const result = await axios.get(`https://dummyjson.com/users?limit=50`);
        const {users} = result.data;
        setUsers(users);
        
    }

  useEffect(() => {
      if (localStorage.getItem('token') == null) {
          navigate("/login");
      }
      loadUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    {
      field: "firstName",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lastName",
      headerName: "Last Name",
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
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
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
      headerName: "Action",
      flex: 1,
      cellClassName: "action-column--cell",
      renderCell: params => {
        return (
          <Button
            // onClick={() => handleActive(params.row.id)}
          >
            <Box
            width="100%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            {...!isLocked ? {backgroundColor : "#4cceac"} : {backgroundColor : "#E95153"}}
            borderRadius="4px"
            >
                {isLocked 
                ? <LockOutlinedIcon
                    onClick={() =>{setIsLocked(false)}}
                    color="#c2c2c2"
                  /> 
                : <LockOpenOutlinedIcon 
                    onClick={() =>{setIsLocked(true)}}
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
      <TopHeader title="USERS" subtitle="Managing all users information" />
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
              color: "#a3a3a3",
            },
            "& .username-column--cell": {
              color: "#2679E0",
            },
            // "& .phone-column--cell": {
            //   color: "#868dfb",
            // },
             "& .status-column--cell": {
              ...isLocked ? {color: "#DA3B1F"} : {color: "#51E080"},
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#3e4396",
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#fff",
            },
            "& .MuiDataGrid-footerContainer": {
              // borderTop: "none",
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
          />
        </Box>
      </Box>
    </>
    
  );
};

export default UserPage;
