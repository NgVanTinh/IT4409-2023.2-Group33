import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterDungLuongPin = () => {
  const dispatch = useDispatch();

  const DungLuongPins = [
    "1000 mAh",
    "2000 mAh",
    "3000 mAh",
    "4000 mAh",
    "5000 mAh",
    "6000 mAh",
    "7000 mAh",
    "8000 mAh",
    "9000 mAh",
    "10000 mAh",
  ];

  const handleDungLuongPinChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "dungLuongPin", value }));
    else dispatch(resetFilter({ filterType: "dungLuongPin" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Dung lượng pin tối thiểu"
      onChange={handleDungLuongPinChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {DungLuongPins.map((capacity, index) => (
        <Option key={index} value={capacity}>
          {capacity}
        </Option>
      ))}
    </Select>
  );
};

export default FilterDungLuongPin;
