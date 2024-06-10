import React, { useEffect } from "react";
import "./SearchPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import ProductList from "../../components/ProductList/ProductList";
import {
  getAllSearchProducts,
  getAllSearchProductsStatus,
  fetchAsyncSearchProducts,
  clearSearchProducts,
} from "../../store/searchSlice";
import BreadcrumbComponent from "../../components/Breadcrumb/Breadcrumb";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { searchKeyword } = useParams();
  const searchProducts = useSelector(getAllSearchProducts);
  const searchProductsStatus = useSelector(getAllSearchProductsStatus);

  useEffect(() => {
    dispatch(clearSearchProducts());
    dispatch(fetchAsyncSearchProducts(searchKeyword));
  }, [searchKeyword, dispatch]);

  // if (searchProducts.length === 0) {
  //   return (
  //     <div className="container">
  //       <h3>Không tìm thấy sản phẩm</h3>
  //     </div>
  //   );
  // }

  return (
    <main>
      <div className="search-content ">
        <div className="container">
          <BreadcrumbComponent
            breadcrumbItems={[
              { title: "Home", href: "/" },
              { title: searchKeyword, href: `/search/${searchKeyword}` },
            ]}
          />
        </div>
        <div className="container">
          <div className="py-5">
            <div className="title-md">
              <h3>Kết quả tìm kiếm cho "{searchKeyword}"</h3>
            </div>
            <br />
            {searchProductsStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductList products={searchProducts} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
