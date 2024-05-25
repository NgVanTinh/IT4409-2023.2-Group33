import React from "react";
import "./Header.scss";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import {
  FaFacebook,
  FaTiktok,
  FaCircleQuestion,
  FaQuestion,
} from "react-icons/fa6";
import { getCookie } from "../../helpers/cookie";

export default function Header() {
  const username = getCookie("username");

  return (
    <header className="header text-white">
      <div className="container">
        <div className="header-cnt">
          <div className="header-cnt-top fs-13 py-2 flex align-center justify-between">
            <div className="header-cnt-top-l">
              <ul className="flex top-links align-center">
                <li className="flex align-center">
                  <span fs-13>Follow me</span>
                  <ul className="social-links flex align-center">
                    <li className="mx-2">
                      <a
                        href="https://www.facebook.com/thuan.nqt"
                        className="fs-15"
                      >
                        <FaFacebook />
                      </a>
                    </li>
                    <li className="mx-2">
                      <a
                        href="https://www.tiktok.com/@studywithme.tn"
                        className="fs-15"
                      >
                        <FaTiktok />
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>

            <div className="header-cnt-top-r">
              <ul className="top-links flex align-center">
                <li>
                  <Link to="/" className="top-link-itm">
                    <span className="top-link-itm-ico mx-2">
                      <FaQuestion />
                    </span>
                    <span className="top-link-itm-txt">Bạn cần hỗ trợ</span>
                  </Link>
                </li>
                <li className="vert-line"></li>
                {username ? (
                  <li>
                    <Link to={"/logout"}>
                      <span className="top-link-itm-txt">Logout</span>
                    </Link>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to={"/register"}>
                        <span className="top-link-itm-txt">Register</span>
                      </Link>
                    </li>
                    <li className="vert-line"></li>
                    <li>
                      <Link to={"/login"}>
                        <span className="top-link-itm-txt">Login</span>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="header-cnt-bottom">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  );
}
