import React from "react";
import "./HomePage.scss";
import HeaderSlider from "../../components/Slider/HeaderSlider";

export default function HomePage() {
  return (
    <main>
      <div className="slider-wrapper">
        <HeaderSlider />
      </div>
      <div className="main-content bg-whitesmoke">
        <div className="container">
          <div className="categories py-5">
            <div className="categories-item">
              <div className="title-md">
                <h3>Sản phẩm</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
