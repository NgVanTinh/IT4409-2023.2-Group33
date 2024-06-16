import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterChip = () => {
  const dispatch = useDispatch();

  const Chips = ["Snapdragon", "Exynos", "Kirin", "MediaTek", "Apple"];

  const handleChipChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "chip", value }));
    else dispatch(resetFilter({ filterType: "chip" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Chọn Chip"
      onChange={handleChipChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {Chips.map((chip, index) => (
        <Option key={index} value={chip}>
          {chip}
        </Option>
      ))}
    </Select>
  );
};

export default FilterChip;
