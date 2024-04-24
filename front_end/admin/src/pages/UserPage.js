import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom';
import {Table, Space, Button, message} from 'antd'
import {EditFilled, DeleteFilled } from '@ant-design/icons'

function UserPage() {

    const [products, setProducts] = useState([]);

    const loadUsers = async () => {
        const result = await axios.get(`http://localhost:8080/products`);
        setProducts(result.data);
    }

    useEffect(() => {
        loadUsers();
    }, []);


    const deleteProduct = async (id) => {
        await axios.delete(`http://localhost:8080/products/id=${id}`);
        setTimeout(() => {
            message.success("User deleted successfully!");
        }, 2000);
        loadUsers();

    }
    
    // const expan = (item) => {
    //     return {
    //         expandedRowRender: (item) => <p>hihi</p>,
    //         rowExpandable: (item) => item.name !== 'Not Expandable'
    //     };

    // };


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'name',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'name',
        },
        {
            title: 'UserName',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        Table.EXPAND_COLUMN,
        {
            title: 'action',
            dataIndex: 'address',
            key: 'address',
            render: (_, item) => (
            <Space size="middle">
                {/* <div>
                    <Button type="dashed" 
                        onClick={ (item) => expan(item) }  
                    >
                        <EyeTwoTone/>
                    </Button>
                </div> */}
                
                <div>
                    <Button type="primary"  >
                        <EditFilled/>
                    </Button>
                </div>
                
                <div>
                    <Button type="primary" danger 
                        onClick={ () => deleteProduct(item.id)}
                    >
                        <DeleteFilled/>
                    </Button>   
                </div>
                
            </Space>
            )
        },
    ];

    
    
    return (
        <Table virtual scroll={{ x: 200, y: 500 }}
            dataSource={products} 
            columns={columns} 
        />
  )
}

export default UserPage