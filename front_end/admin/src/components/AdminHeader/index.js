import { UserOutlined } from '@ant-design/icons'
import {Avatar, Space, Typography, Image } from 'antd'
import React from 'react'

function AdminHeader() {
  return (
    <div className='AdminHeader'>
      <Image 
      width = {65}
      src = "https://th.bing.com/th/id/R.5ca7598094fd31a541a980e0fb9265be?rik=nMPAMw9BVCd%2bVA&riu=http%3a%2f%2fpvpsit.ac.in%2fcomplaintbox%2fadmin.png&ehk=r7gsoK2xBOgEn4Yg77MGh4tjddhzHAGgWe3e%2fR4Zl14%3d&risl=&pid=ImgRaw&r=0"
      />
      <Typography.Title>
        Admin Header
      </Typography.Title>
      <Space>
          <Avatar size="large" icon={<UserOutlined />} />
          
      </Space>
    </div>
  )
}

export default AdminHeader