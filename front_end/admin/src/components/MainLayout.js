import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

import { DashboardOutlined, ProductOutlined, UserOutlined, OrderedListOutlined } from '@ant-design/icons'

import { AiOutlineMenuUnfold } from "react-icons/ai";
import { AiOutlineMenuFold } from "react-icons/ai";

import { Button, Layout, Menu, theme } from 'antd';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" > 
           <h2 className='fs-5 text-center py-3 mb-0'> 
                <span className='lg-logo'>Bucky <span className='text-white'>Tank</span> </span>
                <span className='sm-logo'>B<span className='text-white'>T</span></span>
           </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
           onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}  
          items={[
            {
              key: '',
              icon: <DashboardOutlined />,
              label: 'dashboard',
            },
            {
              label: 'Products',
              icon: <ProductOutlined/>,
              key: 'products'
            },
            {
              label: 'Users',
              icon: <UserOutlined/>,
              key: 'users'
            },
            {
              label: 'Orders',
              icon: <OrderedListOutlined/>,
              key: 'orders'
            }
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
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
          <div className='d-flex gap-3 align-items-center'>
            <div></div>
            <div className='d-flex gap-3 align-items-center'>
              <div
              role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src='https://th.bing.com/th/id/R.a9722907a8d589d382e5138e48edc2b7?rik=KV0nur0qipcHnA&pid=ImgRaw&r=0' alt=''></img>
                
              </div>
              <div>
                <h5>ADMIN</h5>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Signout
                  </Link>
              </div>
            </div>

          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;