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

const FilterSpecRam = () => {
  const dispatch = useDispatch();

  const RAMs = [
    "2 GB",
    "4 GB",
    "6 GB",
    "8 GB",
    "12 GB",
    "16 GB",
    "32 GB",
    "64 GB",
    "128 GB",
    "256 GB",
  ];

  const handleRamChange = (value) => {
    console.log(value);
    if (value) dispatch(setFilter({ filterType: "specRam", value }));
    else dispatch(resetFilter({ filterType: "specRam" }));
  };

  return (
    <Select
      style={{ width: 150 }}
      placeholder="RAM"
      onChange={handleRamChange}
      allowClear
    >
      <Option value="">Tất cả RAM</Option>
      {RAMs.map((RAM, index) => (
        <Option key={index} value={RAM}>
          {RAM}
        </Option>
      ))}
    </Select>
  );
};

export default FilterSpecRam;
