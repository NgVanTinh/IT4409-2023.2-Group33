import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterOperatingSystem = () => {
  const dispatch = useDispatch();

  const OperatingSystems = ["Android", "iOS"];

  const handleOperatingSystemChange = (value) => {
    console.log(value);
    if (value) dispatch(setFilter({ filterType: "operatingSystem", value }));
    else dispatch(resetFilter({ filterType: "operatingSystem" }));
  };

  return (
    <Select
      style={{ width: 150 }}
      placeholder="Hệ điều hành"
      onChange={handleOperatingSystemChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {OperatingSystems.map((os, index) => (
        <Option key={index} value={os}>
          {os}
        </Option>
      ))}
    </Select>
  );
};

export default FilterOperatingSystem;
