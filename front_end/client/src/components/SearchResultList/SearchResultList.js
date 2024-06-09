import React from "react";
import "./SearchResultList.scss";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAsyncProductSingle } from "../../store/productSlice";

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
            {item.title}
          </Link>
        );
      })}
    </div>
  );
}
