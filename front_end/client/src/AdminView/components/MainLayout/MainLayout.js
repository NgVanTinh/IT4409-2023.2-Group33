import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './MainLayout.css';
import { Outlet } from "react-router-dom";

import { DashboardOutlined, ProductOutlined, UserOutlined, BellOutlined,
        OrderedListOutlined, AppstoreAddOutlined, AppstoreOutlined, BarChartOutlined, LogoutOutlined  } from '@ant-design/icons'

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";
import { Button, Layout, Menu, Avatar, Typography } from 'antd';

const { Header, Sider, Content } = Layout;

const MainLayout = () => {  
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    let pathName;
    const path = location.pathname;
    if(path === '/') pathName = '';
    else pathName = path;
    // console.log(path);
    setSelectedKey(pathName);
  }, [location.pathname]);

  return (
    <Layout>
      <Sider theme='dark' trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" > 
           <h2 style={{fontSize: '40px', display: 'flex', justifyContent: 'center'}}> 
           {!collapsed 
           ? 
              <span className='lg-logo'>Bucky <span className='text-white'>Tank</span> </span>
           :
              <span className='sm-logo 50px'>B<span className='text-white'>T</span></span>
           }    
           </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKey}
          defaultOpenKeys={['/']}
          onClick={({ key }) => {
              navigate(key);
            }}  
          items={[
            {
              key: '',
              icon: <DashboardOutlined />,
              label: 'Dashboard'
            },
            {
              label: 'Products',
              icon: <ProductOutlined/>,
              key: '/products',
            },
            {
              label: 'Users',
              icon: <UserOutlined/>,
              key: '/users'
            },
            {
              label: 'Orders',
              icon: <OrderedListOutlined/>,
              key: '/orders'
            },
            {
              label: 'Statistics',
              icon:<BarChartOutlined />,
              key: '/statistics'
            },
            {
              label: 'Log out',
              icon:<LogoutOutlined />,
              key: '/login'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          
        </Header>

        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;

