import React from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { resetSort, setSort, sortProducts } from "../../store/productSlice";
const { Option } = Select;

export default function FilterSort() {
  const dispatch = useDispatch();

  const handleSortChange = (value) => {
    if (value) {
      dispatch(setSort(value));
    } else {
      dispatch(resetSort());
    }
  };

  return (
    <>
      <Select
        placeholder="Sắp xếp"
        style={{ width: 120 }}
        onChange={handleSortChange}
        allowClear
      >
        <Option value="name-asc">Tên A-Z</Option>
        <Option value="name-desc">Tên Z-A</Option>
        <Option value="price-asc">Giá tăng dần</Option>
        <Option value="price-desc">Giá giảm dần</Option>
      </Select>
    </>
  );
}
