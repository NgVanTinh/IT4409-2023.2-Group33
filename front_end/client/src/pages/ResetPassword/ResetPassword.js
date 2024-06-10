import { Button, Form, Input } from "antd";
import React from "react";
import { useParams } from "react-router";
import "./ResetPassword.scss";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import Swal from "sweetalert2";

export default function ResetPassword() {
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinishForm = async (values) => {
    try {
      const actionResult = await dispatch(resetPassword(values));
      const response = actionResult.payload;
      console.log(response);
      if (response) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đổi mật khẩu thành công!",
          showConfirmButton: false,
          timer: 1500,
        });
        setCookie("token", response.token, 1);
        navigate("/");
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Đổi mật khẩu thất bại",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="reset-password-container">
      <Form
        className="reset-password-form"
        layout="vertical"
        onFinish={handleFinishForm}
        initialValues={{ email: decodeURIComponent(email) }}
      >
        <Form.Item label="Email" name="email">
          <Input disabled />
        </Form.Item>
        <Form.Item
          label="OTP"
          name="otp"
          rules={[
            {
              required: true,
              message: "Xin vui lòng nhập mã OTP!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mật khẩu mới"
          name="password"
          rules={[
            {
              required: true,
              message: "Xin vui lòng nhập mật khẩu mới!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button danger htmlType="submit" block>
            Đổi mật khẩu
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
