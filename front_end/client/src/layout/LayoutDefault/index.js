import "./LayoutDefault.scss";
import { Link, NavLink, Outlet } from "react-router-dom";

function LayoutDefautl() {
  const navLinkActive = (e) => {
    return e.isActive ? "menu__link menu__link--active" : "menu__link";
  };

  return (
    <>
      <div className="layout-default">
        <header className="layout-default__header">
          <div className="layout-default__logo">Logo</div>
          <div className="menu">
            <ul>
              <li>
                <NavLink to="/" className={navLinkActive}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navLinkActive}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navLinkActive}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" className={navLinkActive}>
                  Blog
                </NavLink>
                <ul className="menu__sub">
                  <li>
                    <NavLink to="/blog/news" className={navLinkActive}>
                      Blog News
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/blog/related" className={navLinkActive}>
                      Blog Related
                    </NavLink>
                  </li>
                </ul>
              </li>
              <li>
                <NavLink to="/info-user" className={navLinkActive}>
                  Info User
                </NavLink>
              </li>
            </ul>
          </div>
        </header>
        <main className="layout-default__main">
          <Outlet />
        </main>
        <footer className="layout-default__footer">
          Copyright @ 2023 by Nguyễn Quang Thuận
        </footer>
      </div>
    </>
  );
}
export default LayoutDefautl;
