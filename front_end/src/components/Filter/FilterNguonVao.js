import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterNguonVao = () => {
  const dispatch = useDispatch();

  const NguonVaos = ["Type C", "Micro USB"];

  const handleNguonVaoChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "nguonVao", value }));
    else dispatch(resetFilter({ filterType: "nguonVao" }));
  };

  return (
    <Select
      style={{ width: 150 }}
      placeholder="Chọn nguồn vào"
      onChange={handleNguonVaoChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {NguonVaos.map((source, index) => (
        <Option key={index} value={source}>
          {source}
        </Option>
      ))}
    </Select>
  );
};

export default FilterNguonVao;
