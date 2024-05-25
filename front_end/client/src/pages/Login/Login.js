import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { Button, Checkbox, ConfigProvider, Form, Input, Modal } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.scss";
import { useState } from "react";
import { login } from "../../store/userSlice";
import { TinyColor } from "@ctrl/tinycolor";
const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOnFinishLogin = async (values) => {
    // call api login
    const actionResult = await dispatch(login(values));
    const response = actionResult.payload;
    console.log(response);
    if (response.length > 0) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login success",
        showConfirmButton: false,
        timer: 1500,
      });
      setCookie("token", response[0].token, 1);
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
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
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
            <ConfigProvider
              theme={{
                components: {
                  Button: {
                    colorPrimary: `linear-gradient(90deg,  ${colors2.join(
                      ", "
                    )})`,
                    colorPrimaryHover: `linear-gradient(90deg, ${getHoverColors(
                      colors2
                    ).join(", ")})`,
                    colorPrimaryActive: `linear-gradient(90deg, ${getActiveColors(
                      colors2
                    ).join(", ")})`,
                    lineWidth: 0,
                  },
                },
              }}
            >
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="login-form-button"
              >
                Login
              </Button>
            </ConfigProvider>
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
