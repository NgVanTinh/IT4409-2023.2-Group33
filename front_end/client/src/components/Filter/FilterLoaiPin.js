import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterLoaiPin = () => {
  const dispatch = useDispatch();

  const LoaiPins = ["Li-ion", "Polymer", "NiMH"];

  const handleLoaiPinChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "loaiPin", value }));
    else dispatch(resetFilter({ filterType: "loaiPin" }));
  };

  return (
    <Select
      style={{ width: 150 }}
      placeholder="Loại Pin"
      onChange={handleLoaiPinChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {LoaiPins.map((type, index) => (
        <Option key={index} value={type}>
          {type}
        </Option>
      ))}
    </Select>
  );
};

export default FilterLoaiPin;
