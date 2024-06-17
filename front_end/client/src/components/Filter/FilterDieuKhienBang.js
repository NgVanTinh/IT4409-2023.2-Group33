import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Select } from "antd";

const { Option } = Select;

const FilterDieuKhienBang = () => {
  const dispatch = useDispatch();

  const DieuKhienBangs = ["Cảm ứng chạm", "Nút bấm vật lý"];

  const handleDieuKhienBangChange = (value) => {
    if (value) dispatch(setFilter({ filterType: "dieuKhienBang", value }));
    else dispatch(resetFilter({ filterType: "dieuKhienBang" }));
  };

  return (
    <Select
      style={{ width: 200 }}
      placeholder="Chọn Điều Khiển Bằng"
      onChange={handleDieuKhienBangChange}
      allowClear
    >
      <Option value="">Tất cả</Option>
      {DieuKhienBangs.map((control, index) => (
        <Option key={index} value={control}>
          {control}
        </Option>
      ))}
    </Select>
  );
};

export default FilterDieuKhienBang;
