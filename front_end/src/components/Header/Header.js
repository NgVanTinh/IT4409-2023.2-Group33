import React from "react";
import "./Header.scss";
import { Link, NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { FaFacebook, FaTiktok, FaQuestion } from "react-icons/fa6";
import { FaQuestionCircle } from "react-icons/fa";
import { getCookie } from "../../helpers/cookie";
import { AiOutlineMessage } from "react-icons/ai";
import MessageModal from "../MessageModal/MessageModal";

export default function Header() {
  const token = getCookie("token");
  const username = getCookie("username");
  const id = getCookie("id");

  return (
    <header className="header text-white">
      <div className="container">
        <div className="header-cnt">
          <div className="header-cnt-top fs-13 py-2 flex align-center justify-between">
            <div className="header-cnt-top-l">
              <ul className="flex top-links align-center">
                <li className="flex align-center">
                  <Link to="#" className="top-link-itm">
                    <span className="top-link-itm-ico mx-2">
                      <FaQuestionCircle />
                    </span>
                    <span className="top-link-itm-txt">Bạn cần hỗ trợ </span>
                  </Link>
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
                {token ? (
                  <>
                    <MessageModal />
                    <li className="vert-line"></li>
                    <li>
                      <NavLink to={`/infoUser`} className="top-link-itm fs-14">
                        {username}
                      </NavLink>
                    </li>
                    <li className="vert-line"></li>
                    <li>
                      <Link to={"/logout"}>
                        <span className="top-link-itm-txt">Đăng xuất</span>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to={"/register"}>
                        <span className="top-link-itm-txt">Đăng ký</span>
                      </Link>
                    </li>
                    <li className="vert-line"></li>
                    <li>
                      <Link to={"/login"}>
                        <span className="top-link-itm-txt">Đăng nhập</span>
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
