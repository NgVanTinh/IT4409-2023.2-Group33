import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterHieuSuatSac = () => {
  const dispatch = useDispatch();

  // Định nghĩa các lựa chọn hiệu suất sạc
  const HieuSuatSacs = [
    { label: "Tối thiểu 30%", value: 30 },
    { label: "Tối thiểu 40%", value: 40 },
    { label: "Tối thiểu 50%", value: 50 },
    { label: "Tối thiểu 60%", value: 60 },
    { label: "Tối thiểu 70%", value: 70 },
    { label: "Tối thiểu 80%", value: 80 },
    { label: "Tối thiểu 90%", value: 90 },
  ];

  const handleHieuSuatSacChange = (value) => {
    if (value) {
      dispatch(setFilter({ filterType: "hieuSuatSac", value }));
    } else {
      dispatch(resetFilter({ filterType: "hieuSuatSac" }));
    }
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Hiệu suất sạc"
      onChange={handleHieuSuatSacChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {HieuSuatSacs.map((efficiency, index) => (
        <Option key={index} value={efficiency.value}>
          {efficiency.label}
        </Option>
      ))}
    </Select>
  );
};

export default FilterHieuSuatSac;
