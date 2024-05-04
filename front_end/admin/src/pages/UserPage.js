// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// // import { Link } from 'react-router-dom';
// import { Box, Typography, useTheme } from "@mui/material";
// import {Table, Space, Button, message} from 'antd'
// import {EditFilled, DeleteFilled } from '@ant-design/icons'
// import { tokens } from "../theme"
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
// function UserPage() {
//     const theme = useTheme();
//     const colors = tokens(theme.palette.mode);
//     const [users, setUsers] = useState([]);

//     // const loadUsers = async () => {
//     //     const result = await axios.get(`http://localhost:8080/products`);
//     //     setUsers(result.data);
//     // }

//     // useEffect(() => {
//     //     loadUsers();
//     // }, []);


//     // const deleteProduct = async (id) => {
//     //     await axios.delete(`http://localhost:8080/products/id=${id}`);
//     //     setTimeout(() => {
//     //         message.success("User deleted successfully!");
//     //     }, 2000);
//     //     loadUsers();

//     // }
    
//     // const expan = (item) => {
//     //     return {
//     //         expandedRowRender: (item) => <p>hihi</p>,
//     //         rowExpandable: (item) => item.name !== 'Not Expandable'
//     //     };

//     // };


//     const columns = [
//         {
//             title: 'ID',
//             dataIndex: 'id',
//             key: 'id',
//         },
//         {
//             title: 'First Name',
//             dataIndex: 'firstName',
//             key: 'name',
//         },
//         {
//             title: 'Last Name',
//             dataIndex: 'lastName',
//             key: 'name',
//         },
//         {
//             title: 'UserName',
//             dataIndex: 'userName',
//             key: 'userName',
//         },
//         {
//             title: 'Email',
//             dataIndex: 'email',
//             key: 'email',
//         },
//         Table.EXPAND_COLUMN,
//         {
//             title: 'action',
//             dataIndex: 'address',
//             key: 'address',
//             render: (_, item) => (
//             <Space size="middle">
//                 {/* <div>
//                     <Button type="dashed" 
//                         onClick={ (item) => expan(item) }  
//                     >
//                         <EyeTwoTone/>
//                     </Button>
//                 </div> */}
                
//                 <div>
//                     <Button type="primary"  >
//                         <EditFilled/>
//                     </Button>
//                 </div>
                
//                 <div>
//                     <Button type="primary" danger 
//                         // onClick={ () => deleteProduct(item.id)}
//                     >
//                         <DeleteFilled/>
//                     </Button>   
//                 </div>
                
//             </Space>
//             )
//         },
//     ];

    
    
//     return (
//         <Table virtual scroll={{ x: 200, y: 500 }}
//             dataSource={users} 
//             columns={columns} 
//         />
//   )
// }

// export default UserPage

import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { mockDataContacts } from "../data/mockData";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID" },
    {
      field: "name",
      headerName: "Name",
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
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      flex: 1,
    },
  ];

  return (
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
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
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
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;