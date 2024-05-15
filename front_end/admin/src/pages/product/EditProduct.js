import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditProduct = ({params, rowId, setRowId}) => {
  let navigate = useNavigate();

  const { id } = useParams();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    thumbnail: "",
    images: ""
  });

  const { title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = product;

  const onInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProduct();
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/products/${id}`, product);
    navigate(`/admin/view-product/${id}`);
  };

  const loadProduct = async () => {
    const result = await axios.get(`http://localhost:8080/products/${id}`);
    setProduct(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit Product</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="Title" className="form-label">
                Title
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Input title of the product"
                name="title"
                value={title}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Price" className="form-label">
                Price
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Input price of the product"
                name="price"
                value={price}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="discountPercentage" className="form-label">
                Discount Percentage
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Input discount percentage of the product"
                name="discountPercentage"
                value={discountPercentage}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rating" className="form-label">
                Rating
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Input price of the product"
                name="rating"
                value={rating}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="stock" className="form-label">
                Stock
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Input price of the product"
                name="stock"
                value={stock}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="brand" className="form-label">
                Brand
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Input price of the product"
                name="brand"
                value={brand}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Input price of the product"
                name="category"
                value={category}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/admin/products">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;