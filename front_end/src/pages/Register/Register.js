import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch, useSelector } from "react-redux";
import { Button, Checkbox, ConfigProvider, Form, Input, Modal } from "antd";
import "./Register.scss";
import { useEffect, useState } from "react";
import { TinyColor } from "@ctrl/tinycolor";
import { fetchAllUsers, register } from "../../store/userSlice";
const { TextArea } = Input;
const colors2 = ["rgb(62, 190, 62)", "rgb(57, 195, 57)"];
const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const allUser = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleOnFinishRegister = async (values) => {
    const checkExistUsername = allUser.find(
      (user) => user.username === values.username
    );
    if (checkExistUsername) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Username đã tồn tại",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const checkExistEmail = allUser.find((user) => user.email === values.email);
    if (checkExistEmail) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Email đã tồn tại",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const checkExistPhone = allUser.find((user) => user.phone === values.phone);
    if (checkExistPhone) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "SĐT đã tồn tại",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const actionResult = await dispatch(register(values));
    const response = actionResult.payload;
    if (response) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Đăng ký thành công",
        showConfirmButton: false,
        timer: 1500,
      });
      setIsModalOpen(false);
      navigate("/login");
    } else {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Đăng ký thất bại",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="body">
      <Modal
        title={
          <h2
            style={{
              textAlign: "center",
              color: "rgb(62, 190, 62)",
              marginBottom: "15px",
            }}
          >
            Đăng ký người dùng
          </h2>
        }
        centered={true}
        footer={null}
        width={400}
        open={isModalOpen}
        maskClosable={false}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form
          name="login-form"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          layout="horizontal"
          onFinish={handleOnFinishRegister}
        >
          <Form.Item
            label="Tên tài khoản"
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

          <Form.Item
            label="Họ và tên"
            name="fullname"
            rules={[
              {
                required: true,
                message: "Xin vui lòng nhập họ và tên!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Xin vui lòng nhập email!",
              },
              {
                type: "email",
                message: "Địa chỉ email không hợp lệ!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
              {
                pattern: new RegExp(/^(\+84|0)[3|5|7|8|9][0-9]{8}$/),
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: false,
                message: "Vui lòng nhập vào địa chỉ!",
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

        <p style={{ textAlign: "center" }}>
          Đã có tài khoản ?{" "}
          <Link to="/login" style={{ color: "rgb(62, 190, 62)" }}>
            Đăng nhập
          </Link>
        </p>
      </Modal>
    </div>
  );
}
export default Register;
