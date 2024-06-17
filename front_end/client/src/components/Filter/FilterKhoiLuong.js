import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterKhoiLuong = () => {
  const dispatch = useDispatch();

  const handleKhoiLuongChange = (value) => {
    if (value) {
      const [min, max] = value.split("-").map(Number); // Chuyển giá trị thành số
      dispatch(setFilter({ filterType: "khoiLuong", value: { min, max } }));
    } else {
      dispatch(resetFilter({ filterType: "khoiLuong" }));
    }
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Khối lượng"
      onChange={handleKhoiLuongChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      <Option value="0-200">Dưới 200g</Option>
      <Option value="200-500">200g - 500g</Option>
      <Option value="500-1000">500g - 1kg</Option>
      <Option value="1000-">Trên 1kg</Option>
    </Select>
  );
};

export default FilterKhoiLuong;
