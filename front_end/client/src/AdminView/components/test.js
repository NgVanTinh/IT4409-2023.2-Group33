import React, { useState } from 'react';
import { Grid, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';

const AdminPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productSpecs, setProductSpecs] = useState({});

  
    const categories = [
        {
          id: '8',
          name: 'Điện thoại',
          specs: [
              { name: 'Màn hình', type: 'text' },
              { name: 'Hệ điều hành', type: 'text' },
              { name: 'Camera sau', type: 'text' },
              { name: 'Camera trước', type: 'text' },
              { name: 'Chip', type: 'text' },
              { name: 'RAM', type: 'text' },
              { name: 'Dung lượng lưu trữ', type: 'text' },
              { name: 'Sim', type: 'text' },
              { name: 'Pin, Sạc', type: 'text' },
          ],
      },
      {
          id: '1',
          name: 'Máy tính bảng',
          specs: [
              { name: 'Màn hình', type: 'text' },
              { name: 'Hệ điều hành', type: 'text' },
              { name: 'Camera sau', type: 'text' },
              { name: 'Camera trước', type: 'text' },
              { name: 'Chip', type: 'text' },
              { name: 'RAM', type: 'text' },
              { name: 'Dung lượng lưu trữ', type: 'text' },
              { name: 'Pin, Sạc', type: 'text' },
          ],
      },
      {
          id: '2',
          name: 'Sạc dự phòng',
          specs: [
              { name: 'Hiệu suất sạc', type: 'text' },
              { name: 'Dung lượng pin', type: 'text' },
              { name: 'Thời gian sạc đầy pin', type: 'text' },
              { name: 'Nguồn vào', type: 'text' },
              { name: 'Nguồn ra', type: 'text' },
              { name: 'Lõi pin', type: 'text' },
              { name: 'Công nghệ/Tiện ích', type: 'text' },
              { name: 'Kích thước', type: 'text' },
              { name: 'Khối lượng', type: 'text' },
          ],
      },
      {
          id: '3',
          name: 'Tai nghe',
          specs: [
              { name: 'Thời gian tai nghe', type: 'text' },
              { name: 'Thời gian hộp sạc', type: 'text' },
              { name: 'Cổng sạc', type: 'text' },
              { name: 'Công nghệ âm thanh', type: 'text' },
              { name: 'Tương thích', type: 'text' },
              { name: 'Tiện ích', type: 'text' },
              { name: 'Hỗ trợ kết nối', type: 'text' },
              { name: 'Điều khiển bằng', type: 'text' },
          ],
      },
      {
          id: '4',
          name: 'Củ sạc',
          specs: [
              { name: 'Model', type: 'text' },
              { name: 'Chức năng', type: 'text' },
              { name: 'Đầu vào', type: 'text' },
              { name: 'Đầu ra', type: 'text' },
              { name: 'Dòng sạc tối đa', type: 'text' },
              { name: 'Kích thước', type: 'text' },
              { name: 'Công nghệ/Tiện ích', type: 'text' },
          ],
      },
      {
          id: '7',
          name: 'Dây sạc',
          specs: [
              { name: 'Công suất tối đa', type: 'text' },
              { name: 'Chức năng', type: 'text' },
              { name: 'Đầu vào', type: 'text' },
              { name: 'Đầu ra', type: 'text' },
              { name: 'Jack kết nối', type: 'text' },
              { name: 'Độ dài dây', type: 'text' },
          ],
      }, 
    ];


  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setProductSpecs({});
  };

  const handleSpecChange = (specName, value) => {
    setProductSpecs((prevSpecs) => ({
      ...prevSpecs,
      [specName]: value,
    }));
  };

  const currentCategory = categories.find(
    (category) => category.id === selectedCategory
  );

  console.log(currentCategory)

  return (
    <div>
      <h1>Create New Product</h1>
      <label>
        Select Category:
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">--Select Category--</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      {currentCategory && (
        <div>
          <h2>Product Specifications</h2>
          {currentCategory.specs.map((spec) => (
            <div key={spec.name}>
              <label>
                {spec.name}:
                <input
                  type={spec.type}
                  value={productSpecs[spec.name] || ''}
                  onChange={(e) =>
                    handleSpecChange(spec.name, e.target.value)
                  }
                />
              </label>
            </div>
          ))}
        </div>
      )}

      <button onClick={() => console.log(productSpecs)}>Save Product</button>
    </div>
  );
};

export default AdminPage;
