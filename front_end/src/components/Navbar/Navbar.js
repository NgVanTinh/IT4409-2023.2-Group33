import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaBagShopping,
  FaMagnifyingGlass,
  FaCartShopping,
} from "react-icons/fa6";
// solve sidebar
import { setSidebarOn } from "../../store/sidebarSlice";
import { useSelector, useDispatch } from "react-redux";
// get all categories
import { getAllCategories } from "../../store/categorySlice";
// carts
import {
  fetchUserCart,
  getAllCarts,
  getCartItemsCount,
  getCartTotal,
} from "../../store/cartSlice";
import CartModal from "../CartModal/CartModal";
import SearchBar from "../SearchBar/SearchBar";
import SearchResultList from "../SearchResultList/SearchResultList";
import { getCookie } from "../../helpers/cookie";

export default function Navbar() {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const carts = useSelector(getAllCarts);
  const itemsCount = useSelector(getCartItemsCount);

  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const userId = getCookie("id");

  useEffect(() => {
    if (userId) dispatch(fetchUserCart(userId));
  }, [dispatch, userId, itemsCount]);

  return (
    <nav className="navbar">
      <div className="navbar-cnt flex align-center">
        <div className="brand-and-toggler flex align-center">
          <button
            onClick={() => dispatch(setSidebarOn())}
            type="button"
            className="sidebar-show-btn text-white"
          >
            <FaBars />
          </button>
          <Link to="/" className="navbar-brand flex align-center">
            <span className="navbar-brand-ico">
              <FaBagShopping />
            </span>
            <span className="navbar-brand-txt mx-2">
              <span className="fw-7">TShop</span>
            </span>
          </Link>
        </div>
        <div className="navbar-collapse w-100">
          <div className="navbar-search bg-white">
            <div className="flex align-center">
              <SearchBar
                setResults={setResults}
                setShowResults={setShowResults}
              />
            </div>
            {showResults && (
              <SearchResultList
                results={results}
                setShowResults={setShowResults}
              />
            )}
          </div>
          <ul className="navbar-nav flex align-center fs-13 fw-4 font-manrope">
            {/* taking only first 8 categories */}
            {categories.slice(0, 8).map((category, idx) => (
              <li className="nav-item no-wrap" key={idx}>
                <Link
                  to={`category/${category.id}`}
                  className="nav-link text-capitalize"
                >
                  {category.name.replace("-", " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-cart flex align-center">
          <Link to="/cart" className="cart-btn">
            <FaCartShopping />
            <div className="cart-items-value">{itemsCount}</div>
            <CartModal carts={carts} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
