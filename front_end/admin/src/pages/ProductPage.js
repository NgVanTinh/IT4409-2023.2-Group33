import React, { useEffect, useState } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom';
import {Table, Space, Button, message} from 'antd'
import {EditFilled, DeleteFilled } from '@ant-design/icons'

function ProductPage() {

    const [products, setProducts] = useState([]);

    const loadProducts = async () => {
        const result = await axios.get(`http://localhost:8080/products`);
        setProducts(result.data);
    }

    useEffect(() => {
        loadProducts();
    }, []);


    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/product/id=${id}`);
        setTimeout(() => {
            message.success("Product deleted successfully!");
        }, 2000);
        loadProducts();

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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
            filters: [
              products.map((item, index) => {
                return {
                  text: item.brand,
                  value: item.brand,
                }
              })
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value, record) => record.name.startsWith(value),
            width: '30%',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
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
                        onClick={ () => deleteUser(item.id)}
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

export default ProductPage