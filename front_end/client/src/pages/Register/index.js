import { useNavigate } from "react-router-dom";
import { checkExist, register } from "../../services/usersService";
import Swal from "sweetalert2";
import generateToken from "../../helpers/generateToken";

function Register() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const objRegister = {
      fullName: fullName,
      email: email,
      password: password,
      token: generateToken(),
    };
    // check email exist
    const checkEmailExist = await checkExist("email", email);
    if (checkEmailExist.length > 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Email đã tồn tại!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const registerSuccess = await register(objRegister);
      if (registerSuccess) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đăng ký thành công!",
          showConfirmButton: false,
          timer: 1500,
        });

        navigate("/login");
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Đăng ký thất bại!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <input type="text" placeholder="Nhập họ tên" />
        </div>
        <div>
          <input type="email" placeholder="Nhập email" />
        </div>
        <div>
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>
        <button type="submit">Đăng ký</button>
      </form>
    </>
  );
}
export default Register;
