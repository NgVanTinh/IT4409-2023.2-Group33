import React from "react";
import { Breadcrumb } from "antd";

const BreadcrumbComponent = ({ breadcrumbItems }) => {
  return (
    <Breadcrumb>
      {breadcrumbItems.map((item, index) => (
        <Breadcrumb.Item key={index}>
          {item.href ? <a href={item.href}>{item.title}</a> : item.title}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
