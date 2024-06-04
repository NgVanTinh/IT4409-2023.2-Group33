import React from "react";
import "./HeaderSlider.scss";
import { sliderImgs } from "../../utils/images";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HeaderSlider() {
  var settings = {
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="slider">
      <div className="container">
        <div className="slider-content overflow-x-hidden">
          <Slider {...settings}>
            <div className="slider-item">
              <img src={sliderImgs[0]} alt="" />
            </div>
            <div className="slider-item">
              <img src={sliderImgs[1]} alt="" />
            </div>
            <div className="slider-item">
              <img src={sliderImgs[2]} alt="" />
            </div>
            <div className="slider-item">
              <img src={sliderImgs[3]} alt="" />
            </div>
            <div className="slider-item">
              <img src={sliderImgs[4]} alt="" />
            </div>
            <div className="slider-item">
              <img src={sliderImgs[5]} alt="" />
            </div>
            <div className="slider-item">
              <img src={sliderImgs[6]} alt="" />
            </div>
            <div className="slider-item">
              <img src={sliderImgs[7]} alt="" />
            </div>
            <div className="slider-item">
              <img src={sliderImgs[8]} alt="" />
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}
