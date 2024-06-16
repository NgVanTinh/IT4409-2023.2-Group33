import React from "react";
import FilterSort from "./FilterSort";
import FilterRange from "./FilterRange";
import FilterRating from "./FilterRating";
import FilterCategory from "./FilterCategory";

export default function Filter() {
  return (
    <>
      <FilterSort />
      <FilterRange />
      <FilterRating />
      <FilterCategory />
    </>
  );
}
