import React from "react";
import "./SearchResultList.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAsyncProductSingle } from "../../store/productSlice";
import { formatPrice } from "../../utils/helpers";

export default function SearchResultList({ results, setShowResults }) {
  const dispatch = useDispatch();
  return (
    <div className="search-result-list">
      {results.map((item, idx) => {
        return (
          <Link
            className="search-result-item"
            to={`/product/${item.id}`}
            key={item.id}
            onClick={() => {
              setShowResults(false);
              dispatch(fetchAsyncProductSingle(item.id));
            }}
          >
            <div className="result-item-content">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="result-item-thumbnail"
              />
              <div className="result-item-info">
                <div className="result-item-title">{item.title}</div>
                <div className="result-item-price">
                  {formatPrice(
                    item.price * (1 - item.discountPercentage / 100)
                  )}
                </div>{" "}
                {/* Giả sử 'price' là tên thuộc tính chứa giá sản phẩm */}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
