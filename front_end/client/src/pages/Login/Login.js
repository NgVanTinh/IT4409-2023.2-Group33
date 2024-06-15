import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { Button, Checkbox, ConfigProvider, Form, Input, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.scss";
import { useState } from "react";
import { login } from "../../store/userSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnFinishLogin = async (values) => {
    // call api login
    const actionResult = await dispatch(login(values));
    const response = actionResult.payload;

    if (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đăng nhập thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      setCookie("token", response.token, 1);
      setCookie("username", response.username, 1);
      setCookie("id", response.id, 1);
      setCookie("address", response.address, 1);
      setCookie("phone", response.phone, 1);
      setCookie("email", response.email, 1);
      setCookie("fullname", response.fullname, 1);
      navigate("/");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Đăng nhập thất bại",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="body">
      <div class="form-login">
        <div class="left">
          <h2>Đăng nhập</h2>
          <Form
            name="login-form"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            onFinish={handleOnFinishLogin}
          >
            <Form.Item
              label="Tài khoản"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập vào tên tài khoản!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập vào mật khẩu!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Link className="login-form-forgot" to={`/forgot-password`}>
              Quên mật khẩu
            </Link>

            <Form.Item>
              <button type="submit">Đăng nhập</button>
            </Form.Item>
          </Form>
        </div>
        <div class="right">
          <h3>TShop</h3>
          <p>
            Chào mừng quý khách hàng đến với TShop. Điểm đến lý tưởng cho những
            ai đam mê công nghệ và đang tìm kiếm những sản phẩm công nghệ tiên
            tiến nhất.
            <br />
            Nếu bạn chưa có tài khoản hãy bấm nút đăng ký ở phía dưới!
          </p>
          <a href="/register">Đăng ký</a>
        </div>
      </div>
    </div>
  );
}
export default Login;
