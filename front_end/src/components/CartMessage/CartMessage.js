import React from "react";
import "./CartMessage.scss";
import { correct } from "../../utils/images";

export default function CartMessage() {
  return (
    <div className="cart-message text-center">
      <div className="cart-message-icon">
        <img src={correct} alt="" />
      </div>
      <h6 className="text-white fs-14 fw-5">
        Một sản phẩm đã được thêm vào giỏ hàng
      </h6>
    </div>
  );
}
