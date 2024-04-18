import { login } from "../../services/usersService";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    // query
    const response = await login(email, password);
    if (response.length > 0) {
      // save information in cookies
      setCookie("id", response[0].id, 1);
      setCookie("fullName", response[0].fullName, 1);
      setCookie("email", response[0].email, 1);
      setCookie("token", response[0].token, 1);

      // send dispatch to reducer
      dispatch(checkLogin(true));

      // redirect Home
      navigate("/");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Tài khoản hoặc mật khẩu không chính xác!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div>
          <input type="email" placeholder="Nhập email" />
        </div>
        <div>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
        <button type="submit">Đăng nhập</button>
      </form>
    </>
  );
}
export default Login;
