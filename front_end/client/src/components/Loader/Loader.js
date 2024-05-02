import React from "react";
import "./Loader.scss";
import { loader } from "../../utils/images";

export default function Loader() {
  return (
    <div className="container">
      <div className="loader flex justify-center align-center0">
        <img src={loader} alt="" />
      </div>
    </div>
  );
}
