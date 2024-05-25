import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.scss";
import { useState } from "react";
import { login } from "../../store/userSlice";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOnFinishLogin = (values) => {
    const { username, password } = values;

    // call api login
    const response = login(username, password);
    if (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login success",
        showConfirmButton: false,
        timer: 1500,
      });
      setCookie("username", username, 1);
      setIsModalOpen(false);
      navigate("/");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login failed",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      <Modal
        title="Login"
        centered={true}
        footer={null}
        width={400}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          name="login-form"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={handleOnFinishLogin}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Form.Item
              className="form-login-remember"
              name="remember"
              valuePropName="checked"
              noStyle
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              Forgot password
            </a>
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or{" "}
            <a href="" className="login-form-register">
              register now!
            </a>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default Login;
