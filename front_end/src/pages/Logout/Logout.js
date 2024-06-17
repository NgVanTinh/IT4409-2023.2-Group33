import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookie";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/userSlice";
import { clearCartAsync } from "../../store/cartSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
    dispatch(clearCartAsync());
    deleteAllCookies();
    navigate("/");
  }, [dispatch, navigate]);

  return <></>;
}
export default Logout;
