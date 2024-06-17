import React, { useEffect, useState } from "react";
import "./Message.scss";
import { getCookie } from "../../helpers/cookie";

const Message = () => {
  const [messages, setMessages] = useState([]);
  const currentUserID = parseInt(getCookie("id"));

  useEffect(() => {
    fetch(`https://buckytank.shop/messages?userId=${currentUserID}`)
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, []);

  return (
    <div>
      {messages.map((message, index) => (
        <div key={index} className="message-container">
          <div
            className={`message ${
              message.senderId === currentUserID ? "sender" : "receiver"
            }`}
          >
            <p>{message.content}</p>
          </div>
          <div
            className={`message-time ${
              message.senderId === currentUserID ? "sender" : "receiver"
            }`}
          >
            <p>{message.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Message;
