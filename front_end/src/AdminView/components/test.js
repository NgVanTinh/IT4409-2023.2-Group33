import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField'; // Sử dụng Material-UI TextField

const EditProduct = ({ productId }) => {
  // State để lưu trữ thông tin sản phẩm
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    // Thêm các thuộc tính khác của sản phẩm tại đây
  });

  // Mô phỏng hàm để lấy thông tin sản phẩm từ API hoặc từ local storage
  const fetchProduct = async () => {
    // Thay thế bằng logic thực tế để lấy dữ liệu sản phẩm từ backend hoặc local storage
    try {
      // Giả định lấy thông tin sản phẩm từ API với productId
      const response = await fetch(`https://dummyjson.com/products/1`);
      if (!response.ok) {
        throw new Error('Failed to fetch product.');
      }
      const data = await response.json();
      setProduct(data); // Cập nhật state với thông tin sản phẩm lấy được
    } catch (error) {
      console.error('Fetch product error:', error);
      // Xử lý lỗi hoặc cập nhật state với giá trị mặc định nếu cần thiết
    }
  };

  // Sử dụng useEffect để gọi hàm fetchProduct khi productId thay đổi hoặc lúc ban đầu load component
  useEffect(() => {
    fetchProduct();
  }, [productId]);

  // Hàm xử lý thay đổi giá trị của các trường input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevProduct => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  // Hàm xử lý khi người dùng nhấn nút lưu để cập nhật thông tin sản phẩm
  const handleSaveProduct = async () => {
    try {
      // Gửi request PUT hoặc PATCH để cập nhật thông tin sản phẩm lên server
      const response = await fetch(`https://api.example.com/products/${productId}`, {
        method: 'PUT', // Hoặc 'PATCH' tùy vào backend API
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error('Failed to update product.');
      }
      console.log('Product updated successfully!');
      // Có thể thêm thông báo hoặc chuyển hướng sau khi cập nhật thành công
    } catch (error) {
      console.error('Update product error:', error);
      // Xử lý lỗi hoặc hiển thị thông báo cho người dùng
    }
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Product Name"
          value={product.name}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="price"
          label="Price"
          type="number"
          value={product.price}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={product.description}
          onChange={handleInputChange}
        />
        {/* Thêm các TextField khác tương tự cho các thuộc tính khác của sản phẩm */}
        <button type="button" onClick={handleSaveProduct}>Save</button>
      </form>
    </div>
  );
};

export default EditProduct;
