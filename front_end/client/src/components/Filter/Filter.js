import React from "react";
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

export default function Filter() {
  return (
    <>
      <FilterSort />
      <FilterRange />
      <FilterRating />
      <FilterCategory />
      <FilterBrand />
      <FilterSpecRam />
      <FilterSpecStorage />
      <FilterOperatingSystem />
      <FilterScreenType />
      <FilterFrontCamera />
      <FilterRearCamera />
      <FilterChip />
      <FilterBattery />
    </>
  );
}
