import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import MainLayout from './components/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import ProductPage from './pages/product/ProductPage';
import UserPage from './pages/user/UserPage';
import OrderPage from './pages/order/OrderPage';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/admin' element={<MainLayout/>}>
          <Route index element={<Dashboard />} />
          <Route path='products' element={<ProductPage/>}/>
          <Route path='users' element={<UserPage/>}/>
          <Route path='orders' element={<OrderPage/>}/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
