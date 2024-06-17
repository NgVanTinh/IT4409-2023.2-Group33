import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

// Destructuring để lấy component Option từ Select
const { Option } = Select;

const FilterSpecStorage = () => {
  const dispatch = useDispatch();

  const Storages = [
    "24 GB",
    "32 GB",
    "64 GB",
    "128 GB",
    "256 GB",
    "512 GB",
    "1 TB",
    "2 TB",
    "3 TB",
  ];

  const handleStorageChange = (value) => {
    console.log(value);
    if (value) dispatch(setFilter({ filterType: "specStorage", value }));
    else dispatch(resetFilter({ filterType: "specStorage" }));
  };

  return (
    <Select
      style={{ width: 150 }}
      placeholder="Dưng lượng"
      onChange={handleStorageChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {Storages.map((storage, index) => (
        <Option key={index} value={storage}>
          {storage}
        </Option>
      ))}
    </Select>
  );
};

export default FilterSpecStorage;
