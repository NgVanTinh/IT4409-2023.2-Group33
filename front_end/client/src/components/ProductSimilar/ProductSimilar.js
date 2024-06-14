import React from "react";
import "./ProductSimilar.scss";
import Rating from "../Rating/Rating";
import { formatPrice } from "../../utils/helpers";

export default function ProductSimilar({ products }) {
  return (
    <div className="product-similar">
      {products.map((product, index) => (
        <div key={product.id} className="item-similar">
          <div className="item-similar-img">
            <img src={product.thumbnail} alt={product.title} />
          </div>
          <div className="item-similar-content">
            <h3>{product.title}</h3>
            <p>
              Giá:{" "}
              <span className="price">
                {formatPrice(
                  product.price * (1 - product.discountPercentage / 100)
                )}
              </span>
            </p>
            <p>
              Đánh giá:{" "}
              <Rating
                rating={product.rating}
                disabled={true}
                tooltips={false}
              />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
