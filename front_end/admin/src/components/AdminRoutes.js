import React from 'react'
import {Route, Routes} from 'react-router-dom'
import HomePage from './HomePage'
import ProductPage from './ProductPage'
import UserPage from './UserPage'
import OrderPage from './OrderPage'
import Chart from './Chart'
function AdminRoutes() {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/products' element={<ProductPage/>}/>
        <Route path='/users' element={<UserPage/>}/>
        <Route path='/orders' element={<OrderPage/>}/>
        <Route path='/chart' element={<Chart/>}/>
    </Routes>
  )
}

export default AdminRoutes