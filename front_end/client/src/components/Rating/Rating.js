import React, { useState } from "react";
import { Flex, Rate } from "antd";
const desc = ["Vô cùng tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];

export default function Rating({ rating, disabled }) {
  const [value, setValue] = useState(rating);
  return (
    <Flex gap="middle" vertical>
      <Rate
        tooltips={desc}
        onChange={setValue}
        value={value}
        disabled={disabled}
      />
    </Flex>
  );
}
