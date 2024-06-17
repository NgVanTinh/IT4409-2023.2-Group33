import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterNguonRa = () => {
  const dispatch = useDispatch();

  const NguonRas = [
    "USB: 5-6V - 3A",
    "USB: 6-9V - 2A",
    "USB: 9-12V - 1.5A",
    "Type C (PD): 5V - 3A",
    "Type C (PD): 9V - 2.22A Max 20W",
  ];

  const handleNguonRaChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "nguonRa", value }));
    else dispatch(resetFilter({ filterType: "nguonRa" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Nguồn ra"
      onChange={handleNguonRaChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {NguonRas.map((source, index) => (
        <Option key={index} value={source}>
          {source}
        </Option>
      ))}
    </Select>
  );
};

export default FilterNguonRa;
