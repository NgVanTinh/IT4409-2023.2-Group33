import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterThoiGianHopSac = () => {
  const dispatch = useDispatch();

  const ThoiGianHopSacs = [
    "Dùng 5 giờ",
    "Dùng 10 giờ",
    "Dùng 15 giờ",
    "Dùng 20 giờ",
    "Dùng 25 giờ",
    "Dùng 30 giờ",
  ];

  const handleThoiGianHopSacChange = (value) => {
    console.log(value);
    if (value) dispatch(setFilter({ filterType: "thoiGianHopSac", value }));
    else dispatch(resetFilter({ filterType: "thoiGianHopSac" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Chọn Thời Gian Hộp Sạc"
      onChange={handleThoiGianHopSacChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {ThoiGianHopSacs.map((time, index) => (
        <Option key={index} value={time}>
          {time}
        </Option>
      ))}
    </Select>
  );
};

export default FilterThoiGianHopSac;
