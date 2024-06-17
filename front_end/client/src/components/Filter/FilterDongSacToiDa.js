import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterDongSacToiDa = () => {
  const dispatch = useDispatch();

  // Định nghĩa các lựa chọn dòng sạc tối đa
  const DongSacToiDas = [
    { label: "Tối đa 15W", value: 15 },
    { label: "Tối đa 18W", value: 18 },
    { label: "Tối đa 30W", value: 30 },
    { label: "Tối đa 45W", value: 45 },
    { label: "Tối đa 65W", value: 65 },
    { label: "Tối đa 100W", value: 100 },
  ];

  const handleDongSacToiDaChange = (value) => {
    if (value) {
      dispatch(setFilter({ filterType: "dongSacToiDa", value }));
    } else {
      dispatch(resetFilter({ filterType: "dongSacToiDa" }));
    }
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Dòng sạc tối đa"
      onChange={handleDongSacToiDaChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {DongSacToiDas.map((power, index) => (
        <Option key={index} value={power.value}>
          {power.label}
        </Option>
      ))}
    </Select>
  );
};

export default FilterDongSacToiDa;
