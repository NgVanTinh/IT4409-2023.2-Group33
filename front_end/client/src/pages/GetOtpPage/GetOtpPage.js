import React from "react";
import { Button, Form, Input } from "antd";
import "./GetOtpPage.scss";
import { sendOTP } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function GetOtpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFinishForm = async (values) => {
    const { toEmail } = values;
    try {
      const actionResult = await dispatch(sendOTP(toEmail)).unwrap();
      // Nếu không có lỗi, unwrap() sẽ trả về payload
      console.log("OTP sent successfully", actionResult);

      const encodedEmail = encodeURIComponent(toEmail);
      navigate(`/reset-password/${encodedEmail}`);
    } catch (error) {
      // Nếu có lỗi, unwrap() sẽ throw một exception
      console.error("Failed to send OTP", error);
    }
  };

  return (
    <div className="get-otp-page">
      <Form layout="inline" onFinish={handleFinishForm}>
        <Form.Item
          label="Email nhận mã OTP"
          name="toEmail"
          rules={[
            {
              required: true,
              message: "Xin vui lòng nhập email để lấy lại mật khẩu!",
            },
            {
              type: "email",
              message: "Địa chỉ email không hợp lệ!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button danger htmlType="submit">
            Lấy mã OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
