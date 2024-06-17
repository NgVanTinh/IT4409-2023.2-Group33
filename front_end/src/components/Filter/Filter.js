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
import FilterThoiGianTaiNghe from "./FilterThoiGianTaiNghe";
import FilterCongSac from "./FilterCongSac";
import FilterTuongThich from "./FilterTuongThich";
import FilterThoiGianHopSac from "./FilterThoiGianHopSac";
import FilterTienIch from "./FilterTienIch";
import FilterHoTroKetNoi from "./FilterHoTroKetNoi";
import FilterDieuKhienBang from "./FilterDieuKhienBang";
import FilterDungLuongPin from "./FilterDungLuongPin";
import FilterNguonVao from "./FilterNguonVao";
import FilterNguonRa from "./FilterNguonRa";
import FilterLoaiPin from "./FilterLoaiPin";
import FilterTienIchPin from "./FilterTienIchPin";
import FilterKhoiLuong from "./FilterKhoiLuong";
import FilterHieuSuatSac from "./FilterHieuSuatSac";
import FilterDongSacToiDa from "./FilterDongSacToiDa";
import FilterChatLieu from "./FilterChatLieu";
import FilterTrongLuong from "./FilterTrongLuong";

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
        {selectedCategory === "Tai nghe" && (
          <>
            <FilterThoiGianTaiNghe />
            <FilterCongSac />
            <FilterTuongThich />
            <FilterTienIch />
            <FilterThoiGianHopSac />
            <FilterHoTroKetNoi />
            <FilterDieuKhienBang />
          </>
        )}
        {selectedCategory === "Sạc dự phòng" && (
          <>
            <FilterDungLuongPin />
            <FilterNguonVao />
            <FilterNguonRa />
            <FilterLoaiPin />
            <FilterTienIchPin />
            <FilterKhoiLuong />
            <FilterHieuSuatSac />
          </>
        )}
        {selectedCategory === "Củ sạc" && (
          <>
            <FilterDongSacToiDa />
          </>
        )}
        {selectedCategory === "Bao da" && (
          <>
            <FilterTrongLuong />
            <FilterChatLieu />
          </>
        )}
      </Space>
    </>
  );
}
