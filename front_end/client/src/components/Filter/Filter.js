import React from "react";
import FilterSort from "./FilterSort";
import FilterRange from "./FilterRange";
import FilterRating from "./FilterRating";

export default function Filter() {
  return (
    <>
      <FilterSort />
      <FilterRange />
      <FilterRating />
    </>
  );
}
