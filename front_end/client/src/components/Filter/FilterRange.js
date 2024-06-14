import React, { useState } from "react";
import { Slider, Modal, Button, Row, Col, Space } from "antd";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { formatPrice } from "../../utils/helpers";

export default function FilterPrice() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([1000, 25000000]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    dispatch(
      setFilter({
        filterType: "price",
        value: { min: priceRange[0], max: priceRange[1] },
      })
    );
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSliderChange = (value) => {
    setPriceRange(value);
  };

  const setFixedPriceRange = (range) => {
    setPriceRange(range);
    // Tự động cập nhật bộ lọc sau khi chọn khoảng giá cố định
    dispatch(
      setFilter({
        filterType: "price",
        value: { min: range[0], max: range[1] },
      })
    );
    handleCancel();
  };

  const resetPriceRange = () => {
    dispatch(
      resetFilter({
        filterType: "price",
      })
    );
    handleCancel();
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Lọc theo giá
      </Button>
      <Modal
        title="Chọn khoảng giá"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700} // Tăng chiều rộng của Modal để chứa các nút
        footer={[
          <Button key="reset" onClick={resetPriceRange}>
            Bỏ chọn
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="ok" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Slider
              range
              marks={{
                1000: formatPrice(1000),
                25000000: formatPrice(25000000),
              }}
              step={1000}
              value={priceRange}
              min={1000}
              max={25000000}
              onChange={onSliderChange}
            />
          </Col>
          {/* Các nút cho khoảng giá cố định */}
          <Col span={24}>
            <Space size="small" wrap>
              <Button onClick={() => setFixedPriceRange([1000, 2000000])}>
                1K - 2 triệu
              </Button>
              <Button onClick={() => setFixedPriceRange([2000000, 4000000])}>
                2 triệu - 4 triệu
              </Button>
              <Button onClick={() => setFixedPriceRange([4000000, 6000000])}>
                4 triệu - 6 triệu
              </Button>
              <Button onClick={() => setFixedPriceRange([6000000, 8000000])}>
                6 triệu - 8 triệu
              </Button>
              <Button onClick={() => setFixedPriceRange([8000000, 10000000])}>
                8 triệu - 10 triệu
              </Button>
            </Space>
          </Col>
          <Col span={24}>
            <Space size="small" wrap>
              <Button onClick={() => setFixedPriceRange([10000000, 12000000])}>
                10 triệu - 12 triệu
              </Button>
              <Button onClick={() => setFixedPriceRange([12000000, 14000000])}>
                12 triệu - 14 triệu
              </Button>
              <Button onClick={() => setFixedPriceRange([14000000, 16000000])}>
                14 triệu - 16 triệu
              </Button>
              <Button onClick={() => setFixedPriceRange([16000000, 18000000])}>
                16 triệu - 18 triệu
              </Button>
              <Button onClick={() => setFixedPriceRange([18000000, 20000000])}>
                18 triệu - 20 triệu
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
