import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterScreenType = () => {
  const dispatch = useDispatch();

  const ScreenTypes = ["OLED", "IPS"];

  const handleScreenTypeChange = (value) => {
    console.log(value);
    if (value) dispatch(setFilter({ filterType: "screenType", value }));
    else dispatch(resetFilter({ filterType: "screenType" }));
  };

  return (
    <Select
      style={{ width: 150 }}
      placeholder="Loại màn hình"
      onChange={handleScreenTypeChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {ScreenTypes.map((type, index) => (
        <Option key={index} value={type}>
          {type}
        </Option>
      ))}
    </Select>
  );
};

export default FilterScreenType;
