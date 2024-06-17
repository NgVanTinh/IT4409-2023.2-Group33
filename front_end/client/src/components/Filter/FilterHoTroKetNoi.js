import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterHoTroKetNoi = () => {
  const dispatch = useDispatch();

  const HoTroKetNois = ["Bluetooth 5", "Bluetooth 6"];

  const handleHoTroKetNoiChange = (value) => {
    console.log(value);
    if (value) dispatch(setFilter({ filterType: "hoTroKetNoi", value }));
    else dispatch(resetFilter({ filterType: "hoTroKetNoi" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Chọn Hỗ Trợ Kết Nối"
      onChange={handleHoTroKetNoiChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {HoTroKetNois.map((connection, index) => (
        <Option key={index} value={connection}>
          {connection}
        </Option>
      ))}
    </Select>
  );
};

export default FilterHoTroKetNoi;
