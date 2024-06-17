import React, { useState } from "react";
import { Modal, Input, Button } from "antd";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdSend } from "react-icons/io";
import Message from "./Message";
import "./MessageModal.scss";

const MessageModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageText, setMessageText] = useState(""); // Trạng thái cho văn bản tin nhắn

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleInputChange = (e) => {
    setMessageText(e.target.value);
  };

  const sendMessage = () => {
    console.log("Sending message: ", messageText);
    // Thêm logic để gửi tin nhắn tại đây
    setMessageText(""); // Xóa trường nhập sau khi gửi
  };

  return (
    <>
      <li onClick={showModal} className="top-link-itm fs-14">
        <AiOutlineMessage />
      </li>
      <Modal
        title="Messages"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        style={{ top: 20 }}
        bodyStyle={{ maxHeight: "60vh", overflowY: "auto" }}
        footer={null}
        className="custom-scroll"
      >
        <Message />
        <div style={{ display: "flex", marginTop: "10px" }}>
          <Input
            placeholder="Type your message here..."
            value={messageText}
            onChange={handleInputChange}
            onPressEnter={sendMessage}
            style={{ marginRight: "10px" }}
          />
          <Button type="primary" onClick={sendMessage}>
            <IoMdSend />
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default MessageModal;
