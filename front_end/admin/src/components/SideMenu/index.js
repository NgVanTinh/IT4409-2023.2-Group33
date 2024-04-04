import React from 'react'
import {Menu} from 'antd'
import { useNavigate } from 'react-router-dom'
import { HomeOutlined, ProductOutlined, UserOutlined, OrderedListOutlined, BarChartOutlined } from '@ant-design/icons'
function SideMenu() {
  const navigate = useNavigate();
  return (
    <div className='SideMenu'>
      <Menu 
      onClick={(item) =>{
          navigate(item.key)
      }}
      items={[
        {
          label: 'Home',
          icon: <HomeOutlined/>,
          key: '/'
        },
        {
          label: 'Products',
          icon: <ProductOutlined/>,
          key: '/products'
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
          label: 'Chart',
          icon: <BarChartOutlined/>,
          key: '/chart'
        }
      ]}>

      </Menu>
    </div>
  )
}

export default SideMenu