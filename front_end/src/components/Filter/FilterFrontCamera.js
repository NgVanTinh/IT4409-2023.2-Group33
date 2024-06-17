import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterFrontCamera = () => {
  const dispatch = useDispatch();

  const FrontCameras = [
    "2 MP",
    "5 MP",
    "8 MP",
    "12 MP",
    "16 MP",
    "20 MP",
    "32 MP",
  ];

  const handleFrontCameraChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "frontCamera", value }));
    else dispatch(resetFilter({ filterType: "frontCamera" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Camera trước"
      onChange={handleFrontCameraChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {FrontCameras.map((camera, index) => (
        <Option key={index} value={camera}>
          {camera}
        </Option>
      ))}
    </Select>
  );
};

export default FilterFrontCamera;
