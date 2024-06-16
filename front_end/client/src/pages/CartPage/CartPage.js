import React, { useEffect, useState } from "react";
import "./CartPage.scss";
import { useSelector, useDispatch } from "react-redux";
import { shopping_cart } from "../../utils/images";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import {
  getAllCarts,
  removeFromCart,
  clearCart,
  fetchUserCart,
  addItemToCart,
  removeItemFromCart,
  clearCartAsync,
} from "../../store/cartSlice";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import BreadcrumbComponent from "../../components/Breadcrumb/Breadcrumb";
import { getCookie } from "../../helpers/cookie";
import Loader from "../../components/Loader/Loader";
import OrderModal from "../../components/Order/OrderModal";
import Swal from "sweetalert2";
import { createOrder, createVNPAYPayment } from "../../store/orderSlice";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount, loading } = useSelector(
    (state) => state.cart
  );

  const userId = getCookie("id");

  useEffect(() => {
    if (userId) dispatch(fetchUserCart(userId));
  }, [dispatch, userId, itemsCount, totalAmount]);

  const updateItemQuantity = async (productId, quantityChange) => {
    try {
      await dispatch(addItemToCart({ productId, quantity: quantityChange }));
    } catch (error) {
      console.error(
        "Có lỗi xảy ra khi cập nhật số lượng sản phẩm: ",
        error.message
      );
    }
  };

  const [showOrderModal, setShowOrderModal] = useState(false);
  const handleOrderSubmit = async (orderData) => {
    console.log(orderData);
    try {
      const orderResponse = await dispatch(createOrder(orderData)).unwrap();

      if (orderData.method === "VNPay") {
        const orderId = orderResponse.id;
        const paymentResponse = await dispatch(
          createVNPAYPayment(orderId)
        ).unwrap();
        if (paymentResponse.payURL) {
          window.location.href = paymentResponse.payURL;
          dispatch(fetchUserCart(userId));
          return;
        }
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đặt hàng thành công",
          showConfirmButton: false,
          timer: 1500,
        });
        dispatch(fetchUserCart(userId));
        navigate(`/infoUser`);
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Đặt hàng thất bại",
        showConfirmButton: false,
        timer: 1500,
      });
      console.error("Có lỗi xảy ra khi tạo đơn hàng: ", error.message);
    }
    setShowOrderModal(false);
  };

  if (loading) {
    return <Loader />;
  }

  if (carts.length === 0) {
    return (
      <div className="container my-5">
        <div className="empty-cart flex justify-center align-center flex-column font-manrope">
          <img src={shopping_cart} alt="" />
          <span className="fw-6 fs-15 text-gray">
            Giỏ hàng của bạn đang trống
          </span>
          <Link to={"/"} className="shopping-btn bg-orange text-white fw-5">
            Mua sắm ngay thôi
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <div className="cart-ctable">
          <div className="cart-chead bg-white">
            <div className="cart-ctr fw-6 font-manrope fs-15">
              <div className="cart-cth">
                <span className="cart-ctxt">STT</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Tên sản phẩm</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Hình ảnh</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Đơn giá</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Số lượng</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Tổng tiền</span>
              </div>
              <div className="cart-cth">
                <span className="cart-ctxt">Hành động</span>
              </div>
            </div>
          </div>
          <div className="cart-cbody bg-white">
            {carts.length > 0 &&
              carts.map((cart, idx) => {
                return (
                  <div className="cart-ctr py-4" key={cart?.id}>
                    <div className="cart-ctd">
                      <span className="cart-ctxt">{idx + 1}</span>
                    </div>
                    <div className="cart-ctd">
                      <span className="cart-ctxt">{cart?.title}</span>
                    </div>
                    <div className="cart-ctd">
                      <span className="cart-ctxt">
                        <img
                          src={cart?.thumbnail}
                          alt=""
                          style={{ width: 75, height: 75 }}
                        />
                      </span>
                    </div>
                    <div className="cart-ctd">
                      <span className="cart-ctxt">
                        {formatPrice(cart?.discountedPrice)}
                      </span>
                    </div>
                    <div className="cart-ctd">
                      <div className="qty-change flex align-center">
                        <button
                          className="qty-decrease flex align-center justify-center"
                          onClick={() => updateItemQuantity(cart?.id, -1)}
                        >
                          <FaMinus />
                        </button>
                        <div className="qty-value flex align-center justify-center">
                          {cart?.quantity}
                        </div>
                        <button
                          className="qty-increase flex align-center justify-center"
                          onClick={() => updateItemQuantity(cart?.id, 1)}
                        >
                          <FaPlus />
                        </button>
                      </div>
                    </div>
                    <div className="cart-ctd">
                      <span className="cart-ctxt text-orange fw-5">
                        {formatPrice(cart?.discountedPrice)}
                      </span>
                    </div>
                    <div className="cart-ctd">
                      <button
                        className="delete-btn text-dark"
                        onClick={() => dispatch(removeItemFromCart(cart?.id))}
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="cart-cfoot flex align-start justify-between py-3 bg-white">
            <div className="cart-cfoot-l">
              <button
                className="clear-cart-btn text-danger fs-15 text-uppercase fw-4"
                onClick={() => dispatch(clearCartAsync())}
              >
                <FaTrashAlt />
                <span className="mx-1">Xóa toàn bộ sản phẩm</span>
              </button>
            </div>
            <div className="cart-cfoot-r flex flex-column justify-end">
              <div className="total-txt flex align-center justify-end">
                <div className="font-manrope fw-5">
                  Tổng cộng ({itemsCount}) sản phẩm:{" "}
                </div>
                <span className="text-orange fs-22 mx-2 fw-6">
                  {formatPrice(totalAmount)}
                </span>
              </div>
              <div>
                <button
                  className="checkout-btn text-white bg-orange fs-16"
                  onClick={() => setShowOrderModal(true)}
                >
                  Thanh toán
                </button>

                {showOrderModal && (
                  <OrderModal
                    onClose={() => setShowOrderModal(false)}
                    onSubmit={handleOrderSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
