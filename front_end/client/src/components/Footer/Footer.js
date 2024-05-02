import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer bg-orange">
      <div className="container py-4 text-center">
        <div className="flex align center justify-center text-white fw-3 fs-14">
          <Link to="/" className="text-uppercase">
            Chính sách riêng tư
          </Link>
          <div className="vert-line"></div>
          <Link to="/" className="text-uppercase">
            Điều khoản và dịch vụ
          </Link>
          <div className="vert-line"></div>
          <Link to="/" className="text-uppercase">
            Về chúng tôi
          </Link>
        </div>
        <span className="text-white copyright-text text-manrope fs-14 fw-3">
          Copyright 2024 by Nguyễn Quang Thuận
        </span>
      </div>
    </footer>
  );
}
