import React from "react";
import { Table } from "antd";

const ProductSpecsTable = ({ specs }) => {
  const columns = [
    {
      title: "Thông số",
      dataIndex: "spec",
      key: "spec",
    },
    {
      title: "Giá trị",
      dataIndex: "value",
      key: "value",
    },
  ];

  const dataSource = Object.entries(specs || {}).map(
    ([spec, value], index) => ({
      key: index,
      spec,
      value,
    })
  );

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default ProductSpecsTable;
