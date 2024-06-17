import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import {
  fetchAsyncCategories,
  getAllCategories,
} from "../../store/categorySlice";
import { Select } from "antd";

// Destructuring để lấy component Option từ Select
const { Option } = Select;

const FilterCategory = ({ onCategoryChange }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncCategories());
  }, [dispatch]);

  const categories = useSelector(getAllCategories);

  const handleCategoryChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "category", value }));
    else dispatch(resetFilter({ filterType: "category" }));
    onCategoryChange(value);
  };

  return (
    <Select
      style={{ width: 150 }}
      placeholder="Danh mục"
      onChange={handleCategoryChange}
      allowClear
    >
      <Option value="">Tất cả danh mục</Option>
      {categories.map((category, index) => (
        <Option key={index} value={category.name}>
          {category.name}
        </Option>
      ))}
    </Select>
  );
};

export default FilterCategory;
