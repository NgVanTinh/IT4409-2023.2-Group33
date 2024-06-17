import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterCongSac = () => {
  const dispatch = useDispatch();

  // Các loại cổng sạc
  const CongSacs = ["Type-C", "Micro USB", "Lightning"];

  const handleCongSacChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "congSac", value }));
    else dispatch(resetFilter({ filterType: "congSac" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Chọn Cổng Sạc"
      onChange={handleCongSacChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {CongSacs.map((port, index) => (
        <Option key={index} value={port}>
          {port}
        </Option>
      ))}
    </Select>
  );
};

export default FilterCongSac;
