import React, { useState } from "react";
import { Modal, Button, Form, Input, Select } from "antd";
import "./OrderModal.scss";
const { Option } = Select;

function OrderModal({ onClose, onSubmit }) {
  const [orderForm, setOrderForm] = useState({
    number: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    phone: "",
    method: "COD",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (value, name) => {
    setOrderForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const formattedData = {
      address: {
        number: orderForm.number,
        street: orderForm.street,
        ward: orderForm.ward,
        district: orderForm.district,
        city: orderForm.city,
      },
      phone: orderForm.phone,
      method: orderForm.method,
    };
    onSubmit(formattedData);
    onClose();
  };

  return (
    <Modal
      title="Thông tin đặt hàng"
      visible={true}
      onOk={handleSubmit}
      onCancel={onClose}
      wrapClassName="custom-modal-center-title"
      okButtonProps={{ className: "custom-ok-button" }}
    >
      <Form layout="vertical" initialValues={orderForm}>
        <Form.Item label="Số nhà" name="number">
          <Input
            name="number"
            value={orderForm.number}
            onChange={handleFormChange}
          />
        </Form.Item>
        <Form.Item label="Đường" name="street">
          <Input
            name="street"
            value={orderForm.street}
            onChange={handleFormChange}
          />
        </Form.Item>
        <Form.Item label="Phường" name="ward">
          <Input
            name="ward"
            value={orderForm.ward}
            onChange={handleFormChange}
          />
        </Form.Item>
        <Form.Item label="Quận" name="district">
          <Input
            name="district"
            value={orderForm.district}
            onChange={handleFormChange}
          />
        </Form.Item>
        <Form.Item label="Thành phố" name="city">
          <Input
            name="city"
            value={orderForm.city}
            onChange={handleFormChange}
          />
        </Form.Item>
        <Form.Item label="Số điện thoại" name="phone">
          <Input
            name="phone"
            value={orderForm.province}
            onChange={handleFormChange}
          />
        </Form.Item>
        <Form.Item label="Phương thức thanh toán" name="method">
          <Select
            defaultValue={orderForm.method}
            onChange={(value) => handleSelectChange(value, "method")}
          >
            <Option value="COD">Thanh toán khi nhận hàng</Option>
            <Option value="VNPay">Thanh toán trực tiếp qua VNPay</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default OrderModal;
