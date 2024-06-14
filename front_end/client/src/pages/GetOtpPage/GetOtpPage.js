import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import "./GetOtpPage.scss";
import { sendOTP } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function GetOtpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleFinishForm = async (values) => {
    const { email } = values;
    try {
      setLoading(true);
      const actionResult = await dispatch(sendOTP(values));

      if (actionResult) {
        setLoading(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Đã gửi mã OTP qua email của bạn!",
          showConfirmButton: false,
          timer: 1500,
        });

        const encodedEmail = encodeURIComponent(email);
        navigate(`/reset-password/${encodedEmail}`);
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Gửi mã OTP thất bại!",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="get-otp-page">
      <Form layout="inline" onFinish={handleFinishForm}>
        <Form.Item
          label="Email nhận mã OTP"
          name="email"
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
          <Button danger htmlType="submit" loading={loading}>
            Lấy mã OTP
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
