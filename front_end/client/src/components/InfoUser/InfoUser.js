import React, { useState } from "react";
import InfoOrder from "../InfoOrder/InfoOrder";

import { Card } from "antd";
import InfoPersonal from "../InfoPersonal/InfoPersonal";
const tabList = [
  {
    key: "tab1",
    tab: "Thông tin cá nhân",
  },
  {
    key: "tab2",
    tab: "Các đơn hàng đã đặt",
  },
];
const contentList = {
  tab1: <InfoPersonal />,
  tab2: <InfoOrder />,
};

export default function InfoUser() {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  return (
    <div className="container my-3">
      <Card
        style={{
          width: "100%",
        }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </div>
  );
}
