import React from "react";
import { Rate } from "antd";
import moment from "moment";
import "./ProductRatings.scss";
import { getCookie } from "../../helpers/cookie";

const ProductRatings = ({ ratedProducts }) => {
  const id = getCookie("id");
  return (
    <>
      {ratedProducts.map((item) => (
        <div
          // Chỉ thêm class điều kiện ở đây
          className={`product-ratings ${
            item.userId.toString() === id ? "current-user-rating" : ""
          }`}
        >
          <div className="product-ratings-name">{item.fullName}</div>
          <div className="product-ratings-rate">
            <Rate allowHalf value={item.rate} disabled />
          </div>
          <div className="product-ratings-comment">{item.comment}</div>
          <div className="product-ratings-date">{item.date}</div>
        </div>
      ))}
    </>
  );
};

export default ProductRatings;
