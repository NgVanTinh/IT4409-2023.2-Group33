import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterRearCamera = () => {
  const dispatch = useDispatch();

  const RearCameras = [
    "2 MP",
    "8 MP",
    "12 MP",
    "16 MP",
    "48 MP",
    "64 MP",
    "108 MP",
  ];

  const handleRearCameraChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "rearCamera", value }));
    else dispatch(resetFilter({ filterType: "rearCamera" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Camera sau"
      onChange={handleRearCameraChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {RearCameras.map((camera, index) => (
        <Option key={index} value={camera}>
          {camera}
        </Option>
      ))}
    </Select>
  );
};

export default FilterRearCamera;
