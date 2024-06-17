import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterChatLieu = () => {
  const dispatch = useDispatch();

  // Định nghĩa các lựa chọn chất liệu
  const ChatLieus = [
    { label: "Da PU", value: "Da PU" },
    { label: "Vải", value: "Vải" },
    { label: "Da thật", value: "Da thật" },
    { label: "Nhựa", value: "Nhựa" },
    { label: "Kim loại", value: "Kim loại" },
  ];

  const handleChatLieuChange = (value) => {
    if (value) {
      dispatch(setFilter({ filterType: "chatLieu", value }));
    } else {
      dispatch(resetFilter({ filterType: "chatLieu" }));
    }
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Chất liệu"
      onChange={handleChatLieuChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {ChatLieus.map((material, index) => (
        <Option key={index} value={material.value}>
          {material.label}
        </Option>
      ))}
    </Select>
  );
};

export default FilterChatLieu;
