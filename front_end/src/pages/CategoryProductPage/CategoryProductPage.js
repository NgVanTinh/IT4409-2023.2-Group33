import React, { useEffect } from "react";
import "./CategoryProductPage.scss";
import ProductList from "../../components/ProductList/ProductList";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getAllProductsOfCategory,
  fetchAsyncProductsOfCategory,
  getCategoryProductsStatus,
  getAllCategories,
  fetchAsyncCategories,
} from "../../store/categorySlice";
import Loader from "../../components/Loader/Loader";
import { STATUS } from "../../utils/status";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import BreadcrumbComponent from "../../components/Breadcrumb/Breadcrumb";

export default function CategoryProductPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const categories = useSelector(getAllCategories);
  const productsOfCategory = useSelector(getAllProductsOfCategory);
  const categoryProductsStatus = useSelector(getCategoryProductsStatus);

  useEffect(() => {
    dispatch(fetchAsyncCategories());
    if (id) dispatch(fetchAsyncProductsOfCategory(id));
  }, [dispatch, id]);

  // Tìm tên danh mục dựa trên ID
  const categoryName = categories.find(
    (category) => category.id.toString() === id
  )?.name;

  return (
    <>
      <div className="container">
        <BreadcrumbComponent
          breadcrumbItems={[
            { title: "Home", href: "/" },
            { title: categoryName, href: `/category/${id}` },
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
                  {categoryName && categoryName.replace("-", " ")}
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
