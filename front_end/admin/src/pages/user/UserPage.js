import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import TopHeader from "../../components/TopHeader";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import IconButton from '@mui/material/IconButton';

const UserPage = () => {
  const navigate = useNavigate()
  const [users, setUsers] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8080/api/user/`);
        setUsers(result.data);
        //  InstanceAxios.get('/user/', config)
        //     .then(function (response) {
        //         setUsers(response.data);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
        
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
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      cellClassName: "phone-column--cell",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
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
            backgroundColor = "#4cceac"
            borderRadius="4px"
          >
                <LockOutlinedIcon color="#c2c2c2" />
             
            <Typography color="#e0e0e0" sx={{ ml: "5px" }}>
              Lock
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
            "& .phone-column--cell": {
              color: "#868dfb",
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
