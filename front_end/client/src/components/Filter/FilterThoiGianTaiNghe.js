import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterThoiGianTaiNghe = () => {
  const dispatch = useDispatch();

  // Giả sử các mức thời gian sử dụng tai nghe khác nhau
  const ThoiGianTaiNghes = [
    "Dùng 3 giờ",
    "Dùng 4 giờ",
    "Dùng 5 giờ",
    "Dùng 6 giờ",
    "Dùng 7 giờ",
    "Dùng 8 giờ",
    "Dùng 9 giờ",
    "Dùng 10 giờ",
  ];

  const handleThoiGianTaiNgheChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "thoiGianTaiNghe", value }));
    else dispatch(resetFilter({ filterType: "thoiGianTaiNghe" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Chọn Thời Gian Tai Nghe"
      onChange={handleThoiGianTaiNgheChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {ThoiGianTaiNghes.map((time, index) => (
        <Option key={index} value={time}>
          {time}
        </Option>
      ))}
    </Select>
  );
};

export default FilterThoiGianTaiNghe;
