import React, { useEffect, useState } from "react";
import { Modal, Rate, Input, Select } from "antd";
import Swal from "sweetalert2";
const { Option } = Select;

const ReviewModal = ({ isVisible, onOk, onCancel, products, isLoading }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();

  // useEffect(() => {
  //   if (isVisible && products.length > 0) {
  //     setSelectedProduct(products[0].id);
  //   }
  // }, [products, isVisible]);

  const handleOk = () => {
    // Đảm bảo một sản phẩm được chọn
    if (!selectedProduct) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Vui lòng chọn sản phẩm để đánh giá",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    // Gọi onOk từ prop và truyền đánh giá cùng với ID sản phẩm được chọn
    onOk(selectedProduct, rating, comment);
    // Reset state
    setRating(0);
    setComment("");
    setSelectedProduct(undefined);
  };

  return (
    <Modal
      title="Đánh giá sản phẩm"
      visible={isVisible}
      onOk={handleOk}
      onCancel={onCancel}
      loading={isLoading}
    >
      <Select
        showSearch
        style={{ width: "100%", marginBottom: "20px" }}
        placeholder="Chọn sản phẩm"
        optionFilterProp="children"
        onChange={(value) => {
          setSelectedProduct(value);
        }}
        value={selectedProduct}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {products.map((product) => (
          <Option key={product.id} value={product.id}>
            {product.title}
          </Option>
        ))}
      </Select>
      <Rate onChange={setRating} value={rating} allowHalf />
      <Input.TextArea
        rows={4}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
    </Modal>
  );
};

export default ReviewModal;
