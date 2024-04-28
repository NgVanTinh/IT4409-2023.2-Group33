import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { useState, useDispatch, useSelector } from "react-redux";
import { getSidebarStatus, setSidebarOff } from "../../store/sidebarSlice";
import { FaTimes } from "react-icons/fa";

export default function Sidebar() {
  const dispatch = useDispatch();
  const isSidebarOn = useSelector(getSidebarStatus);

  return (
    <aside className={`sidebar ${isSidebarOn ? "hide-sidebar" : ""}`}>
      <button
        type="button"
        className="sidebar-hide-btn"
        onClick={() => dispatch(setSidebarOff())}
      >
        <FaTimes />
      </button>

      <div className="sidebar-cnt">
        <div className="cat-title fs-17 text-uppercase fw-6 ls-1h">
          All Categories
        </div>
        <ul className="cat-list">
          <li>
            <Link to="" className="cat-list-link text-capitalize">
              Category here
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
