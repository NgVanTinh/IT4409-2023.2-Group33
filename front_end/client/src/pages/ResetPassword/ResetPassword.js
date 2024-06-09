import { Button, Form, Input } from "antd";
import React from "react";
import { useParams } from "react-router";
import "./ResetPassword.scss";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";

export default function ResetPassword() {
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFinishForm = async (values) => {
    try {
      const actionResult = await dispatch(resetPassword(values));
      const response = actionResult.payload;
      if (response) {
        console.log("Success");
        setCookie("token", response.token, 1);
        navigate("/");
      } else {
        console.log("Failed");
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
        initialValues={{ toEmail: decodeURIComponent(email) }}
      >
        <Form.Item label="Email" name="toEmail">
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
