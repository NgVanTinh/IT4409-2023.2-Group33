import React from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { sortProducts } from "../../store/productSlice";
const { Option } = Select;

export default function FilterSort() {
  const dispatch = useDispatch();

  const handleSortChange = (value) => {
    dispatch(sortProducts(value));
  };

  return (
    <>
      <Select
        defaultValue="Sắp xếp"
        style={{ width: 120 }}
        onChange={handleSortChange}
      >
        <Option value="name-asc">Tên A-Z</Option>
        <Option value="name-desc">Tên Z-A</Option>
        <Option value="price-asc">Giá tăng dần</Option>
        <Option value="price-desc">Giá giảm dần</Option>
      </Select>
    </>
  );
}
