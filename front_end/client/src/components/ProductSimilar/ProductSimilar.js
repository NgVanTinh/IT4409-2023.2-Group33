import React from "react";

export default function ProductSimilar({ products }) {
  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {products.map((product, index) => (
          <div key={index} style={{ width: "200px" }}>
            <img
              src={product.image}
              alt={product.title}
              style={{ width: "100%", height: "auto" }}
            />
            <h3 style={{ fontSize: "1rem" }}>{product.title}</h3>
            <p>Giá: {product.price}</p>
            <p>Đánh giá: {product.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
