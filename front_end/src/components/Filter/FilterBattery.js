import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterBattery = () => {
  const dispatch = useDispatch();

  const Batteries = [
    "2000 mAh",
    "3000 mAh",
    "4000 mAh",
    "5000 mAh",
    "6000 mAh",
  ];

  const handleBatteryChange = (value) => {
    console.log(value);
    if (value) dispatch(setFilter({ filterType: "battery", value }));
    else dispatch(resetFilter({ filterType: "battery" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Dung lượng Pin tối thiểu"
      onChange={handleBatteryChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {Batteries.map((battery, index) => (
        <Option key={index} value={battery.match(/\d+/g)[0]}>
          {" "}
          {battery}
        </Option>
      ))}
    </Select>
  );
};

export default FilterBattery;
