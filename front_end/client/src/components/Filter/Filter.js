import React, { useState } from "react";
import FilterSort from "./FilterSort";
import FilterRange from "./FilterRange";
import FilterRating from "./FilterRating";
import FilterCategory from "./FilterCategory";
import FilterBrand from "./FilterBrand";
import FilterSpecRam from "./FilterSpecRam";
import FilterSpecStorage from "./FilterSpecStorage";
import FilterOperatingSystem from "./FilterOperatingSystem";
import FilterScreenType from "./FilterScreenType";
import FilterFrontCamera from "./FilterFrontCamera";
import FilterRearCamera from "./FilterRearCamera";
import FilterChip from "./FilterChip";
import FilterBattery from "./FilterBattery";
import { Space } from "antd";

export default function Filter() {
  const [selectedCategory, setSelectedCategory] = useState("");

  // Hàm cập nhật danh mục được chọn
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };
  return (
    <>
      <Space size={[8, 16]} wrap>
        <FilterSort />
        <FilterRange />
        <FilterRating />
        <FilterBrand />
        <FilterCategory onCategoryChange={handleCategoryChange} />
        {(selectedCategory === "Điện thoại" ||
          selectedCategory === "Máy tính bảng") && (
          <>
            <FilterSpecRam />
            <FilterSpecStorage />
            <FilterOperatingSystem />
            <FilterScreenType />
            <FilterFrontCamera />
            <FilterRearCamera />
            <FilterChip />
            <FilterBattery />
          </>
        )}
      </Space>
    </>
  );
}
