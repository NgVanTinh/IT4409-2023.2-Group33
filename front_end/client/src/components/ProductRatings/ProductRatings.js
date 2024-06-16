import React from "react";
import { Rate, Row } from "antd";
import moment from "moment";
import "./ProductRatings.scss";
import Rating from "../Rating/Rating";

const ProductRatings = ({ ratedProducts }) => {
  return (
    <>
      {ratedProducts.map((item) => (
        <div className="product-ratings">
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
