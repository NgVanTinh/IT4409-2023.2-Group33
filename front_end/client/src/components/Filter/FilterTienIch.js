import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Checkbox, Row, Col, Typography, Card } from "antd";

const { Title } = Typography;

const FilterTienIch = () => {
  const dispatch = useDispatch();

  const TienIchs = ["Tương thích trợ lý ảo", "Game Mode", "Có mic thoại"];

  const handleTienIchChange = (checkedValues) => {
    dispatch(setFilter({ filterType: "tienIch", value: checkedValues }));
  };

  return (
    <Card bordered={false} style={{ marginBottom: 24 }}>
      <Title level={4}>Tiện ích</Title>
      <Checkbox.Group style={{ width: "100%" }} onChange={handleTienIchChange}>
        <Row>
          {TienIchs.map((feature, index) => (
            <Col key={index} span={8}>
              <Checkbox value={feature}>{feature}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </Card>
  );
};

export default FilterTienIch;
