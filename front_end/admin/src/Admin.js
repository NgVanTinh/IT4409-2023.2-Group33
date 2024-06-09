import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Dashboard from './pages/dashboard/Dashboard'
import ProductPage from './pages/product/ProductPage';
import EditProduct from './pages/product/EditProduct';
import UserPage from './pages/user/UserPage';
import OrderPage from './pages/order/OrderPage';
import ViewOrder from './pages/order/ViewOrder';
import ViewProduct from './pages/product/ViewProduct';
import AddProduct from './pages/product/AddProduct';
import MainLayout from './components/MainLayout'
import Chart from './pages/chart/Chart';

const Admin = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainLayout/>}>
          <Route index element={<Dashboard />} />
          <Route path='products' element={<ProductPage/>}/> 
          <Route path='view-product/:id' element={<ViewProduct/>}/>
          <Route path='edit-product/:id' element={<EditProduct/>}/>
          <Route path='add-product' element={<AddProduct />}/>
          <Route path='users' element={<UserPage/>}/>
          <Route path='orders' element={<OrderPage/>}/>
          <Route path='statistics' element={<Chart/>}/>
          <Route path='view-order/:id' element={<ViewOrder/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );

}

export default Admin;
