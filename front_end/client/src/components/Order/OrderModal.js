import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import "./OrderModal.scss";

function OrderModal({ onClose, onSubmit }) {
  const [orderForm, setOrderForm] = useState({
    number: "",
    street: "",
    ward: "",
    district: "",
    city: "",
    province: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(orderForm);
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
        <Form.Item label="Tỉnh" name="province">
          <Input
            name="province"
            value={orderForm.province}
            onChange={handleFormChange}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default OrderModal;
