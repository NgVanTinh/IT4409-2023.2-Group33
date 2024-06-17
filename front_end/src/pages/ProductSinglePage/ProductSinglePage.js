import React, { useEffect, useState } from "react";
import "./ProductSinglePage.scss";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncProductSingle,
  fetchAsyncSimilarProducts,
  getProductSingle,
  getProductSingleStatus,
} from "../../store/productSlice";

import { STATUS } from "../../utils/status";
import Loader from "../../components/Loader/Loader";
import { formatPrice } from "../../utils/helpers";

import { FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import {
  addItemToCart,
  addToCart,
  getCartMessageStatus,
  setCartMessageOff,
  setCartMessageOn,
} from "../../store/cartSlice";
import CartMessage from "../../components/CartMessage/CartMessage";
import BreadcrumbComponent from "../../components/Breadcrumb/Breadcrumb";
import Swal from "sweetalert2";
import { Col, Row } from "antd";
import Rating from "../../components/Rating/Rating";
import ProductSimilar from "../../components/ProductSimilar/ProductSimilar";
import { getCookie } from "../../helpers/cookie";
import ProductSpecsTable from "../../components/ProductSpecsTable/ProductSpecsTable";
import ProductRatings from "../../components/ProductRatings/ProductRatings";
import { fetchProductRatings } from "../../store/orderSlice";

export default function ProductSinglePage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(getProductSingle);
  const productSingleStatus = useSelector(getProductSingleStatus);
  const [quantity, setQuantity] = useState(1);
  const token = getCookie("token");

  // Similar products
  const similarProducts = useSelector((state) => state.product.similarProducts);
  const similarProductsStatus = useSelector(
    (state) => state.product.similarProductsStatus
  );

  const ratedProducts = useSelector((state) => state.order.ratedProducts);
  const statusRatedProduct = useSelector(
    (state) => state.order.statusRatedProduct
  );

  const specsJson = product.spec;
  const specsObject = specsJson ? JSON.parse(specsJson) : null;

  useEffect(() => {
    dispatch(fetchAsyncProductSingle(id));
    dispatch(fetchAsyncSimilarProducts(id));
    dispatch(fetchProductRatings(id));
  }, [id, dispatch]);

  let discountedPrice = (
    product?.price *
    (1 - product?.discountPercentage / 100)
  ).toFixed(2);

  if (productSingleStatus === STATUS.LOADING) {
    return <Loader />;
  }

  const handleIncreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product?.stock) tempQty = product?.stock;
      return tempQty;
    });
  };

  const handleDecreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };

  const addToCartHandler = async (product) => {
    try {
      const response = await dispatch(
        addItemToCart({ productId: product.id, quantity: quantity })
      );

      if (response.meta.requestStatus === "fulfilled") {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sản phẩm đã được thêm vào giỏ hàng",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Có lỗi xảy ra khi thêm sản phẩm",
          showConfirmButton: true,
        });
      }
    } catch (error) {
      // Xử lý nếu có lỗi xảy ra trong quá trình gửi request
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Có lỗi xảy ra khi thêm sản phẩm",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <main>
      <div className="container">
        <BreadcrumbComponent
          breadcrumbItems={[
            { title: "Home", href: "/" },
            { title: product.title, href: `/product/${id}` },
          ]}
        />
      </div>
      <div className="product-single my-3">
        <div className="container">
          <div className="product-single-content bg-white grid">
            <div className="product-single-l">
              <div className="product-img">
                <div className="product-img-zoom">
                  <img
                    src={
                      product ? (product.images ? product.images[0] : "") : ""
                    }
                    alt=""
                    className="img-cover"
                  />
                </div>
                <div className="product-img-thumbs flex align-center my-2">
                  <div className="thumb-item">
                    <img
                      src={
                        product ? (product.images ? product.images[1] : "") : ""
                      }
                      alt=""
                      className="img-cover"
                    />
                  </div>
                  <div className="thumb-item">
                    <img
                      src={
                        product ? (product.images ? product.images[2] : "") : ""
                      }
                      alt=""
                      className="img-cover"
                    />
                  </div>
                  <div className="thumb-item">
                    <img
                      src={
                        product ? (product.images ? product.images[3] : "") : ""
                      }
                      alt=""
                      className="img-cover"
                    />
                  </div>
                  <div className="thumb-item">
                    <img
                      src={
                        product ? (product.images ? product.images[4] : "") : ""
                      }
                      alt=""
                      className="img-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="product-single-r">
              <div className="product-details font-manrope">
                <div className="title fs-20 fw-5">{product?.title}</div>
                <div>
                  <p className="para fw-3 fs-15">{product?.description}</p>
                </div>
                <div className="info flex align-center flex-wrap fs-14">
                  <div className="rating">
                    <span className="text-orange fw-5">Đánh giá:</span>
                    {/* <span className="mx-1">{product?.rating}</span> */}
                    <Rating
                      rating={product?.rating}
                      disabled={true}
                      tooltips={false}
                    />
                  </div>
                  <div className="vert-line"></div>
                  <div className="brand">
                    <span className="text-orange fw-5">Thương hiệu:</span>
                    <span className="mx-1">{product?.brand}</span>
                  </div>
                  <div className="vert-line"></div>
                  <div className="brand">
                    <span className="text-orange fw-5">Danh mục:</span>
                    <span className="mx-1 text-capitalize">
                      {product?.category
                        ? product.category.replace("-", " ")
                        : ""}
                    </span>
                  </div>
                </div>
                <div className="price">
                  <div className="flex align-center">
                    <div className="old-price text-gray">
                      {formatPrice(product?.price)}
                    </div>
                    <span className="fs-14 mx-2 text-dark">
                      Đã bao gồm cả thuế
                    </span>
                  </div>
                  <div className="flex align-center my-1">
                    <div className="new-price fw-5 font-poppins fs-24 text-orange">
                      {formatPrice(discountedPrice)}
                    </div>
                    <div className="discount bg-orange fs-13 text-white fw-6 font-poppins">
                      {product?.discountPercentage}% OFF
                    </div>
                  </div>
                </div>

                <div className="qty flex align-center my-4">
                  <div className="qty-text">Số lượng:</div>
                  <div className="qty-change flex align-center mx-3">
                    <button
                      className="qty-decrease flex align-center justify-center"
                      onClick={() => handleDecreaseQty()}
                    >
                      <FaMinus />
                    </button>
                    <div className="qty-value flex align-center justify-center">
                      {quantity}
                    </div>
                    <button
                      className="qty-increase flex align-center justify-center"
                      onClick={() => handleIncreaseQty()}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  {product?.stock === 0 ? (
                    <div className="qty-error text-uppercase bg-danger text-white fs-12 ls-1 mx-2 fw-5">
                      Sản phẩm này hiện đã hết hàng
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="btns">
                  {token ? (
                    <button className="add-to-cart-btn btn">
                      <FaShoppingCart />
                      <span
                        className="btn-text mx-2"
                        onClick={() => {
                          addToCartHandler(product);
                        }}
                      >
                        Thêm vào giỏ hàng
                      </span>
                    </button>
                  ) : (
                    <button className="add-to-cart-btn btn">
                      <FaShoppingCart />
                      <span className="btn-text mx-2">Thêm vào giỏ hàng</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
        <Row>
          <Col span={12}>
            <div className="title-md mx-3">
              <h3>Thông số kỹ thuật</h3>
            </div>
            <div className="mx-3 my-5">
              {specsObject && <ProductSpecsTable specs={specsObject} />}
            </div>
          </Col>
          <Col span={12}>
            <div className="title-md mx-3">
              <h3>Các sản phẩm tương tự</h3>
            </div>
            <div className="mx-3 my-3">
              <ProductSimilar products={similarProducts} />
            </div>
          </Col>
        </Row>
      </div>
      <div className="container my-3">
        <div className="title-md mx-3">
          <h3>Đánh giá từ khách hàng</h3>
        </div>
        <div className="mx-3 my-5">
          <ProductRatings ratedProducts={ratedProducts} />
        </div>
      </div>
    </main>
  );
}
