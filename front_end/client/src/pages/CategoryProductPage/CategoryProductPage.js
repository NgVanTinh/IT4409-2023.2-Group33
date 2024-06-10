import React, { useEffect } from "react";
import "./CategoryProductPage.scss";
import ProductList from "../../components/ProductList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllProductsOfCategory,
  fetchAsyncProductsOfCategory,
  getCategoryProductsStatus,
} from "../../store/categorySlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import BreadcrumbComponent from "../../components/Breadcrumb/Breadcrumb";

export default function CategoryProductPage() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const productsOfCategory = useSelector(getAllProductsOfCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    dispatch(fetchAsyncProductsOfCategory(category));
  }, [dispatch, category]);

  return (
    <>
      <div className="container">
        <BreadcrumbComponent
          breadcrumbItems={[
            { title: "Home", href: "/" },
            { title: category, href: `/category/:${category}` },
          ]}
        />
      </div>
      <div className="slider-wrapper">
        <HeaderSlider />
      </div>
      <div className="cat-products py-5 ">
        <div className="container">
          <div className="cat-products-content">
            <div className="title-md">
              <h3>
                Danh mục{": "}
                <span className="text-capitalize">
                  {category.replace("-", " ")}
                </span>
              </h3>
            </div>
            {categoryProductsStatus === STATUS.LOADING ? (
              <Loader />
            ) : (
              <ProductList products={productsOfCategory} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
