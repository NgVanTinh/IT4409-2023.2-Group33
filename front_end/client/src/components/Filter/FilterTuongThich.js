import React from "react";
import { useDispatch } from "react-redux";
import { resetFilter, setFilter } from "../../store/productSlice";
import { Checkbox, Row, Col, Typography, Card } from "antd";

const { Title } = Typography;

const FilterTuongThich = () => {
  const dispatch = useDispatch();

  const TuongThichs = ["macOS", "Android", "iOS", "Windows"];

  const handleTuongThichChange = (checkedValues) => {
    console.log("Checked: ", checkedValues);
    dispatch(setFilter({ filterType: "tuongThich", value: checkedValues }));
  };

  return (
    <Card bordered={false} style={{ marginBottom: 24 }}>
      <Title level={4}>Tương thích</Title>
      <Checkbox.Group
        style={{ width: "100%" }}
        onChange={handleTuongThichChange}
      >
        <Row>
          {TuongThichs.map((os, index) => (
            <Col key={index} span={8}>
              <Checkbox value={os}>{os}</Checkbox>
            </Col>
          ))}
        </Row>
      </Checkbox.Group>
    </Card>
  );
};

export default FilterTuongThich;
