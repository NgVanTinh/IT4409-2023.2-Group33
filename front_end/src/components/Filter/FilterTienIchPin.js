import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterTienIchPin = () => {
  const dispatch = useDispatch();

  const TienIchPins = [
    "Đèn LED báo hiệu",
    "Hỗ trợ sạc nhanh",
    "Cổng sạc đa năng",
  ];

  const handleTienIchPinChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "tienIchPin", value }));
    else dispatch(resetFilter({ filterType: "tienIchPin" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Tiện ích Pin"
      onChange={handleTienIchPinChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {TienIchPins.map((feature, index) => (
        <Option key={index} value={feature}>
          {feature}
        </Option>
      ))}
    </Select>
  );
};

export default FilterTienIchPin;
