import { useState, useEffect } from "react";
import { Link , useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import Header from "../../components/Header";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from "@mui/material/IconButton";
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import IconButton from '@mui/material/IconButton';

const UserPage = () => {
  const theme = useTheme();
  const navigate = useNavigate()
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [isLocked, setIsLocked] = useState(false);
    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8080/api/user/`, config);
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
            backgroundColor = {colors.greenAccent[500]}
            borderRadius="4px"
          >
                <LockOutlinedIcon color={colors.grey[200]} />
             
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
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
      <Header title="USERS" subtitle="Managing all users information" />
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
            rows={users}
            columns={columns}
          />
        </Box>
      </Box>
    </>
    
  );
};

export default UserPage;
