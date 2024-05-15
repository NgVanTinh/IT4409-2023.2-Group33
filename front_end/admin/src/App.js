import { useState } from "react";
import './App.css';
import { Routes, Route} from 'react-router-dom';
import Sidebar from "./components/SideBar";
import Login from './pages/Login';
import ProductPage from './pages/product/ProductPage';
import EditProduct from './pages/product/EditProduct';
import UserPage from './pages/user/UserPage';
import OrderPage from './pages/order/OrderPage';
import ViewOrder from './pages/order/ViewOrder';
import ViewProduct from './pages/product/ViewProduct';
import AddProduct from './pages/product/AddProduct';
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">
            <Sidebar isSidebar={isSidebar} />
            <Routes>
              <Route path='/' element={<Login/>}/>
              <Route path='/products' element={<ProductPage/>}/> 
              <Route path='/view-product/:id' element={<ViewProduct/>}/>
              <Route path='/edit-product/:id' element={<EditProduct/>}/>
              <Route path='/add-product' element={<AddProduct />}/>
              <Route path='/users' element={<UserPage/>}/>
              <Route path='/orders' element={<OrderPage/>}/>
              <Route path='/view-order/:id' element={<ViewOrder/>}/>
            </Routes>
          </div>
      </ThemeProvider>
      
    </ColorModeContext.Provider>
    
    
  );
}

export default App;
