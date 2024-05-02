import "./App.scss";
// react router v6
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
// page
import {
  Home,
  Cart,
  CategoryProduct,
  ProductSingle,
  Search,
} from "./pages/index";

// components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import store from "./store/store";
import { Provider } from "react-redux";

function App() {
  return (
    <>
      <div className="App">
        <Provider store={store}>
          <BrowserRouter>
            <Header />
            <Sidebar />
            <Routes>
              {/* home page route  */}
              <Route path="/" element={<Home />} />
              {/* single product route  */}
              <Route path="/product/:id" element={<ProductSingle />} />
              {/* products in the category route  */}
              <Route path="/category/:category" element={<CategoryProduct />} />
              {/* cart route */}
              <Route path="/cart" element={<Cart />} />
              {/* search products route  */}
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </BrowserRouter>
        </Provider>
      </div>
    </>
  );
}

export default App;
