import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncProducts,
  resetFilter,
  setFilter,
} from "../../store/productSlice";
import { Select } from "antd";

// Destructuring để lấy component Option từ Select
const { Option } = Select;

const FilterBrand = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncProducts(100));
  }, [dispatch]);

  const products = useSelector((state) => state.product.products);
  const brands = Array.from(new Set(products.map((product) => product.brand)));

  const handleBrandChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "brand", value }));
    else dispatch(resetFilter({ filterType: "brand" }));
  };

  return (
    <Select
      style={{ width: 150 }}
      placeholder="Thương hiệu"
      onChange={handleBrandChange}
      allowClear
    >
      <Option value="">Tất cả thương hiệu</Option>
      {brands.map((brand, index) => (
        <Option key={index} value={brand}>
          {brand}
        </Option>
      ))}
    </Select>
  );
};

export default FilterBrand;
