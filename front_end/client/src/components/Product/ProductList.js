import { useState, useEffect } from "react";
import "./Product.css";
import EditProduct from "./EditProduct";
import DeleteProduct from "./DeleteProduct";

function ProductList(props) {
  const { reload } = props; // reload lại khi thêm sản phẩm mới
  const [data, setData] = useState([]);
  const [editReload, setEditReload] = useState(false);

  const handleReload = () => {
    setEditReload(!editReload);
  };

  useEffect(() => {
    const fetchApi = async () => {
      fetch("http://localhost:3002/products")
        .then((res) => res.json())
        .then((data) => {
          setData(data.reverse());
        });
    };
    fetchApi();
  }, [reload, editReload]); //để render lại data mới

  return (
    <>
      <div className="product__list">
        {data.map((item, index) => (
          <div className="product__item" key={index}>
            <div className="product__image">
              <img src={item.thumbnail} alt={item.title} />
            </div>
            <h4 className="product__title">{item.title}</h4>
            <p className="product__price">{item.price}</p>
            <p className="product__percent">{item.discountPercentage}</p>
            <EditProduct item={item} onReload={handleReload} />
            <DeleteProduct item={item} onReload={handleReload} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductList;
