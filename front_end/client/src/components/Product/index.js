import ProductList from "./ProductList";
import CreateProduct from "./CreateProduct";
import { useState } from "react";

function Product() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <>
      <h2>Danh sách sản phẩm</h2>
      <CreateProduct onReload={handleReload} />
      <ProductList reload={reload} />
    </>
  );
}
export default Product;
