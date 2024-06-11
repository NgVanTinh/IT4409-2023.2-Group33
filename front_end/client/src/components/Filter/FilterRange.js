import React, { useState } from "react";
import { Slider, Modal, Button, Row, Col, Space } from "antd";
import { useDispatch } from "react-redux";
import { setFilter } from "../../store/productSlice";

export default function FilterPrice() {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([1, 500]);

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
        width={600} // Tăng chiều rộng của Modal để chứa các nút
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Slider
              range
              marks={{
                1: "1$",
                1000: "1000$",
              }}
              step={1}
              value={priceRange}
              min={1}
              max={1000}
              onChange={onSliderChange}
            />
          </Col>
          {/* Các nút cho khoảng giá cố định */}
          <Col span={24}>
            <Space size="small">
              <Button onClick={() => setFixedPriceRange([1, 100])}>
                1$ - 100$
              </Button>
              <Button onClick={() => setFixedPriceRange([100, 200])}>
                100$ - 200$
              </Button>
              <Button onClick={() => setFixedPriceRange([200, 300])}>
                200$ - 300$
              </Button>
              <Button onClick={() => setFixedPriceRange([300, 400])}>
                300$ - 400$
              </Button>
              <Button onClick={() => setFixedPriceRange([400, 500])}>
                400$ - 500$
              </Button>
            </Space>
          </Col>
          <Col span={24}>
            <Space size="small">
              <Button onClick={() => setFixedPriceRange([500, 600])}>
                500$ - 600$
              </Button>
              <Button onClick={() => setFixedPriceRange([600, 700])}>
                600$ - 700$
              </Button>
              <Button onClick={() => setFixedPriceRange([700, 800])}>
                700$ - 800$
              </Button>
              <Button onClick={() => setFixedPriceRange([800, 900])}>
                800$ - 900$
              </Button>
              <Button onClick={() => setFixedPriceRange([900, 1000])}>
                900$ - 1000$
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </>
  );
}
