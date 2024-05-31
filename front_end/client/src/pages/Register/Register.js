import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { Button, Checkbox, ConfigProvider, Form, Input, Modal } from "antd";
import "./Register.scss";
import { useState } from "react";
import { checkExist, register } from "../../store/userSlice";
import { TinyColor } from "@ctrl/tinycolor";
const { TextArea } = Input;
const colors2 = ["#fc6076", "#ff9a44", "#ef9d43", "#e75516"];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleOnFinishRegister = async (values) => {
    // check exist
    const checkEmailExist = await checkExist("email", values.email);
    if (checkEmailExist.length > 0) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Email already exist",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      // call api register
      const actionResult = await dispatch(register(values));
      const response = actionResult.payload;
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Register success",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(false);
        navigate("/login");
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Register failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div className="body">
      <Modal
        title="Register"
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
          layout="vertical"
          onFinish={handleOnFinishRegister}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Full name"
            name="fullName"
            rules={[
              {
                required: true,
                message: "Please input your Full name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: false,
                message: "Please input your address!",
              },
            ]}
          >
            <TextArea
              showCount
              maxLength={100}
              style={{
                height: 100,
                resize: "none",
              }}
            />
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
              <Button type="primary" htmlType="submit" size="large">
                Đăng ký
              </Button>
            </ConfigProvider>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default Register;
