import React from "react";
import { Select } from "antd";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";

const { Option } = Select;

export default function FilterRate() {
  const dispatch = useDispatch();

  const handleRateChange = (value) => {
    if (value) {
      dispatch(setFilter({ filterType: "rating", value: value }));
    } else {
      dispatch(resetFilter({ filterType: "rating" }));
    }
  };

  return (
    <>
      <Select
        placeholder="Lọc theo đánh giá"
        style={{ width: 200 }}
        onChange={handleRateChange}
        allowClear
      >
        <Option value="1">⭐ - 1 Sao</Option>
        <Option value="2">⭐⭐ - 2 Sao</Option>
        <Option value="3">⭐⭐⭐ - 3 Sao</Option>
        <Option value="4">⭐⭐⭐⭐ - 4 Sao</Option>
        <Option value="5">⭐⭐⭐⭐⭐ - 5 Sao</Option>
      </Select>
    </>
  );
}
