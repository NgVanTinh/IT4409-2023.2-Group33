// import { useSelector } from "react-redux";
// import { getCookie } from "../../helpers/cookie";
import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

function LayoutDefautl() {
  //const token = getCookie("token");
  //const isLogin = useSelector((state) => state.loginReducer);

  return (
    <>
      <Header />
      <Sidebar />
      <Outlet />
      <Footer />
    </>
  );
}
export default LayoutDefautl;
