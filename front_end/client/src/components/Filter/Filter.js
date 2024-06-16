import React from "react";
import FilterSort from "./FilterSort";
import FilterRange from "./FilterRange";
import FilterRating from "./FilterRating";
import FilterCategory from "./FilterCategory";
import FilterBrand from "./FilterBrand";
import FilterSpecRam from "./FilterSpecRam";

export default function Filter() {
  return (
    <>
      <FilterSort />
      <FilterRange />
      <FilterRating />
      <FilterCategory />
      <FilterBrand />
      <FilterSpecRam />
    </>
  );
}
